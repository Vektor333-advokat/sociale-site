/* =====================================================
   ДАННЫЕ ТОВАРОВ
===================================================== */

const products = {

    1: {
        id: 1,
        name: "Oversize Black",
        category: "ФУТБОЛКИ",
        type: "T-SHIRT",
        description:
            "Базовая оверсайз-футболка свободного кроя.",
        price: 1499
    },

    2: {
        id: 2,
        name: "White Essential",
        category: "ФУТБОЛКИ",
        type: "T-SHIRT",
        description:
            "Минималистичная белая футболка на каждый день.",
        price: 1399
    },

    3: {
        id: 3,
        name: "Classic Hoodie",
        category: "ХУДИ",
        type: "HOODIE",
        description:
            "Тёплое худи свободного кроя для комфортного образа.",
        price: 2499
    },

    4: {
        id: 4,
        name: "Grey Oversize",
        category: "ХУДИ",
        type: "HOODIE",
        description:
            "Серое оверсайз худи в минималистичном стиле.",
        price: 2699
    },

    5: {
        id: 5,
        name: "Wide Pants",
        category: "БРЮКИ",
        type: "PANTS",
        description:
            "Свободные брюки прямого широкого кроя.",
        price: 2199
    },

    6: {
        id: 6,
        name: "Urban Jacket",
        category: "ВЕРХНЯЯ ОДЕЖДА",
        type: "JACKET",
        description:
            "Лёгкая куртка для современного городского образа.",
        price: 3499
    }

};


/* =====================================================
   КОРЗИНА
===================================================== */

let cart = [];


/* =====================================================
   ТЕКУЩИЙ ТОВАР
===================================================== */

let currentProductId = null;

let selectedSize = "M";

let modalQuantity = 1;


/* =====================================================
   ЭЛЕМЕНТЫ
===================================================== */

const productModal =
    document.getElementById("productModal");

const closeProductModal =
    document.getElementById("closeProductModal");

const modalProductBrand =
    document.getElementById("modalProductBrand");

const modalProductType =
    document.getElementById("modalProductType");

const modalCategory =
    document.getElementById("modalCategory");

const modalProductName =
    document.getElementById("modalProductName");

const modalDescription =
    document.getElementById("modalDescription");

const modalPrice =
    document.getElementById("modalPrice");

const modalQuantityElement =
    document.getElementById("modalQuantity");

const modalMinus =
    document.getElementById("modalMinus");

const modalPlus =
    document.getElementById("modalPlus");

const modalAddToCart =
    document.getElementById("modalAddToCart");

const cartButton =
    document.getElementById("cartButton");

const cartOverlay =
    document.getElementById("cartOverlay");

const closeCart =
    document.getElementById("closeCart");

const cartItems =
    document.getElementById("cartItems");

const cartCount =
    document.getElementById("cartCount");

const cartTotal =
    document.getElementById("cartTotal");

const checkoutButton =
    document.getElementById("checkoutButton");

const notification =
    document.getElementById("notification");


/* =====================================================
   CHECKOUT ELEMENTS
===================================================== */

const checkoutModal =
    document.getElementById("checkoutModal");

const closeCheckout =
    document.getElementById("closeCheckout");

const checkoutForm =
    document.getElementById("checkoutForm");

const checkoutSummaryItems =
    document.getElementById("checkoutSummaryItems");

const checkoutItemsCount =
    document.getElementById("checkoutItemsCount");

const checkoutTotal =
    document.getElementById("checkoutTotal");


/* =====================================================
   SUCCESS ELEMENTS
===================================================== */

const successModal =
    document.getElementById("successModal");

const orderNumber =
    document.getElementById("orderNumber");

const closeSuccess =
    document.getElementById("closeSuccess");


/* =====================================================
   ФОРМАТ ЦЕНЫ
===================================================== */

function formatPrice(price) {

    return new Intl.NumberFormat("uk-UA").format(price) + " ₴";

}


/* =====================================================
   УВЕДОМЛЕНИЯ
===================================================== */

let notificationTimer = null;


function showNotification(message) {

    notification.textContent = message;

    notification.classList.add("show");

    clearTimeout(notificationTimer);

    notificationTimer = setTimeout(function () {

        notification.classList.remove("show");

    }, 3000);

}


/* =====================================================
   ОТКРЫТИЕ ТОВАРА
===================================================== */

