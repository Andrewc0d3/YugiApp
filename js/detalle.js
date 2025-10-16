// detalle.js
async function mostrarDetalle(id) {
  try {
    const respuesta = await fetch(`https://db.ygoprodeck.com/api/v7/cardinfo.php?id=${id}`);
    const datos = await respuesta.json();
    const carta = datos.data[0];

    const rareza = carta.card_sets ? carta.card_sets[0].set_rarity : "Desconocida";
    const precio = carta.card_prices ? carta.card_prices[0].cardmarket_price + " €" : "No disponible";

    // Crear el modal
    const modal = document.createElement("div");
    modal.classList.add("modal-overlay");
    modal.innerHTML = `
      <div class="modal-content">
        <h2>${carta.name}</h2>
        <img src="${carta.card_images[0].image_url}" alt="${carta.name}">
        <p><strong>🆔 Código:</strong> ${carta.id}</p>
        <p><strong>🧩 Tipo:</strong> ${carta.type}</p>
        <p><strong>💎 Rareza:</strong> ${rareza}</p>
        <p><strong>💰 Precio (CardMarket):</strong> ${precio}</p>
        <hr>
        <p class="descripcion"><strong>📜 Descripción:</strong><br>${carta.desc}</p>
        <button id="cerrar-modal">Cerrar</button>
      </div>
    `;

    document.body.appendChild(modal);
    setTimeout(() => modal.classList.add("show"), 10);

    // Evento de cierre
    modal.querySelector("#cerrar-modal").addEventListener("click", () => {
      modal.classList.remove("show");
      setTimeout(() => modal.remove(), 300);
    });

  } catch (error) {
    console.error("Error al mostrar detalle:", error);
    alert("No se pudo cargar la información de la carta.");
  }
}

export { mostrarDetalle };
