// detalle.js
export function mostrarDetalle(carta) {
  // Obtenemos datos adicionales de forma segura
  const id = carta.id || "No disponible";
  const rareza = carta.card_sets && carta.card_sets.length > 0
    ? carta.card_sets[0].set_rarity
    : "Desconocida";
  const precio = carta.card_prices && carta.card_prices.length > 0
    ? `${carta.card_prices[0].cardmarket_price} €`
    : "No disponible";

  // Crear modal
  const modal = document.createElement("div");
  modal.style = `
    position: fixed;
    inset: 0;
    background: rgba(0, 0, 0, 0.6);
    display: flex;
    justify-content: center;
    align-items: center;
    z-index: 9999;
  `;

  // Contenido del modal
  modal.innerHTML = `
    <div style="
      background: #fff;
      color: #222;
      padding: 20px;
      border-radius: 12px;
      max-width: 400px;
      width: 90%;
      box-shadow: 0 4px 10px rgba(0,0,0,0.3);
      text-align: center;
      font-family: Arial, sans-serif;
      animation: fadeIn 0.3s ease-in-out;
    ">
      <h2>${carta.name}</h2>
      <img src="${carta.card_images[0].image_url}" alt="${carta.name}" style="width:100%; border-radius:8px; margin-bottom:10px;">
      
      <p><strong>🆔 Código:</strong> ${id}</p>
      <p><strong>🧩 Tipo:</strong> ${carta.type}</p>
      <p><strong>💎 Rareza:</strong> ${rareza}</p>
      <p><strong>💰 Precio (CardMarket):</strong> ${precio}</p>
      
      <hr style="margin:10px 0;">
      <p style="text-align: justify;"><strong>📜 Descripción:</strong><br>${carta.desc}</p>

      <button id="cerrar" style="
        background: #007bff;
        color: white;
        border: none;
        padding: 8px 14px;
        border-radius: 8px;
        cursor: pointer;
        margin-top: 12px;
      ">Cerrar</button>
    </div>
  `;

  // Animación CSS
  const style = document.createElement("style");
  style.textContent = `
    @keyframes fadeIn {
      from { opacity: 0; transform: scale(0.9); }
      to { opacity: 1; transform: scale(1); }
    }
  `;
  document.head.appendChild(style);

  // Mostrar modal
  document.body.appendChild(modal);

  // Cerrar modal
  modal.querySelector("#cerrar").addEventListener("click", () => modal.remove());
  modal.addEventListener("click", (e) => {
    if (e.target === modal) modal.remove();
  });
}
