// to-do list 很適合用來練習語言與框架
// ****** SELECT ITEMS **********
const alert = document.querySelector(".alert");
const form = document.querySelector(".grocery-form");
const grocery = document.getElementById("grocery");
const submitBtn = document.querySelector(".submit-btn");
const container = document.querySelector(".grocery-container");
const list = document.querySelector(".grocery-list");
const clearBtn = document.querySelector(".clear-btn");
// edit option
let editElement;
let editFlag = false;
let editID = "";
// ****** EVENT LISTENERS **********
// submit form
form.addEventListener("submit", addItem);
// clear items
clearBtn.addEventListener("click", clearItems);
// load items
window.addEventListener("DOMContentLoaded", setupItems);
// ****** FUNCTIONS **********
function addItem(event) {
  event.preventDefault();
  const value = grocery.value; // grocery 是input element
  const id = new Date().getTime().toString(); // 建一個唯一id(隨便的方法)
  // 空字串代表false，所以value !== ""，可以簡單用 value代表就好
  if (value && !editFlag) {
    createListItem(id, value);
    // display alert
    displayAlert("item added to the list", "success");
    // show container(預設是隱藏起來的)
    container.classList.add("show-container");
    // add to local storage
    addToLocalStorage(id, value);
    // set back to default
    setBackToDefault();
  } else if (value && editFlag) {
    editElement.innerHTML = value; // 把使用者更改的值，塞到p.title元素中(就是在更改顯示的內容)
    displayAlert("value change", "success");
    // edit local storage
    editLocalStorage(editID, value);
    setBackToDefault();
  } else {
    displayAlert("please enter value", "danger");
  }
}
// display alert
function displayAlert(text, action) {
  alert.textContent = text;
  alert.classList.add(`alert-${action}`);
  // remove alert
  setTimeout(() => {
    alert.textContent = "";
    alert.classList.remove(`alert-${action}`);
  }, 1000);
}
// clear items
function clearItems() {
  const items = document.querySelectorAll(".grocery-item");
  if (items.length > 0) {
    items.forEach((item) => {
      list.removeChild(item);
    });
    container.classList.remove("show-container");
    displayAlert("empty list", "danger");
    setBackToDefault();
    localStorage.removeItem("list");
  }
}
// delete function
function deleteItem(event) {
  // 這邊要用currentTarget才可以確保抓到button(而不是用Target就好)
  const element = event.currentTarget.parentElement.parentElement; // 抓到article class="grocery-item"
  const id = element.dataset.id;
  list.removeChild(element);
  // 看list(是一個元素)底下有多少篇article(就是item)
  if (list.children.length === 0) {
    container.classList.remove("show-container");
  }
  displayAlert("item removed", "danger");
  setBackToDefault();
  // remove from local storage
  removeFromLocalStorage(id);
}
// edit function
function editItem(event) {
  const element = event.currentTarget.parentElement.parentElement;
  // set edit item
  editElement = event.currentTarget.parentElement.previousElementSibling; // button 上一階是div.btn-container，他有一個同層的元素p.title，就是要拿這個元素
  // console.log(editElement);
  grocery.value = editElement.innerHTML;
  editFlag = true;
  editID = element.dataset.id;
  submitBtn.textContent = "edit";
}
// set back to default
function setBackToDefault() {
  grocery.value = "";
  editFlag = false;
  editID = "";
  submitBtn.textContent = "submit";
}
// ****** LOCAL STORAGE **********
function addToLocalStorage(id, value) {
  const grocery = { id, value }; // es6: object若property_name跟variable_name相同的話可以簡寫成這樣，完整形式為{id:id, value:value}
  let items = getLocalStorage();
  console.log(items); // 老實說我不太懂這個印出來的邏輯...

  items.push(grocery);
  localStorage.setItem("list", JSON.stringify(items));
}
function removeFromLocalStorage(id) {
  let items = getLocalStorage();
  // array.filter會return一個新的array
  items = items.filter((item) => {
    if (item.id !== id) {
      return item;
    }
  });
  localStorage.setItem("list", JSON.stringify(items));
}
function editLocalStorage(id, value) {
  let items = getLocalStorage();
  // array.map會return一個新的array
  items = items.map((item) => {
    if (item.id === id) {
      item.value = value;
    }
    return item;
  });
  localStorage.setItem("list", JSON.stringify(items));
}
function getLocalStorage() {
  return localStorage.getItem("list")
    ? JSON.parse(localStorage.getItem("list")) // 確定有值才parse成json data type
    : []; // 看有沒有list這個item，沒有的話會回傳null，也就是false，這樣的話就利用三元運算子給他一個空array[]
}
// localStorage API (browser): need to save as **"string"**
// setItem, getItem, removeItem
// ex:
// localStorage.setItem("orange", JSON.stringify(["item1", "item2"]));
// const oranges = JSON.parse(localStorage.getItem("orange"));
// console.log(oranges);
// localStorage.removeItem("orange"); // removeItem(<item_name(key)>)

// ****** SETUP ITEMS **********
function setupItems() {
  let items = getLocalStorage();
  items = items.forEach((item) => {
    createListItem(item.id, item.value);
  });
  container.classList.add("show-container");
}
function createListItem(id, value) {
  const element = document.createElement("article");
  // add class
  element.classList.add("grocery-item");
  // add id
  const attr = document.createAttribute("data-id");
  attr.value = id;
  element.setAttributeNode(attr);
  element.innerHTML = `<p class="title">${value}</p>
            <div class="btn-container">
              <button type="button" class="edit-btn">
                <i class="fas fa-edit"></i>
              </button>
              <button type="button" class="delete-btn">
                <i class="fas fa-trash"></i>
              </button>
            </div>`;
  // element建立後才可以存取edit, delete button，所以在這邊才能存取並AddEventListener
  const deleteBtn = element.querySelector(".delete-btn");
  const editBtn = element.querySelector(".edit-btn");
  deleteBtn.addEventListener("click", deleteItem);
  editBtn.addEventListener("click", editItem);
  // append child (用append方式加到父元素的innerHTML中?)
  list.appendChild(element);
}
// innerHTML 跟 textContent 都是塞到元素的肚子李 ex: <p>這裡</p>，只是前者可以解析成html標籤元素，後者則是會忽略html，呈現純string
