class Quest {
  constructor(type) {
    this.type = type;
    this.a = null;
    this.b = null;
    this.ans = null;
    this.sign = null;
    this.ops = ["+", "-", "*", "/"];
    this.newQuest();
  }

  newQuest() {
    let mType = null;
    if (this.type == null) {
      let index = Math.floor(Math.random() * 4);
      mType = this.ops[index];
    } else {
      mType = this.type;
    }
    switch (mType) {
      case "+":
        this.a = Math.floor(Math.random() * 10) + 1;
        this.b = Math.floor(Math.random() * 10) + 1;
        this.ans = this.a + this.b;
        this.sign = "+";
        break;
      case "-":
        this.b = Math.floor(Math.random() * 10) + 1;
        this.ans = Math.floor(Math.random() * 10) + 1;
        this.a = this.b + this.ans;
        this.sign = "-";
        break;
      case "*":
        this.a = Math.floor(Math.random() * 10) + 1;
        this.b = Math.floor(Math.random() * 10) + 1;
        this.ans = this.a * this.b;
        this.sign = "X";
        break;
      case "/":
        this.b = Math.floor(Math.random() * 10) + 1;
        this.ans = Math.floor(Math.random() * 10) + 1;
        this.a = this.b * this.ans;
        this.sign = "÷";
        break;
      default:
        console.log("INCORRECT TYPE");
        break;
    }
  }
}

export default Quest;
