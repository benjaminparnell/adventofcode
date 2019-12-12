function sumAbsolute(values) {
  return values.map(Math.abs).reduce((memo, value) => memo + value, 0);
}

class Moon {
  constructor(position, velocity = { x: 0, y: 0, z: 0 }) {
    this.position = position;
    this.velocity = velocity;
  }

  applyVelocity() {
    this.position = Object.keys(this.position).reduce(
      (newPosition, axis) => ({
        ...newPosition,
        [axis]: this.position[axis] + this.velocity[axis]
      }),
      {}
    );
  }

  getTotalEnergy() {
    return (
      sumAbsolute(Object.values(this.position)) *
      sumAbsolute(Object.values(this.velocity))
    );
  }
}

class System {
  constructor(moons) {
    this.moons = moons;
  }

  applyGravity(moonA, moonB) {
    ["x", "y", "z"].forEach(axis => {
      if (moonA.position[axis] > moonB.position[axis]) {
        moonA.velocity[axis]--;
        moonB.velocity[axis]++;
      } else if (moonA.position[axis] < moonB.position[axis]) {
        moonA.velocity[axis]++;
        moonB.velocity[axis]--;
      }
    });
  }

  step() {
    for (let i = 0; i < this.moons.length; i++) {
      for (let j = i + 1; j < this.moons.length; j++) {
        this.applyGravity(this.moons[i], this.moons[j]);
      }
      this.moons[i].applyVelocity();
    }
  }

  getTotalEnergy() {
    return sumAbsolute(this.moons.map(moon => moon.getTotalEnergy()));
  }
}

const Io = new Moon({ x: -7, y: -1, z: 6 });
const Europa = new Moon({ x: 6, y: -9, z: -9 });
const Ganymede = new Moon({ x: -12, y: 2, z: -7 });
const Callisto = new Moon({ x: 4, y: -17, z: -12 });
const moons = [Io, Europa, Ganymede, Callisto];
const system = new System(moons);

for (let step = 0; step < 1000; step++) {
  system.step();
}

// Task one
console.log(system.getTotalEnergy());
