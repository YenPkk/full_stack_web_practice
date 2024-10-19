const hex = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, "A", "B", "C", "D", "E", "F"];
// hex color ex: #F15025
const btn = document.getElementById("btn");
const color = document.querySelector(".color");

// javascript 很適合用匿名函式就是因為有很多這種callback的形式，我們不需要使用函數名稱手動呼叫，而是丟到另一個函數當中(callback就是做為另一個函數的參數的意思)，由其控制此函數的呼叫
btn.addEventListener("click", () => {
  let hexColor = "#";
  for (let i = 0; i < 6; i++) {
    hexColor += hex[getRandomNumber()];
  }

  document.body.style.backgroundColor = hexColor;
  color.textContent = hexColor;
});

function getRandomNumber() {
  return Math.floor(Math.random() * hex.length);
}
