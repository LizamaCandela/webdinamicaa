import React, { useState } from "react";

const HotelList = ({ Hotel, onEdit, onDelete }) => {
  const [editIndex, setEditIndex] = useState(null);
  const [editHotel, setEditHotel] = useState({
    nombre: "",
    direccion: "",
    email: "",
    telefono: "",
  });

  const handleEditChange = (e) => {
    const { name, value } = e.target;
    setEditHotel({ ...editHotel, [name]: value });
  };

  const handleEditSubmit = (e) => {
    e.preventDefault();
    onEdit(editIndex, editHotel);
    setEditIndex(null);
  };

  return (
    <ul>
      {Hoteles.map((Hotel, index) => (
        <li key={index}>
          {editIndex === index ? (
            <form onSubmit={handleEditSubmit}>
              <input
                type="text"
                name="nombre"
                value={editHotel.nombre}
                onChange={handleEditChange}
                required
              />
              <input
                type="text"
                name="direccion"
                value={editHotel.direccion}
                onChange={handleEditChange}
                required
              />
              <input
                type="email"
                name="email"
                value={editHotel.email}
                onChange={handleEditChange}
                required
              />
              <input
                type="text"
                name="telefono"
                value={editHotel.telefono}
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
              {Hotel.nombre} {Hotel.direccion} - {Hotel.email} -{" "}
              {Hotel.telefono}
              <button
                onClick={() => {
                  setEditIndex(index);
                  setEditAlumno(Hotel);
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

export default HotelList;