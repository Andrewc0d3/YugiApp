// coleccion.js
import { renderCartas } from "./home.js";

export function guardarColeccion(carta) {
  if (!carta) return;
  let col = JSON.parse(localStorage.getItem("coleccion")) || [];
  if (col.some(c => c.id === carta.id)) {
    alert(`${carta.name} ya está en tu colección.`);
    return;
  }
  col.push(carta);
  localStorage.setItem("coleccion", JSON.stringify(col));
  alert(`${carta.name} añadida a tu colección 🃏`);
}

export function obtenerColeccion() {
  return JSON.parse(localStorage.getItem("coleccion")) || [];
}

export function mostrarColeccion() {
  const col = obtenerColeccion();
  if (!col.length) {
    const cont = document.getElementById("contenedor");
    cont.innerHTML = `<div id="mensaje">Tu colección está vacía.</div>`;
    return;
  }
  renderCartas(col);
}
