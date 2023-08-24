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






