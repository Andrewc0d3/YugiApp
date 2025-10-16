// home.js
import { obtenerCartas, limiteCartas } from "./conexion.js";
import { mostrarDetalle } from "./detalle.js";
import { agregarFavorito } from "./favorito.js";
import { guardarColeccion } from "./coleccion.js";

const contenedor = document.getElementById("contenedor");
const buscador = document.getElementById("buscador");
const menu = document.getElementById("menu");
const mensaje = document.getElementById("mensaje");

if (!contenedor || !buscador || !menu) {
  console.error("Elementos DOM faltantes. Asegúrate de que index.html tenga #contenedor, #buscador y #menu.");
  if (mensaje) mensaje.textContent = "Error: elementos de la página no encontrados.";
}

/** carga inicial */
document.addEventListener("DOMContentLoaded", async () => {
  mostrarMensaje("Cargando cartas...");
  const cartas = await obtenerCartas(limiteCartas);
  if (!cartas.length) {
    mostrarMensaje("No se pudieron cargar cartas. Revisa la consola (F12).");
    return;
  }
  renderCartas(cartas);
  mostrarMensaje(""); // limpia mensaje
});

export function renderCartas(lista) {
  if (!contenedor) return;
  contenedor.innerHTML = "";
  if (!Array.isArray(lista) || lista.length === 0) {
    contenedor.innerHTML = `<div id="mensaje">No hay cartas para mostrar.</div>`;
    return;
  }

  lista.forEach(carta => {
    const card = document.createElement("div");
    card.className = "card";
    const imgUrl = carta.card_images && carta.card_images[0] && carta.card_images[0].image_url
      ? carta.card_images[0].image_url
      : "";

    card.innerHTML = `
      <div style="height:220px; display:flex; align-items:center; justify-content:center;">
        ${imgUrl ? `<img src="${imgUrl}" alt="${escapeHtml(carta.name)}">` : `<div style="color:#999">Sin imagen</div>`}
      </div>
      <h3 title="${escapeHtml(carta.name)}">${escapeHtml(carta.name)}</h3>
      <div class="btn-row">
        <button class="small-btn fav-btn">♥</button>
        <button class="small-btn col-btn">📦</button>
      </div>
    `;

    // evento detalle al hacer click en la imagen o nombre
    const imgEl = card.querySelector("img");
    const nameEl = card.querySelector("h3");
    if (imgEl) imgEl.addEventListener("click", () => mostrarDetalle(carta));
    if (nameEl) nameEl.addEventListener("click", () => mostrarDetalle(carta));

    card.querySelector(".fav-btn").addEventListener("click", () => agregarFavorito(carta));
    card.querySelector(".col-btn").addEventListener("click", () => guardarColeccion(carta));

    contenedor.appendChild(card);
  });
}

// buscador (cliente)
buscador.addEventListener("input", async (e) => {
  const texto = e.target.value.trim().toLowerCase();
  if (!texto) {
    const cartas = await obtenerCartas(limiteCartas);
    return renderCartas(cartas);
  }
  // buscar entre el primer bloque de cartas: ahorro de llamadas
  const cartas = await obtenerCartas(200);
  const filtradas = cartas.filter(c => c.name && c.name.toLowerCase().includes(texto));
  renderCartas(filtradas);
});

// menú
menu.addEventListener("click", (e) => {
  if (!e.target.matches("button")) return;
  const opcion = e.target.dataset.tab;
  switch (opcion) {
    case "home":
      obtenerCartas(limiteCartas).then(c => renderCartas(c));
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
    default:
      console.warn("Pestaña desconocida:", opcion);
  }
});

function mostrarMensaje(text) {
  if (mensaje) mensaje.textContent = text;
}

function escapeHtml(str = "") {
  return String(str).replace(/[&<>"']/g, s => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[s]));
}
