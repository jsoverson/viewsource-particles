
import Vector from './vector';

import Emitter from './emitter';
import Field from './field';

class ParticleSystem {
  constructor(width = 100, height = 100) {
    this.maxParticles = 40000;
    this.particles = [];
    this.emitters = [];
    this.fields = [];
    this.width = width;
    this.height = height;
    this.submitParticleToFields = function() {};
  }

  resize(w,h) {
    this.width = w;
    this.height = h;
    return this;
  }

  addEmitter(x = 0, y = 0, velX = 1, velY = 0) {
    var emitter = new Emitter(new Vector(x,y), new Vector(velX, velY));
    this.emitters.push(emitter);
    return this;
  }

  addField(x = 0, y = 0, mass = 100) {
    var field = new Field(new Vector(x,y), mass);
    this.fields.push(field);
    var fns = this.fields.map(field => field.affect.bind(field));

    this.submitParticleToFields = fns.reduce((lastfn, nextfn)=> {
      return function(particle){return lastfn(nextfn(particle))}
    });

    return this;
  }

  update() {
    if (this.particles.length < this.maxParticles) {
      this.emitters.forEach(emitter => {
        for (let i = 0; i < emitter.emissionRate; i++) this.particles.push(emitter.emitParticle())
      })
    }

    var submitToFields = this.submitParticleToFields.bind(this);

    this.particles = this.particles.filter(particle => {
      submitToFields(particle);
      particle.update();
      let pos = particle.position;
      let outOfBounds = pos.x > this.width || pos.y > this.height ||
                        pos.x < 0 || pos.y < 0
      return !outOfBounds;
    })

  }

  draw(context) {
    context.clearRect(0, 0, this.width, this.height);

    context.fillStyle = 'blue';
    this.emitters.forEach(emitter => emitter.render(context));

    this.fields.forEach(field => field.render(context));

    context.fillStyle = 'red';
    this.particles.forEach(particle => particle.render(context));
  }

}

export default ParticleSystem;
