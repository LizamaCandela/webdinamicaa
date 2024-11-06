import React, { useState } from "react";

const ClienteList = ({ Cliente, onEdit, onDelete }) => {
  const [editIndex, setEditIndex] = useState(null);
  const [editCliente, setEditCliente] = useState({
    nombre: "",
    apellido: "",
    email: "",
    telefono: "",
  });

  const handleEditChange = (e) => {
    const { name, value } = e.target;
    setEditCliente({ ...editCliente, [name]: value });
  };

  const handleEditSubmit = (e) => {
    e.preventDefault();
    onEdit(editIndex, editCliente);
    setEditIndex(null);
  };

  return (
    <ul>
      {Clientes.map((Cliente, index) => (
        <li key={index}>
          {editIndex === index ? (
            <form onSubmit={handleEditSubmit}>
              <input
                type="text"
                name="nombre"
                value={editCliente.nombre}
                onChange={handleEditChange}
                required
              />
              <input
                type="text"
                name="apellido"
                value={editCliente.apellido}
                onChange={handleEditChange}
                required
              />
              <input
                type="email"
                name="email"
                value={editCliente.email}
                onChange={handleEditChange}
                required
              />
              <input
                type="text"
                name="telefono"
                value={editCliente.telefono}
                onChange={handleEditChange}
                required
              />
              <button type="submit">Guardar</button>
              <button type="button" onClick={() => setEditIndex(null)}>
                Cancelar
              </button>
            </form>
          ) : (
            <div>
              {Cliente.nombre} {Cliente.apellido} - {Cliente.email} -{" "}
              {Cliente.telefono}
              <button
                onClick={() => {
                  setEditIndex(index);
                  setEditAlumno(Cliente);
                }}
              >
                Editar
              </button>
              <button onClick={() => onDelete(index)}>Eliminar</button>
            </div>
          )}
        </li>
      ))}
    </ul>
  );
};

export default ClienteList;