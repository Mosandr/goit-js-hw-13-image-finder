export default class MyIo {
  constructor(onIntersection, target, rootMargin) {
    this.target = target;
    this.rootMargin = rootMargin;
    this.onIntersection = onIntersection;
  }

  startObserve() {
    const options = { rootMargin: this.rootMargin };

    const callback = entries => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          this.onIntersection();
        }
      });
    };
    const io = new IntersectionObserver(callback, options);
    io.observe(this.target);
  }
}
