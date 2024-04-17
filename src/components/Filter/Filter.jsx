// Filter.jsx
import PropTypes from 'prop-types';
import css from './Filter.module.css';

// Składnik filtrujący do wyszukiwania kontaktów według nazwy.
// filter - zawiera wprowadzony tekst filtra.
// onChangeInput - funkcję, która jest wywoływana po zmianie wartości filtra.
export const Filter = ({ filter, onChangeInput }) => {
  return (
    <>
      <label>
        Find contacts by name
        <br />
        <input
          className={css.inputContacts}
          onChange={onChangeInput} // gdy zmieni się wartość pola - wywołanie funkcji onChangeInput
          value={filter} // wartość początkową przechowywaną w polu filter
          type="text"
          name="filter"
        />
      </label>
    </>
  );
};

// wpisywanie
Filter.propTypes = {
  filter: PropTypes.string.isRequired,
  onChangeInput: PropTypes.func.isRequired, // funkcja
};
