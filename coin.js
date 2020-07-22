/// <reference path="webgl.d.ts" />
// const buffers = initBuffers(gl);
//
// initBuffers
//
// Initialize the buffers we'll need. For this demo, we just
// have one object -- a simple three-dimensional cube.
//
let coin = class {
    constructor(gl,pos,level)
    {
        // Create a buffer for the cube's vertex positions.
    
        this.positionBuffer = gl.createBuffer();
    
        this.rotation = 1;

        this.pos = pos;
        this.length  = 0.2;
        this.breadth = 0.7;
        this.height  = 0.7;
        this.level = level;
        this.pos[1] = this.pos[1]+ this.height + 3.0 + 10.0*this.level;
        // this.pos[1] = this.pos[1]-this.height;
        // Select the positionBuffer as the one to apply buffer
        // operations to from here out.
    
        gl.bindBuffer(gl.ARRAY_BUFFER, this.positionBuffer);
    
        // Now create an array of positions for the cube.
    
        this.positions = [
            -this.breadth, -this.height,  this.length, // Front face
             this.breadth, -this.height,  this.length,
             this.breadth,  this.height,  this.length,
            -this.breadth,  this.height,  this.length,
            -this.breadth, -this.height, -this.length, //Back Face
             this.breadth, -this.height, -this.length,
             this.breadth,  this.height, -this.length,
            -this.breadth,  this.height, -this.length,
            -this.breadth,  this.height, -this.length, //Top Face
             this.breadth,  this.height, -this.length,
             this.breadth,  this.height,  this.length,
            -this.breadth,  this.height,  this.length,
            -this.breadth, -this.height, -this.length, //Bottom Face
             this.breadth, -this.height, -this.length,
             this.breadth, -this.height,  this.length,
            -this.breadth, -this.height,  this.length,
            -this.breadth, -this.height, -this.length, //Left Face
            -this.breadth,  this.height, -this.length,
            -this.breadth,  this.height,  this.length,
            -this.breadth, -this.height,  this.length,
             this.breadth, -this.height, -this.length, //Right Face
             this.breadth,  this.height, -this.length,
             this.breadth,  this.height,  this.length,
             this.breadth, -this.height,  this.length,
        ];
    
        // Now pass the list of positions into WebGL to build the
        // shape. We do this by creating a Float32Array from the
        // JavaScript array, then use it to fill the current buffer.
    
        gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(this.positions), gl.STATIC_DRAW);
    
        // Now set up the colors for the faces. We'll use solid colors
        // for each face.
    
        this.faceColors = [
        [204.0/255,  119.0/255,  34.0/255,  1.0],    // Left face: purple
        [248.0/255,  222.0/255,  126.0/255,  1.0],
        [255.0/255,  153.0/255,  51.0/255,  1.0],
        [239.0/255,  253.0/255,  95.0/255,  1.0],
        [255.0/255,  255.0/255,  0.0/255,  1.0],
        [248.0/255,  222.0/255,  126.0/255,  1.0],
        [204.0/255,  119.0/255,  34.0/255,  1.0],    // Left face: purple
        [248.0/255,  222.0/255,  126.0/255,  1.0],
        [255.0/255,  153.0/255,  51.0/255,  1.0],
        ];
    
        // Convert the array of colors into a table for all the vertices.
    
        var colors = [];
    
        for (var j = 0; j < this.faceColors.length-3; ++j) {
        const c = this.faceColors[j];
        const c1 = this.faceColors[j+1];
        const c2 = this.faceColors[j+2];
        const c3 = this.faceColors[j+3];
    
        // Repeat each color four times for the four vertices of the face
        colors = colors.concat(c, c1, c2, c3);
        }
    
        const colorBuffer = gl.createBuffer();
        gl.bindBuffer(gl.ARRAY_BUFFER, colorBuffer);
        gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(colors), gl.STATIC_DRAW);
    
        // Build the element array buffer; this specifies the indices
        // into the vertex arrays for each face's vertices.
    
        const indexBuffer = gl.createBuffer();
        gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, indexBuffer);
    
        // This array defines each face as two triangles, using the
        // indices into the vertex array to specify each triangle's
        // position.
    
        const indices = [
        0,  1,  2,      0,  2,  3,    // front
        4,  5,  6,      4,  6,  7,    // Back
        8,  9, 10,      8, 10, 11,    // top
        12, 13, 14,     12, 14, 15,    // bottom
        16, 17, 18,     16, 18, 19,    // right
        20, 21, 22,     20, 22, 23,    // left
        ];
    
        // Now send the element array to GL
    
        gl.bufferData(gl.ELEMENT_ARRAY_BUFFER,
            new Uint16Array(indices), gl.STATIC_DRAW);
            
            this.normalBuffer = gl.createBuffer();
            gl.bindBuffer(gl.ARRAY_BUFFER, this.normalBuffer);
            
            this.vertexNormals = [
                // Front
                0.0,  0.0,  1.0,
                0.0,  0.0,  1.0,
                0.0,  0.0,  1.0,
                0.0,  0.0,  1.0,
            
                // Back
                0.0,  0.0, -1.0,
                0.0,  0.0, -1.0,
                0.0,  0.0, -1.0,
                0.0,  0.0, -1.0,
            
                // Top
                0.0,  1.0,  0.0,
                0.0,  1.0,  0.0,
                0.0,  1.0,  0.0,
                0.0,  1.0,  0.0,
            
                // Bottom
                0.0, -1.0,  0.0,
                0.0, -1.0,  0.0,
                0.0, -1.0,  0.0,
                0.0, -1.0,  0.0,
            
                // Right
                1.0,  0.0,  0.0,
                1.0,  0.0,  0.0,
                1.0,  0.0,  0.0,
                1.0,  0.0,  0.0,
            
                // Left
                -1.0,  0.0,  0.0,
                -1.0,  0.0,  0.0,
                -1.0,  0.0,  0.0,
                -1.0,  0.0,  0.0
            ];
            
            gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(this.vertexNormals),
                            gl.STATIC_DRAW);
    
        this.buffers = {
        position: this.positionBuffer,
        normal: this.normalBuffer,
        color: colorBuffer,
        indices: indexBuffer,
        };
    }

    tick()
    {
        this.pos[2] = this.pos[2] + GAME_SPEED;
        if(this.pos[2]> 300)
        {
            this.pos[2] -= END;
        }
        this.rotation += 0.1;
        // console.log(this.pos);
    }

    draw(gl, projectionMatrix, programInfoColor, deltaTime) 
    {
        const modelViewMatrix = mat4.create();
        mat4.translate(
            modelViewMatrix,
            modelViewMatrix,
            this.pos
        );
        //Write your code to Rotate the cube here//

        mat4.rotate(modelViewMatrix,modelViewMatrix,0.785,[0,0,1]);
        mat4.rotate(modelViewMatrix,modelViewMatrix,this.rotation,[1,1,0]);

        // Tell WebGL how to pull out the positions from the position
        // buffer into the vertexPosition attribute
        {
            const numComponents = 3;
            const type = gl.FLOAT;
            const normalize = false;
            const stride = 0;
            const offset = 0;
            gl.bindBuffer(gl.ARRAY_BUFFER, this.buffers.position);
            gl.vertexAttribPointer(
                programInfoColor.attribLocations.vertexPosition,
                numComponents,
                type,
                normalize,
                stride,
                offset);
            gl.enableVertexAttribArray(
                programInfoColor.attribLocations.vertexPosition);
        }

        // Tell WebGL how to pull out the colors from the color buffer
        // into the vertexColor attribute.
        {
            const numComponents = 4;
            const type = gl.FLOAT;
            const normalize = false;
            const stride = 0;
            const offset = 0;
            gl.bindBuffer(gl.ARRAY_BUFFER, this.buffers.color);
            gl.vertexAttribPointer(
                programInfoColor.attribLocations.vertexColor,
                numComponents,
                type,
                normalize,
                stride,
                offset);
            gl.enableVertexAttribArray(
                programInfoColor.attribLocations.vertexColor);
        }

        // Tell WebGL which indices to use to index the vertices
        gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, this.buffers.indices);

        // Tell WebGL to use our program when drawing

        gl.useProgram(programInfoColor.program);

        // Set the shader uniforms

        gl.uniformMatrix4fv(
            programInfoColor.uniformLocations.projectionMatrix,
            false,
            projectionMatrix);
        gl.uniformMatrix4fv(
            programInfoColor.uniformLocations.modelViewMatrix,
            false,
            modelViewMatrix);

        {
            const vertexCount = 36;
            const type = gl.UNSIGNED_SHORT;
            const offset = 0;
            gl.drawElements(gl.TRIANGLES, vertexCount, type, offset);
        }

        // Update the rotation for the next draw

        // cubeRotation += deltaTime;
    }

    // drawLight(gl, projectionMatrix, programInfoColor, deltaTime) 
    // {
    //     const modelViewMatrix = mat4.create();
    //     mat4.translate(
    //         modelViewMatrix,
    //         modelViewMatrix,
    //         this.pos
    //     );
    //     //Write your code to Rotate the cube here//

    //     mat4.rotate(modelViewMatrix,modelViewMatrix,0.785,[0,0,1]);
    //     mat4.rotate(modelViewMatrix,modelViewMatrix,this.rotation,[1,1,0]);

    //     // Tell WebGL how to pull out the positions from the position
    //     // buffer into the vertexPosition attribute
    //     {
    //         const numComponents = 3;
    //         const type = gl.FLOAT;
    //         const normalize = false;
    //         const stride = 0;
    //         const offset = 0;
    //         gl.bindBuffer(gl.ARRAY_BUFFER, this.buffers.position);
    //         gl.vertexAttribPointer(
    //             programInfoColor.attribLocations.vertexPosition,
    //             numComponents,
    //             type,
    //             normalize,
    //             stride,
    //             offset);
    //         gl.enableVertexAttribArray(
    //             programInfoColor.attribLocations.vertexPosition);
    //     }

    //     // Tell WebGL how to pull out the colors from the color buffer
    //     // into the vertexColor attribute.
    //     {
    //         const numComponents = 4;
    //         const type = gl.FLOAT;
    //         const normalize = false;
    //         const stride = 0;
    //         const offset = 0;
    //         gl.bindBuffer(gl.ARRAY_BUFFER, this.buffers.color);
    //         gl.vertexAttribPointer(
    //             programInfoColor.attribLocations.vertexColor,
    //             numComponents,
    //             type,
    //             normalize,
    //             stride,
    //             offset);
    //         gl.enableVertexAttribArray(
    //             programInfoColor.attribLocations.vertexColor);
    //     }
    //     {
    //         const numComponents = 3;
    //         const type = gl.FLOAT;
    //         const normalize = false;
    //         const stride = 0;
    //         const offset = 0;
    //         gl.bindBuffer(gl.ARRAY_BUFFER, this.buffers.normal);
    //         gl.vertexAttribPointer(
    //             programInfoColor.attribLocations.vertexNormal,
    //             numComponents,
    //             type,
    //             normalize,
    //             stride,
    //             offset);
    //         gl.enableVertexAttribArray(
    //             programInfoColor.attribLocations.vertexNormal);
    //     }
    //     const normalMatrix = mat4.create();
    //     mat4.invert(normalMatrix, modelViewMatrix);
    //     mat4.transpose(normalMatrix, normalMatrix);


    //     // Tell WebGL which indices to use to index the vertices
    //     gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, this.buffers.indices);

    //     // Tell WebGL to use our program when drawing

    //     gl.useProgram(programInfoColor.program);

    //     // Set the shader uniforms

    //     gl.uniformMatrix4fv(
    //         programInfoColor.uniformLocations.projectionMatrix,
    //         false,
    //         projectionMatrix);
    //     gl.uniformMatrix4fv(
    //         programInfoColor.uniformLocations.modelViewMatrix,
    //         false,
    //         modelViewMatrix);
    //     gl.uniformMatrix4fv(
    //         programInfoColor.uniformLocations.normalMatrix,
    //         false,
    //         normalMatrix);

    //     {
    //         const vertexCount = 36;
    //         const type = gl.UNSIGNED_SHORT;
    //         const offset = 0;
    //         gl.drawElements(gl.TRIANGLES, vertexCount, type, offset);
    //     }

    //     // Update the rotation for the next draw

    //     // cubeRotation += deltaTime;
    // }
}