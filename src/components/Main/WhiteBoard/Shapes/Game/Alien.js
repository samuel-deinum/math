import Quest from "./Quest";

class Alien {
  constructor(canv, operator, finish) {
    //Set canv Dimentions
    canv.width = 400;
    canv.height = 600;

    //Useful Vars
    this.aliens = [];
    this.destroyed = [
      [
        { x: 200, y: 100, xv: 1, yv: -5 },
        { x: 200, y: 100, xv: 0, yv: -10 },
        { x: 200, y: 100, xv: -1, yv: -5 },
        { x: 200, y: 100, xv: -2, yv: 0 }
      ]
    ];
    this.ans = null;
    this.anSet = null;
    this.gravity = 0.7;
    this.count = 0;
    this.countTime = 300;
    this.q = new Quest();
    this.range = 500;
    this.gap = 50;
    this.life = 5;
    this.score = 0;
    this.gameOver = false;

    //Canvas Set Up
    //Grap Canvas, Start Game
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
    //Short hand height and width
    const h = this.canv.height;
    const w = this.canv.width;

    //Fill Sky
    this.ctx.fillStyle = "blue";
    this.ctx.fillRect(0, 0, w, h * 0.8);

    //Fill Ground
    this.ctx.fillStyle = "green";
    this.ctx.fillRect(0, h * 0.8, w, h * 0.2);

    //Fill Platform
    this.ctx.fillStyle = "gray";
    this.ctx.fillRect(w / 2 - w / 16, h * 0.8, w / 8, h / 12);
    //text
    this.ctx.font = "15px Comic Sans MS";
    this.ctx.textAlign = "center";
    this.ctx.fillStyle = "white";
    let text = this.anSet;
    if (this.anSet == null || this.gameOver) {
      text = " ";
    }
    this.ctx.fillText(text, w / 2, h * 0.8 + h / 24 + 6);

    //ALIENS//////////////
    const del = [];
    //Spread aliens
    for (let i = 0; i < this.aliens.length; i++) {
      if (this.aliens[i].ans === this.ans && this.aliens[i].status !== "land") {
        del.push(i);
        this.score++;
        //TODO: Add a Destoyed
      } else {
        //Stop if to far
        if (this.aliens[i].height > h * 0.9) {
          this.aliens[i].status = "land";
          this.life--;
          this.aliens[i].height = h * 0.9;
        }
        //Check Status
        if (this.aliens[i].status === "fall") {
          this.aliens[i].height += this.aliens[i].speed;
        }
        //Fill Box
        this.ctx.fillStyle = "red";
        this.ctx.fillRect(
          (this.aliens[i].lane * w) / 6,
          this.aliens[i].height,
          w / 6,
          w / 8
        );

        //Fill Text
        if (this.aliens[i].status !== "land") {
          this.ctx.font = "15px Comic Sans MS";
          this.ctx.textAlign = "center";
          this.ctx.fillStyle = "white";
          text =
            this.aliens[i].a +
            " " +
            this.aliens[i].sign +
            " " +
            this.aliens[i].b;
          this.ctx.fillText(
            text,
            (this.aliens[i].lane * w) / 6 + w / 12,
            this.aliens[i].height + w / 16 + 6
          );
        }
      }
    }
    //Delete Aliens
    if (del.length === 0 && this.ans !== null) {
      this.life--;
    } else {
      for (let i = 0; i < del.length; i++) {
        this.aliens.splice(del[i] - i, 1);
      }
    }
    //Reset Answer
    this.ans = null;

    //Destroyed
    for (let i = 0; i < this.destroyed.length; i++) {
      for (let j = 0; j < this.destroyed[i].length; j++) {
        this.destroyed[i][j].yv += this.gravity;
        this.destroyed[i][j].x += this.destroyed[i][j].xv;
        this.destroyed[i][j].y += this.destroyed[i][j].yv;

        this.ctx.fillStyle = "black";
        this.ctx.fillRect(
          this.destroyed[i][j].x,
          this.destroyed[i][j].y,
          10,
          10
        );
      }
    }

    //Add new Aliens
    this.count++;
    if (this.count > this.countTime && !this.gameOver) {
      //Choose Lane
      const l = Math.floor(Math.random() * 6);
      //Update Question
      this.q.newQuest();
      //Add new Alien
      this.aliens.push({
        type: 1,
        lane: l,
        height: -w / 8,
        status: "fall",
        ans: this.q.ans,
        a: this.q.a,
        b: this.q.b,
        sign: this.q.sign,
        speed: 1
      });
      //Reset Count
      this.count = 0;
      //Reset Countime
      this.countTime = Math.floor(Math.random() * this.range) + this.gap;
    }

    //Lower Range
    if (this.range > 100) this.range = this.range - 0.1;

    //Display Life and Score
    if (!this.gameOver) {
      this.ctx.fillStyle = "white";
      this.ctx.font = "15px Comic Sans MS";
      this.ctx.textAlign = "start";
      text = "Lives: " + this.life;
      this.ctx.fillText(text, 0, 15);
      text = "Score: " + this.score;
      this.ctx.fillText(text, 0, 40);
    }

    //Game Over
    if (this.life === 0) {
      this.gameOver = true;
      //Stop all Aliens
      for (let i = 0; i < this.aliens.length; i++) {
        this.aliens[i].status = "land";
      }
      this.life = -1;
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

export default Alien;
