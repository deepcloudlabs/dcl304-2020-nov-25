class App {
    constructor(gameViewModel) {
        this.tries = jQuery("#tries");
        this.level = $("#gamelevel");
        this.play = $("#play");
        this.guess = $("#guess");
        this.history = $("#history");
        this.gameViewModel = gameViewModel;
        this.init = this.init.bind(this);
        this.updateView = this.updateView.bind(this);
    }
    init(){
        this.play.click(() => {
            let guess = this.guess.val();
            this.gameViewModel.play(guess); // changes game state
            this.updateView();
        });
    }

    updateView() {
        this.tries.text(this.gameViewModel.tries);
        this.level.text(this.gameViewModel.level);
        this.history.empty();
        this.gameViewModel
            .moves
            .forEach( move => {
                this.history.append(
                    "<tr>"+
                       "<td>"+move.guess+"</td>"+
                       "<td>"+move.message+"</td>"+
                    "</tr>"
                );
            })
    }
}

// pure js
window.onload = ()=>{
    let gameViewModel = new GameViewModel();
    let app = new App(gameViewModel);
    app.init();
}

// jQuery
/*
$(document).ready(()=>{
    let gameViewModel = new GameViewModel();
    let app = new App(gameViewModel);
    app.init();
})
*/
