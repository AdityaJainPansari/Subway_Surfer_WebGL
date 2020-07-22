// var cubeRotation = 0.0;
// var ground = 0;
// var walls = 0;
GAME_ON = true ;
var gray_scale = false ;
GAME_SPEED = 0.0;
POLICE_SPEED = 0.0;
END = -3700;
jump_power = 0;
power1 = 0;
breaker_flag = 0;
cloud_flag = 0;
power2 = 0;
iterations = 0;
iterationsGS = 0;
var pre_jet_pack = 0.0 ;
var pre_jump_boost = 0.0 ;
var pre_shield = 0.0 ;
var START_TIME = new Date().getTime() / 1000;
var pre_time = new Date().getTime() / 1000;
var pre_time2 = new Date().getTime() / 1000;
var a = [];
var b = [];
var c = [];
var lanes = [ -1.0, 0, 1.0 ];
var trains = [];
var barricades_low = [];
var barricades_high = [];
var barricades_dodge = [];
var speed_breakers = [];
var clouds = [];
var coins = [];
var jet_packs = [];
var jump_boosts = [];
var invincible = [];
var cameraEye = [ 0, 10, 0 ];
var cameraTarget = [ 0, 0, -100 ];
var up = [0, 1, 0];
myMusic = new sound("./Sounds/10788.mp3");

main();

window.setInterval(()=>{myMusic.play();}, 9000);
window.setInterval(updateGame_Speed, 1000);
window.setInterval(updateGameBoard, 100);

//
// Start here
//


