// classList - shows/gets all classes
// contains - checks classList for specific class
// add - add class
// remove - remove class
// toggle - toggles class

// toggle navbar的機制: 看 style.css 201-208 line，預設行為toggle是關閉的(使用class="links")，待會會使用javascript再toggle要開啟時將其改成(class="links show-links")，利用css的覆寫特性把toggle打開(背後邏輯其實就是改變height而已)

const navToggle = document.querySelector(".nav-toggle");
const links = document.querySelector(".links");

navToggle.addEventListener("click", () => {
  //   console.log(links.classList); // 印出此標籤的所有class
  //   console.log(links.classList.containe("show-links")); // 看是否有...class(true or false)
  //   if (links.classList.containes("show-links")) {
  //     links.classList.remove("show-links");
  //   } else {
  //     links.classList.add("show-links");
  //   }
  // 以上邏輯等同於直接用toggle()
  links.classList.toggle("show-links");
});

// 記得@media區塊中的link的height要設成auto(225)，這跟RWD有關
