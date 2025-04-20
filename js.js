// ملف js الرئيسي - التحكم بسلوك العناصر في الصفحة
// ربط الأحداث الخاصة بنموذج الطلب المتعدد الخطوات

document.addEventListener('DOMContentLoaded', function () {
  const steps = document.querySelectorAll('.form-step');
  const nextBtns = document.querySelectorAll('.btn-next');
  const prevBtns = document.querySelectorAll('.btn-prev');
  const form = document.getElementById('multi-step-form');
  let currentStep = 0;

  function showStep(index) {
    steps.forEach((step, i) => {
      step.classList.toggle('active', i === index);
    });
  }

  nextBtns.forEach(btn => {
    btn.addEventListener('click', function (e) {
      e.preventDefault();
      if (currentStep < steps.length - 1) {
        currentStep++;
        showStep(currentStep);
      }
    });
  });

  prevBtns.forEach(btn => {
    btn.addEventListener('click', function (e) {
      e.preventDefault();
      if (currentStep > 0) {
        currentStep--;
        showStep(currentStep);
      }
    });
  });

  showStep(currentStep);
});

// تبديل عرض/إخفاء كلمة المرور
document.querySelectorAll('.toggle-password').forEach(toggle => {
  toggle.addEventListener('click', function () {
    const input = this.previousElementSibling;
    if (input.type === 'password') {
      input.type = 'text';
      this.textContent = 'إخفاء';
    } else {
      input.type = 'password';
      this.textContent = 'إظهار';
    }
  });
});

// تعديل الواجهة حسب حالة تسجيل الدخول
function updateUserUI(isLoggedIn, userData) {
  const loginSection = document.getElementById('login-section');
  const dashboardSection = document.getElementById('dashboard-section');
  if (isLoggedIn) {
    loginSection.classList.add('hidden');
    dashboardSection.classList.remove('hidden');
    document.getElementById('user-name').textContent = userData.name;
  } else {
    loginSection.classList.remove('hidden');
    dashboardSection.classList.add('hidden');
  }
}

// نموذج تسجيل الدخول
document.getElementById('login-form').addEventListener('submit', function (e) {
  e.preventDefault();
  const email = document.getElementById('login-email').value;
  const password = document.getElementById('login-password').value;

  // استدعاء وهمي لتسجيل الدخول (يتم استبداله بقاعدة بيانات لاحقًا)
  if (email === 'brandedcalculator@gmail.com' && password === 'hackxd720242024') {
    const userData = { name: 'Admin', email };
    updateUserUI(true, userData);
    alert('تم تسجيل الدخول بنجاح');
  } else {
    alert('البريد الإلكتروني أو كلمة المرور غير صحيحة');
  }
});

// تسجيل الخروج
document.getElementById('logout-btn').addEventListener('click', function () {
  updateUserUI(false, null);
  alert('تم تسجيل الخروج');
});

// تمرير سلس للأقسام
document.querySelectorAll('a.scroll-link').forEach(link => {
  link.addEventListener('click', function (e) {
    e.preventDefault();
    const targetId = this.getAttribute('href').slice(1);
    const target = document.getElementById(targetId);
    if (target) {
      window.scrollTo({
        top: target.offsetTop - 50,
        behavior: 'smooth'
      });
    }
  });
});
// التحقق من حالة تسجيل المستخدم قبل إرسال النموذج
document.getElementById('order-form').addEventListener('submit', function (e) {
  e.preventDefault();

  const isLoggedIn = !document.getElementById('login-section').classList.contains('hidden');
  if (!isLoggedIn) {
    alert('يجب تسجيل الدخول أولاً لإرسال الطلب');
    return;
  }

  // جمع البيانات من النموذج
  const formData = new FormData(this);
  const orderDetails = {};
  formData.forEach((value, key) => {
    orderDetails[key] = value;
  });

  // إظهار معاينة أو رسالة قبل الدفع
  document.getElementById('order-summary').classList.remove('hidden');
  document.getElementById('summary-details').textContent = JSON.stringify(orderDetails, null, 2);
});

// زر الدفع عبر باي بال
document.getElementById('paypal-button').addEventListener('click', function () {
  // إعادة التوجيه إلى رابط PayPal مع مبلغ ثابت
  window.location.href = 'https://paypal.me/bloomff/60';
});

