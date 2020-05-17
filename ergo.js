(function() {
	let mouse_x = 0;
	let mouse_y = 0;
	const canvas = document.getElementById("canvas");
	const context = canvas.getContext("2d");

	window.onmousemove = function(e) {
		mouse_x = e.clientX;
		mouse_y = e.clientY;
	}

	window.onclick = function() {
		if(document.fullscreen) {
			document.exitFullscreen();
		}else {
			document.documentElement.requestFullscreen();
		}
	}

	function drawLine(context, x0, y0, x1, y1, color, width) {
		let prev_stroke_color = context.strokeStyle;
		let prev_stroke_width = context.lineWidth;

		context.beginPath();
		context.strokeStyle = color;
		context.lineWidth = width;
		context.moveTo(x0, y0);
		context.lineTo(x1, y1);
		context.stroke();

		context.strokeStyle = prev_stroke_color;
		context.lineWidth = prev_stroke_width;
	}

	setInterval(function() {
		context.canvas.width = window.innerWidth;
		context.canvas.height = window.innerHeight;

		context.fillStyle = "#969696";
		context.fillRect(0, 0, window.innerWidth, window.innerHeight);

		let div = 3;
		for(let i = 1; i < div; i++) {
			let part_height = window.innerHeight/div;
			drawLine(context, 0, part_height*i, window.innerWidth, part_height*i, "#00FF00", 5);
		}

		drawLine(context, window.innerWidth/2.0, 0, window.innerWidth/2.0, window.innerHeight, "#0000FF", 5);
		drawLine(context, 0, mouse_y, window.innerWidth, mouse_y, "#FF0000", 5);
	}, 16);
})();
