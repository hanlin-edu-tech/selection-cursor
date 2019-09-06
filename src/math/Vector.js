
class Vector {

  constructor() {
    this.x = 0;
    this.y = 0;
    this.currentPoint = null;
    this.targetPoint = null;
  }

  move(point1, point2) {
    this.currentPoint = point1;
    this.targetPoint = point2;
    this.y = point2.y - point1.y;
    this.x = point2.x - point1.x;
  }

  forEachAsRectangle(func) {
    const moveX = this.x > 0 ? 1:-1;
    const moveY = this.y > 0 ? 1:-1;

    for(let y = this.currentPoint.y ; y != (this.targetPoint.y + moveY) ; y+= moveY) {
      for(let x = this.currentPoint.x ; x != (this.targetPoint.x + moveX) ; x+= moveX) {
        func(x, y);
      }
    }
    
  }

}

export default Vector;