function main() {
    myMusic.play();
    const canvas = document.querySelector('#glcanvas');
    const gl = canvas.getContext('webgl') || canvas.getContext('experimental-webgl');

    // If we don't have a GL context, give up now
    temp = [];
    temp.push(0);
    // temp.push(lanes[Math.floor(Math.random()*lanes.length)]*10);
    temp.push(0);
    temp.push(-30);
    player = new player(gl, temp);
    temp3 = [0,18,-75];
    jackpot = new JackPot(gl, temp3, './Textures/jackpot.jpg');
    temp2 = [temp[0]+5,0,-25];
    // temp2[2] = -20;
    dog = new player2(gl,temp2);
    temp2 = [temp[0],0,-20];
    police = new player1(gl,temp2);
    side_lane1 = new side_lane(gl, [ 20.0, 0.0, 0.0]);
    side_lane2 = new side_lane(gl, [-20.0, 0.0, 0.0]);
    ground = new ground(gl, [0.0, 0.0, 0.0]);
    walls = new walls(gl, [0.0, 0.0, 0.0]);
    // jet_packs.push(new PowerUp(gl, [0.0, 0.0, 0.0]));
    // jump_boosts.push(new PowerUp(gl, [0.0, 0.0, 0.0]));
    // invincible.push(new PowerUp(gl, [0.0, 0.0, -70.0], './Textures/shield.jpg' ));
    
    createCoins(gl);
    for (var j=0;j<5;++j) b[j]=[j,[0,0,0],[0,0,0],[0,0,0],[0,0,0],[0,0,0]];
    
    for (let j = 0,i = 0; j< 10 ; j++,i++ )
    {
        last_ind = b[0].length - 1 ;
        if((b[i][last_ind][0]+b[i][last_ind][1]+b[i][last_ind][2]) >= 3)
        continue;
        
        temp = [];
        // var ind = i;
                
        while(1)
        {
            var ind = lanes[Math.floor(Math.random()*lanes.length)];
            if(b[i][last_ind][ind+1] == 1)
            {
                continue;
            }
            else
            {
                temp.push(ind);
                break;
            }
        }
        temp.push(0);

        // var check = b[i];
        // if((b[i][1][0]+b[i][1][1]+b[i][1][2]) >= 1)
        // continue;

        b[i][last_ind][temp[0]+1] = 1;
        b[i][1][temp[0]+1] = 1;
        
        temp[0] = temp[0]*10;
        temp.push(b[i][0]*(-30)-100);
        coins.push(new coin(gl,temp,Math.floor(Math.random()*2)));
        if(i==4)
            i=-1;
        // console.log("BARRICADE", ind);
    }
    createPowerUp(gl,jump_boosts,'./Textures/Jump.jpg');
    // var url_INVINCIBLE = ['./Textures/shield.jpg','./Textures/invisible2.png'];
    createPowerUp(gl,invincible,'./Textures/shield.jpg');
    createPowerUp(gl,jet_packs,'./Textures/JetPack.jpg');
    // createPowerUp(gl,,'./Textures/JetPack.jpg');
    
    // window.setInterval(createCoins, 1000);
    
    for (var j=0;j<10;++j) a[j]=[j,[0,0,0],[0,0,0],[0,0,0],[0,0,0],[0,0,0]];
    // a = shuffle(a);
    for (let i = 0; i<5 ; i++ )
    {
        last_ind = a[0].length - 1 ;
        temp = [];
        temp.push(lanes[Math.floor(Math.random()*lanes.length)]);
        temp.push(0);
        var ind = Math.floor(Math.random()*a.length);
        while(1)
        {
            var ind = Math.floor(Math.random()*a.length);
            // var check = a[ind];
            if(a[ind][last_ind][temp[0]+1] == 1)
                continue;
            if((a[ind][last_ind][0]+a[ind][last_ind][1]+a[ind][last_ind][2]) >= 2)
                continue;
            a[ind][last_ind][temp[0]+1] = 1;
            a[ind][1][temp[0]+1] = 1;
            break;
        }
        temp[0] = temp[0]*10;
        temp.push(a[ind][0]*(-400)-100);
        trains.push(new train(gl,temp));
        // console.log("TRAIN ",ind);
        // if((a[ind][1][0]+a[ind][1][1]+a[ind][1][2]) >= 1)
            // console.log("WRONG  :  ",a);
    }
    // console.log(a);
    for (let i = 0; i< 3 ; i++ )
    {
        last_ind = a[0].length - 1 ;
        temp = [];
        temp.push(lanes[Math.floor(Math.random()*lanes.length)]);
        temp.push(0);
        var ind = Math.floor(Math.random()*a.length);
        while(1)
        {
            var ind = Math.floor(Math.random()*a.length);
            // var check = a[ind];
            // if((a[ind][1][0]+a[ind][1][1]+a[ind][1][2]) >= 1)
            // continue;
            if(a[ind][last_ind][temp[0]+1] == 1)
                continue;
            if((a[ind][last_ind][0]+a[ind][last_ind][1]+a[ind][last_ind][2]) >= 2)
                continue;
            a[ind][last_ind][temp[0]+1] = 1;
            a[ind][2][temp[0]+1] = 1;
            break;
        }
        temp[0] = temp[0]*10;
        temp.push(a[ind][0]*(-400)-100);
        barricades_low.push(new barricade(gl,temp,1));
        // console.log("BARRICADE", ind);
    }
    for (let i = 0; i< 2 ; i++ )
    {
        last_ind = a[0].length - 1 ;
        temp = [];
        temp.push(lanes[Math.floor(Math.random()*lanes.length)]);
        temp.push(0);
        var ind = Math.floor(Math.random()*a.length);
        while(1)
        {
            var ind = Math.floor(Math.random()*a.length);
            // var check = a[ind];
            // if((a[ind][1][0]+a[ind][1][1]+a[ind][1][2]) >= 1)
            // continue;
            if(a[ind][last_ind][temp[0]+1] == 1)
                continue;
            if((a[ind][last_ind][0]+a[ind][last_ind][1]+a[ind][last_ind][2]) >= 2)
                continue;
            a[ind][last_ind][temp[0]+1] = 1;
            a[ind][3][temp[0]+1] = 1;
            break;
        }
        temp[0] = temp[0]*10;
        temp.push(a[ind][0]*(-400)-100);
        barricades_high.push(new barricade(gl,temp,2));
        // console.log("BARRICADE", ind);
    }
    for (let i = 0; i< 2 ; i++ )
    {
        last_ind = a[0].length - 1 ;
        temp = [];
        temp.push(lanes[Math.floor(Math.random()*lanes.length)]);
        temp.push(3);
        var ind = Math.floor(Math.random()*a.length);
        while(1)
        {
            var ind = Math.floor(Math.random()*a.length);
            // var check = a[ind];
            // if((a[ind][1][0]+a[ind][1][1]+a[ind][1][2]) >= 1)
            // continue;
            if(a[ind][last_ind][temp[0]+1] == 1)
                continue;
            if((a[ind][last_ind][0]+a[ind][last_ind][1]+a[ind][last_ind][2]) >= 2)
                continue;
            a[ind][last_ind][temp[0]+1] = 1;
            a[ind][3][temp[0]+1] = 1;
            break;
        }
        temp[0] = temp[0]*10;
        temp.push(a[ind][0]*(-400)-100);
        barricades_dodge.push(new barricade(gl,temp,3));
        // console.log("BARRICADE", ind);
    }
    for (let i = 0; i< 3 ; i++ )
    {
        last_ind = a[0].length - 1 ;
        temp = [];
        temp.push(lanes[Math.floor(Math.random()*lanes.length)]);
        temp.push(0);
        var ind = Math.floor(Math.random()*a.length);
        while(1)
        {
            var ind = Math.floor(Math.random()*a.length);
            // var check = a[ind];
            // if((a[ind][1][0]+a[ind][1][1]+a[ind][1][2]) >= 1)
            // continue;
            if(a[ind][last_ind][temp[0]+1] == 1)
                continue;
            if((a[ind][last_ind][0]+a[ind][last_ind][1]+a[ind][last_ind][2]) >= 2)
                continue;
            a[ind][last_ind][temp[0]+1] = 1;
            a[ind][4][temp[0]+1] = 1;
            break;
        }
        temp[0] = temp[0]*10;
        temp.push(a[ind][0]*(-400)-100);
        speed_breakers.push(new speed_breaker(gl,temp,0));
        // console.log("BARRICADE", ind);
    }

    for (var j=0;j<5;++j) c[j]=[j,[0,0,0],[0,0,0]];

    for (let i = 0; i< 7 ; i++ )
    {
        last_ind = c[0].length - 1 ;
        temp = [];
        temp.push(lanes[Math.floor(Math.random()*lanes.length)]);
        temp.push(0);
        var ind = Math.floor(Math.random()*c.length);
        while(1)
        {
            var ind = Math.floor(Math.random()*c.length);
            // var check = c[ind];
            // if((c[ind][1][0]+c[ind][1][1]+c[ind][1][2]) >= 1)
            // continue;
            if(c[ind][last_ind][temp[0]+1] == 1)
                continue;
            if((c[ind][last_ind][0]+c[ind][last_ind][1]+c[ind][last_ind][2]) >= 2)
                continue;
            c[ind][last_ind][temp[0]+1] = 1;
            c[ind][1][temp[0]+1] = 1;
            break;
        }
        temp[0] = temp[0]*10;
        temp.push(c[ind][0]*(-200)-100);
        clouds.push(new speed_breaker(gl,temp,1));
        // console.log("BARRICADE", ind);
    }
    // console.log(a);
    // a = shuffle(a);


    if (!gl) {
    alert('Unable to initialize WebGL. Your browser or machine may not support it.');
    return;
    }

    // Vertex shader program

    const vsSource = `
        attribute vec4 aVertexPosition;
        attribute vec4 aVertexColor;
        
        uniform mat4 uModelViewMatrix;
        uniform mat4 uProjectionMatrix;
        
        varying lowp vec4 vColor;
        
        void main(void) {
            gl_Position = uProjectionMatrix * uModelViewMatrix * aVertexPosition;
            vColor = aVertexColor;
        }
    `;
    
    const fsSource = `
    varying lowp vec4 vColor;
    
    void main(void) {
        gl_FragColor = vColor;
    }
    `;
    
    const shaderProgram = initShaderProgram(gl, vsSource, fsSource);
    const programInfoColor = {
        program: shaderProgram,
        attribLocations: {
            vertexPosition: gl.getAttribLocation(shaderProgram, 'aVertexPosition'),
            vertexColor: gl.getAttribLocation(shaderProgram, 'aVertexColor'),
        },
        uniformLocations: {
            projectionMatrix: gl.getUniformLocation(shaderProgram, 'uProjectionMatrix'),
            modelViewMatrix: gl.getUniformLocation(shaderProgram, 'uModelViewMatrix'),
        },
    };

    const fsSourcebw = `
    #ifdef GL_ES
    precision mediump float;
    #endif
    varying lowp vec4 vColor;

    void main(void) {
        float gray = (vColor.r + vColor.g + vColor.b) / 3.0;
        vec3 grayscale = vec3(gray);
        
        gl_FragColor = vec4(grayscale, vColor.a);
    }
    `;
    
    const shaderProgrambw = initShaderProgram(gl, vsSource, fsSourcebw);
    
    const programInfobw = {
        program: shaderProgrambw,
        attribLocations: {
            vertexPosition: gl.getAttribLocation(shaderProgrambw, 'aVertexPosition'),
            vertexColor: gl.getAttribLocation(shaderProgrambw, 'aVertexColor'),
        },
        uniformLocations: {
            projectionMatrix: gl.getUniformLocation(shaderProgrambw, 'uProjectionMatrix'),
            modelViewMatrix: gl.getUniformLocation(shaderProgrambw, 'uModelViewMatrix'),
        },
    };

    const fsSourceBlink = `
    varying lowp vec4 vColor;

    void main(void) {
      gl_FragColor = vColor;
    }
  `;
  
  const shaderProgramBlink = initShaderProgram(gl, vsSource, fsSourceBlink);
    
  const programInfoBlink = {
    program: shaderProgramBlink,
    attribLocations: {
        vertexPosition: gl.getAttribLocation(shaderProgramBlink, 'aVertexPosition'),
        vertexColor: gl.getAttribLocation(shaderProgramBlink, 'aVertexColor'),
    },
    uniformLocations: {
        projectionMatrix: gl.getUniformLocation(shaderProgramBlink, 'uProjectionMatrix'),
        modelViewMatrix: gl.getUniformLocation(shaderProgramBlink, 'uModelViewMatrix'),
    },
};
  
  const fsSourceBlinkbw = `
    #ifdef GL_ES
    precision mediump float;
    #endif
    varying lowp vec4 vColor;

    void main(void) {
        float gray = (vColor.r + vColor.g + vColor.b) / 3.0;
        vec3 grayscale = vec3(gray);
        gl_FragColor = vec4(grayscale, vColor.a);
        gl_FragColor.r+=0.4;
      gl_FragColor.g+=0.4;
      gl_FragColor.b+=0.4;
    }
  `;

  const shaderProgramBlinkbw = initShaderProgram(gl, vsSource, fsSourceBlinkbw);

    
  const programInfoBlinkbw = {
    program: shaderProgramBlinkbw,
    attribLocations: {
        vertexPosition: gl.getAttribLocation(shaderProgramBlinkbw, 'aVertexPosition'),
        vertexColor: gl.getAttribLocation(shaderProgramBlinkbw, 'aVertexColor'),
    },
    uniformLocations: {
        projectionMatrix: gl.getUniformLocation(shaderProgramBlinkbw, 'uProjectionMatrix'),
        modelViewMatrix: gl.getUniformLocation(shaderProgramBlinkbw, 'uModelViewMatrix'),
    },
};

    /*------------------------------------------*/

    const vsSourceTex = `
    attribute vec4 aVertexPosition;
    attribute vec3 aVertexNormal;
    attribute vec2 aTextureCoord;

    uniform mat4 uNormalMatrix;
    uniform mat4 uModelViewMatrix;
    uniform mat4 uProjectionMatrix;

    varying highp vec2 vTextureCoord;
    varying highp vec3 vLighting;

    void main(void) {
      gl_Position = uProjectionMatrix * uModelViewMatrix * aVertexPosition;
      vTextureCoord = aTextureCoord;

      // Apply lighting effect

      highp vec3 ambientLight = vec3(0.3, 0.3, 0.3);
      highp vec3 directionalLightColor = vec3(1, 1, 1);
      highp vec3 directionalVector = normalize(vec3(0.85, 0.8, 0.75));

      highp vec4 transformedNormal = uNormalMatrix * vec4(aVertexNormal, 1.0);

      highp float directional = max(dot(transformedNormal.xyz, directionalVector), 0.0);
      vLighting = ambientLight + (directionalLightColor * directional);
    }
  `;
  
  const fsSourceTex = `
    varying highp vec2 vTextureCoord;
    uniform sampler2D uSampler;
    void main(void) {
      gl_FragColor = texture2D(uSampler, vTextureCoord);
    }
  `;

const shaderProgramTex = initShaderProgram(gl, vsSourceTex, fsSourceTex);

const programInfoTexture = {
    program: shaderProgramTex,
    attribLocations: {
      vertexPosition: gl.getAttribLocation(shaderProgramTex, 'aVertexPosition'),
      textureCoord: gl.getAttribLocation(shaderProgramTex, 'aTextureCoord'),
    },
    uniformLocations: {
      projectionMatrix: gl.getUniformLocation(shaderProgramTex, 'uProjectionMatrix'),
      modelViewMatrix: gl.getUniformLocation(shaderProgramTex, 'uModelViewMatrix'),
      uSampler: gl.getUniformLocation(shaderProgramTex, 'uSampler'),
    },
};

  const fsSourceTexbw = `
  #ifdef GL_ES
  precision mediump float;
  #endif
  
  varying highp vec2 vTextureCoord;
  varying highp vec3 vLighting;

  uniform sampler2D uSampler;

  void main(void) {
    highp vec4 texelColor = texture2D(uSampler, vTextureCoord);
    
    vec3 color = texelColor.rgb;
      float gray = (color.r + color.g + color.b) / 3.0;
      vec3 grayscale = vec3(gray);

    gl_FragColor = vec4(grayscale * vLighting, texelColor.a);
  }
`;

const shaderProgramTexbw = initShaderProgram(gl, vsSourceTex, fsSourceTexbw);

const programInfoTexbw = {
    program: shaderProgramTexbw,
    attribLocations: {
        vertexPosition: gl.getAttribLocation(shaderProgramTexbw, 'aVertexPosition'),
        textureCoord: gl.getAttribLocation(shaderProgramTexbw, 'aTextureCoord'),
        vertexNormal: gl.getAttribLocation(shaderProgramTexbw, 'aVertexNormal'),
    },
    uniformLocations: {
        projectionMatrix: gl.getUniformLocation(shaderProgramTexbw, 'uProjectionMatrix'),
        modelViewMatrix: gl.getUniformLocation(shaderProgramTexbw, 'uModelViewMatrix'),
        uSampler: gl.getUniformLocation(shaderProgramTexbw, 'uSampler'),
        normalMatrix: gl.getUniformLocation(shaderProgramTexbw, 'uNormalMatrix'),
    },
};


  const fsSourceTexBlink = `
  #ifdef GL_ES
  precision mediump float;
  #endif
  
  varying highp vec2 vTextureCoord;
  varying highp vec3 vLighting;

  uniform sampler2D uSampler;

  void main(void) {
    highp vec4 texelColor = texture2D(uSampler, vTextureCoord);
     gl_FragColor = vec4(texelColor.rgb * vLighting, texelColor.a);
    
    // vec3 color = texelColor.rgb;
    //   float gray = (color.r + color.g + color.b) / 3.0;
    //   vec3 grayscale = vec3(gray);

    // gl_FragColor = vec4(grayscale * vLighting, texelColor.a);
    gl_FragColor.r+=0.4;
    gl_FragColor.g+=0.4;
    gl_FragColor.b+=0.4;
  }
`;

const shaderProgramTexBlink = initShaderProgram(gl, vsSourceTex, fsSourceTexBlink);

const programInfoTexBlink = {
    program: shaderProgramTexBlink,
    attribLocations: {
        vertexPosition: gl.getAttribLocation(shaderProgramTexBlink, 'aVertexPosition'),
        textureCoord: gl.getAttribLocation(shaderProgramTexBlink, 'aTextureCoord'),
        vertexNormal: gl.getAttribLocation(shaderProgramTexBlink, 'aVertexNormal'),
    },
    uniformLocations: {
        projectionMatrix: gl.getUniformLocation(shaderProgramTexBlink, 'uProjectionMatrix'),
        modelViewMatrix: gl.getUniformLocation(shaderProgramTexBlink, 'uModelViewMatrix'),
        uSampler: gl.getUniformLocation(shaderProgramTexBlink, 'uSampler'),
        normalMatrix: gl.getUniformLocation(shaderProgramTexBlink, 'uNormalMatrix'),
    },
};


  const fsSourceTexBlinkbw = `
  #ifdef GL_ES
  precision mediump float;
  #endif
  
  varying highp vec2 vTextureCoord;
  varying highp vec3 vLighting;

  uniform sampler2D uSampler;

  void main(void) {
    highp vec4 texelColor = texture2D(uSampler, vTextureCoord);
     // gl_FragColor = vec4(texelColor.rgb * vLighting, texelColor.a);
    
    vec3 color = texelColor.rgb;
      float gray = (color.r + color.g + color.b) / 3.0;
      vec3 grayscale = vec3(gray);

    gl_FragColor = vec4(grayscale * vLighting, texelColor.a);
    gl_FragColor.r+=0.4;
    gl_FragColor.g+=0.4;
    gl_FragColor.b+=0.4;
    
  }
`;

  const shaderProgramTexBlinkbw = initShaderProgram(gl, vsSourceTex, fsSourceTexBlinkbw);

  const programInfoTexBlinkbw = {
      program: shaderProgramTexBlinkbw,
      attribLocations: {
          vertexPosition: gl.getAttribLocation(shaderProgramTexBlinkbw, 'aVertexPosition'),
          textureCoord: gl.getAttribLocation(shaderProgramTexBlinkbw, 'aTextureCoord'),
          vertexNormal: gl.getAttribLocation(shaderProgramTexBlinkbw, 'aVertexNormal'),
      },
      uniformLocations: {
          projectionMatrix: gl.getUniformLocation(shaderProgramTexBlinkbw, 'uProjectionMatrix'),
          modelViewMatrix: gl.getUniformLocation(shaderProgramTexBlinkbw, 'uModelViewMatrix'),
          uSampler: gl.getUniformLocation(shaderProgramTexBlinkbw, 'uSampler'),
          normalMatrix: gl.getUniformLocation(shaderProgramTexBlinkbw, 'uNormalMatrix'),
      },
  };

  /*------------------------------------------*/


    // console.log(programInfoTexture.attribLocations.textureCoord);
    // console.log(gl.getAttribLocation(shaderProgram, 'aTextureCoord'));

    // Here's where we call the routine that builds all the
    // objects we'll be drawing.

    var then = 0;

    // Draw the scene repeatedly
    function render(now) 
    {
        // if(!GAME_ON)
        // {
        //     GAME_SPEED = 0 ;
        //     return;
        // }
        now *= 0.001;  // convert to seconds
        const deltaTime = now - then;
        then = now;

        new_time = new Date().getTime() / 1000;

        if(new_time-pre_time >= 6)
        {
            createCoins(gl);
            pre_time = new_time ;
        }
        // if(new_time-pre_time2 >= 12)
        // {
        //     pre_time2 = new_time ;
        // }

        if(GAME_ON)
            tickObjects(gl);
        drawScene(gl, programInfoColor, programInfoTexture, programInfoBlink, programInfoBlinkbw, programInfoTexBlink, programInfoTexBlinkbw, programInfoTexbw, programInfobw, deltaTime);

        requestAnimationFrame(render);
        // if(!GAME_ON)
        // {
        //     console.log("_____________END__________")
        //     GAME_SPEED = 0 ;
        //     return;
        // }
    }
    requestAnimationFrame(render);
    // if(!GAME_ON)
    // {
    //     document.getElementById("result").style = "visibility:visible" ;
    //     updateGameBoard();
    // }
        // return;
}


