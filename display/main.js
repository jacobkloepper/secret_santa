// Jacob Kloepper
// November 24, 2020

// So, I don't really know a thing about web development.
// I gathered enough info on html to get by, and I'm riding on Processing knowledge from high school
// The most interesting parts of this repo are the de/encryption .cpp files.
// This /works/ for a fun, covid-compliant secret santa event.

// This file is sanitized of personal information.

// Globals
var img0;
var img1;
var img2;
var img3;
var img4;

var bg;

var link;

function preload_img() {
	img0 = loadImage("data/images/img0.png");
	img1 = loadImage("data/images/img1.png");
	img2 = loadImage("data/images/img2.png");
	img3 = loadImage("data/images/img3.png");
	img4 = loadImage("data/images/img4.png");

	bg = loadImage("data/images/bg.jpg");

}

// Depending on canvas size, implement the positions you want.
function preload_faces() {
	user0 = new Face(img0, "Person0", X, Y);
	user1 = new Face(img1, "Person1", X, Y);
	user2 = new Face(img2, "Person2", X, Y);
	user3 = new Face(img3, "Person3", X, Y);
	user4 = new Face(img4, "Person4", X, Y);

}

function setup() {
	createCanvas(1360, 768);

	preload_img();
	preload_faces();

}


function draw() {
	background(bg);

	// Show faces
	user0.show();
	user1.show();
	user2.show();
	user3.show();
	user4.show();


}

class Face {
	constructor(img, label, x, y) {
		this.img = img;
		this.label = label;
		this.x = x;
		this.y = y;
		this.link = createA("PATH/" + this.label, this.label, "_self");
	}

	show() {
		// Display image
		this.img.resize(220,0);
		image(this.img, this.x, this.y);
		
		// Display button
		rectMode(CENTER);
		fill(220);
		rect(this.x+this.img.width/2, this.y+this.img.height+this.link.height/2+5, this.link.width+15, this.link.height+4, 20);
		this.link.position(this.x+this.img.width/2-this.link.width/2,this.y+this.img.height+5);
	}
}
