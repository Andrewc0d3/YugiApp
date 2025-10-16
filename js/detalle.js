// detalle.js
export function mostrarDetalle(carta) {
  const modal = document.createElement("div");
  modal.style = `
    position:fixed; inset:0; background:rgba(0,0,0,0.6);
    display:flex; justify-content:center; align-items:center;
  `;
  modal.innerHTML = `
    <div style="background:#fff; padding:20px; border-radius:10px; max-width:400px;">
      <h2>${carta.name}</h2>
      <img src="${carta.card_images[0].image_url}" style="width:100%">
      <p><strong>Tipo:</strong> ${carta.type}</p>
      <p><strong>Descripción:</strong> ${carta.desc}</p>
      <button id="cerrar">Cerrar</button>
    </div>
  `;
  document.body.appendChild(modal);
  modal.querySelector("#cerrar").addEventListener("click", () => modal.remove());
}
