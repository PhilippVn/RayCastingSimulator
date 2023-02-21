class Ray{
    startX;
    startY;
    direction;
    constructor(startX,startY, direction){
        this.startX = startX;
        this.startY = startY;
        this.direction = direction;
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

    set setStartX(startX){
        this.startX = startX;
    }

    set setStartY(startY){
        this.startY = startY;
    }

    set setDirection(direction){
        this.direction = direction;
    }

    
}