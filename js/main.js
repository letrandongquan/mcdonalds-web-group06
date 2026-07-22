// ============================================================
// 0. TỰ ĐỘNG XOÁ GIỎ HÀNG KHI TẢI LẠI TRANG (F5 / nút Reload)
// Khi bấm link để chuyển sang trang khác trong site, giỏ hàng vẫn được giữ nguyên.
// Chạy ngay khi file này được nạp (trước khi các phần khác đọc giỏ hàng).
// ============================================================
(function resetCartOnReload() {
  try {
    let isReload = false;
    const navEntries = performance.getEntriesByType && performance.getEntriesByType('navigation');
    if (navEntries && navEntries.length > 0) {
      isReload = navEntries[0].type === 'reload';
    } else if (performance.navigation) {
      // Fallback cho trình duyệt cũ không hỗ trợ Navigation Timing API cấp 2
      isReload = performance.navigation.type === 1;
    }
    if (isReload) {
      localStorage.removeItem('mcdCart');
    }
  } catch (e) {
    // Nếu trình duyệt không hỗ trợ, bỏ qua - không ảnh hưởng phần còn lại
  }
})();

// ============================================================
// 1. BURGER MENU TOGGLE (Mobile)
// ============================================================
const burgerBtn = document.getElementById('burgerBtn');
const navLinks = document.getElementById('navLinks');
if (burgerBtn && navLinks) {
  burgerBtn.addEventListener('click', () => navLinks.classList.toggle('open'));
  navLinks.querySelectorAll('a').forEach(a => a.addEventListener('click', () => navLinks.classList.remove('open')));
}

// ============================================================
// 2. NÚT GIỎ HÀNG TRÊN HEADER - ĐIỀU HƯỚNG SANG cart.html
// ============================================================
// Gắn 1 lần duy nhất tại đây (dùng chung cho mọi trang có nhúng main.js)
// để tránh tình trạng nút chỉ hoạt động trên 1 số trang.
function goToCartPage(e) {
  if (e) e.preventDefault();
  if (/cart\.html$/.test(window.location.pathname)) {
    window.scrollTo({ top: 0, behavior: 'smooth' });
    return;
  }
  window.location.href = 'cart.html';
}

function initCartButton() {
  const cartBtn = document.getElementById('cartBtn');
  if (cartBtn && !cartBtn.dataset.bound) {
    cartBtn.addEventListener('click', goToCartPage);
    cartBtn.dataset.bound = 'true'; // tránh gắn trùng nếu script chạy lại
  }
}

// ============================================================
// 3. GIỎ HÀNG - LOCALSTORAGE
// ============================================================

// Lấy giỏ hàng từ localStorage
function getCart() {
  try {
    return JSON.parse(localStorage.getItem('mcdCart')) || [];
  } catch {
    return [];
  }
}

// Lưu giỏ hàng vào localStorage
function saveCart(cart) {
  localStorage.setItem('mcdCart', JSON.stringify(cart));
}

// Cập nhật badge giỏ hàng trên header
function updateCartBadge() {
  const cart = getCart();
  const total = cart.reduce((sum, item) => sum + item.qty, 0);
  document.querySelectorAll('#cartBadge').forEach(el => {
    el.textContent = total;
  });
  return total;
}

// Thêm sản phẩm vào giỏ
function addToCart(name, price, image = '', desc = '') {
  const cart = getCart();
  const existing = cart.find(item => item.name === name);
  
  if (existing) {
    existing.qty += 1;
  } else {
    cart.push({ 
      name: name, 
      price: price, 
      qty: 1, 
      image: image, 
      desc: desc 
    });
  }
  
  saveCart(cart);
  updateCartBadge();
  return cart;
}

// ============================================================
// 4. XỬ LÝ NÚT "+" TRÊN CÁC TRANG
// ============================================================

// Hàm xử lý khi click nút "+" trên trang
function handleAddToCart(button, name, price, image = '', desc = '') {
  addToCart(name, price, image, desc);
  
  // Feedback hiệu ứng
  button.textContent = '✓';
  button.style.background = '#3CC468';
  button.style.borderColor = '#3CC468';
  button.style.color = '#fff';
  
  setTimeout(() => {
    button.textContent = '+';
    button.style.background = 'transparent';
    button.style.borderColor = 'var(--border)';
    button.style.color = 'var(--text)';
  }, 900);
}

