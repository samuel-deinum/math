import Quest from "./Quest";

class FlappyBird {
  constructor(canv, operator, finish) {
    //Update canv dimentions
    canv.width = 600;
    canv.height = 400;

    //Useful Vars
    this.bird = { x: 10, y: canv.height / 2, yv: 0, w: 5, h: 5 };
    this.gravity = 0;
    this.q = new Quest();
    this.wv = 0;
    this.ww = 5;
    this.wsw = 16.57;
    this.wsh = 7;
    this.score = 0;
    this.gameOver = false;
    this.walls = [
      {
        x: canv.width + this.ww * 2,
        a: this.q.a,
        b: this.q.b,
        ans: this.q.ans,
        sign: this.q.sign,
        fake: this.q.ans + 1,
        top: true,
        change: "none"
      }
    ];
    //Start Game
    this.canv = canv;
    this.ctx = canv.getContext("2d");
    document.addEventListener("keydown", e => {
      this.keyPush(e);
    });
    setInterval(() => {
      this.game();
    }, 1000 / 60);
  }

  game() {
    //Fill Background
    const w = this.canv.width;
    const h = this.canv.height;

    //Fill Sky
    this.ctx.fillStyle = "#26A0B4";
    this.ctx.fillRect(0, 0, w, h);

    //Walls
    for (let i = 0; i < this.walls.length; i++) {
      //Update
      this.walls[i].x += this.wv;
      //Check Intersection
      const bxl = (this.bird.x * w) / 100;
      const bxr = ((this.bird.x + this.bird.w) * w) / 100;
      const byt = this.bird.y;
      const byb = this.bird.y + (this.bird.h * w) / 100;
      const sxl = this.walls[i].x + ((this.ww / 2 - this.wsw / 2) * w) / 100;
      const sxr = this.walls[i].x + ((this.ww / 2 + this.wsw / 2) * w) / 100;
      const syt = h / 2 - ((this.wsh / 2) * w) / 100;
      const syb = h / 2 + ((this.wsh / 2) * w) / 100;
      if (bxr > sxl && bxl < sxr && byt < syb && byb > syt) {
        this.endGame();
      }

      //Fill Back
      this.ctx.fillStyle = "#EA7D1C";
      this.ctx.fillRect(this.walls[i].x, 0, (this.ww * w) / 100, h);
      switch (this.walls[i].change) {
        case "GT":
          //Good
          this.ctx.fillStyle = "#7FE957";
          this.ctx.fillRect(this.walls[i].x, 0, (this.ww * w) / 100, h / 2);
          break;
        case "BT":
          //Bad
          this.ctx.fillStyle = "#ED2B14";
          this.ctx.fillRect(this.walls[i].x, 0, (this.ww * w) / 100, h / 2);
          break;
        case "GB":
          //Good
          this.ctx.fillStyle = "#7FE957";
          this.ctx.fillRect(this.walls[i].x, h / 2, (this.ww * w) / 100, h / 2);
          break;
        case "BB":
          //Bad
          this.ctx.fillStyle = "#ED2B14";
          this.ctx.fillRect(this.walls[i].x, h / 2, (this.ww * w) / 100, h / 2);
          break;
        default:
          break;
      }
      if (
        this.walls[i].x < ((this.bird.x + this.bird.w) * w) / 100 &&
        this.walls[i].change === "none"
      ) {
        if (this.bird.y < h / 2) {
          if (this.walls[i].top) {
            this.walls[i].change = "GT";
            this.score++;
          } else {
            this.walls[i].change = "BT";
            this.endGame();
          }
        } else {
          if (this.walls[i].top) {
            this.walls[i].change = "BB";
            this.endGame();
          } else {
            this.walls[i].change = "GB";
            this.score++;
          }
        }
      }

      //Fill Sign
      this.ctx.fillStyle = "#E8AD79";
      this.ctx.fillRect(
        this.walls[i].x + ((this.ww / 2 - this.wsw / 2) * w) / 100,
        h / 2 - ((this.wsh / 2) * w) / 100,
        (this.wsw * w) / 100,
        (this.wsh * w) / 100
      );
      //Sign Text
      this.ctx.font = "25px Comic Sans MS";
      this.ctx.textAlign = "center";
      this.ctx.fillStyle = "white";
      let text =
        this.walls[i].a + " " + this.walls[i].sign + " " + this.walls[i].b;
      this.ctx.fillText(
        text,
        this.walls[i].x + ((this.ww / 2) * w) / 100,
        h / 2 + 7
      );
      //Answers
      let up = this.walls[i].fake;
      let bot = this.walls[i].ans;
      if (this.walls[i].top) {
        up = this.walls[i].ans;
        bot = this.walls[i].fake;
      }
      this.ctx.fillText(up, this.walls[i].x + ((this.ww / 2) * w) / 100, h / 4);
      this.ctx.fillText(
        bot,
        this.walls[i].x + ((this.ww / 2) * w) / 100,
        (h * 3) / 4 + 7
      );
    }
    //Add New Wall
    if (this.walls[this.walls.length - 1].x < 0.3 * w) {
      this.q.newQuest();
      let t = false;
      let s = 1;
      if (Math.random() > 0.5) {
        t = true;
      }
      if (Math.random() > 0.5) {
        s = -1;
      }
      const wall = {
        x: w + this.ww * 2,
        a: this.q.a,
        b: this.q.b,
        ans: this.q.ans,
        sign: this.q.sign,
        fake: this.q.ans + s * (Math.floor(Math.random() * 2) + 1),
        top: t,
        change: "none"
      };
      this.walls.push(wall);
    }

    //Remove Wall
    if (this.walls[0].x < -0.2 * w) {
      this.walls.shift();
    }

    //Update Bird
    this.bird.yv += this.gravity;
    this.bird.y += this.bird.yv;
    //Fill Bird
    this.ctx.fillStyle = "#EAE71C";
    this.ctx.fillRect(
      (this.bird.x * w) / 100,
      this.bird.y,
      (this.bird.w * w) / 100,
      (this.bird.h * w) / 100
    );

    //Display Score
    if (!this.gameOver) {
      this.ctx.fillStyle = "white";
      this.ctx.font = "30px Comic Sans MS";
      this.ctx.textAlign = "start";
      let text = " " + this.score;
      this.ctx.fillText(text, 0, 30);
    }
    //Game Over Text
    if (this.gameOver) {
      this.ctx.fillStyle = "yellow";
      this.ctx.font = "30px Comic Sans MS";
      this.ctx.textAlign = "center";
      let text = "GAME OVER";
      this.ctx.fillText(text, w / 2, h / 2 - 10);
      text = "SCORE: " + this.score;
      this.ctx.fillText(text, w / 2, h / 2 + 20);
    }
  }

  endGame() {
    this.gameOver = true;
    this.wv = 0;
    this.bird.yv = 0;
    this.gravity = 0;
  }

  keyPush() {
    if (!this.gameOver) {
      this.bird.yv = -10;
      if (this.wv === 0) {
        this.wv = -3;
        this.gravity = 0.6;
        this.bird.yv = -10;
      }
    }
  }
}

export default FlappyBird;
