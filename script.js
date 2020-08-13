
var div = document.createElement("div");
document.body.appendChild(div);

var h1 = document.createElement("h1");
div.appendChild(h1);
h1.style = "font-family: Verdana, Geneva, Tahoma, sans-serif;";
h1.innerText = "Crack the CODE";

var div1 = document.createElement("div");
div.appendChild(div1)

var inp = document.createElement("input");
inp.type = "number";
inp.name = "user_input";
inp.id = "i_p";
inp.placeholder = "Guess Code";
div1.appendChild(inp);

var br = document.createElement("br");
div.appendChild(br);

var bt = document.createElement("button");
bt.id= "submit";
bt.innerText = "Submit";
div1.appendChild(bt);
bt.onclick = "getInput()"



var div2 = document.createElement("div");
div.appendChild(div2)

div2.innerHTML = ` <p id="o_p"></p>
<p id="code"></p>
<p id="is_game">Keep guessing</p>`;

var div3 = document.createElement("div");
div.appendChild(div3)

ul = document.createElement("ul");
ul.id = "step";
ul.style = "list-style:none";

div3.appendChild(ul);

li = document.createElement("li");
li.innerHTML = "<b> Results </b>";
ul.append(li);


var div4 = document.createElement("div");
div.appendChild(div4)
div4.innerHTML = `Note:<br>
'Y' Indicates a number is in the correct position.
 <br>'E' Indicates a number is part of the code, but not in the right position.
 <br>'E' Doesn't consider how many times a number exists in the code.
<br>'X' Indicates a number is not part of the code.`;



  
var secret_code = generateCode();
      var step_counter = 0;
      document.getElementById("submit").addEventListener("click", getInput);


      function getInput() {
        var x = document.getElementById('i_p').value;
        console.log(x)
        processInput(x);
      } 

      function processInput(input) {
        var n = input.length;
        if (document.getElementById("submit").innerHTML === "Reset") {
          cleanAll();
          return;
        }
        else if (n > 4) {
          o_p.innerHTML = "Input exceeds 4 character!";
          return;
        }
        else if (n < 4) {
          o_p.innerHTML = "Input is less than 4 character!";
          return;
        }
        else if (step_counter === 5) {
          document.getElementById("is_game").innerHTML = "You lose!! ";
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
        for (var i = 0; i < 4; i++) {
          var n = getRandom(0, 9);
          code += n.toString();
        }
        return code;
      }

      function getRandom(min, max) {
        
        var random = Math.floor(Math.random() * (max - min + 1)) + min;
        console.log(random);
        return random;
      }

      function checkSubmission(usr_input) {
        
        if (usr_input === secret_code) {
          document.getElementById("is_game").innerHTML = "Cool! You Win!";
          resetGame();
        }
        var result = "";

        for (var i = 0; i < 4; i++) {
          var found = false;
          if (usr_input[i] === secret_code[i]) { 
            
           v1 = usr_input[i];
           
        
            result += "Y ";
            
            found = true;
            continue;
          }
          for (var j = 0; j < 4; j++) {
            if (usr_input[i] === secret_code[j]) {
              result += "E "
              found = true;
              break;
            }
          }
          if (!found) {
            result += "X ";
          }
        }
        //document.getElementById("check").innerHTML = result;
        showSubmission(result, usr_input);
        return;
      }
      function showSubmission(result, usr_input) {
        
        var ul = document.getElementById("step");
        var li = document.createElement("li");

        
       
        li.appendChild(document.createTextNode(result));
        ul.appendChild(li);
      }

      function resetGame() {
        document.getElementById("submit").innerHTML = "Reset";
      }

      function cleanAll() {
        secret_code = generateCode();
        step_counter = 0;
        document.getElementById("o_p").innerHTML = "";
        document.getElementById("is_game").innerHTML = "Keep Guessing!!";
        document.getElementById("step").innerHTML = "<li><b>Result</b></li>";
        document.getElementById("submit").innerHTML = "Submit";
        
        return;
      }