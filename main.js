img = "";
status = "";
objects = [];

function preload() {
    img = loadImage('pinky.jpg');
}

function setup() {
    canvas = createCanvas(640, 420);
    canvas.center();
    object_detector = ml5.objectDetector('cocossd', modelLoaded);
    document.getElementById("status").innerHTML = "Status:Detcting Objects";
}

function modelLoaded() {
    console.log("modelLoaded");
    status = true;
    object_detector.detect(img, gotResult);
}

function gotResult(error, results) {
    if (error) {
        console.log(error);
    } else {
        console.log(results);
        objects = results;

    }
}


function draw() {
    image(img, 0, 0, 640, 420);
    if (status != "") {
        for (i = 0; i < objects.length; i++) {
            document.getElementById("status").innerHTML = "status:ObjectDetected";
            fill("#FF4088");
            percent = floor(objects[i].confidence * 100);
            text(objects[i].label + "" + percent + "%", objects[i].x, objects[i].y);
            noFill();
            stroke("#FF4088");
            rect(objects[i].x, objects[i].y, objects[i].width, objects[i].height);
        }
    }
}