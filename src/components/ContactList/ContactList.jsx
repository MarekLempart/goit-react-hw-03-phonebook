// ContactList.jsx
import PropTypes from 'prop-types';
import css from './ContactList.module.css';

// Komponent z listą kontaktów.
// contacts - tablica, delContact - funkcja
export const ContactList = ({ contacts, delContact }) => {
  return (
    <ul className={css.list}>
      {/* Przejście przez każdy kontakt i zwrócenie nowej tablicy z elementami listy */}
      {contacts.map(contact => {
        return (
          <li className={css.item} key={contact.id}>
            <span>{contact.name}:</span>
            <span className={css.number}>{contact.number}</span>
            <button
              className={css.button}
              type="button"
              // Funkcja delContact, do której przypisana jest funkcja contact.id aby usunąć kontakt z listy.
              onClick={() => {
                delContact(contact.id);
              }}
            >
              Delete
            </button>
          </li>
        );
      })}
    </ul>
  );
};

// wpisywanie
ContactList.propTypes = {
  delContact: PropTypes.func.isRequired, // funkcja
  contacts: PropTypes.array.isRequired, // tablica
};
