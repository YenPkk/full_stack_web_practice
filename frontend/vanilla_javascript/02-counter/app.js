// set initail count
let count = 0;

// select value
const value = document.querySelector("#value"); // querySelector() 語法時，要用 #id .class

// select buttons
const btns = document.querySelectorAll(".btn"); // 會回傳一個array
// 這邊利用forEach()為每個array中的元素(button)加上addEventListenr
btns.forEach((btn) => {
  btn.addEventListener("click", (event) => {
    // console.log(event.currentTarget.classList);
    const styles = event.currentTarget.classList; // currentTarget 會標明事件指向，也就是當前這個event，這個event就是使用者點擊的那個，簡言之可以抓到點擊了哪個button(事件)
    if (styles.contains("decrease")) {
      count--;
    } else if (styles.contains("increase")) {
      count++;
    } else {
      count = 0;
    }

    // 改變顏色
    if (count > 0) {
      value.style.color = "green";
    }
    if (count < 0) {
      value.style.color = "red";
    }
    if (count === 0) {
      value.style.color = "#222";
    }
    value.textContent = count;
  });
});
