import data from "../data/espnStats.json";
import pubsub from "../utils/pubsub.js";

export default function () {
  const initialise = () => {
    const playersSection = document.querySelector("#available-players");
    playersSection.innerHTML = `<div class="table-actions">
                      <h2>Players</h2>
                        <label for="position-category">Positions:
                            <select id="position-category">
                                <option value="ALL">All</option>
                                <option value="PG">PG</option>
                                <option value="SG">SG</option>
                                <option value="SF">SF</option>
                                <option value="PF">PF</option>
                                <option value="C">C</option>
                                <option value="G">G</option>
                                <option value="F">F</option>
                            </select>
                        </label>
                      <div class="search-bar">
                          <input type="text" id="search" placeholder="Search Player">
                          <button id="clear">Clear</button>
                      </div>
                  </div>
                  <table class="available-players-stats">
                      <thead>
                          <tr>
                              <th scope="col"><span class="btn-sort" data-stat="id">Rank</span></th>
                              <th scope="col"></th> <!--Player-->
                              <th scope="col"><span class="btn-sort" data-stat="gp">GP</span></th>
                              <th scope="col"><span class="btn-sort" data-stat="fg">FG%</span></th>
                              <th scope="col"><span class="btn-sort" data-stat="ft">FT%</span></th>
                              <th scope="col"><span class="btn-sort" data-stat="3pm">3PM</span></th>
                              <th scope="col"><span class="btn-sort" data-stat="reb">REB</span></th>
                              <th scope="col"><span class="btn-sort" data-stat="ast">AST</span></th>
                              <th scope="col"><span class="btn-sort" data-stat="assistTO">A/TO</span></th>
                              <th scope="col"><span class="btn-sort" data-stat="stl">STL</span></th>
                              <th scope="col"><span class="btn-sort" data-stat="blk">BLK</span></th>
                              <th scope="col"><span class="btn-sort" data-stat="to">TO</span></th>
                              <th scope="col"><span class="btn-sort" data-stat="pts">PTS</span></th>
                          </tr>
                      </thead>
                      <tbody>
      
                      </tbody>
                  </table>`;

    document
      .querySelector("#available-players table")
      .addEventListener("click", (e) => {
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
        } else if (e.target.nodeName === "SPAN") {
          sortPlayersByStats(e.target.dataset.stat);
        }
      });

    document
      .querySelector("#available-players table")
      .addEventListener("dblclick", (e) => {
        const id = e.target.dataset.id;
        if (e.target.classList.contains("wishlist")) {
          pubsub.publish("REMOVE_WISHLIST", id);
        } else {
          pubsub.publish("ADD_WISHLIST", id);
        }
        e.target.classList.toggle("wishlist");
      });

    // const sortDropdown = document.querySelector("#stat-category");
    // sortDropdown.addEventListener("change", (e) =>
    //   sortPlayersByStats(e.target.value)
    // );

    const filterDropdown = document.querySelector("#position-category");
    filterDropdown.addEventListener("change", (e) =>
      filterByPosition(e.target.value)
    );

    const searchbar = document.querySelector("#search");
    searchbar.addEventListener("input", (e) => searchPlayer(e.target.value));

    const clearBtn = document.querySelector("#clear");
    clearBtn.addEventListener("click", () => {
      document.querySelector("#search").value = "";
      searchPlayer("");
    });

    pubsub.subscribe("UNDO_PICK", renderPlayers);
    pubsub.subscribe("RESET", renderPlayers);
  };

  const renderPlayers = () => {
    setTimeout(() => {
      const list = new Set(JSON.parse(localStorage.getItem("fba-picks")));
      const wishlist = new Set(
        JSON.parse(localStorage.getItem("fba-wishlist"))
      );
      const table = document.querySelector("#available-players table");
      const tableBody = document.querySelector("#available-players tbody");
      const newtableBody = document.createElement("tbody");
      const availablePlayers = new DocumentFragment();

      data
        .filter((player) => !list.has(player.id))
        .forEach((player) => {
          const newRow = renderPlayerList(player, wishlist);
          availablePlayers.appendChild(newRow);
        });

      newtableBody.appendChild(availablePlayers);
      tableBody.remove();
      table.appendChild(newtableBody);
    }, 0);
  };

  const renderPlayerList = (player, wishlist) => {
    const newRow = document.createElement("tr");
    if (wishlist.has(player.id)) newRow.classList.add("wishlist");
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
    const picks = new Set(JSON.parse(localStorage.getItem("fba-picks")));
    const wishlist = new Set(JSON.parse(localStorage.getItem("fba-wishlist")));

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
      .filter((player) => !picks.has(player.id))
      .filter((player) => player.statsPrediction.gp)
      .sort(sortingFunction)
      .forEach((player) => {
        const tableRow = renderPlayerList(player, wishlist);
        newtableBody.appendChild(tableRow);
      });

    document.querySelector(".available-players-stats tbody").remove();
    table.appendChild(newtableBody);
  };

  const filterByPosition = (position) => {
    const table = document.querySelector(".available-players-stats");
    const newtableBody = document.createElement("tbody");
    const picks = new Set(JSON.parse(localStorage.getItem("fba-picks")));
    const wishlist = new Set(JSON.parse(localStorage.getItem("fba-wishlist")));

    data
      .filter((player) => !picks.has(player.id))
      .filter((player) => {
        const playerPositions = player.position.split(", ");
        if (position === "ALL") return true;
        if (position === "G") {
          return (
            playerPositions.includes("PG") || playerPositions.includes("SG")
          );
        } else if (position === "F") {
          return (
            playerPositions.includes("SF") || playerPositions.includes("PF")
          );
        } else {
          return playerPositions.includes(position);
        }
      })
      .forEach((player) => {
        const tableRow = renderPlayerList(player, wishlist);
        newtableBody.appendChild(tableRow);
      });

    document.querySelector(".available-players-stats tbody").remove();
    table.appendChild(newtableBody);
  };

  const searchPlayer = (input) => {
    const table = document.querySelector(".available-players-stats");
    const newtableBody = document.createElement("tbody");
    const picks = new Set(JSON.parse(localStorage.getItem("fba-picks")));
    const wishlist = new Set(JSON.parse(localStorage.getItem("fba-wishlist")));

    data
      .filter((player) => !picks.has(player.id))
      .filter((player) =>
        player.name.toLowerCase().includes(input.toLowerCase())
      )
      .forEach((player) => {
        const tableRow = renderPlayerList(player, wishlist);
        newtableBody.appendChild(tableRow);
      });

    document.querySelector(".available-players-stats tbody").remove();
    table.appendChild(newtableBody);
  };

  return { initialise, renderPlayers };
}
