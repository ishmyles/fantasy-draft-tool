import data from "../data/espnStats.json";
import pubsub from "../utils/pubsub";

export default function () {
  const initialise = () => {
    const rosterSection = document.querySelector("#team-roster");

    rosterSection.innerHTML = `<h2>Roster</h2>
                <div class="team-list">
                    <table class="txt-xs">
                        <thead>
                            <tr>
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
                    </table>
                </div>
                <h3>Team Totals</h3>
                <div class="team-totals">
                    <table class="txt-xs">
                        <thead>
                            <tr>
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
                            <tr>
                                <td>70</td>
                                <td>.491</td>
                                <td>.820</td>
                                <td>2.1</td>
                                <td>12.0</td>
                                <td>4.4</td>
                                <td>1.07</td>
                                <td>1.8</td>
                                <td>4.3</td>
                                <td>4.1</td>
                                <td>25.4</td>
                            </tr>
                        </tobdy>
                    </table>
                </div>`;

    pubsub.subscribe("DRAFT_PLAYER", addToRoster);
  };

  const addToRoster = (id) => {
    const teamList = document.querySelector(".team-list");

    const index = id - 1;
    const newCard = document.createElement("div");

    newCard.classList.add("player-card");
    newCard.classList.add("txt-xs");
    newCard.innerHTML = `<div>
        <span>${data[index].name} - </span>
        <span>${data[index].position}</span>
        </div>
        <table class="txt-xs">
        <tbody>
            <td>${data[index].statsPrediction.gp}</td>
            <td>${data[index].statsPrediction.fg}</td>
            <td>${data[index].statsPrediction.ft}</td>
            <td>${data[index].statsPrediction["3pm"]}</td>
            <td>${data[index].statsPrediction.reb}</td>
            <td>${data[index].statsPrediction.ast}</td>
            <td>${data[index].statsPrediction.assistTO}</td>
            <td>${data[index].statsPrediction.stl}</td>
            <td>${data[index].statsPrediction.blk}</td>
            <td>${data[index].statsPrediction.to}</td>
            <td>${data[index].statsPrediction.pts}</td>
        </tbody>
        </table>`;

    teamList.appendChild(newCard);
  };

  const calculateStatAggregate = () => {
    // TODO
  };

  return { initialise };
}
