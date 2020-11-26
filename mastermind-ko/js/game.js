class Move {
    constructor(guess, message) {
        this.guess = guess;
        this.message = message;
    }
}

class GameViewModel {
    constructor() {
        this.tries = ko.observable(0);
        this.level = ko.observable(3);
        this.moves = ko.observableArray([]);
        this.guess = ko.observable(123);
        this.secret = this.createSecret();
        this.createSecret = this.createSecret.bind(this);
        this.createDigit = this.createDigit.bind(this);
        this.initGame = this.initGame.bind(this);
        this.play = this.play.bind(this);
        this.createMessage = this.createMessage.bind(this);
    }

    play() {
        let guess = Number(this.guess()) || this.createSecret();
        if (guess === this.secret) {
            this.level(this.level()+1);
            this.initGame();
        } else {
            this.tries(this.tries()+1);
            let message = this.createMessage(guess);
            this.moves.push(new Move(guess, message));
        }
    }

    createSecret() {
        let digits = [];
        digits.push(this.createDigit(1, 9));
        while (digits.length < this.level()) {
            let candidate = this.createDigit(0, 9);
            if (digits.indexOf(candidate) < 0)
                // if (!digits.includes(candidate)) // ES7
                digits.push(candidate);
        }
        return digits.reduce((number, digit) => 10 * number + digit, 0);
    }

    createDigit(min, max) {
        return Math.floor(Math.random() * (max - min + 1)) + min;
    }

    initGame() {
        this.moves([]);
        this.tries(0);
        this.secret = this.createSecret();
    }

    createMessage(guess) {
        let guessAsString = guess.toString();
        let secretAsString = this.secret.toString();
        let perfectMatch = 0, partialMatch = 0;
        for (let i = 0; i < guessAsString.length; i++) {
            let g = guessAsString.charAt(i);
            for (let j = 0; j < secretAsString.length; j++) {
                let s = secretAsString.charAt(j);
                if (g === s) {
                    if (i === j)
                        perfectMatch++;
                    else
                        partialMatch++;
                }
            }
        }
        if (perfectMatch === 0 && partialMatch === 0)
            return "No match";
        let message = "";
        if (partialMatch > 0)
            message = "-" + partialMatch;
        if (perfectMatch > 0)
            message += "+" + perfectMatch;
        return message;
    }
}