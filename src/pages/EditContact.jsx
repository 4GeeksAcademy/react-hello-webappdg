import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useContactContext } from "../context/ContactContext";

const EditContact = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { contacts, addContact, updateContact } = useContactContext();

  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    phone: "",
    address: "",
  });

  useEffect(() => {
    if (id) {
      const contactoExistente = contacts.find((c) => c.id === parseInt(id));
      if (contactoExistente) {
        setFormData(contactoExistente);
      }
    }
  }, [id, contacts]);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!formData.fullName || !formData.email) {
      alert("El nombre completo y el email son obligatorios");
      return;
    }

    if (id) {
      updateContact({ ...formData, id: parseInt(id) });
    } else {
      addContact(formData);
    }

    navigate("/contacts");
  };

  return (
    <div className="container mt-4">
      <h2>{id ? "Editar contacto" : "Nuevo contacto"}</h2>

      <form onSubmit={handleSubmit} className="mt-4">
        <div className="mb-3">
          <label className="form-label">Nombre completo</label>
          <input
            type="text"
            className="form-control"
            name="fullName"
            value={formData.fullName}
            onChange={handleChange}
            required
          />
        </div>

        <div className="mb-3">
          <label className="form-label">Correo electrónico</label>
          <input
            type="email"
            className="form-control"
            name="email"
            value={formData.email}
            onChange={handleChange}
            required
          />
        </div>

        <div className="mb-3">
          <label className="form-label">Teléfono</label>
          <input
            type="tel"
            className="form-control"
            name="phone"
            value={formData.phone}
            onChange={handleChange}
          />
        </div>

        <div className="mb-3">
          <label className="form-label">Dirección</label>
          <input
            type="text"
            className="form-control"
            name="address"
            value={formData.address}
            onChange={handleChange}
          />
        </div>

        <button type="submit" className="btn btn-success">
          <i className="fa-solid fa-floppy-disk me-2" />
          Guardar
        </button>

        <button
          type="button"
          className="btn btn-secondary ms-2"
          onClick={() => navigate("/contacts")}
        >
          Cancelar
        </button>
      </form>
    </div>
  );
};

export default EditContact;
