// 即使class一樣，我們還是可以選到特定的標籤
// 1. using selectors inside the element (從父節點往下抓其子節點)
const questions = document.querySelectorAll(".question");
questions.forEach((question) => {
  const btn = question.querySelector(".question-btn");
  btn.addEventListener("click", () => {
    // 當開啟文章時，關閉其他文章 // 註:對一個父節點forEach會迭帶其每個子節點，雖然每個子節點標籤可能一模一樣(但browser是知道他們的區別的，至少對browser來說他們像是個array裡面的東西，至少有index可以做區分)
    questions.forEach((item) => {
      if (item !== question) {
        // 所以判斷式才可以這樣寫喔(此question就是觸發click的那個)(item就是把全部文章迭帶一遍的每個子節點)，簡言之: browser知道哪個標籤是哪個，我們抓出來的標籤就是意旨DOM Tree當中的特定標籤喔
        item.classList.remove("show-text");
      }
    });

    question.classList.toggle("show-text");
  });
});
// 2. traversing the dom (從子節點往上抓父節點)
// const btns = document.querySelectorAll(".question-btn");

// btns.forEach((btn) => {
//   btn.addEventListener("click", (event) => {
//     const question = event.currentTarget.parentElement.parentElement; // parentElement: 可以抓到觸發事件節點的父節點，用幾次就是往上抓幾層
//     question.classList.toggle("show-text");
//   });
// });
