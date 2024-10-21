import data from "../data/espnStats.json";
import pubsub from "../utils/pubsub";

export default function () {
  const initialise = () => {
    const picksHistorySection = document.querySelector("#picks-history");
    picksHistorySection.innerHTML = `<div>
        <h2>Pick History <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" class="btn-undo" height="25px"><title>arrow-u-left-top</title><path d="M20 13.5C20 17.09 17.09 20 13.5 20H6V18H13.5C16 18 18 16 18 13.5S16 9 13.5 9H7.83L10.91 12.09L9.5 13.5L4 8L9.5 2.5L10.92 3.91L7.83 7H13.5C17.09 7 20 9.91 20 13.5Z" /></svg></h2>
    </div>
          <div class="picks-list">
          </div>`;

    const undoBtn = document.querySelector(".btn-undo");
    undoBtn.addEventListener("click", () => {
      const recentPick = document.querySelector(
        ".pick-history-card:last-of-type"
      );

      if (recentPick) {
        recentPick.remove();
        removeLastPick(recentPick.dataset.id);
      }
    });
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
    pickCard.setAttribute("data-id", id);
    pickCard.innerHTML = `<strong>Pick #${picks.length + 1}:</strong> ${
      data[index].name
    }`;
    picksList.appendChild(pickCard);
  };

  const removeLastPick = (id) => {
    const list = new Set(JSON.parse(localStorage.getItem("fba-roster")));
    pubsub.publish("UNDO_PICK", id);

    if (list.has(+id)) {
      pubsub.publish("UNDO_DRAFT_PICK", id);
    }
  };

  return { initialise, renderPickHistory };
}
