let canvas = document.getElementById("canvas");
let ctx = canvas.getContext && canvas.getContext("2d");

// Simple "python" turtle
let turtle = {
  x: 0,
  y: 0,
  angle: 0,
  ctx,

  settings: {
    color: "#ffffff",
    width: 1,
  },

  moveTo: function (x, y) {
    this.x = x;
    this.y = y;
    return this;
  },
  forward: function (length) {
    let x0 = this.x,
      y0 = this.y;
    this.x += length * Math.sin(this.angle);
    this.y += length * Math.cos(this.angle);

    this.ctx.beginPath();
    this.ctx.strokeStyle = this.settings.color;
    this.ctx.lineWidth = this.settings.width;
    this.ctx.lineCap = "round";
    this.ctx.moveTo(x0, y0);
    this.ctx.lineTo(this.x, this.y);
    this.ctx.stroke();

    return this;
  },
  left: function (angleInDegrees) {
    this.angle += (angleInDegrees / 180) * Math.PI;
    return this;
  },
  right: function (angleInDegrees) {
    return this.left(-angleInDegrees);
  },
  color: function (color) {
    this.settings.color = color;
    return this;
  },
  width: function (width) {
    this.settings.width = width;
    return this;
  },
  clear: function () {
    this.ctx.clearRect(-10, -10, 1e5, 1e5);
    return this;
  },
  reset: function () {
    this.x = 0;
    this.y = 0;
    this.angle = 0;
    return this;
  },
};

function inv_seq(seq) {
  return seq.map((v) => (v === 0 ? 1 : 0)).reverse();
}

A0 = [];
function A(n) {
  return n > 0 ? [...inv_seq(A(n - 1)), 0, ...A(n - 1)] : A0;
}

function draw(n, centerX, centerY) {
  turtle.color("rgba(220, 220, 230, 1)").width(1).moveTo(centerX, centerY);

  let seg_len = 1;

  let angles = A(n - 1);
  console.log(angles);

  angles.forEach((a) => {
    turtle.forward(seg_len);
    if (a === 0) turtle.left(90);
    else turtle.right(90);
  });
  turtle.forward(seg_len);
  turtle.moveTo(centerX, centerY);
  angles.forEach((a) => {
    turtle.forward(seg_len);
    if (a === 0) turtle.left(90);
    else turtle.right(90);
  });
  turtle.forward(seg_len);
}

ctx.translate(0.5, 0.5);

let offsetX = -40;
let offsetY = 70;

let rangInput = document.getElementById("rang_input");
let drawButton = document.getElementById("draw_button");

drawButton.addEventListener("click", () => {
  turtle.clear().reset();
  draw(Number.parseInt(rangInput.value), 800 / 2 + offsetX, 600 / 2 + offsetY);
});
