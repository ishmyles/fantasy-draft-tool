import pubsub from "./pubsub";

export default function () {
  let _team;

  const initialise = () => {
    if (!localStorage.getItem("fba-roster")) {
      localStorage.setItem("fba-roster", JSON.stringify([]));
      _team = new Set();
    } else {
      const rosterList = JSON.parse(localStorage.getItem("fba-roster"));
      _team = new Set(rosterList);
    }
    pubsub.subscribe("DRAFT_PLAYER", addPlayer);
    pubsub.subscribe("UNDO_DRAFT_PICK", removePlayer);
  };

  const addPlayer = (id) => {
    _team.add(+id);
    localStorage.setItem("fba-roster", JSON.stringify([..._team]));
  };

  const removePlayer = (id) => {
    _team.delete(+id);
    localStorage.setItem("fba-roster", JSON.stringify([..._team]));
  };

  return { initialise };
}
