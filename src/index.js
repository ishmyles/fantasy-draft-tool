import "./assets/styles/styles.css";
import pubsub from "./utils/pubsub.js";

import { default as availablePlayers } from "./views/availablePlayers.js";
import { default as teamRoster } from "./views/roster.js";
import { default as pickHistory } from "./views/pickHistory.js";

import rosterHandler from "./utils/rosterHandler.js";
import pickHistoryHandler from "./utils/pickHistoryHandler.js";

const roster = rosterHandler();
const picks = pickHistoryHandler();

const teamRosterSection = teamRoster();
const availablePlayersSection = availablePlayers();
const pickHistorySection = pickHistory();

/* 
   Ordering is IMPORTANT! We want local storage handlers to initialise first to subscribe before DOM components.
   When DOM components publish an event, the local storage handlers are first to save the data before other
   DOM components access the local storage data to perform its logic.
*/
localStorage.clear();
roster.initialise();
picks.initialise();

teamRosterSection.initialise();
availablePlayersSection.initialise();
pickHistorySection.initialise();

teamRosterSection.renderRoster();
pickHistorySection.renderPickHistory();

availablePlayersSection.renderPlayers();

document.querySelector(".btn-reset").addEventListener("click", () => {
  pubsub.publish("RESET");
});
