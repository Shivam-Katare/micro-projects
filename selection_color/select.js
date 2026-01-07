const toggleBtn = document.getElementById("toggle");
const picker = document.getElementById("colorPicker");
const colors = document.querySelectorAll(".color");

let enabled = false;

// Toggle custom selection
toggleBtn.addEventListener("click", () => {
  enabled = !enabled;
  document.body.classList.toggle("custom-selection", enabled);
  picker.classList.toggle("hidden", !enabled);

  toggleBtn.textContent = enabled
    ? "Disable Custom Selection"
    : "Enable Custom Selection";
});

// Change selection color
colors.forEach((color) => {
  color.addEventListener("click", () => {
    document.documentElement.style.setProperty(
      "--selection-bg",
      color.dataset.color
    );

    colors.forEach((c) => c.classList.remove("active"));
    color.classList.add("active");
  });
});