// Định dạng tiền tệ (dùng chung cho toàn site)
function formatPrice(price) {
  return price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, '.') + 'đ';
}

// ============================================================
// 3.1 DỮ LIỆU SẢN PHẨM & CHI TIẾT SẢN PHẨM
// ============================================================
const PRODUCT_DETAIL_DATA = [
  {
    id: 1,
    name: 'Big Mac',
    category: 'Burger',
    price: 69000,
    image: 'images/menu/burger/big-mac.jpg',
    description: 'Hai lớp bò, sốt Big Mac đặc biệt, rau diếp, phô mai, dưa chua và hành tây.',
    badge: 'Best seller',
    features: ['2 lớp thịt bò mềm và thơm', 'Rau diếp tươi và dưa chua giòn', 'Sốt Big Mac đặc trưng'],
    extra: 'Phù hợp cho bữa ăn nhanh, đầy đặn và tiện lợi bất cứ lúc nào.'
  },
  {
    id: 2,
    name: 'McChicken',
    category: 'Burger',
    price: 39000,
    image: 'images/menu/burger/mcchicken.jpg',
    description: 'Gà giòn tan, sốt mayonnaise, rau diếp tươi trong bánh mì mềm.',
    badge: 'Phổ biến',
    features: ['Gà giòn tan lớp vỏ đặc trưng', 'Sốt mayonnaise mịn và thơm', 'Bánh mì mềm, dễ ăn'],
    extra: 'Lựa chọn hoàn hảo cho những ai thích hương vị gà vừa ngọt vừa giòn.'
  },
  {
    id: 3,
    name: 'McChicken Cay',
    category: 'Burger',
    price: 42000,
    image: 'images/menu/burger/mcchicken-cay.jpg',
    description: 'Phiên bản cay nồng của McChicken, dành cho tín đồ vị cay.',
    badge: 'Cay',
    features: ['Vị cay nồng đậm đà', 'Gà giòn bên trong mềm', 'Phù hợp tín đồ thích thử thách'],
    extra: 'Một lựa chọn mới lạ cho những ai muốn thêm chút kích thích vào bữa ăn.'
  },
  {
    id: 4,
    name: 'McCrispy Cổ Điển',
    category: 'Gà rán',
    price: 49000,
    image: 'images/menu/ga-ran/mccrispy-co-dien.jpg',
    description: 'Đùi gà giòn tan, rau diếp tươi, sốt mayonnaise nguyên bản.',
    badge: 'Món mới',
    features: ['Đùi gà giòn tan bên ngoài', 'Rau diếp tươi và sốt mayo', 'Bánh mì mềm, hấp dẫn'],
    extra: 'Đậm vị gà rán nổi tiếng với lớp vỏ giòn và nhân mềm.'
  },
  {
    id: 5,
    name: 'Cheeseburger',
    category: 'Burger',
    price: 29000,
    image: 'images/menu/burger/cheeseburger.jpg',
    description: 'Bò nướng, phô mai cheddar, dưa chua, sốt mù tạt và cà chua.',
    badge: 'Bình dân',
    features: ['Phô mai cheddar tan chảy', 'Hương vị bò nướng đậm đà', 'Dưa chua và cà chua tươi mát'],
    extra: 'Một món burger nhỏ gọn, dễ lựa chọn cho bữa ăn nhẹ.'
  },
  {
    id: 6,
    name: 'Double Cheeseburger',
    category: 'Burger',
    price: 49000,
    image: 'images/menu/burger/double-cheeseburger.jpg',
    description: 'Hai lớp thịt bò, hai lớp phô mai cho bữa ăn no nê hơn.',
    badge: 'No nê',
    features: ['2 lớp thịt bò', '2 lớp phô mai', 'Bánh mì mềm và thơm'],
    extra: 'Dành cho những ai muốn một món burger dày và đầy đủ hơn.'
  },
  {
    id: 7,
    name: 'Quarter Pounder Phô Mai',
    category: 'Burger',
    price: 65000,
    image: 'images/menu/burger/quarter-pounder.jpg',
    description: '1/4 pound thịt bò tươi, hai lớp phô mai, hành tây thái lát.',
    badge: 'Mới',
    features: ['Thịt bò tươi, dày và đậm vị', 'Phô mai tan chảy', 'Hành tây thơm nhẹ'],
    extra: 'Một phiên bản burger đậm chất thịt bò cho bữa ăn thật đáng nhớ.'
  },
  {
    id: 8,
    name: 'Filet-O-Fish',
    category: 'Burger',
    price: 45000,
    image: 'images/menu/burger/filet-o-fish.jpg',
    description: 'Cá tuyết chiên giòn, sốt tartar và phô mai trong bánh mì hấp mềm.',
    badge: 'Cá',
    features: ['Cá tuyết chiên giòn', 'Sốt tartar thơm ngon', 'Phô mai béo ngậy'],
    extra: 'Lựa chọn lý tưởng nếu bạn muốn đổi vị khỏi các món thịt.'
  },
  {
    id: 9,
    name: 'Spicy McDeluxe',
    category: 'Burger',
    price: 52000,
    image: 'images/menu/burger/spicy-mcdeluxe.jpg',
    description: 'Gà giòn tẩm vị cay, rau diếp, cà chua tươi, sốt đặc biệt.',
    badge: 'Cay',
    features: ['Vị cay vừa phải và hấp dẫn', 'Gà giòn bên trong mềm', 'Sốt đặc biệt đậm đà'],
    extra: 'Một món burger gà cay đậm phong cách cho ngày khó ăn.'
  },
  {
    id: 10,
    name: 'McCrispy Cay',
    category: 'Gà rán',
    price: 52000,
    image: 'images/menu/ga-ran/mccrispy-cay.jpg',
    description: 'Vị cay nồng đặc trưng phủ trên lớp vỏ giòn rụm.',
    badge: 'Cay',
    features: ['Vỏ giòn rụm', 'Vị cay đậm đà', 'Nhân gà mềm ngọt'],
    extra: 'Phù hợp cho những ai thích ăn cay và muốn thưởng thức gà giòn.'
  },
  {
    id: 11,
    name: 'Gà Rán Giòn Cay (2 miếng)',
    category: 'Gà rán',
    price: 59000,
    image: 'images/menu/ga-ran/ga-ran-gion-cay.jpg',
    description: 'Gà rán nguyên miếng, ướp gia vị cay đậm đà, chiên giòn vàng.',
    badge: 'Best seller',
    features: ['2 miếng gà rán nguyên miếng', 'Vỏ giòn vàng hấp dẫn', 'Gia vị cay đậm đà'],
    extra: 'Một món ăn tiện lợi để thưởng thức cùng khoai tây chiên và đồ uống.'
  },
  {
    id: 12,
    name: 'Gà Viên Chiên Giòn (6 miếng)',
    category: 'Gà rán',
    price: 59000,
    image: 'images/menu/ga-ran/ga-vien-chien-gion.jpg',
    description: 'Viên gà giòn rụm, dùng kèm sốt tự chọn: tương cà, mù tạt mật ong, BBQ.',
    badge: 'Phổ biến',
    features: ['6 viên gà giòn mềm thơm', 'Có nhiều loại sốt kèm', 'Dễ ăn và tiện lợi'],
    extra: 'Phù hợp cho nhóm bạn hoặc bữa ăn vui vẻ cùng bạn bè.'
  },
  {
    id: 13,
    name: 'Cánh Gà Sốt Cay (3 miếng)',
    category: 'Gà rán',
    price: 45000,
    image: 'images/menu/ga-ran/canh-ga-sot-cay.jpg',
    description: 'Cánh gà chiên giòn, áo lớp sốt cay ngọt hấp dẫn.',
    badge: 'Cay',
    features: ['3 miếng cánh gà chiên giòn', 'Sốt cay ngọt hấp dẫn', 'Phù hợp cho tín đồ vị cay'],
    extra: 'Món ăn đầy hương vị cho những lần thèm đêm.'
  },
  {
    id: 14,
    name: 'Coca-Cola',
    category: 'Đồ uống',
    price: 20000,
    image: 'images/menu/do-uong/coca-cola.jpg',
    description: 'Nước ngọt có gas mát lạnh, chọn size theo nhu cầu.',
    badge: 'Mát lạnh',
    features: ['Giải khát tức thì', 'Nhiều size lựa chọn', 'Mùi vị quen thuộc'],
    extra: 'Kết hợp tuyệt vời với các món burger và gà rán.'
  },
  {
    id: 15,
    name: 'Sprite',
    category: 'Đồ uống',
    price: 20000,
    image: 'images/menu/do-uong/sprite.jpg',
    description: 'Vị chanh the mát, sảng khoái tức thì, chọn size theo nhu cầu.',
    badge: 'Sảng khoái',
    features: ['Vị chanh mát lạnh', 'Giải khát tức thì', 'Chọn size linh hoạt'],
    extra: 'Một lựa chọn hoàn hảo cho những ai thích đồ uống có ga nhẹ và tươi.'
  },
  {
    id: 16,
    name: 'Fanta Cam',
    category: 'Đồ uống',
    price: 20000,
    image: 'images/menu/do-uong/fanta-cam.jpg',
    description: 'Vị cam tươi mát, chọn size theo nhu cầu.',
    badge: 'Tươi mát',
    features: ['Vị cam tươi ngon', 'Mát lạnh và sảng khoái', 'Phù hợp mọi lứa tuổi'],
    extra: 'Đậm vị cam tự nhiên, rất hợp cho những buổi ăn ngoài.'
  },
  {
    id: 17,
    name: 'Trà Đào Cam Sả',
    category: 'Đồ uống',
    price: 29000,
    image: 'images/menu/do-uong/tra-dao-cam-sa.jpg',
    description: 'Trà thơm kết hợp đào, cam và sả tươi mát.',
    badge: 'Mới',
    features: ['Hương trà thơm dịu', 'Đào cam sả tươi mát', 'Thích hợp cho ngày nóng'],
    extra: 'Một thức uống thanh mát, vừa ngọt vừa thơm.'
  },
  {
    id: 18,
    name: 'McCafé Americano / Latte',
    category: 'Đồ uống',
    price: 29000,
    image: 'images/menu/do-uong/mccafe.jpg',
    description: 'Cà phê rang xay nguyên chất, nóng hoặc đá tùy chọn.',
    badge: 'Cà phê',
    features: ['Cà phê rang xay nguyên chất', 'Nóng hoặc đá tùy chọn', 'Hương thơm đậm đà'],
    extra: 'Phù hợp cho những ai muốn một tách cà phê thơm ngon trong ngày.'
  },
  {
    id: 19,
    name: 'Sữa Lắc Vani / Dâu / Socola',
    category: 'Đồ uống',
    price: 35000,
    image: 'images/menu/do-uong/sua-lac.jpg',
    description: 'Sữa lắc mịn béo, mát lạnh, tan chảy trong miệng.',
    badge: 'Ngon ngậy',
    features: ['Mịn béo và thơm', 'Nhiều hương vị lựa chọn', 'Mát lạnh và dễ uống'],
    extra: 'Một món thức uống vừa ngon vừa phù hợp cho mọi đối tượng.'
  },
  {
    id: 20,
    name: 'Combo Big Mac',
    category: 'Combo',
    price: 89000,
    image: 'images/combo/combo_big_mac.webp',
    description: 'Big Mac + Khoai tây chiên vừa + Nước uống vừa.',
    badge: 'Tiết kiệm',
    features: ['Big Mac đầy đủ', 'Khoai tây chiên vừa', 'Nước uống vừa'],
    extra: 'Combo lý tưởng cho bữa ăn no nê và tiện lợi.'
  },
  {
    id: 21,
    name: 'Combo McCrispy',
    category: 'Combo',
    price: 75000,
    image: 'images/combo/combo_mccrispy.avif',
    description: 'McCrispy + Khoai tây chiên vừa + Nước uống vừa.',
    badge: 'Hot',
    features: ['McCrispy giòn thơm', 'Khoai tây chiên vừa', 'Nước uống vừa'],
    extra: 'Với combo này, bạn vừa có gà vừa có khoai và đồ uống.'
  },
  {
    id: 22,
    name: 'Combo Cheeseburger',
    category: 'Combo',
    price: 59000,
    image: 'images/combo/combo_cheeseburger.jpg',
    description: 'Cheeseburger + Khoai tây chiên vừa + Nước uống vừa.',
    badge: 'Tiết kiệm',
    features: ['Cheeseburger thơm ngon', 'Khoai tây giòn nóng', 'Nước uống mát lạnh'],
    extra: 'Combo dễ chọn cho bữa ăn nhanh nhưng vẫn đầy đủ.'
  },
  {
    id: 23,
    name: 'Combo Gà Rán',
    category: 'Combo',
    price: 89000,
    image: 'images/combo/combo_garan.jpg',
    description: '2 miếng Gà Rán + Khoai tây chiên vừa + 2 Nước uống vừa.',
    badge: 'Gia đình',
    features: ['2 miếng gà rán', 'Khoai tây chiên vừa', '2 nước uống vừa'],
    extra: 'Dành cho những bữa ăn cùng bạn bè và gia đình.'
  },
  {
    id: 24,
    name: 'Combo Gia Đình',
    category: 'Combo',
    price: 299000,
    image: 'images/combo/combo_giadinh.jpg',
    description: '2 Big Mac + 2 Gà Rán + 2 Khoai tây chiên vừa + 2 Nước uống lớn.',
    badge: 'Giá cực tốt',
    features: ['2 Big Mac', '2 gà rán', '2 khoai tây', '2 nước uống lớn'],
    extra: 'Một combo hoàn hảo cho bữa ăn thật vui vẻ cùng gia đình.'
  },
  {
    id: 25,
    name: 'Egg McMuffin',
    category: 'Bữa sáng',
    price: 35000,
    image: 'images/breakfast/egg_mcmuffin.jpg',
    description: 'Trứng, phô mai và thịt muối trong bánh muffin Anh nướng.',
    badge: 'Mới sáng',
    features: ['Trứng tươi thơm ngon', 'Phô mai tan chảy', 'Thịt muối đậm vị'],
    extra: 'Một món bữa sáng tiện lợi và đầy năng lượng cho buổi sáng bắt đầu.'
  },
  {
    id: 26,
    name: 'Bánh Hotcakes',
    category: 'Bữa sáng',
    price: 39000,
    image: 'images/breakfast/hotcake.jpg',
    description: '3 lớp bánh xốp mềm, kèm bơ và syrup phong.',
    badge: 'Ngọt ngào',
    features: ['3 lớp bánh xốp mềm', 'Bơ thơm béo', 'Syrup ngọt dịu'],
    extra: 'Phù hợp cho những ai muốn bắt đầu ngày mới bằng một món ngọt nhẹ.'
  },
  {
    id: 27,
    name: 'Burger Sáng Gà Trứng',
    category: 'Bữa sáng',
    price: 39000,
    image: 'images/breakfast/burger.png',
    description: 'Gà giòn, trứng ốp và phô mai trong bánh mì mềm.',
    badge: 'Đậm vị',
    features: ['Gà giòn thơm ngon', 'Trứng ốp mềm', 'Phô mai tan chảy'],
    extra: 'Một lựa chọn bữa sáng vừa no lại vừa đầy hương vị.'
  },
  {
    id: 28,
    name: 'Bánh Táo Nướng',
    category: 'Tráng miệng',
    price: 19000,
    image: 'images/trangmieng/banh_tao_nuong.png',
    description: 'Vỏ bánh giòn rụm, nhân táo nóng hổi thơm quế.',
    badge: 'Ngon nóng',
    features: ['Nhân táo thơm quế', 'Vỏ bánh giòn rụm', 'Nóng hổi và thơm ngon'],
    extra: 'Một món tráng miệng ấm áp thích hợp cho những lúc muốn ngọt dịu.'
  },
  {
    id: 29,
    name: 'Kem Sundae Socola / Dâu',
    category: 'Tráng miệng',
    price: 19000,
    image: 'images/trangmieng/kem_sundae.webp',
    description: 'Kem mềm mịn phủ sốt socola hoặc dâu đậm đà.',
    badge: 'Mềm mịn',
    features: ['Kem mịn và lạnh ngọt', 'Sốt socola hoặc dâu', 'Dễ ăn, dễ thưởng thức'],
    extra: 'Lựa chọn hoàn hảo để kết thúc bữa ăn bằng vị ngọt dịu.'
  },
  {
    id: 30,
    name: 'Bánh Donut Phủ Đường',
    category: 'Tráng miệng',
    price: 15000,
    image: 'images/trangmieng/donut.jpg',
    description: 'Mềm xốp, phủ lớp đường ngọt dịu bên ngoài.',
    badge: 'Đường phủ',
    features: ['Mềm xốp và thơm', 'Lớp đường phủ ngọt dịu', 'Dễ mang đi'],
    extra: 'Một món bánh nhỏ gọn, phù hợp cho bữa ăn nhẹ hoặc ăn vặt.'
  },
  {
    id: 31,
    name: 'Kem Ốc Quế',
    category: 'Tráng miệng',
    price: 10000,
    image: 'images/trangmieng/kem_oc_que.png',
    description: 'Kem vani mềm mịn trong vỏ ốc quế giòn tan.',
    badge: 'Giòn tan',
    features: ['Kem vani mịn', 'Vỏ ốc quế giòn tan', 'Món ăn nhẹ và ngọt'],
    extra: 'Một món tráng miệng nhỏ xinh, vừa ngọt vừa vui vẻ.'
  }
];

