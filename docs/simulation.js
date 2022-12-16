// Setup canvas and turtle

const canvas = document.getElementById("canvas");
const ctx = canvas.getContext && canvas.getContext("2d");
ctx.translate(0.5, 0.5);
ctx.lineCap = "square";

let turtle = create_turtle(ctx);

// Constants

const canvas_width = 800;
const canvas_height = 600;

// Elements

const n_input = document.getElementById("rang_input");
const seg_len_input = document.getElementById("segment_len_input");
const seg_width_input = document.getElementById("seg_width");
const offset_x_input = document.getElementById("offset_x_input");
const offset_y_input = document.getElementById("offset_y_input");
const fig_msg_element = document.querySelector("#drawing_wrapper .msg");

// Presets

const presets = {
  preset_1: [1, 0, -0.5, 40, 1],
  preset_2: [2, -0.5, 0, 40, 1],
  preset_3: [3, -0.5, -1, 40, 1],
  preset_4: [4, 0.5, -1.5, 40, 1],
  preset_5: [5, 2, -1.5, 40, 1],
  preset_6: [6, 2.5, 0.5, 30, 1],
  preset_10: [10, -10, -2.5, 10, 1],
  preset_12: [12, 5.5, -21.5, 8, 1],
  preset_16: [16, -22, 85, 2, 1],
  preset_17: [17, -130, 90, 1, 1],
};

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

function raw_draw(n, offset_x, offset_y, seg_len, seg_width) {
  let [center_x, center_y] = [
    canvas_width / 2 + offset_x * seg_len,
    canvas_height / 2 + offset_y * seg_len,
  ];

  turtle
    .set_color("rgba(220, 220, 230, 1)")
    .set_width(seg_width)
    .moveTo(center_x, center_y);

  let angles = A(n - 1);
  console.log(angles);

  angles.forEach((a) => {
    turtle.forward(seg_len);
    if (a === 0) turtle.left(90);
    else turtle.right(90);
  });
  turtle.forward(seg_len);
  if (n === 1) turtle.left(90);
  turtle.moveTo(center_x, center_y);
  angles.forEach((a) => {
    turtle.forward(seg_len);
    if (a === 0) turtle.left(90);
    else turtle.right(90);
  });
  turtle.forward(seg_len);
  turtle.moveTo(center_x, center_y);
  turtle.dot(1, "rgb(80, 80, 255)");
}

function draw(settings) {
  Object.entries(presets).forEach(([id, preset_settings]) =>
    preset_settings.every((s, i) => s === settings[i])
      ? document.getElementById(id).classList.add("active")
      : document.getElementById(id).classList.remove("active")
  );

  turtle.clear().reset();
  let errors = check_settings(settings);
  if (errors.length === 0) {
    console.log(settings);
    fig_msg_element.classList.remove("error");
    fig_msg_element.innerText = `Dimensions de la figure: (${D(
      settings[0]
    ).join("; ")})`;
    set_settings(...settings);
    raw_draw(...settings);
  } else {
    fig_msg_element.classList.add("error");
    fig_msg_element.innerText = errors.join(" / ");
  }
}

function get_settings() {
  let n = Number.parseFloat(n_input.value);
  n = !isNaN(n) ? n : 10;

  let seg_len = Number.parseFloat(seg_len_input.value);
  seg_len = !isNaN(seg_len) ? seg_len : 0;

  let seg_width = Number.parseFloat(seg_width_input.value);
  seg_width = !isNaN(seg_width) ? seg_width : 1;

  let offset_x = Number.parseFloat(offset_x_input.value);
  offset_x = !isNaN(offset_x) ? offset_x : 0;
  let offset_y = Number.parseFloat(offset_y_input.value);
  offset_y = !isNaN(offset_y) ? offset_y : 0;

  return [n, offset_x, offset_y, seg_len, seg_width];
}

function check_settings(settings) {
  let [n, , , seg_len, seg_width] = settings;
  let errors = [];

  !Number.isInteger(n) && errors.push("n doit être un nombre entier");
  n > 30 && errors.push("n ne doit pas dépasser 30");
  n < 1 && errors.push("n ne doit pas être plus petit que 1");

  !Number.isInteger(seg_len) &&
    errors.push("La longueur des segments doit être un nombre entier");
  seg_len < 1 &&
    errors.push("La longueur des segments ne doit pas être plus petit que 1");
  seg_len > 100 &&
    errors.push("La longueur des segments ne doit pas dépasser 100");

  !Number.isInteger(seg_width) &&
    errors.push("L'épaisseur des segments doit être un nombre entier");
  seg_width < 1 &&
    errors.push("L'épaisseur des segments ne doit pas être plus petite que 1");
  seg_width > 5 &&
    errors.push("L'épaisseur des segments ne doit pas dépasser 10");

  return errors;
}

function set_settings(n, offset_x, offset_y, seg_len, seg_width) {
  n_input.value = n;
  offset_x_input.value = offset_x;
  offset_y_input.value = offset_y;
  seg_len_input.value = seg_len;
  seg_width_input.value = seg_width;
}

// Init

function init() {
  let settings = [12, 5.5, -21.5, 8, 1];
  set_settings(...settings);
  draw(settings);
}
init();

// Set event listeners

document.getElementById("draw_button").addEventListener("click", () => {
  draw(get_settings());
});
document.addEventListener(
  "keypress",
  (e) => e.key === "Enter" && draw(get_settings())
);

document.getElementById("reset_button").addEventListener("click", init);

Object.entries(presets).forEach(([id, settings]) =>
  document.getElementById(id).addEventListener("click", () => {
    set_settings(...settings);
    draw(get_settings());
  })
);
