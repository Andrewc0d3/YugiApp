import { renderCartas } from "./home.js";

export function agregarFavorito(carta) {
  let favs = JSON.parse(localStorage.getItem("favoritos")) || [];
  if (!favs.some(c => c.id === carta.id)) {
    favs.push(carta);
    localStorage.setItem("favoritos", JSON.stringify(favs));
    alert(`${carta.name} añadida a favoritos ❤️`);
  }
}

export function mostrarFavoritos() {
  const favs = JSON.parse(localStorage.getItem("favoritos")) || [];
  const contenedor = document.getElementById("contenedor");
  contenedor.innerHTML = "";
  if (favs.length === 0) {
    contenedor.innerHTML = "<p>No tienes cartas favoritas aún.</p>";
    return;
  }
  renderCartas(favs);
}
