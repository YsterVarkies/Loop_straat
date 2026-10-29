import { Suspense, useEffect, useMemo, useRef } from 'react';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import { useTexture } from '@react-three/drei';
import * as THREE from 'three';
import { photoUrl } from './Picture.jsx';
import { asset } from '../lib/asset.js';

// The Loop logo built in 3D: an arch at the top of three steps, the willow drawn in its doorway.
// Scrolling walks the camera up the steps and through the arch; the doorway shows the real
// steps, the tree and the bar in turn.

const OPEN_W = 2.0; // doorway width
const LEG = 1.84; // straight sides of the doorway below the curve (doorway aspect matches the logo's, about 0.7)
const BAND = 0.36; // thickness of the arch around the doorway
const DEPTH = 0.6;
const STEP_H = 0.17;
const STEPS = [
  { w: 3.3, d: 1.0 },
  { w: 4.0, d: 1.55 },
  { w: 4.7, d: 2.1 }
];
const DOOR_H = LEG + OPEN_W / 2;
export const SLIDES = ['the-steps', 'the-tree', 'bar-at-night'];
// How far through the section's scroll the walk itself (far → mid → through the doorway) is
// done. Keep in sync with ArchWalk.jsx, which starts the photo reveal only after this point.
export const ENTRY_END = 0.72;

const lerp = THREE.MathUtils.lerp;
const damp = THREE.MathUtils.damp;
const smooth = (a, b, x) => {
  const t = Math.min(1, Math.max(0, (x - a) / (b - a)));
  return t * t * (3 - 2 * t);
};

function archBand() {
  const R = OPEN_W / 2 + BAND;
  const r = OPEN_W / 2;
  const s = new THREE.Shape();
  s.moveTo(-R, 0);
  s.lineTo(-R, LEG);
  s.absarc(0, LEG, R, Math.PI, 0, true);
  s.lineTo(R, 0);
  s.lineTo(r, 0);
  s.lineTo(r, LEG);
  s.absarc(0, LEG, r, 0, Math.PI, false);
  s.lineTo(-r, 0);
  s.lineTo(-R, 0);
  return s;
}

function doorway() {
  const r = OPEN_W / 2;
  const s = new THREE.Shape();
  s.moveTo(-r, 0);
  s.lineTo(-r, LEG);
  s.absarc(0, LEG, r, Math.PI, 0, true);
  s.lineTo(r, 0);
  s.lineTo(-r, 0);
  return s;
}

// Map a texture onto the doorway shape: 'cover' crops to fill, 'base' fits the width and stands on the sill.
function doorGeometry(textureAspect, fit) {
  const g = new THREE.ShapeGeometry(doorway(), 64);
  const pos = g.attributes.position;
  const uv = g.attributes.uv;
  const shapeAspect = OPEN_W / DOOR_H;
  for (let i = 0; i < uv.count; i++) {
    const u = (pos.getX(i) + OPEN_W / 2) / OPEN_W;
    const v = pos.getY(i) / DOOR_H;
    if (fit === 'cover') {
      const kx = textureAspect > shapeAspect ? shapeAspect / textureAspect : 1;
      const ky = textureAspect > shapeAspect ? 1 : textureAspect / shapeAspect;
      uv.setXY(i, 0.5 + (u - 0.5) * kx, 0.5 + (v - 0.5) * ky);
    } else {
      uv.setXY(i, u, v * (textureAspect / shapeAspect));
    }
  }
  uv.needsUpdate = true;
  return g;
}

// The stippled stone of the logo's arch, as a small repeating texture.
function stippleTexture() {
  const c = document.createElement('canvas');
  c.width = c.height = 256;
  const g = c.getContext('2d');
  g.fillStyle = '#4a3f34';
  g.fillRect(0, 0, 256, 256);
  for (let i = 0; i < 5200; i++) {
    g.fillStyle = Math.random() < 0.55 ? 'rgba(244,234,214,0.5)' : 'rgba(16,12,9,0.65)';
    g.beginPath();
    g.arc(Math.random() * 256, Math.random() * 256, Math.random() * 1.1 + 0.35, 0, Math.PI * 2);
    g.fill();
  }
  const t = new THREE.CanvasTexture(c);
  t.wrapS = t.wrapT = THREE.RepeatWrapping;
  t.repeat.set(1.6, 1.6);
  t.colorSpace = THREE.SRGBColorSpace;
  return t;
}

