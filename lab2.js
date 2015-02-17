// Jacinda Ballantyne, 2/17/15
var canvas;
var gl;

var xPos = 0.0;
var yPos = 0.0;

var modelViewMatrix;
var u_modelViewMatrix; 

var verticesColors = new Float32Array([
	// Vertex coordinates and color
	-0.5, 0.0, 1.0, 0.0, 0.0,
	-0.25, -0.5, 0.0, 1.0, 0.0,
	0.25, -0.5, 0.0, 0.0, 1.0,
	0.5, 0.0, 1.0, 0.0, 0.0,
	0.25, 0.5, 0.0, 1.0, 0.0,
	-0.25, 0.5, 0.0, 0.0, 1.0
	]);


function handleKeyDown(ev){
	
	if (ev.keyCode == 65){ // A is 65
		
		xPos -= 0.05;
                console.log('move left');
	}
	if (ev.keyCode == 68){ // D is 68
		
		xPos += 0.05;
				console.log('move right');
	}
	if (ev.keyCode == 87){ // W is 87
		
		yPos += 0.05;
				console.log('move up');
	}
	if (ev.keyCode == 83){ // S is 83
		
		yPos -= 0.05;
				console.log('move down');
	}
	if (ev.keyCode == 49){ // 1 is 49
		//Reset to center
		xPos = 0;
		yPos = 0;
				console.log('reset');
	}
}

window.onload = function init()
{
var canvas = document.getElementById( "gl-canvas" );
gl = WebGLUtils.setupWebGL( canvas );
if ( !gl ) { alert( "WebGL isn't available" ); }
//
// Configure WebGL
//
gl.viewport( 0, 0, canvas.width, canvas.height );
gl.clearColor( 0.0, 0.0, 0.0, 1.0 );

document.onkeydown=handleKeyDown;
// Load shaders and initialize attribute buffers
var program = initShaders( gl, "vertex-shader", "fragment-shader" );
gl.useProgram( program );
gl.program = program;


var vertexColorBuffer = gl.createBuffer();
gl.bindBuffer(gl.ARRAY_BUFFER, vertexColorBuffer);
gl.bufferData(gl.ARRAY_BUFFER, verticesColors, gl.STATIC_DRAW);

var FSIZE = verticesColors.BYTES_PER_ELEMENT;

var a_Position = gl.getAttribLocation(program, 'a_Position');
gl.vertexAttribPointer(a_Position, 2, gl.FLOAT, false, FSIZE*5, 0);
gl.enableVertexAttribArray(a_Position);

var a_Color = gl.getAttribLocation(program, 'a_Color');
gl.vertexAttribPointer(a_Color, 3, gl.FLOAT, false, FSIZE*5, FSIZE*2);
gl.enableVertexAttribArray(a_Color);

u_modelViewMatrix = gl.getUniformLocation(program, 'u_modelViewMatrix');
modelViewMatrix = mat4();

render();
	
};

var render = function(){
	gl.clearColor(0.0,0.0,0.0,1.0);
	gl.clear(gl.COLOR_BUFFER_BIT);
	
	modelViewMatrix = translate(xPos, yPos, 0);
	gl.uniformMatrix4fv(u_modelViewMatrix, false, flatten(modelViewMatrix));
	gl.drawArrays(gl.TRIANGLE_FAN, 0, 6);
	
	window.requestAnimFrame(render);
};
