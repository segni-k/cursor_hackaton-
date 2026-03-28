(function () {
  const slides = document.querySelectorAll(".slide");
  const dots = document.querySelectorAll(".progress-dots button");
  const currentEl = document.getElementById("slide-current");
  const totalEl = document.getElementById("slide-total");
  let index = 0;

  function total() {
    return slides.length;
  }

  function show(i) {
    index = Math.max(0, Math.min(i, total() - 1));
    slides.forEach((s, j) => {
      s.classList.toggle("active", j === index);
    });
    dots.forEach((d, j) => {
      d.classList.toggle("active", j === index);
    });
    if (currentEl) currentEl.textContent = String(index + 1);
    if (totalEl) totalEl.textContent = String(total());
  }

  document.addEventListener("keydown", function (e) {
    if (e.key === "ArrowRight" || e.key === " " || e.key === "PageDown") {
      e.preventDefault();
      show(index + 1);
    } else if (e.key === "ArrowLeft" || e.key === "PageUp") {
      e.preventDefault();
      show(index - 1);
    } else if (e.key === "Home") {
      show(0);
    } else if (e.key === "End") {
      show(total() - 1);
    }
  });

  dots.forEach(function (btn, j) {
    btn.addEventListener("click", function () {
      show(j);
    });
  });

  if (totalEl) totalEl.textContent = String(total());
  show(0);
})();
