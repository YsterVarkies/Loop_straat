import AnimatedContent from './reactbits/AnimatedContent.jsx';
import SplitText from './reactbits/SplitText.jsx';

// Section parts arrive in reading order: the heading rises word by word out of a mask,
// then text, then pictures, each a little later and from a little lower.
export function Reveal({ children, order = 0, distance = 24, className = '', as, ...rest }) {
  return (
    <AnimatedContent
      distance={distance}
      duration={0.9}
      ease="expo.out"
      delay={order * 0.08}
      threshold={0.12}
      className={className}
      {...rest}
    >
      {children}
    </AnimatedContent>
  );
}

// A picture that settles from a slight scale as it arrives.
export function RevealPicture({ children, order = 2, className = '' }) {
  return (
    <AnimatedContent distance={16} scale={1.04} duration={1.2} ease="expo.out" delay={order * 0.08} threshold={0.1} className={className}>
      {children}
    </AnimatedContent>
  );
}

export function Heading({ text, as = 'h2', className = '', id, trigger = 'view' }) {
  const Tag = as;
  return (
    <Tag className={`heading ${className}`} id={id}>
      <SplitText
        text={text}
        tag="span"
        className="heading__split"
        splitType="words"
        mask
        delay={45}
        duration={0.95}
        ease="expo.out"
        from={{ yPercent: 105 }}
        to={{ yPercent: 0 }}
        textAlign="inherit"
        threshold={0.15}
        rootMargin="0px"
        trigger={trigger}
      />
    </Tag>
  );
}
