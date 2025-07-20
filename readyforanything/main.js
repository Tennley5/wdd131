
const checklist = {
  wildfire: ["N95 mask", "Evacuation map", "Fire extinguisher", "Flashlight", "Fire blanket", "First aid kit", "Emergency flares",],
  blackout: ["Flashlight", "Battery-powered radio", "Extra batteries", "Blankets","Drinking water", "Candles", "Matches", "Freeze dried food"],
  flood: ["Waterproof clothing", "Sandbags", "Emergency radio", "Drinking water", "Blankets", "Rope", "Life jackets"]
};

let currentKit = [];

const scenarioSelect = document.getElementById("scenario");
const checklistElement = document.getElementById("checklist");
const addItemBtn = document.getElementById("addItemBtn");
const customItemInput = document.getElementById("customItem");
const saveBtn = document.getElementById("saveBtn");
const kitNameInput = document.getElementById("kitName");
const printBtn = document.getElementById("printBtn");
const clearBtn = document.getElementById("clearBtn");
const savedList = document.getElementById("savedKitList");


if (scenarioSelect && checklistElement) {
  scenarioSelect.addEventListener("change", function () {
    const selected = this.value;
    checklistElement.innerHTML = "";
    currentKit = [];

    if (selected && checklist[selected]) {
      currentKit = [...checklist[selected]];
      renderChecklist();
    }
  });
}

if (addItemBtn && customItemInput) {
  addItemBtn.addEventListener("click", () => {
    const newItem = customItemInput.value.trim();
    if (newItem !== "") {
      currentKit.push(newItem);
      customItemInput.value = "";
      renderChecklist();
    }
  });
}

if (saveBtn) {
  saveBtn.addEventListener("click", () => {
    const kitName = kitNameInput.value.trim();
    if (kitName === "") {
      alert("Please name your kit before saving.");
      return;
    }

    const savedKits = JSON.parse(localStorage.getItem("allEmergencyKits")) || [];

    const newKit = {
      name: kitName,
      items: [...currentKit]
    };

    const editIndex = parseInt(kitNameInput.dataset.editingIndex);
    if (!isNaN(editIndex)) {
      savedKits[editIndex] = newKit;
      kitNameInput.removeAttribute("data-editing-index");
    } else {
      savedKits.push(newKit);
    }

    localStorage.setItem("allEmergencyKits", JSON.stringify(savedKits));
    alert("Kit saved successfully!");
    kitNameInput.value = "";
  });
}

if (printBtn) {
  printBtn.addEventListener("click", () => {
    window.print();
  });
}

if (clearBtn) {
  clearBtn.addEventListener("click", () => {
    currentKit = [];
    renderChecklist();
  });
}

function renderChecklist() {
  checklistElement.innerHTML = "";
  currentKit.forEach(item => {
    const li = document.createElement("li");

    const checkbox = document.createElement("input");
    checkbox.type = "checkbox";
    checkbox.id = item;

    const label = document.createElement("label");
    label.htmlFor = item;
    label.textContent = item;

    li.appendChild(checkbox);
    li.appendChild(label);
    checklistElement.appendChild(li);
  });
}



if (savedList) {
  document.addEventListener("DOMContentLoaded", () => {
    const savedKits = JSON.parse(localStorage.getItem("allEmergencyKits")) || [];

    if (savedKits.length === 0) {
      savedList.innerHTML = "<li>No saved kits found.</li>";
    } else {
      savedKits.forEach((kit, index) => {
        const kitContainer = document.createElement("li");

        const kitHeader = document.createElement("div");
        kitHeader.style.display = "flex";
        kitHeader.style.justifyContent = "space-between";
        kitHeader.style.alignItems = "center";

        const kitTitle = document.createElement("h4");
        kitTitle.textContent = kit.name;

        const buttonContainer = document.createElement("div");

        const deleteBtn = document.createElement("button");
        deleteBtn.textContent = "Delete";
        deleteBtn.style.marginLeft = "0.5rem";
        deleteBtn.addEventListener("click", () => {
          savedKits.splice(index, 1);
          localStorage.setItem("allEmergencyKits", JSON.stringify(savedKits));
          location.reload();
        });

        const editBtn = document.createElement("button");
        editBtn.textContent = "Edit";
        editBtn.style.marginLeft = "0.5rem";
        editBtn.addEventListener("click", () => {
          localStorage.setItem("kitToEdit", JSON.stringify({ name: kit.name, items: kit.items, index: index }));
          window.location.href = "build.html";
        });

        buttonContainer.appendChild(editBtn);
        buttonContainer.appendChild(deleteBtn);

        kitHeader.appendChild(kitTitle);
        kitHeader.appendChild(buttonContainer);

        const kitItems = document.createElement("ul");
        kit.items.forEach(item => {
          const li = document.createElement("li");
          li.textContent = item;
          kitItems.appendChild(li);
        });

        kitContainer.appendChild(kitHeader);
        kitContainer.appendChild(kitItems);
        savedList.appendChild(kitContainer);
      });
    }
  });
}


if (kitNameInput && checklistElement && window.location.pathname.includes("build.html")) {
  document.addEventListener("DOMContentLoaded", () => {
    const kitToEdit = JSON.parse(localStorage.getItem("kitToEdit"));
    if (kitToEdit) {
      kitNameInput.value = kitToEdit.name;
      currentKit = [...kitToEdit.items];
      kitNameInput.dataset.editingIndex = kitToEdit.index;
      renderChecklist();
      localStorage.removeItem("kitToEdit");
    }
  });
}
