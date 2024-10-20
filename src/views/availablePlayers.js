import data from "../data/espnStats.json";

const renderPlayersSection = () => {
  const playersSection = document.querySelector("#available-players");
  playersSection.innerHTML = `<div class="table-actions">
                <div class="search-bar">
                    <input type="text" id="search">
                    <button type="button">Search</button>
                </div>
            </div>
            <table class="available-players-stats">
                <thead>
                    <tr>
                        <th scope="col">Rank</th>
                        <th scope="col"></th> <!--Player-->
                        <th scope="col">GP</th>
                        <th scope="col">FG%</th>
                        <th scope="col">FT%</th>
                        <th scope="col">3PM</th>
                        <th scope="col">REB</th>
                        <th scope="col">AST</th>
                        <th scope="col">A/TO</th>
                        <th scope="col">STL</th>
                        <th scope="col">BLK</th>
                        <th scope="col">TO</th>
                        <th scope="col">PTS</th>
                    </tr>
                </thead>
                <tbody>

                </tbody>
            </table>`;
};

const renderPlayers = () => {
  const tableBody = document.querySelector("tbody");
  const availablePlayers = new DocumentFragment();

  for (let i = 0; i < 1006; i++) {
    const tableRow = document.createElement("tr");
    tableRow.setAttribute("data-id", data[i].id);

    tableRow.innerHTML = `<th scope="row">${data[i].id}</th>
        <td scope="row">
          <div class="player-details">
            <span class="txt-row">${data[i].name}</span>
              <span class="txt-row"><span class="txt-sm txt-grey">${data[i].team}</span> 
              <span class="txt-sm txt-dark-grey txt-bold">${data[i].position}</span>
            </span>
          </div>
          <div class="draft-actions">
            <span class="btn btn-draft">Draft</span>
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" class="btn-picked" width="25px"><title>Mark as picked</title><path d="M12,2C17.53,2 22,6.47 22,12C22,17.53 17.53,22 12,22C6.47,22 2,17.53 2,12C2,6.47 6.47,2 12,2M15.59,7L12,10.59L8.41,7L7,8.41L10.59,12L7,15.59L8.41,17L12,13.41L15.59,17L17,15.59L13.41,12L17,8.41L15.59,7Z" /></svg>
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

  tableBody.addEventListener("click", (e) => {
    const tableRow = e.target.parentElement.parentElement.parentElement;
    const id = tableRow.dataset.id;

    if (e.target.classList.contains("btn-draft")) {
      tableRow.remove();
    } else if (e.target.nodeName === "svg") {
      tableRow.remove();
    } else if (e.target.nodeName === "path") {
      const tableRow =
        e.target.parentElement.parentElement.parentElement.parentElement;
      const id = tableRow.dataset.id;
      console.log(id);
      tableRow.remove();
    }
  });

  tableBody.appendChild(availablePlayers);
};

export { renderPlayersSection, renderPlayers };
