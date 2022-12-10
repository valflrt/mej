let canvas = document.getElementById("canvas");
let ctx = canvas.getContext && canvas.getContext("2d");
ctx.translate(0.5, 0.5);
ctx.lineCap = "square";

// Simulation

function inv_seq(seq) {
  return seq.map((v) => (v === 0 ? 1 : 0)).reverse();
}

A0 = [];
function A(n) {
  return n > 0 ? [...inv_seq(A(n - 1)), 0, ...A(n - 1)] : A0;
}

// Get settings and draw

let n_input = document.getElementById("rang_input");
let seg_len_input = document.getElementById("segment_len_input");
let seg_width_input = document.getElementById("seg_width");
let offset_x_input = document.getElementById("offset_x_input");
let offset_y_input = document.getElementById("offset_y_input");
let message_element = document.getElementById("message");

let turtle = create_turtle(ctx);

function draw(n, offset_x, offset_y, seg_len, seg_width) {
  let [center_x, center_y] = [
    800 / 2 + offset_x * seg_len,
    600 / 2 + offset_y * seg_len,
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

function redraw(settings) {
  turtle.clear().reset();
  let errors = check_settings(settings);
  if (errors.length === 0) {
    console.log(settings);
    message_element.classList.remove("error");
    message_element.innerText = "";
    draw(...settings);
  } else {
    message_element.classList.add("error");
    message_element.innerText = errors.join(" / ");
  }
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

  !Number.isInteger(seg_len) &&
    errors.push("L'épaisseur des segments doit être un nombre entier");
  seg_width < 1 &&
    errors.push("L'épaisseur des segments ne doit pas être plus petite que 1");
  seg_width > 10 &&
    errors.push("L'épaisseur des segments ne doit pas dépasser 10");

  return errors;
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

function set_settings(n, offset_x, offset_y, seg_len, seg_width) {
  n_input.value = n;
  offset_x_input.value = offset_x;
  offset_y_input.value = offset_y;
  seg_len_input.value = seg_len;
  seg_width_input.value = seg_width;
}

redraw(get_settings());
document.getElementById("draw_button").addEventListener("click", () => {
  redraw(get_settings());
});
document.addEventListener(
  "keypress",
  (e) => e.key === "Enter" && redraw(get_settings())
);

// Presets

document.getElementById("preset_1").addEventListener("click", () => {
  set_settings(1, 0, -0.5, 40, 1);
  redraw(get_settings());
});
document.getElementById("preset_2").addEventListener("click", () => {
  set_settings(2, -0.5, 0, 40, 1);
  redraw(get_settings());
});
document.getElementById("preset_3").addEventListener("click", () => {
  set_settings(3, -0.5, -1, 40, 1);
  redraw(get_settings());
});
document.getElementById("preset_4").addEventListener("click", () => {
  set_settings(4, 0.5, -1.5, 40, 1);
  redraw(get_settings());
});
document.getElementById("preset_5").addEventListener("click", () => {
  set_settings(5, 2, -1.5, 40, 1);
  redraw(get_settings());
});
document.getElementById("preset_6").addEventListener("click", () => {
  set_settings(6, 2.5, 0.5, 30, 1);
  redraw(get_settings());
});
document.getElementById("preset_10").addEventListener("click", () => {
  set_settings(10, -10, -2.5, 10, 1);
  redraw(get_settings());
});
document.getElementById("preset_12").addEventListener("click", () => {
  set_settings(12, 5.5, -21.5, 8, 1);
  redraw(get_settings());
});
document.getElementById("preset_16").addEventListener("click", () => {
  set_settings(16, -22, 85, 2, 1);
  redraw(get_settings());
});
document.getElementById("preset_17").addEventListener("click", () => {
  set_settings(17, -130, 90, 1, 1);
  redraw(get_settings());
});
