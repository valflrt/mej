import {
  D,
  loneCanvas,
  LoneCanvasSettings,
  rawDraw,
  Settings,
  setupCanvas,
  Turtle,
} from "./logic";

import "./style.css";

// Constants

const canvasWidth = 800;
const canvasHeight = 600;

let mainCtx = setupCanvas(
  document.getElementById("canvas")! as HTMLCanvasElement,
  canvasWidth,
  canvasHeight
);
let mainTurtle = new Turtle(mainCtx);

// Elements

const nInput = document.getElementById("rang_input") as HTMLInputElement;
const segLenInput = document.getElementById(
  "segment_len_input"
) as HTMLInputElement;
const segWidthInput = document.getElementById("seg_width") as HTMLInputElement;
const centerXInput = document.getElementById(
  "offset_x_input"
) as HTMLInputElement;
const centerYInput = document.getElementById(
  "offset_y_input"
) as HTMLInputElement;
const showAngleTagInput = document.getElementById(
  "angle_tag_input"
) as HTMLInputElement;
const showPrevSeqInput = document.getElementById(
  "prev_seq_input"
) as HTMLInputElement;
const figMsgElement = document.querySelector(
  "#drawing_wrapper .msg"
)! as HTMLDivElement;

// Presets

const presets: { [key: string]: Settings } = {
  preset_1: {
    n: 1,
    centerX: 9.5,
    centerY: 7,
    segLen: 40,
    segWidth: 1,
    showAngleTag: true,
  },
  preset_2: {
    n: 2,
    centerX: 9.5,
    centerY: 7.5,
    segLen: 40,
    segWidth: 1,
    showAngleTag: true,
  },
  preset_3: {
    n: 3,
    centerX: 9.5,
    centerY: 6.5,
    segLen: 40,
    segWidth: 1,
    showAngleTag: true,
  },
  preset_4: {
    n: 4,
    centerX: 10.5,
    centerY: 6,
    segLen: 40,
    segWidth: 1,
    showAngleTag: true,
  },
  preset_5: {
    n: 5,
    centerX: 12,
    centerY: 6,
    segLen: 40,
    segWidth: 1,
    showAngleTag: true,
  },
  preset_6: {
    n: 6,
    centerX: 12.5,
    centerY: 8,
    segLen: 40,
    segWidth: 1,
    showAngleTag: true,
  },
  preset_10: {
    n: 10,
    centerX: 29.5,
    centerY: 27.5,
    segLen: 10,
    segWidth: 1,
  },
  preset_12: {
    n: 12,
    centerX: 55.5,
    centerY: 16,
    segLen: 8,
    segWidth: 1,
  },
  preset_16: {
    n: 16,
    centerX: 178.5,
    centerY: 234.5,
    segLen: 2,
    segWidth: 1,
  },
  preset_17: {
    n: 17,
    centerX: 285,
    centerY: 385,
    segLen: 1,
    segWidth: 1,
  },
};

function drawSimulation(settings: Settings) {
  Object.entries(presets).forEach(([id, presetSettings]) =>
    Object.entries(presetSettings).every(([k, v]) => v === settings[k])
      ? document.getElementById(id)?.classList.add("active")
      : document.getElementById(id)?.classList.remove("active")
  );

  mainTurtle.clear().reset();
  let errors = check_settings(settings);
  if (errors.length === 0) {
    console.log(settings);
    figMsgElement.classList.remove("error");
    figMsgElement.innerText = `Dimensions de la figure: (${D(settings[0]).join(
      "; "
    )})`;
    setSettings(settings);
    rawDraw(mainTurtle, settings);
  } else {
    figMsgElement.classList.add("error");
    figMsgElement.innerText = errors.join(" / ");
  }
}

function getSettings(): Settings {
  let n = Number.parseFloat(nInput.value);
  n = !isNaN(n) ? n : 10;

  let segLen = Number.parseFloat(segLenInput.value);
  segLen = !isNaN(segLen) ? segLen : 0;

  let segWidth = Number.parseFloat(segWidthInput.value);
  segWidth = !isNaN(segWidth) ? segWidth : 1;

  let centerX = Number.parseFloat(centerXInput.value);
  centerX = !isNaN(centerX) ? centerX : 0;
  let centerY = Number.parseFloat(centerYInput.value);
  centerY = !isNaN(centerY) ? centerY : 0;

  return {
    n,
    centerX,
    centerY,
    segLen,
    segWidth,
    showAngleTag: showAngleTagInput.checked,
    showPrevSeq: showPrevSeqInput.checked,
  };
}

