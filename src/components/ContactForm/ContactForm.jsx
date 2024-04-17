// ContactForm.jsx
import PropTypes from 'prop-types'; // wpisywanie
import { Component } from 'react'; // import klasy bazowej React Component
import css from './ContactForm.module.css';

export class ContactForm extends Component {
  state = {
    name: '',
    number: '',
  };

  // czyszczenie zawartości formularza
  resetForm = () => {
    this.setState({ name: '', number: '' });
  };

  // aktualizacja stanu komponentu
  onChangeInput = evt => {
    const { name, value } = evt.currentTarget; // rozpakowanie nazwy i wartości z obiektu zdarzenia
    this.setState({ [name]: value }); // aktualizowanie wartości właściwości o nazwie przechowywanej w zmiennej name
  };

  render() {
    return (
      <>
        <form
          className={css.formstyle}
          onSubmit={evt => {
            evt.preventDefault(); // unikanie przeładowania strony

            // Przekazywanie stanu komponentu do metody addContact,
            // przekazywane jako (props) z komponentu nadrzędnego.
            this.props.addContact(this.state);
            this.resetForm(); // czyszczenie zawartości formularza
          }}
        >
          <label className={css.label}>
            Name
            <br />
            <input
              className={css.input}
              onChange={this.onChangeInput} // obsługi zdarzeń, która będzie wywoływana, gdy zmieni się wartość pola wejściowego
              value={this.state.name} // ustawienie bieżącej wartości pola wejściowego, która jest przechowywana w stanie komponentu
              type="text"
              name="name"
              pattern="^[a-zA-Zа-яА-Я]+((['\s\-][a-zA-Zа-яА-Я ])?[a-zA-Zа-яА-Я]*)*$"
              title="Name may contain only letters, apostrophe, dash and spaces. For example Adrian, Jacob Mercer, Charles de Batz de Castelmore d'Artagnan"
              required
            />
          </label>
          <br />
          <label htmlFor="">
            Number
            <br />
            <input
              className={css.input}
              onChange={this.onChangeInput} // procedura obsługi zdarzenia, która zostanie wywołana, gdy wartość pola wejściowego ulegnie zmianie
              value={this.state.number} // ustawienie bieżącej wartości pola wejściowego, która jest przechowywana w stanie komponentu
              type="tel"
              name="number"
              pattern="^\+((?:9[679]|8[035789]|6[789]|5[90]|42|3[578]|2[1-689])|9[0-58]|8[1246]|6[0-6]|5[1-8]|4[013-9]|3[0-469]|2[70]|7|1)(?:\W*\d){0,13}\d$"
              title="Phone number must be digits and can contain spaces, dashes, parentheses and can start with +"
              required
            />
          </label>
          <br />
          <button className={css.button} type="submit">
            Add contact
          </button>
        </form>
      </>
    );
  }
}

// wpisywanie
ContactForm.propTypes = {
  addContact: PropTypes.func.isRequired, // funkcja
};
