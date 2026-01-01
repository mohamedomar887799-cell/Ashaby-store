// تخزين المنتجات الوهمية (يمكن توسيعها)
const products = [
    { id: 1, name: 'كتاب برمجة', price: 50, category: 'كتب', image: 'https://via.placeholder.com/200', description: 'كتاب عن البرمجة الأساسية.' },
    { id: 2, name: 'هاتف ذكي', price: 1000, category: 'إلكترونيات', image: 'https://via.placeholder.com/200', description: 'هاتف ذكي عالي الأداء.' },
    { id: 3, name: 'ملابس رياضية', price: 200, category: 'ملابس', image: 'https://via.placeholder.com/200', description: 'ملابس مريحة للرياضة.' }
];

// إدارة السلة
function getCart() { return JSON.parse(localStorage.getItem('cart')) || []; }
function saveCart(cart) { localStorage.setItem('cart', JSON.stringify(cart)); }
function addToCart(id) {
    const cart = getCart();
    const product = products.find(p => p.id == id);
    const existing = cart.find(item => item.id == id);
    if (existing) existing.quantity++;
    else cart.push({ ...product, quantity: 1 });
    saveCart(cart);
    alert('تم إضافة المنتج إلى السلة!');
}

// إدارة المستخدمين (بسيط)
function getUsers() { return JSON.parse(localStorage.getItem('users')) || []; }
function saveUsers(users) { localStorage.setItem('users', JSON.stringify(users)); }
function registerUser(username, password) {
    const users = getUsers();
    if (users.find(u => u.username === username)) return false;
    users.push({ username, password, orders: [] });
    saveUsers(users);
    localStorage.setItem('currentUser', username);
    return true;
}
function loginUser(username, password) {
    const users = getUsers();
    const user = users.find(u => u.username === username && u.password === password);
    if (user) localStorage.setItem('currentUser', username);
    return !!user;
}
function logout() { localStorage.removeItem('currentUser'); window.location.href = 'index.html'; }
function getCurrentUser() { return localStorage.getItem('currentUser'); }

// دالة بحث
function searchProducts(query) {
    return products.filter(p => p.name.toLowerCase().includes(query.toLowerCase()));
}