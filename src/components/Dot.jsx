import { Children, Fragment } from 'react';

// The separator between short facts ("Fri 13 Nov · 19:30"). The site font's middle-dot character
// has no width of its own, so it sits on top of the next word; this is a small CSS dot with
// even space on both sides instead. See .dot in base.css.
export function Dot() {
  return <span className="dot" aria-hidden="true" />;
}

// Joins the parts that exist with a dot between each: joinWithDots(['Live music', null, 'R230']).
// Screen readers still get a break between the parts, since the dot is hidden from them.
export function joinWithDots(parts) {
  const list = Children.toArray(parts.filter(Boolean));
  if (!list.length) return null;
  return list.map((part, i) => (
    <Fragment key={i}>
      {i > 0 && (
        <>
          <Dot />
          <span className="sr-only">, </span>
        </>
      )}
      {part}
    </Fragment>
  ));
}