function tickObjects(gl)
{
    if(!player.shield)
    {
        for (var i=0;i<trains.length;i++)
        {
            if(detect_collision(trains[i],player))
            {
                console.log("TRAIN COLLIDED");
                console.log(trains[i].pos,trains[i].breadth,trains[i].height,trains[i].length,player.pos,player.breadth,player.height,player.length);
                GAME_ON = false ;
                alert("You have lost ! Your score is "+player.score+" .");
                window.setTimeout(()=>{window.location.reload();},10000);
                // sleep(100000);
                break;
            }
        }
        for (var i=0;i<barricades_low.length;i++)
        {
            if(detect_collision(barricades_low[i],player))
            {
                console.log("barricade_low COLLIDED");
                GAME_ON = false ;
                alert("You have lost ! Your score is "+player.score+" .");
                window.setTimeout(()=>{window.location.reload();},10000);
                // sleep(100000);
                break;
            }
        }
        for (var i=0;i<barricades_high.length;i++)
        {
            if(detect_collision(barricades_high[i],player))
            {
                console.log("barricade_high COLLIDED");
                GAME_ON = false ;
                alert("You have lost ! Your score is "+player.score+" .");
                window.setTimeout(()=>{window.location.reload();},10000);
                // sleep(100000);
                break;
            }
        }
        for (var i=0;i<barricades_dodge.length;i++)
        {
            if(detect_collision(barricades_dodge[i],player))
            {
                console.log("barricade_dodge COLLIDED");
                GAME_ON = false ;
                alert("You have lost ! Your score is "+player.score+" .");
                window.setTimeout(()=>{window.location.reload();},10000);
                // sleep(100000);
                break;
            }
        }
        if(!breaker_flag)
        {
            for (var i=0;i<speed_breakers.length ;i++)
            {
                if(detect_collision(speed_breakers[i],player))
                {
                    // GAME_SPEED = 0.0;
                    // console.log(iterationsGS);
                    iterationsGS /= 5.0 ;
                    breaker_flag = 1;
                    player.pos[1] += 0.1;
                    window.setTimeout(()=>{breaker_flag = 0;},2000);
                    // console.log(iterationsGS);
                    // iterationsGS = 0.0 ;
                    updateGame_Speed();
                    // console.log("speed_breaker COLLIDED");
                    // sleep(100000);
                    break;
                }
            }
        }
        if(!cloud_flag)
        {
            for (var i=0;i<clouds.length ;i++)
            {
                if(detect_collision(clouds[i],player))
                {
                    // GAME_SPEED = 0.0;
                    // console.log(iterationsGS);
                    iterationsGS /= 5.0 ;
                    cloud_flag = 1;
                    player.pos[1] += 0.1;
                    window.setTimeout(()=>{cloud_flag = 0;},2000);
                    // console.log(iterationsGS);
                    // iterationsGS = 0.0 ;
                    updateGame_Speed();
                    // console.log("speed_breaker COLLIDED");
                    // sleep(100000);
                    break;
                }
            }
        }
        // console.log("_____________");
    }
    player.tick();
    // dog.pos[2] = -30 + 5 + 10*GAME_SPEED;
    dog.pos[0] = player.pos[0]+5;
    dog.tick();
    police.pos[0] = player.pos[0];
    police.tick();
    side_lane1.tick();
    side_lane2.tick();
    ground.tick();
    walls.tick();
    for (var i=0;i<trains.length;i++)
    {
        trains[i].tick();
    }
    for (var i=0;i<barricades_low.length;i++)
    {
        barricades_low[i].tick();
    }
    for (var i=0;i<barricades_high.length;i++)
    {
        barricades_high[i].tick();
    }
    for (var i=0;i<barricades_dodge.length;i++)
    {
        barricades_dodge[i].tick();
    }
    for (var i=0;i<speed_breakers.length;i++)
    {
        speed_breakers[i].tick();
    }
    for (var i=0;i<clouds.length;i++)
    {
        clouds[i].tick();
    }
    for (var i=0;i<coins.length;i++)
    {
        coins[i].tick();
        if(coins[i].pos[2]>0)
            coins.splice(i,1);
    }
    for (var i=0;i<coins.length;i++)
    {
        if(detect_collision(coins[i],player))
        {
            player.score += 10 ;
            // console.log("COIN COLLIDED");
            coins.splice(i,1);
            // sleep(100000);
            break;
        }
    }
    for (var i=0;i<jet_packs.length;i++)
    {
        jet_packs[i].tick();
        if(jet_packs[i].pos[2]>0)
        {
            jet_packs.splice(i,1);
            createPowerUp(gl,jet_packs,'./Textures/JetPack.jpg');
        }
    }
    for (var i=0;i<jet_packs.length;i++)
    {
        if(detect_collision(jet_packs[i],player))
        {
            // console.log("JET PACK COLLIDED");
            player.pos[1] += 10.0;
            player.acclerationY = 0.0;
            player.velocityY = 0.0;
            cameraEye[1] += 5.0 ; 
            window.setTimeout(()=>{player.acclerationY = -0.09; cameraEye[1] -= 5.0;},10000);
            pre_jet_pack = new Date().getTime() / 1000;
            jet_packs.splice(i,1);
            createPowerUp(gl,jet_packs,'./Textures/JetPack.jpg');
            // sleep(100000);
            break;
        }
    }
    for (var i=0;i<jump_boosts.length;i++)
    {
        jump_boosts[i].tick();
        if(jump_boosts[i].pos[2]>0)
        {
            jump_boosts.splice(i,1);
            createPowerUp(gl,jump_boosts,'./Textures/Jump.jpg');
        }
    }
    for (var i=0;i<jump_boosts.length;i++)
    {
        if(detect_collision(jump_boosts[i],player))
        {
            // console.log("JUMP BOOST COLLIDED");
            jump_power = 1;
            window.setTimeout(()=>{jump_power = 0;},10000);
            pre_jump_boost = new Date().getTime() / 1000;
            jump_boosts.splice(i,1);
            createPowerUp(gl,jump_boosts,'./Textures/Jump.jpg');
            // sleep(100000);
            break;
        }
    }
    for (var i=0;i<invincible.length;i++)
    {
        invincible[i].tick();
        if(invincible[i].pos[2]>0)
        {
            invincible.splice(i,1);
            // var url_INVINCIBLE = ['./Textures/shield.jpg','./Textures/invisible2.png'];
            createPowerUp(gl,invincible,'./Textures/shield.jpg');
        }
    }
    for (var i=0;i<invincible.length;i++)
    {
        if(detect_collision(invincible[i],player))
        {
            // console.log("JUMP BOOST COLLIDED");
            player.shield = true;
            window.setTimeout(()=>{player.shield = false;},10000);
            pre_shield = new Date().getTime() / 1000;
            invincible.splice(i,1);
            // var url_INVINCIBLE = ['./Textures/shield.jpg','./Textures/invisible2.png'];
            createPowerUp(gl,invincible,'./Textures/shield.jpg');
            // sleep(100000);
            break;
        }
    }
    if(detect_collision(player,police))
    {
        GAME_ON = false ;
        // console.log(police.pos,police.breadth,police.height,police.length,player.pos,player.breadth,player.height,player.length);
        // console.log(police.pos[0] == player.pos[0]);
        // console.log(Math.abs(police.pos[1] - player.pos[1]) < (police.height + player.height));
        // console.log(Math.abs(police.pos[2] - player.pos[2]) < (police.length + player.length));
        alert("You have lost ! Your score is "+player.score+" .");
        window.setTimeout(()=>{window.location.reload();},10000);
    }
    jackpot.tick();
    if(detect_collision(jackpot,player))
    {
        GAME_ON = false;
        // console.log("JUMP BOOST COLLIDED");
        alert("Congratulations ! \n You have won ! Your score is "+player.score+" .");
        window.setTimeout(()=>{window.location.reload();},10000);
    }
    // track.tick();
}
//
// Draw the scene.
//
function drawScene(gl, programInfoColor, programInfoTexture, programInfoBlink, programInfoBlinkbw, programInfoTexBlink, programInfoTexBlinkbw, programInfoTexbw, programInfobw, deltaTime)
{
    gl.clearColor(135.0/255.0, 206.0/255.0, 235.0/255.0, 1.0);  // Clear to black, fully opaque
    gl.clearDepth(1.0);                 // Clear everything
    gl.enable(gl.DEPTH_TEST);           // Enable depth testing
    gl.depthFunc(gl.LEQUAL);            // Near things obscure far things

    // Clear the canvas before we start drawing on it.

    gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);

    // Create a perspective matrix, a special matrix that is
    // used to simulate the distortion of perspective in a camera.
    // Our field of view is 45 degrees, with a width/height
    // ratio that matches the display size of the canvas
    // and we only want to see objects between 0.1 units
    // and 100 units away from the camera.

    const fieldOfView = 45 * Math.PI / 180;   // in radians
    // webglUtils.resizeCanvasToDisplaySize(gl.canvas);
    const aspect = gl.canvas.clientWidth / gl.canvas.clientHeight;
    const zNear = 0.1;
    const zFar = 1000.0;
    const projectionMatrix = mat4.create();

    // note: glmatrix.js always has the first argument
    // as the destination to receive the result.
    mat4.perspective(projectionMatrix,
                    fieldOfView,
                    aspect,
                    zNear,
                    zFar);

    // Set the drawing position to the "identity" point, which is
    // the center of the scene.
    const modelViewMatrix = mat4.create();

    // Now move the drawing position a bit to where we want to
    // start drawing the square.

    // mat4.translate(modelViewMatrix,     // destination matrix
    //                 modelViewMatrix,     // matrix to translate
    //                 [0.0, 0.0, 6.0]);  // amount to translate
                    

    // cameraEye[0] = player.pos[0];
    mat4.lookAt(modelViewMatrix, cameraEye, cameraTarget, up);
    mat4.multiply(projectionMatrix, projectionMatrix, modelViewMatrix);

    if(iterations%10 == 0)
    {
        // jackpot.draw(gl, projectionMatrix, programInfoTexBlink, deltaTime);
        if(gray_scale)
        walls.drawLight(gl, projectionMatrix, programInfoTexBlinkbw, deltaTime);
        else
        walls.drawLight(gl, projectionMatrix, programInfoTexBlink, deltaTime);
    }
    else
    {
        if(gray_scale)
        walls.draw(gl, projectionMatrix, programInfoTexbw, deltaTime);
        else
        walls.draw(gl, projectionMatrix, programInfoTexture, deltaTime);
    }

    jackpot.draw(gl, projectionMatrix, programInfoTexture, deltaTime);
    
    if(gray_scale)
    {
        player.drawLight(gl, projectionMatrix, programInfoTexbw, deltaTime);
        police.drawLight(gl, projectionMatrix, programInfoTexbw, deltaTime);
        dog.draw(gl, projectionMatrix, programInfoTexture, deltaTime);
        side_lane1.drawLight(gl, projectionMatrix, programInfoTexbw, deltaTime);
        side_lane2.drawLight(gl, projectionMatrix, programInfoTexbw, deltaTime);
        ground.drawLight(gl, projectionMatrix, programInfoTexbw, deltaTime);

        for(var i=0;i<trains.length;i++)
        {
            trains[i].drawLight(gl, projectionMatrix, programInfoTexbw, deltaTime);
        }
        for(var i=0;i<barricades_low.length;i++)
        {
            barricades_low[i].drawLight(gl, projectionMatrix, programInfoTexbw, deltaTime);
        }
        for(var i=0;i<barricades_high.length;i++)
        {
            barricades_high[i].drawLight(gl, projectionMatrix, programInfoTexbw, deltaTime);
        }
        for(var i=0;i<barricades_dodge.length;i++)
        {
            barricades_dodge[i].drawLight(gl, projectionMatrix, programInfoTexbw, deltaTime);
        }
        for(var i=0;i<speed_breakers.length;i++)
        {
            speed_breakers[i].drawLight(gl, projectionMatrix, programInfoTexbw, deltaTime);
        }
        for(var i=0;i<clouds.length;i++)
        {
            clouds[i].drawLight(gl, projectionMatrix, programInfoTexbw, deltaTime);
        }
        for(var i=0;i<jet_packs.length;i++)
        {
            jet_packs[i].drawLight(gl, projectionMatrix, programInfoTexbw, deltaTime);
        }
        for(var i=0;i<jump_boosts.length;i++)
        {
            jump_boosts[i].drawLight(gl, projectionMatrix, programInfoTexbw, deltaTime);
        }
        for(var i=0;i<invincible.length;i++)
        {
            invincible[i].drawLight(gl, projectionMatrix, programInfoTexbw, deltaTime);
        }
        for(var i=0;i<coins.length;i++)
        {
            coins[i].draw(gl, projectionMatrix, programInfobw, deltaTime);
        }
    }
    else
    {
        player.draw(gl, projectionMatrix, programInfoTexture, deltaTime);
        police.draw(gl, projectionMatrix, programInfoTexture, deltaTime);
        dog.draw(gl, projectionMatrix, programInfoTexture, deltaTime);
        side_lane1.draw(gl, projectionMatrix, programInfoTexture, deltaTime);
        side_lane2.draw(gl, projectionMatrix, programInfoTexture, deltaTime);
        ground.draw(gl, projectionMatrix, programInfoTexture, deltaTime);
        // walls.draw(gl, projectionMatrix, programInfoTexture, deltaTime);

        for(var i=0;i<trains.length;i++)
        {
            trains[i].draw(gl, projectionMatrix, programInfoTexture, deltaTime);
        }
        for(var i=0;i<barricades_low.length;i++)
        {
            barricades_low[i].draw(gl, projectionMatrix, programInfoTexture, deltaTime);
        }
        for(var i=0;i<barricades_high.length;i++)
        {
            barricades_high[i].draw(gl, projectionMatrix, programInfoTexture, deltaTime);
        }
        for(var i=0;i<barricades_dodge.length;i++)
        {
            barricades_dodge[i].draw(gl, projectionMatrix, programInfoTexture, deltaTime);
        }
        for(var i=0;i<speed_breakers.length;i++)
        {
            speed_breakers[i].draw(gl, projectionMatrix, programInfoTexture, deltaTime);
        }
        for(var i=0;i<clouds.length;i++)
        {
            clouds[i].draw(gl, projectionMatrix, programInfoTexture, deltaTime);
        }
        for(var i=0;i<jet_packs.length;i++)
        {
            jet_packs[i].draw(gl, projectionMatrix, programInfoTexture, deltaTime);
        }
        for(var i=0;i<jump_boosts.length;i++)
        {
            jump_boosts[i].draw(gl, projectionMatrix, programInfoTexture, deltaTime);
        }
        for(var i=0;i<invincible.length;i++)
        {
            invincible[i].draw(gl, projectionMatrix, programInfoTexture, deltaTime);
        }
        for(var i=0;i<coins.length;i++)
        {
            coins[i].draw(gl, projectionMatrix, programInfoColor, deltaTime);
        }
    }
}

