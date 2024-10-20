import "./assets/styles/styles.css";
import data from "./data/espnStats.json";

document.addEventListener("DOMContentLoaded", () => {
  const tableBody = document.querySelector("tbody");
  const availablePlayers = new DocumentFragment();

  for (let i = 0; i < 1006; i++) {
    const tableRow = document.createElement("tr");

    tableRow.innerHTML = `<th scope="row">${data[i].id}</th>
      <td scope="row">
        <div class="player-details">
          <span class="txt-row">${data[i].name}</span>
            <span class="txt-row"><span class="txt-sm txt-grey">${data[i].team}</span> 
            <span class="txt-sm txt-dark-grey txt-bold">${data[i].position}</span>
          </span>
        </div>
      </td>
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

document.addEventListener("DOMContentLoaded", () => {
  const teamList = document.querySelector(".team-list");

  for (let i = 0; i < 14; i++) {
    const newCard = document.createElement("div");
    newCard.classList.add("player-card");
    newCard.classList.add("txt-xs");
    newCard.innerHTML = `<div>
      <span>${data[i].name} - </span>
      <span>${data[i].position}</span>
    </div>
    <table class="txt-xs">
      <tbody>
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
        <td>${data[i].statsPrediction.pts}</td>
      </tbody>
    </table>`;

    teamList.appendChild(newCard);
  }
});

document.addEventListener("DOMContentLoaded", () => {
  const picksList = document.querySelector(".picks-list");

  for (let i = 0; i < 40; i++) {
    const pickCard = document.createElement("div");
    pickCard.classList.add("pick-history-card");
    pickCard.classList.add("txt-dark-grey");
    pickCard.classList.add("txt-sm");
    pickCard.innerHTML = `<strong>Pick #${i + 1}:</strong> ${data[i].name}`;
    picksList.appendChild(pickCard);
  }
});
