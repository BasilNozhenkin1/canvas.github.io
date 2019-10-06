import { canvas, grid, settings }  from './main.js';

var Model = {
  'counter': {
    'red': 1,
    'yellow': 1
  },
  'multiplicator': {
    'rr': 1,
    'yy': 1,
    'ry': 2,
    'yr': 1
  },
  'interactions': {
    'rr': 0,
    'yy': 0,
    'ry': 0,
    'yr': 0
  },
  'coordinates': [{'x':1, 'y':1, 't':'r'}, {'x':2, 'y':1, 't':'y'}]
};

var View = {
      init: function() {
          var dw = settings.widthSize,
              dh = settings.heightSize;

          canvas.init();
          grid.init();
      },
      update: function() {
        grid.update(Model.coordinates);
      },
      destroy: function() {
        canvas.delete();
      }
};

var Controller = {
    init: function() {
        View.init();
        View.update();
    },
    handleStep: function() {
      Model.interactions = {'rr': 0, 'yy': 0, 'ry': 0, 'yr': 0 }
      var random = function(min, max) {
        min = Math.ceil(min);
        max = Math.floor(max);
        return Math.floor(Math.random() * (max - min + 1)) + min; 
      };
      /*Движение
      */
      /*Model.coordinates.forEach(coord => {
        coord.x = random(1, settings.width);
        coord.y = random(1, settings.height);
      });*/
      Model.coordinates.forEach(coord  => {
        var neighbours = Model.coordinates.filter(item => item.x === coord.x+1 && item.y === coord.y+1 ||
                                                 item.x === coord.x+1 && item.y === coord.y ||
                                                 item.x === coord.x+1 && item.y === coord.y-1 ||
                                                 item.x === coord.x-1 && item.y === coord.y+1 ||
                                                 item.x === coord.x-1 && item.y === coord.y ||
                                                 item.x === coord.x-1 && item.y === coord.y-1 ||
                                                 item.x === coord.x && item.y === coord.y+1 ||
                                                 item.x === coord.x && item.y === coord.y-1);
 
        neighbours.forEach(n => {
          (coord.t === 'r' && n.t === 'r') ? Model.interactions.rr++ : null;
          (coord.t === 'r' && n.t === 'y') ? Model.interactions.ry++ : null;
          (coord.t === 'y' && n.t === 'r') ? Model.interactions.yr++ : null;
          (coord.t === 'y' && n.t === 'y') ? Model.interactions.yy++ : null;
        })
      });
      /*
      Размножение
      */
      for (var i in Model.interactions) {
        if (i === 'rr' || i == 'ry') {
          for (var j = 0, l = Model.interactions[i]* Model.multiplicator[i]; j < l; j++) {
            Model.coordinates.push({'x': random(1, settings.width),
                                    'y': random(1, settings.height),
                                    't': 'r'});
          }
        }
        else if(i === 'yy' || i === 'yr') {
          for (var j = 0, l = Model.interactions[i]* Model.multiplicator[i]; j < l; j++) {
            Model.coordinates.push({'x': random(1, settings.width),
                                    'y': random(1, settings.height),
                                    't': 'y'});
          }
        }
        View.update();

      }
      //window.requestAnimationFrame(handleStep.bind(this));
    },
    handleSteps: function() {
      setInterval(this.handleStep, 1000);
    }


};

Controller.init();
Controller.handleSteps();
