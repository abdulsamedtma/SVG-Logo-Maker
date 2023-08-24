/*// Import the Inquirer package for command-line prompts
const inquirer = require("inquirer");
// Import the File System module for file operations
const filesystem = require("fs");
// Import classes for different shapes from the ./lib/shapes directory
const {Circle, Square, Triangle} = require("./lib/shapes");

/*const fs = require('./node_modules/graceful-fs/graceful-fs')
//const inquirer = require("inquirer");
//const {Circle, Square, Triangle} = require("./lib/shapes");
// Imports the graceful-fs, inquirer, Circle, Square, and Triangle modules.
// Defines a Svg class that has a constructor with three methods for rendering and setting the text and shape elements in the SVG string.

// Defines a Svg class that has a constructor with three methods for rendering and setting the text and shape elements in the SVG string.
class Svg{
    constructor(){
        this.textElement = ''
        this.shapeElement = ''
    }
    render(){

        return `<svg version="1.1" xmlns="http://www.w3.org/2000/svg" width="300" height="200">${this.shapeElement}${this.textElement}</svg>`
    }
    setTextElement(text,color){
        this.textElement = `<text x="150" y="125" font-size="60" text-anchor="middle" fill="${color}">${text}</text>`
    }
    setShapeElement(shape){
        this.shapeElement = shape.render()

    }
    
}

// Defines array of 'questions' using the 'inquirer' library with the following questions.
// Each question is an object that specifies the properties of TEXT, TEXT COLOR, SHAPE COLOR, and Pixel Image.
const questions = [
    {
        type: "input",
        name: "text",
        message: "TEXT: Enter up to (3) Characters:",
    },
    {
        type: "input",
        name: "text-color",
        message: "TEXT COLOR: Enter a color keyword (OR a hexadecimal number):",
    },
    {
        type: "input",
        name: "shape",
        message: "SHAPE COLOR: Enter a color keyword (OR a hexadecimal number):",
    },
    {
        type: "list",
        name: "pixel-image",
        message: "Choose which Pixel Image you would like?",
        choices: ["Circle", "Square", "Triangle"],
    },
];

// Function to write data to file
function writeToFile(fileName, data) {
	console.log("Writing [" + data + "] to file [" + fileName + "]")
    filesystem.writeFile(fileName, data, function (err) {
        if (err) {
            return console.log(err);
        }
        console.log("Congratulations, you have Generated a logo.svg!");
    });
}

async function init() {
    console.log("Starting init");
	var svgString = "";
	var svg_file = "logo.svg";

    // Prompt the user for answers
    const answers = await inquirer.prompt(questions);

	//user text
	var user_text = "";
	if (answers.text.length > 0 && answers.text.length < 4) {
		// 1-3 chars, valid entry
		user_text = answers.text;
	} else {
		// 0 or 4+ chars, invalid entry
		console.log("Invalid user text field detected! Please enter 1-3 Characters, no more and no less");
        return;
	}
	console.log("User text: [" + user_text + "]");
	//user font color
	user_font_color = answers["text-color"];
	console.log("User font color: [" + user_font_color + "]");
	//user shape color
	user_shape_color = answers.shape;
	console.log("User shape color: [" + user_shape_color + "]");
	//user shape type
	user_shape_type = answers["pixel-image"];
	console.log("User entered shape = [" + user_shape_type + "]");
	
	//user shape
	let user_shape;
	if (user_shape_type === "Square" || user_shape_type === "square") {
		user_shape = new Square();
		console.log("User selected Square shape");
	}
	else if (user_shape_type === "Circle" || user_shape_type === "circle") {
		user_shape = new Circle();
		console.log("User selected Circle shape");
	}
	else if (user_shape_type === "Triangle" || user_shape_type === "triangle") {
		user_shape = new Triangle();
		console.log("User selected Triangle shape");
	}
	else {
		console.log("Invalid shape!");
	}
	user_shape.setColor(user_shape_color);

	// Create a new Svg instance and add the shape and text elements to it
	var svg = new Svg();
	svg.setTextElement(user_text, user_font_color);
	svg.setShapeElement(user_shape);
	svgString = svg.render();
	
	//Print shape to log
	console.log("Displaying shape:\n\n" + svgString);
	//document.getElementById("svg_image").innerHTML = svgString;

	console.log("Shape generation complete!");
	console.log("Writing shape to file...");
	writeToFile(svg_file, svgString); 
}
init() */



