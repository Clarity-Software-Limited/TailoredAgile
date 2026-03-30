const cart = new Set();

const catalogGrid = document.getElementById("catalogGrid");
const typeFiltersEl = document.getElementById("typeFilters");
const catalogEmptyEl = document.getElementById("catalogEmpty");
const cartItemsEl = document.getElementById("cartItems");
const cartTotalEl = document.getElementById("cartTotal");
const cartCountEl = document.getElementById("cartCount");
const checkoutBtn = document.getElementById("checkoutBtn");
const cartToggle = document.getElementById("cartToggle");
const closeCart = document.getElementById("closeCart");
const cartPanel = document.getElementById("cartPanel");
const checkoutDialog = document.getElementById("checkoutDialog");
const checkoutSummary = document.getElementById("checkoutSummary");
const confirmOrderBtn = document.getElementById("confirmOrderBtn");

let activeType = "All";

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
  if (activeType === "All") return catalogItems;
  return catalogItems.filter((item) => item.type === activeType);
}

function renderCatalog() {
  catalogGrid.innerHTML = "";

  const visibleItems = getVisibleItems();
  visibleItems.forEach((item, idx) => {
    const isAdded = cart.has(item.id);
    const card = document.createElement("article");
    card.className = "item-card";
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

function addToCart(itemId) {
  cart.add(itemId);
  renderCatalog();
  renderCart();
}

function removeItem(itemId) {
  cart.delete(itemId);
  renderCatalog();
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
  if (!button) return;
  addToCart(button.dataset.id);
});

typeFiltersEl.addEventListener("click", (event) => {
  const button = event.target.closest("[data-filter]");
  if (!button) return;

  activeType = button.dataset.filter;
  renderTypeFilters();
  renderCatalog();
});

function buildCheckoutSummary() {
  checkoutSummary.innerHTML = "";
  for (const id of cart.values()) {
    const item = catalogItems.find((entry) => entry.id === id);
    if (!item) continue;
    const li = document.createElement("li");
    li.textContent = item.name;
    checkoutSummary.appendChild(li);
  }
}

checkoutBtn.addEventListener("click", () => {
  if (cart.size === 0) return;
  buildCheckoutSummary();
  checkoutDialog.showModal();
});

confirmOrderBtn.addEventListener("click", () => {
  cart.clear();
  renderCart();
});

cartToggle.addEventListener("click", () => {
  cartPanel.classList.add("open");
});

closeCart.addEventListener("click", () => {
  cartPanel.classList.remove("open");
});

renderCatalog();
renderTypeFilters();
renderCart();
