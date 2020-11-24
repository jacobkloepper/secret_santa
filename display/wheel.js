// Jacob Kloepper
// November 24, 2020

// This file is sanitized of personal information.

// Each image represents a participent.
// 4 shown here, you can have n users.
var img0;
var img1;
var img2;
var img3;
var img4;

let users = [];
var bg;

var acceleration;

let recipients = [];
var num;
var angle_offset;

function preload_img() {
	img0 = loadImage("data/images/img0.png");
	img1 = loadImage("data/images/img1.png");
	img2 = loadImage("data/images/img2.png");
	img3 = loadImage("data/images/img3.png");
	img4 = loadImage("data/images/img4.png");

	bg = loadImage("data/images/bg.jpg");

}

// Each image should be a face put on a uniquely coloured background. Then, have the background of each wedge match that colour.
function preload_wedges() {
	user0 = new Wedge(img0, 0, '#8b0000', angle_offset);
	user1 = new Wedge(img1, 1, '#ff781f', angle_offset);
	user2 = new Wedge(img2, 2, '#7f62c0', angle_offset);
	user3 = new Wedge(img3, 3, '#27cf7a', angle_offset);
	user4 = new Wedge(img4, 4, '#a28376', angle_offset);

}

// Used in Wedge constructor. Lets you choose which wedge is landed on anonymously.
function get_angle_offset() {
	if (recipients[num] == "Person0") {
		angle_offset = 0;
	} else if (recipients[num] == "Person1") {
		angle_offset = 2;
	} else if (recipients[num] == "Person2") {
		angle_offset = 4;
	} else if (recipients[num] == "Person3") {
		angle_offset = 6;
	} else if (recipients[num] == "Person4") {
		angle_offset = 8;
	} else {
		angle_offset = 0;
	}
}

// TODO: You implement the path.
function preload() {
		recipients = loadStrings(path_to_shuffled_data_file);
}

function setup() {
	createCanvas(1360, 768);
	// TODO: Which user does this .js belong to? (Number of user in input.txt, 0-indexed)
	num = 5;

	get_angle_offset();
	print(recipients[num]);

	preload_img();
	preload_wedges();

	acceleration = PI/48;

	users.push(user0);
	users.push(user1);
	users.push(user2);
	users.push(user3);
	users.push(user4);

}

function draw() {
	imageMode(CORNER);
	background(bg);
	imageMode(CENTER);

	if (acceleration <= 0) {
		push();
		fill(255);
		rectMode(CENTER);
		rect(800+75, height/2-12, 200, 50, 20);
		textSize(32);
		fill(0);
		text(recipients[num], 800, height/2);
		pop();
	}

	// Wheel
	fill(0);
	ellipse(350, 384, 500);

	// Show wedges

	for (let i = 0; i < 12; i++) {
		users[i].show();
		if (acceleration > 0) {
			users[i].decelerate();
		}
	}

	// Wheel border
	push();
	noFill();
	stroke('#FFD700')
	strokeWeight(20);
	ellipse(350, 384, 500);
	pop();

	push();
	fill(200, 0, 0);
	triangle(350, 164, 355, 104, 345, 104);
	pop();

}

class Wedge {
	constructor(img, pos, colour, angle_offset) {
		this.img = img;
		this.angle_offset = angle_offset;
		this.angle = (PI/6*pos)+(this.angle_offset*PI/12);
		this.colour = colour;
	}

	show() {
		this.img.resize(60,0);

		push();

		translate(350, 384);

		rotate(this.angle);

		fill(this.colour);
		noStroke();
		triangle(0,0, -250*sin(PI/12), 250*cos(PI/12),250*sin(PI/12), 250*cos(PI/12))
		stroke(1);
		line(0, 0, -250*sin(PI/12), 250*cos(PI/12));
		line(0, 0, 250*sin(PI/12), 250*cos(PI/12));

		image(this.img, 0, 200);

		this.angle += acceleration;

		pop();

	}

	decelerate() {
		acceleration -= PI/240000;
	}
}
