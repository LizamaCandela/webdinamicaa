import React, { useState } from "react";
const ActividadList = ({ Actividad, onEdit, onDelete }) => {
  const [editIndex, setEditIndex] = useState(null);
  const [editActividad, setEditActividad] = useState({
    nombre: "",
    apellido: "",
    email: "",
    telefono: "",
  });

  const handleEditChange = (e) => {
    const { name, value } = e.target;
    setEditActividad({ ...editActividad, [name]: value });
  };

  const handleEditSubmit = (e) => {
    e.preventDefault();
    onEdit(editIndex, editActividad);
    setEditIndex(null);
  };

  return (
    <ul>
      {Actividades.map((Actividad, index) => (
        <li key={index}>
          {editIndex === index ? (
            <form onSubmit={handleEditSubmit}>
              <input
                type="text"
                name="nombre"
                value={editActividad.nombre}
                onChange={handleEditChange}
                required
              />
              <input
                type="text"
                name="apellido"
                value={editActividad.apellido}
                onChange={handleEditChange}
                required
              />
              <input
                type="email"
                name="email"
                value={editActividad.email}
                onChange={handleEditChange}
                required
              />
              <input
                type="text"
                name="telefono"
                value={editActividad.telefono}
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
              {Actividad.nombre} {Actividad.apellido} - {Actividad.email} -{" "}
              {Actividad.telefono}
              <button
                onClick={() => {
                  setEditIndex(index);
                  setEditAlumno(Actividad);
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
export default ActividadList;