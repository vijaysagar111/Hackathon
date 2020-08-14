var maindiv = document.createElement("div");
document.body.appendChild(maindiv);
maindiv.className = "container";

var p = document.createElement("p");
maindiv.appendChild(p);
p.id = "refresh";

var div = document.createElement("div");
maindiv.appendChild(div);

var h1 = document.createElement("h1");
div.appendChild(h1);
h1.style = "font-family: Verdana, Geneva, Tahoma, sans-serif;";
h1.innerText = "Crack the CODE";

var div1 = document.createElement("div");
div.appendChild(div1)

var para = document.createElement("p");
div1.appendChild(para);
para.id = "level";

var inp = document.createElement("input");
inp.type = "number";
inp.name = "user_input";
inp.id = "i_p";
inp.placeholder = "Guess Code";
div1.appendChild(inp);

var br = document.createElement("br");
div.appendChild(br);

var bt = document.createElement("button");
bt.id = "submit";
bt.innerText = "Submit";
div1.appendChild(bt);
bt.onclick = "getInput()"

p1 = document.createElement("p");
div.appendChild(p1);
p1.id = "alert";

var div2 = document.createElement("div");
div.appendChild(div2)

div2.innerHTML = ` <p id="o_p"></p>
<p id="code"></p>
<p id="is_game">Keep guessing</p>`;

var div3 = document.createElement("div");
div.appendChild(div3)
var para = document.createElement("p");
div3.appendChild(para);
para.id = "lossed";
var para = document.createElement("p");
div3.appendChild(para);
para.id = "score";

ul = document.createElement("ul");
ul.id = "step";
ul.style = "list-style:none";

div3.appendChild(ul);

li = document.createElement("li");
li.innerHTML = "<b> Results </b>";
ul.appendChild(li);



var div4 = document.createElement("div");
div.appendChild(div4)
div4.className = "greencolor";
div4.innerHTML = `Note:<br>
'Green' Indicates a number is in the correct position.
 <br>'Orange' Indicates a number is part of the code, but not in the right position.
 <br>'Orange' Doesn't consider how many times a number exists in the code.
<br>'Red' Indicates a number is not part of the code.`;

l = 0;
var size = sessionStorage.getItem("1");
var s = sessionStorage.getItem("br");
if (size <= 0) {
  document.getElementById("refresh").innerText = "Please Refresh your  browser!!!!!"
  l = 0;
  size = sessionStorage.setItem("1", 4);
  
}


size = parseInt(size);


var secret_code = generateCode();
var step_counter = 0;
document.getElementById("submit").addEventListener("click", getInput);


function getInput() {
  var x = document.getElementById('i_p').value;
  console.log(x)
  processInput(x);
}

function getRandom(min, max) {

  var random = Math.floor(Math.random() * (max - min + 1)) + min;
  console.log(random);
  return random;
}

function processInput(input) {
  document.getElementById("alert").innerHTML = `Please Enter ${size} numbers.`;
  var n = input.length;
  if (document.getElementById("submit").innerHTML === "Reset") {
    cleanAll();
    return;
  }
  else if (n > size) {
    o_p.innerHTML = `Input exceeds ${size} digits!`;
    return;
  }
  else if (n < size) {
    o_p.innerHTML = `Input is less than ${size} digits!`;
    return;
  }
  else if (step_counter === 5) {

    document.getElementById("is_game").innerHTML = "You lose!! ";
    document.getElementById("lossed").innerText = `The number is ${generateCode()}. Cheer up! Try again!!!`
    resetGame();
    return;
  }
  else {
    step_counter++;
    checkSubmission(input);
    return;
  }

  return;
}

function generateCode() {
  var code = "";
  for (var i = 0; i < size; i++) {
    var n = getRandom(0, 9);
    code += n.toString();
  }
  return code;
}






function checkSubmission(usr_input) {


  if (usr_input === secret_code) {
    document.getElementById("is_game").innerHTML = "Cool! You Win!";
    document.getElementById("level").innerText = `Level ${l++} Passed`;
    document.getElementById("score").innerText = `Score: ${size}`;
    sessionStorage.setItem("1", size++);
    resetGame();

  }
  var result = "";
  
  for (var i = 0; i < size; i++) {
    var found = false;
    if (usr_input[i] === secret_code[i]) {




      result = "Y"
      //showSubmission(result, usr_input);
      var ul = document.getElementById("step");
      var li = document.createElement("li");
      
      li.classList = "circles1";
      li.appendChild(document.createTextNode(result));
      ul.appendChild(li);

      found = true;
      continue;
      //continue;
    }
   
    for (var j = 0; j < size; j++) {
      if (usr_input[i] === secret_code[j]) {
        result = "E"
        var ul = document.getElementById("step");
        var li = document.createElement("li");
        //var len = ul.getElementsByTagName("li").length;
        
        li.classList = "circles2";
        li.appendChild(document.createTextNode(result));
        ul.appendChild(li);
        found = true;
        //showSubmission(result, usr_input);
        break;
      }
    }
    if (!found) {
      result = "X"
      var ul = document.getElementById("step");
      var li = document.createElement("li");
      
      li.classList = "circles3";
      li.appendChild(document.createTextNode(result));
      ul.appendChild(li);
      //showSubmission(result, usr_input);
    }
  }
  //document.getElementById("check").innerHTML = result;
  //showSubmission(result, usr_input);
  return;
}
function showSubmission(result, usr_input) {

  var ul = document.getElementById("step");
  var li = document.createElement("li");
  li.classList = "circles1";
  li.appendChild(document.createTextNode(result));
  ul.appendChild(li);

}

function resetGame() {
  document.getElementById("submit").innerHTML = "Reset";
}

function cleanAll() {
  secret_code = generateCode();
  step_counter = 0;
  document.getElementById("i_p").value = "";
  document.getElementById("o_p").innerText = "";
  document.getElementById("lossed").innerText = "";
  document.getElementById("is_game").innerHTML = "Keep Guessing!!";
  document.getElementById("step").innerHTML = "<li><b>Result</b></li>";
  document.getElementById("submit").innerHTML = "Submit";

  return;
}