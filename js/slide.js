export default class Slide {
  constructor(slide, wrapper) {
    this.slide = document.querySelector(slide);
    this.wrapper = document.querySelector(wrapper);

  }

  onStart(event) {
    event.preventDefault();
    this.wrapper.addEventListener("mousemove", this.onMouve);

  }

  onEnd(event) {
    this.wrapper.removeEventListener("mousemove", this.onMouve);

  }

  onMouve(event) {
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