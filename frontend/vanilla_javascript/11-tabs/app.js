// 要顯示的文章class就要有"active" 屬性值

const btns = document.querySelectorAll(".tab-btn");
const about = document.querySelector(".about");
const articles = document.querySelectorAll(".content");

// bubble 機制，子元素的事件往上傳到父元素(放炮泡變大一樣)
about.addEventListener("click", (event) => {
  const id = event.target.dataset.id; // event.target可抓到點擊的那個元素，若此元素是按鈕，那麼就有data-id屬性可以抓值，若不是就是undefined，這是一個bubble機制的邏輯，子元素被click亦可以被父元素監聽
  //remove active from other buttons
  if (id) {
    btns.forEach((btn) => {
      btn.classList.remove("active");
      event.target.classList.add("active");
    });
  }
  // hide other articles
  articles.forEach((article) => {
    article.classList.remove("active");
  });
  const element = document.getElementById(id); // 一樣抓那個點擊的id
  element.classList.add("active");
});