function Stone({ geometry, stone }) {
  const edges = useMemo(() => new THREE.EdgesGeometry(geometry, 30), [geometry]);
  return (
    <group>
      <mesh geometry={geometry}>
        <meshStandardMaterial map={stone} roughness={0.95} metalness={0} />
      </mesh>
      <lineSegments geometry={edges}>
        <lineBasicMaterial color="#f4ead6" transparent opacity={0.55} />
      </lineSegments>
    </group>
  );
}

function ArchAndSteps() {
  const stone = useMemo(stippleTexture, []);
  const arch = useMemo(() => {
    const g = new THREE.ExtrudeGeometry(archBand(), { depth: DEPTH, bevelEnabled: false, curveSegments: 72 });
    g.translate(0, 0, -DEPTH / 2);
    return g;
  }, []);
  const steps = useMemo(
    () =>
      STEPS.map((s, i) => {
        const g = new THREE.BoxGeometry(s.w, STEP_H, s.d);
        g.translate(0, -STEP_H / 2 - i * STEP_H, s.d / 2 - DEPTH / 2 - 0.1);
        return g;
      }),
    []
  );
  return (
    <group>
      <Stone geometry={arch} stone={stone} />
      {steps.map((g, i) => (
        <Stone key={i} geometry={g} stone={stone} />
      ))}
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -STEPS.length * STEP_H - 0.001, 2]}>
        <planeGeometry args={[40, 30]} />
        <meshStandardMaterial color="#15110d" roughness={1} />
      </mesh>
    </group>
  );
}

function Doorway({ progress, stage, still }) {
  const urls = useMemo(() => [...SLIDES.map(s => photoUrl(s, 1200)), asset('media/logo/loop-willow.webp')], []);
  const textures = useTexture(urls);
  const { gl } = useThree();
  const geometries = useMemo(() => {
    textures.forEach(t => {
      t.colorSpace = THREE.SRGBColorSpace;
      t.anisotropy = Math.min(8, gl.capabilities.getMaxAnisotropy());
    });
    return textures.map((t, i) => doorGeometry(t.image.width / t.image.height, i === 3 ? 'base' : 'cover'));
  }, [textures, gl]);
  const photoMats = useRef([]);
  const willowMat = useRef(null);
  const backMat = useRef(null);

  useFrame((_, dt) => {
    const p = progress.current;
    const through = smooth(0.12, 0.9, p);
    const ease = (from, to, lambda) => (still ? to : damp(from, to, lambda, dt));
    photoMats.current.forEach((m, i) => {
      if (!m) return;
      m.opacity = ease(m.opacity, i === stage.current ? 1 : 0, 2.4);
      m.color.setScalar(lerp(0.3, 0.84, through));
    });
    if (willowMat.current) willowMat.current.opacity = ease(willowMat.current.opacity, 1 - smooth(0.2, 0.55, p), 5);
  });

  return (
    <group position={[0, 0, -0.02]}>
      <mesh geometry={geometries[0]} position={[0, 0, -0.03]} renderOrder={0}>
        <meshBasicMaterial ref={backMat} color="#0c0a08" />
      </mesh>
      {SLIDES.map((slug, i) => (
        <mesh key={slug} geometry={geometries[i]} renderOrder={1 + i}>
          <meshBasicMaterial
            ref={m => (photoMats.current[i] = m)}
            map={textures[i]}
            transparent
            opacity={i === 0 ? 1 : 0}
            depthWrite={false}
            toneMapped={false}
            fog={false}
          />
        </mesh>
      ))}
      <mesh geometry={geometries[3]} position={[0, 0, 0.01]} renderOrder={5}>
        <meshBasicMaterial ref={willowMat} map={textures[3]} transparent depthWrite={false} toneMapped={false} fog={false} />
      </mesh>
    </group>
  );
}