function getProductDetailById(id) {
  const numericId = Number(id);
  return PRODUCT_DETAIL_DATA.find(product => product.id === numericId) || PRODUCT_DETAIL_DATA[0];
}

function getProductIdFromCard(card) {
  const directId = card.getAttribute('data-product-id');
  if (directId) return Number(directId);

  const heading = card.querySelector('h4, .combo-body h4')?.textContent?.trim() || '';
  const normalizedHeading = heading.toLowerCase();

  const match = PRODUCT_DETAIL_DATA.find(product => {
    const normalizedName = product.name.toLowerCase();
    return normalizedHeading.includes(normalizedName) || normalizedName.includes(normalizedHeading);
  });

  return match ? match.id : null;
}

function renderProductDetailPage() {
  const detailRoot = document.querySelector('[data-product-detail-root]');
  if (!detailRoot) return;

  const params = new URLSearchParams(window.location.search);
  const product = getProductDetailById(params.get('id'));

  const titleEl = document.querySelector('title');
  if (titleEl) titleEl.textContent = `${product.name} - McDonald's`;

  detailRoot.querySelector('.product-category').textContent = product.category;
  detailRoot.querySelector('.product-title').textContent = product.name;
  detailRoot.querySelector('.product-desc').textContent = product.description;
  detailRoot.querySelector('.product-price').textContent = formatPrice(product.price);
  detailRoot.querySelector('.product-badge').textContent = product.badge || 'Món ăn mới';

  const imageEl = detailRoot.querySelector('.product-image');
  imageEl.src = product.image;
  imageEl.alt = product.name;

  const featuresList = detailRoot.querySelector('.product-features');
  if (featuresList) {
    featuresList.innerHTML = product.features.map(item => `<li>${item}</li>`).join('');
  }

  const extraEl = detailRoot.querySelector('.product-extra');
  if (extraEl) extraEl.textContent = product.extra || '';
}

