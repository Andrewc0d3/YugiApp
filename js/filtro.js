const contenedorFiltros = document.getElementById("contenedor-filtros");
const contenedorCartas = document.getElementById("contenedor-cartas");

// Tipos comunes en la API de YGOProDeck
const tiposCartas = [
  "Normal Monster",
  "Effect Monster",
  "Fusion Monster",
  "Synchro Monster",
  "XYZ Monster",
  "Pendulum Monster",
  "Link Monster",
  "Spell Card",
  "Trap Card"
];

// ✅ Generar botones de tipo
function generarBotonesFiltro() {
  contenedorFiltros.innerHTML = "";
  tiposCartas.forEach(tipo => {
    const btn = document.createElement("button");
    btn.textContent = tipo;
    btn.classList.add("btn-filtro");
    btn.addEventListener("click", () => filtrarPorTipo(tipo));
    contenedorFiltros.appendChild(btn);
  });
}

// ✅ Función para obtener cartas por tipo
async function filtrarPorTipo(tipo) {
  contenedorCartas.innerHTML = `<p class="loading">Cargando cartas de tipo <strong>${tipo}</strong>...</p>`;
  try {
    const resp = await fetch(`https://db.ygoprodeck.com/api/v7/cardinfo.php?type=${encodeURIComponent(tipo)}`);
    const data = await resp.json();
    mostrarCartasFiltradas(data.data);
  } catch (error) {
    console.error("Error al filtrar cartas:", error);
    contenedorCartas.innerHTML = `<p>Error al cargar cartas de tipo ${tipo}.</p>`;
  }
}

// ✅ Mostrar las cartas filtradas
function mostrarCartasFiltradas(cartas) {
  contenedorCartas.innerHTML = "";
  cartas.forEach(carta => {
    const div = document.createElement("div");
    div.classList.add("carta-item");
    div.innerHTML = `
      <img src="${carta.card_images[0].image_url}" alt="${carta.name}">
      <h3>${carta.name}</h3>
      <p>${carta.type}</p>
    `;
    div.addEventListener("click", () => mostrarDetalle(carta.id));
    contenedorCartas.appendChild(div);
  });
}

// ✅ Inicializar filtros al cargar
document.addEventListener("DOMContentLoaded", () => {
  generarBotonesFiltro();
});
