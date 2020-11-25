// var, let, const
// Object Syntax
let o1 = {
    x: 0,
    y: 1,
    "radius": 100,
    area: function () {
        return Math.PI * this.radius * this.radius;
    }
};
console.log(typeof o1); // object
console.log(o1.x)
console.log(o1.y)
o1["radius"] += 50
console.log(o1['radius'])
console.log("Area: "+o1.area())
// Old Class Syntax
let Circle = function (x,y,radius){ // constructor
    this.x = x;
    this.y = y;
    this.radius = radius;
    this.area = function () {
        return Math.PI * this.radius * this.radius;
    }
    return this;
};
o1 = new Circle(0,0,100); // Object -> Class
console.log(o1['x'])
console.log(o1.y)
console.log(o1.radius)
console.log(o1.area())
let p = 'y';
console.log(o1[p]); // console.log(o1.y)
// New Class Syntax
class Cember {
    constructor(x,y,radius) { // constructor
        this.x = x;
        this.y = y;
        this.radius = radius;
    }
    area() {
        return Math.PI * this.radius * this.radius;
    }
};
o1 = new Cember(0,0,100); // Object -> Class
console.log(o1['x'])
console.log(o1.y)
console.log(o1.radius)
console.log(o1.area())
p = 'y';
console.log(o1[p]); // console.log(o1.y)

o1 = new Circle(0,0,100);
o2 = new Circle(0,0,100);
console.log(o1==o2)
console.log()