function initProductCardNavigation() {
  document.querySelectorAll('.item-card, .combo-card').forEach(card => {
    if (card.dataset.detailBound === 'true') return;

    card.addEventListener('click', function(e) {
      if (e.target.closest('button, a, input, select, textarea, .size-selector')) return;

      const productId = getProductIdFromCard(this);
      if (productId) {
        e.preventDefault();
        window.location.href = `product-detail.html?id=${productId}`;
      }
    });

    card.dataset.detailBound = 'true';
  });
}

renderProductDetailPage();
initProductCardNavigation();

function initQuantityControls() {
  const qtyInput = document.getElementById('qtyInput');
  const plusBtn = document.querySelector('.qty-btn[data-action="plus"]');
  const minusBtn = document.querySelector('.qty-btn[data-action="minus"]');

  if (!qtyInput || !plusBtn || !minusBtn) return;

  plusBtn.addEventListener('click', function() {
    const currentValue = parseInt(qtyInput.value, 10) || 1;
    qtyInput.value = Math.min(10, currentValue + 1);
  });

  minusBtn.addEventListener('click', function() {
    const currentValue = parseInt(qtyInput.value, 10) || 1;
    qtyInput.value = Math.max(1, currentValue - 1);
  });
}

initQuantityControls();

// ============================================================
// 3.1 BỘ CHỌN SIZE (S/M/L) - cho các món có nhiều kích cỡ
// ============================================================
document.querySelectorAll('.size-selector').forEach(selector => {
  const buttons = selector.querySelectorAll('.size-btn');
  buttons.forEach(btn => {
    btn.addEventListener('click', function(e) {
      e.preventDefault();
      e.stopPropagation();

      // Đổi trạng thái active trong cùng bộ chọn
      buttons.forEach(b => b.classList.remove('active'));
      this.classList.add('active');

      // Cập nhật giá hiển thị trên item-foot theo size vừa chọn
      const card = this.closest('.item-card') || this.closest('.combo-card');
      const priceEl = card ? card.querySelector('.item-foot .price') : null;
      const newPrice = parseInt(this.getAttribute('data-price')) || 0;
      if (priceEl) priceEl.textContent = formatPrice(newPrice);
    });
  });
});

