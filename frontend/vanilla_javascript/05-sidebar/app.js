// 這邊邏輯跟 navbar差不多
// styles.css .sidebar transform(250 line)是預設行為(把sidebar收起來)，加入show-sidebar將其展開(就是改變transform這個屬性)
const toggleBtn = document.querySelector(".sidebar-toggle");
const closeBtn = document.querySelector(".close-btn");
const sidebar = document.querySelector(".sidebar");

toggleBtn.addEventListener("click", () => {
  console.log(sidebar.classList);
  sidebar.classList.toggle("show-sidebar");
});

closeBtn.addEventListener("click", () => {
  sidebar.classList.remove("show-sidebar");
});
