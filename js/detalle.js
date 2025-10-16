// detalle.js

export function mostrarDetalle(carta) {
  const modal = document.createElement("div");
  modal.classList.add("modal");

  modal.innerHTML = `
    <div class="detalle">
      <h2>${carta.name}</h2>
      <img src="${carta.card_images[0].image_url}" alt="${carta.name}">
      <p><b>Tipo:</b> ${carta.type}</p>
      <p><b>Atributo:</b> ${carta.attribute || "N/A"}</p>
      <p><b>Nivel:</b> ${carta.level || "N/A"}</p>
      <p><b>Descripción:</b> ${carta.desc}</p>
      <button id="cerrar">Cerrar</button>
    </div>
  `;

  document.body.appendChild(modal);
  document.getElementById("cerrar").addEventListener("click", () => modal.remove());
}
