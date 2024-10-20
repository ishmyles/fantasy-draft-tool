import data from "../data/espnStats.json";
import pubsub from "../utils/pubsub.js";

export default function () {
  const initialise = () => {
    const playersSection = document.querySelector("#available-players");
    playersSection.innerHTML = `<div class="table-actions">
                      <h2>Players</h2>
                      <div>
                      <label for="stat-category">Sort by:
                        <select id="stat-category">
                            <option value="id">Rank</option>
                            <option value="gp">GP</option>
                            <option value="fg">FG%</option>
                            <option value="tf">TF%</option>
                            <option value="3pm">3PM</option>
                            <option value="reb">REB</option>
                            <option value="ast">AST</option>
                            <option value="to">TO</option>
                            <option value="assistTO">A/TO</option>
                            <option value="stl">STL</option>
                            <option value="blk">BLK</option>
                            <option value="pts">PTS</option>
                        </select>
                      </label>
                      </div>
                      <div>
                        <label for="position-category">Filter by:
                            <select id="position-category">
                                <option value="PG">PG</option>
                                <option value="SG">SG</option>
                                <option value="SF">SF</option>
                                <option value="PF">PF</option>
                                <option value="C">C</option>
                                <option value="G">G</option>
                                <option value="F">F</option>
                                <option value="C">C</option>
                            </select>
                        </label>
                      </div>
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

    const sortDropdown = document.querySelector("#stat-category");
    sortDropdown.addEventListener("change", (e) =>
      sortPlayersByStats(e.target.value)
    );
  };

  const renderPlayers = () => {
    const tableBody = document.querySelector("tbody");
    const availablePlayers = new DocumentFragment();

    data.forEach((player) => {
      const newRow = renderPlayerList(player);
      availablePlayers.appendChild(newRow);
    });

    tableBody.addEventListener("click", (e) => {
      const tableRow = e.target.parentElement.parentElement.parentElement;
      const id = tableRow.dataset.id;

      if (e.target.classList.contains("btn-draft")) {
        tableRow.remove();
        pubsub.publish("DRAFT_PLAYER", id);
        pubsub.publish("MARK_PLAYER_UNAVAILABLE", id);
      } else if (e.target.nodeName === "svg") {
        tableRow.remove();
        pubsub.publish("MARK_PLAYER_UNAVAILABLE", id);
      } else if (e.target.nodeName === "path") {
        const tableRow =
          e.target.parentElement.parentElement.parentElement.parentElement;
        const id = tableRow.dataset.id;
        tableRow.remove();
        pubsub.publish("MARK_PLAYER_UNAVAILABLE", id);
      }
    });

    tableBody.appendChild(availablePlayers);
  };

  const renderPlayerList = (player) => {
    const newRow = document.createElement("tr");
    newRow.setAttribute("data-id", player.id);

    newRow.innerHTML = `<th scope="row">${player.id}</th>
          <td scope="row">
            <div class="player-details">
              <span class="txt-row">${player.name}</span>
                <span class="txt-row"><span class="txt-sm txt-grey">${player.team}</span> 
                <span class="txt-sm txt-dark-grey txt-bold">${player.position}</span>
              </span>
            </div>
            <div class="draft-actions">
              <span class="btn btn-draft">Draft</span>
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" class="btn-picked" width="25px"><title>Mark as picked</title><path d="M12,2C17.53,2 22,6.47 22,12C22,17.53 17.53,22 12,22C6.47,22 2,17.53 2,12C2,6.47 6.47,2 12,2M15.59,7L12,10.59L8.41,7L7,8.41L10.59,12L7,15.59L8.41,17L12,13.41L15.59,17L17,15.59L13.41,12L17,8.41L15.59,7Z" /></svg>
            </div>
          </td>
          <td>${player.statsPrediction.gp}</td>
          <td>${player.statsPrediction.fg}</td>
          <td>${player.statsPrediction.ft}</td>
          <td>${player.statsPrediction["3pm"]}</td>
          <td>${player.statsPrediction.reb}</td>
          <td>${player.statsPrediction.ast}</td>
          <td>${player.statsPrediction.assistTO}</td>
          <td>${player.statsPrediction.stl}</td>
          <td>${player.statsPrediction.blk}</td>
          <td>${player.statsPrediction.to}</td>
          <td>${player.statsPrediction.pts}</td>`;
    return newRow;
  };

  const sortPlayersByStats = (statCategory) => {
    const table = document.querySelector(".available-players-stats");
    const newtableBody = document.createElement("tbody");

    // Any stat that is not a TO will be descending order & only TO will be in ascending order
    const sortingFunction =
      statCategory !== "to"
        ? (a, b) =>
            Number(b.statsPrediction[statCategory]) -
            Number(a.statsPrediction[statCategory])
        : (a, b) =>
            Number(a.statsPrediction[statCategory]) -
            Number(b.statsPrediction[statCategory]);

    data
      .filter((player) => player.statsPrediction.gp)
      .sort(sortingFunction)
      .forEach((player) => {
        const tableRow = renderPlayerList(player);
        newtableBody.appendChild(tableRow);
      });

    document.querySelector("tbody").remove();
    table.appendChild(newtableBody);
  };

  return { initialise, renderPlayers };
}
