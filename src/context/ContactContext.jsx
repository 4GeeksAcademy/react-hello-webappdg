import React, { createContext, useContext, useState } from "react";

const ContactContext = createContext();

export const useContactContext = () => useContext(ContactContext);

export const ContactProvider = ({ children }) => {
  const [contacts, setContacts] = useState([
    {
      id: 1,
      fullName: "David Godino",
      email: "david.godino@hotmail.com",
      phone: "664818074",
      address: "Calle Falsa 123",
    },
    {
      id: 2,
      fullName: "Horacio Rodríguez",
      email: "horielcapo@gmail.com",
      phone: "687654321",
      address: "Avenida Siempre Viva 742",
    },
    {
      id: 3,
      fullName: "Sergio Gala",
      email:"sergiogala@gmail.com",
      phone:"612345678",
      address: "Calle Antonieta 23"
    }
  ]);


  const addContact = (contact) => {
    const newContact = { ...contact, id: Date.now() };
    setContacts([...contacts, newContact]);
  };

  const updateContact = (updatedContact) => {
    setContacts(
      contacts.map((contact) =>
        contact.id === updatedContact.id ? updatedContact : contact
      )
    );
  };

  const deleteContact = (id) => {
    setContacts(contacts.filter((contact) => contact.id !== id));
  };

  return (
    <ContactContext.Provider
      value={{ contacts, addContact, updateContact, deleteContact }}
    >
      {children}
    </ContactContext.Provider>
  );
};
