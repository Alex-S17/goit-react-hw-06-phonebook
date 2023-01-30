import { ContactsList } from '../ContactList/ContactList';
import { Form } from '../Form/Form';
import { Filter } from '../Filter/Filter';
import css from './App.module.css';

export function App() {
  return (
    <div className={css.wrapper}>
      <h1>Phonebook</h1>
      <Form />
      <h1>Contacts</h1>
      <div className={css.contactsWrapper}>
        <Filter />
        <ContactsList />
      </div>
    </div>
  );
}