// Gắn sự kiện cho tất cả nút ".add-btn" trên trang
document.querySelectorAll('.add-btn').forEach(btn => {
  btn.addEventListener('click', function(e) {
    e.preventDefault();
    e.stopPropagation();
    
    // Lấy thông tin sản phẩm từ card
    const card = this.closest('.item-card') || this.closest('.combo-card');
    if (!card) return;
    
    const nameEl = card.querySelector('h4');
    const imgEl = card.querySelector('.item-img img');
    const descEl = card.querySelector('p');

    let name = nameEl ? nameEl.textContent.trim() : 'Sản phẩm';
    const image = imgEl ? imgEl.getAttribute('src') : '';
    const desc = descEl ? descEl.textContent.trim() : '';

    // Nếu món này có bộ chọn size, lấy giá + gắn size vào tên để phân biệt trong giỏ hàng
    const activeSizeBtn = card.querySelector('.size-selector .size-btn.active');
    let price;
    if (activeSizeBtn) {
      price = parseInt(activeSizeBtn.getAttribute('data-price')) || 0;
      const sizeLabel = activeSizeBtn.getAttribute('data-size');
      name = name + ' (Size ' + sizeLabel + ')';
    } else {
      const priceEl = card.querySelector('.price');
      const priceText = priceEl ? priceEl.textContent.trim() : '0đ';
      price = parseInt(priceText.replace(/[^0-9]/g, '')) || 0;
    }
    
    handleAddToCart(this, name, price, image, desc);
  });
});

