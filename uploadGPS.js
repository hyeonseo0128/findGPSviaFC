var Gpio = require('onoff').Gpio; //include onoff to interact with the GPIO
var LED = new Gpio(20, 'out'); //use GPIO pin 20 as output
var pushButton = new Gpio(19, 'in', 'both'); //use GPIO pin 19 as input, and 'both' button presses, and releases should be handled


pushButton.watch(function (err, value) { //Watch for hardware interrupts on pushButton GPIO, specify callback function
    if (err) { //if an error
        console.error('There was an error', err); //output error message to console
        return;
    }
    console.log("button: ",pushButton.readSync());
    if (pushButton.readSync() == 0) { //check the pin state, if the state is 0 (or off)
        LED.writeSync(0); //set pin state to 1 (turn LED on)
    }
    else {
        LED.writeSync(1); //set pin state to 0 (turn LED off)
    }
});

function unexportOnClose() { //function to run when exiting program
    LED.writeSync(0); // Turn LED off
    LED.unexport(); // Unexport LED GPIO to free resources
    pushButton.unexport(); // Unexport Button GPIO to free resources
};

process.on('SIGINT', unexportOnClose); //function to run when user closes using ctrl+c