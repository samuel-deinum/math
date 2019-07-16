import Quest from "./Quest";

class Train {
  constructor(canv, operator, finish) {
    //Set Height and Width
    canv.width = 600;
    canv.height = 400;

    //UseFull Vars
    //Usefull Vars
    this.q = new Quest();
    this.train = [
      {
        x: canv.width + canv.width / 6,
        on: true,
        a: this.q.a,
        b: this.q.b,
        ans: this.q.ans,
        sign: this.q.sign
      }
    ];
    this.cartWidth = canv.width / 6;
    this.cartHeight = canv.width / 8;
    this.gap = canv.width / 16;
    this.tv = -0.7;
    this.dtv = -0.00005;
    this.ty = canv.height * 0.6;
    this.player = {
      w: canv.width / 18,
      h: canv.width / 18,
      vx: 0,
      vy: 0,
      x: canv.width + 1.5 * this.cartWidth - canv.width / 36,
      y: this.ty - canv.width / 18
    };
    this.pointX = canv.width + canv.width / 6;
    this.anSet = null;
    this.ans = null;
    this.gameOver = false;
    this.score = 0;

    //Set Up Game
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
    //Grap Height and Width
    const w = this.canv.width;
    const h = this.canv.height;
    //Fill Sky
    this.ctx.fillStyle = "blue";
    this.ctx.fillRect(0, 0, w, h);

    //Fill Platform
    this.ctx.fillStyle = "gray";
    this.ctx.fillRect(w / 2 - w / 16, h - w / 12, w / 8, w / 12);
    this.ctx.font = "15px Comic Sans MS";
    this.ctx.textAlign = "center";
    this.ctx.fillStyle = "white";
    let text = this.anSet;
    if (this.anSet == null || this.gameOver) {
      text = " ";
    }
    this.ctx.fillText(text, w / 2, h - w / 24 + 6);

    //TRAIN
    for (let i = 0; i < this.train.length; i++) {
      //Update Position
      this.train[i].x += this.tv;

      //Check Ans
      if (
        this.train[i].on &&
        this.train[i].ans === this.ans &&
        !this.gameOver
      ) {
        this.train[i].on = false;
        this.train[i + 1].on = true;
        this.ans = null;
        this.score++;
      }

      //Update pointX for player
      if (this.train[i].on) {
        this.pointX = this.train[i].x;
      }
      //Fill Cart
      this.ctx.fillStyle = "red";
      this.ctx.fillRect(
        this.train[i].x,
        this.ty,
        this.cartWidth,
        this.cartHeight
      );
      //Fill Text
      this.ctx.font = "30px Comic Sans MS";
      this.ctx.textAlign = "center";
      this.ctx.fillStyle = "white";
      text = this.train[i].a + " " + this.train[i].sign + " " + this.train[i].b;
      this.ctx.fillText(
        text,
        this.train[i].x + this.cartWidth / 2,
        this.ty + this.cartHeight / 2 + 10
      );
      //PLAYER //////////////
      //Update Position
      this.player.x = this.pointX + this.cartWidth / 2 - this.player.w / 2;
      this.ctx.fillStyle = "yellow";
      this.ctx.fillRect(
        this.player.x,
        this.player.y,
        this.player.w,
        this.player.h
      );

      //ADD Cart
      if (this.train[this.train.length - 1].x < w - this.gap) {
        this.q.newQuest();
        this.train.push({
          x: w + w / 6,
          on: false,
          a: this.q.a,
          b: this.q.b,
          ans: this.q.ans,
          sign: this.q.sign
        });
      }

      //Game Over
      if (this.player.x < w / 8) {
        this.gameOver = true;
        this.tv = 0;
        this.dtv = 0;
      }

      //Fill Wall
      this.ctx.fillStyle = "brown";
      this.ctx.fillRect(0, 0, w / 8, h);

      //Display Score
      if (!this.gameOver) {
        this.ctx.fillStyle = "white";
        this.ctx.font = "15px Comic Sans MS";
        this.ctx.textAlign = "start";
        text = "Score: " + this.score;
        this.ctx.fillText(text, 0, 15);
      }

      //Game Over Text
      if (this.gameOver) {
        this.ctx.fillStyle = "yellow";
        this.ctx.font = "30px Comic Sans MS";
        this.ctx.textAlign = "center";
        text = "GAME OVER";
        this.ctx.fillText(text, w / 2, h / 2 - 10);
        text = "SCORE: " + this.score;
        this.ctx.fillText(text, w / 2, h / 2 + 20);
      }

      //Update speed
      this.tv += this.dtv;
    }
  }

  keyPush(e) {
    if (e.keyCode === 13) {
      this.ans = this.anSet;
      this.anSet = null;
    } else if (e.keyCode === 8 || e.keyCode === 46) {
      this.anSet = null;
    } else if (e.keyCode >= 48 && e.keyCode <= 57) {
      this.anSet = this.anSet * 10 + e.keyCode - 48;
    }
  }
}

export default Train;
