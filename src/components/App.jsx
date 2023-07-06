import toast, { Toaster } from 'react-hot-toast';
import { ContactForm } from "./ContactForm/ContactForm";
import { Filter } from "./Filter/Filter";
import { ContactList } from "./ContactList/ContactList";
import { MainTitle, SectionTitle } from "./App.styled";
import { useDispatch, useSelector } from "react-redux";
import { getContacts, getFilterValue } from "redux/selectors";
import { addContact, deleteConatct } from "redux/contactsSlice";
import { setFilterValue } from "redux/filterSlice";

export const App = () => {

  const contacts = useSelector(getContacts);
  const filter = useSelector(getFilterValue);
  const dispatch = useDispatch();

  const onSubmit = ({ name, number }) => {
    if (contacts.findIndex(contact => name === contact.name) === -1) {
      dispatch(addContact({ name, number }));
      return;
    }
    toast.error(`${name} is already in contacts`);
  };

  const onFilterChange = e => {
    dispatch(setFilterValue(e.target.value));
  };

  const filterContacts = () => {
    return contacts.filter(({ name }) => name.toLowerCase().includes(filter.trim().toLowerCase()));
  };

  const onDeleteBtnClick = id => {
    dispatch(deleteConatct(id));
  };

  return <div>
    <MainTitle>Phonebook</MainTitle>
    <ContactForm onSubmit={onSubmit} />
    <SectionTitle>Contacts</SectionTitle>
    <Filter onFilterChange={onFilterChange} value={filter} />
    {filterContacts().length ? <ContactList contacts={filterContacts()} onDeleteBtnClick={onDeleteBtnClick} /> : null}
    <Toaster
      position="top-right"
      toastOptions={{ duration: 2000 }} />
  </div>   
};