const catalogItems = [
  {
    id: "story-points",
    name: "Story Points",
    type: "Planning",
    price: 35,
    description: "Relative sizing to estimate delivery effort and uncertainty."
  },
  {
    id: "stories",
    name: "Stories",
    type: "Backlog",
    price: 29,
    description: "Outcome-focused work items for customer and team alignment."
  },
  {
    id: "two-week-iterations",
    name: "Two-Week Iterations",
    type: "Cadence",
    price: 44,
    description: "Fast feedback loops with regular planning and review cycles."
  },
  {
    id: "three-week-iterations",
    name: "Three-Week Iterations",
    type: "Cadence",
    price: 41,
    description: "Slightly longer windows for larger batch delivery."
  },
  {
    id: "continuous-deployment",
    name: "Continuous Deployment",
    type: "Delivery",
    price: 62,
    description: "Release validated changes to production automatically."
  },
  {
    id: "continuous-integration",
    name: "Continuous Integration",
    type: "Engineering",
    price: 56,
    description: "Merge often and test often to reduce integration risk."
  },
  {
    id: "automated-regression-testing",
    name: "Automated Regression Testing",
    type: "Quality",
    price: 74,
    description: "Protect features with repeatable checks against breakage."
  }
];

const cart = new Map();

const catalogGrid = document.getElementById("catalogGrid");
const cartItemsEl = document.getElementById("cartItems");
const cartTotalEl = document.getElementById("cartTotal");
const cartCountEl = document.getElementById("cartCount");
const checkoutBtn = document.getElementById("checkoutBtn");
const cartToggle = document.getElementById("cartToggle");
const closeCart = document.getElementById("closeCart");
const cartPanel = document.getElementById("cartPanel");
const checkoutDialog = document.getElementById("checkoutDialog");
const checkoutSummary = document.getElementById("checkoutSummary");
const checkoutTotal = document.getElementById("checkoutTotal");
const confirmOrderBtn = document.getElementById("confirmOrderBtn");

function formatMoney(value) {
  return `$${value.toFixed(0)}`;
}

function renderCatalog() {
  catalogItems.forEach((item, idx) => {
    const card = document.createElement("article");
    card.className = "item-card";
    card.style.animationDelay = `${idx * 55}ms`;
    card.innerHTML = `
      <span class="item-badge">${item.type}</span>
      <h3 class="item-title">${item.name}</h3>
      <p class="item-desc">${item.description}</p>
      <div class="item-footer">
        <span class="price">${formatMoney(item.price)}</span>
        <button class="add-btn" data-id="${item.id}">Add to Cart</button>
      </div>
    `;
    catalogGrid.appendChild(card);
  });

  catalogGrid.addEventListener("click", (event) => {
    const button = event.target.closest(".add-btn");
    if (!button) return;
    addToCart(button.dataset.id);
  });
}

function addToCart(itemId) {
  cart.set(itemId, (cart.get(itemId) || 0) + 1);
  renderCart();
}

function updateQty(itemId, delta) {
  const nextQty = (cart.get(itemId) || 0) + delta;
  if (nextQty <= 0) {
    cart.delete(itemId);
  } else {
    cart.set(itemId, nextQty);
  }
  renderCart();
}

function removeItem(itemId) {
  cart.delete(itemId);
  renderCart();
}

function getTotals() {
  let count = 0;
  let total = 0;
  for (const [id, qty] of cart.entries()) {
    const item = catalogItems.find((entry) => entry.id === id);
    if (!item) continue;
    count += qty;
    total += item.price * qty;
  }
  return { count, total };
}

function renderCart() {
  cartItemsEl.innerHTML = "";

  if (cart.size === 0) {
    cartItemsEl.innerHTML =
      '<p class="empty-cart">Your framework cart is empty. Start adding practices from the left.</p>';
  } else {
    for (const [id, qty] of cart.entries()) {
      const item = catalogItems.find((entry) => entry.id === id);
      if (!item) continue;

      const row = document.createElement("article");
      row.className = "cart-row";
      row.innerHTML = `
        <div>
          <h4>${item.name}</h4>
          <p>${item.type} • ${formatMoney(item.price)} each</p>
          <button class="remove-btn" data-remove="${item.id}">Remove</button>
        </div>
        <div>
          <div class="qty-controls">
            <button aria-label="decrease quantity" data-minus="${item.id}">-</button>
            <span class="qty">${qty}</span>
            <button aria-label="increase quantity" data-plus="${item.id}">+</button>
          </div>
          <p>${formatMoney(item.price * qty)}</p>
        </div>
      `;
      cartItemsEl.appendChild(row);
    }
  }

  const { count, total } = getTotals();
  cartCountEl.textContent = String(count);
  cartTotalEl.textContent = formatMoney(total);

  checkoutBtn.disabled = count === 0;
  checkoutBtn.style.opacity = count === 0 ? "0.65" : "1";
  checkoutBtn.style.cursor = count === 0 ? "not-allowed" : "pointer";
}

cartItemsEl.addEventListener("click", (event) => {
  const minusBtn = event.target.closest("[data-minus]");
  const plusBtn = event.target.closest("[data-plus]");
  const removeBtn = event.target.closest("[data-remove]");

  if (minusBtn) updateQty(minusBtn.dataset.minus, -1);
  if (plusBtn) updateQty(plusBtn.dataset.plus, 1);
  if (removeBtn) removeItem(removeBtn.dataset.remove);
});

function buildCheckoutSummary() {
  checkoutSummary.innerHTML = "";
  for (const [id, qty] of cart.entries()) {
    const item = catalogItems.find((entry) => entry.id === id);
    if (!item) continue;
    const li = document.createElement("li");
    li.textContent = `${qty} x ${item.name} (${formatMoney(item.price * qty)})`;
    checkoutSummary.appendChild(li);
  }

  const { total } = getTotals();
  checkoutTotal.textContent = formatMoney(total);
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
renderCart();
