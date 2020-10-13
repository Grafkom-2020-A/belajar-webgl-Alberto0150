function main(){
    var canvas = document.getElementById("MyCanvas");
    var gl = canvas.getContext("webgl");

    // definisi verteks-verteks
    /**
     * A (-0.5, 0.5); B (-0.5, -0.5); C (0.5, -0.5)
     */
    var vertices=[
        -0.5, 0.5,  //point A
        -0.5, -0.5, //point B
        0.5, -0.5,   // point C
        -0.5, 0.5  //point A
    ]

    var positionBuffer = gl.createBuffer();
    // memberikan informasi ke global gpu buat position buffer
    gl.bindBuffer(gl.ARRAY_BUFFER, positionBuffer);
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(vertices), gl.STATIC_DRAW);
    //putus buffer
    gl.bindBuffer(gl.ARRAY_BUFFER,null);

    var vertexShaderCode =document.getElementById("vertexShaderCode").text;

    var vertexShader = gl.createShader(gl.VERTEX_SHADER);
    gl.shaderSource(vertexShader, vertexShaderCode);
    gl.compileShader(vertexShader);

    var fragmentShaderCode = document.getElementById("fragmentShaderCode").text;;

    var fragmentShader = gl.createShader(gl.FRAGMENT_SHADER);
    gl.shaderSource(fragmentShader, fragmentShaderCode);
    gl.compileShader(fragmentShader);

    var shaderProgram = gl.createProgram();
    gl.attachShader(shaderProgram, vertexShader);
    gl.attachShader(shaderProgram, fragmentShader);
    gl.linkProgram(shaderProgram);
    gl.useProgram(shaderProgram);

    gl.bindBuffer(gl.ARRAY_BUFFER,positionBuffer);
    var aPosition = gl.getAttribLocation(shaderProgram, "a_Position");
    gl.vertexAttribPointer(aPosition, 2, gl.FLOAT, false, 0, 0);
    gl.enableVertexAttribArray(aPosition);

    gl.clearColor(0.0, 0.0, 0.0, 1.0);
    gl.clear(gl.COLOR_BUFFER_BIT);

    var primitive = gl.LINE_STRIP;
    var offset = 0;
    var count =4; // jml vertex (titik sudut)
    gl.drawArrays(primitive, offset ,count);
}