import CryptoJS from "crypto-js";
var seedrandom = require('seedrandom');

class DateRandom {
  constructor(dateinput) {
    this.randomlettergen = seedrandom(CryptoJS.SHA512(dateinput + "letter").toString());
    this.randomvowelgen = seedrandom(CryptoJS.SHA512(dateinput + "vowel").toString());
    this.randomconsonantsgen = seedrandom(CryptoJS.SHA512(dateinput + "consonants").toString());
    this.randomdirection = seedrandom(CryptoJS.SHA512(dateinput + "direction").toString());
    this.dateinput = dateinput;
  }
  GetLetter() {
    var random = this.randomlettergen();
    var Lindex = Math.floor(random * 78);
    var alphabet = "aaaaabbccddddeeeeeeffggghhiiiiijkllllmmnnnnnnooooppqrrrrrrssssttttttuuvvwwxyyz";
    var arr = (alphabet).split("");
    var letter = arr[Lindex]
    return letter;
  }
  GetVowel() {
    var random = this.randomvowelgen();
    var Lindex = Math.floor(random * 42);
    var alphabet = "aaaaaaaaaeeeeeeeeeeeeiiiiiiiiioooooooouuuu";
    var arr = (alphabet).split("");
    var letter = arr[Lindex]
    return letter;
  }
  GetConsonants() {
    var random = this.randomconsonantsgen();
    var Lindex = Math.floor(random * 56);
    var alphabet = "bbccddddffggghhjkllllmmnnnnnnppqrrrrrrssssttttttvvwwxyyz";
    var arr = (alphabet).split("");
    var letter = arr[Lindex]
    return letter;
  }
  GetTileType(x, y) {
    var random = seedrandom(CryptoJS.SHA512(this.dateinput + x + y).toString())();
    var Lindex = Math.floor(random * 80);
    var arr = Array(48).fill("n").concat(Array(2).fill("rd")).concat(Array(2).fill("rbe"))
      .concat(Array(4).fill("1h")).concat(Array(4).fill("2h")).concat(Array(3).fill("3h"))
      .concat(Array(4).fill("1p")).concat(Array(4).fill("2p")).concat(Array(3).fill("3p"))
      .concat(Array(4).fill("2s")).concat(Array(2).fill("3s"));
    return arr[Lindex];
  }
  GetDirection(){
    var random = this.randomdirection();
    var Lindex = Math.floor(random * 4);
    var arr = ["up","down","left","right"];
    return arr[Lindex];
  }
  GetDiff(date) {
    var odate = new Date(2023, 7, 30);
    var diff = new Date(date - odate);
    return (Math.ceil(diff / (1000 * 60 * 60 * 24)));
  }
}

export default DateRandom;