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

    /**
     * sets the maximum ray length which is the minimum distance to any intersection point 
     */
    setMaximumRayLength(canvas){
        let intersectionPoints = getIntersectionPoints(this,canvas);
        let minimumDistance = maximumRayLength;
        for(let i = 0; i < intersectionPoints.length; ++i){
            let distance = getDistance(this.startX,this.startY,intersectionPoints[i][0],intersectionPoints[i][1]);
            if(distance < minimumDistance){
                minimumDistance = distance;
            }
        }
        this.length = minimumDistance;
    }
}

function getDistance(x1,y1,x2,y2){
    const dx = x2 - x1;
    const dy = y2 - y1;
    return Math.sqrt(dx * dx + dy * dy);
}

/**
 * calculates and returns all intersection points of the ray with all boundaries
 * @param {Ray} ray 
 * @param {HTMLCanvasElement} canvas
 * @returns array of intersection points (x,y)
 */
function getIntersectionPoints(ray, canvas) {
    const boundaries = getAllBoundaries(canvas);
    var intersectionPoints = [];
  
    for (const boundary of boundaries) {
        const rayLength = ray.getLength;
        const x1 = ray.getStartX;
        const y1 = ray.getStartY;
        const rayDirection = ray.getDirection;
        const x2 = x1 + rayLength * Math.cos(degrees_to_radians(rayDirection));
        const y2 = y1 + rayLength * Math.sin(degrees_to_radians(rayDirection));

        const x3 = boundary.getStartX;
        const y3 = boundary.getStartY;
        const x4 = boundary.getEndX;
        const y4 = boundary.getEndY;

        // https://en.wikipedia.org/wiki/Line%E2%80%93line_intersection
        // line intersection for two line segments
        const t = ((x1-x3)*(y3-y4) - (y1-y3)*(x3-x4))/((x1-x2)*(y3-y4) - (y1-y2)*(x3-x4));
        const u = ((x1-x3)*(y1-y2) - (y1-y3)*(x1-x2))/((x1-x2)*(y3-y4) - (y1-y2)*(x3-x4));

        // test for intersection
        if(((0 <= t) && (t <= 1)) && ((0 <= u) && (u <= 1))){
            const x = (x1 + t*(x2-x1));
            const y = (y1 + t*(y2-y1));

            intersectionPoints.push([x,y]);
        }
    }
  
    return intersectionPoints;
  }
  

function degrees_to_radians(degrees)
{
    var pi = Math.PI;
    return degrees * (pi/180);
}