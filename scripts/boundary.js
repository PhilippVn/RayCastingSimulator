class Boundary{
    startX;
    startY;
    endX;
    endY;
    constructor(startX, startY, endX, endY){
        this.startX = startX;
        this.startY = startY;
        this.endX = endX;
        this.endY = endY;
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
        ctx.beginPath();
        ctx.moveTo(this.startX,this.startY);
        ctx.lineTo(this.endX,this.endY);
        ctx.closePath();
        ctx.stroke();
    }
}