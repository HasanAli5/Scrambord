"use client"
import Draggable from "react-draggable";
import { Component } from "react";
import CryptoJS from "crypto-js";
import { Bars3Icon, XMarkIcon, ArrowDownCircleIcon, ArrowLeftCircleIcon, ArrowRightCircleIcon, ArrowUpCircleIcon, PlusIcon } from '@heroicons/react/24/solid';
import { ArrowUpOnSquareIcon, QuestionMarkCircleIcon, ChartBarIcon, AcademicCapIcon, HandRaisedIcon, TrophyIcon, ArrowPathIcon, MoonIcon, SunIcon, CogIcon } from '@heroicons/react/24/outline';
import { v4 as uuidv4 } from 'uuid';
import jsonadata from './words_dictionary.json' assert { type: 'json' };
import { GetScores, SubmitScore } from "./score";
var seedrandom = require('seedrandom');


class Checker {
  constructor() {
    this.wordsarray = new Array();
    let tempwords = Object.keys(jsonadata);
    for (let i = 0; i < tempwords.length; i++) {
      if (tempwords[i].length > 1) {
        this.wordsarray.push(tempwords[i]);
      }
    }
  }
  validify(board) {
    var preword = new String();
    for (let j = 0; j < board[0].length; j++) {//horizontal
      for (let i = 0; i < board.length; i++) {
        if (board[i][j] != "") {
          preword += board[i][j];
        }
        if (board[i][j] != "" && (i + 1 == board.length || board[i + 1][j] == "") && preword.length > 0) {
          //todo
          if (preword.length == 1) {
            var vertadj = false;
            if (j != 0)//check down
            {
              if (board[i][j - 1] != "") {
                vertadj = true;
              }
            }
            if (j + 1 != board[0].length)//check up
            {
              if (board[i][j + 1] != "") {
                vertadj = true;
              }
            }
            if (vertadj != true) {
              return false;
            }
          }
          else//iterate through dictionary to see if is a word
          {
            var isword = false;
            for (let k = 0; k < this.wordsarray.length; k++) {
              if (this.wordsarray[k] == preword) {
                isword = true;
                break;
              }
            }
            if (isword != true) {
              return false;
            }
          }
          preword = "";
        }

      }
      preword = "";
    }
    preword = "";
    for (let i = 0; i < board.length; i++)//vertical
    {
      for (let j = 0; j < board[0].length; j++) {
        if (board[i][j] != "")//read to add a letters to word
        {
          preword += board[i][j];
        }
        if (board[i][j] != "" && (j + 1 == board[0].length || board[i][j + 1] == "") && preword.length > 0)//ending of word
        {
          if (preword.length == 1)//if letter in iso
          {
            var vertadj = false;
            if (i != 0)//check left
            {
              if (board[i - 1][j] != "") {
                vertadj = true;
              }
            }
            if (i + 1 != board.length)//check right
            {
              if (board[i + 1][j] != "") {
                vertadj = true;
              }
            }
            if (vertadj != true) {
              return false;
            }
          }
          else//iterate through dictionary to see if is a word
          {
            var isword = false;
            for (let k = 0; k < this.wordsarray.length; k++) {
              if (this.wordsarray[k] == preword) {
                isword = true;
                break;
              }
              else if ((this.wordsarray[k]).split("").reverse().join("") == preword) {
                isword = true;
                break;
              }
            }
            if (isword != true) {
              return false;
            }
          }
          preword = "";
        }

      }
      preword = "";
    }
    return true;
  }
  getscr(intlen) {
    var score = 0;
    for (let i = 1; i <= intlen; i++) {
      score += 1 * i;
    }
    return score
  }
  Evalute(board,spTiles) {
    var preword = new String();
    var arr = [];
    var wordcountarr = [];
    var bonuses = [0,0,0,0]
    //1st - bonus points
    //2nd - bonus pens
    //3rd - expands
    //4th - redraws
    var score = 0;
    for (let j = 0; j < board[0].length; j++) {//horizontal
      var scoremultiplier = 1;
      for (let i = 0; i < board.length; i++) {//each column
        if (board[i][j] != "") {
          preword += board[i][j];
          switch(spTiles[i][j].type){
            case "2s":
              scoremultiplier*=2;
              break;
            case "3s":
              scoremultiplier*=3;
              break;
            case "1h":
              bonuses[1]+=1;
              break;
            case "2h":
              bonuses[1]+=2;
              break;
            case "3h":
              bonuses[1]+=3;
              break;
            case "1p":
              bonuses[0]+=1;
              break;
            case "2p":
              bonuses[0]+=2;
              break;
            case "3p":
              bonuses[0]+=3;
              break;
            case "rbe":
              bonuses[2]+=1;
              break;
            case "rd":
              bonuses[3]+=1;
              break;
          }
        }
        if (board[i][j] != "" && (i + 1 == board.length || board[i + 1][j] == "") && preword.length > 0) {
          //check if ends 
          if (preword.length == 1) {//if not big enough
            var vertadj = false;
            if (j != 0)//check down
            {
              if (board[i][j - 1] != "") {
                vertadj = true;
              }
            }
            if (j + 1 != board[0].length)//check up
            {
              if (board[i][j + 1] != "") {
                vertadj = true;
              }
            }
            if (vertadj != true) {
              return false;
            }
            scoremultiplier=1;
          }
          else//iterate through dictionary to see if is a word
          {
            var isword = false;
            for (let k = 0; k < this.wordsarray.length; k++) {
              if (this.wordsarray[k] == preword) {
                isword = true;
                while (wordcountarr.length < preword.length) {
                  wordcountarr.push(0);
                }
                wordcountarr[preword.length - 1] += 1;
                score += this.getscr(preword.length)*scoremultiplier;
                scoremultiplier=1;
                break;
              }
            }
            if (isword != true) {
              return false;
            }
          }
          preword = "";
        }

      }
      preword = "";
    }
    preword = "";
    for (let i = 0; i < board.length; i++)//vertical
    {
      scoremultiplier=1;
      for (let j = 0; j < board[0].length; j++) {
        if (board[i][j] != "")//read to add a letters to word
        {
          preword += board[i][j];
          if(spTiles[i][j].type=="2s"){
            scoremultiplier*=2;
          }
          if(spTiles[i][j].type=="3s"){
            scoremultiplier*=3;
          }
        }
        if (board[i][j] != "" && (j + 1 == board[0].length || board[i][j + 1] == "") && preword.length > 0)//ending of word
        {
          if (preword.length == 1)//if letter in iso
          {
            var vertadj = false;
            if (i != 0)//check left
            {
              if (board[i - 1][j] != "") {
                vertadj = true;
              }
            }
            if (i + 1 != board.length)//check right
            {
              if (board[i + 1][j] != "") {
                vertadj = true;
              }
            }
            if (vertadj != true) {
              return false;
            }
            scoremultiplier=1;
          }
          else//iterate through dictionary to see if is a word
          {
            var isword = false;
            for (let k = 0; k < this.wordsarray.length; k++) {
              if (this.wordsarray[k] == preword) {
                isword = true;
                while (wordcountarr.length < preword.length) {
                  wordcountarr.push(0);
                }
                wordcountarr[preword.length - 1] += 1;
                score += this.getscr(preword.length)*scoremultiplier;
                scoremultiplier=1;
                break;
              }
              else if (this.wordsarray[k] == preword.split("").reverse().join("")) {
                isword = true;
                while (wordcountarr.length < preword.length) {
                  wordcountarr.push(0);
                }
                wordcountarr[preword.length - 1] += 1;
                score += this.getscr(preword.length)*scoremultiplier;
                scoremultiplier=1;
                break;
              }
            }
            if (isword != true) {
              return false;
            }
          }
          preword = "";
        }

      }
      preword = "";
    }
    arr = [wordcountarr, score]
    return arr.concat(bonuses);
  }
  WordsEval(arr) {//expansion
    var tot = 0;
    for (let i = 0; i < arr.length; i++) {
      if (i == 1) {//2l word
        tot += (arr[i] * 1);
      }
      else if (i == 2) {
        tot += (arr[i] * 2);
      }
      else if (i == 3) {
        tot += (arr[i] * 2);
      }
      else if (i > 3) {
        tot += (arr[i] * (4 + (i - 3)));
      }
    }
    return tot;
  }
  newtilebool(nboard, oboard, i, j) {
    if (nboard[i][j] != oboard[i][j]) {
      return true;
    } else { return false; }
  }
  RedrawHandCheck(hand, input) {//if element is in index return number if not returns false
    for (let i = 0; i < hand.length; i++) {
      if (hand[i] === input) {
        return i;
      }
    }
    return false;
  }


}
class TileStatics {
  static GetColour(t) {
    let type = String(t);
    if (type.includes("h")) {
      return "red";
    }
    else if (type.includes("p")) {
      return "green";
    }
    else if (type.includes("s")) {
      return "orange";
    }
    else if (type == "rd") {
      return "purple";
    }
    else if (type == "rbe") {
      return "blue";
    }
    else {
      return "default";
    }
  }
  static GetText(t) {
    let type = String(t)
    switch (type) {
      case "1h":
        return "1";
      case "2h":
        return "2";
      case "3h":
        return "3";
      case "1p":
        return "1";
      case "2p":
        return "2";
      case "3p":
        return "3";
      case "2s":
        return "2x";
      case "3s":
        return "3x";
      default:
        return "";
    }
  }
}
class Tile {
  constructor(xcoord, ycoord, DateRandom) {
    this.x = xcoord;
    this.y = ycoord;
    this.type = DateRandom.GetTileType(xcoord, ycoord);
  }

}
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
}
function datediff(date) {
  var odate = new Date(2023, 7, 30);
  var diff = new Date(date - odate);
  return (Math.ceil(diff / (1000 * 60 * 60 * 24)));
}

