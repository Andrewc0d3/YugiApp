// conexion.js

export let limiteCartas = 50;

export async function obtenerCartas(limite = 50) {
  const url = `https://db.ygoprodeck.com/api/v7/cardinfo.php?num=${limite}&offset=0`;
  const res = await fetch(url);
  const data = await res.json();
  return data.data;
}

// 🔹 Mostrar 5 cartas aleatorias
export async function cartasAleatorias() {
  const cartas = await obtenerCartas(200);
  const seleccion = cartas.sort(() => 0.5 - Math.random()).slice(0, 5);
  import("./home.js").then(m => m.renderCartas(seleccion));
}

// 🔹 Filtros por tipo
export async function mostrarFiltros() {
  const cartas = await obtenerCartas(100);
  const tipos = [...new Set(cartas.map(c => c.type))];
  const contenedor = document.getElementById("contenedor");
  contenedor.innerHTML = "";

  tipos.forEach(tipo => {
    const boton = document.createElement("button");
    boton.textContent = tipo;
    boton.addEventListener("click", () => {
      const filtradas = cartas.filter(c => c.type === tipo);
      import("./home.js").then(m => m.renderCartas(filtradas));
    });
    contenedor.appendChild(boton);
  });
}
