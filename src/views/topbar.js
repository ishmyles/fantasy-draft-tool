import pubsub from "../utils/pubsub.js";
import icon from "../assets/images/fba-logo.png";

export default function () {
  const initialise = () => {
    const topbar = document.querySelector(".topbar");
    topbar.innerHTML = `<div id="logo"></div>
                  <span class="btn-reset">RESET</span>`;

    const logo = document.querySelector("#logo");

    const appName = document.createElement("h1");
    appName.textContent = "Draft Tool";

    const appIcon = new Image();
    appIcon.src = icon;
    appIcon.width = "75";
    appIcon.height = "42";

    logo.appendChild(appIcon);
    logo.appendChild(appName);

    document.querySelector(".btn-reset").addEventListener("click", () => {
      pubsub.publish("RESET");
    });
  };

  return { initialise };
}
