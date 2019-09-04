let input, arrTweets;
input = document.getElementById("input-tweet");

//when the webpage opens:
document.addEventListener("DOMContentLoaded", () => {

  document.getElementById("button-tweet").disabled = true;
  arrTweets = JSON.parse(localStorage.getItem("arrTweets"));
  //empty localStorage----->localStorage.clear();

  //print each array contained in localStorage
  if (arrTweets) {
    arrTweets.forEach((t) => {
      let t1 = t[0]; //each date and time
      let t2 = t[1]; //and correspondent tweet
      printTweet(t1, t2);});
  }
});

//when the user types inside textarea:
document.getElementById("input-tweet").oninput = function() {

  //condition to allow only strings with some value to be submitted
  let buttonText = input.value;
  let removeEmpty = buttonText.replace(/(?:\r\n|\r|\n| )/g, "");
  if (removeEmpty !== "") {
    document.getElementById("button-tweet").disabled = false;
  } else {
    //strings with only spaces cannot be submitted
    document.getElementById("button-tweet").disabled = true;
  }

  //characters counter:
  let text = input.value.length;
  document.getElementById("count-char").innerHTML = 140 - text;
  if (text < 120) {
    document.getElementById("count-char").style.color = "#293939";
  } else {
    document.getElementById("count-char").style.color = "#bf0603";
  }

  //change textarea size while typing:
  input.style.cssText = "height:auto;";
  input.style.cssText = "height:" + input.scrollHeight + "px;";
}

//when submit button is clicked:
document.getElementById("new-tweet").onsubmit = function() {

  //get the localStorage
  let restoredTweets = JSON.parse(localStorage.getItem("arrTweets"));
  //if localStorage is empty initiate new array
  if (!restoredTweets){
    localStorage.setItem("arrTweets", 0);
    arrTweets = [];
  } else {
    arrTweets= restoredTweets;
  }

  //get new tweet
  tweetInput = input.value;
  //store it in an array with date and time
  let tweetAndDate = [];
  tweetAndDate.push(getDateAndTime())
  tweetAndDate.push(tweetInput);

  //add new array to array containing all the tweets and add to localStorage
  arrTweets.push(tweetAndDate);
  localStorage.setItem("arrTweets", JSON.stringify(arrTweets));

  //print new tweet
  let lastDate = tweetAndDate[0];
  let lastInput = tweetAndDate[1];
  printTweet(lastDate, lastInput);

  //reset textarea
  document.getElementById("input-tweet").value = "";
  document.getElementById("button-tweet").disabled = true;
  return false;
};

//get current date
function getDateAndTime() {
  let dateandtime = new Date();
  let date = dateandtime.toLocaleDateString("pt-BR");
  var time = dateandtime.toLocaleTimeString("pt-BR");
  time = time.slice(0,5);
  let dateandtimeTweet = date + " às " + time + " -\n";
  return dateandtimeTweet;
}

//print inside ul tag with latest first
function printTweet(lastDate, lastInput) {
  let listItem = document.createElement("li");
  let tweetInput = document.createTextNode(lastDate + "\n" + lastInput);
  listItem.appendChild(tweetInput);
  let ul = document.getElementById("tweets");
  ul.insertBefore(listItem, ul.firstChild);
}