//
// Initialize a shader program, so WebGL knows how to draw our data
//
function initShaderProgram(gl, vsSource, fsSource) {
    const vertexShader = loadShader(gl, gl.VERTEX_SHADER, vsSource);
    const fragmentShader = loadShader(gl, gl.FRAGMENT_SHADER, fsSource);

    // Create the shader program

    const shaderProgram = gl.createProgram();
    gl.attachShader(shaderProgram, vertexShader);
    gl.attachShader(shaderProgram, fragmentShader);
    gl.linkProgram(shaderProgram);

    // If creating the shader program failed, alert

    if (!gl.getProgramParameter(shaderProgram, gl.LINK_STATUS)) {
    alert('Unable to initialize the shader program: ' + gl.getProgramInfoLog(shaderProgram));
    return null;
    }

    return shaderProgram;
}

//
// creates a shader of the given type, uploads the source and
// compiles it.
//
function loadShader(gl, type, source) {
    const shader = gl.createShader(type);

    // Send the source to the shader object

    gl.shaderSource(shader, source);

    // Compile the shader program

    gl.compileShader(shader);

    // See if it compiled successfully

    if (!gl.getShaderParameter(shader, gl.COMPILE_STATUS)) {
    alert('An error occurred compiling the shaders: ' + gl.getShaderInfoLog(shader));
    gl.deleteShader(shader);
    return null;
    }

    return shader;
}

