// document.addEventListener("DOMContentLoaded", () => {
//   const picksList = document.querySelector(".picks-list");

//   for (let i = 0; i < 40; i++) {
//     const pickCard = document.createElement("div");
//     pickCard.classList.add("pick-history-card");
//     pickCard.classList.add("txt-dark-grey");
//     pickCard.classList.add("txt-sm");
//     pickCard.innerHTML = `<strong>Pick #${i + 1}:</strong> ${data[i].name}`;
//     picksList.appendChild(pickCard);
//   }
// });

const renderPickHistorySection = () => {
  const picksHistorySection = document.querySelector("#picks-history");
  picksHistorySection.innerHTML = `<h2>Pick History</h2>
    <div class="picks-list">
    </div>`;
};

export { renderPickHistorySection };
