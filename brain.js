var is_correct
var current_image = -1
current_image = get_random_image();
//document.getElementByID("random_image").innerHTML = "s"


function check_north() {
    //checks if the answer is correct
    if (current_image == 0) {
        is_correct = true;
    } else if (current_image == 1) {
        is_correct = false;
    } else if (current_image == 2) {
        is_correct = false;
    } else {
        is_correct = true;
    }
    document.getElementById("answer").innerHTML = is_correct
    console.log(is_correct);
    //sets new image and memorizes the number
    current_image = get_random_image();
}

function check_south() {
    //checks if the answer is correct
    if (current_image == 0) {
        is_correct = false;
    } else if (current_image == 1) {
        is_correct = true;
    } else if (current_image == 2) {
        is_correct = true;
    } else {
        is_correct = false;
    }
    document.getElementById("answer").innerHTML = is_correct
    console.log(is_correct);
    //sets new image and memorizes the number
    current_image = get_random_image();
}

function change_image(image_name) {
    //changes the image with the given variable
    document.getElementById("random_image").src = image_name;
}

function get_random_image() {
    //gets number between 0-3
    var rnd_number = parseInt(Math.random() * 4);
    //checks if number is the same as previous
    while (rnd_number == current_image) {
        rnd_number = parseInt(Math.random() * 4);
    }
    console.log(rnd_number);
    //determinates the new image
    if (rnd_number == 0) {
        change_image("cwr.png");
    } else if (rnd_number == 1) {
        change_image("ccwr.png");
    } else if (rnd_number == 2) {
        change_image("cwl.png");
    } else {
        change_image("ccwl.png");
    }
    return rnd_number;
}