// ============================================================
// 5. PRODUCT DETAIL - THÊM VÀO GIỎ
// ============================================================
const qtyInput = document.getElementById('qtyInput');
const addToCartBtn = document.getElementById('addToCartBtn');

if (addToCartBtn && qtyInput) {
  addToCartBtn.addEventListener('click', function() {
    const qty = parseInt(qtyInput.value) || 1;
    
    // Lấy thông tin sản phẩm từ trang
    const nameEl = document.querySelector('.product-info h2');
    const priceEl = document.querySelector('.product-info .price');
    const imgEl = document.querySelector('.product-images img');
    
    const name = nameEl ? nameEl.textContent.trim() : 'Sản phẩm';
    const priceText = priceEl ? priceEl.textContent.trim() : '0đ';
    const price = parseInt(priceText.replace(/[^0-9]/g, '')) || 0;
    const image = imgEl ? imgEl.getAttribute('src') : '';
    
    // Thêm sản phẩm với số lượng qty
    const cart = getCart();
    const existing = cart.find(item => item.name === name);
    
    if (existing) {
      existing.qty += qty;
    } else {
      cart.push({ name, price, qty, image, desc: '' });
    }
    
    saveCart(cart);
    updateCartBadge();
    
    this.textContent = 'Đã thêm!';
    setTimeout(() => { 
      this.textContent = 'Thêm vào giỏ'; 
    }, 1500);
  });
}

