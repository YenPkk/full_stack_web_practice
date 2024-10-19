// 會將原先使用css達成的功能(line 267)，利用javascript設定來達成，把每一個slide的位置錯開，這樣就會有一個slide(左右)長度的頁面
// slide-container的setup是使用overflow: hidden藏住其他頁數
// style.css 中 slide class中的 transition屬性是重點，我們透過移動transitionX來達成換頁的功能

const slides = document.querySelectorAll(".slide");
const nextBtn = document.querySelector(".nextBtn");
const prevBtn = document.querySelector(".prevBtn");

// 設定每個slide的位置
slides.forEach((slide, index) => {
  slide.style.left = `${index * 100}%`;
});

// 移動slide
let counter = 0;
nextBtn.addEventListener("click", () => {
  counter++;
  carousel();
});
prevBtn.addEventListener("click", () => {
  counter--;
  carousel();
});

function carousel() {
  //   working with slides
  //   if (counter === slides.length) {
  //     counter = 0;
  //   }
  //   if (counter < 0) {
  //     counter = slides.length - 1;
  //   }
  // working with buttons
  if (counter < slides.length - 1) {
    nextBtn.style.display = "block"; // block就是會顯示的某種樣式?!
  } else {
    nextBtn.style.display = "none";
  }
  if (counter > 0) {
    prevBtn.style.display = "block";
  } else {
    prevBtn.style.display = "none";
  }
  slides.forEach((slide) => {
    slide.style.transform = `translateX(-${counter * 100}%)`;
  });
}

prevBtn.style.display = "none"; // 一開始第一頁，所以不要顯示prevBtn

// javascript中要設定css樣式通常使用 <element>.style.<attribue> = <attribue_value> 然後是inline
