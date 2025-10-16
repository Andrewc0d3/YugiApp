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
  const contenedor = document.getElementById("contenedor");
  contenedor.innerHTML = "";
  if (col.length === 0) {
    contenedor.innerHTML = "<p>No tienes cartas en tu colección aún.</p>";
    return;
  }
  renderCartas(col);
}
