// favorito.js
import { renderCartas } from "./home.js";

export function agregarFavorito(carta) {
  if (!carta) return;
  let favs = JSON.parse(localStorage.getItem("favoritos")) || [];
  if (favs.some(c => c.id === carta.id)) {
    alert(`${carta.name} ya está en favoritos.`);
    return;
  }
  favs.push(carta);
  localStorage.setItem("favoritos", JSON.stringify(favs));
  alert(`${carta.name} añadida a favoritos ❤️`);
}

export function mostrarFavoritos() {
  const favs = JSON.parse(localStorage.getItem("favoritos")) || [];
  if (!favs.length) {
    const cont = document.getElementById("contenedor");
    cont.innerHTML = `<div id="mensaje">No hay favoritos aún.</div>`;
    return;
  }
  renderCartas(favs);
}
