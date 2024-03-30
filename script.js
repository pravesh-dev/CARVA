function handleHeaderHover() {
  gsap.to("header", {
    height: "40vh",
    duration: 0.2,
  });
  gsap.from("#header-bottom ul li a", {
    y: 20,
    duration: 0.8,
    stagger: 0.04,
    delay: 0.2,
  });
}
function handleHeaderLeave() {
  gsap.to("header", {
    height: "11vh",
    duration: 0.05,
  });
}

let header = document.querySelector("header");
let navBtn = document.querySelector("#nav-btn");
let logo = document.querySelector("#logo");
header.addEventListener("mouseenter", handleHeaderHover);
header.addEventListener("mouseleave", handleHeaderLeave);
navBtn.addEventListener("mouseover", handleHeaderLeave);
logo.addEventListener("mouseover", handleHeaderLeave);

// section 2 card hover effect. Image follow the cursor when the mouse enter inside card.

let section2Cards = document.querySelectorAll(".section-2-cards");

section2Cards.forEach((cards) => {
  cards.addEventListener("mousemove", (e) => {
    let hoverImage = cards.querySelector(".img-mouse-hover");
    let rect = cards.getBoundingClientRect();
    gsap.to(hoverImage, {
      scale: 1,
      left: e.clientX - rect.left,
      top: e.clientY - rect.top,
      scrub: 5,
      x: -40,
      y: -40,
    });
  });
  cards.addEventListener("mouseleave", (e) => {
    let hoverImage = cards.querySelector(".img-mouse-hover");
    gsap.to(hoverImage, {
      scale: 0,
    });
  });
});
