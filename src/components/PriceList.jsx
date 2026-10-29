import { useRef } from 'react';
import Picture from './Picture.jsx';
import { Heading, Reveal, RevealPicture } from './Reveal.jsx';
import { useStagger } from '../lib/useStagger.js';
import './prices.css';

const TAG_LABEL = { vegan: 'Vegan', vegetarian: 'Vegetarian', 'gluten free': 'Gluten free' };

// One group of a menu: a plain group name, then name and price on one baseline,
// the rand sign shown once per group the way a printed menu does it.
export function PriceGroup({ group, as: Title = 'h3', filter }) {
  let shown = false;
  const items = filter ? group.items.filter(filter) : group.items;
  if (!items.length) return null;
  return (
    <div className="prices__group" id={group.anchor}>
      <Title className="prices__group-title">{group.title}</Title>
      {group.note && <p className="prices__note">{group.note}</p>}
      <ul className="prices__items">
        {items.map(item => {
          let price;
          if (item.priceLabel) price = item.priceLabel;
          else if (item.price === null || item.price === undefined) price = 'Ask us';
          else {
            price = shown ? String(item.price) : `R${item.price}`;
            shown = true;
          }
          return (
            <li key={item.name} className="prices__item">
              <div className="prices__row">
                <span className="prices__name">{item.name}</span>
                <span className="prices__price tnum">{price}</span>
              </div>
              {item.description && <p className="prices__desc">{item.description}</p>}
              {item.tags?.length > 0 && <p className="prices__tags">{item.tags.map(t => TAG_LABEL[t] || t).join(' · ')}</p>}
            </li>
          );
        })}
      </ul>
    </div>
  );
}

// Prices like a menu: the heading and one small photograph on the left, the list in two columns on the right.
export default function PriceList({ id, heading, intro, photo, groups, children }) {
  const listRef = useRef(null);
  useStagger(listRef, '.prices__group', { each: 0.09 });
  return (
    <section className="prices section wrap" id={id} aria-labelledby={`${id}-title`}>
      <div className="grid">
        <div className="prices__head">
          <Heading id={`${id}-title`} text={heading} className="t-head" />
          {intro && (
            <Reveal order={1}>
              <p className="prices__intro">{intro}</p>
            </Reveal>
          )}
          {photo && (
            <RevealPicture order={2} className="prices__photo">
              <Picture slug={photo} sizes="(max-width: 899px) 60vw, 22vw" />
            </RevealPicture>
          )}
        </div>
        <div className="prices__list" ref={listRef}>
          {groups.map(group => (
            <PriceGroup key={group.id} group={group} />
          ))}
          {children}
        </div>
      </div>
    </section>
  );
}
