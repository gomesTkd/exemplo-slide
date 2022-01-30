export default class Slide {
  constructor(slide, wrapper) {
    this.slide = document.querySelector(slide);
    this.wrapper = document.querySelector(wrapper);

    this.dist = {
      finalPosition: 0,
      startX: 0,
      movement: 0,
      movePosition: 0,
    };

  }

  moveSlide(distX) {
    this.dist.movePosition = distX;
    this.slide.style.transform = `translate3d(${distX}px, 0, 0)`;
  }

  updatePosition(clientX) {
    this.dist.movement = (this.dist.startX - clientX) * 1.4;
    return this.dist.finalPosition - this.dist.movement;
  }

  onStart(event) {
    let movetype;

    if (event.type === "mousedown") {
      event.preventDefault();
      this.dist.startX = event.clientX;
      movetype = "mousedown";
    } else {
      this.dist.startX = event.changedTouches[0].clientX;
      movetype = "touchmove";
    }

    this.wrapper.addEventListener(movetype, this.onMouve);
  }

  onEnd(event) {
    const movetype = (event.type === "mouveup") ? "mousemove" : "touchmove"; 
    this.wrapper.removeEventListener(movetype, this.onMouve);
    this.dist.finalPosition = this.dist.movePosition;
  }

  onMouve(event) {
    const pointerPosition = (event.type === "mousemove") ? event.clientX
     : event.changedTouches[0].clientX;
    const finalPosition = this.updatePosition(pointerPosition);
    this.moveSlide(finalPosition);
  }

  addSlideEvent() {
    this.wrapper.addEventListener("mousedown", this.onStart);
    this.wrapper.addEventListener("touchstart", this.onStart);
    this.wrapper.addEventListener("mouseup", this.onEnd);
    this.wrapper.addEventListener("touchend", this.onEnd);

  }

  bindEvent() {
    this.onStart = this.onStart.bind(this);
    this.onMouve = this.onMouve.bind(this);
    this.onEnd = this.onEnd.bind(this);


  }

  init() {
    this.bindEvent();
    this.addSlideEvent();
    return this;
  }
}