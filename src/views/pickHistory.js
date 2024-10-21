import data from "../data/espnStats.json";
import pubsub from "../utils/pubsub";

export default function () {
  const initialise = () => {
    const picksHistorySection = document.querySelector("#picks-history");
    picksHistorySection.innerHTML = `<h2>Pick History</h2>
          <div class="picks-list">
          </div>`;
    pubsub.subscribe("MARK_PLAYER_UNAVAILABLE", addToPickHistory);
  };

  const renderPickHistory = () => {
    const list = new Set(JSON.parse(localStorage.getItem("fba-picks")));
    list.forEach((id) => addToPickHistory(id));
  };

  const addToPickHistory = (id) => {
    const picksList = document.querySelector(".picks-list");
    const picks = document.querySelectorAll(".pick-history-card");

    const index = id - 1;

    const pickCard = document.createElement("div");
    pickCard.classList.add("pick-history-card");
    pickCard.classList.add("txt-dark-grey");
    pickCard.classList.add("txt-sm");
    pickCard.innerHTML = `<strong>Pick #${picks.length + 1}:</strong> ${
      data[index].name
    }`;
    picksList.appendChild(pickCard);
  };

  return { initialise, renderPickHistory };
}