class Game extends Component {
  //class intial
  constructor(props) {
    super(props)
    this.checks = new Checker();
    this.date = new Date();
    this.dateinput = this.date.toUTCString().split(" ").splice(0, 4).join(" ");
    this.randomiser = new DateRandom(this.dateinput);
    this.caps = 0;
    this.highscore = 0;
    this.state = {
      scoresdata : null,
      day: datediff(this.date),
      scorebindex: datediff(this.date),
      currentscoreboard: null,
      scoretimeupdatems: this.date.getTime(),
      scoretimeupdate: this.date.toLocaleTimeString(),
      username: "Player",
      gamestart: true,
      dragbool: false,
      showdono: false,
      showpop: false,
      showinfopop: true,
      summarypop: false,
      showleaderpop: false,
      currentvalid: true,
      submitted: false,
      darkmode: "auto",
      SelectedLetterIndex: -1,
      RedrawIndexes: [],
      RedrawBool: false,
      GridX: 5,
      GridY: 5,
      Round: 1,
      PrevWordCount: 0,
      PrevBonus:[0,0,0,0],
      Score: 0,
      ExpandPoint: 1,
      IntermediatePoints: 0,
      PenaltyPoints: 0,
      HandLetters: [this.randomiser.GetVowel(), this.randomiser.GetVowel(), this.randomiser.GetLetter(), this.randomiser.GetLetter(), this.randomiser.GetLetter(), this.randomiser.GetLetter(), this.randomiser.GetLetter(), this.randomiser.GetLetter(), this.randomiser.GetConsonants(), this.randomiser.GetConsonants()],
      disabledButtons: Array(10).fill(false),
      GridLetters: Array.from({ length: 5 }, e => Array(5).fill("")),//the board in realtime start goes down then  right
      BoardAppends: new Array(),//the action on the board
      storedgrid: Array.from({ length: 5 }, e => Array(5).fill("")),
      spTiles: Array.from({ length: 5 }, e => Array(5).fill(new Tile(0, 0, this.randomiser))),
      leastx: 0,
      leasty: 0
    };//no edits
    var Tiles = this.state.spTiles;
    for (let i = 0; i < Tiles.length; i++) {
      for (let j = 0; j < Tiles[i].length; j++) {
        Tiles[i][j] = new Tile(i, j, this.randomiser);
      }
    }
    this.setState({ spTiles: Tiles });
  }
  async GetScoreboards(first) {
    if ((new Date().getTime() - this.state.scoretimeupdatems) < 60000 && !first) {
      return this.state.scoresdata;
    }
    try {
      var jsonscore = await GetScores();
    }
    catch (err) { console.log(err) }
    this.setState({ scoretimeupdate: new Date().toLocaleTimeString(), scoretimeupdatems: new Date().getTime() })
    return jsonscore;
  }
  GetDaysScore(jsonscore, day) {
    var jsonadata = [];
    Object.assign(jsonadata, jsonscore);
    for (let i = 0; i < jsonadata.length; i++) {
      if (jsonadata[i][0] == day) {
        return jsonadata[i][1];
      }
    }
  }
  GetNextDaysScore(jsonscore, day) {
    var jsonadata = [];
    Object.assign(jsonadata, jsonscore);
    for (let i = 0; i < jsonadata.length; i++) {
      if (jsonadata[i][0] > day) {
        this.setState({scorebindex:jsonadata[i][0]});
        return jsonadata[i][1];
      }
    }
    this.setState({scorebindex:this.state.day});
  }
  GetPrevDaysScore(jsonscore, day) {
    var jsonadata = [];
    Object.assign(jsonadata, jsonscore);
    for (let i = 0; i < jsonadata.length; i++) {
      if (jsonadata[jsonadata.length-1-i][0] < day) {
        this.setState({scorebindex:jsonadata[jsonadata.length-1-i][0]});
        return jsonadata[jsonadata.length-1-i][1];
      }
    }
    return jsonscore[0][1];
  }
  //grid props
  MakeGrid = () => {
    let gridhtml = [];
    for (let i = 0; i < this.state.GridX; i++) {
      gridhtml.push(<div className="flex flex-col-reverse justify-center gap-2"><this.MakeRow posx={i} /></div>);
    }
    return gridhtml;

  }
  MakeRow = (posx) => {
    let rowbuttons = [];
    var tiles = this.state.spTiles;
    for (let i = 0; i < this.state.GridY; i++) {
      var colour = TileStatics.GetColour(tiles[posx.posx][i].type);
      var alttext = TileStatics.GetText(tiles[posx.posx][i].type);
      const b = (
        <button onClick={() => !this.state.dragbool && this.BoardInput(posx.posx, i)}
          onTouchStart={() => setTimeout(() => { if (!this.state.dragbool) { this.BoardInput(posx.posx, i) } }, 200)}
          id={"GridButton" + ((i + 1) + ((posx.posx) * this.state.GridX))}
          className={`
      ${this.checks.newtilebool(this.state.GridLetters, this.state.storedgrid, posx.posx, i) ? `dark:text-orange-200 text-sky-900` : `dark:text-white text-slate-950`}
      ${colour == "red" ? " !bg-red-100 border-red-300 dark:!border-red-800 dark:!bg-red-950" : null}
      ${colour == "green" ? " !bg-green-100 border-green-300 dark:!border-green-800 dark:!bg-green-950" : null}
      ${colour == "orange" ? " !bg-orange-100 border-orange-300 dark:!border-orange-800 dark:!bg-orange-950" : null}
      ${colour == "blue" ? " !bg-blue-100 border-blue-300 dark:!border-blue-800 dark:!bg-blue-950" : null}
      ${colour == "purple" ? " !bg-purple-100 border-purple-300 dark:!border-purple-800 dark:!bg-purple-950" : null}
      ${this.state.GridLetters[posx.posx][i] == "" ? "!text-xl !text-stone-600 dark:!text-stone-300" : null}
      transition w-19 h-19 ease-in-out hover:scale-110 dark:bg-stone-900  dark:border-stone-900  bg-white border active:ring dark:active:ring-orange-500 active:ring-sky-500 rounded-md lg:rounded-lg aspect-square text-5xl`}>
          {this.state.GridLetters[posx.posx][i] != "" ? this.state.GridLetters[posx.posx][i] : alttext}
        </button>);
      rowbuttons.push(b)
    }
    return (
      rowbuttons
    )
  }
  BoardInput = (i, j) => {
    if (this.state.gamestart) {
      this.setState({ currentvalid: true });
      var gridcopy = this.state.GridLetters.map(function (arr) { return arr.slice() });
      var appendcopy = this.state.BoardAppends.map(function (arr) { return arr.slice() });
      var disbuttonscopy = this.state.disabledButtons.slice();
      if (gridcopy[i][j] !== "" && this.state.SelectedLetterIndex != -1) {//do a swap
        for (let k = 0; k < appendcopy.length; k++) {
          if (appendcopy[k][0] == i && appendcopy[k][1] == j) {
            gridcopy[i][j] = "";
            disbuttonscopy[appendcopy[k][2]] = false;
            appendcopy.splice(k, 1);
            gridcopy[i][j] = this.state.HandLetters[this.state.SelectedLetterIndex];
            disbuttonscopy[this.state.SelectedLetterIndex] = true;
            appendcopy.push(new Array(i, j, this.state.SelectedLetterIndex));
            break;
          }
        }
      }
      else if (gridcopy[i][j] !== "") {//erasion
        for (let k = 0; k < appendcopy.length; k++) {
          if (appendcopy[k][0] == i && appendcopy[k][1] == j) {
            gridcopy[i][j] = "";
            disbuttonscopy[appendcopy[k][2]] = false;
            appendcopy.splice(k, 1);
            break;
          }
        }
      }
      else if (this.state.SelectedLetterIndex === -1) {//nothing selected
        return;
      }
      else {//placement
        gridcopy[i][j] = this.state.HandLetters[this.state.SelectedLetterIndex];
        disbuttonscopy[this.state.SelectedLetterIndex] = true;
        appendcopy.push(new Array(i, j, this.state.SelectedLetterIndex));
      }
      //0 is board 1 is hand
      this.setState({ GridLetters: gridcopy });
      this.setState({ disabledButtons: disbuttonscopy });
      this.setState({ BoardAppends: appendcopy });
      this.setState({ SelectedLetterIndex: -1 });
    }
  }

