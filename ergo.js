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

	function drawText(context, text, x, y, font, size, color) {
		let prev_font = context.font;
		let prev_color = context.fillStyle;

		context.font = size.toString() + "px " + font;
		context.fillStyle = color;
		context.fillText(text, x, y);

		context.font = prev_font;
		context.fillStyle = prev_color;
	}

	function measureTextWidth(context, text, font, size) {
		let result = 0.0;
		let prev_font = context.font;

		context.font = size.toString() + "px " + font;
		result = context.measureText(text).width;
		context.font = prev_font;

		return result;
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

		let str = "hello";
		let str_font = "serif";
		let str_size = 120;
		let text_width = measureTextWidth(context, str, str_font, str_size);

		drawText(context, str, window.innerWidth/2.0 - text_width/2.0, mouse_y + str_size/4.0, str_font, str_size, "#000000");
	}, 16);
})();
