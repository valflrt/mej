// "python" turtle

export class Turtle {
  public ctx: CanvasRenderingContext2D;

  public x: number = 0;
  public y: number = 0;
  public angle: number = 0;

  public color: string = "#ffffff";
  public width: number = 1;

  constructor(ctx: CanvasRenderingContext2D) {
    this.ctx = ctx;
  }

  public moveTo(x: number, y: number) {
    this.x = x;
    this.y = y;
    return this;
  }

  public forward(length: number) {
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
  }

  public left(angleInDegrees: number) {
    this.angle += (angleInDegrees / 180) * Math.PI;
    return this;
  }

  public right(angleInDegrees: number) {
    return this.left(-angleInDegrees);
  }

  public dot(size = 1, color: string) {
    this.ctx.beginPath();
    this.ctx.arc(this.x, this.y, size * 2, 0, 2 * Math.PI, false);
    this.ctx.fillStyle = color;
    this.ctx.fill();
    return this;
  }

  public setColor(color: string) {
    this.color = color;
    return this;
  }

  public setWidth(width: number) {
    this.width = width;
    return this;
  }

  public text(text: string, x: number, y: number, font?: string) {
    this.ctx.textAlign = "center";
    this.ctx.textBaseline = "middle";
    this.ctx.font = font ?? "12px Open Sans Light";
    this.ctx.strokeText(text, this.x + x, this.y + y);
    return this;
  }

  public clear() {
    this.ctx.clearRect(-10, -10, 1e5, 1e5);
    return this;
  }
  public reset() {
    this.x = 0;
    this.y = 0;
    this.angle = 0;
    this.color = "#ffffff";
    this.width = 1;
    return this;
  }
}

// Setup canvas and turtle

export function setupCanvas(
  canvas: HTMLCanvasElement,
  width: number,
  height: number
): CanvasRenderingContext2D {
  canvas.width = width;
  canvas.height = height;
  const ctx = canvas.getContext && canvas.getContext("2d")!;
  ctx.translate(0.5, 0.5);
  ctx.lineCap = "square";
  return ctx;
}

// Simulation

export type Seq = (0 | 1)[];
export type Dims = [number, number];

function invSeq(seq: Seq) {
  return seq.map((v) => (v === 0 ? 1 : 0)).reverse();
}

const A0: Seq = [];
export function A(n: number): Seq {
  return n > 0 ? [...invSeq(A(n - 1)), 0, ...A(n - 1)] : A0;
}

const DP2: Dims = [1, 2];
function DP(n: number): Dims {
  if (n > 2) {
    let [d1, d2] = DP(n - 2);
    return [d1 * 2 + 1, d2 * 2 + 1];
  } else return DP2;
}

const DI1: Dims = [1, 1];
function DI(n: number): Dims {
  if (n > 1) {
    let [d1, d2] = DI(n - 2);
    return n % 4 == 3 ? [d1 * 2, d2 * 2 + 1] : [d1 * 2 + 2, d2 * 2 + 1];
  } else return DI1;
}

export function D(n: number): Dims {
  return n % 2 == 0 ? DP(n) : DI(n);
}

// Functions (related to drawing and settings)

export type Settings = { [key: string]: any } & {
  n: number;
  centerX: number;
  centerY: number;
  segLen: number;
  segWidth: number;
  showCenter?: boolean;
  showAngleTag?: boolean;
  showPrevSeq?: boolean;
};

export function rawDraw(
  turtle: Turtle,
  {
    n,
    centerX,
    centerY,
    segLen,
    segWidth,
    showAngleTag,
    showCenter,
    showPrevSeq,
  }: Settings
) {
  centerX = centerX * segLen;
  centerY = centerY * segLen;

  turtle
    .setColor("rgba(220, 220, 230, 1)")
    .setWidth(segWidth * 2 - 1)
    .moveTo(centerX, centerY);

  let angles = A(n - 1);
  console.log(angles);

  let positions: [number, number][] = [];

  function drawAngleTag(a: number) {
    if (
      positions.findIndex(([x, y]) => turtle.x === x && turtle.y === y) === -1
    ) {
      positions.push([turtle.x, turtle.y]);
      turtle.text(a.toString(), 7, -9);
    } else {
      // turtle.dot(3, "rgb(255, 80, 80)");
      turtle.text(a.toString(), -7, 9);
    }
  }
  let drawAngles = (a: number) => {
    turtle.forward(segLen);
    if (showAngleTag) drawAngleTag(a);
    if (a === 0) turtle.left(90);
    else turtle.right(90);
  };

  angles.forEach(drawAngles);

  turtle.forward(segLen);
  if (n === 1) turtle.left(90);
  turtle.moveTo(centerX, centerY);
  if (showAngleTag) drawAngleTag(0);

  if (showPrevSeq) turtle.setColor("rgb(150, 150, 255)");
  angles.forEach(drawAngles);

  turtle.forward(segLen);

  turtle.moveTo(centerX, centerY);
  if (showCenter !== false) turtle.dot(3, "rgb(255, 90, 90)");
}

export type LoneCanvasSettings = Settings & {
  width: number;
  height: number;
};

// Create non-interactive canvas that displays a sequence
export function loneCanvas(
  canvas: HTMLCanvasElement,
  settings: LoneCanvasSettings
) {
  let ctx = setupCanvas(canvas, settings.width, settings.height);
  rawDraw(new Turtle(ctx), settings);
}
