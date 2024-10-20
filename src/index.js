import "./assets/styles/styles.css";

import { default as availablePlayers } from "./views/availablePlayers.js";
import { default as teamRoster } from "./views/roster.js";
import { default as pickHistory } from "./views/pickHistory.js";

const teamRosterSection = teamRoster();
const pickHistorySection = pickHistory();
const availablePlayersSection = availablePlayers();

teamRosterSection.initialise();
pickHistorySection.initialise();

availablePlayersSection.initialise();
availablePlayersSection.renderPlayers();
