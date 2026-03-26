class CircularObj {
  constructor(x, y, radius, f_color, s_color, context) {
    // We write instructions to set up a Flower here
    // Position and size information
    this.x = x;
    this.y = y;
    this.radius = radius;
    this.fill_color = f_color;
    this.stroke_color = s_color;
    this.startAngle = 0;
    this.endAngle = Math.PI * 2; //full rotation
    this.context = context;

    //setting velocity
    this.vx = 3;
    this.vy = 3;
  }

  display() {
    this.context.fillStyle = this.fill_color; // change the color we are using
    this.context.strokeStyle = this.stroke_color; // change the color we are using
    this.context.beginPath();
    this.context.arc(
      this.x,
      this.y,
      this.radius,
      this.startAngle,
      this.endAngle,
      true
    );
    this.context.fill(); // set the fill
    this.context.lineWidth = 2; //change stroke
    this.context.closePath();
    this.context.stroke();
  }

  update() {
    //update circle
    //this.x += 1;
    //console.log("circle update");

    this.x += this.vx;
    this.y += this.vy;

    if(this.x > 400){
      this.vx = -this.vx;
    } else if(this.x < 0){
      this.vx = -this.vx;
    }

    if(this.y > 300){
      this.vy = -this.vy;
    } else if(this.y < 0){
      this.vy = -this.vy;
    }
  }
}
