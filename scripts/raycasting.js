/**
 * Copyright © 2023 Philipp von Neffe
 * 
 * Main Class which sets up global variables, event listeners and the game loop
 */

window.onload = function () {
    main();
};

// global var to check if player is being dragged by the user
var player;
let isDraggingPlayer = false;

// global var to check if there is a touchpoint -> only allow one at a time
let isTouching = false;

// array of boundaries to redraw them each frame
var boundaries = [];
var nextBoundary;

// constants TODO make them changeable by the user
const boundaryWidth = 10;
const rayWidth = 1;
const rayStepSize = 10;
const FPS = 120;
const playerRadius = 13;
const fpsInterval = 1000 / FPS; // interval between frames in miliseconds

// dont change
var maximumRayLength;

function main(){
    const canvas = document.getElementById("canvas");
    const ctx = canvas.getContext("2d");
    const resetButton = document.getElementById("clear-button");
    const fpsCounter = document.getElementById("fps");
    maximumRayLength = Math.sqrt(canvas.width ** 2 + canvas.height ** 2);

    player = new Player(canvas.width/2,canvas.height/2,playerRadius);

    // register mouse event listeners for drawing boundaries and moving Player
    canvas.addEventListener("mousedown", handlePointerDown);
    canvas.addEventListener("mouseup", handlePointerUp);
    canvas.addEventListener("mousemove", handlePointerMove);

    
    canvas.addEventListener("touchstart",handlePointerDown);
    canvas.addEventListener("touchend",handlePointerUp);
    canvas.addEventListener("touchmove",handlePointerMove);

    resetButton.addEventListener("click",function (){
        // clear canvas boundaries and reset player
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        boundaries = [];
        player.setCoordinates(canvas.width/2,canvas.height/2);
        player.drawPlayer(ctx);
    });

    requestAnimationFrame(function (timestamp) {
        gameLoop(timestamp,performance.now(), canvas,ctx,fpsCounter);
    });
}

/**
 * 'game loop' for moving the player and redrawing the scene
 * 1. handle user input -> done with event listeners
 * 2. update game objects -> done inside event listeners
 * 3. draw
 */
function gameLoop(timestamp,lastTimestamp,canvas,ctx,fpsCounter){
    // calculate time elapsed since last frame 
    var deltaTime = (timestamp - lastTimestamp);
    
    if(deltaTime >= fpsInterval){
        fpsCounter.innerHTML = "FPS: " + Math.round((1000/deltaTime));
        lastTimestamp = timestamp;
        ctx.clearRect(0, 0, canvas.width, canvas.height);
    
        ctx.lineWidth = boundaryWidth;
        for(let i = 0; i < boundaries.length; ++i){
            boundaries[i].drawBoundary(ctx);
        }
    
        player.drawPlayer(ctx);

        ctx.lineWidth = rayWidth;
        player.shootRays(ctx,rayStepSize,canvas);
    }
    // request the next animation frame
    requestAnimationFrame(function (timestamp) {
        gameLoop(timestamp, lastTimestamp,canvas,ctx,fpsCounter);
    });
}

/** 
 * either start dragging the player or drawing a boundary depending on wether the player was clicked or the canvas
*/
function handlePointerDown(event) { // TODO ignore > 1 touches -> invisible boundaries are drawn, in all handle functions
    event.preventDefault(); // prevent event bubbling
    let clientX;
    let clientY;

    if(!isTouching){
        if(event.type == "touchstart"){
            isTouching = true;
            var rect = event.target.getBoundingClientRect();
            clientX = event.changedTouches[0].pageX - rect.left;
            clientY = event.changedTouches[0].pageY - rect.top;
        }else{
            clientX = event.offsetX;
            clientY = event.offsetY;
        }
        //console.log(event.type +": " + logPoint(clientX,clientY));
    
        // check if the Player should be dragged or if a Boundary should be drawn
        if (player.isSelected(clientX, clientY)) {
            isDraggingPlayer = true;
        }else{
            nextBoundary = new Boundary(clientX, clientY,-1,-1,true);
        }
    }
}

/**
 * stop dragging the player if is was previously selected or finish drawing a boundary
 */
function handlePointerUp(event) {
    event.preventDefault();
    if(isDraggingPlayer){
        isDraggingPlayer = false;
    }else{
        let clientX;
        let clientY;

        if(event.type == "touchend"){
            isTouching = false;
            var rect = event.target.getBoundingClientRect();
            clientX = event.changedTouches[0].pageX - rect.left;
            clientY = event.changedTouches[0].pageY - rect.top;
        }else{
            clientX = event.offsetX;
            clientY = event.offsetY;
        }

        //console.log(event.type +": " + logPoint(clientX,clientY));

        nextBoundary.setEndX = clientX;
        nextBoundary.setEndY = clientY;
        if(nextBoundary.isReady()){
            boundaries.push(nextBoundary);
            boundaries = boundaries.concat(nextBoundary.getRectangleBoundaries());
        }
    }
}

/**
 * moves the player
 */
function handlePointerMove(event) {
    event.preventDefault();
    let clientX;
    let clientY;

    if(event.type == "touchmove"){
        var rect = event.target.getBoundingClientRect();
        clientX = event.changedTouches[0].pageX - rect.left;
        clientY = event.changedTouches[0].pageY - rect.top;
    }else{
        clientX = event.offsetX;
        clientY = event.offsetY;
    }

    //console.log(event.type +": " + logPoint(clientX,clientY));

    if (isDraggingPlayer) {
        player.setCoordinates(clientX,clientY);
    }
}

function logPoint(x,y){
    return "("+x+","+y+")";
}