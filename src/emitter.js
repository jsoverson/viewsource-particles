
import Vector from './vector';
import Particle from './particle';

class Emitter {
  constructor(position, velocity, spread) {
    this.position = position || new Vector(0, 0);
    this.velocity = velocity || new Vector(0, 0);
    this.spread = spread || Math.PI / 16; // possible angles = velocity +/- spread
    this.emissionRate = 5;
  }

  render(context) {
    context.fillRect(this.position.x - 5, this.position.y - 5, 10, 10);
  }

  emitParticle() {
    // Use an angle randomized over the spread so we have more of a "spray"
    var angle = this.velocity.rad() + this.spread - (Math.random() * this.spread * 2);

    // The magnitude of the emitter's velocity
    var magnitude = this.velocity.length();

    // New velocity based off of the calculated angle and magnitude
    var velocity = Vector.fromAngle(angle, magnitude);

    // return our new Particle!
    return new Particle(this.position.clone(), velocity);
  }
}

export default Emitter;
