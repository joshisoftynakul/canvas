var canvas,
    context,
    dragging = false,
    dragStartLocation,
    snapshot;


function getCanvasCoordinates(event) {
    var x = event.clientX - canvas.getBoundingClientRect().left,
        y = event.clientY - canvas.getBoundingClientRect().top;

    return {x: x, y: y};
}

function takeSnapshot() {
    snapshot = context.getImageData(0, 0, canvas.width, canvas.height);
}

function restoreSnapshot() {
    context.putImageData(snapshot, 0, 0);
}

//function drawLine(position) {
  //  context.beginPath();
   // context.moveTo(dragStartLocation.x, dragStartLocation.y);
   // context.lineTo(position.x, position.y);
   // context.stroke();
//}

function drawCircle(position) {
    var radius = Math.sqrt(Math.pow((dragStartLocation.x - position.x), 2) + Math.pow((dragStartLocation.y - position.y), 2));
    context.beginPath();
    context.arc(dragStartLocation.x, dragStartLocation.y, radius, 0, 2 * Math.PI, false);
}

function drawPolygon(position, sides, angle) {
    var coordinates = [],
        radius = Math.sqrt(Math.pow((dragStartLocation.x - position.x), 2) + Math.pow((dragStartLocation.y - position.y), 2)),
        index = 0;

    for (index = 0; index < sides; index++) {
        // x=r*cos y = r*sin
        coordinates.push({x: dragStartLocation.x + radius * Math.cos(angle), y: dragStartLocation.y - radius * Math.sin(angle)});
        angle += (2 * Math.PI) / sides;
    }

    context.beginPath();
    context.moveTo(coordinates[0].x, coordinates[0].y);
    for (index = 1; index < sides; index++) {
        context.lineTo(coordinates[index].x, coordinates[index].y);
    }

    context.closePath();
}

function draw(position) {

    var fillBox = document.getElementById("fillBox"),
        shape = document.querySelector('input[type="radio"][name="shape"]:checked').value,
        polygonSides = 4;
        polygonAngle = 0.78;
    if (shape === "circle") {
        drawCircle(position);
        context.fillStyle = '#1abc9c';

    }
    if (shape === "line") {
        drawLine(position);
    }

    if (shape === "polygon") {
        drawPolygon(position, 4, 0.78);
        context.fillStyle = "#3498db";
        }
        //referencing:> https://developer.mozilla.org/en-US/docs/Web/API/Canvas_API/Tutorial/Applying_styles_and_colors
        // and :> http://www.java2s.com/Tutorials/HTML_CSS/HTML5_Canvas_Reference/fillRect.htm
      //  for (x = 0; x < position.x; x++){
        //for (y = 0; y < position.y; y++) {
          //  context.fillStyle = "#FFF|#333".split('|')[((position.x-dragStartLocation.x )+(position.y-dragStartLocation.y)) % 2];
            //context.fillRect(x * 50, y * 50, 50, 50);


       // for (var i = 0; i < 6; i++) {
         //   for (var j = 0; j < 6; j++) {
           //         context.fillStyle = 'rgb(' + Math.floor(dragStartLocation.x - 42.5 * i) + ', ' + Math.floor(dragStartLocation.y - 42.5 * j) + ', 0)';
             //       context.fillRect(j * 25, i * 25, 25, 25);
               // }
            //} 
  //angle*(pi/180)
    //var img = document.getElementById("logo")
    //var pat = context.createPattern(img, "repeat");
      //  context.fillStyle = pat;
      
      //   var x_shift;
        // for (var i = 0; i < 2; i++) {
        //  for (var j = 0; j < 3; j++) {
         //     var x_shift = j % 2 == 0 ? 60 : 0;
         //       context.fillRect(i * 120 + x_shift, j * 60, 60, 60);
        //     }
         //   }
            
  

    if (fillBox.checked) {
        context.fill();

    } else {
        context.stroke();
    }
}    

function dragStart(event) {
    dragging = true;
    dragStartLocation = getCanvasCoordinates(event);
    takeSnapshot();
}

function drag(event) {
    var position;
    if (dragging === true) {
        restoreSnapshot();
        position = getCanvasCoordinates(event);
        draw(position, "polygon");
    }
}

function dragStop(event) {
    dragging = false;
    restoreSnapshot();
    var position = getCanvasCoordinates(event);
    draw(position, "polygon");
}


function init() {
    canvas = document.getElementById("canvas");
    context = canvas.getContext('2d');
    context.strokeStyle = '#3498db';
    context.lineWidth = 4;
    context.lineCap = 'round';

    context.globalCompositeOperation="xor";


    canvas.addEventListener('mousedown', dragStart, false);
    canvas.addEventListener('mousemove', drag, false);
    canvas.addEventListener('mouseup', dragStop, false);

}

window.addEventListener('load', init, false);