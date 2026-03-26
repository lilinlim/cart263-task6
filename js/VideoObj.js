class VideoObj {
  constructor(x, y, w, h, videoElement, context) {
    this.videoElement = videoElement;
    this.context = context;
    this.x = x;
    this.y = y;
    this.w = w;
    this.h = h;
    this.shapeX = 10;
    this.shapeY = 10;
    this.shapeCol = "#000000";


    let filterButton_blur = document.getElementById("filter_button_blur");
    let blurInput = document.getElementById("blurnum");
    //initialize the rest of the filter controls and user provided values for each filter
    let filterButton_sepia = document.getElementById("filter_button_sepia");
    let sepiaInput = document.getElementById("sepianum");
    let filterButton_hue = document.getElementById("filter_button_hue");
    let hueInput = document.getElementById("huenum");
    let filterButton_invert = document.getElementById("filter_button_invert");
    let invertInput = document.getElementById("invertnum");
    this.userProvidedBlur = 0;
    this.userProvidedSepia = 0;
    this.userProvidedHue = 0;
    this.userProvidedInvert = 0;

    //set the initial values of the filter controls to match the initial filter settings
    blurInput.value = this.userProvidedBlur;
    sepiaInput.value = this.userProvidedSepia;
    hueInput.value = this.userProvidedHue;
    invertInput.value = this.userProvidedInvert;

    //store a reference to "this" in a variable to use inside the event listeners since "this" will refer to the button element inside the event listener functions
    let self = this;
    //add event listeners to each filter button to update the corresponding user provided filter value when clicked
    filterButton_blur.addEventListener("click", function () {
      //get value from input field
      self.userProvidedBlur = Number(blurInput.value);
      console.log(self.userProvidedBlur);
    });

    filterButton_sepia.addEventListener("click", function () {
      self.userProvidedSepia = Number(sepiaInput.value);
      console.log(self.userProvidedSepia);
    });

    filterButton_hue.addEventListener("click", function () {
      self.userProvidedHue = Number(hueInput.value);
      console.log(self.userProvidedHue);
    });

    filterButton_invert.addEventListener("click", function () {
      self.userProvidedInvert = Number(invertInput.value);
      console.log(self.userProvidedInvert);
    });
  }

  display() {
    this.context.save();
    //apply the filters to the context based on the user provided values and draw the video and rectangle with the applied filters
    this.context.filter = `blur(${this.userProvidedBlur}px) sepia(${this.userProvidedSepia}%) hue-rotate(${this.userProvidedHue}deg) invert(${this.userProvidedInvert}%)`;
    this.context.drawImage(this.videoElement, this.x, this.y, this.w, this.h);
    this.context.fillStyle = this.shapeCol;
    this.context.fillRect(this.shapeX, this.shapeY, 50, 50)
    this.context.restore();
  }

  //called when rectangle color is to be updated
  changeColor(newCol) {
    /** FILL IN */
    //update the rectangle color based on the user input from the color picker
    this.shapeCol = newCol;
  }
  //called when rectangle Pos is to be updated
  updatePositionRect(mx, my) {
    /** FILL IN */
    //update the rectangle position to follow the mouse position
    // offset by 25 pixels to center the rectangle on the mouse
    this.shapeX = mx - 25;
    this.shapeY = my - 25;
  }
  update(videoElement) {
    this.videoElement = videoElement;
  }
}
