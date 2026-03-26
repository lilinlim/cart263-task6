class DrawingBoard {
  /* Constructor */
  constructor(canvas, context, drawingBoardId) {
    this.canvas = canvas;
    this.context = context;
    this.objectsOnCanvas = [];
    let self = this;
    this.drawingBoardId = drawingBoardId;
    //each element has a mouse clicked and a mouse over
    this.canvas.addEventListener("click", function (e) {
      self.clickCanvas(e);
    });

    this.canvas.addEventListener("mousemove", function (e) {
      self.overCanvas(e);
    });
  }

  overCanvas(e) {
    //console.log("over");
    this.canvasBoundingRegion = this.canvas.getBoundingClientRect();
    this.mouseOffsetX = parseInt(e.clientX - this.canvasBoundingRegion.x);
    this.mouseOffsetY = parseInt(e.clientY - this.canvasBoundingRegion.y);
    console.log(this.mouseOffsetX, this.mouseOffsetY);
    //differentiate which canvas
    //you can remove the console.logs /// 
    if (this.drawingBoardId === "partA") {
      console.log("in A");

    }
    if (this.drawingBoardId === "partB") {
      console.log("in B")
    }
    if (this.drawingBoardId === "partC") {
      console.log("in C")
    }
    if (this.drawingBoardId === "partD") {
      console.log("in D")
      for (let i = 0; i < this.objectsOnCanvas.length; i++) {
        if (typeof this.objectsOnCanvas[i].updatePositionRect === "function") {
          this.objectsOnCanvas[i].updatePositionRect(this.mouseOffsetX, this.mouseOffsetY);
        }
      }
    }
  }

  clickCanvas(e) {
    // console.log("clicked");
    this.canvasBoundingRegion = this.canvas.getBoundingClientRect();
    this.mouseOffsetX = parseInt(e.clientX - this.canvasBoundingRegion.x);
    this.mouseOffsetY = parseInt(e.clientY - this.canvasBoundingRegion.y);
    //console.log(this.mouseOffsetX, this.mouseOffsetY);

    //differentiate which canvas
    //you can remove the console.logs /// 
    if (this.drawingBoardId === "partA") {
      console.log("in A")

      for (let i = this.objectsOnCanvas.length - 1; i >= 0; i--) {
        let circ = this.objectsOnCanvas[i];

        let dx = this.mouseOffsetX - circ.x;
        let dy = this.mouseOffsetY - circ.y;

        if (dx * dx + dy * dy <= circ.radius * circ.radius) {
          this.objectsOnCanvas.splice(i, 1);
          this.display();
          return;
        }
      }

      let colorArray = [
        "lightpink",
        "mistyrose",
        "palevioletred",
        "pink",
        "thistle",
      ];
      let randomColor = colorArray[parseInt(Math.random() * colorArray.length)];

      let newCircObj = new CircularObj(this.mouseOffsetX + Math.random() * 20, this.mouseOffsetY + Math.random() * 20, 20, randomColor, "#E6E6FA", this.context)
      this.addObj(newCircObj);
      this.display();
      //console.log(this.objectsOnCanvas.length);

    }
    if (this.drawingBoardId === "partB") {
      console.log("in B")
    }
    if (this.drawingBoardId === "partC") {
      console.log("in C")
    }
    if (this.drawingBoardId === "partD") {
      console.log("in D")
      for (let i = 0; i < this.objectsOnCanvas.length; i++) {
        if (typeof this.objectsOnCanvas[i].changeColor === "function") {
          let randomColor = `rgb(${Math.floor(Math.random() * 256)}, ${Math.floor(Math.random() * 256)}, ${Math.floor(Math.random() * 256)})`;
          this.objectsOnCanvas[i].changeColor(randomColor);
        }
      }
    }
  }
  /* method to add obj to canvas */
  addObj(objToAdd) {
    this.objectsOnCanvas.push(objToAdd);
  }

  /* method to add display objects on canvas */
  display() {
    for (let i = 0; i < this.objectsOnCanvas.length; i++) {
      this.objectsOnCanvas[i].display();
    }
  }

  /* method to add animate objects on canvas */
  animate() {
    this.context.clearRect(0, 0, this.canvas.width, this.canvas.height);

    for (let i = 0; i < this.objectsOnCanvas.length; i++) {
      this.objectsOnCanvas[i].update();
      this.objectsOnCanvas[i].display();
    }
  }

  run(videoElement) {
    for (let i = 0; i < this.objectsOnCanvas.length; i++) {
      this.objectsOnCanvas[i].update(videoElement);
      this.objectsOnCanvas[i].display();
    }

  }
}
