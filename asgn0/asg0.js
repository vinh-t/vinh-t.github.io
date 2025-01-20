// asg0.js 

/*  Vinh Tran
    viqutran@ucsc.edu
*/

var ctx;
var canvas;

function main() {
    canvas = document.getElementById('cnv1');
    if (!canvas) {
        console.log('Failed to retrieve the <canvas> element');
        return false;
    }

    // Get the rendering content for 2DCG
    ctx = canvas.getContext('2d');

    // Set the color for clearing <canvas>
    ctx.fillStyle = 'rgba(0, 0, 0, 1.0)';
    ctx.fillRect(0, 0, canvas.width, canvas.height);

}

function drawVector(v, color) {
    ctx.strokeStyle = color;
    ctx.lineWidth = 2;
    ctx.beginPath();
    ctx.moveTo(canvas.width / 2, canvas.height / 2);
    ctx.lineTo(200 + (v.elements[0] * 20), 200 + (v.elements[1]* -20), v.elements[2]* 20);  
    ctx.stroke();
}

function handleDrawEvent() {
    var x1 = document.getElementById('v1_x').value;
    var y1 = document.getElementById('v1_y').value;
    var x2 = document.getElementById('v2_x').value;
    var y2 = document.getElementById('v2_y').value;

    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.fillStyle = 'rgba(0, 0, 0, 1.0)';
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    var v1 = new Vector3([x1, y1, 0]);
    drawVector(v1, 'red');
    var v2 = new Vector3([x2, y2, 0]);
    drawVector(v2, 'blue');
}

function handleDrawOperationEvent() {
    var x1 = document.getElementById('v1_x').value;
    var y1 = document.getElementById('v1_y').value;
    var x2 = document.getElementById('v2_x').value;
    var y2 = document.getElementById('v2_y').value;

    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.fillStyle = 'rgba(0, 0, 0, 1.0)';
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    var v1 = new Vector3([x1, y1, 0]);
    drawVector(v1, 'red');
    var v2 = new Vector3([x2, y2, 0]);
    drawVector(v2, 'blue');


    var v3 = new Vector3([0, 0, 0]);
    var v4 = new Vector3([0, 0, 0]);
    var operation = document.getElementById('Operations').value;
    if (operation == 'Add') {
        v3 = v1.add(v2);
        drawVector(v3, 'green');
    } else if (operation == 'Subtract') {
        v3 = v1.sub(v2);
        drawVector(v3, 'green');
    } else if (operation == 'Multiply') {
        var scalar = document.getElementById('Scalar').value;
        v3 = v1.mul(scalar);
        drawVector(v3, 'green');
        v4 = v2.mul(scalar);
        drawVector(v4, 'green');
    } else if (operation == 'Divide') {
        var scalar = document.getElementById('Scalar').value;
        v3 = v1.div(scalar);
        drawVector(v3, 'green');
        v4 = v2.div(scalar);
        drawVector(v4, 'green');
    } else if (operation == "Magnitude") {
        console.log("Magnitude v1:" + v1.magnitude());
        console.log("Magnitude v2:" + v2.magnitude());
    } else if (operation == "Normalize") {
        var v1_normalized = v1.normalize();
        drawVector(v1_normalized, 'green');
        var v2_normalized = v2.normalize();
        drawVector(v2_normalized, 'green');
    } else if (operation == 'Angle') {
        console.log("Angle: " + (angleBetween(v1, v2).toFixed(2)));
    } else if (operation == 'Area') {
        console.log("Area of the triangle: " + (areaTriangle(v1, v2).toFixed(2)));
    }
}

function angleBetween(v1, v2) {
    var v1_mag = v1.magnitude();
    var v2_mag = v2.magnitude();
    var dot = Vector3.dot(v1, v2);

    var cos_alpha = Math.acos(dot / (v1_mag * v2_mag));
    cos_alpha *= 180 / Math.PI;
    return cos_alpha;
}

function areaTriangle(v1, v2) {
    var cross = Vector3.cross(v1, v2);
    return cross.magnitude() / 2;
}