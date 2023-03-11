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
