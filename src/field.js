
import Vector from './vector';

class Field {
  constructor(position, mass) {
    super();
    this.position = position || new Vector(0,0);
    this.size = 15;
    this.mass = 0;
    this.width = 16;
    this.height = 16;
    this.setMass(mass);
  }

  render(context) {
    context.fillStyle = this.color;
    context.fillRect(this.position.x - 5, this.position.y - 5, 10, 10);
  }

  setMass(mass) {
    this.mass = mass;
    if (mass < 0) {
      this.color = 'red';
    } else {
      this.color = 'green';
    }
    return this;
  }

  affect(particle){
    var vectorX = this.position.x - particle.position.x;
    var vectorY = this.position.y - particle.position.y;
    var distanceSq = vectorX * vectorX + vectorY * vectorY;
    var force = this.mass/distanceSq;
    // var force = this.mass / Math.pow((vectorX*vectorX+this.mass/2+vectorY*vectorY+this.mass/2),1.5);
    particle.acceleration.x += vectorX * force;
    particle.acceleration.y += vectorY * force;
    return particle;
  }
}

export default Field;
