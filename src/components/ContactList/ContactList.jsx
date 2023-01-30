import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { deleteContact } from '../../redux/contactsSlice';
import { ContactItem } from '../ContactItem/ContactItem';
import css from './ContactsList.module.css';

export const ContactsList = () => {
  const dispatch = useDispatch();
  const filter = useSelector(state => state.filter);

  const contactsFromStore = useSelector(state => state.contacts.data);

  const filterContacts = () => {
    const filterToLowerCase = filter.toLowerCase();
    return contactsFromStore.filter(contact =>
      contact.name.toLowerCase().includes(filterToLowerCase)
    );
  };
  const filteredContacts = filterContacts();

  const eraseContact = id => {
    dispatch(deleteContact(id));
  };

  return (
    <ul className={css.contactsList}>
      {filteredContacts.map(contact => (
        <ContactItem
          contact={contact}
          onDeleteContact={eraseContact}
          key={contact.id}
        />
      ))}
    </ul>
  );
};
