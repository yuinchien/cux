import { Pane } from "https://cdn.jsdelivr.net/npm/tweakpane@4.0.1/dist/tweakpane.min.js";

const root = document.querySelector(":root");

/* Tweakpane */
const PARAMS = {
  button: {
    corner: 20,
    height: 40,
  },
  listbox: {
    corner: 8,
    height: 40,
  },
  preview: {
    examples: "all",
  },
};

const pane = new Pane();

const folderContent = pane.addFolder({
  title: "preview",
});
folderContent
  .addBinding(PARAMS.preview, "examples", {
    options: {
      all: "all",
      toolbar: "toolbar",
      optgroup: "optgroup",
      with_icon: "with-icon",
      emoji: "emoji",
    },
  })
  .on("change", function (ev) {
    updateExamples(ev.value);
  });

folderContent
  .addButton({
    label: "Suggest A",
    title: "H 40/R 20/R 8",
  })
  .on("click", () => {
    PARAMS.button.corner = 20;
    PARAMS.button.height = 40;
    PARAMS.listbox.corner = 8;
    PARAMS.listbox.height = 40;
    pane.refresh();
  });
folderContent
  .addButton({
    label: "Suggest B",
    title: "H 40/R 8/R 8",
  })
  .on("click", () => {
    PARAMS.button.corner = 8;
    PARAMS.button.height = 40;
    PARAMS.listbox.corner = 8;
    PARAMS.listbox.height = 40;
    pane.refresh();
  });

const folderButton = pane.addFolder({
  title: "button",
});
folderButton
  .addBinding(PARAMS.button, "corner", {
    step: 4,
    min: 0,
    max: 32,
  })
  .on("change", function (ev) {
    root.style.setProperty("--button-border-radius", `${ev.value}px`);
  });

folderButton
  .addBinding(PARAMS.button, "height", {
    step: 4,
    min: 24,
    max: 64,
  })
  .on("change", function (ev) {
    console.log(`change: ${ev.value}`);
    root.style.setProperty("--button-height", `${ev.value}px`);
  });

const folderListbox = pane.addFolder({
  title: "listbox",
});
folderListbox
  .addBinding(PARAMS.listbox, "corner", {
    step: 4,
    min: 0,
    max: 24,
  })
  .on("change", function (ev) {
    console.log(`change: ${ev.value}`);
    root.style.setProperty("--listbox-border-radius", `${ev.value}px`);
  });

folderListbox
  .addBinding(PARAMS.button, "height", {
    step: 4,
    min: 24,
    max: 64,
  })
  .on("change", function (ev) {
    console.log(`change: ${ev.value}`);
    root.style.setProperty("--option-height", `${ev.value}px`);
  });

const demos = document.querySelectorAll(".demo");

const updateExamples = (templateName) => {
  const template = document.getElementById(`template-${templateName}`);
  demos.forEach((demo) => {
    demo.innerHTML = "";
    const clone = template.content.cloneNode(true);
    demo.appendChild(clone);
  });
};

updateExamples("all");
