const months = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];
const weekdays = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
];

const giveaway = document.querySelector(".giveaway");
const deadline = document.querySelector(".deadline");
const items = document.querySelectorAll(".deadline-format h4"); // class_value1 class_value2 這樣寫可以往下抓子元素(跟爬蟲時的概念一樣)
// console.log(items);

let tempDate = new Date();
let tempYear = tempDate.getFullYear();
let tempMonth = tempDate.getMonth();
let tempDay = tempDate.getDate();
const futureDate = new Date(tempYear, tempMonth, tempDay + 10, 11, 30, 0);

// new Date() 預設是現在的日期時間
// let futureDate = new Date(2025, 4, 24, 17, 30, 0); // month 是從0起算的，4是May五月
// console.log(futureDate);

const year = futureDate.getFullYear();
const hour = futureDate.getHours();
const minutes = futureDate.getMinutes();
const date = futureDate.getDate();

let month = futureDate.getMonth(); // 出來是一個數字 0-11
month = months[month];

let weekday = futureDate.getDay(); // 出來也是一個數字0-6
weekday = weekdays[weekday];
giveaway.textContent = `giveaway ends on ${weekday} ${date} ${month} ${year} ${hour}:${minutes}am`;

// future time in ms
const futureTime = futureDate.getTime();
console.log(futureTime);

function getRemainingTime() {
  const today = new Date().getTime();
  const t = futureTime - today;
  // 1s = 1000ms
  // 1m = 60s
  // 1hr = 60mins
  // 1d = 24hours

  // values in ms
  const oneDay = 24 * 60 * 60 * 1000; // how many min second per day
  const oneHour = 60 * 60 * 1000;
  const oneMinute = 60 * 1000;
  // caculate all values
  let days = t / oneDay;
  days = Math.floor(days);
  let hours = (t % oneDay) / oneHour; // (t%oneDay)餘數顆粒度沒變，也是ms，可以繼續除
  hours = Math.floor(hours);
  let minutes = Math.floor((t % oneHour) / oneMinute);
  let seconds = Math.floor((t % oneMinute) / 1000);

  // set values array
  const values = [days, hours, minutes, seconds];

  function format(item) {
    if (item < 10) {
      return (item = `0${item}`);
    }
    return item;
  }

  items.forEach((item, index) => {
    item.innerHTML = format(values[index]);
  });
  if (t < 0) {
    clearInterval(countdown); // 若時間到了，就取消倒數的interval
    deadline.innerHTML = `<h4 class="expire">sorry this fiveaway has expired</h4?`;
  }
}
// countdown // 注意這邊要先選告，getRemainingTime 才可以存取他
let countdown = setInterval(getRemainingTime, 1000);

getRemainingTime(); // 這邊還是要有，只有setInterval() 的話，因為裡面是callbacK執行得比較慢(而且還要等1秒)
