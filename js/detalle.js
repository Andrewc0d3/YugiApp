// detalle.js
export function mostrarDetalle(carta) {
  if (!carta) return;
  const modal = document.createElement("div");
  modal.className = "modal";

  const imgUrl = carta.card_images && carta.card_images[0] && carta.card_images[0].image_url ? carta.card_images[0].image_url : "";

  modal.innerHTML = `
    <div class="detalle">
      <h2>${escapeHtml(carta.name)}</h2>
      ${imgUrl ? `<img src="${imgUrl}" alt="${escapeHtml(carta.name)}">` : ""}
      <p><strong>Tipo:</strong> ${escapeHtml(carta.type || "N/A")}</p>
      <p><strong>Raza/Clase:</strong> ${escapeHtml(carta.race || "N/A")}</p>
      <p><strong>Atributo:</strong> ${escapeHtml(carta.attribute || "N/A")}</p>
      <p><strong>Nivel/Rank:</strong> ${escapeHtml(carta.level ?? carta.rank ?? "N/A")}</p>
      <p><strong>Desc:</strong> ${escapeHtml(carta.desc || "Sin descripción")}</p>
      <div style="text-align:right; margin-top:8px;">
        <button id="cerrarDetalle" class="small-btn">Cerrar</button>
      </div>
    </div>
  `;

  modal.addEventListener("click", (ev) => { if (ev.target === modal) modal.remove(); });
  document.body.appendChild(modal);
  document.getElementById("cerrarDetalle").addEventListener("click", () => modal.remove());
}

function escapeHtml(str = "") {
  return String(str).replace(/[&<>"']/g, s => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[s]));
}