function loadTexture(gl, url) 
{
    const texture = gl.createTexture();
    gl.bindTexture(gl.TEXTURE_2D, texture);
    
    // Because images have to be download over the internet
    // they might take a moment until they are ready.
    // Until then put a single pixel in the texture so we can
    // use it immediately. When the image has finished downloading
    // we'll update the texture with the contents of the image.
    const level = 0;
    const internalFormat = gl.RGBA;
    const width = 1;
    const height = 1;
    const border = 0;
    const srcFormat = gl.RGBA;
    const srcType = gl.UNSIGNED_BYTE;
    const pixel = new Uint8Array([0, 0, 255, 255]);  // opaque blue
    gl.texImage2D(gl.TEXTURE_2D, level, internalFormat,
                    width, height, border, srcFormat, srcType,
                    pixel);
    
    const image = new Image();
    image.onload = function() {
        gl.bindTexture(gl.TEXTURE_2D, texture);
        gl.texImage2D(gl.TEXTURE_2D, level, internalFormat,
                    srcFormat, srcType, image);
    
        // WebGL1 has different requirements for power of 2 images
        // vs non power of 2 images so check if the image is a
        // power of 2 in both dimensions.
        if (isPowerOf2(image.width) && isPowerOf2(image.height)) {
        // Yes, it's a power of 2. Generate mips.

        // gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.REPEAT);
        // gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.CLAMP_TO_EDGE);
        // gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.CLAMP_TO_EDGE);
        // gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.REPEAT);
        // gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.LINEAR);
        gl.generateMipmap(gl.TEXTURE_2D);
        } else {
        // No, it's not a power of 2. Turn of mips and set
        // wrapping to clamp to edge
        gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.CLAMP_TO_EDGE);
        gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.CLAMP_TO_EDGE);
        gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.LINEAR);
        }
    };
    image.src = url;
    
    return texture;
}

