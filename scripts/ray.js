class Ray{
    startX;
    startY;
    direction; // angle with the x-axis in degrees
    length;
    constructor(startX,startY, direction,length){
        this.startX = startX;
        this.startY = startY;
        this.direction = direction;
        this.length = length;
    }

    get getStartX(){
        return this.startX;
    }

    get getStartY(){
        return this.startY;
    }

    get getDirection(){
        return this.direction;
    }

    get getLength(){
        return this.length;
    }

    set setStartX(startX){
        this.startX = startX;
    }

    set setStartY(startY){
        this.startY = startY;
    }

    set setDirection(direction){
        this.direction = direction;
    }

    set setLength(length){
        this.length = length;
    }

    /**
     * draws a Ray emitted by the player
     * @param {CanvasRenderingContext2D} ctx 
     */
    drawRay(ctx){
        const endX = this.startX + this.length * Math.cos(degrees_to_radians(this.direction));
        const endY = this.startY + this.length * Math.sin(degrees_to_radians(this.direction));

        ctx.beginPath();
        ctx.moveTo(this.startX, this.startY);
        ctx.lineTo(endX, endY);
        ctx.closePath();
        ctx.stroke();
    }
}

function degrees_to_radians(degrees)
{
    var pi = Math.PI;
    return degrees * (pi/180);
}