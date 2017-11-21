var game = {
	init : function() {
		this.WIDTH  = window.innerWidth;
		this.HEIGHT = window.innerHeight;
		this.POINT_NUM = 60;
		this.MAX_LEN = 160;
    this.PI2 = Math.PI*2;
		this.point = [];
		this.mouse = {};
	},
	
	initCanvas : function() {
		this.canvas = document.createElement('canvas');
		this.ctx = this.canvas.getContext('2d');
    
		this.ctx.fillStyle = '#fff';
		this.ctx.strokeStyle = '#fff';
    
		this.canvas.width  = this.WIDTH;
		this.canvas.height = this.HEIGHT;
    
    document.body.appendChild(this.canvas);
	},
	
	initMouse : function() {
		this.mouse = { x : 0, y : 0 };
		
		document.onmousemove = function(e) {
			game.mouse.x = e.pageX;
			game.mouse.y = e.pageY;
		}
	},
	
	initPoints : function() {
		for (var i = 0; i < this.POINT_NUM; i++) {
			this.point[i] = new this.PointClass();
		}
	},
	
	setPoints : function() {
		for (var i = 0; i < this.POINT_NUM; i++) {
			this.point[i].setInitalPos();
			this.point[i].setInitalVal();
		}
	},
	
	updatePoints : function() {
		for (var i = 0; i < this.POINT_NUM; i++) {
			this.point[i].update();
			this.point[i].checkBorder();
		}
	},
	
	drawPoints : function() {
		for (var i = 0; i < this.POINT_NUM; i++) {
			this.point[i].draw();
		}
	},
	
	updateLines: function() {
		var dist = 0, dx = 0, dy = 0;
		for (var i = 0; i < this.POINT_NUM; i++) {
			dx = this.mouse.x - this.point[i].pos.x;
			dy = this.mouse.y - this.point[i].pos.y;
			dist = Math.sqrt(dx * dx + dy * dy);
      
		
			if (dist < this.MAX_LEN) {
				this.ctx.strokeStyle = 'rgba(255,255,255,' + (9000 / (dist*dist)) + ')';
                this.ctx.fillStyle= 'rgba(255,255,255,0.8)';
				this.ctx.beginPath();
				this.ctx.moveTo(this.point[i].pos.x, this.point[i].pos.y)
				this.ctx.lineTo(this.mouse.x, this.mouse.y);
       	this.ctx.stroke();
			};
      
		}
	},
	
	start : function() {
		this.init();
		this.initCanvas();
		this.initPoints();
		this.initMouse();
		this.setPoints();
	},
};

game.PointClass = function() {
	this.pos = {x : 0, y : 0};
	this.vel = {x : 0, y : 0};
	this.radius = Math.round(Math.random()*2) + 1;
};

game.PointClass.prototype = {
	setInitalPos : function() {
		this.pos.x = Math.round(Math.random() * game.WIDTH);
		this.pos.y = Math.round(Math.random() * game.HEIGHT);
	},
	
	setInitalVal : function() {
		this.vel.x = (Math.random()-0.5) * 0.4;
		this.vel.y = (Math.random()-0.5) * 0.4;
	},
	
	update : function() {
		this.updatePos();
	},

	updatePos : function() {
		this.pos.x += this.vel.x;
		this.pos.y += this.vel.y;
	},
	
	checkBorder : function() {
		if ( (this.pos.x > game.WIDTH) 
		||   (this.pos.x < 0) ) this.vel.x *= -1;
		if ( (this.pos.y > game.HEIGHT)
		||   (this.pos.y < 0) ) this.vel.y *= -1;
	},
	
	draw : function() {
		game.ctx.beginPath();
		game.ctx.arc(this.pos.x, this.pos.y, this.radius, 0, game.PI2, false);
		game.ctx.fill();
	}
};

game.start();
requestAnimationFrame(frame);

function frame() {
	requestAnimationFrame(frame);
	game.ctx.clearRect(0, 0, game.WIDTH, game.HEIGHT); 
	game.updatePoints();
	game.updateLines();
	game.drawPoints();
};