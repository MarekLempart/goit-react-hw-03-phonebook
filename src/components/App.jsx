// App.jsx

import { nanoid } from 'nanoid'; // pakiet do generowania identyfikatorów
import { Component } from 'react';
import css from './App.module.css';
import { ContactForm } from './ContactForm/ContactForm';
import { ContactList } from './ContactList/ContactList';
import { Filter } from './Filter/Filter';
import { ResetButton } from './ResetButton/ResetButton';

const CONTACTS = 'contacts';
const initialContacts = [
  { id: nanoid(), name: 'Rosie Simpson', number: '459-12-56' },
  { id: nanoid(), name: 'Hermione Kline', number: '443-89-12' },
  { id: nanoid(), name: 'Eden Clements', number: '645-17-79' },
  { id: nanoid(), name: 'Annie Copeland', number: '227-91-26' },
];

export class App extends Component {
  state = {
    contacts: [],
    filter: '',
    isLocalStorageCleared: false,
  };

  // metoda cyklu życia, która jest wywoływana raz po zamontowaniu komponentu
  componentDidMount() {
    const savedContacts = localStorage.getItem(CONTACTS);
    if (savedContacts !== null) {
      const parsedContacts = JSON.parse(savedContacts);
      this.setState({ contacts: parsedContacts });
    } else {
      this.setState({ contacts: initialContacts });
    }
  }

  // Metoda cyklu życia, która jest wywoływana po aktualizacji stanu.

  componentDidUpdate(_, prevState) {
    if (prevState.contacts !== this.state.contacts) {
      localStorage.setItem(CONTACTS, JSON.stringify(this.state.contacts));
    }
  }

  // obsługa zdarzenia zmiany danych wejściowych w polu wejściowym (input)
  onChangeInput = evt => {
    // gdy zmienia się zawartość pola wejściowego, metoda otrzymuje nazwę i wartość
    const { name, value } = evt.currentTarget;
    // ustawia nowy stan komponentu
    this.setState({ [name]: value });
  };

  // dodawanie nowego kontaktu do listy kontaktów
  addContact = ({ name, number }) => {
    // sprawdzenie, czy kontakt o tej samej nazwie już istnieje
    if (
      this.state.contacts.some(
        value => value.name.toLocaleLowerCase() === name.toLocaleLowerCase()
      )
    ) {
      // jeśli kontakt istnieje, wyświetl powiadomienie
      alert(`${name} is already in contacts`);
    } else {
      // dodanie nowego kontaktu do listy kontaktów
      this.setState(oldState => {
        const list = [...oldState.contacts]; // skopiowanie wszystkich elementów listy kontaktów ze starego stanu

        // dodanie nowego obiektu kontaktu do tablicy listy
        list.push({
          id: nanoid(), // generowanie id
          name,
          number,
        });

        return { contacts: list };
      });
    }
  };

  // filtrowanie listy kontaktów według ciągu wyszukiwania wprowadzonego przez użytkownika
  filter = () => {
    const { contacts, filter } = this.state;
    // nowa tablica zawierająca wszystkie kontakty zawierające wyszukiwany ciąg znaków
    return contacts.filter(contact =>
      contact.name.toLowerCase().includes(filter.toLowerCase())
    );
  };

  // pobranie parametru id do usunięcia z listy kontaktów
  delContact = id => {
    // pobranie aktualnej listy kontaktów ze stanu komponentu
    const { contacts } = this.state;
    // nowa tablica zawierająca wszystkie kontakty z wyjątkiem tego z id
    const filtred = contacts.filter(item => item.id !== id);
    // aktualizacja właściwości contacts
    this.setState({ contacts: filtred });
  };

  // Metoda obsługująca kliknięcie przycisku czyszczenia localStorage i przywracania podstawowego stanu
  handleResetLocalStorage = () => {
    localStorage.removeItem(CONTACTS);
    this.setState({ constacts: [], isLocalStorageCleared: true });
    // this.loadContactsFromLocalStorage();
  };

  render() {
    const { isLocalStorageCleared } = this.state;

    return (
      <div className={css.conteiner}>
        <h1>Phonebook</h1>
        {/* formularz dodawania nowego kontaktu */}
        <ContactForm addContact={this.addContact} />
        <h2>Contacts</h2>
        {/* filtr przechowywany w stanie + funkcja aktualizująca wartość filtra */}
        <Filter filter={this.state.filter} onChangeInput={this.onChangeInput} />
        {/* funkcja do usunięcia kontaktu + tablica kontaktów, która jest filtrowana w zależności od wartości filtra */}
        <ContactList delContact={this.delContact} contacts={this.filter()} />
        {/* Przycisk Reset Button */}
        {isLocalStorageCleared && (
          <ResetButton onClick={this.handleResetLocalStorage} />
        )}
      </div>
    );
  }
}