function openProductModal(id) {

    const product = products[id];

    if (!product) {
        return;
    }

    currentProductId = id;

    selectedSize = "M";

    modalQuantity = 1;

    modalProductBrand.textContent = "NOIR";

    modalProductType.textContent =
        product.type;

    modalCategory.textContent =
        product.category;

    modalProductName.textContent =
        product.name;

    modalDescription.textContent =
        product.description;

    modalPrice.textContent =
        formatPrice(product.price);

    modalQuantityElement.textContent =
        modalQuantity;


    document
        .querySelectorAll(".size-button")
        .forEach(function (button) {

            button.classList.remove("active");

            if (button.dataset.size === "M") {

                button.classList.add("active");

            }

        });


    productModal.classList.add("active");

    document.body.style.overflow = "hidden";

}


/* =====================================================
   ЗАКРЫТИЕ ТОВАРА
===================================================== */

function closeProductModalWindow() {

    productModal.classList.remove("active");

    if (
        !cartOverlay.classList.contains("active") &&
        !checkoutModal.classList.contains("active") &&
        !successModal.classList.contains("active")
    ) {

        document.body.style.overflow = "";

    }

}


closeProductModal.addEventListener(
    "click",
    closeProductModalWindow
);


productModal.addEventListener(
    "click",
    function (event) {

        if (event.target === productModal) {

            closeProductModalWindow();

        }

    }
);


/* =====================================================
   РАЗМЕР
===================================================== */

document
    .querySelectorAll(".size-button")
    .forEach(function (button) {

        button.addEventListener(
            "click",
            function () {

                document
                    .querySelectorAll(".size-button")
                    .forEach(function (item) {

                        item.classList.remove("active");

                    });


                button.classList.add("active");

                selectedSize =
                    button.dataset.size;

            }
        );

    });


/* =====================================================
   КОЛИЧЕСТВО В МОДАЛЬНОМ ОКНЕ
===================================================== */

modalMinus.addEventListener(
    "click",
    function () {

        if (modalQuantity > 1) {

            modalQuantity--;

            modalQuantityElement.textContent =
                modalQuantity;

        }

    }
);


modalPlus.addEventListener(
    "click",
    function () {

        if (modalQuantity < 20) {

            modalQuantity++;

            modalQuantityElement.textContent =
                modalQuantity;

        }

    }
);


/* =====================================================
   ДОБАВЛЕНИЕ В КОРЗИНУ
===================================================== */

modalAddToCart.addEventListener(
    "click",
    function () {

        if (!currentProductId) {
            return;
        }


        const product =
            products[currentProductId];


        const existingItem =
            cart.find(function (item) {

                return (
                    item.id === product.id &&
                    item.size === selectedSize
                );

            });


        if (existingItem) {

            existingItem.quantity +=
                modalQuantity;

        } else {

            cart.push({

                id: product.id,

                name: product.name,

                price: product.price,

                size: selectedSize,

                quantity: modalQuantity

            });

        }


        updateCart();

        closeProductModalWindow();

        showNotification(
            product.name +
            " добавлен в корзину"
        );

    }
);


/* =====================================================
   ОБНОВЛЕНИЕ КОРЗИНЫ
===================================================== */

function updateCart() {

    cartItems.innerHTML = "";


    if (cart.length === 0) {

        cartItems.innerHTML = `
            <div class="empty-cart">
                Корзина пока пуста
            </div>
        `;

        updateCartCount();

        updateCartTotal();

        return;

    }


    cart.forEach(function (item, index) {

        const itemElement =
            document.createElement("div");

        itemElement.className =
            "cart-item";


        itemElement.innerHTML = `

            <div class="cart-item-image">
                NOIR
            </div>

            <div class="cart-item-info">

                <h4>
                    ${item.name}
                </h4>

                <p>
                    Размер: ${item.size}
                </p>

                <div class="cart-item-price">
                    ${formatPrice(item.price)}
                </div>

                <button
                    class="remove-cart-item"
                    data-index="${index}">
                    Удалить
                </button>

            </div>

            <div class="cart-item-controls">

                <button
                    class="cart-minus"
                    data-index="${index}">
                    −
                </button>

                <span>
                    ${item.quantity}
                </span>

                <button
                    class="cart-plus"
                    data-index="${index}">
                    +
                </button>

            </div>

        `;


        cartItems.appendChild(itemElement);

    });


    updateCartCount();

    updateCartTotal();


    addCartItemListeners();

}


/* =====================================================
   КНОПКИ КОРЗИНЫ
===================================================== */

