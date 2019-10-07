var settings = {
	width: 10,
	height: 10,
	widthSize: 20,
	heightSize: 20,
	mainTile: 'Tiles/black.png'
};

var canvas = {
	init: function() {
		var el  = document.createElement('canvas');
		el.id = 'canvas';
		el.width = settings.widthSize*settings.width;
		el.height = settings.heightSize*settings.height;
		el.context = el.getContext('2d');
		document.body.appendChild(el);
		settings.context = el.context;
	},
	clearAll: function() {
		var el = document.querySelector('#canvas');
		document.body.removeChild(el);
	},
	clearArea: function(xMin, xMax, yMin, yMax) {
        var ctx = settings.context;

		var dw = settings.widthSize,
			dh = settings.heightSize;

    var tile = new Image();
		tile.src = settings.mainTile;

        for (var i = xMin; i <= xMax; i++) {
        	for (var j = yMin; j <= yMax; j++) {
        		ctx.drawImage(tile, i*dw, j*dh, dw, dh);
        	}
        }
	}
};

var grid = (function() {
	var w = settings.width,
		h = settings.height,
		dw = settings.widthSize,
		dh = settings.heightSize,
		mt = settings.mainTile;

	var init = function() {
		var ctx = settings.context;

		var tile = new Image();
		tile.src = mt;

		tile.onload = function () {
			for (var i = 0; i <= w; i++) {
				for (var j = 0; j <= h; j++) {
					ctx.drawImage(tile, i*dw, j*dh, dw, dh);
				};
			}
		};

	};
	var deleteEl = function(x, y) {
		var ctx = settings.context;

		var dw = settings.widthSize,
			dh = settings.heightSize;

		var x1 = x*dw,
			y1 = y*dh;

		ctx.clearRect(x1,y1,dw,dh);
	};
	var drawEl = function(x, y, className) {
		var ctx = settings.context;
		var tile = new Image();

		tile.className = className;
		tile.src = 'Tiles/'+className+'.png';
		tile.onload = function () {
			ctx.drawImage(tile, x*dw, y*dh, dw, dh);
		};
	};
	var update = function(coordinates) {
		
		canvas.clearArea(0, settings.width, 0, settings.height);
		var ctx = settings.context;
		var tile = new Image();

		for (var i = 0, l = coordinates.length; i < l; i++) {
			drawEl(coordinates[i].x, coordinates[i].y, coordinates[i].t);
		}
	}
	//excludingX, excludingY
	var drawArea = function(xMin, xMax, yMin, yMax, tileName, dw, dh) {
		var ctx = settings.context;

		var tile = new Image();
		tile.src = 'Tiles/'+tileName+'.png';;

		var iNew = 0,
		    jNew = 0;

		tile.onload = function () {
			for (var i = xMin; i < xMax; i++) {
				for (var j = yMin; j < yMax; j++) {
					iNew = i+1,
					jNew = j+1;

					ctx.drawImage(tile, i*dw, j*dh, dw, dh);
					ctx.drawImage(tile, iNew*dw, j*dh, dw, dh);
					ctx.drawImage(tile, iNew*dw, jNew*dh, dw, dh);
					ctx.drawImage(tile, i*dw, jNew*dh, dw, dh);
				}
			}
		}
	};

	//export public methods
	return {
		init:init,
		update: update,
		drawEl: drawEl,
		deleteEl: deleteEl,
		drawArea: drawArea,
	};
})();


export { canvas, grid, settings };
