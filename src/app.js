
import ParticleSystem from './system';

import Vector from './vector';
import Emitter from './emitter';
import Particle from './particle';

function main() {
  "use strict";

  var container = document.getElementById('container');

  var system = new ParticleSystem(container.offsetWidth,container.offsetHeight);

  var canvas = document.createElement('canvas');
  canvas.width = container.offsetWidth;
  canvas.height = container.offsetHeight;
  var context = canvas.getContext('2d');
  container.appendChild(canvas);

  var system = new ParticleSystem(container.offsetWidth,container.offsetHeight);

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

  window.addEventListener('resize', resize);
  resize();
  function resize() {
    system.resize(container.offsetWidth, container.offsetHeight);
  }

}

main();

export default main;
