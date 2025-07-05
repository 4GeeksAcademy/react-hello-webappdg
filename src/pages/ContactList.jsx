import React, { useState } from "react";
import { useContactContext } from "../context/ContactContext";
import { Link } from "react-router-dom";
import DeleteModal from "../components/DeleteModal";

const ContactList = () => {
  const { contacts, deleteContact } = useContactContext();

  const [showModal, setShowModal] = useState(false);
  const [selectedContact, setSelectedContact] = useState(null);

  const handleDeleteClick = (contact) => {
    setSelectedContact(contact);
    setShowModal(true);
  };

  const handleConfirmDelete = () => {
    deleteContact(selectedContact.id);
    setShowModal(false);
    setSelectedContact(null);
  };

  return (
    <div className="container mt-4">
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h2>Lista de Contactos</h2>
        <Link to="/contacts/new" className="btn btn-primary">
          Añadir contacto
        </Link>
      </div>

      {contacts.length === 0 ? (
        <p>No hay contactos aún.</p>
      ) : (
        <ul className="list-group">
          {contacts.map((contact) => (
            <li
              key={contact.id}
              className="list-group-item d-flex justify-content-between align-items-center"
            >
              <div className="d-flex align-items-center">
                {/* He usado ui.avatar para en vez de poner una foto, que salgan las iniciales del contacto, creo que es más moderno y chulo; 
                eso sí, el encodeURIComponent es una recomendacion que se daba en tutorialde ytbe para que no se rompa el código en esa parte ya que segun que nombre se ponga,
                si tiene espacios, tildes, etc, puede dar error. */}
                <img
                  src={`https://ui-avatars.com/api/?name=${encodeURIComponent(contact.fullName)}&background=0D8ABC&color=fff`}
                  alt={contact.fullName}
                  width="60"
                  height="60"
                  className="rounded-circle me-3"
                />
                <div>
                  <strong>{contact.fullName}</strong> <br />
                  <span>Email: {contact.email}</span> <br />
                  <span>Tel: {contact.phone}</span> <br />
                  <span>Dirección: {contact.address}</span>
                </div>
              </div>


              <div>
                <Link
                  to={`/contacts/edit/${contact.id}`}
                  className="btn btn-sm btn-outline-secondary me-2"
                >
                  <i className="fa-solid fa-pen" />
                </Link>

                <button
                  className="btn btn-sm btn-outline-danger"
                  onClick={() => handleDeleteClick(contact)}
                >
                  <i className="fa-solid fa-trash" />
                </button>
              </div>
            </li>
          ))}
        </ul>
      )}

      <div className="mt-4">
        <Link to="/" className="text-decoration-underline">
          ← Volver a la página principal
        </Link>
      </div>

      {selectedContact && (
        <DeleteModal
          show={showModal}
          onHide={() => setShowModal(false)}
          onConfirm={handleConfirmDelete}
          contactName={selectedContact.fullName}
        />
      )}
    </div>
  );
};

export default ContactList;
