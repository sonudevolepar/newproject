
const products = [
  {
    id: 1,
    name: "Smartphone 128GB",
    category: "Electronics",
    description: "128GB storage • 6.5-inch display",
    price: 12999,
    oldPrice: 15999,
    rating: 4.5,
    badge: "Best Seller",
    image: "https://placehold.co/400x400/f3f6f2/244b35?text=Smartphone"
  },
  {
    id: 2,
    name: "Laptop 15-inch",
    category: "Electronics",
    description: "8GB RAM • 512GB SSD",
    price: 42999,
    oldPrice: 49999,
    rating: 4.6,
    badge: "Popular",
    image: "https://placehold.co/400x400/f3f6f2/244b35?text=Laptop"
  },
  {
    id: 3,
    name: "Wireless Earbuds",
    category: "Electronics",
    description: "Bluetooth • Long battery life",
    price: 1299,
    oldPrice: 1999,
    rating: 4.3,
    badge: "Trending",
    image: "https://placehold.co/400x400/f3f6f2/244b35?text=Earbuds"
  },
  {
    id: 4,
    name: "Running Shoes",
    category: "Fashion",
    description: "Lightweight • Everyday comfort",
    price: 1499,
    oldPrice: 2499,
    rating: 4.4,
    badge: "Hot Deal",
    image: "https://placehold.co/400x400/f3f6f2/244b35?text=Shoes"
  },
  {
    id: 5,
    name: "Casual T-Shirt",
    category: "Fashion",
    description: "Soft cotton • Regular fit",
    price: 499,
    oldPrice: 799,
    rating: 4.2,
    badge: "Popular",
    image: "https://placehold.co/400x400/f3f6f2/244b35?text=T-Shirt"
  },
  {
    id: 6,
    name: "Travel Backpack",
    category: "Fashion",
    description: "Spacious • Multiple pockets",
    price: 999,
    oldPrice: 1499,
    rating: 4.4,
    badge: "Best Value",
    image: "https://placehold.co/400x400/f3f6f2/244b35?text=Backpack"
  },
  {
    id: 7,
    name: "Table Lamp",
    category: "Home",
    description: "Modern design • Warm lighting",
    price: 799,
    oldPrice: 1199,
    rating: 4.1,
    badge: "New",
    image: "https://placehold.co/400x400/f3f6f2/244b35?text=Lamp"
  },
  {
    id: 8,
    name: "Storage Organizer",
    category: "Home",
    description: "Space saving • Multi-purpose",
    price: 399,
    oldPrice: 599,
    rating: 4.2,
    badge: "Popular",
    image: "https://placehold.co/400x400/f3f6f2/244b35?text=Organizer"
  },
  {
    id: 9,
    name: "Skincare Essentials",
    category: "Beauty",
    description: "Daily skincare care kit",
    price: 699,
    oldPrice: 999,
    rating: 4.3,
    badge: "Trending",
    image: "https://placehold.co/400x400/f3f6f2/244b35?text=Skincare"
  },
  {
    id: 10,
    name: "Face Moisturizer",
    category: "Beauty",
    description: "Daily moisturizing cream",
    price: 299,
    oldPrice: 449,
    rating: 4.1,
    badge: "Best Value",
    image: "https://placehold.co/400x400/f3f6f2/244b35?text=Moisturizer"
  },
  {
    id: 11,
    name: "Whole Wheat Atta",
    category: "Groceries",
    description: "5kg pack • Everyday essential",
    price: 245,
    oldPrice: 290,
    rating: 4.5,
    badge: "Daily Essential",
    image: "https://placehold.co/400x400/f3f6f2/244b35?text=Atta+5kg"
  },
  {
    id: 12,
    name: "Dry Fruits Pack",
    category: "Groceries",
    description: "Mixed nuts • 250g pack",
    price: 349,
    oldPrice: 449,
    rating: 4.4,
    badge: "Popular",
    image: "https://placehold.co/400x400/f3f6f2/244b35?text=Dry+Fruits"
  }
];

