
/*
* Cart Class
*/
class Cart {
    constructor(HTMLElement) {
        this.HTMLElement = HTMLElement
        this.items = []
    }

    render() {
        while (this.HTMLElement.firstChild) this.HTMLElement.removeChild(this.HTMLElement.firstChild)
        this.items.forEach(i => this.HTMLElement.appendChild(createCartItem(this, i)))
        const total = document.getElementById("total")
        total.innerHTML = `Total: $ ${this.calcTotal().toFixed(2)}`
    }

    calcPrice(element) {
        return element.price * element.quantity
    }

    calcTotal() {
        let subtotal = 0
        this.items.forEach(element => subtotal += this.calcPrice(element))
        return subtotal
    }

    addItem(product) {
        const element = this.items.find(p => p.id == product.id)
        ++element.quantity
        this.render()
    }

    removeItem(product) {
        const element = this.items.find(p => p.id == product.id)
        --element.quantity
        if (element.quantity === 0)
            this.items.splice(element, 1)
        this.render()
    }

    removeFromCart(product) {
        const elementId = this.items.findIndex(p => p.id == product.id)
        if (elementId !== -1) {
            this.items[elementId].quantity = 0
            this.items.splice(elementId, 1)
        }
        this.render()
    }
}

function createCartItem(cart, item) {
    const cartItem = document.createElement("li")
    cartItem.classList.add("media", "bottom-buffer")

    const itemBody = document.createElement("div")
    itemBody.classList.add("media-body")

    itemBody.appendChild(itemHeading(item.name))
    itemBody.appendChild(itemQuantity(item.quantity))
    itemBody.appendChild(itemPrice(cart.calcPrice(item).toFixed(2)))
    itemBody.appendChild(addItemBtn(() => cart.addItem(item)))
    itemBody.appendChild(removeItemBtn(() => cart.removeItem(item)))
    itemBody.appendChild(removeFromCartBtn(() => cart.removeFromCart(item)))

    cartItem.appendChild(itemImage())
    cartItem.appendChild(itemBody)

    return cartItem
}

function itemImage() {
    const img = document.createElement("img")
    img.classList.add("mr-3")
    img.src = "https://via.placeholder.com/64"
    return img
}

function itemHeading(name) {
    const heading = document.createElement("h5")
    heading.classList.add("mt-0", "mb-1")
    heading.innerHTML = name
    return heading
}

function itemQuantity(quantity) {
    const text = document.createElement("p")
    text.classList.add("cart-text")
    text.innerHTML = `Quantity: ${quantity}`
    return text
}

function itemPrice(price) {
    const text = document.createElement("p")
    text.classList.add("cart-text")
    text.innerHTML = `$ ${price}`
    return text
}

function addItemBtn(func) {
    const btn = document.createElement("button")
    btn.classList.add("btn", "btn-success", "btn-sm", "ml-3")
    btn.appendChild(plusIcon())
    btn.addEventListener("click", func)
    return btn
}

function plusIcon() {
    const icon = document.createElement("i")
    icon.classList.add("fa", "fa-plus")
    return icon
}

function removeItemBtn(func) {
    const btn = document.createElement("button")
    btn.classList.add("btn", "btn-success", "btn-sm", "ml-3")
    btn.appendChild(minusIcon())
    btn.addEventListener("click", func)
    return btn
}

function minusIcon() {
    const icon = document.createElement("i")
    icon.classList.add("fa", "fa-minus")
    return icon
}

function removeFromCartBtn(func) {
    const removeBtn = document.createElement("button")
    removeBtn.classList.add("btn", "btn-danger", "btn-sm", "ml-3")
    removeBtn.appendChild(trashIcon())
    removeBtn.addEventListener("click", func)
    return removeBtn
}

function trashIcon() {
    const icon = document.createElement("i")
    icon.classList.add("fa", "fa-trash")
    return icon
}

function createColumn() {
    const column = document.createElement("div")
    column.classList.add("col")
    return column
}


/*
* Product Class
*/
let id = 0

class Product {
    constructor(name, description, price) {
        this.id = ++id
        this.name = name
        this.description = description
        this.price = price
        this.quantity = 0
    }
}

/**
 * Product List Class
 */
class ProductList {
    constructor(cart, HTMLElement) {
        this.cart = cart
        this.HTMLElement = HTMLElement
        this.products = [
            new Product("Product 1", "Some description", 99.99),
            new Product("Product 2", "Some description", 59.99),
            new Product("Product 3", "Some description", 9.99),
            new Product("Product 4", "Some description", 0.49),
            new Product("Product 5", "Some description", 14.49),
            new Product("Product 6", "Some description", 11.49)
        ]
    }

    render() {
        while (this.HTMLElement.firstChild) this.HTMLElement.removeChild(this.HTMLElement.firstChild)
        this.products.forEach(p => this.HTMLElement.appendChild(createProductColumn(this, p)))
    }

    addToCart(product) {
        const p = this.cart.items.find(p => p.id == product.id)
        if (typeof p === 'undefined') {
            this.cart.items.push(product)
            ++product.quantity
        }
        else
            ++product.quantity
        this.cart.render()
    }
}

function createProductColumn(productList, product) {
    const productColumn = document.createElement("div")
    productColumn.classList.add("col-lg-6", "col-xl-4")

    const productCard = document.createElement("div")
    productCard.classList.add("card", "top-buffer")

    const productBody = document.createElement("div")
    productBody.classList.add("card-body")

    const innerRow = document.createElement("div")
    innerRow.classList.add("row")

    const leftColumn = createColumn()
    leftColumn.appendChild(productPrice(product.price))

    const rightColumn = createColumn()
    rightColumn.appendChild(addToCartBtn(() => productList.addToCart(product)))

    innerRow.appendChild(leftColumn)
    innerRow.appendChild(rightColumn)

    productBody.appendChild(productHeading(product.name))
    productBody.appendChild(productDesc(product.description))
    productBody.appendChild(innerRow)

    productCard.appendChild(producImage())
    productCard.appendChild(productBody)

    productColumn.appendChild(productCard)

    return productColumn
}

function producImage() {
    const img = document.createElement("img")
    img.classList.add("card-img-top")
    img.src = "https://via.placeholder.com/600x400"
    return img
}

function productHeading(name) {
    const heading = document.createElement("h4")
    heading.classList.add("card-title")
    heading.innerHTML = name
    return heading
}

function productDesc(desc) {
    const text = document.createElement("p")
    text.classList.add("card-text")
    text.innerHTML = desc
    return text
}

function productPrice(price) {
    const text = document.createElement("p")
    text.classList.add("btn", "btn-block")
    text.innerHTML = `$ ${price}`
    return text
}

function addToCartBtn(func) {
    const button = document.createElement("button")
    button.classList.add("btn", "btn-success", "btn-sm", "ml-3")
    button.appendChild(cartIcon())
    button.innerHTML = `${button.innerHTML} Add`
    button.addEventListener("click", func)
    return button
}

function cartIcon() {
    const cartIcon = document.createElement("i")
    cartIcon.classList.add("fa", "fa-shopping-cart")
    return cartIcon
}

function createColumn() {
    const column = document.createElement("div")
    column.classList.add("col-6")
    return column
}

window.onload = () => {
    const cart = new Cart(document.getElementById("cart"))
    cart.render()

    const products = new ProductList(cart, document.getElementById("product-list"))
    products.render()
}