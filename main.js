window.addEventListener('load', () => {

    drawGraph(100,50)
})

function quadraticFunction(x,addValue) {
     return -Math.pow(x, 2) + addValue;
}

function sinusFunction(x,addValue){
    return Math.sin(x)+addValue;
}

function logFunction(x,addValue){
    return Math.log(x)+addValue;
}

function update(){
    recNum = document.getElementById('rectangles').value
    addValue = document.getElementById('graphTop').value
    funcGraph = document.getElementById('function').value;
    drawGraph(parseInt(recNum),parseInt(addValue),funcGraph);
}

function drawGraph(rectangles,addValue,funcGraph){
    var a = -100; 
    var b = 100;
    var numPoints = rectangles;

    var xValues = [];
    var yValues = [];
    var i = a;
    while (i <= b) {
        var y=0;
        switch(funcGraph){
            case "quadratic":
                y = quadraticFunction(i,addValue);
                break;
            case "linear":
                y = i +addValue;
                break;
            case "sinus":
                y =sinusFunction(i,addValue);
                break;
            case "log":
                y = logFunction(i,addValue);
                break;
            default:
                y=quadraticFunction(i,addValue);
                break;
        }
        if (y >= 0) {
            xValues.push(i);
            yValues.push(y);
        }
        i += (b - a) / numPoints;
    }

    var curveTrace = {
        x: xValues,
        y: yValues,
        mode: 'lines',
        name: 'Curve'
    };

    var area = 0;
    var rectangles = [];
    for (var j = 1; j < xValues.length; j++) {
        var x0 = xValues[j - 1];
        var x1 = xValues[j];
        var y0 = yValues[j - 1];
        var y1 = yValues[j];
        var rectArea = (x1 - x0) * Math.min(y0, y1);
        area += rectArea;

        var rect = {
            type: 'rect',
            x0: x0,
            y0: 0,
            x1: x1,
            y1: Math.min(y0, y1),
            fillcolor: 'rgba(0, 0, 128, 0.5)',
            line: { width: 0 }
        };
        rectangles.push(rect);
    }

    var areaTrace = {
        x: [xValues[0], xValues[xValues.length - 1]],
        y: [0, 0],
        fill: 'tozeroy',
        fillcolor: 'rgba(0, 128, 128, 0.5)',
        mode: 'none',
        name: 'Area under Curve'
    };

    var layout = {
        title: 'Area under Curve Visualization',
        xaxis: { title: 'x in cm' },
        yaxis: { title: 'y in cm' },
        showlegend: true,
        shapes: rectangles
    };

    Plotly.newPlot('plot', [curveTrace, areaTrace], layout);
    document.getElementById('area').innerHTML= Number((area).toFixed(4))
    document.getElementById('recNum').innerHTML= numPoints
}