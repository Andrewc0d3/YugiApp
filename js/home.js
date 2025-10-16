import { obtenerCartas } from "./conexion.js";
import { mostrarDetalle } from "./detalle.js";
import { agregarFavorito } from "./favoritos.js";
import { guardarColeccion } from "./coleccion.js";

const contenedor = document.getElementById("contenedor");
const buscador = document.getElementById("buscador");
const menu = document.getElementById("menu");
const mensaje = document.getElementById("mensaje");


document.addEventListener("DOMContentLoaded", async () => {
  const cartas = await obtenerCartas();
  if (cartas.length > 0) {
    renderCartas(cartas);
    mensaje.textContent = "";
  }
});

export function renderCartas(lista) {
  contenedor.innerHTML = "";
  lista.forEach(carta => {
    const div = document.createElement("div");
    div.classList.add("card");
    div.innerHTML = `
      <img src="${carta.card_images[0].image_url}" alt="${carta.name}">
      <h3>${carta.name}</h3>
      <div class="btn-row">
        <button class="fav-btn">❤️</button>
        <button class="col-btn">📦</button>
      </div>
    `;

    div.querySelector("img").addEventListener("click", () => mostrarDetalle(carta));
    div.querySelector(".fav-btn").addEventListener("click", () => agregarFavorito(carta));
    div.querySelector(".col-btn").addEventListener("click", () => guardarColeccion(carta));

    contenedor.appendChild(div);
  });
}

// Buscador
buscador.addEventListener("input", async (e) => {
  const texto = e.target.value.toLowerCase();
  const cartas = await obtenerCartas();
  const filtradas = cartas.filter(c => c.name.toLowerCase().includes(texto));
  renderCartas(filtradas);
});

// Menú
menu.addEventListener("click", async (e) => {
  if (!e.target.matches("button")) return;
  const tab = e.target.dataset.tab;
  if (tab === "home") renderCartas(await obtenerCartas());
  if (tab === "favoritos") import("./favorito.js").then(m => m.mostrarFavoritos());
  if (tab === "aleatorio") {
    const todas = await obtenerCartas(200);
    const random = todas.sort(() => 0.5 - Math.random()).slice(0, 5);
    renderCartas(random);
  }
  if (tab === "coleccion") import("./coleccion.js").then(m => m.mostrarColeccion());
});
