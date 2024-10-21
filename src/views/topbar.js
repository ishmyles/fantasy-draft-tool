import pubsub from "../utils/pubsub.js";

export default function () {
  const initialise = () => {
    const topbar = document.querySelector(".topbar");
    topbar.innerHTML = `<div></div>
                  <span class="btn-reset">RESET</span>`;

    document.querySelector(".btn-reset").addEventListener("click", () => {
      pubsub.publish("RESET");
    });
  };

  return { initialise };
}
