const cart = new Set();

const catalogGrid = document.getElementById("catalogGrid");
const nameSearchEl = document.getElementById("nameSearch");
const antiPatternsFilterEl = document.getElementById("antiPatternsFilter");
const typeFiltersEl = document.getElementById("typeFilters");
const catalogEmptyEl = document.getElementById("catalogEmpty");
const cartItemsEl = document.getElementById("cartItems");
const cartTotalEl = document.getElementById("cartTotal");
const cartCountEl = document.getElementById("cartCount");
const checkoutBtn = document.getElementById("checkoutBtn");
const cartToggle = document.getElementById("cartToggle");
const cartPanel = document.getElementById("cartPanel");

let activeType = "All";
let searchText = "";
let showAntiPatterns = false;

function applyCollectionFromQuery() {
  const params = new URLSearchParams(window.location.search);
  const collectionId = params.get("collection");
  if (!collectionId || typeof collections === "undefined") return;

  const selectedCollection = collections.find((entry) => entry.id === collectionId);
  if (!selectedCollection) return;

  cart.clear();
  selectedCollection.items.forEach((id) => {
    if (catalogItems.some((item) => item.id === id)) {
      cart.add(id);
    }
  });

  activeType = "All";
  searchText = "";
  showAntiPatterns = false;
  if (nameSearchEl) nameSearchEl.value = "";
  if (antiPatternsFilterEl) {
    antiPatternsFilterEl.classList.remove("active");
    antiPatternsFilterEl.setAttribute("aria-pressed", "false");
  }

  if (window.history.replaceState) {
    window.history.replaceState({}, document.title, "index.html");
  }
}

function getTypes() {
  return ["All", ...new Set(catalogItems.map((item) => item.type))];
}

function renderTypeFilters() {
  typeFiltersEl.innerHTML = "";
  getTypes().forEach((type) => {
    const button = document.createElement("button");
    button.type = "button";
    button.className = `filter-btn${type === activeType ? " active" : ""}`;
    button.dataset.filter = type;
    button.textContent = type;
    typeFiltersEl.appendChild(button);
  });
}

function getVisibleItems() {
  const normalizedSearch = searchText.trim().toLowerCase();

  return catalogItems.filter((item) => {
    const typeMatches = activeType === "All" || item.type === activeType;
    const nameMatches =
      normalizedSearch === "" || item.name.toLowerCase().includes(normalizedSearch);
    const antiPatternMatches = !showAntiPatterns || item.antiPattern === true;
    return typeMatches && nameMatches && antiPatternMatches;
  });
}

function renderCatalog() {
  catalogGrid.innerHTML = "";

  const visibleItems = getVisibleItems();
  visibleItems.forEach((item, idx) => {
    const isAdded = cart.has(item.id);
    const card = document.createElement("article");
    card.className = `item-card${item.antiPattern ? " item-card--anti-pattern" : ""}`;
    card.dataset.id = item.id;
    card.style.animationDelay = `${idx * 55}ms`;
    card.innerHTML = `
      <span class="item-badge">${item.type}</span>
      <h3 class="item-title">${item.name}</h3>
      <p class="item-desc">${item.description}</p>
      <div class="item-footer">
        <button class="add-btn${isAdded ? " is-added" : ""}" data-id="${item.id}" ${
          isAdded ? "disabled" : ""
        }>${isAdded ? "Added" : "Add"}</button>
      </div>
    `;
    catalogGrid.appendChild(card);
  });

  catalogEmptyEl.hidden = visibleItems.length !== 0;
}

function syncCatalogItemState(itemId) {
  const addButton = catalogGrid.querySelector(`.add-btn[data-id="${itemId}"]`);
  if (!addButton) return;

  const isAdded = cart.has(itemId);
  addButton.classList.toggle("is-added", isAdded);
  addButton.disabled = isAdded;
  addButton.textContent = isAdded ? "Added" : "Add";
}

function addToCart(itemId) {
  cart.add(itemId);
  syncCatalogItemState(itemId);
  renderCart();
}

function removeItem(itemId) {
  cart.delete(itemId);
  syncCatalogItemState(itemId);
  renderCart();
}

function getTotals() {
  let count = 0;
  for (const id of cart.values()) {
    const item = catalogItems.find((entry) => entry.id === id);
    if (!item) continue;
    count += 1;
  }
  return { count };
}

function getCartItems() {
  const items = [];
  for (const id of cart.values()) {
    const item = catalogItems.find((entry) => entry.id === id);
    if (item) items.push(item);
  }
  return items;
}

function renderCart() {
  cartItemsEl.innerHTML = "";

  if (cart.size === 0) {
    cartItemsEl.innerHTML =
      '<p class="empty-cart">Your ways of working are empty. Start adding practices from the left.</p>';
  } else {
    for (const id of cart.values()) {
      const item = catalogItems.find((entry) => entry.id === id);
      if (!item) continue;

      const row = document.createElement("article");
      row.className = "cart-row";
      row.innerHTML = `
        <div>
          <h4>${item.name}</h4>
          <p>${item.type}</p>
          <button class="remove-btn" data-remove="${item.id}">Remove</button>
        </div>
      `;
      cartItemsEl.appendChild(row);
    }
  }

  const { count } = getTotals();
  cartCountEl.textContent = String(count);
  cartTotalEl.textContent = `${count} item${count === 1 ? "" : "s"}`;

  checkoutBtn.disabled = count === 0;
  checkoutBtn.style.opacity = count === 0 ? "0.65" : "1";
  checkoutBtn.style.cursor = count === 0 ? "not-allowed" : "pointer";
}

cartItemsEl.addEventListener("click", (event) => {
  const removeBtn = event.target.closest("[data-remove]");
  if (removeBtn) removeItem(removeBtn.dataset.remove);
});

catalogGrid.addEventListener("click", (event) => {
  const button = event.target.closest(".add-btn");
  if (button) {
    addToCart(button.dataset.id);
    return;
  }

  const card = event.target.closest(".item-card");
  if (!card) return;
  window.location.href = `practice.html?id=${card.dataset.id}`;
});

typeFiltersEl.addEventListener("click", (event) => {
  const button = event.target.closest("[data-filter]");
  if (!button) return;

  activeType = button.dataset.filter;
  renderTypeFilters();
  renderCatalog();
});

nameSearchEl.addEventListener("input", (event) => {
  searchText = event.target.value;
  renderCatalog();
});

antiPatternsFilterEl.addEventListener("click", () => {
  showAntiPatterns = !showAntiPatterns;
  antiPatternsFilterEl.classList.toggle("active", showAntiPatterns);
  antiPatternsFilterEl.setAttribute("aria-pressed", String(showAntiPatterns));
  renderCatalog();
});

checkoutBtn.addEventListener("click", () => {
  if (cart.size === 0) return;
  const selectedItems = getCartItems();
  if (window.pdfExport && typeof window.pdfExport.openPdfBundle === "function") {
    window.pdfExport.openPdfBundle(selectedItems);
  } else {
    alert("PDF export is unavailable right now. Please refresh and try again.");
  }
});

cartToggle.addEventListener("click", () => {
  cartPanel.classList.add("open");
});

applyCollectionFromQuery();
renderCatalog();
renderTypeFilters();
renderCart();
