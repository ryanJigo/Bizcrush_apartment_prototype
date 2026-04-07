/* ======================================================
   Bizcrush — 2BR Options Interactions
   ====================================================== */

(function () {

  var unitNames = {
    "lightbox-b1a": "Lightbox B1A",
    "capella-d2": "Capella D2",
    "glendale-2b1b": "Glendale 2B1B",
    "ehs-2bdb": "East Howe 2BD B",
    "ehs-2bda": "East Howe 2BD A",
    "capella-d1": "Capella D1"
  };

  var picked = {};

  var picksBar = document.getElementById("picksBar");
  var picksList = document.getElementById("picksList");
  var picksLabel = document.getElementById("picksLabel");
  var toastEl = document.getElementById("toast");
  var toastTimer = null;

  document.querySelectorAll(".btn-pick").forEach(function (btn) {
    btn.addEventListener("click", function () {
      var unit = btn.getAttribute("data-unit");
      var row = document.querySelector('tr[data-unit="' + unit + '"]');

      if (picked[unit]) {
        delete picked[unit];
        btn.classList.remove("picked");
        btn.textContent = "Pick";
        if (row) row.classList.remove("picked");
        showToast("Removed " + unitNames[unit]);
      } else {
        picked[unit] = true;
        btn.classList.add("picked");
        btn.textContent = "\u2713 Picked";
        if (row) row.classList.add("picked");
        showToast("Picked " + unitNames[unit]);
      }

      updatePicksBar();
    });
  });

  function updatePicksBar() {
    var keys = Object.keys(picked);
    if (keys.length === 0) {
      picksBar.classList.add("hidden");
      picksBar.classList.remove("visible");
      return;
    }

    picksList.innerHTML = "";
    keys.forEach(function (key) {
      var chip = document.createElement("span");
      chip.className = "pick-chip";
      chip.textContent = unitNames[key];
      picksList.appendChild(chip);
    });

    picksLabel.textContent = keys.length + (keys.length === 1 ? " unit selected" : " units selected");
    picksBar.classList.remove("hidden");
    picksBar.classList.add("visible");
  }

  function showToast(msg) {
    toastEl.textContent = msg;
    toastEl.classList.add("visible");
    if (toastTimer) clearTimeout(toastTimer);
    toastTimer = setTimeout(function () {
      toastEl.classList.remove("visible");
    }, 2000);
  }

})();
