
var numOssquare = 6;
var colors = generateColor(numOssquare);
square     = document.querySelectorAll(".square")
rgbSpan    = document.getElementById("rgbSpan");
message    = document.getElementById("message")
resetColor = document.getElementById("resetBtn")
easyBtn    = document.getElementById("easyBtn")
hardBtn    = document.getElementById("hardBtn")
h1         = document.querySelector("h1")

easyBtn.addEventListener("click",function(){
  message.textContent=""
  hardBtn.classList.remove("selectedBtn")
  this.classList.add("selectedBtn");
  numOssquare = 3;
  colors = generateColor(numOssquare);
  rgbSpan.innerHTML = pickColor();
  selectedColor = pickColor()
  for(var i=0; i < square.length; i++){
  if(colors[i]){ // This Function jaust show only three elements
    square[i].style.background = colors[i]
  }else{
      square[i].style.display="none"
    }
  }
})

hardBtn.addEventListener("click",function(){
  message.textContent=""
  easyBtn.classList.remove("selectedBtn")
  this.classList.add("selectedBtn");
  numOssquare=6;
  colors = generateColor(numOssquare);
  selectedColor = pickColor()
  rgbSpan.innerHTML = pickColor();
  for(var i=0; i < square.length; i++){
    square[i].style.background = colors[i]
      square[i].style.display="block"
  }
})

resetColor.addEventListener("click",function(){
  message.textContent=""
  colors = generateColor(numOssquare);
  //change span color
  rgbSpan.innerHTML = pickColor()
  //change selected Color
  selectedColor = pickColor();
  //change color squares
 for(var i =0; i < square.length;i++){
    square[i].style.background = colors[i];
    //console.log(square[i])
  }
})

rgbSpan.innerHTML = pickColor()
var selectedColor = pickColor();
for(var i=0; i < square.length; i++){
  //Add Initioa colors for classes
  square[i].style.background = colors[i];
  //Add Event on Every Class
  square[i].addEventListener("click",function(){
    var clickedColor = this.style.background;
    if(selectedColor === clickedColor){
      message.textContent = "Coorect";
      h1.style.background = selectedColor
      changeColor(selectedColor);
    }else{
      message.textContent = "Try Again";
      this.style.background="#232323"
    }
  });
}
// change color when correct
function changeColor(color){
  for(var i=0; i < square.length; i++){
    square[i].style.background=color
  }
}
// random span color
function pickColor(){
  var random = Math.floor(Math.random() * colors.length)
  return colors[random];
}

//Generate color
function generateColor(num){
  var colorArr = [];
  for(var i=0; i < num; i++){
    colorArr.push(randomColors())
  }
  return colorArr;
}

// random colors

function randomColors(){
  //red
  var r = Math.floor(Math.random() * 256)
  // green
  var g = Math.floor(Math.random() * 256)
  //blue
  var b = Math.floor(Math.random() * 256)
  //rgb(255,145,68)
  return "rgb("+ r + ", " + g + ", " + b + ")";
}
