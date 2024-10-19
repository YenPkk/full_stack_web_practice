// Element.getBoundingClientRect() method returns the size of an element and its position relative to the viewport.
// pageYOffset is a read - only window property that returns the number of pixels the document has been scrolled vertically.
// slice extracts a section of a string without modifying original string
//offsetTop - A Number, representing the top position of the element, in pixels

// ********** set date ************
const date = document.getElementById("date");
date.innerHTML = new Date().getFullYear();
// ********** close links ************
const navToggle = document.querySelector(".nav-toggle");
const linksContainer = document.querySelector(".links-container");
const links = document.querySelector(".links");

navToggle.addEventListener("click", () => {
  //   linksContainer.classList.toggle("show-links");
  // 動態調整 toggle list 的大小height(以符合選項數)
  const containerHeight = linksContainer.getBoundingClientRect().height;
  const linksHeight = links.getBoundingClientRect().height; // 這個是抓<ul class=".links"> 因為裡頭的連結原本就有高度，只是被包在一個height=0的div裡面看不到而已，所以要顯示出links時根據此高度設定給div就可以動態match(可以符合link的數量)地顯示出link了
  //   console.log(linksHeight);
  if (containerHeight === 0) {
    linksContainer.style.height = `${linksHeight}px`; // 這邊加上去的是inline css (style="")，在css形式中其效果是最大的(順序問題)，所以要在style.css中設定一個  .links-container {height: auto !important;} 去overwrite inline css，反正就是只讓.links-container class的優先級比較大
  } else {
    linksContainer.style.height = 0;
  }
});

// ********** fixed navbar ************
const navbar = document.getElementById("nav");
const topLink = document.querySelector(".top-link");
window.addEventListener("scroll", () => {
  //   console.log(window.scrollY); // 每次滾輪移動時都會抓到一個height
  const scrollHeight = window.scrollY; // pageYOffset deprecated了，現在改用scrollY，反正就是抓滑鼠滾輪移動了網頁到多少位置，預設是0
  const navHeight = navbar.getBoundingClientRect().height;
  // 因為nav當好是網頁最上面的元素，所以只要大於這個height就代表，離開nav區域了，所以就固定navbar在上面
  if (scrollHeight > navHeight) {
    navbar.classList.add("fixed-nav");
  } else {
    navbar.classList.remove("fixed-nav");
  }

  if (scrollHeight > 500) {
    topLink.classList.add("show-link");
  } else {
    topLink.classList.remove("show-link");
  }
});
// ********** smooth scroll ************
// 為了精準的滑順的到頁內連結
// style.css中要有: html {scroll-behavior: smooth;}
// select links
const scrollLinks = document.querySelectorAll(".scroll-link");

scrollLinks.forEach((link) => {
  link.addEventListener("click", (event) => {
    event.preventDefault(); // 取消預設行為，以連結來說，就不會導引連結過去了，因為我們要自定義這個動作
    // navigate to specific spot
    const id = event.currentTarget.getAttribute("href").slice(1); // slice(<index>)以第n個index位置為界(在這邊插入一個空白)，切開，取後半部分...好怪....
    // console.log(id); // 會抓到 id=home, about...
    const element = document.getElementById(id);
    // caculate the heights
    const navHeight = nav.getBoundingClientRect().height;
    const containerHeight = linksContainer.getBoundingClientRect().height;
    const fixedNav = navbar.classList.contains("fixed-nav");
    // 這邊是用"減"的喔(當有fixed navbar時)，
    // 因為確實我們點擊的連結會把此元素的最上緣貼在browser最上源顯示，但是因為nav是fix的所以就被遮住了，所以實際上我們想要的效果是要在nav之下顯示元素最上緣，而這就是要減去nav的高(因為我們滾太下面了，往下滾東西會上升，所以要滾回來適用減的 )
    // 以下這行是用在不是從Home開始的連結
    let position = element.offsetTop - navHeight; // offsetTop: 抓element區塊的最上緣位置
    // 以下這個是用在從Home連結時，要多減一次，// 我的解釋是這樣的(當我們在Home頁面時)，判斷的元素最上源位置是包含navbar區塊的，但是呢因為nav只要離開home區塊就會fix，所以某種程度來講nav是不動的，所以我們是不是多移動了nav區塊的大小(某種程度上來說)，所以要把它"減"回去才是對的，
    // console.log(position); // 可以看到fixed navbar 其實是從上原先面搬下來的，所以當我們從Home使用連結時要多減一次
    // console.log(nav.offsetTop); // nav 的上緣位置永遠都是0
    // 減兩次的邏輯是，因為fixed-nav本來就有高度要減(這就是減上面那次)，但從Home開始，nav會有原生的高度(你要把它拔掉)所以要再減一次
    if (!fixedNav) {
      position = position - navHeight;
    }
    if (navHeight > 82) {
      position = position + containerHeight;
    }

    window.scrollTo({
      left: 0,
      top: position,
    });
    linksContainer.style.height = 0; // 使用toggle連結時，導引過去時順便關閉toggle bar
  });
});
