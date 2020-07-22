/// <reference path="webgl.d.ts" />
// const buffers = initBuffers(gl);
//
// initBuffers
//
// Initialize the buffers we'll need. For this demo, we just
// have one object -- a simple three-dimensional cube.
//
let player = class {
    constructor(gl,pos)
    {
        // Create a buffer for the cube's vertex positions.
    
        
        this.rotation = 0;
        
        this.pos = pos;
        this.score = 0;
        this.shield = false ;
        this.length = 1.0/1.5;
        this.breadth = 1.0/1.2;
        this.height = 1;
        this.velocityY = 0.0;
        this.dodge = false;
        this.acclerationY = -0.09;
        this.pos[1] = this.pos[1]+2;
        // Select the positionBuffer as the one to apply buffer
        // operations to from here out.
        
        
        /*------------------------------------------------------------------*/

        this.position_BODY = [0,-0.25,0] ;
        this.positionBuffer_BODY = gl.createBuffer();
        gl.bindBuffer(gl.ARRAY_BUFFER, this.positionBuffer_BODY);
    
        // Now create an array of positions for the cube.
    
        this.positions_BODY = [
            -this.breadth*(1.2)/2.0, -(this.height)/2.0,  this.length*(1.5)/2.0, // Front face
             this.breadth*(1.2)/2.0, -(this.height)/2.0,  this.length*(1.5)/2.0,
             this.breadth*(1.2)/2.0,  (this.height)/2.0,  this.length*(1.5)/2.0,
            -this.breadth*(1.2)/2.0,  (this.height)/2.0,  this.length*(1.5)/2.0,
            -this.breadth*(1.2)/2.0, -(this.height)/2.0, -this.length*(1.5)/2.0, //Back Face
             this.breadth*(1.2)/2.0, -(this.height)/2.0, -this.length*(1.5)/2.0,
             this.breadth*(1.2)/2.0,  (this.height)/2.0, -this.length*(1.5)/2.0,
            -this.breadth*(1.2)/2.0,  (this.height)/2.0, -this.length*(1.5)/2.0,
            -this.breadth*(1.2)/2.0,  (this.height)/2.0, -this.length*(1.5)/2.0, //Top Face
             this.breadth*(1.2)/2.0,  (this.height)/2.0, -this.length*(1.5)/2.0,
             this.breadth*(1.2)/2.0,  (this.height)/2.0,  this.length*(1.5)/2.0,
            -this.breadth*(1.2)/2.0,  (this.height)/2.0,  this.length*(1.5)/2.0,
            -this.breadth*(1.2)/2.0, -(this.height)/2.0, -this.length*(1.5)/2.0, //Bottom Face
             this.breadth*(1.2)/2.0, -(this.height)/2.0, -this.length*(1.5)/2.0,
             this.breadth*(1.2)/2.0, -(this.height)/2.0,  this.length*(1.5)/2.0,
            -this.breadth*(1.2)/2.0, -(this.height)/2.0,  this.length*(1.5)/2.0,
            -this.breadth*(1.2)/2.0, -(this.height)/2.0, -this.length*(1.5)/2.0, //Left Face
            -this.breadth*(1.2)/2.0,  (this.height)/2.0, -this.length*(1.5)/2.0,
            -this.breadth*(1.2)/2.0,  (this.height)/2.0,  this.length*(1.5)/2.0,
            -this.breadth*(1.2)/2.0, -(this.height)/2.0,  this.length*(1.5)/2.0,
             this.breadth*(1.2)/2.0, -(this.height)/2.0, -this.length*(1.5)/2.0, //Right Face
             this.breadth*(1.2)/2.0,  (this.height)/2.0, -this.length*(1.5)/2.0,
             this.breadth*(1.2)/2.0,  (this.height)/2.0,  this.length*(1.5)/2.0,
             this.breadth*(1.2)/2.0, -(this.height)/2.0,  this.length*(1.5)/2.0,
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

        
            this.normalBuffer_BODY = gl.createBuffer();
            gl.bindBuffer(gl.ARRAY_BUFFER, this.normalBuffer_BODY);
            
            this.vertexNormals_BODY = [
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
            
            gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(this.vertexNormals_BODY),
                            gl.STATIC_DRAW);
        var url_BODY = ['./Textures/cube.jpg','./Textures/cube.jpg'];
        this.texture_BODY = loadTexture(gl, url_BODY[Math.floor(Math.random()*url_BODY.length)]);


        /*--------------------------------------------------------------------*/


        this.position_HEAD = [0,1,0];
        this.positionBuffer_HEAD = gl.createBuffer();
        gl.bindBuffer(gl.ARRAY_BUFFER, this.positionBuffer_HEAD);
    
        // Now create an array of positions for the cube.
    
        this.positions_HEAD = [
            -this.breadth, -(this.height),  this.length, // Front face
             this.breadth, -(this.height),  this.length,
             this.breadth,  (this.height),  this.length,
            -this.breadth,  (this.height),  this.length,
            -this.breadth, -(this.height), -this.length, //Back Face
             this.breadth, -(this.height), -this.length,
             this.breadth,  (this.height), -this.length,
            -this.breadth,  (this.height), -this.length,
            -this.breadth,  (this.height), -this.length, //Top Face
             this.breadth,  (this.height), -this.length,
             this.breadth,  (this.height),  this.length,
            -this.breadth,  (this.height),  this.length,
            -this.breadth, -(this.height), -this.length, //Bottom Face
             this.breadth, -(this.height), -this.length,
             this.breadth, -(this.height),  this.length,
            -this.breadth, -(this.height),  this.length,
            -this.breadth, -(this.height), -this.length, //Left Face
            -this.breadth,  (this.height), -this.length,
            -this.breadth,  (this.height),  this.length,
            -this.breadth, -(this.height),  this.length,
             this.breadth, -(this.height), -this.length, //Right Face
             this.breadth,  (this.height), -this.length,
             this.breadth,  (this.height),  this.length,
             this.breadth, -(this.height),  this.length,
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
        ];
    
        // Now send the element array to GL
    
        gl.bufferData(gl.ELEMENT_ARRAY_BUFFER,
            new Uint16Array(indices_HEAD), gl.STATIC_DRAW);

        
            this.normalBuffer_HEAD = gl.createBuffer();
            gl.bindBuffer(gl.ARRAY_BUFFER, this.normalBuffer_HEAD);
            
            this.vertexNormals_HEAD = [
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
            
            gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(this.vertexNormals_HEAD),
                            gl.STATIC_DRAW);
        // var url_HEAD = ['./Textures/face/face1.jpg','./Textures/face/a.jpg'];
        this.texture_HEAD = loadTexture(gl, './Textures/face/a.jpg');// url_HEAD[Math.floor(Math.random()*url_HEAD.length)]);


        /*----------------------------------------------------------------*/


        this.position_LEG_L = [-1,-1,0];
        this.position_LEG_R = [1,-1,0];
        this.Leg_Rotation = 0;
        this.positionBuffer_LEG = gl.createBuffer();
        gl.bindBuffer(gl.ARRAY_BUFFER, this.positionBuffer_LEG);
    
        // Now create an array of positions for the cube.
    
        this.positions_LEG = [
            -this.breadth*(1.2)/2.0, -(this.height)/2.0,  this.length*(1.5)/2.0, // Front face
             this.breadth*(1.2)/2.0, -(this.height)/2.0,  this.length*(1.5)/2.0,
             this.breadth*(1.2)/2.0,  (this.height)/2.0,  this.length*(1.5)/2.0,
            -this.breadth*(1.2)/2.0,  (this.height)/2.0,  this.length*(1.5)/2.0,
            -this.breadth*(1.2)/2.0, -(this.height)/2.0, -this.length*(1.5)/2.0, //Back Face
             this.breadth*(1.2)/2.0, -(this.height)/2.0, -this.length*(1.5)/2.0,
             this.breadth*(1.2)/2.0,  (this.height)/2.0, -this.length*(1.5)/2.0,
            -this.breadth*(1.2)/2.0,  (this.height)/2.0, -this.length*(1.5)/2.0,
            -this.breadth*(1.2)/2.0,  (this.height)/2.0, -this.length*(1.5)/2.0, //Top Face
             this.breadth*(1.2)/2.0,  (this.height)/2.0, -this.length*(1.5)/2.0,
             this.breadth*(1.2)/2.0,  (this.height)/2.0,  this.length*(1.5)/2.0,
            -this.breadth*(1.2)/2.0,  (this.height)/2.0,  this.length*(1.5)/2.0,
            -this.breadth*(1.2)/2.0, -(this.height)/2.0, -this.length*(1.5)/2.0, //Bottom Face
             this.breadth*(1.2)/2.0, -(this.height)/2.0, -this.length*(1.5)/2.0,
             this.breadth*(1.2)/2.0, -(this.height)/2.0,  this.length*(1.5)/2.0,
            -this.breadth*(1.2)/2.0, -(this.height)/2.0,  this.length*(1.5)/2.0,
            -this.breadth*(1.2)/2.0, -(this.height)/2.0, -this.length*(1.5)/2.0, //Left Face
            -this.breadth*(1.2)/2.0,  (this.height)/2.0, -this.length*(1.5)/2.0,
            -this.breadth*(1.2)/2.0,  (this.height)/2.0,  this.length*(1.5)/2.0,
            -this.breadth*(1.2)/2.0, -(this.height)/2.0,  this.length*(1.5)/2.0,
             this.breadth*(1.2)/2.0, -(this.height)/2.0, -this.length*(1.5)/2.0, //Right Face
             this.breadth*(1.2)/2.0,  (this.height)/2.0, -this.length*(1.5)/2.0,
             this.breadth*(1.2)/2.0,  (this.height)/2.0,  this.length*(1.5)/2.0,
             this.breadth*(1.2)/2.0, -(this.height)/2.0,  this.length*(1.5)/2.0,
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

        
            this.normalBuffer_LEG = gl.createBuffer();
            gl.bindBuffer(gl.ARRAY_BUFFER, this.normalBuffer_LEG);
            
            this.vertexNormals_LEG = [
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
            
            gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(this.vertexNormals_LEG),
                            gl.STATIC_DRAW);
        this.texture_LEG = loadTexture(gl, './Textures/tyre2.jpg' );
        // var url_LEG = ['./Textures/tyre1.jpg','./Textures/tyre2.jpg'];
        // this.texture_LEG = loadTexture(gl, url_LEG[Math.floor(Math.random()*url_LEG.length)]);


        /*-----------------------------------------------------------------------*/
    
        this.buffers = {
            position_HEAD: this.positionBuffer_HEAD,
            normal_HEAD: this.normalBuffer_HEAD,
            texture_HEAD: this.textureCoordBuffer_HEAD,
            indices_HEAD: indexBuffer_HEAD,

            position_BODY: this.positionBuffer_BODY,
            normal_BODY: this.normalBuffer_BODY,
            texture_BODY: this.textureCoordBuffer_BODY,
            indices_BODY: indexBuffer_BODY,

            position_LEG: this.positionBuffer_LEG,
            normal_LEG: this.normalBuffer_LEG,
            texture_LEG: this.textureCoordBuffer_LEG,
            indices_LEG: indexBuffer_LEG,
        };
        this.height = 2; 
    }

    tick()
    {
        this.Leg_Rotation -= 1.5*GAME_SPEED;
        this.move_jump();
        // this.pos[2] = this.pos[2] + 4*GAME_SPEED;
        // if(this.pos[2]> 1500)
        // {
        //     this.pos[2] = END;
        // }
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
    
    move_jump()
    {
        if(!checkBase() || this.velocityY > 0 )
        // if(this.velocityY != 0)
        {
            this.pos[1] += this.velocityY;
            this.velocityY += this.acclerationY; 
            // console.log(this.pos);
            // console.log(this.velocityY);
            // console.log(this.acclerationY);
        }
        // let base = checkBase();
        else
        {
            this.velocityY = 0;
            // console.log(this.pos);
            // console.log(this.velocityY);
            // this.pos[1] = base * 7;
        }
    }

    draw(gl, projectionMatrix, programInfoTexture, deltaTime) 
    {
        this.draw_HEAD(gl, projectionMatrix, programInfoTexture, deltaTime) ;
        this.draw_BODY(gl, projectionMatrix, programInfoTexture, deltaTime) ;
        this.draw_LEG(gl, projectionMatrix, programInfoTexture, deltaTime ,this.position_LEG_L) ;
        this.draw_LEG(gl, projectionMatrix, programInfoTexture, deltaTime ,this.position_LEG_R) ;
    }


    draw_HEAD(gl, projectionMatrix, programInfoTexture, deltaTime) 
    {
        const modelViewMatrix = mat4.create();
        let final_pos = [0,0,0];
        if(this.dodge)
            final_pos = [this.pos[0], this.pos[1]-1, this.pos[2]];
        else
            final_pos = [this.pos[0]+this.position_HEAD[0], this.pos[1]+this.position_HEAD[1], this.pos[2]+this.position_HEAD[2]];
        mat4.translate(
            modelViewMatrix,
            modelViewMatrix,
            final_pos
        );
        if(this.dodge)
        {
            mat4.rotate(modelViewMatrix,modelViewMatrix,1.4,[1,0,0]);
        
            final_pos = [this.position_HEAD[0], this.position_HEAD[1]+1, this.position_HEAD[2]];
            mat4.translate(
                modelViewMatrix,
                modelViewMatrix,
                final_pos
            );
        }
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
            const vertexCount = 36;
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
        let final_pos = [0,0,0];
        if(this.dodge)
        final_pos = [this.pos[0], this.pos[1]-1, this.pos[2]];
        else
            final_pos = [this.pos[0]+this.position_BODY[0], this.pos[1]+this.position_BODY[1], this.pos[2]+this.position_BODY[2]];
        mat4.translate(
            modelViewMatrix,
            modelViewMatrix,
            final_pos
        );
        if(this.dodge)
        {
            mat4.rotate(modelViewMatrix,modelViewMatrix,1.4,[1,0,0]);
        
            final_pos = [this.position_BODY[0], this.position_BODY[1]+1, this.position_BODY[2]];
            mat4.translate(
                modelViewMatrix,
                modelViewMatrix,
                final_pos
            );
        }
        //Write your code to Rotate the cube here//


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


    drawLight(gl, projectionMatrix, programInfoTexture, deltaTime) 
    {
        this.drawLight_HEAD(gl, projectionMatrix, programInfoTexture, deltaTime) ;
        this.drawLight_BODY(gl, projectionMatrix, programInfoTexture, deltaTime) ;
        this.drawLight_LEG(gl, projectionMatrix, programInfoTexture, deltaTime ,this.position_LEG_L) ;
        this.drawLight_LEG(gl, projectionMatrix, programInfoTexture, deltaTime ,this.position_LEG_R) ;
    }


    drawLight_HEAD(gl, projectionMatrix, programInfoTexture, deltaTime) 
    {
        const modelViewMatrix = mat4.create();
        let final_pos = [0,0,0];
        if(this.dodge)
            final_pos = [this.pos[0], this.pos[1]-1, this.pos[2]];
        else
            final_pos = [this.pos[0]+this.position_HEAD[0], this.pos[1]+this.position_HEAD[1], this.pos[2]+this.position_HEAD[2]];
        mat4.translate(
            modelViewMatrix,
            modelViewMatrix,
            final_pos
        );
        if(this.dodge)
        {
            mat4.rotate(modelViewMatrix,modelViewMatrix,1.4,[1,0,0]);
        
            final_pos = [this.position_HEAD[0], this.position_HEAD[1]+1, this.position_HEAD[2]];
            mat4.translate(
                modelViewMatrix,
                modelViewMatrix,
                final_pos
            );
        }
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

        {
            const numComponents = 3;
            const type = gl.FLOAT;
            const normalize = false;
            const stride = 0;
            const offset = 0;
            gl.bindBuffer(gl.ARRAY_BUFFER, this.buffers.normal_HEAD);
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
        gl.bindTexture(gl.TEXTURE_2D, this.texture_HEAD);
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

    /*--------------------------------------------------------------*/


    drawLight_BODY(gl, projectionMatrix, programInfoTexture, deltaTime) 
    {
        const modelViewMatrix = mat4.create();
        let final_pos = [0,0,0];
        if(this.dodge)
        final_pos = [this.pos[0], this.pos[1]-1, this.pos[2]];
        else
            final_pos = [this.pos[0]+this.position_BODY[0], this.pos[1]+this.position_BODY[1], this.pos[2]+this.position_BODY[2]];
        mat4.translate(
            modelViewMatrix,
            modelViewMatrix,
            final_pos
        );
        if(this.dodge)
        {
            mat4.rotate(modelViewMatrix,modelViewMatrix,1.4,[1,0,0]);
        
            final_pos = [this.position_BODY[0], this.position_BODY[1]+1, this.position_BODY[2]];
            mat4.translate(
                modelViewMatrix,
                modelViewMatrix,
                final_pos
            );
        }
        //Write your code to Rotate the cube here//


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
        {
            const numComponents = 3;
            const type = gl.FLOAT;
            const normalize = false;
            const stride = 0;
            const offset = 0;
            gl.bindBuffer(gl.ARRAY_BUFFER, this.buffers.normal_BODY);
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


    drawLight_LEG(gl, projectionMatrix, programInfoTexture, deltaTime,leg_pos) 
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
        {
            const numComponents = 3;
            const type = gl.FLOAT;
            const normalize = false;
            const stride = 0;
            const offset = 0;
            gl.bindBuffer(gl.ARRAY_BUFFER, this.buffers.normal_LEG);
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
}