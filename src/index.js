let arrTweets = [];
document.getElementById("new-tweet").onsubmit = function() {
  let input = document.getElementById("input-tweet").value;
  arrTweets.push(input);
  console.log(arrTweets);
  let lastInput = arrTweets[arrTweets.length - 1]
  let listItem = document.createElement("li");
  let tweetInput = document.createTextNode(lastInput);
  listItem.appendChild(tweetInput);
  document.getElementById("tweets").appendChild(listItem);
  document.getElementById("input-tweet").value = "";
  return false;
};