function check_settings({ n, segLen, segWidth }: Settings) {
  let errors = [];

  !Number.isInteger(n) && errors.push("n doit être un nombre entier");
  n > 30 && errors.push("n ne doit pas dépasser 30");
  n < 1 && errors.push("n ne doit pas être plus petit que 1");

  !Number.isInteger(segLen) &&
    errors.push("La longueur des segments doit être un nombre entier");
  segLen < 1 &&
    errors.push("La longueur des segments ne doit pas être plus petit que 1");
  segLen > 100 &&
    errors.push("La longueur des segments ne doit pas dépasser 100");

  !Number.isInteger(segWidth) &&
    errors.push("L'épaisseur des segments doit être un nombre entier");
  segWidth < 1 &&
    errors.push("L'épaisseur des segments ne doit pas être plus petite que 1");
  segWidth > 5 &&
    errors.push("L'épaisseur des segments ne doit pas dépasser 5");

  return errors;
}

function setSettings({
  n,
  centerX,
  centerY,
  segLen,
  segWidth,
  showAngleTag,
  showPrevSeq,
}: Settings) {
  nInput.value = n.toString();
  centerXInput.value = centerX.toString();
  centerYInput.value = centerY.toString();
  segLenInput.value = segLen.toString();
  segWidthInput.value = segWidth.toString();
  showAngleTagInput.checked = showAngleTag ?? false;
  showPrevSeqInput.checked = showPrevSeq ?? true;
}

// Init

function init() {
  setSettings(presets.preset_12);
  drawSimulation(getSettings());
}
init();

// Set event listeners

document.getElementById("draw_button")!.addEventListener("click", () => {
  drawSimulation(getSettings());
});
document.addEventListener(
  "keypress",
  (e) => e.key === "Enter" && drawSimulation(getSettings())
);

document.getElementById("reset_button")!.addEventListener("click", init);

Object.entries(presets).forEach(([id, settings]) =>
  document.getElementById(id)!.addEventListener("click", () => {
    setSettings(settings);
    drawSimulation(getSettings());
  })
);

(
  [
    [
      "fig_rang_1",
      {
        n: 1,
        centerX: 0.5,
        centerY: 0.5,
        width: 60,
        height: 60,
        segLen: 30,
        segWidth: 1,
      },
    ],
    [
      "fig_rang_2",
      {
        n: 2,
        centerX: 0.5,
        centerY: 1.5,
        width: 42.5,
        height: 62.5,
        segLen: 20,
        segWidth: 1,
      },
    ],
    [
      "fig_rang_3",
      {
        n: 3,
        centerX: 1.5,
        centerY: 0.5,
        width: 82.5,
        height: 62.5,
        segLen: 20,
        segWidth: 1,
      },
    ],
    [
      "fig_rang_4",
      {
        n: 4,
        centerX: 4,
        centerY: 1,
        width: 105,
        height: 75,
        segLen: 15,
        segWidth: 1,
      },
    ],
    [
      "fig_rang_5",
      {
        n: 5,
        centerX: 5.5,
        centerY: 2.5,
        width: 72.5,
        height: 82.5,
        segLen: 10,
        segWidth: 1,
      },
    ],
    [
      "fig_rang_12",
      {
        n: 12,
        centerX: 55,
        centerY: 12,
        width: 200,
        height: 136,
        segLen: 2,
        segWidth: 1,
      },
    ],
    [
      "fig_rang_13",
      {
        n: 13,
        centerX: 90,
        centerY: 48,
        width: 116,
        height: 138,
        segLen: 1,
        segWidth: 1,
      },
    ],
  ] as [string, LoneCanvasSettings][]
).forEach(([id, settings]) =>
  loneCanvas(document.getElementById(id)! as HTMLCanvasElement, settings)
);