const productGrid = document.getElementById("productGrid");
const searchInput = document.getElementById("searchInput");
const cartCount = document.getElementById("cartCount");
const cartDrawer = document.getElementById("cartDrawer");
const cartItems = document.getElementById("cartItems");
const cartTotal = document.getElementById("cartTotal");
const overlay = document.getElementById("overlay");
const emptyMessage = document.getElementById("emptyMessage");
const productsTitle = document.getElementById("productsTitle");

let selectedCategory = "All";
let searchTerm = "";
let cart = [];

try {
  const savedCart = JSON.parse(localStorage.getItem("growlyCart") || "[]");

  if (Array.isArray(savedCart)) {
    cart = savedCart.filter(item =>
      products.some(product => product.id === item.id) &&
      Number.isInteger(item.quantity) &&
      item.quantity > 0 &&
      item.quantity <= 99
    );
  }
} catch {
  cart = [];
}

function formatPrice(price) {
  return new Intl.NumberFormat("en-IN", {
    style: "currency",
    currency: "INR",
    maximumFractionDigits: 0
  }).format(price);
}

function getFilteredProducts() {
  return products.filter(product => {
    const matchesCategory =
      selectedCategory === "All" ||
      product.category === selectedCategory;

    const searchableText =
      `${product.name} ${product.category} ${product.description}`.toLowerCase();

    const matchesSearch = searchableText.includes(searchTerm);

    return matchesCategory && matchesSearch;
  });
}

function renderProducts() {
  const filteredProducts = getFilteredProducts();

  productGrid.innerHTML = filteredProducts.map(product => `
    <article class="product-card">
      <span class="product-badge">${product.badge}</span>

      <div class="product-visual">
        <img
          src="${product.image}"
          alt="${product.name}"
          loading="lazy"
        >
      </div>

      <h3 class="product-name">${product.name}</h3>
      <p class="product-description">${product.description}</p>

      <div class="product-rating">
        ★★★★★ <small>(${product.rating})</small>
      </div>

      <div class="product-price">
        ${formatPrice(product.price)}
        <span class="old-price">${formatPrice(product.oldPrice)}</span>
      </div>

      <button class="add-cart" data-add="${product.id}">
        🛒 Add to Cart
      </button>
    </article>
  `).join("");

  emptyMessage.hidden = filteredProducts.length !== 0;
  productGrid.hidden = filteredProducts.length === 0;

  if (selectedCategory === "All") {
    productsTitle.textContent = searchTerm
      ? "Search Results"
      : "Best Selling Products";
  } else {
    productsTitle.textContent = selectedCategory + " Products";
  }
}

function saveCart() {
  localStorage.setItem("growlyCart", JSON.stringify(cart));
}

function addToCart(id) {
  const product = products.find(item => item.id === id);

  if (!product) return;

  const existingItem = cart.find(item => item.id === id);

  if (existingItem) {
    if (existingItem.quantity >= 99) {
      showToast("Maximum quantity reached");
      return;
    }

    existingItem.quantity++;
  } else {
    cart.push({ id, quantity: 1 });
  }

  saveCart();
  renderCart();
  showToast(product.name + " added to cart!");
}

function changeQuantity(id, amount) {
  const item = cart.find(item => item.id === id);

  if (!item) return;

  item.quantity += amount;

  if (item.quantity <= 0) {
    cart = cart.filter(item => item.id !== id);
  }

  saveCart();
  renderCart();
}

function removeFromCart(id) {
  cart = cart.filter(item => item.id !== id);
  saveCart();
  renderCart();
  showToast("Product removed from cart");
}