function addCartItemListeners() {


    document
        .querySelectorAll(".cart-minus")
        .forEach(function (button) {

            button.addEventListener(
                "click",
                function () {

                    const index =
                        Number(button.dataset.index);

                    if (cart[index].quantity > 1) {

                        cart[index].quantity--;

                    } else {

                        cart.splice(index, 1);

                    }

                    updateCart();

                }
            );

        });


    document
        .querySelectorAll(".cart-plus")
        .forEach(function (button) {

            button.addEventListener(
                "click",
                function () {

                    const index =
                        Number(button.dataset.index);

                    if (cart[index].quantity < 20) {

                        cart[index].quantity++;

                    }

                    updateCart();

                }
            );

        });


    document
        .querySelectorAll(".remove-cart-item")
        .forEach(function (button) {

            button.addEventListener(
                "click",
                function () {

                    const index =
                        Number(button.dataset.index);

                    cart.splice(index, 1);

                    updateCart();

                    showNotification(
                        "Товар удалён из корзины"
                    );

                }
            );

        });

}


/* =====================================================
   КОЛИЧЕСТВО ТОВАРОВ
===================================================== */

function updateCartCount() {

    const totalQuantity =
        cart.reduce(
            function (sum, item) {

                return sum + item.quantity;

            },
            0
        );


    cartCount.textContent =
        totalQuantity;

}


/* =====================================================
   ОБЩАЯ СУММА
===================================================== */

function getCartTotal() {

    return cart.reduce(
        function (sum, item) {

            return sum +
                item.price * item.quantity;

        },
        0
    );

}


function updateCartTotal() {

    cartTotal.textContent =
        formatPrice(getCartTotal());

}


/* =====================================================
   ОТКРЫТИЕ КОРЗИНЫ
===================================================== */

cartButton.addEventListener(
    "click",
    function () {

        cartOverlay.classList.add("active");

        document.body.style.overflow =
            "hidden";

    }
);


/* =====================================================
   ЗАКРЫТИЕ КОРЗИНЫ
===================================================== */

function closeCartWindow() {

    cartOverlay.classList.remove("active");

    if (
        !productModal.classList.contains("active") &&
        !checkoutModal.classList.contains("active") &&
        !successModal.classList.contains("active")
    ) {

        document.body.style.overflow = "";

    }

}


closeCart.addEventListener(
    "click",
    closeCartWindow
);


cartOverlay.addEventListener(
    "click",
    function (event) {

        if (event.target === cartOverlay) {

            closeCartWindow();

        }

    }
);


/* =====================================================
   ФИЛЬТР КАТЕГОРИЙ
===================================================== */

const categoryButtons =
    document.querySelectorAll(
        ".category-button"
    );


const productCards =
    document.querySelectorAll(
        ".product-card"
    );


categoryButtons.forEach(
    function (button) {

        button.addEventListener(
            "click",
            function () {

                categoryButtons.forEach(
                    function (item) {

                        item.classList.remove(
                            "active"
                        );

                    }
                );


                button.classList.add(
                    "active"
                );


                const category =
                    button.dataset.category;


                productCards.forEach(
                    function (card) {

                        const cardCategory =
                            card.dataset.category;


                        if (
                            category === "all" ||
                            cardCategory === category
                        ) {

                            card.style.display =
                                "";

                        } else {

                            card.style.display =
                                "none";

                        }

                    }
                );

            }
        );

    }
);


/* =====================================================
   ОТКРЫТИЕ ТОВАРА
===================================================== */

document
    .querySelectorAll(".view-product")
    .forEach(function (button) {

        button.addEventListener(
            "click",
            function () {

                const id =
                    Number(button.dataset.id);

                openProductModal(id);

            }
        );

    });


/* =====================================================
   ОФОРМЛЕНИЕ ЗАКАЗА
===================================================== */

checkoutButton.addEventListener(
    "click",
    function () {

        if (cart.length === 0) {

            showNotification(
                "Сначала добавьте товар в корзину"
            );

            return;

        }


        renderCheckoutSummary();


        cartOverlay.classList.remove(
            "active"
        );


        checkoutModal.classList.add(
            "active"
        );


        document.body.style.overflow =
            "hidden";

    }
);


/* =====================================================
   ЗАКРЫТИЕ ОФОРМЛЕНИЯ
===================================================== */

function closeCheckoutWindow() {

    checkoutModal.classList.remove(
        "active"
    );


    if (
        !successModal.classList.contains("active")
    ) {

        document.body.style.overflow = "";

    }

}


closeCheckout.addEventListener(
    "click",
    closeCheckoutWindow
);


