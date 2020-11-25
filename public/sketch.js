let socket = io();
let myColor = "white";


socket.on("connect", newConnection);
socket.on("mouseBroadcast", drawOtherMouse);
socket.on("color", setColor);
socket.on("newPlayer", newPlayer);

function newPlayer(newPlayerColor) {
  console.log(newPlayerColor);

  push();
  textSize(30);
  textAlign("center");
  fill(newPlayerColor);
  text("New player" + newPlayerColor, width/2, 300);
  pop();
}

function setColor(assignedColor){
  myColor = assignedColor;
}

function newConnection(){
  console.log("your id: " + socket.id);
}

function drawOtherMouse(data){
push();
  stroke(data.color);
  strokeWeight(3);
  line(data.x, data.y, data.x2, data.y2);
pop();
}

function preload(){
  // put preload code here
}

function setup() {
  createCanvas(windowWidth,windowHeight)

  push();
    var color1 = color(0);
    var color2 = color(255);
      setGradient(0, 0, windowWidth, windowHeight, color1, color2, "Y");
  pop();

  // text
   fill(myColor);
   textSize(30);
   textAlign("center");
   text("DOT-TO-DOTS", width / 2, 100);

  // doc
  push();

 for (let i = 0; i < 30; i++) {
   fill(myColor);
   ellipse(random(windowWidth)+50, random(windowHeight)+50, 10, 10);
 }

  pop();


// save
button = createButton("print");
button.position(width / 2-40, height / 20 * 17.5);
button.mousePressed(saveImage);
}

function saveImage() {
  saveCanvas('mydot', 'png')
}

function draw() {

}

function setGradient(x, y, w, h, c1, c2, axis) {
  noFill();
  if (axis == "Y") {
    for (let j = x; j <= x + w; j++) {
      var inter2 = map(j, 600, x + w, 0, 1);
      var d = lerpColor(c1, c2, inter2);
      stroke(d);
      line(j, y, j, y + h);
    }
  }

}

function mouseDragged() {
  push();
    stroke(myColor);
    strokeWeight(2);
    line(pmouseX, pmouseY, mouseX, mouseY);
  pop();


//message
let message = {
  x: mouseX,
  y: mouseY,
  x2: pmouseX,
  y2: pmouseY,
  color: myColor,
};
//server
socket.emit("mouse", message);
}
