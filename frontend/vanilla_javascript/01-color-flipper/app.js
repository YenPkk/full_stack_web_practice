const colors = ["green", "red", "rgba(133,122,200)", "#f15025"];
const btn = document.getElementById("btn");
const color = document.querySelector(".color");

btn.addEventListener("click", () => {
  // get random number between 0-3
  const randomNumber = getRandomNumber();
  console.log(randomNumber);

  // document 是所有元素的根結點，document.body可以抓到整個html的body區塊
  // console.log(document.body)
  document.body.style.backgroundColor = colors[randomNumber];
  color.textContent = colors[randomNumber];
});

function getRandomNumber() {
  // random() 產生 0-0.999...之間的亂數，乘以array元素數量，再取floor，就是0,1,2,3
  return Math.floor(Math.random() * colors.length);
}
