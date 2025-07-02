import jsonadata from './words_dictionary.json' assert { type: 'json' };

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

export default Checker;