// محاكاة وصول الطلب إلى لوحة تحكم الأدمن (سيتم ربطه بقاعدة البيانات لاحقًا)
function simulateOrderSend(orderData) {
  console.log('طلب جديد تم استلامه:', orderData);

  // إرسال إشعار للإدمن عبر البريد (بالمستقبل، سيتم ربطه بخدمة خلفية)
  sendAdminNotification(orderData);
}

// وظيفة إرسال إشعار إلى الأدمن (محاكاة فقط)
function sendAdminNotification(order) {
  const emailBody = `
    تم استلام طلب جديد:
    الاسم: ${order.name}
    البريد: ${order.email}
    النوع: ${order.service}
    المبلغ: 60 دولار
  `;
  console.log('تم إرسال الإشعار إلى الأدمن:', emailBody);
}

// تحميل بيانات الطلب بعد الدفع (محاكاة فقط)
function simulatePaymentSuccess() {
  const paymentSection = document.getElementById('payment-status');
  paymentSection.innerHTML = `
    <div class="success-message">
      <h3>تم الدفع بنجاح!</h3>
      <p>تم استلام طلبك، وسيتم تنفيذه خلال مدة أقصاها أسبوعين.</p>
    </div>
  `;
}

// تنفيذ المحاكاة تلقائيًا بعد العودة من PayPal
window.addEventListener('load', () => {
  if (window.location.href.includes('payment-success')) {
    simulatePaymentSuccess();
  }
});

// التحقق من حالة الطلب (قيد التنفيذ / تم التنفيذ)
function getOrderStatus(orderId) {
  // سيتم ربطها بقاعدة البيانات لاحقًا
  // هنا مثال ثابت فقط
  const status = Math.random() > 0.5 ? 'قيد التنفيذ' : 'تم التنفيذ';
  return status;
}

// عرض تفاصيل الطلب
function showOrderDetails(orderId) {
  const status = getOrderStatus(orderId);
  document.getElementById('order-status').textContent = `حالة الطلب: ${status}`;
  document.getElementById('details-section').classList.remove('hidden');
}

// زر عرض التفاصيل
document.querySelectorAll('.view-order-btn').forEach(btn => {
  btn.addEventListener('click', function () {
    const orderId = this.getAttribute('data-order-id');
    showOrderDetails(orderId);
  });
});
// التحقق من حالة تسجيل الدخول كلما تم تحميل الصفحة
window.addEventListener('DOMContentLoaded', () => {
  const user = sessionStorage.getItem('loggedUser');
  if (user) {
    showUserDashboard(user);
  } else {
    showLoginSection();
  }
});

// عرض لوحة المستخدم عند تسجيل الدخول
function showUserDashboard(userEmail) {
  document.getElementById('login-section').classList.add('hidden');
  document.getElementById('user-dashboard').classList.remove('hidden');
  document.getElementById('user-email-display').textContent = userEmail;
}

// عرض شاشة تسجيل الدخول
function showLoginSection() {
  document.getElementById('login-section').classList.remove('hidden');
  document.getElementById('user-dashboard').classList.add('hidden');
}

// زر تسجيل الخروج
document.getElementById('logout-btn').addEventListener('click', () => {
  sessionStorage.removeItem('loggedUser');
  showLoginSection();
  alert('تم تسجيل الخروج');
});

// منع إرسال الطلب في حال عدم تسجيل الدخول
function checkLoginBeforeOrder() {
  const user = sessionStorage.getItem('loggedUser');
  if (!user) {
    alert('الرجاء تسجيل الدخول لإتمام الطلب');
    return false;
  }
  return true;
}

// عرض عداد الطلبات في لوحة الإدارة
function updateAdminOrderCounter() {
  const totalOrders = localStorage.getItem('orderCount') || 0;
  document.getElementById('admin-order-count').textContent = totalOrders;
}

// تحديث العداد عند الطلب
function incrementOrderCounter() {
  let count = parseInt(localStorage.getItem('orderCount') || '0');
  count++;
  localStorage.setItem('orderCount', count);
  updateAdminOrderCounter();
}

// محاكاة حفظ الطلب بعد الدفع (سيتم استبداله بربط فعلي مع قاعدة البيانات)
function saveOrder(orderData) {
  let orders = JSON.parse(localStorage.getItem('orders') || '[]');
  orders.push(orderData);
  localStorage.setItem('orders', JSON.stringify(orders));
  incrementOrderCounter();
}

