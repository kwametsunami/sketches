const canvasSketch = require('canvas-sketch');
// importing canvas utilities to use
const math = require('canvas-sketch-util/math');
const random = require('canvas-sketch-util/random');

const settings = {
  dimensions: [ 1080, 1080 ]
};

// these functions are already written in the canvas sister library, canvas-sketch-util

// function to convert degrees to radius 
const degToRad = (degrees) => {
  return degrees / 180 * Math.PI;
}

// function to give a random number between a range
const randomRange = (min, max) => {
  return Math.random() * (max - min) + min
}

const sketch = () => {
  return ({ context, width, height }) => {
    context.fillStyle = 'tomato';
    context.fillRect(0, 0, width, height);

    // context.strokeStyle = 'white'
    
    const cx = width * 0.5;
    const cy = height * 0.5;
    
    const w = width * 0.01;
    const h = height * 0.3;
    let x, y;
    
    const num = random.range(12, 36);
    const radius = width * 0.25;
    
    for (let i = 0; i < num; i++){
      
      const slice = math.degToRad(360 / num)
      const angle = slice * i + random.range(1, 360);
      
      x = cx + radius * Math.sin(angle)
      y = cy + radius * Math.cos(angle)
      
      context.save()
      context.translate(x,y)
      context.fillStyle = 'teal';
      context.lineWidth = random.range(2, 25)
      
      context.rotate(-angle);
      context.scale(random.range(0.1, 2), random.range(0.1, 1.5))
      const line = context.createLinearGradient(0, 100, w * random.range(1, 150), h);
      context.beginPath()
      context.rect(-w * 0.5, random.range(0, -h * 0.5), w, h);
      context.fill();
      context.restore();
      
      // new shape
      context.save();
      context.translate(cx, cy);
      context.rotate(angle * i);

      // start shape here
      context.lineWidth = random.range(5, 70);
      context.beginPath()
      context.arc(0, 0, random.range(radius * 0.7, radius * 1.3), slice * random.range(0, -10), slice * random.range(1, 5));
      line.addColorStop(0, 'white')
      line.addColorStop(0.5, 'tomato')
      line.addColorStop(1, 'darkblue')
      context.strokeStyle = line;
      context.stroke()

      context.restore()
    }

    const sh = width * 0.05
    const sw = width * 0.05
    const gap = width * 0.02;
    const ix = width * 0.025;
    const iy = height * 0.87;

    const off = width * 0.17;

    for (let i = 0; i < 15; i++) {
      for (let j = 0; j < 2; j++) {
        x = ix + (sw + gap) * i;
        y = iy + (sh + gap) * j;
        
        context.beginPath();
        context.rect(x, y, sw, sh);
        context.lineWidth = random.range(2.5, 12.5)
        context.strokeStyle = 'tan'
        // context.fillStyle('black')
        context.stroke();

        if (Math.random() > 0.7) {
          context.beginPath();
          context.rect(x + off / 2, y + off / 2, sw - off, sh - off);
          context.stroke();
        }
      }
    }
  };
};

canvasSketch(sketch, settings);
