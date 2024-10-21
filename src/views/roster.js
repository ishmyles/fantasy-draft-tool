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
                                <td data-stat="gp"></td>
                                <td data-stat="fg"></td>
                                <td data-stat="ft"></td>
                                <td data-stat="3pm"></td>
                                <td data-stat="reb"></td>
                                <td data-stat="ast"></td>
                                <td data-stat="assistTO"></td>
                                <td data-stat="stl"></td>
                                <td data-stat="blk"></td>
                                <td data-stat="to"></td>
                                <td data-stat="pts"></td>
                            </tr>
                        </tobdy>
                    </table>
                </div>`;

    pubsub.subscribe("DRAFT_PLAYER", addToRoster);
  };

  const renderRoster = () => {
    const list = new Set(JSON.parse(localStorage.getItem("fba-roster")));
    list.forEach((id) => addToRoster(id));
    calculateStatAggregate();
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
    calculateStatAggregate();
  };

  const calculateStatAggregate = () => {
    const roster = [];
    const list = new Set(JSON.parse(localStorage.getItem("fba-roster")));
    if (list.size === 0) return;

    const teamTotals = Array.from(
      document.querySelectorAll(".team-totals tbody td")
    );

    list.forEach((id) => {
      const index = id - 1;
      roster.push({
        gp: data[index].statsPrediction.gp,
        fg: data[index].statsPrediction.fg,
        ft: data[index].statsPrediction.ft,
        "3pm": data[index].statsPrediction["3pm"],
        reb: data[index].statsPrediction.reb,
        ast: data[index].statsPrediction.ast,
        to: data[index].statsPrediction.to,
        assistTO: data[index].statsPrediction.assistTO,
        stl: data[index].statsPrediction.stl,
        blk: data[index].statsPrediction.blk,
        pts: data[index].statsPrediction.pts,
      });
    });

    const initialAggr = {
      gp: 0,
      fg: 0,
      ft: 0,
      "3pm": 0,
      reb: 0,
      ast: 0,
      to: 0,
      assistTO: 0,
      stl: 0,
      blk: 0,
      pts: 0,
    };

    const aggrAvgStats = roster.reduce((aggr, current) => {
      aggr.gp += +current.gp;
      aggr.fg += +current.fg;
      aggr.ft += +current.ft;
      aggr["3pm"] += +current["3pm"];
      aggr.reb += +current.reb;
      aggr.ast += +current.ast;
      aggr.to += +current.to;
      aggr.assistTO += +current.assistTO;
      aggr.stl += +current.stl;
      aggr.blk += +current.blk;
      aggr.pts += +current.pts;
      return aggr;
    }, initialAggr);

    for (const [key, value] of Object.entries(aggrAvgStats)) {
      if (key === "gp") {
        aggrAvgStats[key] = Math.round(value / roster.length);
      } else if (key === "fg" || key === "ft") {
        aggrAvgStats[key] = (value / roster.length).toFixed(3);
      } else if (key === "assistTO") {
        aggrAvgStats[key] = (value / roster.length).toFixed(2);
      } else {
        aggrAvgStats[key] = (value / roster.length).toFixed(1);
      }
    }

    for (let i = 0; i < teamTotals.length; i++) {
      teamTotals[i].textContent = aggrAvgStats[teamTotals[i].dataset.stat];
    }
  };

  return { initialise, renderRoster };
}
