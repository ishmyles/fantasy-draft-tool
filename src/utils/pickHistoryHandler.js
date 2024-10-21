import pubsub from "./pubsub";

export default function () {
  let _picks;

  const initialise = () => {
    if (!localStorage.getItem("fba-picks")) {
      localStorage.setItem("fba-picks", JSON.stringify([]));
      _picks = new Set();
    } else {
      const rosterList = JSON.parse(localStorage.getItem("fba-picks"));
      _picks = new Set(rosterList);
    }
    pubsub.subscribe("MARK_PLAYER_UNAVAILABLE", addPlayer);
    pubsub.subscribe("UNDO_PICK", removePlayer);
    pubsub.subscribe("RESET", resetPicks);
  };

  const addPlayer = (id) => {
    _picks.add(+id);
    localStorage.setItem("fba-picks", JSON.stringify([..._picks]));
  };

  const removePlayer = (id) => {
    _picks.delete(+id);
    localStorage.setItem("fba-picks", JSON.stringify([..._picks]));
  };

  const resetPicks = () => {
    localStorage.setItem("fba-picks", JSON.stringify([]));
    _picks = new Set();
  };

  return { initialise };
}
