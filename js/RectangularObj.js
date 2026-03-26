class RectangularObj {
  constructor(x, y, w, h, f_color, s_color, context) {
    // We write instructions to set up a Flower here
    // Position and size information
    this.x = x;
    this.y = y;
    this.width = w;
    this.height = h;
    this.baseWidth = w;//store base widthh
    this.baseHeight = h; //Store base height
    this.fill_color = f_color;
    this.baseFillColor = f_color;//store base fill color
    this.stroke_color = s_color;
    this.startAngle = 0;
    this.endAngle = Math.PI * 2; //full rotation
    this.context = context;
    this.xSpeed = 1; //speed for horizontal movement
    this.micLevel = 0; //variable to store the mic level for the rectangle
  }
  //method to set the mic level from the start.js file
  setMicLevel(level) {
    this.micLevel = Math.max(0, Math.min(1, level));
  }

  display() {
    this.context.fillStyle = this.fill_color; // change the color we are using
    this.context.fillRect(this.x, this.y, this.width, this.height);
    this.context.strokeStyle = this.stroke_color; // change the color we are using
    this.context.lineWidth = 2; //change stroke
    this.context.strokeRect(this.x, this.y, this.width, this.height);
  }

  update() {
    //update rectangle
    // this.x+=1;
    //console.log("rectangle update")
    //move the rectangle back and forth accross the canvas horizontally
    //bounce off the edges of the canvas using edge-checking and reverse direction when hitting the edge
    this.x += this.xSpeed / 2;
    if (this.x <= 0) {
      this.x = 0;
      this.xSpeed = Math.abs(this.xSpeed);
    }
    if (this.x + this.width >= this.context.canvas.width) {
      this.x = this.context.canvas.width - this.width;
      this.xSpeed = -Math.abs(this.xSpeed);
    }

    //update the rectangle size and color based on the mic level
    let sizeOffset = this.micLevel * 140;
    const hue = 18;
    const saturation = 60 + Math.floor(this.micLevel * 35);
    const lightness = 45 + Math.floor(this.micLevel * 20);
    this.width = this.baseWidth + sizeOffset;
    this.height = this.baseHeight + sizeOffset;
    this.fill_color = `hsl(${hue}, ${saturation}%, ${lightness}%)`;
  }


}