function renderCart() {
  const totalItems = cart.reduce(
    (total, item) => total + item.quantity, 0
  );

  const totalPrice = cart.reduce((total, item) => {
    const product = products.find(product => product.id === item.id);
    return total + (product ? product.price * item.quantity : 0);
  }, 0);

  cartCount.textContent = totalItems;
  cartTotal.textContent = formatPrice(totalPrice);

  if (cart.length === 0) {
    cartItems.innerHTML = `
      <div style="text-align:center;padding:50px 10px">
        <div style="font-size:48px">🛒</div>
        <h3 style="margin:12px 0">Your cart is empty</h3>
        <p style="font-size:12px;color:#718078">
          Add products to start shopping.
        </p>
      </div>
    `;
    return;
  }

  cartItems.innerHTML = cart.map(item => {
    const product = products.find(p => p.id === item.id);

    if (!product) return "";

    return `
      <div class="cart-item">
        <img src="${product.image}" alt="${product.name}">

        <div class="cart-item-info">
          <strong>${product.name}</strong>
          <p>${formatPrice(product.price * item.quantity)}</p>

          <div class="quantity">
            <button data-minus="${product.id}" aria-label="Decrease quantity">−</button>
            <span>${item.quantity}</span>
            <button data-plus="${product.id}" aria-label="Increase quantity">+</button>
          </div>
        </div>

        <button class="remove-item" data-remove="${product.id}">
          Remove
        </button>
      </div>
    `;
  }).join("");
}

function openCart() {
  cartDrawer.classList.add("open");
  overlay.classList.add("show");
  document.body.style.overflow = "hidden";
}

function closeCart() {
  cartDrawer.classList.remove("open");
  overlay.classList.remove("show");
  document.body.style.overflow = "";
}

let toastTimer;

function showToast(message) {
  const toast = document.getElementById("toast");

  toast.textContent = message;
  toast.classList.add("show");

  clearTimeout(toastTimer);

  toastTimer = setTimeout(() => {
    toast.classList.remove("show");
  }, 2400);
}

// Add products to cart
productGrid.addEventListener("click", event => {
  const button = event.target.closest("[data-add]");

  if (button) {
    addToCart(Number(button.dataset.add));
  }
});

// Update or remove cart items
cartItems.addEventListener("click", event => {
  const minus = event.target.closest("[data-minus]");
  const plus = event.target.closest("[data-plus]");
  const remove = event.target.closest("[data-remove]");

  if (minus) changeQuantity(Number(minus.dataset.minus), -1);
  if (plus) changeQuantity(Number(plus.dataset.plus), 1);
  if (remove) removeFromCart(Number(remove.dataset.remove));
});

// Search products
document.getElementById("searchForm").addEventListener("submit", event => {
  event.preventDefault();
  searchTerm = searchInput.value.trim().toLowerCase();
  renderProducts();
  document.getElementById("products").scrollIntoView();
});

// Category selection
document.querySelectorAll("[data-category]").forEach(button => {
  button.addEventListener("click", event => {
    event.preventDefault();

    selectedCategory = button.dataset.category;
    searchTerm = "";
    searchInput.value = "";

    document.querySelectorAll(".nav-link").forEach(link => {
      link.classList.toggle(
        "active",
        link.dataset.category === selectedCategory
      );
    });

    renderProducts();
    document.getElementById("products").scrollIntoView();
  });
});

// Live search
searchInput.addEventListener("input", () => {
  searchTerm = searchInput.value.trim().toLowerCase();
  renderProducts();
});

// Cart drawer
document.getElementById("cartToggle").addEventListener("click", openCart);
document.getElementById("closeCart").addEventListener("click", closeCart);
overlay.addEventListener("click", closeCart);

document.addEventListener("keydown", event => {
  if (event.key === "Escape") closeCart();
});

// Account demo
document.getElementById("accountBtn").addEventListener("click", () => {
  showToast("Login and signup will be added in the next step.");
});

// Demo checkout: no payment is collected
document.getElementById("checkoutBtn").addEventListener("click", () => {
  if (cart.length === 0) {
    showToast("Your cart is empty!");
    return;
  }

  showToast("Checkout is not connected yet.");
});

// Demo newsletter
document.getElementById("newsletterForm").addEventListener("submit", event => {
  event.preventDefault();
  showToast("Demo subscription submitted!");
  event.target.reset();
});

// View all products
document.getElementById("viewAll").addEventListener("click", () => {
  selectedCategory = "All";
  searchTerm = "";
  searchInput.value = "";
  renderProducts();
});

// All Categories button
document.getElementById("menuToggle").addEventListener("click", () => {
  document.querySelector(".categories-section").scrollIntoView({
    behavior: "smooth"
  });
});

document.getElementById("year").textContent = new Date().getFullYear();

renderProducts();
renderCart();
