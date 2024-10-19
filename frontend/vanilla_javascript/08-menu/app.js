const menu = [
  {
    id: 1,
    title: "buttermilk pancakes",
    category: "breakfast",
    price: 15.99,
    img: "./images/item-1.jpeg",
    desc: `I'm baby woke mlkshk wolf bitters live-edge blue bottle, hammock freegan copper mug whatever cold-pressed `,
  },
  {
    id: 2,
    title: "diner double",
    category: "lunch",
    price: 13.99,
    img: "./images/item-2.jpeg",
    desc: `vaporware iPhone mumblecore selvage raw denim slow-carb leggings gochujang helvetica man braid jianbing. Marfa thundercats `,
  },
  {
    id: 3,
    title: "godzilla milkshake",
    category: "shakes",
    price: 6.99,
    img: "./images/item-3.jpeg",
    desc: `ombucha chillwave fanny pack 3 wolf moon street art photo booth before they sold out organic viral.`,
  },
  {
    id: 4,
    title: "country delight",
    category: "breakfast",
    price: 20.99,
    img: "./images/item-4.jpeg",
    desc: `Shabby chic keffiyeh neutra snackwave pork belly shoreditch. Prism austin mlkshk truffaut, `,
  },
  {
    id: 5,
    title: "egg attack",
    category: "lunch",
    price: 22.99,
    img: "./images/item-5.jpeg",
    desc: `franzen vegan pabst bicycle rights kickstarter pinterest meditation farm-to-table 90's pop-up `,
  },
  {
    id: 6,
    title: "oreo dream",
    category: "shakes",
    price: 18.99,
    img: "./images/item-6.jpeg",
    desc: `Portland chicharrones ethical edison bulb, palo santo craft beer chia heirloom iPhone everyday`,
  },
  {
    id: 7,
    title: "bacon overflow",
    category: "breakfast",
    price: 8.99,
    img: "./images/item-7.jpeg",
    desc: `carry jianbing normcore freegan. Viral single-origin coffee live-edge, pork belly cloud bread iceland put a bird `,
  },
  {
    id: 8,
    title: "american classic",
    category: "lunch",
    price: 12.99,
    img: "./images/item-8.jpeg",
    desc: `on it tumblr kickstarter thundercats migas everyday carry squid palo santo leggings. Food truck truffaut  `,
  },
  {
    id: 9,
    title: "quarantine buddy",
    category: "shakes",
    price: 16.99,
    img: "./images/item-9.jpeg",
    desc: `skateboard fam synth authentic semiotics. Live-edge lyft af, edison bulb yuccie crucifix microdosing.`,
  },
  {
    id: 10,
    title: "steak dinner",
    category: "dinner",
    price: 39.99,
    img: "./images/item-10.jpeg",
    desc: `skateboard fam synth authentic semiotics. Live-edge lyft af, edison bulb yuccie crucifix microdosing.`,
  },
];

// when pages load access menu array to place in section

const sectionCenter = document.querySelector(".section-center");
const container = document.querySelector(".btn-container");

// load items
window.addEventListener("DOMContentLoaded", () => {
  displayMenuItems(menu);
  displayMenuButton();
});

function displayMenuItems(menuItems) {
  // <array>.map() 可以迭代陣列，用來陣列當中的修改元素，回傳的也是一個array
  let displayMenu = menuItems.map((item) => {
    // 回傳修改過後的array，注意這邊用javascript作為屬性時，不要有""
    return `<article class="menu-item">
        <img src=${item.img} class="photo" alt=${item.title} />
        <div class="item-info">
          <header>
            <h4>${item.title}</h4>
            <h4 class="price">$${item.price}</h4>
          </header>
          <p>
            ${item.desc}
          </p>
        </div>
      </article>`;
  });
  displayMenu = displayMenu.join(""); // 把array join起來成string(用空白""為分隔join起來，預設是會用,)
  // console.log(displayMenu);
  // 把html string 塞到 section元素當中(是 overwrite不是append喔)
  sectionCenter.innerHTML = displayMenu;
}

function displayMenuButton() {
  // reduce(<callback>, array)，callback有兩個參數，第一個指向reduce的第二個參數array，第二個則是迭代的array當中的每個元素
  const categories = menu.reduce(
    (values, item) => {
      if (!values.includes(item.category)) {
        values.push(item.category);
      }
      return values; // 這邊一定要回傳array(定義)，否則會抱錯
    },
    ["all"] // 這個array可以自定義一些值，比如說這裡的all
  );
  const categoryBtns = categories
    .map((category) => {
      return `<button class="filter-btn" type="button" data-id=${category}>${category}</button>`;
    })
    .join("");
  container.innerHTML = categoryBtns;
  // 注意!!! 這要搬進來函數裡面，為什麼，這跟callback的執行順序有關係，因為這邊是動態生成button，而這個動態的動作是藉由addEventListenr的callback function 來達成的，也就是說若我們先去抓.filter-btn這個class是抓不到的，所以若我們這個動作不寫在callback當中而寫在外面，此時DOM Tree當中根本沒有，因為javascript的執行順序會先執行它(因為callback即使是等待0秒也會被排到task queue等待 call stack 清空才會執行)，所以也寫在callback內，待元素確實生成了再去抓取
  const filterBtns = document.querySelectorAll(".filter-btn"); // 寫在callback內，此時document才可以順利抓取到，(這邊document也可以改成用container做存取)
  // filter items
  filterBtns.forEach((btn) => {
    btn.addEventListener("click", (event) => {
      const category = event.currentTarget.dataset.id; // dataset可以存取 data-<key> 屬性
      const menuCategory = menu.filter((menuItem) => {
        if (menuItem.category === category) {
          return menuItem;
        }
      });
      if (category === "all") {
        displayMenuItems(menu);
      } else {
        displayMenuItems(menuCategory);
      }
    });
  });
}
