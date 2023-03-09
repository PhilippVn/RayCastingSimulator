/**
 * Copyright © 2023 Philipp von Neffe
 * 
 * This Class represents a boundary for the rays, which can either be a user defined one or the canvas borders
 */
class Boundary{
    startX;
    startY;
    endX;
    endY;
    shouldbeDrawn;
    constructor(startX, startY, endX, endY,shouldbeDrawn){
        this.startX = startX;
        this.startY = startY;
        this.endX = endX;
        this.endY = endY;
        this.shouldbeDrawn = shouldbeDrawn;
    }

    get getStartX(){
        return this.startX;
    }

    get getStartY(){
        return this.startY;
    }

    get getEndX(){
        return this.endX;
    }

    get getEndY(){
        return this.endY;
    }

    set setStartX(startX){
        this.startX = startX;
    }

    set setStartY(startY){
        this.startY = startY;
    }

    set setEndX(endX){
        this.endX = endX;
    }

    set setEndY(endY){
        this.endY = endY;
    }

    isReady(){
        return this.startX > 0 && this.startY > 0 && this.endX > 0 && this.endY > 0 && (this.startX !== this.endX || this.startY != this.endY);
    }

    /**
     * Draws the boundary on the provided canvas context
     * @param {CanvasRenderingContext2D} ctx
     */
    drawBoundary(ctx){
        if(this.shouldbeDrawn){
            ctx.beginPath();
            ctx.moveTo(this.startX,this.startY);
            ctx.lineTo(this.endX,this.endY);
            ctx.closePath();
            ctx.stroke();
        }
    }

    /** expands the boundary line to a rectangle of boundarywidth and returns the boundaries of the rectangle
     * 
     * note: these dont get drawn but are used when checking for line intersection to simulate line intersection of
     * a ray and a boundary of a given width that can be bigger than 1 (rectangle)
     */
    // source: https://stackoverflow.com/questions/1936934/turn-a-line-into-a-rectangle
    getRectangleBoundaries(){
        const x0 = this.startX;
        const y0 = this.startY;
        const x1 = this.endX;
        const y1 = this.endY;

        var dx = x1 - x0; //delta x
        var dy = y1 - y0; //delta y
        const linelength = Math.sqrt(dx * dx + dy * dy); // pythagoras
        dx /= linelength;
        dy /= linelength;
        //Ok, (dx, dy) is now a unit vector pointing in the direction of the line
        //A perpendicular vector is given by (-dy, dx)
        const thickness = boundaryWidth; //Some number 
        const px = 0.5 * thickness * (-dy); //perpendicular vector with lenght thickness * 0.5
        const py = 0.5 * thickness * dx;

        const leftBoundary = new Boundary(x0 - px, y0 - py,x0 + px, y0 + py);
        const topBoundary = new Boundary(x0 + px, y0 + py,x1 + px, y1 + py);
        const rightBoundary = new Boundary(x1 - px, y1 - py,x1 + px, y1 + py);
        const bottomBoundary = new Boundary(x0 - px, y0 - py,x1 - px, y1 - py);
        return [
            leftBoundary,topBoundary,rightBoundary,bottomBoundary
        ];
    }
}

function getCanvasBoundaries(canvasWidth, canvasHeight){
    let bottomBoundary = new Boundary(0,canvasHeight,canvasWidth,canvasHeight,false);
    let topBoundary = new Boundary(0,0,canvasWidth,0,false);
    let leftBoundary = new Boundary(0,0,0,canvasHeight,false);
    let rightBoundary = new Boundary(canvasWidth,0,canvasWidth,canvasHeight,false);
    return [bottomBoundary,topBoundary,leftBoundary,rightBoundary];
}

/**
 * 
 * @returns User defined Boundaries and Canvas Boundaries
 */
function getAllBoundaries(canvas){
    return getCanvasBoundaries(canvas.width,canvas.height).concat(boundaries);
}