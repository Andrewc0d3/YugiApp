// coleccion.js
import { renderCartas } from "./home.js";

export function guardarColeccion(carta) {
  let col = JSON.parse(localStorage.getItem("coleccion")) || [];
  if (!col.some(c => c.id === carta.id)) {
    col.push(carta);
    localStorage.setItem("coleccion", JSON.stringify(col));
    alert(`${carta.name} guardada en tu colección 📦`);
  }
}

export function mostrarColeccion() {
  const col = JSON.parse(localStorage.getItem("coleccion")) || [];
  renderCartas(col);
}
