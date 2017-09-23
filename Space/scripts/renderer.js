/**
 * Created by Mariusz on 26.11.2016.
 */

var renderer = {
    context: null,
    program: null,
    vertices: new Float32Array(65536),
    index: 0,
    buffer: null,

    initialize: function(canvas) {
        this.context = canvas.getContext('webgl') || canvas.getContext('experimental-webgl');
        var gl = this.context;

        gl.enable(gl.BLEND);
        gl.blendFunc(gl.SRC_ALPHA, gl.ONE_MINUS_SRC_ALPHA);

        this.program = this.compileProgram('shader-vs', 'shader-fs');
        this.buffer = gl.createBuffer();
        gl.bindBuffer(gl.ARRAY_BUFFER, this.buffer);

        gl.useProgram(program);

        this.program.invCanvasSize = gl.getUniformLocation(this.program, 'invCanvasSize');
        gl.uniform2fv(this.program.invCanvasSize, [ 1.0 / canvas.width, 1.0 / canvas.height]);

        this.program.position = gl.getAttribLocation(this.program, 'position');
        gl.enableVertexAttribArray(this.program.position);
        gl.vertexAttribPointer(this.program.position, 2, gl.FLOAT, false, 0, 0);

        gl.viewport(0, 0, canvas.width, canvas.height);
        gl.clearColor(0, 0, 0, 1);
        gl.clear(gl.COLOR_BUFFER_BIT);
    },

    resize: function(width, height) {
        this.context.viewport(0, 0, width, height);
        this.context.uniform2fv(this.program.invCanvasSize, [ 1.0 / width, 1.0 / height]);
    },

    flush: function() {
        if (this.index > 0) {
            // gl.bindBuffer(gl.ARRAY_BUFFER, this.buffer);
            this.context.bufferData(this.context.ARRAY_BUFFER, this.vertices, this.context.DYNAMIC_DRAW);
           // gl.vertexAttribPointer(this.program.position, 2, gl.FLOAT, false, 0, 0);

            this.context.drawArrays(this.context.POINTS, 0, this.index / 2);
            this.index = 0;
        }
    },

    render: function() {
        var gl = this.context;

        gl.clearColor(0, 0, 0, 1);
        gl.clear(gl.COLOR_BUFFER_BIT);


        //var data = gl.mapBuffer(gl.ARRAY_BUFFER, gl.READ_WRITE);

       // gl.unmapBuffer(gl.ARRAY_BUFFER);

        particleSystem.render();
        this.flush();
    },

    renderPoint: function(x, y, color) {
        if (this.index >= this.vertices.length) {
            this.flush();
        }

        this.vertices[this.index++] = x;
        this.vertices[this.index++] = y;
    },

    compileProgram: function(vertexID, fragmentID) {
        var gl = this.context;

        var v = document.getElementById(vertexID).firstChild.nodeValue;
        var f = document.getElementById(fragmentID).firstChild.nodeValue;

        var vs = gl.createShader(gl.VERTEX_SHADER);
        gl.shaderSource(vs, v);
        gl.compileShader(vs);

        var fs = gl.createShader(gl.FRAGMENT_SHADER);
        gl.shaderSource(fs, f);
        gl.compileShader(fs);

        program = gl.createProgram();
        gl.attachShader(program, vs);
        gl.attachShader(program, fs);
        gl.linkProgram(program);

        if (!gl.getShaderParameter(vs, gl.COMPILE_STATUS)) {
            console.log(gl.getShaderInfoLog(vs));
        }

        if (!gl.getShaderParameter(fs, gl.COMPILE_STATUS)) {
            console.log(gl.getShaderInfoLog(fs));
        }

        if (!gl.getProgramParameter(program, gl.LINK_STATUS)) {
            console.log(gl.getProgramInfoLog(program));
        }

        return program;
    }
};