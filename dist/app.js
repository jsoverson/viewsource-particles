(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
"use strict";

var _interopRequire = function (obj) { return obj && obj.__esModule ? obj["default"] : obj; };

var ParticleSystem = _interopRequire(require("./system"));

var Vector = _interopRequire(require("./vector"));

var Emitter = _interopRequire(require("./emitter"));

var Particle = _interopRequire(require("./particle"));

function main() {
  "use strict";

  var container = document.getElementById("container");

  var system = new ParticleSystem(container.offsetWidth, container.offsetHeight);

  var canvas = document.createElement("canvas");
  canvas.width = container.offsetWidth;
  canvas.height = container.offsetHeight;
  var context = canvas.getContext("2d");
  container.appendChild(canvas);

  var system = new ParticleSystem(container.offsetWidth, container.offsetHeight);

  // system.emitters.push(new Emitter(new Vector(10, 10)));
  // system.particles.push(new Particle(new Vector(20, 20)));
  // system.particles.push(new Particle(new Vector(10, 20)));
  // system.particles.push(new Particle(new Vector(20, 10)));
  //
  system.addEmitter(360, 230);
  system.addField(410, 290, 1.5);
  //system.addField(400, 280, 3);

  window.system = system;

  function loop() {
    system.update();
    system.draw(context);
    window.requestAnimationFrame(loop);
  }
  loop();

  window.addEventListener("resize", resize);
  resize();
  function resize() {
    system.resize(container.offsetWidth, container.offsetHeight);
  }
}

main();

module.exports = main;

},{"./emitter":2,"./particle":4,"./system":5,"./vector":6}],2:[function(require,module,exports){
"use strict";

var _interopRequire = function (obj) { return obj && obj.__esModule ? obj["default"] : obj; };

var _createClass = (function () { function defineProperties(target, props) { for (var key in props) { var prop = props[key]; prop.configurable = true; if (prop.value) prop.writable = true; } Object.defineProperties(target, props); } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

var _classCallCheck = function (instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } };

var Vector = _interopRequire(require("./vector"));

var Particle = _interopRequire(require("./particle"));

var Emitter = (function () {
  function Emitter(position, velocity, spread) {
    _classCallCheck(this, Emitter);

    this.position = position || new Vector(0, 0);
    this.velocity = velocity || new Vector(0, 0);
    this.spread = spread || Math.PI / 16; // possible angles = velocity +/- spread
    this.emissionRate = 5;
  }

  _createClass(Emitter, {
    render: {
      value: function render(context) {
        context.fillRect(this.position.x - 5, this.position.y - 5, 10, 10);
      }
    },
    emitParticle: {
      value: function emitParticle() {
        // Use an angle randomized over the spread so we have more of a "spray"
        var angle = this.velocity.rad() + this.spread - Math.random() * this.spread * 2;

        // The magnitude of the emitter's velocity
        var magnitude = this.velocity.length();

        // New velocity based off of the calculated angle and magnitude
        var velocity = Vector.fromAngle(angle, magnitude);

        // return our new Particle!
        return new Particle(this.position.clone(), velocity);
      }
    }
  });

  return Emitter;
})();

module.exports = Emitter;

},{"./particle":4,"./vector":6}],3:[function(require,module,exports){
"use strict";

var _interopRequire = function (obj) { return obj && obj.__esModule ? obj["default"] : obj; };

var _createClass = (function () { function defineProperties(target, props) { for (var key in props) { var prop = props[key]; prop.configurable = true; if (prop.value) prop.writable = true; } Object.defineProperties(target, props); } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

var _get = function get(object, property, receiver) { var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { return get(parent, property, receiver); } } else if ("value" in desc && desc.writable) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } };

var _classCallCheck = function (instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } };

var Vector = _interopRequire(require("./vector"));

var Field = (function () {
  function Field(position, mass) {
    _classCallCheck(this, Field);

    _get(Object.getPrototypeOf(Field.prototype), "constructor", this).call(this);
    this.position = position || new Vector(0, 0);
    this.size = 15;
    this.mass = 0;
    this.width = 16;
    this.height = 16;
    this.setMass(mass);
  }

  _createClass(Field, {
    render: {
      value: function render(context) {
        context.fillStyle = this.color;
        context.fillRect(this.position.x - 5, this.position.y - 5, 10, 10);
      }
    },
    setMass: {
      value: function setMass(mass) {
        this.mass = mass;
        if (mass < 0) {
          this.color = "red";
        } else {
          this.color = "green";
        }
        return this;
      }
    },
    affect: {
      value: function affect(particle) {
        var vectorX = this.position.x - particle.position.x;
        var vectorY = this.position.y - particle.position.y;
        var distanceSq = vectorX * vectorX + vectorY * vectorY;
        var force = this.mass / distanceSq;
        // var force = this.mass / Math.pow((vectorX*vectorX+this.mass/2+vectorY*vectorY+this.mass/2),1.5);
        particle.acceleration.x += vectorX * force;
        particle.acceleration.y += vectorY * force;
        return particle;
      }
    }
  });

  return Field;
})();

module.exports = Field;

},{"./vector":6}],4:[function(require,module,exports){
"use strict";

var _interopRequire = function (obj) { return obj && obj.__esModule ? obj["default"] : obj; };

var _createClass = (function () { function defineProperties(target, props) { for (var key in props) { var prop = props[key]; prop.configurable = true; if (prop.value) prop.writable = true; } Object.defineProperties(target, props); } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

var _classCallCheck = function (instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } };

var Vector = _interopRequire(require("./vector"));

var Particle = (function () {
  function Particle(position, velocity, acceleration) {
    _classCallCheck(this, Particle);

    this.position = position || new Vector(0, 0);
    this.velocity = velocity || new Vector(0, 0);
    this.acceleration = acceleration || new Vector(0, 0);
  }

  _createClass(Particle, {
    render: {
      value: function render(context) {
        context.fillStyle = "red";
        context.fillRect(this.position.x, this.position.y, 2, 2);
      }
    },
    update: {
      value: function update() {
        // Add our current acceleration to our current velocity
        this.velocity.add(this.acceleration);

        // Add our current velocity to our position
        this.position.add(this.velocity);

        // zero out our acceleration
        this.acceleration.zero();
      }
    }
  });

  return Particle;
})();

module.exports = Particle;

},{"./vector":6}],5:[function(require,module,exports){
"use strict";

var _interopRequire = function (obj) { return obj && obj.__esModule ? obj["default"] : obj; };

var _createClass = (function () { function defineProperties(target, props) { for (var key in props) { var prop = props[key]; prop.configurable = true; if (prop.value) prop.writable = true; } Object.defineProperties(target, props); } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

var _classCallCheck = function (instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } };

var Vector = _interopRequire(require("./vector"));

var Emitter = _interopRequire(require("./emitter"));

var Field = _interopRequire(require("./field"));

var ParticleSystem = (function () {
  function ParticleSystem() {
    var width = arguments[0] === undefined ? 100 : arguments[0];
    var height = arguments[1] === undefined ? 100 : arguments[1];

    _classCallCheck(this, ParticleSystem);

    this.maxParticles = 40000;
    this.particles = [];
    this.emitters = [];
    this.fields = [];
    this.width = width;
    this.height = height;
    this.submitParticleToFields = function () {};
  }

  _createClass(ParticleSystem, {
    resize: {
      value: function resize(w, h) {
        this.width = w;
        this.height = h;
        return this;
      }
    },
    addEmitter: {
      value: function addEmitter() {
        var x = arguments[0] === undefined ? 0 : arguments[0];
        var y = arguments[1] === undefined ? 0 : arguments[1];
        var velX = arguments[2] === undefined ? 1 : arguments[2];
        var velY = arguments[3] === undefined ? 0 : arguments[3];

        var emitter = new Emitter(new Vector(x, y), new Vector(velX, velY));
        this.emitters.push(emitter);
        return this;
      }
    },
    addField: {
      value: function addField() {
        var x = arguments[0] === undefined ? 0 : arguments[0];
        var y = arguments[1] === undefined ? 0 : arguments[1];
        var mass = arguments[2] === undefined ? 100 : arguments[2];

        var field = new Field(new Vector(x, y), mass);
        this.fields.push(field);
        var fns = this.fields.map(function (field) {
          return field.affect.bind(field);
        });

        this.submitParticleToFields = fns.reduce(function (lastfn, nextfn) {
          return function (particle) {
            return lastfn(nextfn(particle));
          };
        });

        return this;
      }
    },
    update: {
      value: function update() {
        var _this = this;

        if (this.particles.length < this.maxParticles) {
          this.emitters.forEach(function (emitter) {
            for (var i = 0; i < emitter.emissionRate; i++) {
              _this.particles.push(emitter.emitParticle());
            }
          });
        }

        var submitToFields = this.submitParticleToFields.bind(this);

        this.particles = this.particles.filter(function (particle) {
          submitToFields(particle);
          particle.update();
          var pos = particle.position;
          var outOfBounds = pos.x > _this.width || pos.y > _this.height || pos.x < 0 || pos.y < 0;
          return !outOfBounds;
        });
      }
    },
    draw: {
      value: function draw(context) {
        context.clearRect(0, 0, this.width, this.height);

        context.fillStyle = "blue";
        this.emitters.forEach(function (emitter) {
          return emitter.render(context);
        });

        this.fields.forEach(function (field) {
          return field.render(context);
        });

        context.fillStyle = "red";
        this.particles.forEach(function (particle) {
          return particle.render(context);
        });
      }
    }
  });

  return ParticleSystem;
})();

module.exports = ParticleSystem;

},{"./emitter":2,"./field":3,"./vector":6}],6:[function(require,module,exports){
"use strict";

var _createClass = (function () { function defineProperties(target, props) { for (var key in props) { var prop = props[key]; prop.configurable = true; if (prop.value) prop.writable = true; } Object.defineProperties(target, props); } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

var _classCallCheck = function (instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } };

var Vector = (function () {
  function Vector(x, y) {
    _classCallCheck(this, Vector);

    this.x = x || 0;
    this.y = y || 0;
  }

  _createClass(Vector, {
    add: {
      value: function add(v) {
        this.x += v.x;
        this.y += v.y;
        return this;
      }
    },
    rad: {
      value: function rad() {
        return Math.atan2(this.y, this.x);
      }
    },
    length: {
      value: function length(v) {
        return Math.sqrt(this.x * this.x + this.y * this.y);
      }
    },
    clone: {
      value: function clone() {
        return new Vector(this.x, this.y);
      }
    },
    zero: {
      value: function zero() {
        this.x = 0;
        this.y = 0;
        return this;
      }
    }
  }, {
    fromAngle: {
      value: function fromAngle(angle, magnitude) {
        return new Vector(magnitude * Math.cos(angle), magnitude * Math.sin(angle));
      }
    }
  });

  return Vector;
})();

//
//Vector.prototype.clone = function () {
//  return new Vector(this.x, this.y);
//};
//
//Vector.prototype.add = function (v) {
//  this.x += v.x;
//  this.y += v.y;
//  return this;
//};

//Vector.prototype.sub = function (v) {
//  this.x -= v.x;
//  this.y -= v.y;
//  return this;
//};
//
//Vector.prototype.invert = function (v) {
//  this.x *= -1;
//  this.y *= -1;
//  return this;
//};
//
//Vector.prototype.multiplyScalar = function (s) {
//  this.x *= s;
//  this.y *= s;
//  return this;
//};
//
//Vector.prototype.divideScalar = function (s) {
//  if (s === 0) {
//    this.x = 0;
//    this.y = 0;
//  } else {
//    var invScalar = 1 / s;
//    this.x *= invScalar;
//    this.y *= invScalar;
//  }
//  return this;
//};
//
//Vector.prototype.dot = function (v) {
//  return this.x * v.x + this.y * v.y;
//};
//
//Vector.prototype.length = function (v) {
//  return Math.sqrt(this.x * this.x + this.y * this.y);
//};
//
//Vector.prototype.lengthSq = function () {
//  return this.x * this.x + this.y * this.y;
//};
//
//Vector.prototype.normalize = function () {
//  return this.divideScalar(this.length());
//};
//
//Vector.prototype.distanceTo = function (v) {
//  return Math.sqrt(this.distanceToSq(v));
//};
//
//Vector.prototype.distanceToSq = function (v) {
//  var dx = this.x - v.x, dy = this.y - v.y;
//  return dx * dx + dy * dy;
//};
//
//Vector.prototype.set = function (x, y) {
//  this.x = x;
//  this.y = y;
//  return this;
//};
//
//Vector.prototype.setX = function (x) {
//  this.x = x;
//  return this;
//};
//
//Vector.prototype.setY = function (y) {
//  this.y = y;
//  return this;
//};
//
//Vector.prototype.setLength = function (l) {
//  var oldLength = this.length();
//  if (oldLength !== 0 && l !== oldLength) {
//    this.multiplyScalar(l / oldLength);
//  }
//  return this;
//};
//
//Vector.prototype.invert = function (v) {
//  this.x *= -1;
//  this.y *= -1;
//  return this;
//};
//
//Vector.prototype.lerp = function (v, alpha) {
//  this.x += (v.x - this.x) * alpha;
//  this.y += (v.y - this.y) * alpha;
//  return this;
//};
//
//Vector.prototype.rad = function () {
//  return Math.atan2(this.y, this.x);
//};
//
//Vector.prototype.deg = function () {
//  return this.rad() * 180 / Math.PI;
//};
//
//Vector.prototype.equals = function (v) {
//  return this.x === v.x && this.y === v.y;
//};
//
//Vector.prototype.rotate = function (theta) {
//  var xtemp = this.x;
//  this.x = this.x * Math.cos(theta) - this.y * Math.sin(theta);
//  this.y = xtemp * Math.sin(theta) + this.y * Math.cos(theta);
//  return this;
//};
//
//Vector.fromAngle = function (angle, magnitude) {
//  return new Vector(magnitude * Math.cos(angle), magnitude * Math.sin(angle));
//};

module.exports = Vector;

},{}]},{},[1]);
