/// <reference path="webgl.d.ts" />
// const buffers = initBuffers(gl);
//
// initBuffers
//
// Initialize the buffers we'll need. For this demo, we just
// have one object -- a simple three-dimensional cube.
//
let JackPot = class {
    constructor(gl,pos,url)
    {
        // Create a buffer for the cube's vertex positions.
    
        this.positionBuffer = gl.createBuffer();
    
        this.rotation = 1;

        this.pos = pos;
        this.length  = 1.5;
        this.breadth = 1.5;
        this.height  = 1.0;
        this.pos[1] = this.pos[1]+ this.height;
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
        this.textureCoordBuffer = gl.createBuffer();
        gl.bindBuffer(gl.ARRAY_BUFFER, this.textureCoordBuffer);

        this.textureCoordinates = [
            // Front
            0.0,  1.0,
            1.0,  1.0,
            1.0,  0.0,
            0.0,  0.0,
            // Back
            1.0,  1.0,
            0.0,  1.0,
            0.0,  0.0,
            1.0,  0.0,
            // Top
            0.0,  0.0,
            0.0,  0.0,
            0.0,  0.0,
            0.0,  0.0,
            // Bottom
            0.0,  0.0,
            0.0,  0.0,
            0.0,  0.0,
            0.0,  0.0,
            // Right
            1.0,  1.0,
            1.0,  0.0,
            0.0,  0.0,
            0.0,  1.0,
            // Left
            1.0,  1.0,
            1.0,  0.0,
            0.0,  0.0,
            0.0,  1.0,
        ];

        gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(this.textureCoordinates),
                        gl.STATIC_DRAW);
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
            texture: this.textureCoordBuffer,
            indices: indexBuffer,
            };
        // var url = ['./Textures/barricade.jpg','./Textures/barricade.jpg'];
        this.texture = loadTexture(gl, url);
        // this.texture = loadTexture(gl, url[Math.floor(Math.random()*url.length)]);
    }

    tick()
    {
        this.pos[2] = this.pos[2] + GAME_SPEED;
        if(this.pos[2]> 0)
        {
            this.pos[2] = -400;
        }
        this.rotation += 0.01;
        // console.log(this.pos);
    }

    draw(gl, projectionMatrix, programInfoTexture, deltaTime) 
    {
        const modelViewMatrix = mat4.create();
        mat4.translate(
            modelViewMatrix,
            modelViewMatrix,
            this.pos
        );
        //Write your code to Rotate the cube here//

        // mat4.rotate(modelViewMatrix,modelViewMatrix,0.785,[0,0,1]);
        mat4.rotate(modelViewMatrix,modelViewMatrix,this.rotation,[0,1,0]);

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
                programInfoTexture.attribLocations.vertexPosition,
                numComponents,
                type,
                normalize,
                stride,
                offset);
            gl.enableVertexAttribArray(
                programInfoTexture.attribLocations.vertexPosition);
        }

        // Tell WebGL how to pull out the colors from the color buffer
        // into the vertexColor attribute.
        {
            const numComponents = 2;
            const type = gl.FLOAT;
            const normalize = false;
            const stride = 0;
            const offset = 0;
            gl.bindBuffer(gl.ARRAY_BUFFER, this.buffers.texture);
            // console.log(programInfoTexture.attribLocations.textureCoord);
            gl.vertexAttribPointer(
                programInfoTexture.attribLocations.textureCoord,
                numComponents,
                type,
                normalize,
                stride,
                offset);
            gl.enableVertexAttribArray(
                programInfoTexture.attribLocations.textureCoord);
        }

        // Tell WebGL which indices to use to index the vertices
        gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, this.buffers.indices);

        // Tell WebGL to use our program when drawing

        gl.useProgram(programInfoTexture.program);

        // Set the shader uniforms

        gl.uniformMatrix4fv(
            programInfoTexture.uniformLocations.projectionMatrix,
            false,
            projectionMatrix);
        gl.uniformMatrix4fv(
            programInfoTexture.uniformLocations.modelViewMatrix,
            false,
            modelViewMatrix);

        // Specify the texture to map onto the faces.

        // Tell WebGL we want to affect texture unit 0
        gl.activeTexture(gl.TEXTURE0);

        // Bind the texture to texture unit 0
        // var image = new Image();
        // image.src = './Textures/wall.jpg';
        gl.bindTexture(gl.TEXTURE_2D, this.texture);
        // gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, 1, 1, 0, gl.RGBA, gl.UNSIGNED_BYTE,
        //     new Uint8Array([0, 0, 255, 255]));
        // gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, gl.RGBA, gl.UNSIGNED_BYTE, image);
        // gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.REPEAT);
        // gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.CLAMP_TO_EDGE);
        // Tell the shader we bound the texture to texture unit 0
        gl.uniform1i(programInfoTexture.uniformLocations.uSampler, 0);

        {
            const vertexCount = 36;
            const type = gl.UNSIGNED_SHORT;
            const offset = 0;
            gl.drawElements(gl.TRIANGLES, vertexCount, type, offset);
        }

        // Update the rotation for the next draw

        // this.rotation += deltaTime;
    }

    drawLight(gl, projectionMatrix, programInfoTexture, deltaTime) 
    {
        const modelViewMatrix = mat4.create();
        mat4.translate(
            modelViewMatrix,
            modelViewMatrix,
            this.pos
        );
        //Write your code to Rotate the cube here//

        // mat4.rotate(modelViewMatrix,modelViewMatrix,0.785,[0,0,1]);
        mat4.rotate(modelViewMatrix,modelViewMatrix,this.rotation,[0,1,0]);

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
                programInfoTexture.attribLocations.vertexPosition,
                numComponents,
                type,
                normalize,
                stride,
                offset);
            gl.enableVertexAttribArray(
                programInfoTexture.attribLocations.vertexPosition);
        }

        // Tell WebGL how to pull out the colors from the color buffer
        // into the vertexColor attribute.
        {
            const numComponents = 2;
            const type = gl.FLOAT;
            const normalize = false;
            const stride = 0;
            const offset = 0;
            gl.bindBuffer(gl.ARRAY_BUFFER, this.buffers.texture);
            // console.log(programInfoTexture.attribLocations.textureCoord);
            gl.vertexAttribPointer(
                programInfoTexture.attribLocations.textureCoord,
                numComponents,
                type,
                normalize,
                stride,
                offset);
            gl.enableVertexAttribArray(
                programInfoTexture.attribLocations.textureCoord);
        }
        {
            const numComponents = 3;
            const type = gl.FLOAT;
            const normalize = false;
            const stride = 0;
            const offset = 0;
            gl.bindBuffer(gl.ARRAY_BUFFER, this.buffers.normal);
            gl.vertexAttribPointer(
                programInfoTexture.attribLocations.vertexNormal,
                numComponents,
                type,
                normalize,
                stride,
                offset);
            gl.enableVertexAttribArray(
                programInfoTexture.attribLocations.vertexNormal);
        }
        const normalMatrix = mat4.create();
        mat4.invert(normalMatrix, modelViewMatrix);
        mat4.transpose(normalMatrix, normalMatrix);


        // Tell WebGL which indices to use to index the vertices
        gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, this.buffers.indices);

        // Tell WebGL to use our program when drawing

        gl.useProgram(programInfoTexture.program);

        // Set the shader uniforms

        gl.uniformMatrix4fv(
            programInfoTexture.uniformLocations.projectionMatrix,
            false,
            projectionMatrix);
        gl.uniformMatrix4fv(
            programInfoTexture.uniformLocations.modelViewMatrix,
            false,
            modelViewMatrix);
        gl.uniformMatrix4fv(
            programInfoTexture.uniformLocations.normalMatrix,
            false,
            normalMatrix);

        // Specify the texture to map onto the faces.

        // Tell WebGL we want to affect texture unit 0
        gl.activeTexture(gl.TEXTURE0);

        // Bind the texture to texture unit 0
        // var image = new Image();
        // image.src = './Textures/wall.jpg';
        gl.bindTexture(gl.TEXTURE_2D, this.texture);
        // gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, 1, 1, 0, gl.RGBA, gl.UNSIGNED_BYTE,
        //     new Uint8Array([0, 0, 255, 255]));
        // gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, gl.RGBA, gl.UNSIGNED_BYTE, image);
        // gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.REPEAT);
        // gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.CLAMP_TO_EDGE);
        // Tell the shader we bound the texture to texture unit 0
        gl.uniform1i(programInfoTexture.uniformLocations.uSampler, 0);

        {
            const vertexCount = 36;
            const type = gl.UNSIGNED_SHORT;
            const offset = 0;
            gl.drawElements(gl.TRIANGLES, vertexCount, type, offset);
        }

        // Update the rotation for the next draw

        // this.rotation += deltaTime;
    }
}