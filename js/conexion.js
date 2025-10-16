// conexion.js
export let limiteCartas = 30;

export async function obtenerCartas(limite = 30) {
  const apiURL = `https://db.ygoprodeck.com/api/v7/cardinfo.php?num=${limite}&offset=0`;

  const url = `https://api.allorigins.win/raw?url=${encodeURIComponent(apiURL)}`;

  try {
    const res = await fetch(url);
    if (!res.ok) throw new Error("Error HTTP " + res.status);
    const data = await res.json();
    if (!data || !data.data) throw new Error("Datos vacíos");
    console.log("✅ Cartas obtenidas:", data.data.length);
    return data.data;
  } catch (error) {
    console.error("❌ Error al cargar cartas:", error);
    const msg = document.getElementById("mensaje");
    if (msg) msg.textContent = "Error al cargar cartas. Revisa la consola.";
    return [];
  }
}