  ExpandGrid(direction) {
    var lx = this.state.leastx;
    var ly = this.state.leasty;
    if (!this.state.gamestart) {
      return;
    }
    var agridcopy = this.state.GridLetters.map(function (arr) {
      return arr.slice();
    });
    var ogridcopy = this.state.storedgrid.map(function (arr) {
      return arr.slice();
    });
    var spTilescopy = this.state.spTiles.map(function (arr) {
      return arr.slice();
    });
    var appendcopy = this.state.BoardAppends.map(function (arr) { return arr.slice() });
    //expand up
    //expand down
    //expand right
    //expand left
    //bottom right is 0 0
    if (direction == "right" || direction == "left") {
      if (direction == "right") {
        agridcopy.push(Array(agridcopy[0].length).fill(""));
        ogridcopy.push(Array(ogridcopy[0].length).fill(""));
        spTilescopy.push(Array(spTilescopy[0].length).fill(new Tile(0, 0, this.randomiser)));
        for (let i = 0; i < spTilescopy[0].length; i++) {
          spTilescopy[spTilescopy.length - 1][i] = new Tile(spTilescopy.length - 1 + lx, i + ly, this.randomiser);
        }
      }
      else {
        lx -= 1
        agridcopy.splice(0, 0, Array(agridcopy[0].length).fill(""));
        ogridcopy.splice(0, 0, Array(ogridcopy[0].length).fill(""));
        spTilescopy.splice(0, 0, Array(spTilescopy[0].length).fill(new Tile(0, 0, this.randomiser)));
        for (let i = 0; i < spTilescopy[0].length; i++) {
          spTilescopy[0][i] = new Tile(lx, i + ly, this.randomiser);
        }
        for (let k = 0; k < appendcopy.length; k++) {
          appendcopy[k][0] += 1;
        }
      }
      this.setState({ GridLetters: agridcopy,storedgrid: ogridcopy,BoardAppends: appendcopy,GridX: this.state.GridX + 1,spTiles: spTilescopy, leastx: lx ,leasty: ly });
    }
    else if (direction == "up" || direction == "down") {
      for (let i = 0; i < agridcopy.length; i++) {
        if (direction == "up") {
          agridcopy[i].push("");
          ogridcopy[i].push("");
          spTilescopy[i].push(new Tile(0, 0, this.randomiser));
        }
        else {
          agridcopy[i].splice(0, 0, "");
          ogridcopy[i].splice(0, 0, "");
          spTilescopy[i].splice(0, 0, new Tile(0, 0, this.randomiser));

        }
      }
      if (direction == "up") {
        for (let i = 0; i < spTilescopy.length; i++) {
          spTilescopy[i][spTilescopy[i].length - 1] = new Tile(i + lx, spTilescopy[i].length - 1 + ly, this.randomiser);
        }
      }
      if (direction == "down") {
        ly -= 1
        for (let i = 0; i < spTilescopy.length; i++) {
          spTilescopy[i][0] = new Tile(i + lx, ly, this.randomiser);
        }
      }
      if (direction == "down") {
        for (let k = 0; k < appendcopy.length; k++) {
          appendcopy[k][1] += 1;
        }
      }
      this.setState({ GridLetters: agridcopy,storedgrid: ogridcopy,BoardAppends: appendcopy,GridY: this.state.GridY + 1,spTiles: spTilescopy, leastx: lx ,leasty: ly });
    }
    this.setState({ ExpandPoint: this.state.ExpandPoint - 1 });
  }
  //hand props
  DrawnHand = () => {
    let gridbutton = []
    for (let i = 0; i < 10; i++) {
      const b = (<button disabled={this.state.disabledButtons[i]} onClick={() => !this.state.dragbool && this.HandInput(i)} className={`${i === this.state.SelectedLetterIndex ? ` border-sky-300 dark:border-orange-300 border-4` : `border dark:border-stone-700`} ${this.checks.RedrawHandCheck(this.state.RedrawIndexes, i) === false ? null : ` !border-lime-300 dark:!border-fuchsia-500 border-4`} overflow-hidden disabled:hover:scale-100  dark:bg-stone-900 dark:text-white disabled:opacity-25 disabled:bg-stone-400 grow h-full transition ease-in-out hover:scale-110 bg-white text-slate-950 rounded-md lg:rounded-lg text-xl md:text-2xl lg:text-3xl xl:text-4xl text-center`}><span className=" inline-block align-top">{this.state.HandLetters[i]}</span></button>);
      gridbutton.push(b)
    }
    return (gridbutton)
  }
  HandInput = (i) => {
    if (this.state.gamestart && this.state.RedrawBool) {
      var redraws = this.state.RedrawIndexes.slice();

      if (this.checks.RedrawHandCheck(redraws, i) === false) {//element not present
        redraws.push(i);
      }
      else {//element present
        redraws.splice(this.checks.RedrawHandCheck(redraws, i), 1);
      }
      this.setState({ RedrawIndexes: redraws });
    }
    else if (this.state.gamestart) {
      if (this.state.SelectedLetterIndex == i) {
        this.setState({ SelectedLetterIndex: -1 });
      } else {
        this.setState({ SelectedLetterIndex: i });
      }
    }
  }
  //check funct
  submit = () => {
    var boolval = this.checks.validify(this.state.GridLetters);
    this.setState({ currentvalid: boolval });
    if (boolval && this.state.GridLetters.toString() != this.state.storedgrid.toString()) {//done actual move
      var vals = this.checks.Evalute(this.state.GridLetters,this.state.spTiles);
      var bonusdiff = [vals[2]-this.state.PrevBonus[0],vals[3]-this.state.PrevBonus[1],vals[4]-this.state.PrevBonus[2],vals[5]-this.state.PrevBonus[3]]
      if (this.checks.WordsEval(vals[0]) - this.checks.WordsEval(this.state.PrevWordCount) > 0) {
        let intermval = (this.state.IntermediatePoints + this.checks.WordsEval(vals[0]) - this.checks.WordsEval(this.state.PrevWordCount));
        intermval += bonusdiff[0];//bonus
        if (intermval >= 4) {
          let value1 = (intermval) % 4;//remainder
          let value2 = this.state.ExpandPoint + Math.floor((intermval) / 4);//exp
          this.setState({ ExpandPoint: value2 });
          this.setState({ IntermediatePoints: value1 });
          this.setState({ Score: vals[1] });
        } else {
          let value = (intermval) % 4;
          this.setState({ IntermediatePoints: value });
          this.setState({ Score: vals[1] });
        }
      }
      this.setState({ PrevWordCount: vals[0] });
      var handcopy = this.state.HandLetters.slice();
      for (let i = 0; i < handcopy.length; i++) {
        if (this.state.disabledButtons[i] == true) {
          if (i > 7) {//consonants
            handcopy[i] = this.randomiser.GetConsonants();
          }
          else if (i < 2) {//vowels
            handcopy[i] = this.randomiser.GetVowel();
          }
          else {//letter
            handcopy[i] = this.randomiser.GetLetter();
          }
        }
      }
      for(let i = 0; i < bonusdiff[3]; i++){//redraw bonus
        for (let k = 0; k < handcopy.length; k++) {
          if (k > 7) {//consonants
            handcopy[k] = this.randomiser.GetConsonants();
          }
          else if (k < 2) {//vowels
            handcopy[k] = this.randomiser.GetVowel();
          }
          else{//letter
            handcopy[k] = this.randomiser.GetLetter();
          }
        }
      }
      var lx = this.state.leastx;
      var ly = this.state.leasty;
      var agridcopy = this.state.GridLetters.map(function (arr) {
        return arr.slice();
      });
      var ogridcopy = this.state.storedgrid.map(function (arr) {
        return arr.slice();
      });
      var spTilescopy = this.state.spTiles.map(function (arr) {
        return arr.slice();
      });
      var appendcopy = this.state.BoardAppends.map(function (arr) { return arr.slice() });
      var GX = this.state.GridX;
      var GY = this.state.GridY;
        for(let i = 0; i < bonusdiff[2]; i++){
          let direction = this.randomiser.GetDirection();
          //expand up
          //expand down
          //expand right
          //expand left
          //bottom right is 0 0
          if (direction == "right" || direction == "left") {
            if (direction == "right") {
              agridcopy.push(Array(agridcopy[0].length).fill(""));
              ogridcopy.push(Array(ogridcopy[0].length).fill(""));
              spTilescopy.push(Array(spTilescopy[0].length).fill(new Tile(0, 0, this.randomiser)));
              for (let i = 0; i < spTilescopy[0].length; i++) {
                spTilescopy[spTilescopy.length - 1][i] = new Tile(spTilescopy.length - 1 + lx, i + ly, this.randomiser);
              }
            }
            else {
              lx -= 1
              agridcopy.splice(0, 0, Array(agridcopy[0].length).fill(""));
              ogridcopy.splice(0, 0, Array(ogridcopy[0].length).fill(""));
              spTilescopy.splice(0, 0, Array(spTilescopy[0].length).fill(new Tile(0, 0, this.randomiser)));
              for (let i = 0; i < spTilescopy[0].length; i++) {
                spTilescopy[0][i] = new Tile(lx, i + ly, this.randomiser);
              }
              for (let k = 0; k < appendcopy.length; k++) {
                appendcopy[k][0] += 1;
              }
            }
            GX++;

          }
          else if (direction == "up" || direction == "down") {
            for (let i = 0; i < agridcopy.length; i++) {
              if (direction == "up") {
                agridcopy[i].push("");
                ogridcopy[i].push("");
                spTilescopy[i].push(new Tile(0, 0, this.randomiser));
              }
              else {
                agridcopy[i].splice(0, 0, "");
                ogridcopy[i].splice(0, 0, "");
                spTilescopy[i].splice(0, 0, new Tile(0, 0, this.randomiser));

              }
            }
            if (direction == "up") {
              for (let i = 0; i < spTilescopy.length; i++) {
                spTilescopy[i][spTilescopy[i].length - 1] = new Tile(i + lx, spTilescopy[i].length - 1 + ly, this.randomiser);
              }
            }
            if (direction == "down") {
              ly -= 1
              for (let i = 0; i < spTilescopy.length; i++) {
                spTilescopy[i][0] = new Tile(i + lx, ly, this.randomiser);
              }
            }
            if (direction == "down") {
              for (let k = 0; k < appendcopy.length; k++) {
                appendcopy[k][1] += 1;
              }
            }
            GY++;
          }
        }
      this.setState({ PenaltyPoints: this.state.PenaltyPoints + bonusdiff[1] });
      if (this.state.PenaltyPoints + bonusdiff[1] >= 3) {
        this.setState({ gamestart: false });
        if(this.state.PenaltyPoints + bonusdiff[1] - this.state.ExpandPoint >= 3){//end
          if(this.highscore<vals[1]||this.highscore==undefined){
            this.highscore = vals[1];
          }
          this.setState({PenaltyPoints:3});
          this.setState({ExpandPoint:0});
          this.setState({ summarypop: !this.state.summarypop });
        }
      }
      this.setState({ Round: this.state.Round + 1 });
      this.setState({ PrevBonus : [vals[2],vals[3],vals[4],vals[5]]})
      this.setState({ BoardAppends: new Array() });
      this.setState({ disabledButtons: Array(10).fill(false) });
      this.setState({ GridX : GX });
      this.setState({ GridY : GY});
      this.setState({ GridLetters: agridcopy,BoardAppends: appendcopy,spTiles: spTilescopy, leastx: lx ,leasty: ly });
      this.setState({ storedgrid: agridcopy.map(function (arr) { return arr.slice() }) });
      this.setState({ HandLetters: handcopy });
    }
    else if (boolval && this.state.GridLetters.toString() == this.state.storedgrid.toString() && this.state.RedrawBool) {//if is a selected redraw
      var handcopy = this.state.HandLetters.slice();
      var selectedbool = false;
      for (let k = 0; k < handcopy.length; k++){
        if(this.checks.RedrawHandCheck(this.state.RedrawIndexes, k)!==false){
          selectedbool = true
        }
      }
      for (let k = 0; k < handcopy.length; k++) {
        if (k > 7 && (this.checks.RedrawHandCheck(this.state.RedrawIndexes, k) !== false||!selectedbool)) {//consonants
          handcopy[k] = this.randomiser.GetConsonants();
        }
        else if (k < 2 && (this.checks.RedrawHandCheck(this.state.RedrawIndexes, k) !== false||!selectedbool)) {//vowels
          handcopy[k] = this.randomiser.GetVowel();
        }
        else if (this.checks.RedrawHandCheck(this.state.RedrawIndexes, k) !== false||!selectedbool) {//letter
          handcopy[k] = this.randomiser.GetLetter();
        }
      }
      this.setState({ Round: this.state.Round + 1 });
      this.setState({ storedgrid: this.state.GridLetters.map(function (arr) { return arr.slice() }) });
      this.setState({ HandLetters: handcopy, RedrawIndexes: [] });
      this.setState({ PenaltyPoints: this.state.PenaltyPoints + 1 });
      if (this.state.PenaltyPoints + 1 == 3) {
        this.setState({ gamestart: false });
        if (this.state.ExpandPoint == 0) {
          if(this.highscore<this.state.Score||this.highscore==undefined){
            this.highscore = this.state.Score;
          }
          this.setState({ summarypop: !this.state.summarypop });
        }
      }
    }
    else {
      this.setState({ currentvalid: false });
    }
  }
  //counters
  Penalty = () => {
    var penrep = [];
    for (let i = 0; i < this.state.PenaltyPoints; i++) {
      penrep.push(<XMarkIcon className=" aspect-square stroke stroke-2 w-4 sm:w-auto stroke-red-400 dark:stroke-rose-500" />);
    }
    for (let i = 0; i < 3 - this.state.PenaltyPoints; i++) {
      penrep.push(<XMarkIcon className=" aspect-square stroke stroke-2 w-4 sm:w-auto stroke-gray-300 dark:stroke-white" />);
    }
    return (penrep);
  }
  ReducePenalty = () => {
    if (this.state.PenaltyPoints == 3) {
      this.setState({ gamestart: true });
    }
    this.setState({ PenaltyPoints: this.state.PenaltyPoints - 1 });
    this.setState({ ExpandPoint: this.state.ExpandPoint - 1 });
  }
  Intermediate = () => {
    var intrep = [];
    for (let i = 0; i < this.state.IntermediatePoints; i++) {
      intrep.push(<PlusIcon className="stroke stroke-2 w-4 sm:w-auto stroke-emerald-200 dark:stroke-lime-400" />);
    }
    for (let i = 0; i < 4 - this.state.IntermediatePoints; i++) {
      intrep.push(<PlusIcon className="stroke stroke-2 w-4 sm:w-auto stroke-gray-300 dark:stroke-white" />);
    }
    return (intrep);
  }
  //component functs
  async componentDidMount() {
    if (localStorage.getItem("UserId") === null) {
      localStorage.setItem("UserId", uuidv4())
    }
    try {
      this.setState(JSON.parse(CryptoJS.AES.decrypt(localStorage.getItem("st"), this.dateinput + localStorage.getItem("UserId").toString()).toString(CryptoJS.enc.Utf8)));
    } catch (e) {
      localStorage.removeItem("st");
    }
    if (this.state.day !== datediff(this.date)) {
      localStorage.removeItem("st");
      window.location.reload();
    }

    try {//add later
      let jsonuser = Object.values(JSON.parse(CryptoJS.AES.decrypt(localStorage.getItem("c"), localStorage.getItem("UserId").toString()).toString(CryptoJS.enc.Utf8)));
      this.setState({ username: jsonuser[0] });
      this.caps = jsonuser[1];
      this.highscore = jsonuser[2];
    } catch (e) {
      localStorage.removeItem("c");
    }
    try {//add later
      if (localStorage.getItem("sco") === null) {
        try {
          this.setState({scoresdata:await this.GetScoreboards(true)});
        } catch (err) {
          console.log(err);
        }
      }
      else {
        let jsonadata = Object.values(JSON.parse(CryptoJS.AES.decrypt(localStorage.getItem("sco"), this.dateinput + localStorage.getItem("UserId").toString()).toString(CryptoJS.enc.Utf8)));
        this.setState({scoresdata:jsonadata[0]});
        this.setState({ scoretimeupdate: jsonadata[1], scoretimeupdatems: jsonadata[2] });
      }
    } catch (e) {
      localStorage.removeItem("sco");
    }
    if (localStorage.theme !== 'dark' && localStorage.theme !== 'light') {
      this.setState({ darkmode: "auto" });
    }
    if (localStorage.theme === 'dark' || (!('theme' in localStorage) && window.matchMedia('(prefers-color-scheme: dark)').matches)) {
      document.documentElement.classList.add('dark')
    } else {
      document.documentElement.classList.remove('dark')
    }
  }
  componentDidUpdate() {
    let states = CryptoJS.AES.encrypt(JSON.stringify(this.state), this.dateinput + localStorage.getItem("UserId").toString()).toString();
    let cu = CryptoJS.AES.encrypt(JSON.stringify([this.state.username, this.caps,this.highscore]), localStorage.getItem("UserId").toString()).toString();
    let scdata = CryptoJS.AES.encrypt(JSON.stringify([this.state.scoresdata, this.state.scoretimeupdate, this.state.scoretimeupdatems]), this.dateinput + localStorage.getItem("UserId").toString()).toString();
    if (states !== localStorage.getItem("st")) {
      localStorage.setItem("st", states);
    }
    if (cu !== localStorage.getItem("c")) {
      localStorage.setItem("c", cu);
    }
    if (scdata !== localStorage.getItem("sco")) {
      localStorage.setItem("sco", scdata);
    }


  }
  //drag funct
  eventControl = (event) => {
    if (event.type === "mousemove" || event.type === "touchmove") {
      this.setState({ dragbool: true });
    }

    if (event.type === "mouseup" || event.type === "touchend") {
      setTimeout(() => {
        this.setState({ dragbool: false });
      }, 100);
    }
  }
  //looks funct
  ToggleDark = () => {
    if (localStorage.theme == 'light') {
      localStorage.theme = 'dark';
      this.setState({ darkmode: 'dark' });
    }
    else if (localStorage.theme == 'dark') {
      localStorage.removeItem("theme");
      this.setState({ darkmode: 'auto' });
    }
    else {
      localStorage.theme = 'light';
      this.setState({ darkmode: 'light' });
    }
    if (localStorage.theme === 'dark' || (!('theme' in localStorage) && window.matchMedia('(prefers-color-scheme: dark)').matches)) {
      document.documentElement.classList.add('dark')
    } else {
      document.documentElement.classList.remove('dark')
    }
  }
  //popups
  PopupMenu = () => {
    return (
      <div className="z-20 fixed inset-0 flex flex-col justify-center items-center bg-black w-full h-full bg-opacity-25">
        <div className=" container max-w-md w-11/12 relative dark:bg-stone-900 bg-white rounded-md p-3">
          <button onClick={() => !this.state.dragbool && this.setState({ showpop: !this.state.showpop })} className="absolute  top-0 left-0 h-10 transition ease-in-out  dark:bg-stone-900 bg-white text-slate-950 rounded-md lg:rounded-lg aspect-square text-lg sm:text-xl md:text-2xl lg:text-3xl"><XMarkIcon className=" dark:stroke-white dark:fill-white stroke-1 " /></button>
          <h1 className="text-5xl md:text-7xl dark:text-white text-center py-3">Menu</h1>
          <div className="w-full justify-center flex flex-row gap-1 py-2"><span className=" grow text-4xl self-stretch m-1 dark:text-white">Dark Mode</span> <button className=" grow border dark:border-stone-700 rounded-full self-stretch text-3xl m-1 dark:text-white" onClick={() => !this.state.dragbool && this.ToggleDark()}>{this.state.darkmode == "dark" ? <MoonIcon className="w-10" /> : (this.state.darkmode == "light" ? <SunIcon className="w-10 float-right" /> : <CogIcon className="w-10 mx-auto" />)}</button></div>
          <div className="w-full justify-around flex flex-row gap-1 py-2"><span className=" grow text-4xl self-stretch m-1 dark:text-white">Contact Me: </span><a className=" text-blue-500 text-4xl self-stretch m-1" href="mailto:Galtz@outlook.com">Here</a></div>
          <div className="flex justify-center py-2"><button className=" hover:focus-visible:border-lime-400  transition ease-in-out hover:scale-110 inset-x-0 border dark:border-stone-700 rounded-full text-3xl self-center px-3 m-1 dark:text-white" onClick={() => { localStorage.removeItem("st"); location.reload() }} >Reset Board</button></div>
        </div>
      </div>
    )
  }
  DonoWall = () => {
    return (
      <div className="z-20 flex flex-col fixed inset-0 justify-center items-center bg-black w-full h-full bg-opacity-25">
        <div className="relative scrollbar-hide">
          <button onClick={() => !this.state.dragbool && this.setState({ showdono: !this.state.showdono })} className="absolute top-0 left-0 h-10 transition ease-in-out bg-white text-slate-950 rounded-md lg:rounded-lg aspect-square text-lg sm:text-xl md:text-2xl lg:text-3xl"><XMarkIcon className=" stroke-1" /></button>
          <iframe className="rounded-md lg:rounded-lg scrollbar-hide" id='kofiframe' src='https://ko-fi.com/galtz/?hidefeed=true&widget=true&embed=true&preview=true' height="650" title='galtz' />
        </div>
      </div>);
  }
  InfoPopup = () => {
    return (
      <div className="z-20 fixed inset-0 flex flex-col justify-center items-center bg-black w-full h-full bg-opacity-25">
        <div className=" container max-w-md w-11/12 relative dark:bg-stone-900 bg-white rounded-md p-3">
          <button onClick={() => !this.state.dragbool && this.setState({ showinfopop: !this.state.showinfopop })} className="absolute top-0 left-0 h-10 transition ease-in-out dark:bg-stone-900 bg-white text-slate-950 rounded-md lg:rounded-lg aspect-square text-lg sm:text-xl md:text-2xl lg:text-3xl"><XMarkIcon className=" dark:stroke-white dark:fill-white stroke-1 " /></button>
          <h1 className="text-4xl md:text-6xl pt-4 pb-3 dark:text-white text-center">How To Play</h1>
          <p className=" text-center md:text-xl dark:text-white py-1 md:py-2 border-t-2 dark:border-t-stone-700">Place down Letters from your Hand to create words on the Board.</p>
          <p className=" text-center md:text-xl dark:text-white py-1 md:py-2 border-t-2 dark:border-t-stone-700">Submit Board using <ArrowUpOnSquareIcon className="mx-1 p-1 w-10 inline border rounded dark:border-stone-700" /> If valid, new Letters will be added to Hand.</p>
          <p className=" text-center md:text-xl dark:text-white py-1 md:py-2 border-t-2 dark:border-t-stone-700">Redraw using <HandRaisedIcon className="mx-1 p-1 w-10 inline border rounded dark:border-stone-700" /> then select any amount of Letters. Click <ArrowUpOnSquareIcon className="mx-1 p-1 w-10 inline border rounded dark:border-stone-700" /> so new Letters will be dealt.</p>
          <p className=" text-center md:text-xl dark:text-white py-1 md:py-2 border-t-2 dark:border-t-stone-700">Expansion Points (ExP) can be used to reduce Strikes (Click Strikes Bar) or Expand (Arrows).</p>
          <p className=" text-center md:text-xl dark:text-white py-1 md:py-2 border-t-2 dark:border-t-stone-700">There are Special Tiles. <span className=" text-red-600">Reds</span> being Penalties. <span className=" text-green-600">Greens</span> being Bonus Points. <span className=" text-orange-600">Oranges</span> being Score Multiplier. <span className=" text-purple-600">Purples</span> being Redraw. <span className=" text-blue-600">Blues</span> being Random Expansion </p>
          <p className=" text-center md:text-xl dark:text-white py-1 md:py-2 border-t-2 dark:border-t-stone-700">Enjoy Day {this.state.day} !</p>
        </div>
      </div>
    )
  }
  handleChange = (e) => {//sumpop
    this.setState({ username: e.target.value });
  }
  SubmitServer = async () => {//sumpop
    var rounds = this.state.Round;
    var score = this.checks.Evalute(this.state.GridLetters,this.state.spTiles)[1];
    this.setState({ submitted: true });
    var boolvalean = await SubmitScore(CryptoJS.AES.encrypt(JSON.stringify({ "days": this.state.day, "rounds": rounds, "score": score, "username": this.state.username, "randid": localStorage.getItem("UserId").toString() }), this.dateinput).toString());
    if (boolvalean == true) {
      this.caps += 1;
    }
    window.location.reload();
  }
  ManualEndGame = () => {
    this.setState({ ExpandPoint: 0, gamestart: false, PenaltyPoints: 3 });
    if(this.highscore<this.state.Score||this.highscore==undefined){
      this.highscore = this.state.Score;
    }
  }
  SummaryPopUp = () => {
    var rounds = this.state.Round;
    var score = this.checks.Evalute(this.state.GridLetters,this.state.spTiles)[1];
    return (
      <div className="z-20 fixed inset-0 flex flex-col justify-center items-center bg-black w-full h-full bg-opacity-25">
        <div className=" container max-w-md w-11/12 relative dark:bg-stone-900 bg-white rounded-md p-3">
          <button onClick={() => !this.state.dragbool && this.setState({ summarypop: !this.state.summarypop })} className="  absolute top-0 left-0 h-10 transition ease-in-out dark:bg-stone-900 bg-white text-slate-950 rounded-md lg:rounded-lg aspect-square text-lg sm:text-xl md:text-2xl lg:text-3xl"><XMarkIcon className=" dark:stroke-white dark:fill-white stroke-1 " /></button>
          <h1 className="text-4xl md:text-6xl pt-4 pb-2 dark:text-white text-center">Summary</h1>
          <p className=" text-center text-lg md:text-4xl dark:text-white pt-1 border-t-2 dark:border-t-stone-700">Username : </p>
          <div className="flex justify-center w-full py-1">
            <input type="text" className=" w-11/12 transition ease-in-out hover:scale-110 text-center text-2xl dark:text-white dark:bg-stone-900 dark:border-stone-700 dark:accent-fuchsia-400 accent-lime-400 border rounded-full" onChange={this.handleChange} value={this.state.username} />
          </div>
          <p className=" text-center md:text-2xl dark:text-white py-1">Caps : {this.caps} <AcademicCapIcon className="w-8 inline" /></p>
          <p className=" text-center md:text-2xl dark:text-white pt-1 pb-2">Highest Score : {this.highscore}</p>
          <p className=" text-center md:text-4xl dark:text-white py-1 border-t-2 dark:border-t-stone-700">Stats</p>
          <p className=" text-center md:text-2xl dark:text-white py-1">Day : {this.state.day}</p>
          <p className=" text-center md:text-2xl dark:text-white py-1">Round : {rounds}</p>
          <p className=" text-center md:text-2xl dark:text-white pt-1 pb-2 border-b-2 dark:border-b-stone-700">Score : {score}</p>
          {!this.state.gamestart && this.state.ExpandPoint == 0 ?
            <div className="flex justify-center"><button disabled={this.state.submitted} className=" disabled:opacity-25 hover:focus-visible:border-lime-400  transition ease-in-out hover:scale-110 inset-x-0 border dark:border-stone-700 rounded-full md:text-3xl self-center px-3 m-1 dark:text-white" onClick={() => this.SubmitServer()} >{this.state.submitted ? 'Submitted' : 'Submit'}</button></div> :
            <div><p className=" text-center md:text-2xl dark:text-white pt-2 pb-3">{this.state.ExpandPoint > 0 && !this.state.gamestart ? "Use ExP to Reduce Strikes" : "Finish Game To Submit Score"}</p>
              <div className="flex justify-center"><button disabled={this.state.submitted} className=" disabled:opacity-25 hover:focus-visible:border-lime-400  transition ease-in-out hover:scale-110 inset-x-0 border dark:border-stone-700 rounded-full md:text-3xl self-center px-3 m-1 dark:text-white" onClick={() => this.ManualEndGame()} >{this.state.submitted ? 'Submitted' : 'End Game'}</button></div></div>
          }
        </div>
      </div>
    )
  }
  DrawLeaderBoard = (day) => {
    var leaderhtml = []
    var arr = this.state.currentscoreboard;
    if (arr === null || arr === undefined) {
      return;
    }
    for (let i = 0; i < arr.length; i++) {
      leaderhtml.push(<p className=" text-center text-md md:text-xl dark:text-white pt-2 pb-3">#{i + 1} {arr[i][2]} : Score - {arr[i][1]}</p>)
    }
    return (leaderhtml);
  }
  LeaderBoardPop = () => {
    return (
      <div className="z-20 fixed inset-0 flex flex-col justify-center items-center bg-black w-full h-full bg-opacity-25">
        <div className=" container max-w-md w-11/12 relative dark:bg-stone-900 bg-white rounded-md p-3">
          <button onClick={() => !this.state.dragbool && this.setState({ showleaderpop: !this.state.showleaderpop, currentscoreboard : this.GetDaysScore(this.state.scoresdata,this.state.day),scorebindex : this.state.day })} className="absolute top-0 left-0 h-10 transition ease-in-out dark:bg-stone-900 bg-white text-slate-950 rounded-md lg:rounded-lg aspect-square text-lg sm:text-xl md:text-2xl lg:text-3xl"><XMarkIcon className=" dark:stroke-white dark:fill-white stroke-1 " /></button>
          <button onClick={async () => (!this.state.dragbool) && (this.setState({scoresdata:await this.GetScoreboards(false)}))} className="absolute top-0 right-0 h-10 transition ease-in-out dark:bg-stone-900 bg-white text-slate-950 rounded-md lg:rounded-lg aspect-square text-lg sm:text-xl md:text-2xl lg:text-3xl active:animate-ping"><ArrowPathIcon className=" dark:stroke-white stroke-1 " /></button>
          <h1 className="text-4xl md:text-6xl pt-4 pb-2 dark:text-white text-center">Leaderboard</h1>
          <div className="flex justify-center">
            <button className="transition ease-in-out hover:scale-110 bg-white border active:ring active:ring-lime-500 dark:active:ring-fuchsia-500 text-slate-950 dark:bg-stone-900 dark:border-stone-700 dark:text-white rounded-md sm:rounded-sm md:rounded-md lg:rounded-lg aspect-square h-full w-10" onClick={() => this.setState({ currentscoreboard: this.GetPrevDaysScore(this.state.scoresdata, this.state.scorebindex) })}>
              <ArrowLeftCircleIcon className=" aspect-square" />
            </button>
            <h1 className="text-2xl md:text-4xl dark:text-white text-center mx-2">Day {this.state.scorebindex}</h1>
            <button className="transition ease-in-out hover:scale-110 bg-white border active:ring active:ring-lime-500 dark:active:ring-fuchsia-500 text-slate-950 dark:bg-stone-900 dark:border-stone-700 dark:text-white rounded-md sm:rounded-sm md:rounded-md lg:rounded-lg aspect-square h-full w-10" onClick={() => this.setState({ currentscoreboard: this.GetNextDaysScore(this.state.scoresdata, this.state.scorebindex) })}>
              <ArrowRightCircleIcon className="aspect-square" />
            </button>
          </div>
          <this.DrawLeaderBoard day={this.state.scorebindex} />
          <h1 className="text-lg md:text-xl dark:text-white text-center">Updated At : {this.state.scoretimeupdate}</h1>
        </div>
      </div>
    )

  }
  render() {
    return (
      <>
        <div className="flex flex-row gap-1 w-screen z-10 h-1/16 fixed top-0 dark:bg-stone-900 dark:border-stone-800 bg-white border justify-center py-1">
          <button className="transition ease-in-out hover:scale-110 bg-white border active:ring active:ring-lime-500 dark:active:ring-fuchsia-500 text-slate-950 dark:bg-stone-900 dark:border-stone-700 dark:text-white rounded-md sm:rounded-sm md:rounded-md lg:rounded-lg aspect-square h-auto" onClick={() => !this.state.dragbool && this.setState({ showinfopop: !this.state.showinfopop })} >
            <QuestionMarkCircleIcon className="sm:m-1 dark:stroke-white" />
          </button>
          <button className="transition ease-in-out hover:scale-110 bg-white border active:ring active:ring-lime-500 dark:active:ring-fuchsia-500 text-slate-950 dark:bg-stone-900 dark:border-stone-700 dark:text-white rounded-md sm:rounded-sm md:rounded-md lg:rounded-lg aspect-square h-auto" onClick={() => !this.state.dragbool && this.setState({ summarypop: !this.state.summarypop })} >
            <ChartBarIcon className="sm:m-1 " />
          </button>
          <button className="transition ease-in-out hover:scale-110 bg-white border active:ring active:ring-lime-500 dark:active:ring-fuchsia-500 text-slate-950 dark:bg-stone-900 dark:border-stone-700 dark:text-white rounded-md sm:rounded-sm md:rounded-md lg:rounded-lg aspect-square h-auto" onClick={() => !this.state.dragbool && this.setState({ showleaderpop: !this.state.showleaderpop })} >
            <TrophyIcon className="sm:m-1 " />
          </button>
          <div className="Bold h-auto sm:text-lg md:text-xl lg:text-xl text-center inset-0 bg-gradient-to-br to-sky-400 from-lime-400 dark:to-fuchsia-500 dark:from-orange-400 p-2 md:p-3 text-white rounded-lg flex flex-col justify-center"><span className="">Scrambord</span></div>
          <button className="transition ease-in-out hover:scale-110 bg-white border active:ring active:ring-lime-500 dark:active:ring-fuchsia-500 text-slate-950 dark:bg-stone-900 dark:border-stone-700 dark:text-white rounded-md sm:rounded-sm md:rounded-md lg:rounded-lg aspect-square h-auto" onClick={() => !this.state.dragbool && this.setState({ showpop: !this.state.showpop })}>
            <Bars3Icon className="sm:m-1 " />
          </button>
          <button className="flex flex-row transition ease-in-out hover:scale-110 bg-white border active:ring active:ring-lime-500 dark:active:ring-fuchsia-500 dark:bg-stone-900 dark:border-stone-700 rounded-md sm:rounded-sm aspect-square md:rounded-md lg:rounded-lg" onClick={() => !this.state.dragbool && this.setState({ showdono: !this.state.showdono })} >
            <img className="h-full" src="https://storage.ko-fi.com/cdn/brandasset/kofi_s_logo_nolabel.png" />
          </button>
        </div>
        {this.state.showdono ? <this.DonoWall /> : null}
        {this.state.showpop ? <this.PopupMenu /> : null}
        {this.state.showinfopop ? <this.InfoPopup /> : null}
        {this.state.summarypop ? <this.SummaryPopUp /> : null}
        {this.state.showleaderpop ? <this.LeaderBoardPop /> : null}
        <div className="w-full h-full flex justify-center items-center">
          <Draggable onDrag={this.eventControl} onStop={this.eventControl}>
            <div className="flex flex-col justify-center gap-2">
              {(this.state.ExpandPoint > 0) ? <button className=" flex justify-center self-center transition w-full h-19 ease-in-out hover:border-lime-400 border-2 dark:hover:border-fuchsia-500 dark:border-stone-950 border-zinc-50 rounded-t-full " onClick={() => !this.state.dragbool && this.ExpandGrid("up")}><ArrowUpCircleIcon onTouchStart={() => setTimeout(() => { if (!this.state.dragbool) { this.ExpandGrid("up") } }, 200)} className=" h-14 w-14 dark:fill-fuchsia-400 fill-lime-300 overflow-hidden "></ArrowUpCircleIcon></button> : null}
              <div className="flex flex-row justify-center gap-2">
                {(this.state.ExpandPoint > 0) ? <button className="transition w-full h-19 ease-in-out hover:border-lime-400 dark:hover:border-fuchsia-500 border-2 dark:border-stone-950 border-zinc-50 rounded " onClick={() => !this.state.dragbool && this.ExpandGrid("left")}><ArrowLeftCircleIcon onTouchStart={() => setTimeout(() => { if (!this.state.dragbool) { this.ExpandGrid("left") } }, 200)} className="  h-14 w-14 dark:fill-fuchsia-400 fill-lime-300 overflow-hidden"></ArrowLeftCircleIcon></button> : null}
                <this.MakeGrid />
                {(this.state.ExpandPoint > 0) ? <button className="transition w-full h-19 ease-in-out hover:border-lime-400 dark:hover:border-fuchsia-500 border-2 rounded dark:border-stone-950 border-zinc-50" onClick={() => !this.state.dragbool && this.ExpandGrid("right")}><ArrowRightCircleIcon onTouchStart={() => setTimeout(() => { if (!this.state.dragbool) { this.ExpandGrid("right") } }, 200)} className=" h-14 w-14 dark:fill-fuchsia-400 fill-lime-300 overflow-hidden"></ArrowRightCircleIcon></button> : null}
              </div>
              {(this.state.ExpandPoint > 0) ? <button className=" flex justify-center transition w-full h-19 ease-in-out hover:border-lime-400 dark:hover:border-fuchsia-500 border-2 rounded-b-full dark:border-stone-950 border-zinc-50" onClick={() => !this.state.dragbool && this.ExpandGrid("down")}><ArrowDownCircleIcon onTouchStart={() => setTimeout(() => { if (!this.state.dragbool) { this.ExpandGrid("down") } }, 200)} className=" dark:fill-fuchsia-400  h-14 w-14 fill-lime-300 overflow-hidden" ></ArrowDownCircleIcon></button> : null}
            </div>
          </Draggable>
        </div>
        <div className="z-10 border dark:border-stone-800 fixed bottom-0 flex flex-col mx-auto w-screen h-1/6 dark:bg-stone-900 bg-white gap-1 px-2 py-1 md:px-3">
          <div className="flex flex-row justify-center h-2/3 gap-1 md:gap-2 md:p-2 md:container">
            <this.DrawnHand />
            <button className={`${this.state.RedrawBool ? "dark:!border-fuchsia-500 !border-lime-400 border-4" : null} active:ring active:ring-lime-500 dark:active:ring-fuchsia-500 shink w-1/12 h-full transition overflow-hidden ease-in-out hover:scale-110 dark:border-stone-700 dark:bg-stone-900 dark:text-white bg-white border text-slate-950 rounded-md lg:rounded-lg flex justify-center items-center`} onClick={() => !this.state.dragbool && this.state.gamestart && this.setState({ RedrawBool: !this.state.RedrawBool, RedrawIndexes: [], SelectedLetterIndex: -1 })} ><HandRaisedIcon className={`h-full sm:p-1 md:p-2 stroke-1 dark:hover:stroke-fuchsia-500 hover:stroke-lime-400 ${this.state.RedrawBool ? "dark:!stroke-fuchsia-500 !stroke-lime-400" : null}`}></HandRaisedIcon></button>
            <button className={`${this.state.currentvalid ? null : "!border-red-400 dark:!border-rose-500 border-4"} active:ring active:ring-sky-500 dark:active:ring-orange-500 shink w-1/12 h-full transition overflow-hidden ease-in-out hover:scale-110 dark:border-stone-700 dark:bg-stone-900 dark:text-white bg-white border text-slate-950 rounded-md lg:rounded-lg flex justify-center items-center`} onClick={() => !this.state.dragbool && this.state.gamestart && this.submit()} ><ArrowUpOnSquareIcon className={`h-full sm:p-1 md:p-2 stroke-1 dark:hover:stroke-orange-500 hover:stroke-sky-400 ${this.state.currentvalid ? null : "!stroke-red-400 dark:!stroke-rose-500"}`}></ArrowUpOnSquareIcon></button>
          </div>
          <div className="flex flex-row w-full h-1/3 justify-stretch">
            <div className=" basis-3/12 px-1 h-full flex-row Bold sm:text-lg md:text-xl lg:text-xl text-center bg-gradient-to-b to-sky-400 from-lime-400 dark:to-fuchsia-500 dark:from-orange-400 rounded-l-full text-white flex justify-center" onClick={() => !this.state.dragbool && this.state.PenaltyPoints > 0 && this.state.ExpandPoint > 0 && this.ReducePenalty()}><this.Penalty /></div>
            <div className="border-2 border-gray-200"></div>
            <div className=" basis-3/12 px-1 h-full flex-row Bold sm:text-lg md:text-xl lg:text-xl text-center bg-gradient-to-b to-sky-400 from-lime-400 dark:to-fuchsia-500 dark:from-orange-400 text-white flex justify-center"><this.Intermediate /></div>
            <div className="border-2 border-gray-200"></div>
            <div className="Bold basis-3/12 h-full text-sm sm:text-md md:text-xl lg:text-2xl xl:text-3xl 2xl:text-4xl text-center bg-gradient-to-b to-sky-400 from-lime-400 dark:to-fuchsia-500 dark:from-orange-400 md:px-3 text-white flex flex-col justify-center">{"ExP : " + this.state.ExpandPoint}</div>
            <div className="border-2 border-gray-200"></div>
            <div className="Bold basis-3/12 h-full text-sm sm:text-md md:text-xl lg:text-2xl xl:text-3xl 2xl:text-4xl text-center bg-gradient-to-b to-sky-400 from-lime-400 dark:to-fuchsia-500 dark:from-orange-400 md:px-3 text-white align-middle flex flex-col justify-center">{"Round : " + this.state.Round}</div>
            <div className="border-2 border-gray-200"></div>
            <div className="Bold basis-3/12 h-full text-sm sm:text-md md:text-xl lg:text-2xl xl:text-3xl 2xl:text-4xl text-center bg-gradient-to-b to-sky-400 from-lime-400 dark:to-fuchsia-500 dark:from-orange-400 md:px-3 text-white rounded-r-full flex flex-col justify-center">{"Score : " + this.state.Score}</div>
          </div>
        </div>
      </>
    )
  }
}
export default Game
//do a score system
//exponental letter placed down to score
