// "python" turtle

function create_turtle(ctx) {
  return {
    x: 0,
    y: 0,
    angle: 0,
    ctx,

    color: "#ffffff",
    width: 1,

    move_to: function (x, y) {
      this.x = x;
      this.y = y;
      return this;
    },
    forward: function (length) {
      let [x0, y0] = [this.x, this.y];
      this.x += length * Math.sin(this.angle);
      this.y += length * Math.cos(this.angle);

      this.ctx.lineWidth = this.width;
      this.ctx.strokeStyle = this.color;
      this.ctx.beginPath();
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
    dot: function (size = 1, color) {
      this.ctx.beginPath();
      this.ctx.arc(this.x, this.y, size * 2, 0, 2 * Math.PI, false);
      this.ctx.fillStyle = color;
      this.ctx.fill();
      return this;
    },
    set_color: function (color) {
      this.color = color;
      return this;
    },
    set_width: function (width) {
      this.width = width;
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
      this.color = "#ffffff";
      this.width = 1;
      return this;
    },
  };
}

// Setup canvas and turtle

function setup_canvas(canvas, width, height) {
  canvas.width = width;
  canvas.height = height;
  const ctx = canvas.getContext && canvas.getContext("2d");
  ctx.translate(0.5, 0.5);
  ctx.lineCap = "square";
  return ctx;
}

// Simulation

function inv_seq(seq) {
  return seq.map((v) => (v === 0 ? 1 : 0)).reverse();
}

const A0 = [];
function A(n) {
  return n > 0 ? [...inv_seq(A(n - 1)), 0, ...A(n - 1)] : A0;
}

DP2 = [1, 2];
function DP(n) {
  if (n > 2) {
    [d1, d2] = DP(n - 2);
    return [d1 * 2 + 1, d2 * 2 + 1];
  } else return DP2;
}

DI1 = [1, 1];
function DI(n) {
  if (n > 1) {
    [d1, d2] = DI(n - 2);
    return n % 4 == 3 ? [d1 * 2, d2 * 2 + 1] : [d1 * 2 + 2, d2 * 2 + 1];
  } else return DI1;
}

function D(n) {
  return n % 2 == 0 ? DP(n) : DI(n);
}

// Functions (related to drawing and settings)

function raw_draw(n, center_x, center_y, seg_len, seg_width, turtle) {
  center_x = center_x * seg_len;
  center_y = center_y * seg_len;

  turtle
    .set_color("rgba(220, 220, 230, 1)")
    .set_width(seg_width * 2 - 1)
    .move_to(center_x, center_y);

  let angles = A(n - 1);
  console.log(angles);

  angles.forEach((a) => {
    turtle.forward(seg_len);
    if (a === 0) turtle.left(90);
    else turtle.right(90);
  });
  turtle.forward(seg_len);
  if (n === 1) turtle.left(90);
  turtle.move_to(center_x, center_y);
  angles.forEach((a) => {
    turtle.forward(seg_len);
    if (a === 0) turtle.left(90);
    else turtle.right(90);
  });
  turtle.forward(seg_len);
  turtle.move_to(center_x, center_y);
  turtle.dot(1, "rgb(80, 80, 255)");
}

// Create non-interactive canvas that displays a sequence
function lone_canvas(
  canvas,
  n,
  offset_x,
  offset_y,
  width,
  height,
  seg_len,
  seg_width
) {
  canvas.width = width;
  canvas.height = height;
  const ctx = canvas.getContext && canvas.getContext("2d");
  ctx.translate(0.5, 0.5);
  ctx.lineCap = "square";
  raw_draw(n, offset_x, offset_y, seg_len, seg_width, create_turtle(ctx));
}
