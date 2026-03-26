window.onload = go_all_stuff;

function go_all_stuff() {
    console.log("go");

    /* for loading the video */
    let videoEl = document.getElementById("video-birds");
    window.addEventListener("click", function () {
        if (videoEl.currentTime === 0) {
            videoEl.play()
        }
    })


    videoEl.loop = true;

    let theCanvases = document.querySelectorAll(".canvases");
    let theContexts = [];
    //add a context for each canvas and put into an array

    for (let i = 0; i < theCanvases.length; i++) {
        let context = theCanvases[i].getContext("2d");
        theContexts.push(context);
    }

    let drawingBoardA = new DrawingBoard(theCanvases[0], theContexts[0], theCanvases[0].id);
    //add a circular object to canvas A
    drawingBoardA.addObj(new CircularObj(100, 100, 20, "#FFC0CB", "#E6E6FA", drawingBoardA.context))
    drawingBoardA.display();



    let drawingBoardB = new DrawingBoard(theCanvases[1], theContexts[1], theCanvases[1].id);
    //add a rectangular object to canvas B
    let rectangleObjB = new RectangularObj(100, 100, 50, 70, "#fe6cc6", "#E6E6FA", drawingBoardB.context)
    drawingBoardB.addObj(rectangleObjB)
    drawingBoardB.display();


    let drawingBoardC = new DrawingBoard(theCanvases[2], theContexts[2], theCanvases[2].id);
    //add a freestyle object to canvas C
    drawingBoardC.addObj(new FreeStyleObj(0, 100, 400, "#CF9FFF", "#CF9FFF", drawingBoardC.context))
    drawingBoardC.display();

    let drawingBoardD = new DrawingBoard(theCanvases[3], theContexts[3], theCanvases[3].id);
    drawingBoardD.addObj(new VideoObj(0, 0, 400, 300, videoEl, drawingBoardD.context))
    drawingBoardD.display();


    /*** RUN THE ANIMATION LOOP  */
    window.requestAnimationFrame(animationLoop);

    function animationLoop() {
        /*** CALL THE EACH CANVAS TO ANIMATE INSIDE  */
        drawingBoardA.animate();
        drawingBoardB.animate();
        drawingBoardC.animate();
        drawingBoardD.run(videoEl)
        window.requestAnimationFrame(animationLoop);
    }



    /** TASK 1:(Drawing Board A) - 
     *  1: animate the circle object(s) somehow/anyhow.. (there may be more than one)
     * You can use the mouse coordinates - the canvas ALREADY has event listeners for mouse click and mouse move
     * implemeneted, as well as the proper mouseX and mouseY (NO need to add)
     * -> ensure that any properties that are changed by the circle object occur in the update method already provided,
     * and use the member properties provided (you may add new ones ... or not :)
     * 
     * 2: add new circle objects (different sizes, positions, colors) to the canvas (board A) using some form of user interaction
     * 3: remove new circle objects from the canvas (board A) using some other form of user interaction 
     * Please for this exercise - do not add any new shapes other than the circular object...
     * 
     */


    /** TASK 2:(Drawing Board B) - 
     *  1: Affect the rectangle by input from the microphone somehow, in real time...
     *  at least two properties of the rectangle need to update and change...
     *  2: apply some arbitrary animation to the rectangle obj (change the properties in the update method provided)
     * -> the code for the microphone has NOT been added  - you need to implement it correctly...
     *  
     */

    //Microphone access and audio processing setup for Drawing Board B AND Board C
    //Reference: Web Audio API example code provided in class notes and https://dobrian.github.io/cmp/topics/sample-recording-and-playback-with-web-audio-api/3.microphone-input-and-recording.html#:~:text=Accessing%20Your%20Microphone,as%20an%20argument%20to%20the%20.
    //https://developer.mozilla.org/en-US/docs/Web/API/Web_Audio_API/Visualizations_with_Web_Audio_API
    //Initialize mic variables
    let micInitialized = false;
    //on click ask for mic access and start the audio processing
    window.addEventListener("click", async function () {
        if (micInitialized) {
            return;
        }
        // Check if the browser supports the Web Audio API and getUserMedia
        if (!navigator.mediaDevices || !navigator.mediaDevices.getUserMedia) {
            console.log("mic not supported");
            return;
        }
        // Set up microphone access and audio processing
        micInitialized = true;

        //try-catch block to handle errors in accessing the microphone 

        //try to get the microphone input and set up the audio context and analyser
        try {
            //Create an audio context and get the microphone input
            const AudioContextClass = window.AudioContext || window.webkitAudioContext;
            const audioContext = new AudioContextClass();
            const audioStream = await navigator.mediaDevices.getUserMedia({ audio: true });
            // create a media stream source from the microphone input and an analyser node to process the audio data
            const microphoneIn = audioContext.createMediaStreamSource(audioStream);
            const analyser = audioContext.createAnalyser();

            //Set up the analyser and connect it to the microphone input
            analyser.fftSize = 256;
            analyser.smoothingTimeConstant = 0.75;
            const dataArray = new Uint8Array(analyser.frequencyBinCount);
            microphoneIn.connect(analyser);

            //resume the audio context if it is suspended (some browsers require this to start processing audio)
            if (audioContext.state === "suspended") {
                await audioContext.resume();
            }

            //Function to visualize the audio input and update the rectangle from the microphone input
            function visualizeAudio() {
                //get the frequency data from the analyser and calculate the average level of the audio input
                analyser.getByteFrequencyData(dataArray);

                //Calculate the average level of the audio input and normalize it to a range of 0 to 1, then boost the level for more noticeable changes
                let sum = 0;
                for (let i = 0; i < dataArray.length; i++) {
                    sum += dataArray[i];
                }
                //               console.log("average level:", sum / dataArray.length);
                //               console.log("boosted level:", Math.min(1, (sum / dataArray.length) * 4));

                let avg = sum / dataArray.length;
                let level = avg / 255;
                let boostedLevel = Math.min(1, level * 4);
                rectangleObjB.setMicLevel(boostedLevel);
                freeStyleObjC.setMicLevel(boostedLevel);

                requestAnimationFrame(visualizeAudio);
            }

            // start visualizing the audio input and updating the rectangle based on the microphone input
            visualizeAudio();
        }
        //catch any errors that occur during the microphone access and audio processing
        catch (err) {
            //If there is an error, set micInitialized to false to allow retrying and log the error message
            micInitialized = false;
            console.log("had an error getting the microphone", err);
        }
    });


    /** TASK 3:(Drawing Board C) - 
     *  1: Affect the free-style shape by input from the microphone somehow, in real time...
     *  at least two properties of the free-style shape need to update and change...
     *  2: apply some arbitrary animation to the free-style shape (change the properties in the update method provided)
     * -> the code for the microphone has NOT been added  - you need to implement it correctly...
     *  
     */



    /** TASK 4:(Video - recorded - )
     * // add filters or manipulate the pixels... take user input from the boxes..
     *  1: using thr provided VideoObj class - > 
     * you will see all the code needed for activating  a blur filter on the video - activate it
     * 2: Next: apply the same logic to enable the other 3 possible filters (adding the event listeners etc)
     * -> make sure to look at the input/output ranges for the values
     * 3: -> apply the context filters  to the video for the three filter options (and activate the blur as well)
     * 4: ->  using the mousemove event listener (already applied in the drawing board) - 
     * make the rectangle (over the video) - follow the mouse ... AND change color when you click on the canvas
     * USE & FILL IN THE METHODS ALREADY set out in the VideoObj class...
     * 
     * 
     * PLEASE NOTE: there will be marks taken off if you ignore the instructions ;)
     *  
     */

}