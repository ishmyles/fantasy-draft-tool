import "./assets/styles/styles.css";

import { default as availablePlayers } from "./views/availablePlayers.js";
import { default as teamRoster } from "./views/roster.js";
import { default as pickHistory } from "./views/pickHistory.js";

import rosterHandler from "./utils/rosterHandler.js";
import pickHistoryHandler from "./utils/pickHistoryHandler.js";

const teamRosterSection = teamRoster();
const availablePlayersSection = availablePlayers();
const pickHistorySection = pickHistory();

const roster = rosterHandler();
const picks = pickHistoryHandler();

teamRosterSection.initialise();
availablePlayersSection.initialise();
pickHistorySection.initialise();

//localStorage.clear();

roster.initialise();
picks.initialise();

teamRosterSection.renderRoster();
pickHistorySection.renderPickHistory();

availablePlayersSection.renderPlayers();
