
import Vector from './vector';

class Particle {
  constructor(position, velocity, acceleration) {
    this.position = position || new Vector(0, 0);
    this.velocity = velocity || new Vector(0, 0);
    this.acceleration = acceleration || new Vector(0, 0);
  }

  render(context) {
    context.fillStyle = 'red';
    context.fillRect(this.position.x, this.position.y, 2, 2);
  }

  update() {
    // Add our current acceleration to our current velocity
    this.velocity.add(this.acceleration);

    // Add our current velocity to our position
    this.position.add(this.velocity);

    // zero out our acceleration
    this.acceleration.zero();
  }
}

export default Particle;
