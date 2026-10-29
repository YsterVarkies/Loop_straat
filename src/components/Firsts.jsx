import Picture from './Picture.jsx';
import './firsts.css';

// Loop St.'s own list of Potchefstroom firsts (from their About page), as a pinned title with photographs passing.
const FIRSTS = [
  {
    photo: 'the-tree',
    name: 'North of the Vaal',
    role: 'Potchefstroom',
    text: 'The first town north of the Vaal River, where Andries Hendrik Potgieter planted his willow tree.'
  },
  {
    photo: 'beer-board',
    name: 'The Government Gazette',
    role: 'Printed here',
    text: 'The first town to print the Government Gazette. These days the printing at Loop St. is done in chalk.'
  },
  {
    photo: 'courtyard-function',
    name: 'A coat of arms',
    role: 'Designed here',
    text: 'The first coat of arms of the Republic was designed in Potchefstroom. Ours is an arch, three steps and a willow.'
  },
  {
    photo: 'the-bar',
    name: 'Kraught Republique',
    role: '37 Loop St',
    text: 'The first town to house an establishment of Kraught Republique. That is us, on the Bult, by the Fanie du Toit fields.'
  }
];

export default function Firsts() {
  return (
    <section className="firsts" aria-labelledby="firsts-title">
      <div className="firsts__pin">
        <h2 id="firsts-title" className="firsts__title t-display">
          First in Potch
        </h2>
      </div>
      <ul className="firsts__list wrap">
        {FIRSTS.map((f, i) => (
          <li key={f.name} className={`firsts__item firsts__item--${i % 2 ? 'right' : 'left'}`}>
            <Picture slug={f.photo} sizes="(max-width: 899px) 72vw, 28vw" />
            <div className="firsts__caption">
              <h3 className="firsts__name">{f.name}</h3>
              <p className="firsts__role">{f.role}</p>
              <p className="firsts__text">{f.text}</p>
            </div>
          </li>
        ))}
      </ul>
    </section>
  );
}
