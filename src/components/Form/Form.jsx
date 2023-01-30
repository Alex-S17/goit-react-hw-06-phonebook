import { nanoid } from 'nanoid';
import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { addContact } from '../../redux/contactsSlice';
import css from './Form.module.css';

export function Form() {
  const [name, setName] = useState('');
  const [number, setNumber] = useState('');

  const handleNameChange = event => {
    setName(event.currentTarget.value);
  };
  const handleNumberChange = event => {
    setNumber(event.currentTarget.value);
  };

  const contactsFromStore = useSelector(state => state.contacts.data);
  const dispatch = useDispatch();

  const handleFormData = (newName, newNumber) => {
    const arrayOfNames = contactsFromStore.map(contact => contact.name);
    const nameToLowerCase = newName.toLowerCase();
    const nameIsPresent = arrayOfNames.find(
      element => element.toLowerCase() === nameToLowerCase
    );
    if (!nameIsPresent) {
      const newContact = {
        id: nanoid(),
        name: newName,
        number: newNumber,
      };
      dispatch(addContact(newContact));
      return true;
    }
    return alert(`${newName} is already in contacts`);
  };

  const handleFormSubmit = event => {
    event.preventDefault();
    const onSubmitResult = handleFormData(name, number);
    if (onSubmitResult) {
      formCleaner();
    }
  };

  const formCleaner = () => {
    setName('');
    setNumber('');
  };

  return (
    <form className={css.form} onSubmit={handleFormSubmit}>
      <label className={css.label}>
        Name
        <input
          className={css.nameInput}
          type="text"
          name="name"
          value={name}
          onChange={handleNameChange}
          pattern="^[a-zA-Zа-яА-Я]+(([' -][a-zA-Zа-яА-Я ])?[a-zA-Zа-яА-Я]*)*$"
          title="Name may contain only letters, apostrophe, dash and spaces. For example Adrian, Jacob Mercer, Charles de Batz de Castelmore d'Artagnan"
          required
        />
      </label>
      <label>
        Number
        <input
          className={css.nameInput}
          type="tel"
          name="number"
          value={number}
          onChange={handleNumberChange}
          pattern="\+?\d{1,4}?[-.\s]?\(?\d{1,3}?\)?[-.\s]?\d{1,4}[-.\s]?\d{1,4}[-.\s]?\d{1,9}"
          title="Phone number must be digits and can contain spaces, dashes, parentheses and can start with +"
          required
        />
      </label>
      <button className={css.addBatton} type="submit">
        Add contact
      </button>
    </form>
  );
}
