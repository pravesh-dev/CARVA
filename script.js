function locoScroll() {
  gsap.registerPlugin(ScrollTrigger);

  // Using Locomotive Scroll from Locomotive https://github.com/locomotivemtl/locomotive-scroll

  const locoScroll = new LocomotiveScroll({
    el: document.querySelector("#main-wrapper"),
    smooth: true,
  });
  // each time Locomotive Scroll updates, tell ScrollTrigger to update too (sync positioning)
  locoScroll.on("scroll", ScrollTrigger.update);

  // tell ScrollTrigger to use these proxy methods for the "#main-wrapper" element since Locomotive Scroll is hijacking things
  ScrollTrigger.scrollerProxy("#main-wrapper", {
    scrollTop(value) {
      return arguments.length
        ? locoScroll.scrollTo(value, 0, 0)
        : locoScroll.scroll.instance.scroll.y;
    }, // we don't have to define a scrollLeft because we're only scrolling vertically.
    getBoundingClientRect() {
      return {
        top: 0,
        left: 0,
        width: window.innerWidth,
        height: window.innerHeight,
      };
    },
    // LocomotiveScroll handles things completely differently on mobile devices - it doesn't even transform the container at all! So to get the correct behavior and avoid jitters, we should pin things with position: fixed on mobile. We sense it by checking to see if there's a transform applied to the container (the LocomotiveScroll-controlled element).
    pinType: document.querySelector("#main-wrapper").style.transform
      ? "transform"
      : "fixed",
  });

  // each time the window updates, we should refresh ScrollTrigger and then update LocomotiveScroll.
  ScrollTrigger.addEventListener("refresh", () => locoScroll.update());

  // after everything is set up, refresh() ScrollTrigger and update LocomotiveScroll because padding may have been added for pinning, etc.
  ScrollTrigger.refresh();
}
locoScroll();
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

// parallax effect where image along with scrolling
gsap.to("#section-3-img", {
  y: 560,
  duration: 3,
  x: 770,
  transform: "rotateY(180deg)",
  scrollTrigger: {
    trigger: "#section-3",
    scroller: "#main-wrapper",
    start: "top 11%",
    end: "45% 10%",
    scrub: 3,
  },
});
gsap.to("#rotate-img", {
  rotate: 360,
  duration: 6,
  scrollTrigger: {
    trigger: "#section-4",
    scroller: "#main-wrapper",
    start: "top 91%",
    end: "top 10%",
    markers: true,
    scrub: 10,
  },
});
