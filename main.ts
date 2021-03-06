
type StoreItem = {
  id: number
  name: string
  price: number
}
type CartItem = {
  id: number
  name: string
  price: number
  quantity: number
}
type State = {
  store: StoreItem[]
  cart: CartItem[]
}
const state: State = {
  store: [
    {
      id: 1,
      name: 'beetroot',
      price: 0.35
    },
    {
      id: 2,
      name: 'carrot',
      price: 0.35
    },
    {
      id: 3,
      name: 'apple',
      price: 0.35
    },
    {
      id: 4,
      name: 'apricot',
      price: 0.35
    },
    {
      id: 5,
      name: 'avocado',
      price: 0.35
    },
    {
      id: 6,
      name: 'bananas',
      price: 0.35
    },
    {
      id: 7,
      name: 'bell pepper',
      price: 0.35
    },
    {
      id: 8,
      name: 'berry',
      price: 0.35
    },
    {
      id: 9,
      name: 'blueberry',
      price: 0.35
    },
    {
      id: 10,
      name: 'eggplant',
      price: 0.35
    }
  ],
  cart: []
}

function getFileName(item: StoreItem) {
  const fileName = `${item.id
    .toString()
    .padStart(3, '0')}-${item.name.replaceAll(' ', '-')}`

  return `assets/icons/${fileName}.svg`
}


/* STATE ACTIONS */

function addItemToCart(itemId:number) {
  const existingItem = state.cart.find(item => item.id == itemId)

  if (existingItem) {
    existingItem.quantity += 1
  } else {
    const itemToAdd = state.store.find(item => item.id == itemId)
    if(itemToAdd !== undefined) state.cart.push({ ...itemToAdd, quantity: 1 })
    
  }

  renderCartItems()
}

function removeItemFromCart(itemID:number) {
  const itemToUpdate = state.cart.find(item => item.id == itemID)

  if (itemToUpdate && itemToUpdate.quantity > 1) {
    itemToUpdate.quantity -= 1
  } else {
    state.cart = state.cart.filter(item => item.id != itemID)
  }

  renderCartItems()
}

/* RENDER THE STORE */

function renderStoreItem(item:StoreItem) {
  const storeItemList = document.querySelector('.store--item-list') as HTMLUListElement

  const listItemEl = document.createElement('li')

  listItemEl.innerHTML = `
    <div class="store--item-icon">
      <img src=${getFileName(item)} alt="${item.name}">
    </div>
    <button>Add to cart</button>
  `

  const addBtn = listItemEl.querySelector('button') as HTMLButtonElement
  addBtn.addEventListener('click', () => addItemToCart(item.id))
  if(storeItemList !== null)storeItemList.appendChild(listItemEl)
  
}

function renderStoreItems() {
  state.store.forEach(renderStoreItem)
}

renderStoreItems()

/* RENDER THE CART */

const cartItemList = document.querySelector('.cart--item-list') as HTMLUListElement

function renderCartItem(item: CartItem) {
  const listItemEl = document.createElement('li')

  listItemEl.innerHTML = `
    <img class="cart--item-icon" src=${getFileName(item)} alt="${item.name}">
    <p>${item.name}</p>
    <button class="quantity-btn remove-btn center">-</button>
    <span class="quantity-text center">${item.quantity}</span>
    <button class="quantity-btn add-btn center">+</button>
  `

  const addBtn = listItemEl.querySelector('.add-btn') as HTMLButtonElement
  addBtn.addEventListener('click', () => addItemToCart(item.id))

  const removeBtn = listItemEl.querySelector('.remove-btn') as HTMLButtonElement
  removeBtn.addEventListener('click', () => removeItemFromCart(item.id))

  if(cartItemList !== null)cartItemList.appendChild(listItemEl)
  
}

function renderCartItems() {
  if(cartItemList !== null)  cartItemList.innerHTML = ''


  state.cart.forEach(renderCartItem)

  renderTotal()
}

/* RENDER THE TOTAL */

const totalNumber = document.querySelector('.total-number') as HTMLSpanElement

function renderTotal() {
  let total = 0

  state.cart.forEach(item => (total += item.quantity * item.price))

  totalNumber.innerText = `??${total.toFixed(2)}`
}