// Festoon bulbs strung over the arch, swaying a little.
function Bulbs() {
  const group = useRef(null);
  const { points, wire } = useMemo(() => {
    const pts = [];
    const n = 13;
    for (let i = 0; i < n; i++) {
      const t = i / (n - 1);
      pts.push(new THREE.Vector3(lerp(-3.5, 3.5, t), 4.0 - 0.6 * (1 - (2 * t - 1) ** 2), 0.9));
    }
    const curve = new THREE.CatmullRomCurve3(pts);
    const line = new THREE.Line(
      new THREE.BufferGeometry().setFromPoints(curve.getPoints(80)),
      new THREE.LineBasicMaterial({ color: '#5a4f43' })
    );
    return { points: pts, wire: line };
  }, []);
  useFrame(({ clock }) => {
    if (group.current) group.current.rotation.x = Math.sin(clock.elapsedTime * 0.7) * 0.025;
  });
  return (
    <group ref={group}>
      <primitive object={wire} />
      {points.map((p, i) => (
        <mesh key={i} position={[p.x, p.y - 0.11, p.z]}>
          <sphereGeometry args={[0.06, 14, 14]} />
          <meshBasicMaterial color="#ffd9a3" toneMapped={false} />
        </mesh>
      ))}
    </group>
  );
}

// Walks the camera from the street to the steps to the doorway as `progress` goes from 0 to 1.
function Walk({ progress, still }) {
  const { camera, size } = useThree();
  const pointer = useRef({ x: 0, y: 0 });
  const look = useMemo(() => new THREE.Vector3(), []);

  useEffect(() => {
    const onMove = e => {
      pointer.current.x = (e.clientX / window.innerWidth) * 2 - 1;
      pointer.current.y = (e.clientY / window.innerHeight) * 2 - 1;
    };
    window.addEventListener('pointermove', onMove, { passive: true });
    return () => window.removeEventListener('pointermove', onMove);
  }, []);

  useFrame((_, dt) => {
    const aspect = size.width / size.height;
    const k = 2 * Math.tan(THREE.MathUtils.degToRad(camera.fov / 2));
    const fitH = h => h / k;
    const fitW = w => w / (k * aspect);
    const far = Math.max(fitH(4.6 / 0.42), fitW(5.6));
    const mid = Math.max(fitH(4.4 / 0.56), fitW(3.4));
    // Pulled back from filling the frame: the source photos are small (about 680px wide), so
    // zooming the doorway edge-to-edge stretched them well past their native size and blurred them.
    const close = Math.min(fitW(OPEN_W * 1.55), fitH(DOOR_H * 1.55));
    // The walk itself (far → mid → fully through the doorway) finishes by ENTRY_END of the
    // scroll, well before the photo reveal starts, so you are all the way in before it appears.
    const p = Math.min(progress.current / ENTRY_END, 1);
    const a = smooth(0, 0.5, p);
    const b = smooth(0.5, 1, p);
    const dist = p < 0.5 ? lerp(far, mid, a) : lerp(mid, close, b);
    const eye = p < 0.5 ? lerp(1.55, 1.45, a) : lerp(1.45, DOOR_H / 2, b);
    const sway = still ? 0 : 1 - b;
    const step = still ? 1 : 1 - Math.exp(-dt * 5);
    camera.position.x += (pointer.current.x * 0.35 * sway - camera.position.x) * step;
    camera.position.y += (eye - pointer.current.y * 0.15 * sway - camera.position.y) * step;
    camera.position.z += (dist - camera.position.z) * step;
    look.set(0, p < 0.5 ? lerp(1.55, 1.4, a) : lerp(1.4, DOOR_H / 2, b), 0);
    camera.lookAt(look);
  });
  return null;
}

export default function ArchScene({ progress, stage, active, still }) {
  return (
    <Canvas
      className="arch-canvas"
      dpr={[1, 1.75]}
      frameloop={still ? 'demand' : active ? 'always' : 'never'}
      camera={{ fov: 35, near: 0.1, far: 80, position: [0, 1.5, 16] }}
      gl={{ antialias: true, alpha: true, powerPreference: 'high-performance' }}
      onCreated={({ gl, scene }) => {
        gl.setClearColor('#0c0a08', 0);
        scene.fog = new THREE.Fog('#0c0a08', 14, 34);
      }}
      aria-hidden="true"
    >
      <ambientLight intensity={0.5} color="#ffeedd" />
      <directionalLight position={[-4, 6, 9]} intensity={1.1} color="#ffe2bf" />
      <pointLight position={[0, 1.2, -0.9]} intensity={14} distance={9} decay={2} color="#ffa95a" />
      <pointLight position={[0, 3.4, 1.4]} intensity={5} distance={6} decay={2} color="#ffcf8f" />
      <ArchAndSteps />
      <Bulbs />
      <Suspense fallback={null}>
        <Doorway progress={progress} stage={stage} still={still} />
      </Suspense>
      <Walk progress={progress} still={still} />
    </Canvas>
  );
}
