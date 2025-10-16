// conexion.js
export let limiteCartas = 50;

/**
 * obtenerCartas: obtiene cartas desde la API.
 * Devuelve array vacío en caso de error y escribe en consola.
 */
export async function obtenerCartas(limite = 50) {
  const url = `https://db.ygoprodeck.com/api/v7/cardinfo.php?num=${limite}&offset=0`;
  try {
    const res = await fetch(url);
    if (!res.ok) {
      console.error("Error HTTP al pedir cartas:", res.status, res.statusText);
      return [];
    }
    const data = await res.json();
    if (!data || !data.data) {
      console.error("Respuesta inesperada de la API:", data);
      return [];
    }
    return data.data;
  } catch (err) {
    console.error("Error de red o CORS al obtener cartas:", err);
    return [];
  }
}

export async function cartasAleatorias() {
  const cartas = await obtenerCartas(200);
  if (!cartas.length) return mostrarMensaje("No se obtuvieron cartas para aleatorio.");
  const seleccion = cartas.sort(() => 0.5 - Math.random()).slice(0, 5);
  import("./home.js").then(m => m.renderCartas(seleccion));
}

export async function mostrarFiltros() {
  const cartas = await obtenerCartas(200);
  const cont = document.getElementById("contenedor");
  if (!cartas.length) {
    mostrarMensaje("No se pudieron cargar filtros (no hay cartas).");
    return;
  }
  const tipos = Array.from(new Set(cartas.map(c => c.type).filter(Boolean))).sort();
  cont.innerHTML = "";
  tipos.forEach(tipo => {
    const btn = document.createElement("button");
    btn.textContent = tipo;
    btn.className = "small-btn";
    btn.addEventListener("click", () => {
      const filtradas = cartas.filter(c => c.type === tipo);
      import("./home.js").then(m => m.renderCartas(filtradas));
    });
    cont.appendChild(btn);
  });
}

function mostrarMensaje(text) {
  const msg = document.getElementById("mensaje");
  if (msg) msg.textContent = text;
}
