/**
 * Copyright © 2023 Philipp von Neffe
 * 
 * This Class represents a moveable Player Object that shoots Rays
 */
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
        ctx.fillStyle = "rgba(74,148,105,1)"
        ctx.beginPath();
        ctx.ellipse(this.playerX,this.playerY, this.radius, this.radius, 0, 0, 2 * Math.PI);
        ctx.closePath();
        ctx.fill();
    }


    /**
     * shoots rays from the player`s edge in 360 degrees
     * @param {CanvasRenderingContext2D} ctx 
     * @param {Number} degreeStep
     * @param {Number} rayWidth
     */
    shootRays(ctx, degreeStep, canvas) {
        this.rays = [];
      
        for (let i = 0; i < 360; i += degreeStep) {
          const radians = i * Math.PI / 180;
          const startX = this.playerX + (this.radius * Math.cos(radians));
          const startY = this.playerY + (this.radius * Math.sin(radians));
          const ray = new Ray(startX, startY, i, maximumRayLength);
          ray.setMaximumRayLength(canvas);
          this.rays.push(ray);
        }
      
        for (let ray of this.rays) {
          ray.drawRay(ctx);
        }
      }
}