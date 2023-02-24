class Player{
    playerX;
    playerY;
    radius;
    rays;
    constructor(playerX,playerY, radius){
        this.playerX = playerX;
        this.playerY = playerY;
        this.radius = radius;
        this.rays = [];
    }

    get getX(){
        return this.playerX;
    }

    get getY(){
        return this.playerY;
    }

    get getRadius(){
        return this.radius;
    }

    set setX(playerX){
        this.playerX = playerX;
    }

    set setY(playerY){
        this.playerY = playerY;
    }

    set setRadius(radius){
        this.radius = radius;
    }

    setCoordinates(X,Y){
        this.playerX = X;
        this.playerY = Y;
    }

    /**
     * returns a boolean if the point is inside the player
     * @param {Number} x 
     * @param {Number} y 
     */
    isSelected(x,y){
        let dx = (x - this.playerX)/this.radius;
        let dy = (y - this.playerY)/this.radius;
        return dx * dx + dy * dy < 1;
    }

    /**
     * draws the Player
     * @param {CanvasRenderingContext2D} ctx 
     */
    drawPlayer(ctx){
        ctx.beginPath();
        ctx.ellipse(this.playerX,this.playerY, this.radius, this.radius, 0, 0, 2 * Math.PI);
        ctx.closePath();
        ctx.fill();
    }


    /**
     * shoots rays from the player in 360 degrees
     * @param {CanvasRenderingContext2D} ctx 
     * @param {Number} degreeStep
     * @param {Number} rayWidth
     */
    shootRays(ctx, degreeStep){
        this.rays = [];
        for(let i = 0; i < 360; i+=degreeStep){
            this.rays.push(new Ray(this.playerX,this.playerY,i,100));
        }
        for(let ray of this.rays){
            ray.drawRay(ctx);
        }
    }
}