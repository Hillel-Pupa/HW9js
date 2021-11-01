const btnNext = document.getElementById("btn-next");
const btnPrev = document.getElementById("btn-prev");
const wrapper = document.querySelector(".wrapper");
const container = document.querySelector(".container");
let imageCount = container.children.length;
let currentImageIndex = 0;
const imageWidth = 400;
// container.firstElementChild.offsetWidth;
// btnNext.addEventListener("click", () => {
//   wrapper.scrollLeft += 200;
//   if (wrapper.scrollLeft === 800) {
//     btnNext.style.visibility = "hidden";
//   }
//   if (wrapper.scrollLeft > 0) {
//     btnPrev.style.visibility = "visible";
//   }
// });

// btnPrev.addEventListener("click", () => {
//   wrapper.scrollLeft -= 200;
//   if (wrapper.scrollLeft < 800) {
//     btnNext.style.visibility = "visible";
//   }
//   if (wrapper.scrollLeft === 0) {
//     btnPrev.style.visibility = "hidden";
//   }
// });

btnNext.addEventListener("click", () => {
  currentImageIndex++;
  if (currentImageIndex === imageCount - 1) {
    btnNext.style.visibility = "hidden";
  }
  if (currentImageIndex > 0) {
    btnPrev.style.visibility = "visible";
  }
  wrapper.scrollLeft = currentImageIndex * imageWidth;
});

btnPrev.addEventListener("click", () => {
  currentImageIndex--;
  if (currentImageIndex !== imageCount - 1) {
    btnNext.style.visibility = "visible";
  }
  if (currentImageIndex === 0) {
    btnPrev.style.visibility = "hidden";
  }
  wrapper.scrollLeft = currentImageIndex * imageWidth;
});