function isPowerOf2(value) {
    return (value & (value - 1)) == 0;
}

function shuffle(array) {
    var tmp, current, top = array.length;
    if(top) while(--top) {
      current = Math.floor(Math.random() * (top + 1));
      tmp = array[current];
      array[current] = array[top];
      array[top] = tmp;
    }
    return array;
}

function updateGame_Speed()
{
    iterations += 1;
    if(iterationsGS < 50 )
    {
        iterationsGS += 1;
    }
    // else
        // console.log("iterationsGS = 50");
    power1 = (1-Math.pow((2.71),(-1*(iterationsGS)/10.0)));
    power2 = (1-Math.pow((2.71),(-1*(iterationsGS)/1000.0)));
    GAME_SPEED = 0.5 * power1 + 1*power2;
    let pow1 = (1-Math.pow((2.71),(-1*(iterations)/10.0)));
    POLICE_SPEED = 0.45 * pow1;
    // console.log(GAME_SPEED);

}

function detect_collision(a, b) {
    return (a.pos[0] == b.pos[0]) &&
           (Math.abs(a.pos[1] - b.pos[1]) < (a.height + b.height)) &&
           (Math.abs(a.pos[2] - b.pos[2]) < (a.length + b.length));
}

function detectTrainBase(a, b) {
    return (a.pos[0] == b.pos[0]) &&
        //    (Math.abs(a.pos[1] - b.pos[1]) < (a.height + b.height)) &&
           (Math.abs(a.pos[2] - b.pos[2]) < (a.length + b.length));
}

