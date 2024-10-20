import "./assets/styles/styles.css";
//import data from "./data/espnStats.json";

import {
  renderPlayersSection,
  renderPlayers,
} from "./views/availablePlayers.js";
import { addToRoster, renderRosterSection } from "./views/roster.js";
import { renderPickHistorySection } from "./views/pickHistory.js";

renderRosterSection();
renderPickHistorySection();
renderPlayersSection();

renderPlayers();

addToRoster(2);
