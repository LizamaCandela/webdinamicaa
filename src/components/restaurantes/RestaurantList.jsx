import React, { useState } from "react";
const RestaurantList = ({ Restaurant, onEdit, onDelete }) => {
  const [editIndex, setEditIndex] = useState(null);
  const [editHotel, setEditHotel] = useState({
    nombre: "",
    direccion: "",
    email: "",
    telefono: "",
  });

  const handleEditChange = (e) => {
    const { name, value } = e.target;
    setEditRestaurant({ ...editRestaurant, [name]: value });
  };

  const handleEditSubmit = (e) => {
    e.preventDefault();
    onEdit(editIndex, editRestaurant);
    setEditIndex(null);
  };

  return (
    <ul>
      {Restaurantes.map((Restaurant, index) => (
        <li key={index}>
          {editIndex === index ? (
            <form onSubmit={handleEditSubmit}>
              <input
                type="text"
                name="nombre"
                value={editRestaurant.nombre}
                onChange={handleEditChange}
                required
              />
              <input
                type="text"
                name="direccion"
                value={editRestaurant.direccion}
                onChange={handleEditChange}
                required
              />
              <input
                type="email"
                name="email"
                value={editRestaurant.email}
                onChange={handleEditChange}
                required
              />
              <input
                type="text"
                name="telefono"
                value={editRestaurant.telefono}
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
              {Restaurant.nombre} {Restaurant.direccion} - {Restaurant.email} -{" "}
              {Restaurant.telefono}
              <button
                onClick={() => {
                  setEditIndex(index);
                  setEditAlumno(Restaurant);
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

export default RestaurantList;