function checkBase()
{
    if(player.pos[1]<=2)
    {
        player.pos[1]=2;
        return 1;
    }
    if(player.velocityY < 0)
    {   
        for(var i = 0; i<trains.length ;i++)
        {
            if(detectTrainBase(trains[i],player))
            {
                player.pos[1]=9;
                return 1;
            }
        }
    }
    return 0;
}

function sleep(milliseconds) 
{
    var start = new Date().getTime();
    while(1)
    {
      if ((new Date().getTime() - start) > milliseconds){
        break;
      }
    }
}

function createCoins(gl)
{
    for (var j=0;j<5;++j) b[j]=[j,[0,0,0],[0,0,0],[0,0,0],[0,0,0],[0,0,0]];
    
    for (let j = 0,i = 0; j< 10 ; j++,i++ )
    {
        last_ind = b[0].length - 1 ;
        if((b[i][last_ind][0]+b[i][last_ind][1]+b[i][last_ind][2]) >= 3)
        continue;
        
        temp = [];
        // var ind = i;
                
        while(1)
        {
            var ind = lanes[Math.floor(Math.random()*lanes.length)];
            if(b[i][last_ind][ind+1] == 1)
            {
                continue;
            }
            else
            {
                temp.push(ind);
                break;
            }
        }
        temp.push(0);

        // var check = b[i];
        // if((b[i][1][0]+b[i][1][1]+b[i][1][2]) >= 1)
        // continue;

        b[i][last_ind][temp[0]+1] = 1;
        b[i][1][temp[0]+1] = 1;
        
        temp[0] = temp[0]*10;
        temp.push(b[i][0]*(-30)-400);
        coins.push(new coin(gl,temp,Math.floor(Math.random()*2)));
        if(i==4)
            i=-1;
        // console.log("COINS CREATED");
    }
}

