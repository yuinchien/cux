const template = document.getElementById("template");

const demos = document.querySelectorAll(".demo");

demos.forEach((demo) => {
  const clone = template.content.cloneNode(true);
  demo.appendChild(clone);
});
