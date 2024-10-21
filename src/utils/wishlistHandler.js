import pubsub from "./pubsub";

export default function () {
  let _wishlist;

  const initialise = () => {
    if (!localStorage.getItem("fba-wishlist")) {
      localStorage.setItem("fba-wishlist", JSON.stringify([]));
      _wishlist = new Set();
    } else {
      const wishlist = JSON.parse(localStorage.getItem("fba-wishlist"));
      _wishlist = new Set(wishlist);
    }
    pubsub.subscribe("ADD_WISHLIST", addPlayer);
    pubsub.subscribe("REMOVE_WISHLIST", removePlayer);
    pubsub.subscribe("RESET", resetwishlist);
  };

  const addPlayer = (id) => {
    _wishlist.add(+id);
    localStorage.setItem("fba-wishlist", JSON.stringify([..._wishlist]));
  };

  const removePlayer = (id) => {
    _wishlist.delete(+id);
    localStorage.setItem("fba-wishlist", JSON.stringify([..._wishlist]));
  };

  const resetwishlist = () => {
    localStorage.setItem("fba-wishlist", JSON.stringify([]));
    _wishlist = new Set();
  };

  return { initialise };
}