function createPowerUp(gl,a,url)
{
    var i = -1;
    while(1)  
    {
        i++;
        if(i==5)
            break;
        last_ind = b[0].length - 1 ;
        if((b[i][last_ind][0]+b[i][last_ind][1]+b[i][last_ind][2]) >= 3)
        continue;
        
        temp = [];
        // var ind = i;
                
        while(1)
        {
            var ind = lanes[Math.floor(Math.random()*lanes.length)];
            if(b[i][last_ind][ind+1] == 1)
            {
                continue;
            }
            else
            {
                temp.push(ind);
                break;
            }
        }
        temp.push(0);

        // var check = b[i];
        // if((b[i][1][0]+b[i][1][1]+b[i][1][2]) >= 1)
        // continue;

        b[i][last_ind][temp[0]+1] = 1;
        b[i][1][temp[0]+1] = 1;
        
        temp[0] = temp[0]*10;
        temp.push(b[i][0]*(-30)-400);
        a.push(new PowerUp(gl,temp,url));
        // console.log(url , "CREATED");
        break;
    }
}

function updateGameBoard()
{
    document.getElementById("score").innerHTML = " &nbsp;&nbsp;&nbsp; SCORE : " + player.score;
    document.getElementById("player_speed").innerHTML = " &nbsp;&nbsp;&nbsp; PLAYER_SPEED : " + parseInt(GAME_SPEED*100/0.55);
    document.getElementById("police_speed").innerHTML = " &nbsp;&nbsp;&nbsp; POLICE_SPEED : " + parseInt(POLICE_SPEED*100/0.55);
    document.getElementById("height").innerHTML = " &nbsp;&nbsp;&nbsp; ALTITUDE : " + parseInt(player.pos[1]-2);
    new_time = new Date().getTime() / 1000;
    if(new_time-pre_jump_boost<10)
        document.getElementById("jump").innerHTML = " &nbsp;&nbsp;&nbsp; JUMP_BOOST : " + parseInt(10 - (new_time - pre_jump_boost));
    else
        document.getElementById("jump").innerHTML = " &nbsp;&nbsp;&nbsp; JUMP_BOOST : " + 0 ;
    if(new_time-pre_jet_pack<10)
        document.getElementById("jet").innerHTML = " &nbsp;&nbsp;&nbsp; JET_PACK : " + parseInt(10 - (new_time - pre_jet_pack));
    else
        document.getElementById("jet").innerHTML = " &nbsp;&nbsp;&nbsp; JET_PACK : " + 0 ;
    if(new_time-pre_shield<10)
        document.getElementById("shield").innerHTML = " &nbsp;&nbsp;&nbsp; SHIELD : " + parseInt(10 - (new_time - pre_shield));
    else
        document.getElementById("shield").innerHTML = " &nbsp;&nbsp;&nbsp; SHIELD : " + 0 ;
    // pre_jump_boost ;
    
}

function sound(src) 
{
    this.sound = document.createElement("audio");
    this.sound.src = src;
    this.sound.setAttribute("preload", "auto");
    this.sound.setAttribute("controls", "none");
    this.sound.style.display = "none";
    document.body.appendChild(this.sound);
    this.play = function()
    {
    this.sound.play();
    }
    this.stop = function()
    {
    this.sound.pause();
    }
} 