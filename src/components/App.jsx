import React, { Component } from "react";
import { nanoid } from 'nanoid';
import ContactForm from "./ContactForm/ContactForm";
import Filter from "./Filter";
import ContactList from "./ContactList";

class App extends Component {
  state = {
    contacts: [
      // { id: 'id-1', name: 'Rosie Simpson', number: '459-12-56' },
      // { id: 'id-2', name: 'Hermione Kline', number: '443-89-12' },
      // { id: 'id-3', name: 'Eden Clements', number: '645-17-79' },
      // { id: 'id-4', name: 'Annie Copeland', number: '227-91-26' },
    ],
    filter: '',
  }

  formSubmitHandler = ({ name, number }) => {
    const onList = this.state.contacts.find(contact => contact.name === name);
    if (onList) {
      alert('This contact is already added');
      return;
    }
    this.setState(({ contacts }) => {
      return {
        contacts: [
          {
            id: nanoid(),
            name,
            number,
          },
          ...contacts,
        ],
      };
    });
  }

  deleteContact = contactId => {
    this.setState(({ contacts }) => ({
      contacts: contacts.filter(contact => contact.id !== contactId),
    }));
  }

  changeFilter = e => {
    this.setState({ filter: e.currentTarget.value });
  }

  getFilteredContacts = () => {
    const { contacts, filter } = this.state;
    const normalizedFilter = filter.toLocaleLowerCase();
    return contacts.filter(contact => contact.name.toLocaleLowerCase().includes(normalizedFilter));
  }
  componentDidMount = () => {
    const contactList = JSON.parse(localStorage.getItem('contacts'));
    if (contactList) {
      this.setState({ contacts: contactList })
    }
  }
  componentDidUpdate = (prevProps, prevState) => {
    if (this.state.contacts !== prevState.contacts) {
      localStorage.setItem('contacts', JSON.stringify(this.state.contacts));
    }
  }

  render() {
    const { filter } = this.state;

    const filteredContacts = this.getFilteredContacts();

    return (
      <div className="container">
        <h1>Phonebook</h1>
        <ContactForm
          onFormSubmit={this.formSubmitHandler}
        />
        <h2>Contacts</h2>
        <Filter
          value={filter}
          changeFilter={this.changeFilter}
        />
        <ContactList
          filteredContacts={filteredContacts}
          onDeleteContact={this.deleteContact}
        />
      </div>
    );
  }
};

export default App;