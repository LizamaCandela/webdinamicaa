import React, { useState } from "react";

const RestaurantAdd = ({ onAdd }) => {
  const [nombre, setNombre] = useState("");
  const [direccion, setDireccion] = useState("");
  const [email, setEmail] = useState("");
  const [telefono, setTelefono] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    const nuevoRestaurant = { nombre, direccion, email, telefono };
    onAdd(nuevoRestaurant);
    setNombre("");
    setDireccion("");
    setEmail("");
    setTelefono("");
  };

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label>Nombre:</label>
        <input
          type="text"
          value={nombre}
          onChange={(e) => setNombre(e.target.value)}
          required
        />
      </div>
      <div>
        <label>Direccion:</label>
        <input
          type="text"
          value={direccion}
          onChange={(e) => setDireccion(e.target.value)}
          required
        />
      </div>
      <div>
        <label>Email:</label>
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
      </div>
      <div>
        <label>Teléfono:</label>
        <input
          type="text"
          value={telefono}
          onChange={(e) => setTelefono(e.target.value)}
          required
        />
      </div>
      <button type="submit">Agregar Restaurant</button>
    </form>
  );
};

export default RestaurantAdd;