// ============================================================
// 6. NEWSLETTER FORM
// ============================================================
const newsForm = document.querySelector('.news-form');
if (newsForm) {
  newsForm.addEventListener('submit', function(e) {
    e.preventDefault();
    const btn = this.querySelector('button[type="submit"]');
    const input = this.querySelector('input');
    
    if (!input || !input.value.trim()) {
      alert('Vui lòng nhập email của bạn!');
      return;
    }
    
    btn.textContent = 'Đã đăng ký';
    btn.style.background = '#3CC468';
    btn.style.color = '#fff';
    
    setTimeout(() => {
      btn.textContent = 'Đăng ký';
      btn.style.background = 'var(--red)';
      btn.style.color = '#fff';
      if (input) input.value = '';
    }, 2000);
  });
}

// ============================================================
// 7. CHIPS ACTIVE STATE (cho trang menu.html)
// ============================================================
const chips = document.querySelectorAll('.chip');

chips.forEach(chip => {
  chip.addEventListener('click', function(e) {
    // Nếu chip là link đến trang khác, không can thiệp
    if (this.tagName === 'A' && this.getAttribute('href') && !this.getAttribute('href').includes('#')) {
      return; // để trình duyệt điều hướng bình thường
    }
    
    e.preventDefault();
    
    chips.forEach(c => c.classList.remove('active'));
    this.classList.add('active');
    
    const href = this.getAttribute('href') || '';
    const hashIndex = href.indexOf('#');
    
    if (hashIndex !== -1) {
      const id = href.slice(hashIndex + 1);
      showCategory(id);
      if (location.hash !== '#' + id) location.hash = id;
    }
  });
});

