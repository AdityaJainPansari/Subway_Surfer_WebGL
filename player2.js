/// <reference path="webgl.d.ts" />
// const buffers = initBuffers(gl);
//
// initBuffers
//
// Initialize the buffers we'll need. For this demo, we just
// have one object -- a simple three-dimensional cube.
//
let player2 = class {
    constructor(gl,pos)
    {
        // Create a buffer for the cube's vertex positions.
    
        
        this.rotation = 0;
        
        this.pos = pos;
        this.length = 1.0;
        this.breadth = 0.75;
        this.height = 0.5;
        this.pos[1] = this.pos[1]+this.height;
        // Select the positionBuffer as the one to apply buffer
        // operations to from here out.
        
        
        /*------------------------------------------------------------------*/

        this.position_BODY = [0,0.25,0] ;
        this.positionBuffer_BODY = gl.createBuffer();
        gl.bindBuffer(gl.ARRAY_BUFFER, this.positionBuffer_BODY);
    
        // Now create an array of positions for the cube.
    
        this.positions_BODY = [
            -this.breadth, -this.height/1.75,  this.length, // Front face
             this.breadth, -this.height/1.75,  this.length,
             this.breadth,  this.height/1.75,  this.length,
            -this.breadth,  this.height/1.75,  this.length,
            -this.breadth, -this.height/1.75, -this.length, //Back Face
             this.breadth, -this.height/1.75, -this.length,
             this.breadth,  this.height/1.75, -this.length,
            -this.breadth,  this.height/1.75, -this.length,
            -this.breadth,  this.height/1.75, -this.length, //Top Face
             this.breadth,  this.height/1.75, -this.length,
             this.breadth,  this.height/1.75,  this.length,
            -this.breadth,  this.height/1.75,  this.length,
            -this.breadth, -this.height/1.75, -this.length, //Bottom Face
             this.breadth, -this.height/1.75, -this.length,
             this.breadth, -this.height/1.75,  this.length,
            -this.breadth, -this.height/1.75,  this.length,
            -this.breadth, -this.height/1.75, -this.length, //Left Face
            -this.breadth,  this.height/1.75, -this.length,
            -this.breadth,  this.height/1.75,  this.length,
            -this.breadth, -this.height/1.75,  this.length,
             this.breadth, -this.height/1.75, -this.length, //Right Face
             this.breadth,  this.height/1.75, -this.length,
             this.breadth,  this.height/1.75,  this.length,
             this.breadth, -this.height/1.75,  this.length,
        ];
    
        // Now pass the list of positions into WebGL to build the
        // shape. We do this by creating a Float32Array from the
        // JavaScript array, then use it to fill the current buffer.
    
        gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(this.positions_BODY), gl.STATIC_DRAW);
    
        // Now set up the colors for the faces. We'll use solid colors
        // for each face.
        this.textureCoordBuffer_BODY = gl.createBuffer();
        gl.bindBuffer(gl.ARRAY_BUFFER, this.textureCoordBuffer_BODY);

        this.textureCoordinates_BODY = [
            // Front
            1.0,  1.0,
            0.0,  1.0,
            0.0,  0.0,
            1.0,  0.0,
            // Back
            0.0,  0.0,
            1.0,  0.0,
            1.0,  1.0,
            0.0,  1.0,
            // Top
            0.0,  0.0,
            1.0,  0.0,
            1.0,  1.0,
            0.0,  1.0,
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

        gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(this.textureCoordinates_BODY),
                        gl.STATIC_DRAW);
        // Build the element array buffer; this specifies the indices
        // into the vertex arrays for each face's vertices.
    
        const indexBuffer_BODY = gl.createBuffer();
        gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, indexBuffer_BODY);
    
        // This array defines each face as two triangles, using the
        // indices into the vertex array to specify each triangle's
        // position.
    
        const indices_BODY = [
        0,  1,  2,      0,  2,  3,    // front
        4,  5,  6,      4,  6,  7,    // Back
        8,  9, 10,      8, 10, 11,    // top
        12, 13, 14,     12, 14, 15,    // bottom
        16, 17, 18,     16, 18, 19,    // right
        20, 21, 22,     20, 22, 23,    // left
        ];
    
        // Now send the element array to GL
    
        gl.bufferData(gl.ELEMENT_ARRAY_BUFFER,
            new Uint16Array(indices_BODY), gl.STATIC_DRAW);
        // var url_BODY = [,'./Textures/car.jpg'];
        this.texture_BODY = loadTexture(gl, './Textures/car.jpg');


        /*--------------------------------------------------------------------*/


        this.position_HEAD = [0,1.25,-1];
        this.positionBuffer_HEAD = gl.createBuffer();
        gl.bindBuffer(gl.ARRAY_BUFFER, this.positionBuffer_HEAD);
    
        // Now create an array of positions for the cube.
    
        this.positions_HEAD = [
            -this.breadth/2.25, -this.height/2.25,  this.length*0.7, // Front face
             this.breadth/2.25, -this.height/2.25,  this.length*0.7,
             this.breadth/2.25,  this.height/2.25,  this.length*0.7,
            -this.breadth/2.25,  this.height/2.25,  this.length*0.7,
            -this.breadth/2.25, -this.height/2.25, -this.length*0.7, //Back Face
             this.breadth/2.25, -this.height/2.25, -this.length*0.7,
             this.breadth/2.25,  this.height/2.25, -this.length*0.7,
            -this.breadth/2.25,  this.height/2.25, -this.length*0.7,
            -this.breadth/2.25,  this.height/2.25, -this.length*0.7, //Top Face
             this.breadth/2.25,  this.height/2.25, -this.length*0.7,
             this.breadth/2.25,  this.height/2.25,  this.length*0.7,
            -this.breadth/2.25,  this.height/2.25,  this.length*0.7,
            -this.breadth/2.25, -this.height/2.25, -this.length*0.7, //Bottom Face
             this.breadth/2.25, -this.height/2.25, -this.length*0.7,
             this.breadth/2.25, -this.height/2.25,  this.length*0.7,
            -this.breadth/2.25, -this.height/2.25,  this.length*0.7,
            -this.breadth/2.25, -this.height/2.25, -this.length*0.7, //Left Face
            -this.breadth/2.25,  this.height/2.25, -this.length*0.7,
            -this.breadth/2.25,  this.height/2.25,  this.length*0.7,
            -this.breadth/2.25, -this.height/2.25,  this.length*0.7,
             this.breadth/2.25, -this.height/2.25, -this.length*0.7, //Right Face
             this.breadth/2.25,  this.height/2.25, -this.length*0.7,
             this.breadth/2.25,  this.height/2.25,  this.length*0.7,
             this.breadth/2.25, -this.height/2.25,  this.length*0.7,


            -this.breadth/4, -(this.height*1.6)-1,  (this.length*0.3)+0.5, // Front face
             this.breadth/4, -(this.height*1.6)-1,  (this.length*0.3)+0.5,
             this.breadth/4,  (this.height*1.6)-1,  (this.length*0.3)+0.5,
            -this.breadth/4,  (this.height*1.6)-1,  (this.length*0.3)+0.5,
            -this.breadth/4, -(this.height*1.6)-1, -(this.length*0.3)+0.5, //Back Face
             this.breadth/4, -(this.height*1.6)-1, -(this.length*0.3)+0.5,
             this.breadth/4,  (this.height*1.6)-1, -(this.length*0.3)+0.5,
            -this.breadth/4,  (this.height*1.6)-1, -(this.length*0.3)+0.5,
            -this.breadth/4,  (this.height*1.6)-1, -(this.length*0.3)+0.5, //Top Face
             this.breadth/4,  (this.height*1.6)-1, -(this.length*0.3)+0.5,
             this.breadth/4,  (this.height*1.6)-1,  (this.length*0.3)+0.5,
            -this.breadth/4,  (this.height*1.6)-1,  (this.length*0.3)+0.5,
            -this.breadth/4, -(this.height*1.6)-1, -(this.length*0.3)+0.5, //Bottom Face
             this.breadth/4, -(this.height*1.6)-1, -(this.length*0.3)+0.5,
             this.breadth/4, -(this.height*1.6)-1,  (this.length*0.3)+0.5,
            -this.breadth/4, -(this.height*1.6)-1,  (this.length*0.3)+0.5,
            -this.breadth/4, -(this.height*1.6)-1, -(this.length*0.3)+0.5, //Left Face
            -this.breadth/4,  (this.height*1.6)-1, -(this.length*0.3)+0.5,
            -this.breadth/4,  (this.height*1.6)-1,  (this.length*0.3)+0.5,
            -this.breadth/4, -(this.height*1.6)-1,  (this.length*0.3)+0.5,
             this.breadth/4, -(this.height*1.6)-1, -(this.length*0.3)+0.5, //Right Face
             this.breadth/4,  (this.height*1.6)-1, -(this.length*0.3)+0.5,
             this.breadth/4,  (this.height*1.6)-1,  (this.length*0.3)+0.5,
             this.breadth/4, -(this.height*1.6)-1,  (this.length*0.3)+0.5,
        ];
    
        // Now pass the list of positions into WebGL to build the
        // shape. We do this by creating a Float32Array from the
        // JavaScript array, then use it to fill the current buffer.
    
        gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(this.positions_HEAD), gl.STATIC_DRAW);
    
        // Now set up the colors for the faces. We'll use solid colors
        // for each face.
        this.textureCoordBuffer_HEAD = gl.createBuffer();
        gl.bindBuffer(gl.ARRAY_BUFFER, this.textureCoordBuffer_HEAD);

        this.textureCoordinates_HEAD = [
            // Front
            1.0,  1.0,
            0.0,  1.0,
            0.0,  0.0,
            1.0,  0.0,
            // Back
            0.0,  0.0,
            1.0,  0.0,
            1.0,  1.0,
            0.0,  1.0,
            // Top
            0.0,  0.0,
            1.0,  0.0,
            1.0,  1.0,
            0.0,  1.0,
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


            // Front
            1.0,  1.0,
            0.0,  1.0,
            0.0,  0.0,
            1.0,  0.0,
            // Back
            0.0,  0.0,
            1.0,  0.0,
            1.0,  1.0,
            0.0,  1.0,
            // Top
            0.0,  0.0,
            1.0,  0.0,
            1.0,  1.0,
            0.0,  1.0,
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

        gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(this.textureCoordinates_HEAD),
                        gl.STATIC_DRAW);
        // Build the element array buffer; this specifies the indices
        // into the vertex arrays for each face's vertices.
    
        const indexBuffer_HEAD = gl.createBuffer();
        gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, indexBuffer_HEAD);
    
        // This array defines each face as two triangles, using the
        // indices into the vertex array to specify each triangle's
        // position.
    
        const indices_HEAD = [
            0,  1,  2,      0,  2,  3,    // front
            4,  5,  6,      4,  6,  7,    // Back
            8,  9, 10,      8, 10, 11,    // top
            12, 13, 14,     12, 14, 15,    // bottom
            16, 17, 18,     16, 18, 19,    // right
            20, 21, 22,     20, 22, 23,    // left


            0+24,  1+24,  2+24,      0+24,  2+24,  3+24,    // front
            4+24,  5+24,  6+24,      4+24,  6+24,  7+24,    // Back
            8+24,  9+24, 10+24,      8+24, 10+24, 11+24,    // top
            12+24, 13+24, 14+24,     12+24, 14+24, 15+24,    // bottom
            16+24, 17+24, 18+24,     16+24, 18+24, 19+24,    // right
            20+24, 21+24, 22+24,     20+24, 22+24, 23+24,    // left
        ];
    
        // Now send the element array to GL
    
        gl.bufferData(gl.ELEMENT_ARRAY_BUFFER,
            new Uint16Array(indices_HEAD), gl.STATIC_DRAW);
        // var url_HEAD = ['./Textures/cube.jpg','./Textures/face1.jpg','./Textures/face/a.png','./Textures/face/b.jpg','./Textures/face/c.gif','./Textures/face/d.png'];
        // var url_HEAD = ['./Textures/car2.png'];
        this.texture_HEAD = loadTexture(gl, './Textures/car.jpg');


        /*----------------------------------------------------------------*/


        this.position_LEG_FL = [-0.5,-0.25,-0.9];
        this.position_LEG_BL = [-0.5,-0.25, 0.9];
        this.position_LEG_FR = [ 0.5,-0.25,-0.9];
        this.position_LEG_BR = [ 0.5,-0.25, 0.9];
        this.Leg_Rotation = 0;
        this.positionBuffer_LEG = gl.createBuffer();
        gl.bindBuffer(gl.ARRAY_BUFFER, this.positionBuffer_LEG);
    
        // Now create an array of positions for the cube.
    
        this.positions_LEG = [
            -this.breadth/3.0, -this.height/2.0,  this.length/4.0, // Front face
             this.breadth/3.0, -this.height/2.0,  this.length/4.0,
             this.breadth/3.0,  this.height/2.0,  this.length/4.0,
            -this.breadth/3.0,  this.height/2.0,  this.length/4.0,
            -this.breadth/3.0, -this.height/2.0, -this.length/4.0, //Back Face
             this.breadth/3.0, -this.height/2.0, -this.length/4.0,
             this.breadth/3.0,  this.height/2.0, -this.length/4.0,
            -this.breadth/3.0,  this.height/2.0, -this.length/4.0,
            -this.breadth/3.0,  this.height/2.0, -this.length/4.0, //Top Face
             this.breadth/3.0,  this.height/2.0, -this.length/4.0,
             this.breadth/3.0,  this.height/2.0,  this.length/4.0,
            -this.breadth/3.0,  this.height/2.0,  this.length/4.0,
            -this.breadth/3.0, -this.height/2.0, -this.length/4.0, //Bottom Face
             this.breadth/3.0, -this.height/2.0, -this.length/4.0,
             this.breadth/3.0, -this.height/2.0,  this.length/4.0,
            -this.breadth/3.0, -this.height/2.0,  this.length/4.0,
            -this.breadth/3.0, -this.height/2.0, -this.length/4.0, //Left Face
            -this.breadth/3.0,  this.height/2.0, -this.length/4.0,
            -this.breadth/3.0,  this.height/2.0,  this.length/4.0,
            -this.breadth/3.0, -this.height/2.0,  this.length/4.0,
             this.breadth/3.0, -this.height/2.0, -this.length/4.0, //Right Face
             this.breadth/3.0,  this.height/2.0, -this.length/4.0,
             this.breadth/3.0,  this.height/2.0,  this.length/4.0,
             this.breadth/3.0, -this.height/2.0,  this.length/4.0,
        ];
    
        // Now pass the list of positions into WebGL to build the
        // shape. We do this by creating a Float32Array from the
        // JavaScript array, then use it to fill the current buffer.
    
        gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(this.positions_LEG), gl.STATIC_DRAW);
    
        // Now set up the colors for the faces. We'll use solid colors
        // for each face.
        this.textureCoordBuffer_LEG = gl.createBuffer();
        gl.bindBuffer(gl.ARRAY_BUFFER, this.textureCoordBuffer_LEG);

        this.textureCoordinates_LEG = [
            // Front
            1.0,  1.0,
            0.0,  1.0,
            0.0,  0.0,
            1.0,  0.0,
            // Back
            0.0,  0.0,
            1.0,  0.0,
            1.0,  1.0,
            0.0,  1.0,
            // Top
            0.0,  0.0,
            1.0,  0.0,
            1.0,  1.0,
            0.0,  1.0,
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

        gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(this.textureCoordinates_LEG),
                        gl.STATIC_DRAW);
        // Build the element array buffer; this specifies the indices
        // into the vertex arrays for each face's vertices.
    
        const indexBuffer_LEG = gl.createBuffer();
        gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, indexBuffer_LEG);
    
        // This array defines each face as two triangles, using the
        // indices into the vertex array to specify each triangle's
        // position.
    
        const indices_LEG = [
        0,  1,  2,      0,  2,  3,    // front
        4,  5,  6,      4,  6,  7,    // Back
        8,  9, 10,      8, 10, 11,    // top
        12, 13, 14,     12, 14, 15,    // bottom
        16, 17, 18,     16, 18, 19,    // right
        20, 21, 22,     20, 22, 23,    // left
        ];
    
        // Now send the element array to GL
    
        gl.bufferData(gl.ELEMENT_ARRAY_BUFFER,
            new Uint16Array(indices_LEG), gl.STATIC_DRAW);
        // var url_LEG = ['./Textures/tyre2.jpg',];
        this.texture_LEG = loadTexture(gl, './Textures/tyre2.jpg' );
        // this.texture_LEG = loadTexture(gl, url_LEG[Math.floor(Math.random()*url_LEG.length)]);


        /*-----------------------------------------------------------------------*/
    
        this.buffers = {
            position_HEAD: this.positionBuffer_HEAD,
            texture_HEAD: this.textureCoordBuffer_HEAD,
            indices_HEAD: indexBuffer_HEAD,

            position_BODY: this.positionBuffer_BODY,
            texture_BODY: this.textureCoordBuffer_BODY,
            indices_BODY: indexBuffer_BODY,

            position_LEG: this.positionBuffer_LEG,
            texture_LEG: this.textureCoordBuffer_LEG,
            indices_LEG: indexBuffer_LEG,
        };
    }

    tick()
    {
        // let pow1 = (1-Math.pow((2.71),(-1*(iterations)/10.0)));
        // let pow2 = (1-Math.pow((2.71),(-1*(iterations)/1000.0)));
        this.Leg_Rotation -= 1.5*(POLICE_SPEED);//+0.2*pow2);
        this.pos[2] = this.pos[2] + (GAME_SPEED-POLICE_SPEED);//-0.2*pow2);
        if(this.pos[2]> 9)
        {
            this.pos[2] = 9;
        }
        // console.log(this.pos);
    }

    move_right()
    {
        if(this.pos[0] == -10)
            this.pos[0] = 0;
        else if(this.pos[0] == 0)
            this.pos[0] = 10;
    }

    move_left()
    {
        if(this.pos[0] == 10)
            this.pos[0] = 0;
        else if(this.pos[0] == 0)
            this.pos[0] = -10;
    }

    draw(gl, projectionMatrix, programInfoTexture, deltaTime) 
    {
        this.draw_HEAD(gl, projectionMatrix, programInfoTexture, deltaTime) ;
        this.draw_BODY(gl, projectionMatrix, programInfoTexture, deltaTime) ;
        this.draw_LEG(gl, projectionMatrix, programInfoTexture, deltaTime ,this.position_LEG_FL) ;
        this.draw_LEG(gl, projectionMatrix, programInfoTexture, deltaTime ,this.position_LEG_BL) ;
        this.draw_LEG(gl, projectionMatrix, programInfoTexture, deltaTime ,this.position_LEG_FR) ;
        this.draw_LEG(gl, projectionMatrix, programInfoTexture, deltaTime ,this.position_LEG_BR) ;
    }


    draw_HEAD(gl, projectionMatrix, programInfoTexture, deltaTime) 
    {
        const modelViewMatrix = mat4.create();
        mat4.translate(
            modelViewMatrix,
            modelViewMatrix,
            [this.pos[0]+this.position_HEAD[0], this.pos[1]+this.position_HEAD[1], this.pos[2]+this.position_HEAD[2]]
        );
        //Write your code to Rotate the cube here//

        // mat4.rotate(modelViewMatrix,modelViewMatrix,cubeRotation,[1,1,1]);

        // Tell WebGL how to pull out the positions from the position
        // buffer into the vertexPosition attribute
        {
            const numComponents = 3;
            const type = gl.FLOAT;
            const normalize = false;
            const stride = 0;
            const offset = 0;
            gl.bindBuffer(gl.ARRAY_BUFFER, this.buffers.position_HEAD);
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
            gl.bindBuffer(gl.ARRAY_BUFFER, this.buffers.texture_HEAD);
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
        gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, this.buffers.indices_HEAD);

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
        gl.bindTexture(gl.TEXTURE_2D, this.texture_HEAD);
        // gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, 1, 1, 0, gl.RGBA, gl.UNSIGNED_BYTE,
        //     new Uint8Array([0, 0, 255, 255]));
        // gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, gl.RGBA, gl.UNSIGNED_BYTE, image);
        // gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.REPEAT);
        // gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.CLAMP_TO_EDGE);
        // Tell the shader we bound the texture to texture unit 0
        gl.uniform1i(programInfoTexture.uniformLocations.uSampler, 0);

        {
            const vertexCount = 72;
            const type = gl.UNSIGNED_SHORT;
            const offset = 0;
            gl.drawElements(gl.TRIANGLES, vertexCount, type, offset);
        }

        // Update the rotation for the next draw

        // cubeRotation += deltaTime;
    }

    /*--------------------------------------------------------------*/


    draw_BODY(gl, projectionMatrix, programInfoTexture, deltaTime) 
    {
        const modelViewMatrix = mat4.create();
        mat4.translate(
            modelViewMatrix,
            modelViewMatrix,
            [this.pos[0]+this.position_BODY[0], this.pos[1]+this.position_BODY[1], this.pos[2]+this.position_BODY[2]]
        );
        //Write your code to Rotate the cube here//

        // mat4.rotate(modelViewMatrix,modelViewMatrix,cubeRotation,[1,1,1]);

        // Tell WebGL how to pull out the positions from the position
        // buffer into the vertexPosition attribute
        {
            const numComponents = 3;
            const type = gl.FLOAT;
            const normalize = false;
            const stride = 0;
            const offset = 0;
            gl.bindBuffer(gl.ARRAY_BUFFER, this.buffers.position_BODY);
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
            gl.bindBuffer(gl.ARRAY_BUFFER, this.buffers.texture_BODY);
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
        gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, this.buffers.indices_BODY);

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
        gl.bindTexture(gl.TEXTURE_2D, this.texture_BODY);
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

        // cubeRotation += deltaTime;
    }


    /*----------------------------------------------------------------------*/


    draw_LEG(gl, projectionMatrix, programInfoTexture, deltaTime,leg_pos) 
    {
        const modelViewMatrix = mat4.create();
        mat4.translate(
            modelViewMatrix,
            modelViewMatrix,
            [this.pos[0]+leg_pos[0], this.pos[1]+leg_pos[1], this.pos[2]+leg_pos[2]]
        );
        //Write your code to Rotate the cube here//

        mat4.rotate(modelViewMatrix,modelViewMatrix,this.Leg_Rotation,[1,0,0]);

        // Tell WebGL how to pull out the positions from the position
        // buffer into the vertexPosition attribute
        {
            const numComponents = 3;
            const type = gl.FLOAT;
            const normalize = false;
            const stride = 0;
            const offset = 0;
            gl.bindBuffer(gl.ARRAY_BUFFER, this.buffers.position_LEG);
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
            gl.bindBuffer(gl.ARRAY_BUFFER, this.buffers.texture_LEG);
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
        gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, this.buffers.indices_LEG);

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
        gl.bindTexture(gl.TEXTURE_2D, this.texture_LEG);
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

        // cubeRotation += deltaTime;
    }


    /*----------------------------------------------------------------------*/


    // draw_LEG_R(gl, projectionMatrix, programInfoTexture, deltaTime) 
    // {
    //     const modelViewMatrix = mat4.create();
    //     mat4.translate(
    //         modelViewMatrix,
    //         modelViewMatrix,
    //         [this.pos[0]+this.position_LEG_R[0], this.pos[1]+this.position_LEG_R[1], this.pos[2]+this.position_LEG_R[2]]
    //     );
    //     //Write your code to Rotate the cube here//

    //     mat4.rotate(modelViewMatrix,modelViewMatrix,this.Leg_Rotation,[1,0,0]);

    //     // Tell WebGL how to pull out the positions from the position
    //     // buffer into the vertexPosition attribute
    //     {
    //         const numComponents = 3;
    //         const type = gl.FLOAT;
    //         const normalize = false;
    //         const stride = 0;
    //         const offset = 0;
    //         gl.bindBuffer(gl.ARRAY_BUFFER, this.buffers.position_LEG);
    //         gl.vertexAttribPointer(
    //             programInfoTexture.attribLocations.vertexPosition,
    //             numComponents,
    //             type,
    //             normalize,
    //             stride,
    //             offset);
    //         gl.enableVertexAttribArray(
    //             programInfoTexture.attribLocations.vertexPosition);
    //     }

    //     // Tell WebGL how to pull out the colors from the color buffer
    //     // into the vertexColor attribute.
    //     {
    //         const numComponents = 2;
    //         const type = gl.FLOAT;
    //         const normalize = false;
    //         const stride = 0;
    //         const offset = 0;
    //         gl.bindBuffer(gl.ARRAY_BUFFER, this.buffers.texture_LEG);
    //         // console.log(programInfoTexture.attribLocations.textureCoord);
    //         gl.vertexAttribPointer(
    //             programInfoTexture.attribLocations.textureCoord,
    //             numComponents,
    //             type,
    //             normalize,
    //             stride,
    //             offset);
    //         gl.enableVertexAttribArray(
    //             programInfoTexture.attribLocations.textureCoord);
    //     }

    //     // Tell WebGL which indices to use to index the vertices
    //     gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, this.buffers.indices_LEG);

    //     // Tell WebGL to use our program when drawing

    //     gl.useProgram(programInfoTexture.program);

    //     // Set the shader uniforms

    //     gl.uniformMatrix4fv(
    //         programInfoTexture.uniformLocations.projectionMatrix,
    //         false,
    //         projectionMatrix);
    //     gl.uniformMatrix4fv(
    //         programInfoTexture.uniformLocations.modelViewMatrix,
    //         false,
    //         modelViewMatrix);

    //     // Specify the texture to map onto the faces.

    //     // Tell WebGL we want to affect texture unit 0
    //     gl.activeTexture(gl.TEXTURE0);

    //     // Bind the texture to texture unit 0
    //     // var image = new Image();
    //     // image.src = './Textures/wall.jpg';
    //     gl.bindTexture(gl.TEXTURE_2D, this.texture_LEG);
    //     // gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, 1, 1, 0, gl.RGBA, gl.UNSIGNED_BYTE,
    //     //     new Uint8Array([0, 0, 255, 255]));
    //     // gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, gl.RGBA, gl.UNSIGNED_BYTE, image);
    //     // gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.REPEAT);
    //     // gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.CLAMP_TO_EDGE);
    //     // Tell the shader we bound the texture to texture unit 0
    //     gl.uniform1i(programInfoTexture.uniformLocations.uSampler, 0);

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