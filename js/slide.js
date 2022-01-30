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
    event.preventDefault();
    this.dist.startX = event.clientX;
    this.wrapper.addEventListener("mousemove", this.onMouve);

  }

  onEnd(event) {
    this.wrapper.removeEventListener("mousemove", this.onMouve);
    this.dist.finalPosition = this.dist.movePosition;
  }

  onMouve(event) {
    const finalPosition = this.updatePosition(event.clientX);
    this.moveSlide(finalPosition);
  }

  addSlideEvent() {
    this.wrapper.addEventListener("mousedown", this.onStart);
    this.wrapper.addEventListener("mouseup", this.onEnd);
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