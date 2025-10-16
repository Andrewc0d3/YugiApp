// favorito.js

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
  renderCartas(favs);
}