// استرجاع الطلبات وعرضها في لوحة التحكم
function loadAdminOrders() {
  const orders = JSON.parse(localStorage.getItem('orders') || '[]');
  const container = document.getElementById('admin-orders-container');
  container.innerHTML = '';

  orders.forEach((order, index) => {
    const card = document.createElement('div');
    card.classList.add('order-card');
    card.innerHTML = `
      <h4>طلب #${index + 1}</h4>
      <p><strong>الاسم:</strong> ${order.name}</p>
      <p><strong>الخدمة:</strong> ${order.service}</p>
      <p><strong>البريد:</strong> ${order.email}</p>
      <p><strong>الحالة:</strong> <span class="order-status">${order.status}</span></p>
      <button class="mark-done" data-index="${index}">تم التنفيذ</button>
    `;
    container.appendChild(card);
  });

  attachDoneButtons();
}

// تفعيل زر "تم التنفيذ" في كل طلب
function attachDoneButtons() {
  document.querySelectorAll('.mark-done').forEach(btn => {
    btn.addEventListener('click', function () {
      const index = parseInt(this.getAttribute('data-index'));
      let orders = JSON.parse(localStorage.getItem('orders') || '[]');
      if (orders[index]) {
        orders[index].status = 'تم التنفيذ';
        localStorage.setItem('orders', JSON.stringify(orders));
        loadAdminOrders();
      }
    });
  });
}
// عرض تفاصيل الطلب في صفحة المستخدم
function loadUserOrders() {
  const userEmail = sessionStorage.getItem('loggedUser');
  const orders = JSON.parse(localStorage.getItem('orders') || '[]');
  const userOrders = orders.filter(order => order.email === userEmail);

  const container = document.getElementById('user-orders-container');
  container.innerHTML = '';

  if (userOrders.length === 0) {
    container.innerHTML = '<p>لا توجد طلبات حالياً.</p>';
    return;
  }

  userOrders.forEach((order, index) => {
    const card = document.createElement('div');
    card.classList.add('user-order-card');
    card.innerHTML = `
      <h4>طلب #${index + 1}</h4>
      <p><strong>الخدمة:</strong> ${order.service}</p>
      <p><strong>التاريخ:</strong> ${order.date}</p>
      <p><strong>الحالة:</strong> ${order.status}</p>
      <button class="download-order" data-index="${index}">تحميل التفاصيل PDF</button>
    `;
    container.appendChild(card);
  });

  attachDownloadButtons(userOrders);
}

// توليد ملف PDF لتفاصيل الطلب
function attachDownloadButtons(userOrders) {
  document.querySelectorAll('.download-order').forEach(btn => {
    btn.addEventListener('click', function () {
      const index = parseInt(this.getAttribute('data-index'));
      const order = userOrders[index];
      const doc = new jsPDF();
      doc.setFont('Arial');
      doc.setFontSize(14);
      doc.text('تفاصيل الطلب', 10, 20);
      doc.text(`الخدمة: ${order.service}`, 10, 30);
      doc.text(`البريد الإلكتروني: ${order.email}`, 10, 40);
      doc.text(`الحالة: ${order.status}`, 10, 50);
      doc.text(`التاريخ: ${order.date}`, 10, 60);
      doc.save(`order-${index + 1}.pdf`);
    });
  });
}

// محاكاة الدفع الناجح عبر PayPal ثم الحفظ
function simulatePaypalPayment(serviceType) {
  const userEmail = sessionStorage.getItem('loggedUser');
  const currentDate = new Date().toLocaleDateString();

  const order = {
    name: 'مستخدم',
    email: userEmail,
    service: serviceType,
    status: 'قيد التنفيذ',
    date: currentDate
  };

  saveOrder(order);
  alert('تم إرسال طلبك بنجاح. سيتم التنفيذ خلال أسبوعين.');
  loadUserOrders();
}

