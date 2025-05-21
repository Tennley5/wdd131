const menuButton = document.getElementById("menuButton");
const menu = document.getElementById("navLinks");

function toggleMenu() {
  menu.classList.toggle("hide");
}

menuButton.addEventListener("click", toggleMenu);

function handleResize() {
  if (window.innerWidth > 1000) {
    menu.classList.remove("hide");
  } else {
    menu.classList.add("hide");
  }
}

window.addEventListener("resize", handleResize);
handleResize();

const gallery = document.querySelector(".gallery");
const modal = document.querySelector(".modal");

gallery.addEventListener("click", (event) => {
  const clickedImage = event.target.closest("img");
  if (!clickedImage) return;

  const src = clickedImage.getAttribute("src");
  const alt = clickedImage.getAttribute("alt");

  const fullSrc = src.split("-")[0] + "-full.jpeg";

  modal.innerHTML = `
    <img src="${fullSrc}" alt="${alt}">
    <button class="close-viewer">X</button>
  `;
  modal.showModal();

  const closeButton = modal.querySelector(".close-viewer");
  closeButton.addEventListener("click", () => modal.close());
});

modal.addEventListener("click", (event) => {
  if (event.target === modal) {
    modal.close();
  }
});

