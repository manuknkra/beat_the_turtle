//turn the sprite map into usable components
Crafty.sprite(16, "sprite.png", {
    grass1: [0, 0],
    grass2: [1, 0],
    grass3: [2, 0],
    grass4: [3, 0],
    flower: [0, 1],
    bush1: [0, 2],
    bush2: [1, 2],
    player: [0, 3],
    enemy: [0, 3],
    banana: [4, 0],
    empty: [4, 0]
});

window.onload = function () {
	//start crafty
	Crafty.init(600, 500);
	//Crafty.canvas.init();

	Crafty.scene("loading");
};

Crafty.scene("loading", function () {
    //load takes an array of assets and a callback when complete
    Crafty.load(["sprites.png"], function () {
        Crafty.scene("main"); //when everything is loaded, run the main scene
    });

    //black background with some loading text
    Crafty.e("2D, DOM, Text").attr({ w: 100, h: 20, x: 150, y: 120 })
            .text("Loading...")
            .css({ "text-align": "center" });
});

//automatically play the loading scene
Crafty.scene("main", function () {
    generateWorld();

});

//method to generate the map
function generateWorld() {
	Crafty.e("Turtle, 2D, DOM, Color, Collision")
	.color('rgb(0,255,0)')
	.attr({ x: 450, y: 480, w: 50, h: 20, 
		dX: Crafty.math.randomInt(2, 5), 
		dY: Crafty.math.randomInt(2, 5) })
	.bind('EnterFrame', function () {
		//this.rotation += Crafty.math.randomInt(8, 12);
		//this.rotation += -10;
		if (this.x <= 300 || this.x >= 500)
			this.dX *= -1;
		this.x += this.dX;
	});
	
	Crafty.e("Cannon, 2D, DOM, Color, Mouse, Collision")
	.color('rgb(0,255,255)')
	.attr({ x: 100, y: 450, w: 20, h: 50})
	.bind('EnterFrame', function () {
		this.rotation = 45;
	})
	.bind('Click', function () {
		Crafty.e("Bubble, 2D, DOM, Color,Gravity, Collision")
		.color('rgb(255,0,255)')
		.attr({ x: 100, y: 450, w: 20, h: 20, 
			dX: Crafty.math.randomInt(5, 8), 
			dY: Crafty.math.randomInt(5, 8) })
		.bind('EnterFrame', function () {
			this.rotation += Crafty.math.randomInt(8.0, 12.0);
			if (this.y >= 600)
				this.destroy();
			this.x += this.dX;
			this.y -= this.dY;
		})
		.gravity();
	});
}