checkoutModal.addEventListener(
    "click",
    function (event) {

        if (event.target === checkoutModal) {

            closeCheckoutWindow();

        }

    }
);


/* =====================================================
   SUMMARY ЗАКАЗА
===================================================== */

function renderCheckoutSummary() {

    checkoutSummaryItems.innerHTML = "";


    let totalItems = 0;


    cart.forEach(function (item) {

        totalItems += item.quantity;


        const itemElement =
            document.createElement("div");

        itemElement.className =
            "checkout-summary-item";


        const itemSum =
            item.price * item.quantity;


        itemElement.innerHTML = `

            <div class="checkout-summary-item-info">

                ${item.name}

                · ${item.size}

                · ${item.quantity} шт.

            </div>

            <div class="checkout-summary-item-price">

                ${formatPrice(itemSum)}

            </div>

        `;


        checkoutSummaryItems.appendChild(
            itemElement
        );

    });


    checkoutItemsCount.textContent =
        totalItems +
        " " +
        getItemsWord(totalItems);


    checkoutTotal.textContent =
        formatPrice(getCartTotal());

}


/* =====================================================
   СКЛОНЕНИЕ "ТОВАР"
===================================================== */

function getItemsWord(number) {

    const lastTwo =
        number % 100;

    const last =
        number % 10;


    if (
        lastTwo >= 11 &&
        lastTwo <= 19
    ) {

        return "товаров";

    }


    if (last === 1) {

        return "товар";

    }


    if (
        last >= 2 &&
        last <= 4
    ) {

        return "товара";

    }


    return "товаров";

}


/* =====================================================
   ПОДТВЕРЖДЕНИЕ ЗАКАЗА
===================================================== */

checkoutForm.addEventListener(
    "submit",
    function (event) {

        event.preventDefault();


        if (cart.length === 0) {

            showNotification(
                "Корзина пуста"
            );

            closeCheckoutWindow();

            return;

        }


        const name =
            document
                .getElementById("customerName")
                .value
                .trim();


        const phone =
            document
                .getElementById("customerPhone")
                .value
                .trim();


        const city =
            document
                .getElementById("customerCity")
                .value
                .trim();


        const delivery =
            document
                .getElementById("deliveryType")
                .value;


        const address =
            document
                .getElementById("deliveryAddress")
                .value
                .trim();


        const payment =
            document
                .querySelector(
                    'input[name="payment"]:checked'
                );


        if (!name || !phone || !city || !delivery || !address || !payment) {

            showNotification(
                "Заполни все обязательные поля"
            );

            return;

        }


        /*
            Пока база данных не подключена,
            заказ только имитируется
            в браузере.
        */


        const generatedOrderNumber =
            "#NOIR" +
            Math.floor(
                1000 +
                Math.random() * 9000
            );


        orderNumber.textContent =
            generatedOrderNumber;


        checkoutModal.classList.remove(
            "active"
        );


        successModal.classList.add(
            "active"
        );


        cart = [];


        updateCart();


        checkoutForm.reset();


        document.body.style.overflow =
            "hidden";


        console.log(
            "Новый заказ:",
            {
                orderNumber:
                    generatedOrderNumber,

                name:
                    name,

                phone:
                    phone,

                city:
                    city,

                delivery:
                    delivery,

                address:
                    address,

                payment:
                    payment.value
            }
        );

    }
);


/* =====================================================
   SUCCESS
===================================================== */

closeSuccess.addEventListener(
    "click",
    function () {

        successModal.classList.remove(
            "active"
        );

        document.body.style.overflow =
            "";

        window.location.hash =
            "catalog";

    }
);


successModal.addEventListener(
    "click",
    function (event) {

        if (event.target === successModal) {

            successModal.classList.remove(
                "active"
            );

            document.body.style.overflow =
                "";

        }

    }
);


/* =====================================================
   ESC
===================================================== */

document.addEventListener(
    "keydown",
    function (event) {

        if (event.key !== "Escape") {
            return;
        }


        if (successModal.classList.contains("active")) {

            successModal.classList.remove(
                "active"
            );

            document.body.style.overflow = "";

            return;

        }


        if (checkoutModal.classList.contains("active")) {

            closeCheckoutWindow();

            return;

        }


        if (productModal.classList.contains("active")) {

            closeProductModalWindow();

            return;

        }


        if (cartOverlay.classList.contains("active")) {

            closeCartWindow();

        }

    }
);


/* =====================================================
   НАЧАЛЬНОЕ СОСТОЯНИЕ
===================================================== */

updateCart();