// عند الضغط على زر طلب الخدمة
document.querySelectorAll('.service-request-btn').forEach(btn => {
  btn.addEventListener('click', function () {
    if (!checkLoginBeforeOrder()) return;

    const service = this.getAttribute('data-service');
    // هنا يتم فتح رابط PayPal
    window.open('https://paypal.me/bloomff/60', '_blank');

    // محاكاة الدفع بعد 5 ثواني (تجريبي فقط)
    setTimeout(() => {
      simulatePaypalPayment(service);
    }, 5000);
  });
});
// عرض الطلبات في لوحة تحكم الأدمن
function loadAdminOrders() {
  const adminSection = document.getElementById('admin-orders-section');
  if (!adminSection) return;

  const orders = JSON.parse(localStorage.getItem('orders') || '[]');
  adminSection.innerHTML = '';

  if (orders.length === 0) {
    adminSection.innerHTML = '<p>لا توجد طلبات حتى الآن.</p>';
    return;
  }

  orders.forEach((order, index) => {
    const card = document.createElement('div');
    card.classList.add('admin-order-card');
    card.innerHTML = `
      <h4>طلب #${index + 1}</h4>
      <p><strong>اسم العميل:</strong> ${order.name}</p>
      <p><strong>البريد الإلكتروني:</strong> ${order.email}</p>
      <p><strong>الخدمة:</strong> ${order.service}</p>
      <p><strong>التاريخ:</strong> ${order.date}</p>
      <label>تغيير الحالة:</label>
      <select class="status-update" data-index="${index}">
        <option value="قيد التنفيذ" ${order.status === 'قيد التنفيذ' ? 'selected' : ''}>قيد التنفيذ</option>
        <option value="تم التنفيذ" ${order.status === 'تم التنفيذ' ? 'selected' : ''}>تم التنفيذ</option>
      </select>
    `;
    adminSection.appendChild(card);
  });

  attachStatusChangeListeners();
}

// تعديل حالة الطلب من قبل الأدمن
function attachStatusChangeListeners() {
  document.querySelectorAll('.status-update').forEach(select => {
    select.addEventListener('change', function () {
      const index = parseInt(this.getAttribute('data-index'));
      const orders = JSON.parse(localStorage.getItem('orders') || '[]');

      if (orders[index]) {
        orders[index].status = this.value;
        localStorage.setItem('orders', JSON.stringify(orders));
        alert('تم تحديث الحالة بنجاح');
        loadAdminOrders();
      }
    });
  });
}

// التأكد من تحميل لوحة تحكم الأدمن في الصفحة المخصصة
document.addEventListener('DOMContentLoaded', function () {
  if (window.location.href.includes('admin.html')) {
    const email = sessionStorage.getItem('loggedUser');
    if (email === 'brandedcalculator@gmail.com') {
      loadAdminOrders();
    } else {
      document.body.innerHTML = '<h2>غير مصرح لك بالدخول لهذه الصفحة.</h2>';
    }
  }

  if (window.location.href.includes('myorders.html')) {
    loadUserOrders();
  }
});
// تحميل الطلبات الخاصة بالمستخدم في صفحة "طلباتي"
function loadUserOrders() {
  const email = sessionStorage.getItem('loggedUser');
  const container = document.getElementById('my-orders');
  if (!email || !container) return;

  const orders = JSON.parse(localStorage.getItem('orders') || '[]');
  const userOrders = orders.filter(order => order.email === email);

  if (userOrders.length === 0) {
    container.innerHTML = '<p>لا توجد طلبات لك حتى الآن.</p>';
    return;
  }

  container.innerHTML = '';
  userOrders.forEach((order, index) => {
    const item = document.createElement('div');
    item.classList.add('order-item');
    item.innerHTML = `
      <h3>طلب رقم #${index + 1}</h3>
      <p><strong>الخدمة:</strong> ${order.service}</p>
      <p><strong>تاريخ الإرسال:</strong> ${order.date}</p>
      <p><strong>الحالة:</strong> ${order.status}</p>
      <button onclick="downloadOrderPDF(${index})">تحميل نسخة PDF</button>
    `;
    container.appendChild(item);
  });
}

// إنشاء ملف PDF للتفاصيل
function downloadOrderPDF(index) {
  const email = sessionStorage.getItem('loggedUser');
  const orders = JSON.parse(localStorage.getItem('orders') || '[]');
  const userOrders = orders.filter(order => order.email === email);
  const order = userOrders[index];

  if (!order) return;

  const content = `
    اسم العميل: ${order.name}
    البريد الإلكتروني: ${order.email}
    الخدمة: ${order.service}
    التاريخ: ${order.date}
    الحالة: ${order.status}
  `;

  const blob = new Blob([content], { type: 'application/pdf' });
  const link = document.createElement('a');
  link.href = URL.createObjectURL(blob);
  link.download = `طلب_${index + 1}.pdf`;
  link.click();
}

// تسجيل الخروج
function logoutUser() {
  sessionStorage.removeItem('loggedUser');
  alert('تم تسجيل الخروج بنجاح');
  window.location.href = 'index.html';
}

