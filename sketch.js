let points = [];
let lines = [];
let pointNum = 3;
let pointToMove = null;
let finalLine;

let canvasDiv = document.getElementById("canvasDiv");
let divWidth = canvasDiv.offsetWidth - canvasDiv.style.borderWidth - 6;
let divHeight = canvasDiv.offsetHeight - canvasDiv.style.borderWidth - 6;

let Counter = 0;

function setup(){
    var myCanvas = createCanvas(divWidth, divHeight);
    myCanvas.parent("canvasDiv");
    background(0);

    // Generate the three points
    let text = "Poneglyph point";
    points.push(new Point((2/7)*width, (1/4)*height, text));
    points.push(new Point((3/4)*width, (1/3)*height, text));
    points.push(new Point((1/2)*width, (2/3)*height, text));

    stroke(100);
    finalPoint = new Point(width/2+2, height/5, "Unknown point");

}

function draw(){
    
    background(102,217,255);
    stroke(150);

    // Show points and calculate lines between them

    lines = [];
    // for (i = 0; i < points.length; i++){
    //     points[i].show();

            

    //         if (lines.indexOf(newLine) === -1 && newLine.distance != 0){ // Checks if the line has already been added, or if its a dud.
    //             lines.push(newLine);
    //         }


    //     let finalLine = new Line(finalPoint, points[i]);
        
    //     for (j = 0; j < lines.length; j++){
    //         let interPoint = finalLine.intersection(lines[j]);
    //         finalLine.show();
    //         if (interPoint != null){
    //             interPoint.show();
    //         }

    //     }
        
    // }

    // This reeaaallly hurts to do but it's easier
    lines.push(new Line(points[0], points[1]));
    lines.push(new Line(points[0], points[2]));
    lines.push(new Line(points[1], points[2]));


    let tempPoint;
    let pointsToFade = [];
    // Show the lines
    for (i = 0; i < points.length; i++){
        finalLine = new Line(finalPoint, points[i]);
        

        for (j = 0; j < lines.length; j++){

            let interPoint = finalLine.intersection(lines[j]);
            
            if (interPoint != null && points.indexOf(interPoint) == -1){
                push();
                stroke(255);
                finalLine.show();
                lines[j].show();
                lines[j].colour = color(255,255,255);
                interPoint.colour = color(255, 255, 255);
                // showing the point later forces it to always be drawn at the top layer.
                tempPoint = interPoint;
                pop();
            } else{
                pointsToFade.push(lines[j]);
            }
        }
    }

    for (i = 0; i < pointsToFade.length; i++){
        pointsToFade[i].colour = color(0,0,0,10);
        pointsToFade[i].show();
    }

    for (i = 0; i < points.length; i++){
        //Done separately to render points on top of the lines
        points[i].show();
    }

    if (tempPoint != null) {
        tempPoint.show();
    }

    finalPoint.show();

    // Allow user to move the points
    if (mouseIsPressed){
        for (i = 0; i < points.length; i++){
            if (dist(mouseX, mouseY, points[i].x, points[i].y) < points[i].size){
                pointToMove = i;
            }
        }
        if (dist(mouseX, mouseY, finalPoint.x, finalPoint.y) < finalPoint.size){
            pointToMove = 3;
        }
    }

    if (pointToMove != null && pointToMove != 3){
        points[pointToMove].move(mouseX, mouseY);
    } else if (pointToMove === 3){
        finalPoint.move(mouseX, mouseY);
    }
}

// Stop moving the point if the user lets go
function mouseReleased(){
    pointToMove = null;
}

//Dynamic view adjustments
function windowResized() {
    divWidth = canvasDiv.offsetWidth - canvasDiv.style.borderWidth - 6;
    divHeight = canvasDiv.offsetHeight - canvasDiv.style.borderWidth - 6;
    resizeCanvas(divWidth, divHeight);
}