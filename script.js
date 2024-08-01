const API_URL =
  "https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=10&page=1&sparkline=false";

let cryptoData = [];

const fetchData = () => {
  fetch(API_URL)
    .then((res) => res.json())
    .then((data) => {
      cryptoData = data;
      renderTable(data);
    });
};
fetchData();

const sortChange = document.getElementById("sortChange");
sortChange.addEventListener("click", () => sort("price_change_percentage_24h"));

const sortMktCap = document.getElementById("sortMktCap");
sortMktCap.addEventListener("click", () => sort("market_cap"));

const searchInput = document.getElementById("search");
searchInput.addEventListener("input", (e) => {
  const searchQuery = e.target.value.toLowerCase();
  const filterData = cryptoData.filter(
    (coin) =>
      coin.name.toLowerCase().includes(searchQuery) ||
      coin.symbol.toLowerCase().includes(searchQuery)
  );

  renderTable(filterData);
});

const renderTable = (data) => {
  const tableBody = document.getElementById("table-body");
  tableBody.innerHTML = "";

  data.forEach((coin) => {
    const row = document.createElement("tr");
    const displayGreen =
      coin.price_change_percentage_24h >= 0 ? "green-text" : "red-text";

    row.innerHTML = `
       
    <td>
    <img src="${
      coin.image
    }" alt="" width="30" height="30"  style="vertical-align: middle; margin-right: 5px;" />
    ${coin.name}</td>
        <td>${coin.symbol.toUpperCase()}</td>
        <td>$${coin.current_price}</td>
        <td>${coin.total_volume}</td>
        <td class="${displayGreen}">${coin.price_change_percentage_24h}%</td>
        <td>Mkt Cap: $${coin.market_cap}</td>
      `;

    tableBody.appendChild(row);
  });
};

const sort = (key) => {
  const sortedData = [...cryptoData].sort((a, b) => b[key] - a[key]);
  renderTable(sortedData);
};
