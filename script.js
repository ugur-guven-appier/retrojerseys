// Product Database
const products = [
    // Red Category
    { id: 1, name: "Manchester '99", color: "Red", price: 89, img: "man_utd_99.webp" },
    { id: 2, name: "Liverpool '84", color: "Red", price: 79, img: "lfc_84.jpg" },
    { id: 3, name: "Arsenal '04", color: "Red", price: 110, img: "ars_04.webp" },
    { id: 4, name: "Bayern '96", color: "Red", price: 95, img: "fcb_96.jpg" },
    { id: 5, name: "Milan '89", color: "Red", price: 120, img: "milan_89.webp" },
    
    // Blue Category
    { id: 6, name: "Chelsea '98", color: "Blue", price: 85, img: "cfc_98.jpg" },
    { id: 7, name: "Italy '06", color: "Blue", price: 130, img: "italy_06.webp" },
    { id: 8, name: "France '98", color: "Blue", price: 140, img: "france_98.webp" },
    { id: 9, name: "Inter '98", color: "Blue", price: 105, img: "inter_98.jpg" },
    { id: 10, name: "Everton '85", color: "Blue", price: 70, img: "efc_85.jpg" },
    
    // Yellow Category
    { id: 11, name: "Brazil '70", color: "Yellow", price: 150, img: "brazil_70.jpg" },
    { id: 12, name: "Dortmund '97", color: "Yellow", price: 99, img: "bvb_97.webp" },
    { id: 13, name: "Arsenal '89 Away", color: "Yellow", price: 115, img: "afc_89.jpg" },
    { id: 14, name: "Colombia '90", color: "Yellow", price: 85, img: "col_90.webp" },
    { id: 15, name: "Sweden '94", color: "Yellow", price: 75, img: "sweden_94.webp" }
];

let cart = [];
let currentProduct = null;

// Navigation Logic
function showPage(pageId) {
    const sections = document.querySelectorAll('.page-section');
    sections.forEach(section => section.classList.add('hidden'));
    document.getElementById(pageId).classList.remove('hidden');
    window.scrollTo(0,0);
}

// Category Filter Logic
function filterCategory(color) {
    const listContainer = document.getElementById('product-list');
    const title = document.getElementById('cat-title');
    listContainer.innerHTML = '';
    title.innerText = color.toUpperCase() + " KITS";
    
    const filtered = products.filter(p => p.color === color);
    filtered.forEach(p => {
        listContainer.innerHTML += `
            <div class="group cursor-pointer" onclick="viewProduct(${p.id})">
                <div class="img-wrapper mb-4 border border-zinc-800 group-hover:border-white transition-all">
                    <img src="${p.img}" alt="${p.name}">
                </div>
                <h4 class="font-bold text-xs tracking-widest uppercase mb-1">${p.name}</h4>
                <p class="text-zinc-500 font-mono text-sm">$${p.price}</p>
            </div>
        `;
    });
    showPage('category');
}

// Product Page Logic
function viewProduct(id) {
    currentProduct = products.find(p => p.id === id);
    document.getElementById('detail-img').src = currentProduct.img;
    document.getElementById('detail-name').innerText = currentProduct.name;
    document.getElementById('detail-price').innerText = "$" + currentProduct.price;
    showPage('product-detail');
}

// Cart Logic
let selectedSize = null;

function selectSize(size) {
    selectedSize = size;
    // UI Update: remove active class from all, add to clicked
    document.querySelectorAll('.size-btn').forEach(btn => {
        btn.classList.remove('active');
        if(btn.innerText === size) btn.classList.add('active');
    });
}

// Update addToCart to include size and qty
function addToCart() {
    if(!selectedSize) {
        alert("Please select a size first.");
        return;
    }

    const qty = parseInt(document.getElementById('item-qty').value);
    
    const cartItem = {
        ...currentProduct,
        size: selectedSize,
        quantity: qty
    };

    cart.push(cartItem);
    
    // Reset for next time
    selectedSize = null;
    document.querySelectorAll('.size-btn').forEach(btn => btn.classList.remove('active'));
    document.getElementById('item-qty').value = 1;

    updateCartUI();
    showPage('cart');
}

// Update Cart UI to show size and count
function updateCartUI() {
    // Update the counter in the nav bar
    document.getElementById('cart-count').innerText = cart.length;
    
    const itemsContainer = document.getElementById('cart-items');
    const totalAmountDisplay = document.getElementById('cart-total-amount');
    
    if (cart.length === 0) {
        itemsContainer.innerHTML = `<p class="text-zinc-600 italic">Bag is empty.</p>`;
        totalAmountDisplay.innerText = "$0";
        return;
    }
    
    // Calculate the total price
    const total = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
    
    // Inject items into the list
    itemsContainer.innerHTML = cart.map(item => `
        <div class="flex justify-between items-center py-4 border-b border-zinc-900">
            <div>
                <span class="font-bold uppercase text-sm">${item.name}</span>
                <p class="text-xs text-zinc-500 uppercase">Size: ${item.size} | Qty: ${item.quantity}</p>
            </div>
            <span class="font-mono text-sm">$${item.price * item.quantity}</span>
        </div>
    `).join('');
    
    // Update the total display
    totalAmountDisplay.innerText = `$${total}`;
}
// Final Step: Complete Purchase
function completePurchase() {
    if (cart.length === 0) {
        alert("Please add items to your bag first.");
        return;
    }
    
    // Clear the cart array
    cart = [];
    
    // Reset UI
    updateCartUI();
    
    // Switch to success page
    showPage('success');
}