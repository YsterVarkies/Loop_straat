import ScrollReveal from './reactbits/ScrollReveal.jsx';
import './statement.css';

// A statement read in as you scroll: each word brightens from the muted ink to the full ink.
export default function Statement({ children, className = '' }) {
  return (
    <ScrollReveal
      as="p"
      baseOpacity={0.22}
      enableBlur={false}
      baseRotation={0}
      blurStrength={0}
      containerClassName={`statement ${className}`}
      textClassName="statement__text"
      wordAnimationEnd="center 45%"
    >
      {children}
    </ScrollReveal>
  );
}
