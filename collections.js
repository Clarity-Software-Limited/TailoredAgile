const collectionsGrid = document.getElementById("collectionsGrid");

function getPracticeNames(ids) {
  return ids
    .map((id) => catalogItems.find((item) => item.id === id))
    .filter(Boolean)
    .map((item) => item.name);
}

function renderCollections() {
  collectionsGrid.innerHTML = "";

  collections.forEach((collection, idx) => {
    const card = document.createElement("article");
    card.className = "collection-card";
    card.style.animationDelay = `${idx * 55}ms`;

    const names = getPracticeNames(collection.items);
    const listItems = names.map((name) => `<li>${name}</li>`).join("");

    card.innerHTML = `
      <h2>${collection.name}</h2>
      <p class="collection-desc">${collection.description}</p>
      <ul class="collection-list">${listItems}</ul>
      <a class="checkout-btn collection-use" href="index.html?collection=${collection.id}">Use Collection</a>
    `;

    collectionsGrid.appendChild(card);
  });
}

renderCollections();
