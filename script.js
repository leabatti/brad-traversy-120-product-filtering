const products = [
    {
        name: 'Sony Playstation 5',
        url: 'images/playstation_5.png',
        type: 'games',
        price: 499.99,
    },
    {
        name: 'Samsung Galaxy',
        url: 'images/samsung_galaxy.png',
        type: 'smartphones',
        price: 399.99,
    },
    {
        name: 'Cannon EOS Camera',
        url: 'images/cannon_eos_camera.png',
        type: 'cameras',
        price: 749.99,
    },
    {
        name: 'Sony A7 Camera',
        url: 'images/sony_a7_camera.png',
        type: 'cameras',
        price: 1999.99,
    },
    {
        name: 'LG TV',
        url: 'images/lg_tv.png',
        type: 'televisions',
        price: 799.99,
    },
    {
        name: 'Nintendo Switch',
        url: 'images/nintendo_switch.png',
        type: 'games',
        price: 299.99,
    },
    {
        name: 'Xbox Series X',
        url: 'images/xbox_series_x.png',
        type: 'games',
        price: 499.99,
    },
    {
        name: 'Samsung TV',
        url: 'images/samsung_tv.png',
        type: 'televisions',
        price: 1099.99,
    },
    {
        name: 'Google Pixel',
        url: 'images/google_pixel.png',
        type: 'smartphones',
        price: 499.99,
    },
    {
        name: 'Sony ZV1F Camera',
        url: 'images/sony_zv1f_camera.png',
        type: 'cameras',
        price: 799.99,
    },
    {
        name: 'Toshiba TV',
        url: 'images/toshiba_tv.png',
        type: 'televisions',
        price: 499.99,
    },
    {
        name: 'iPhone 14',
        url: 'images/iphone_14.png',
        type: 'smartphones',
        price: 999.99,
    },
];


// Get DOM elements
const productsWrapperEl = document.getElementById('products-wrapper');
const checkEls = document.querySelectorAll('.check');
const filtersContainer = document.getElementById('filters-container');
const searchInput = document.getElementById('search');
const cartBtn = document.getElementById('cart-button');
const cartCount = document.getElementById('cart-count');

// Initialize cart item count
let cartItemCount = 0;

// Initialize products
const productsEls = [];

// Loop over products and create products elements
products.forEach((prod) => {
    const singleProductEl = createProductEl(prod);
    productsEls.push(singleProductEl);
    productsWrapperEl.appendChild(singleProductEl);
});

// Add filter event listeners
filtersContainer.addEventListener('change', filterProducts);
searchInput.addEventListener('input', filterProducts);

// Create product element
function createProductEl(prod) {
    const singleProductEl = document.createElement('div');

    singleProductEl.className = 'item space-y-2';

    singleProductEl.innerHTML = `
        <div class="bg-gray-100 flex justify-center relative overflow-hidden group cursor-pointer border">
            <img
                src="${prod.url}"
                alt="${prod.name}"
                class="w-full h-full object-cover"
            >
            <span class="status bg-black text-white absolute bottom-0 left-0 right-0 text-center py-2 translate-y-full transition group-hover:translate-y-0">Add To Cart</span>
        </div>
        <p class="text-xl">${prod.name}</p>
        <strong>$${prod.price.toLocaleString()}</strong>
    `;

    singleProductEl.querySelector('.status').addEventListener('click', addToCart);

    return singleProductEl;
}

// Toggle add/remove from cart
function addToCart(e) {
    const statusEl = e.target;

    if (statusEl.classList.contains('added')) {
        // Remove from cart
        statusEl.classList.remove('added');
        statusEl.innerText = 'Add To Cart';
        statusEl.classList.remove('bg-red-600');
        statusEl.classList.add('bg-gray-800');

        cartItemCount--;
    } else {
        // Add to cart
        statusEl.classList.add('added');
        statusEl.innerText = 'Remove From Cart';
        statusEl.classList.remove('bg-gray-800');
        statusEl.classList.add('bg-red-600');

        cartItemCount++;
    }

    // Update cart item count
    cartCount.innerText = cartItemCount.toString();
}

// Filter products by search or checkbox
function filterProducts() {
    // Get search term
    const searchTerm = searchInput.value.trim().toLocaleString();

    // Get checked categories
    const checkedCategories = Array.from(checkEls)
        .filter((check) => check.checked)
        .map((check) => check.id);
    
    // Loop over products and check for matches
    productsEls.forEach((singleProductEl, index) => {
        const product = products[index];

        // Check if product matches search term or checked categories
        const matchesSearchTerm = product.name.toLowerCase().includes(searchTerm);
        const isInCheckedCategory =
            checkedCategories.length === 0 ||
            checkedCategories.includes(product.type);
        
        // Show or hide product based on matches
        if (matchesSearchTerm && isInCheckedCategory) {
            singleProductEl.classList.remove('hidden');
        } else {
            singleProductEl.classList.add('hidden');
        }
    });
}