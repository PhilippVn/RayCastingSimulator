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
            minimumDistance = (distance < minimumDistance) ? distance : minimumDistance;
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
 * calculates and returns all intersection points of the ray with all boundaries using line intersection formula and cramers rule
 * @param {Ray} ray 
 * @param {HTMLCanvasElement} canvas
 * @returns array of intersection points (x,y)
 */
function getIntersectionPoints(ray,canvas){
    let boundaries = getAllBoundaries(canvas);
    let intersectionPoints = [];

    for (const boundary of boundaries) {
        // Calculate boundary vector
        const boundaryX = boundary.getEndX - boundary.getStartX;
        const boundaryY = boundary.getEndY - boundary.getStartY;
    
        // Calculate ray vector
        const rayEndX = ray.getStartX + ray.getLength * Math.cos(degrees_to_radians(ray.getDirection));
        const rayEndY = ray.getStartY + ray.getLength * Math.sin(degrees_to_radians(ray.getDirection));
        const rayX = rayEndX - ray.getStartX;
        const rayY = rayEndY - ray.getStartY;
    
        // Apply Cramer's rule to find intersection point
        const determinant = rayX * boundaryY - rayY * boundaryX;
        if (determinant != 0) {
          const t = ((boundary.getStartX - ray.getStartX) * boundaryY - (boundary.getStartY - ray.getStartY) * boundaryX) / determinant;
          const u = -(rayX * (ray.getStartY - boundary.getStartY) - rayY * (ray.getStartX - boundary.getStartX)) / determinant;
          if (t >= 0 && t <= 1 && u >= 0 && u <= 1) {
            const intersectionX = ray.getStartX + t * rayX;
            const intersectionY = ray.getStartY + t * rayY;
            intersectionPoints.push([intersectionX, intersectionY]);
          }
        }
      }
    
      return intersectionPoints;
}

function degrees_to_radians(degrees)
{
    var pi = Math.PI;
    return degrees * (pi/180);
}