// ============================================================
// 8. HIỂN THỊ DANH MỤC TRÊN MENU (menu.html)
// ============================================================
function showCategory(id) {
  if (!id) id = 'burger';
  
  document.querySelectorAll('.tab-content').forEach(s => {
    s.classList.toggle('active', s.id === 'tab-' + id);
  });
  
  // Cập nhật chips active state trong page
  document.querySelectorAll('.chips .chip').forEach(a => {
    const href = a.getAttribute('href') || '';
    const hashIndex = href.indexOf('#');
    if (hashIndex !== -1) {
      const target = href.slice(hashIndex + 1);
      a.classList.toggle('active', target === id);
    }
  });
}

// ============================================================
// 9. HASH CHANGE - ĐIỀU HƯỚNG THEO URL
// ============================================================
window.addEventListener('hashchange', () => {
  const id = location.hash ? location.hash.replace('#', '') : 'burger';
  showCategory(id);
});

// ============================================================
// 10. KHỞI TẠO KHI TRANG LOAD
// ============================================================
document.addEventListener('DOMContentLoaded', function() {
  // Gắn sự kiện click cho nút giỏ hàng trên header (mọi trang)
  initCartButton();

  // Cập nhật badge giỏ hàng
  updateCartBadge();
  
  // Nếu đang ở trang menu, hiển thị tab từ URL
  if (document.querySelector('.tab-content')) {
    const id = location.hash ? location.hash.replace('#', '') : 'burger';
    showCategory(id);
  }
  
  // Nút "Xem" sản phẩm trên trang chủ
  document.querySelectorAll('.item-card .btn-secondary').forEach(btn => {
    btn.addEventListener('click', function(e) {
      // Giữ nguyên hành vi mặc định (đi đến product-detail)
    });
  });
});

// ============================================================
// 11. EXPOSE FUNCTIONS TO GLOBAL SCOPE
// ============================================================
window.getCart = getCart;
window.saveCart = saveCart;
window.updateCartBadge = updateCartBadge;
window.addToCart = addToCart;
window.handleAddToCart = handleAddToCart;
window.showCategory = showCategory;
window.goToCartPage = goToCartPage;
window.initCartButton = initCartButton;