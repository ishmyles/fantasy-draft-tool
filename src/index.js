import "./assets/styles/styles.css";
import data from "./data/espnStats.json";

document.addEventListener("DOMContentLoaded", () => {
  const tableBody = document.querySelector("tbody");
  const availablePlayers = new DocumentFragment();

  for (let i = 0; i < 1006; i++) {
    const tableRow = document.createElement("tr");

    tableRow.innerHTML = `<th scope="row">${data[i].id}</th>
      <td scope="row"><div><span class="txt-row">${data[i].name}</span><span class="txt-row"><span class="txt-sm txt-grey">${data[i].team}</span> <span class="txt-sm txt-dark-grey txt-bold">${data[i].position}</span></span></div></td>
      <td>${data[i].statsPrediction.gp}</td>
      <td>${data[i].statsPrediction.fg}</td>
      <td>${data[i].statsPrediction.ft}</td>
      <td>${data[i].statsPrediction["3pm"]}</td>
      <td>${data[i].statsPrediction.reb}</td>
      <td>${data[i].statsPrediction.ast}</td>
      <td>${data[i].statsPrediction.assistTO}</td>
      <td>${data[i].statsPrediction.stl}</td>
      <td>${data[i].statsPrediction.blk}</td>
      <td>${data[i].statsPrediction.to}</td>
      <td>${data[i].statsPrediction.pts}</td>`;

    availablePlayers.appendChild(tableRow);
  }

  tableBody.appendChild(availablePlayers);
});