// Import the Inquirer package for command-line prompts
const inquirer = require("inquirer");

// Import the File System module for file operations
const fs = require("fs");

// Import classes for different shapes from the ./lib/shapes directory
const { Triangle, Square, Circle } = require("./lib/shapes");

// Function to write the SVG file based on user answers from Inquirer prompts
function writeToFile(fileName, answers) {
  let svgString = ""; // Initialize an empty SVG string
  svgString = '<svg version="1.1" width="300" height="200" xmlns="http://www.w3.org/2000/svg">'; // Set SVG container dimensions

  svgString += "<g>"; // Open <g> tag to wrap text on top of the shape
  svgString += `${answers.shape}`; // Insert user's shape choice

  let shapeChoice;
  // Conditional block to add polygon properties and shape color to SVG string
  if (answers.shape === "Triangle") {
    shapeChoice = new Triangle();
    svgString += `<polygon points="150,25 50,175 250,175" fill="${answers.shapeBackgroundColor}"/>`;
  } else if (answers.shape === "Square") {
    shapeChoice = new Square();
    svgString += `<rect x="73" y="40" width="160" height="160" fill="${answers.shapeBackgroundColor}"/>`;
  } else {
    shapeChoice = new Circle();
    svgString += `<circle cx="150" cy="115" r="80" width="300" height="200" fill="${answers.shapeBackgroundColor}"/>`;
  }

  // Add <text> tag for text alignment, content, color, and font size
  svgString += `<text x="150" y="130" text-anchor="middle" font-size="40" fill="${answers.textColor}">${answers.text}</text>`;
  svgString += "</g>"; // Close the <g> tag
  svgString += "</svg>"; // Close the SVG container

  // Write the SVG string to a file using the File System module
  fs.writeFile(fileName, svgString, (err) => {
    err ? console.log(err) : console.log("Logo successfully generated"); // Handle errors or success
  });
}
// Function to validate user input
function validateInput(input) {
  return input.length !==3 ? "Must enter up to 3 characters" : true;
}

function validateColor(input) {
  return input.length > 0 ? true : "Must enter a color";
}

function validateShape(input) {
  return input.length > 0 ? true : "Must choose a shape";
}

// Function to prompt the user for logo details using Inquirer
function promptUser() {
  inquirer
    .prompt([
      // Prompt for logo text
      {
        type: "input",
        message:
          "What text would you like your logo to display? (Enter up to three characters)",
        name: "text",
        validate: validateInput,       
      },
      // Prompt for text color
      {
        type: "input",
        message:
          "Choose text color (Enter color keyword OR a hexadecimal number)",
        name: "textColor",
        validate: validateColor,
      },
      // Prompt for shape choice
      {
        type: "list",
        message: "What shape would you like the logo to render?",
        choices: ["Triangle", "Square", "Circle"],
        name: "shape",
        validate: validateShape,
      },
      // Prompt for shape color
      {
        type: "input",
        message:
          "Choose shape's color (Enter color keyword OR a hexadecimal number)",
        name: "shapeBackgroundColor",
        validate: validateColor,
      },
    ])
    .then((answers) => {
      if (answers.text.length > 3) { // Error handling for text input length
        console.log("Must enter up to 3 characters");
        promptUser(); // Restart the prompt
      } else {
        writeToFile("logo.svg", answers); // Generate the SVG file using user's answers
      }
    });
}
// Start the application by calling the promptUser function
promptUser(); 