// إظهار رسالة بعد الدفع
function showPaymentSuccessMessage() {
  const paymentMessage = document.getElementById('payment-success-message');
  if (paymentMessage) {
    paymentMessage.style.display = 'block';
    setTimeout(() => {
      paymentMessage.style.display = 'none';
    }, 5000);
  }
}
// إرسال إشعار للإدمن عبر الإيميل (محاكاة)
function notifyAdmin(orderData) {
  console.log('تم إرسال إشعار للإدمن:');
  console.log(`اسم العميل: ${orderData.name}`);
  console.log(`البريد: ${orderData.email}`);
  console.log(`الخدمة: ${orderData.service}`);
  console.log(`الحالة: قيد التنفيذ`);
}

// تحديث حالة الطلب (للأدمن فقط)
function updateOrderStatus(index, newStatus) {
  const orders = JSON.parse(localStorage.getItem('orders') || '[]');
  if (orders[index]) {
    orders[index].status = newStatus;
    localStorage.setItem('orders', JSON.stringify(orders));
    alert('تم تحديث حالة الطلب.');
    loadAdminOrders(); // إعادة تحميل الطلبات
  }
}

// تحميل طلبات جميع المستخدمين (لوحة تحكم الأدمن)
function loadAdminOrders() {
  const container = document.getElementById('admin-orders');
  if (!container) return;

  const orders = JSON.parse(localStorage.getItem('orders') || '[]');
  container.innerHTML = '';

  if (orders.length === 0) {
    container.innerHTML = '<p>لا توجد طلبات حالياً.</p>';
    return;
  }

  orders.forEach((order, index) => {
    const item = document.createElement('div');
    item.classList.add('admin-order-item');
    item.innerHTML = `
      <h4>طلب رقم #${index + 1}</h4>
      <p><strong>اسم:</strong> ${order.name}</p>
      <p><strong>بريد:</strong> ${order.email}</p>
      <p><strong>خدمة:</strong> ${order.service}</p>
      <p><strong>الحالة الحالية:</strong> ${order.status}</p>
      <select onchange="updateOrderStatus(${index}, this.value)">
        <option value="قيد التنفيذ" ${order.status === 'قيد التنفيذ' ? 'selected' : ''}>قيد التنفيذ</option>
        <option value="تم التنفيذ" ${order.status === 'تم التنفيذ' ? 'selected' : ''}>تم التنفيذ</option>
      </select>
    `;
    container.appendChild(item);
  });
}

// منع الوصول لصفحات معينة بدون تسجيل الدخول
function requireLogin(pageId) {
  const user = sessionStorage.getItem('loggedUser');
  if (!user) {
    alert('يجب تسجيل الدخول أولاً');
    window.location.href = 'login.html';
  } else {
    document.getElementById(pageId)?.classList.remove('hidden');
  }
}

// منع الوصول إلى لوحة تحكم الأدمن إلا بإيميل معين
function requireAdminAccess() {
  const adminEmail = 'brandedcalculator@gmail.com';
  const loggedEmail = sessionStorage.getItem('loggedUser');

  if (loggedEmail !== adminEmail) {
    alert('صلاحيات الأدمن فقط!');
    window.location.href = 'index.html';
  }
}
// إعداد صفحة الطلبات الخاصة بالمستخدم
function loadUserOrders() {
  const container = document.getElementById('user-orders');
  const email = sessionStorage.getItem('loggedUser');
  if (!container || !email) return;

  const orders = JSON.parse(localStorage.getItem('orders') || '[]');
  const userOrders = orders.filter(order => order.email === email);

  container.innerHTML = '';

  if (userOrders.length === 0) {
    container.innerHTML = '<p>لا توجد طلبات لك حالياً.</p>';
    return;
  }

  userOrders.forEach((order, index) => {
    const item = document.createElement('div');
    item.classList.add('user-order-item');
    item.innerHTML = `
      <h4>طلب #${index + 1}</h4>
      <p><strong>الخدمة:</strong> ${order.service}</p>
      <p><strong>الحالة:</strong> ${order.status}</p>
      <button onclick="viewOrderDetails(${index})">عرض التفاصيل</button>
    `;
    container.appendChild(item);
  });
}

