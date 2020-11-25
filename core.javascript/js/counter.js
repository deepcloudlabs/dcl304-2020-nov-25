// let/var/const
// 1. Object Oriented -> Class
class ViewModel {
    constructor() {
      this.counter = 0;
      this.spanCounter = document.querySelector("#counter");
      // this.increment = this.increment.bind(this);
    }
    increment = () => { // lambda expression -> this.increment.bind(this)
        this.counter++;
        this.spanCounter.innerHTML = this.counter.toString();
    }
}
// 2. Functional: setInterval() -> function()
// 3. Asynchronous Functions: setInterval()
// 4. Event Triggered Programming
//    i. Onload Event -> Callback Function
//   ii. Timeout Event -> Callback Function
window.onload = function () {
    let viewModel = new ViewModel();
    viewModel.increment(); // viewModel -> this
    // window -> this : viewModel.increment() -> this->window?
    window.setInterval(viewModel.increment, 1000)
};

