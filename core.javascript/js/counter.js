// 1. Object Oriented -> Class
class ViewModel {
    constructor() {
      this.counter = 0;
      this.spanCounter = document.querySelector("#counter");
    }
    increment() {
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
    setInterval(viewModel.increment, 1000)
};