// عرض تفاصيل طلب معين للمستخدم
function viewOrderDetails(index) {
  const orders = JSON.parse(localStorage.getItem('orders') || '[]');
  const email = sessionStorage.getItem('loggedUser');
  const userOrders = orders.filter(order => order.email === email);

  if (!userOrders[index]) {
    alert('الطلب غير موجود');
    return;
  }

  const order = userOrders[index];
  const modal = document.getElementById('order-details-modal');
  const content = document.getElementById('order-details-content');

  content.innerHTML = `
    <h3>تفاصيل الطلب</h3>
    <p><strong>الاسم:</strong> ${order.name}</p>
    <p><strong>البريد:</strong> ${order.email}</p>
    <p><strong>الخدمة:</strong> ${order.service}</p>
    <p><strong>الملفات:</strong> ${order.files || 'لا يوجد'}</p>
    <p><strong>ملاحظات:</strong> ${order.notes || 'لا يوجد'}</p>
    <p><strong>الحالة:</strong> ${order.status}</p>
  `;

  modal.classList.remove('hidden');
}

// إغلاق نافذة التفاصيل
function closeOrderDetails() {
  const modal = document.getElementById('order-details-modal');
  modal.classList.add('hidden');
}

// تهيئة عند تحميل الصفحة
window.addEventListener('DOMContentLoaded', () => {
  const path = window.location.pathname;

  if (path.includes('admin.html')) {
    requireLogin('admin-panel');
    requireAdminAccess();
    loadAdminOrders();
  } else if (path.includes('orders.html')) {
    requireLogin('orders-page');
    loadUserOrders();
  }
});
// تحميل الطلبات في لوحة تحكم الأدمن
function loadAdminOrders() {
  const adminContainer = document.getElementById('admin-orders');
  const orders = JSON.parse(localStorage.getItem('orders') || '[]');
  adminContainer.innerHTML = '';

  if (orders.length === 0) {
    adminContainer.innerHTML = '<p>لا توجد طلبات حتى الآن.</p>';
    return;
  }

  orders.forEach((order, index) => {
    const row = document.createElement('div');
    row.classList.add('admin-order-row');
    row.innerHTML = `
      <p><strong>#${index + 1}</strong></p>
      <p>${order.name}</p>
      <p>${order.email}</p>
      <p>${order.service}</p>
      <p>${order.status}</p>
      <select onchange="updateOrderStatus(${index}, this.value)">
        <option value="قيد التنفيذ" ${order.status === 'قيد التنفيذ' ? 'selected' : ''}>قيد التنفيذ</option>
        <option value="تم التنفيذ" ${order.status === 'تم التنفيذ' ? 'selected' : ''}>تم التنفيذ</option>
      </select>
    `;
    adminContainer.appendChild(row);
  });
}

// تحديث حالة الطلب من قبل الأدمن
function updateOrderStatus(index, newStatus) {
  const orders = JSON.parse(localStorage.getItem('orders') || '[]');
  if (orders[index]) {
    orders[index].status = newStatus;
    localStorage.setItem('orders', JSON.stringify(orders));
    loadAdminOrders();
    alert('تم تحديث حالة الطلب بنجاح.');
  }
}

// حماية صفحات الأدمن من الوصول غير المصرح به
function requireAdminAccess() {
  const email = sessionStorage.getItem('loggedUser');
  if (email !== 'brandedcalculator@gmail.com') {
    alert('غير مصرح لك بالوصول إلى هذه الصفحة.');
    window.location.href = 'index.html';
  }
}

// حماية الصفحات من المستخدمين غير المسجلين
function requireLogin(redirectId) {
  const email = sessionStorage.getItem('loggedUser');
  if (!email) {
    alert('يجب تسجيل الدخول للوصول إلى هذه الصفحة.');
    window.location.href = 'login.html';
  }
}

// إعداد الإشعار التلقائي بعد تقديم الطلب (بريد إلكتروني وهمي)
function sendNotification(order) {
  const fakeAdminEmail = 'brandedcalculator@gmail.com';
  const subject = `طلب جديد: ${order.service}`;
  const body = `اسم العميل: ${order.name}\nالبريد: ${order.email}\nالخدمة: ${order.service}\nالحالة: ${order.status}`;
  console.log(`(إشعار وهمي إلى: ${fakeAdminEmail})\n${subject}\n${body}`);
}

// زر طباعة تفاصيل الطلب كـ PDF
function printOrderAsPDF(index) {
  const orders = JSON.parse(localStorage.getItem('orders') || '[]');
  const order = orders[index];
  if (!order) return;

  const newWindow = window.open('', '_blank');
  newWindow.document.write(`<pre>
  ====== تفاصيل الطلب ======

  الاسم: ${order.name}
  البريد: ${order.email}
  الخدمة: ${order.service}
  الملاحظات: ${order.notes || 'لا يوجد'}
  الحالة: ${order.status}

  ============================
  </pre>`);
  newWindow.document.close();
  newWindow.print();
}