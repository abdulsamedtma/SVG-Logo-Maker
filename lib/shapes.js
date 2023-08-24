class Shape{
  // Defines a class called Shape which has a constructor intializing 'color' and sets the 'color' value.
  
      constructor(){
          this.color=''
      }
      setColor(color){
          this.color=(color);
      }
  }
  // Defines a Circle class that extends Shape and renders an SVG Circle with position, size, and fill color based on the current instance's properties.
  class Circle extends Shape{
      render(){
          return `<circle cx="50%" cy="50%" r="100" height="100%" width="100%" fill="${this.color}">`
      }
  }
  // Defines a Square class that extends Shape and renders an SVG Square with position, size, and fill color based on the current instance's properties.
  class Square extends Shape{
      render(){
          return `<rect x="50" height="200" width="200" fill="${this.color}">`
      }
  }
  // Defines a Triangle(Polygon) class that extends Shape and renders an SVG Triangle(Polygon) with position, size, and fill color based on the current instance's properties.
  class Triangle extends Shape{
      render(){
          //return `<polygon height="100%" width="100%" points="25,75 75,25 25,25" fill="${this.color}">'
          return `<polygon height="100%" width="100%" points="0,200 300,200 150,0" fill="${this.color}">`
      }
  };
  
  module.exports = {Circle, Square, Triangle}







/*// Defi class named shape which has a constructor that takes in a color property and sets it to an empty string
class Shape {
  constructor() {
    this.color = "";
  }
  // Shape class takes in setColor function
  setColor(colorVar) {
    this.color = colorVar;
  }
}

// Triangle class inherits properties defined in Shape class
class Triangle extends Shape {
  render() {
    // Returns polygon with color input
    return `<polygon points="150, 25 50, 175 250, 175" fill="${this.color}" />`;
  }
}

// Square class inherits properties defined in Shape class
class Square extends Shape {
  render() {
    // Returns polygon with color input
    return `<rect x="73" y="40" width="160" height="160" fill="${this.color}" />`;
  }
}

// Circle class inherits properties defined in Shape class
class Circle extends Shape {
  render() {
    // Returns polygon with color input
    return `<circle cx="150" cy="100" r="75" fill="${this.color}" />`;
  }
}

// Exports classes (Square, Triangle, Circle)
module.exports = { Triangle, Square, Circle }; */
