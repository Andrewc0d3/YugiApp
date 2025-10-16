// home.js

import { obtenerCartas, limiteCartas } from "./conexion.js";
import { mostrarDetalle } from "./detalle.js";
import { agregarFavorito } from "./favorito.js";
import { guardarColeccion, obtenerColeccion } from "./coleccion.js";

const contenedor = document.getElementById("contenedor");
const buscador = document.getElementById("buscador");
const menu = document.getElementById("menu");

// 🔹 Carga inicial
document.addEventListener("DOMContentLoaded", async () => {
  const cartas = await obtenerCartas(limiteCartas);
  renderCartas(cartas);
});

// 🔹 Renderiza las cartas
export function renderCartas(lista) {
  contenedor.innerHTML = "";
  lista.forEach(carta => {
    const card = document.createElement("div");
    card.classList.add("card");
    card.innerHTML = `
      <img src="${carta.card_images[0].image_url}" alt="${carta.name}">
      <h3>${carta.name}</h3>
      <button class="fav-btn">❤️</button>
    `;

    card.querySelector("img").addEventListener("click", () => mostrarDetalle(carta));
    card.querySelector(".fav-btn").addEventListener("click", () => agregarFavorito(carta));
    contenedor.appendChild(card);
  });
}

// 🔹 Buscador
buscador.addEventListener("input", async (e) => {
  const texto = e.target.value.toLowerCase();
  const cartas = await obtenerCartas(limiteCartas);
  const filtradas = cartas.filter(c => c.name.toLowerCase().includes(texto));
  renderCartas(filtradas);
});

// 🔹 Menú de pestañas
menu.addEventListener("click", async (e) => {
  if (!e.target.matches("button")) return;
  const opcion = e.target.dataset.tab;

  switch (opcion) {
    case "home":
      renderCartas(await obtenerCartas(limiteCartas));
      break;
    case "favoritos":
      import("./favorito.js").then(m => m.mostrarFavoritos());
      break;
    case "aleatorio":
      import("./conexion.js").then(m => m.cartasAleatorias());
      break;
    case "coleccion":
      import("./coleccion.js").then(m => m.mostrarColeccion());
      break;
    case "filtro":
      import("./conexion.js").then(m => m.mostrarFiltros());
      break;
  }
});
