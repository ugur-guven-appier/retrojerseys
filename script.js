// Product Database
const products = [
    // Red Category
    { id: 1, name: "Manchester '99", color: "Red", price: 89, img: "https://placehold.co/500x600/300000/ffffff?text=MAN+UTD+99" },
    { id: 2, name: "Liverpool '84", color: "Red", price: 79, img: "https://placehold.co/500x600/400000/ffffff?text=LFC+84" },
    { id: 3, name: "Arsenal '04", color: "Red", price: 110, img: "https://placehold.co/500x600/500000/ffffff?text=ARS+04" },
    { id: 4, name: "Bayern '96", color: "Red", price: 95, img: "https://placehold.co/500x600/600000/ffffff?text=FCB+96" },
    { id: 5, name: "Milan '89", color: "Red", price: 120, img: "https://placehold.co/500x600/200000/ffffff?text=MILAN+89" },
    
    // Blue Category
    { id: 6, name: "Chelsea '98", color: "Blue", price: 85, img: "https://placehold.co/500x600/000033/ffffff?text=CFC+98" },
    { id: 7, name: "Italy '06", color: "Blue", price: 130, img: "https://placehold.co/500x600/000044/ffffff?text=ITALY+06" },
    { id: 8, name: "France '98", color: "Blue", price: 140, img: "https://placehold.co/500x600/000055/ffffff?text=FRANCE+98" },
    { id: 9, name: "Inter '98", color: "Blue", price: 105, img: "https://placehold.co/500x600/000022/ffffff?text=INTER+98" },
    { id: 10, name: "Everton '85", color: "Blue", price: 70, img: "https://placehold.co/500x600/000066/ffffff?text=EFC+85" },
    
    // Yellow Category
    { id: 11, name: "Brazil '70", color: "Yellow", price: 150, img: "https://placehold.co/500x600/777700/000000?text=BRAZIL+70" },
    { id: 12, name: "Dortmund '97", color: "Yellow", price: 99, img: "https://placehold.co/500x600/888800/000000?text=BVB+97" },
    { id: 13, name: "Arsenal '89 Away", color: "Yellow", price: 115, img: "https://placehold.co/500x600/999900/000000?text=AFC+89" },
    { id: 14, name: "Colombia '90", color: "Yellow", price: 85, img: "https://placehold.co/500x600/aaaa00/000000?text=COL+90" },
    { id: 15, name: "Sweden '94", color: "Yellow", price: 75, img: "https://placehold.co/500x600/bbbb00/000000?text=SWEDEN+94" }
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
                <img src="${p.img}" class="w-full mb-4 border border-zinc-800 group-hover:border-white transition-all">
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
function addToCart() {
    cart.push(currentProduct);
    updateCartUI();
    showPage('cart');
}

function updateCartUI() {
    document.getElementById('cart-count').innerText = cart.length;
    const itemsContainer = document.getElementById('cart-items');
    
    if(cart.length === 0) {
        itemsContainer.innerHTML = `<p class="text-zinc-600 italic">Bag is empty.</p>`;
        return;
    }
    
    itemsContainer.innerHTML = cart.map(item => `
        <div class="flex justify-between items-center py-4 border-b border-zinc-900">
            <span class="font-bold uppercase text-sm">${item.name}</span>
            <span class="font-mono">$${item.price}</span>
        </div>
    `).join('');
}

// Final Step: Complete Purchase
function completePurchase() {
    if(cart.length === 0) {
        alert("Please add items to your bag first.");
        return;
    }
    // Simulation logic
    cart = [];
    updateCartUI();
    showPage('success');
}