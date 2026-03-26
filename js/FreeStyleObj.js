class FreeStyleObj {
  constructor(x, y, length, f_color, s_color, context) {
    // We write instructions to set up a Flower here
    // Position and size information
    this.x = x;
    this.y = y;
    this.fill_color = f_color;
    this.stroke_color = s_color;
    this.theta = 0;
    this.length = length;
    this.yOffset = 10;
    this.angularSpeed = .07;
    this.context = context;
    this.micLevel = 0; //variable to store the mic level for the rectangle
    this.ySpeed = -1;
  }
  //method to set the mic level from the start.js file
  setMicLevel(level) {
    this.micLevel = Math.max(0, Math.min(1, level));
  }

  display() {
    // this.theta = 0; //reset everytime
    this.context.fillStyle = this.fill_color; // change the color we are using
    this.context.strokeStyle = this.stroke_color; // change the color we are using
    this.context.beginPath();
    this.context.moveTo(this.x, this.y)
    for (let i = this.x; i < this.x + this.length; i++) {
      this.context.lineTo(i, (Math.sin(this.theta) * 5) + this.y)
      this.context.lineTo(i, (Math.sin(this.theta) * 5) + this.y + this.yOffset)
      this.theta += this.angularSpeed;
    }
    this.context.stroke(); //set the stroke
  }

  update() {
    //update freestyle
    // console.log("free style update")
    // this.x+=1;
    //set location of the freestyle object to be in the middle of the canvas a
    this.x = this.context.canvas.width / 2 - this.length / 2;
    // this.y = this.context.canvas.height / 2 - this.yOffset / 2;
    this.y += this.ySpeed;
        if (this.y <= 0) {
        this.ySpeed = 1
      }
      if (this.y + this.yOffset + 4 >= this.context.canvas.height) { //+ this.height
        this.ySpeed = -1
      }

    // flip the freestyle object over its x-axis on the canvas on window load
    this.theta += this.angularSpeed * 60;
    this.yOffset = 20 + Math.sin(this.theta) * 10;

    //move the freestyle object vertically based on the mic level, with a base offset of 20 and an additional offset that oscillates with the sine wave for a wavy effect
    this.yOffset = 20 + this.micLevel * 50 + Math.sin(this.theta) * 10;
    

    //use purple hues for the freestyle object color and update the color based on the mic level
    let sizeOffset = this.micLevel * 140;
    const hue = 280;
    const saturation = 60 + Math.floor(this.micLevel * 35);
    const lightness = 35 + Math.floor(this.micLevel * 50);
    this.width = this.baseWidth + sizeOffset;
    this.height = this.baseHeight + sizeOffset;
    this.fill_color = `hsl(${hue}, ${saturation}%, ${lightness}%)`;
    this.fill_color = `hsl(${hue}, ${saturation}%, ${lightness}%)`;
    this.stroke_color = `hsl(${hue}, ${saturation}%, ${lightness}%)`;


  }
}
