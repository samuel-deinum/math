import Quest from "./Quest";

class Snake {
  constructor(canv, operator, finish) {
    //Set Dimentions
    canv.width = 400;
    canv.height = 400;

    //Useful Vars
    this.xv = this.yv = 0;
    this.px = this.py = 1;
    this.gs = 20;
    this.tw = canv.width / this.gs;
    this.th = this.tw;
    this.ax = this.ay = 15;
    this.trail = [];
    this.minTail = 5;
    this.tail = this.minTail;
    this.tailBreak = { n: 0, space: [] };
    this.lose = 3;
    this.gameOver = false;
    this.pressDelay = false;
    this.numA = 5;
    this.q = new Quest(operator);
    this.a = this.newApples();
    this.finish = finish;

    //Get Canvas and set up game
    this.canv = canv;
    this.ctx = canv.getContext("2d");
    document.addEventListener("keydown", e => {
      this.keyPush(e);
    });
    setInterval(() => {
      this.game();
    }, 1000 / 15);
  }

  game() {
    //Update Position
    this.px += this.xv;
    this.py += this.yv;

    //Wrap
    if (this.px < 0) {
      this.px = this.gs - 1;
    }
    if (this.px > this.gs - 1) {
      this.px = 0;
    }
    if (this.py < 0) {
      this.py = this.gs - 1;
    }
    if (this.py > this.gs - 1) {
      this.py = 0;
    }

    //Print Screen As Black
    this.ctx.fillStyle = "black";
    this.ctx.fillRect(0, 0, this.canv.width, this.canv.height);

    //Post Question
    if (!this.gameOver) {
      this.ctx.fillStyle = "white";
      this.ctx.font = "300% Comic Sans MS";
      this.ctx.textAlign = "center";
      const text = this.q.a + " " + this.q.sign + " " + this.q.b;
      this.ctx.fillText(text, this.canv.width / 2, this.canv.height / 2 + 20);
    }

    //Fill Tail
    this.ctx.fillStyle = "lime";
    for (let i = 0; i < this.trail.length; i++) {
      //Fill Space
      this.ctx.fillRect(
        this.trail[i].x * this.tw,
        this.trail[i].y * this.th,
        this.tw * 0.9,
        this.th * 0.9
      );
      //Step on Tail
      if (
        this.trail[i].x === this.px &&
        this.trail[i].y === this.py &&
        (this.xv !== 0 || this.yv !== 0)
      ) {
        this.xv = 0;
        this.yv = 0;
        this.gameOver = true;
      }
    }

    //Add new Spot
    this.trail.push({ x: this.px, y: this.py });
    while (this.trail.length > this.tail) {
      this.trail.shift();
    }

    //Step on Apple
    for (let i = 0; i < this.a.length; i++) {
      if (this.px === this.a[i].x && this.py === this.a[i].y) {
        //Check Appropriate Answer
        if (this.a[i].n === this.q.ans) {
          this.tail++;
        } else {
          this.tail = this.tail - this.lose;
          if (this.tail < this.minTail) {
            this.tail = this.minTail;
          }
          //Add to Tail Break
          this.tailBreak = { n: 10, space: this.trail.slice(0, 3) };
        }
        //Get new Question
        this.q.newQuest();
        this.a = this.newApples();
        break;
      }
    }

    //Fill Apples
    for (let i = 0; i < this.a.length; i++) {
      //Square
      this.ctx.fillStyle = "red";
      this.ctx.fillRect(
        this.a[i].x * this.tw,
        this.a[i].y * this.th,
        this.tw,
        this.th
      );
      //Text
      this.ctx.font = "14px Comic Sans MS";
      this.ctx.textAlign = "center";
      this.ctx.fillStyle = "white";
      this.ctx.fillText(
        this.a[i].n,
        this.a[i].x * this.tw + this.tw * 0.45,
        this.a[i].y * this.th + this.th * 0.8
      );
    }

    //FILL FINAL SCORE AND GAME OVER
    if (this.gameOver) {
      this.ctx.fillStyle = "yellow";
      this.ctx.font = "30px Comic Sans MS";
      this.ctx.textAlign = "center";
      let text = "GAME OVER";
      this.ctx.fillText(text, this.canv.width / 2, this.canv.height / 2 - 10);
      text = "SCORE: " + this.tail;
      this.ctx.fillText(text, this.canv.width / 2, this.canv.height / 2 + 20);
      text = "PRESS ENTER";
      this.ctx.fillText(text, this.canv.width / 2, this.canv.height - 50);
      text = "TO CONTINUE";
      this.ctx.fillText(text, this.canv.width / 2, this.canv.height - 25);
    }

    //Fill Brocken Tail
    if (this.tailBreak.n > 0) {
      this.ctx.fillStyle = "red";
      for (let i = 0; i < this.tailBreak.space.length; i++) {
        this.ctx.fillRect(
          this.tailBreak.space[i].x * this.tw,
          this.tailBreak.space[i].y * this.th,
          this.tw * 0.9,
          this.th * 0.9
        );
      }
      this.tailBreak.n = this.tailBreak.n - 1;
    }
    //Reset Press Delay
    this.pressDelay = false;
  }

  newApples() {
    //Vars
    const res = [];
    const spaceCheck = {};
    const trailCheck = {};
    //Fill TrailCheck with Previous Trail
    for (let i = 0; i < this.trail.length; i++) {
      trailCheck[this.trail[i].x * 100 + this.trail[i].y] = 1;
    }
    //Fill TrailCheck with future Spaces
    for (let i = 1; i < 5; i++) {
      const fx = this.px + this.xv * i;
      const fy = this.py + this.yv * i;
      trailCheck[fx * 100 + fy] = 1;
    }

    //Fill res with Apples
    for (let i = 0; i < this.numA; i++) {
      const ax = Math.floor(Math.random() * this.gs);
      const ay = Math.floor(Math.random() * this.gs);
      if (ax * 100 + ay in spaceCheck || ax * 100 + ay in trailCheck) {
        i--;
      } else {
        //Fill Space Check
        spaceCheck[ax * 10 + ay] = 1;
        const sign = Math.random() > 0.5 ? -1 : 1;
        const an = this.q.ans + i * sign * (Math.floor(Math.random() * 5) + 1);
        res.push({ n: an, x: ax, y: ay });
      }
    }
    return res;
  }

  keyPush(e) {
    if (!this.gameOver && !this.pressDelay) {
      switch (e.keyCode) {
        case 37:
          if (this.xv !== 1) {
            this.xv = -1;
            this.yv = 0;
            this.pressDelay = true;
          }
          break;
        case 38:
          if (this.yv !== 1) {
            this.xv = 0;
            this.yv = -1;
            this.pressDelay = true;
          }
          break;

        case 39:
          if (this.xv !== -1) {
            this.xv = 1;
            this.yv = 0;
            this.pressDelay = true;
          }
          break;
        case 40:
          if (this.yv !== -1) {
            this.xv = 0;
            this.yv = 1;
            this.pressDelay = true;
          }
          break;
        default:
          break;
      }
    } else if (e.keyCode === 13) {
      if (!this.finish.activated) {
        this.finish.activated = true;
        this.finish.method();
      }
    }
  }
}

export default Snake;
