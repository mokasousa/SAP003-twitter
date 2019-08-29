let input, arrTweets;

document.getElementById("new-tweet").onsubmit = function() {
  input = document.getElementById("input-tweet").value;
  let restoredTweets = JSON.parse(localStorage.getItem("arrTweets"));
  if (!restoredTweets){
    localStorage.setItem("arrTweets", 0);
    arrTweets = [];
  } else {
    arrTweets= JSON.parse(localStorage.getItem("arrTweets"));
  }
  arrTweets.push(input);
  console.log(arrTweets);
  localStorage.setItem("arrTweets", JSON.stringify(arrTweets));
  let lastInput = arrTweets[arrTweets.length - 1]
  printTweet(lastInput);
  document.getElementById("input-tweet").value = "";
  return false;
};

document.addEventListener("DOMContentLoaded", () => {
  arrTweets = JSON.parse(localStorage.getItem("arrTweets"));
  if (arrTweets) {
    arrTweets.forEach((t) => {printTweet(t);});
  }
  let submitOff = document.getElementById("button-tweet").disabled;
  document.getElementById("button-tweet").disabled = true;
  document.getElementById("input-tweet").onkeyup = function() {
    if(document.getElementById("input-tweet").value.length > 0) {
    document.getElementById("button-tweet").disabled = false;
    } else {
    document.getElementById("button-tweet").disabled = true;
    }
  }
});

function printTweet(lastInput) {
  let listItem = document.createElement("li");
  let tweetInput = document.createTextNode(lastInput);
  listItem.appendChild(tweetInput);
  let ul = document.getElementById("tweets");
  ul.insertBefore(listItem, ul.firstChild);
}
