class GameViewModel {
    constructor() {
        this.tries = 0;
        this.level = 3;
        this.moves = [];
        this.secret = this.createSecret();
        this.createSecret = this.createSecret.bind(this);
        this.createDigit = this.createDigit.bind(this);
    }

    createSecret() {
        let digits = [];
        digits.push(this.createDigit(1, 9));
        while (digits.length < this.level) {
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
}