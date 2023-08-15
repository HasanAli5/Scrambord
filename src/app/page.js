"use client"
import Draggable from "react-draggable";
import React from "react";
import {Bars3Icon,XMarkIcon} from '@heroicons/react/24/solid';
import {ArrowUpOnSquareIcon} from '@heroicons/react/24/outline';
import jsonadata from './words_dictionary.json' assert { type: 'json' };
import { Fahkwang } from "next/font/google";
var seedrandom = require('seedrandom');
class Checker{
    constructor(){
      this.wordsarray = new Array();
      let tempwords = Object.keys(jsonadata);
      for(let i =0;i<tempwords.length;i++){
        if(tempwords[i].length>1){
          this.wordsarray.push(tempwords[i]);
        }
      }
    }
    validify(board){
      var preword = new String();
      for (let j = 0; j < board[0].length; j++){//horizontal
        for(let i =0;i<board.length;i++){
          if(board[i][j]!=""){
            preword+=board[i][j];
          }
          if(board[i][j] != "" && (i + 1 == board[0].length || board[i+1][j] == "") && preword.length > 0){
            //todo
            if(preword.length==1)
            {
              var vertadj = false;
              if (j != 0)//check down
              {
                  if (board[i][j-1] != "")
                  {
                      vertadj = true;
                  }
              }
              if (j + 1 != board.length)//check up
              {
                  if (board[i][j + 1] != "")
                  {
                      vertadj = true;
                  }
              }
              if (vertadj != true)
              {
                  return false;
              }
            }
            else//iterate through dictionary to see if is a word
            {
                var isword = false;
                for (let k = 0; k < this.wordsarray.length; k++)
                {
                    if (this.wordsarray[k] == preword)
                    {
                        isword = true;
                    }
                }
                if (isword != true)
                {
                    return false;
                }
            }
            preword = "";
          }
          
        }
        preword="";
      }
      preword = "";
      for (let i = 0; i < board.length; i++)//vertical
      {
          for (let j = 0; j < board[0].length; j++)
          {
              if (board[i][j] != "")//read to add a letters to word
              {
                  preword += board[i][j];
              }
              if (board[i][j] != "" && (j + 1 == board.length || board[i][j + 1] == "") && preword.length > 0)//ending of word
              {
                  if (preword.length == 1)//if letter in iso
                  {
                      var vertadj = false;
                      if (i != 0)//check left
                      {
                          if (board[i - 1][j] != "")
                          {
                              vertadj = true;
                          }
                      }
                      if (i + 1 != board[0].length)//check right
                      {
                          if (board[i + 1][j] != "")
                          {
                              vertadj = true;
                          }
                      }
                      if (vertadj != true)
                      {
                          return false;
                      }
                  }
                  else//iterate through dictionary to see if is a word
                  {
                      var isword = false;
                      for (let k = 0; k < this.wordsarray.length; k++)
                      {
                          if (this.wordsarray[k] == preword)
                          {
                              isword = true;
                          }
                          else if ((this.wordsarray[k]).split("").reverse().join("") == preword)
                          {
                              isword = true;
                          }
                      }
                      if (isword != true)
                      {
                          return false;
                      }
                  }
                preword = "";
              }
              
          }
          preword="";
      }
      return true;
    }
}
class DateRandom{
  constructor(dateinput){
    this.randomlettergen = seedrandom(dateinput);
    this.randomvowelgen = seedrandom(dateinput);
    this.randomconsonantsgen = seedrandom(dateinput);
  }
  GetLetter(){
    var random=this.randomlettergen();
    var Lindex=Math.floor(random*26);
    var alphabet = "abcdefghijklmnopqrstuvwxyz";
    var arr = (alphabet).split("");
    var letter=arr[Lindex]
    return letter;
  }
  GetVowel(){
    var random=this.randomvowelgen();
    var Lindex=Math.floor(random*5);
    var alphabet = "aeiou";
    var arr = (alphabet).split("");
    var letter=arr[Lindex]
    return letter;
  }
  GetConsonants(){
    var random=this.randomconsonantsgen();
    var Lindex=Math.floor(random*21);
    var alphabet = "bcdfghjklmnpqrstvwxyz";
    var arr = (alphabet).split("");
    var letter=arr[Lindex]
    return letter;
  }
}
class Game extends React.Component{
  //class intial
  constructor(props){
    super(props)
    this.checks = new Checker();
    this.dateinput = new Date().toDateString();
    this.randomiser =new DateRandom(this.dateinput);
    this.state = {
      gamestart:true,
      dragbool:false,
      showdono:false,
      showpop:false,
      SelectedLetterIndex:"",
      GridX:5,
      GridY:5,
      Round:1,
      LetterStored:null,
      HandLetters:[this.randomiser.GetVowel(),this.randomiser.GetVowel(),this.randomiser.GetLetter(),this.randomiser.GetLetter(),this.randomiser.GetLetter(),this.randomiser.GetLetter(),this.randomiser.GetLetter(),this.randomiser.GetLetter(),this.randomiser.GetConsonants(),this.randomiser.GetConsonants()],
      disabledButtons:Array(10).fill(false),
      GridLetters:Array.from({length:5},e=> Array(5).fill("")),//the board in realtime start goes down then  right
      BoardAppends:new Array(),//the action on the board
      storedgrid:Array.from({length:5},e=> Array(5).fill(""))};//no edits
  }
//grid props
  MakeGrid=()=>{
    var x = this.state.GridX;
    var y = this.state.GridY;
    let gridhtml=[];
    for(let i = 0;i<y;i++){
      gridhtml.push(<div className="py-1 flex flex-row justify-center gap-2"><this.MakeRow posy={i}/></div>);
    }
    return gridhtml;
    
  }
  MakeRow=(posy)=>{
    let rowbuttons = [];
    
    var x = this.state.GridX
    
    for(let i = 0;i<x;i++){
      const b = (<button onClick={()=>!this.state.dragbool &&this.BoardInput(i,posy.posy)} onTouchStart={()=>!this.state.dragbool &&this.BoardInput(i,posy.posy)} id={"GridButton"+((i+1)+((posy.posy)*5))} className="transition w-19 h-19 ease-in-out hover:scale-110 shadow-md bg-white border text-slate-950 rounded-md lg:max-2xl:rounded-lg aspect-square text-xl sm:text-2xl md:text-3xl lg:text-4xl xl:text-5xl 2xl:text-6xl">{this.state.GridLetters[i][posy.posy]}</button>);
      rowbuttons.push(b)
    }
    return(
      rowbuttons
    )
  }
  BoardInput=(i,j)=>{//takes input and places needs:erasiion
    if(this.state.gamestart){
      var gridcopy=this.state.GridLetters;
      var appendcopy = this.state.BoardAppends;
      var disbuttonscopy=this.state.disabledButtons;
      if(gridcopy[i][j]!==""){//erasion
        for(let k=0;k<appendcopy.length;k++){
          if(appendcopy[k][0]==i&&appendcopy[k][1]==j){
            gridcopy[i][j]="";
            disbuttonscopy[appendcopy[k][2]]=false;
            appendcopy.splice(k,1);
            break;
          }
        }
      }
      else if(this.state.SelectedLetterIndex===""){//nothing selected
        return;
      }
      else{//placement
        gridcopy[i][j]=this.state.HandLetters[this.state.SelectedLetterIndex];
        disbuttonscopy[this.state.SelectedLetterIndex]=true;
        appendcopy.push(new Array(i,j,this.state.SelectedLetterIndex));
      }
      //0 is board 1 is hand
      this.setState({GridLetters:gridcopy});
      this.setState({disabledButtons:disbuttonscopy});
      this.setState({BoardAppends:appendcopy});
      this.setState({SelectedLetterIndex:""});
    }
  }

  updateGrid = (rows,columns)=>{
    this.setState({GridX:rows});
    this.setState({GridY:columns});
    this.setState({GridLetters:Array(rows*columns).fill("")});
  }
  //hand props
  DrawnHand=()=>{
    let gridbutton = []
    for(let i =0;i<10;i++){
      const b = (<button disabled={this.state.disabledButtons[i]} onClick={()=>!this.state.dragbool &&this.HandInput(i)} onTouchStart={()=>!this.state.dragbool &&this.HandInput(i)} id={"HandButton"+i} className=" overflow-hidden disabled:hover:scale-100 disabled:opacity-25 disabled:bg-neutral-400 w-1/12 h-full transition ease-in-out hover:scale-110 shadow-md bg-white border text-slate-950 rounded-md lg:max-2xl:rounded-lg text-xl sm:text-2xl md:text-3xl lg:text-4xl xl:text-5xl 2xl:text-6xl">{this.state.HandLetters[i]}</button>);
      gridbutton.push(b)
    }
    return (gridbutton)
  }
  
  HandInput=(i)=>{
    if(this.state.gamestart){
      this.setState({SelectedLetterIndex:i});
    }
  }

  TogglePopupMenu =()=>{
    if(this.state.showpop==false){
      this.setState({showpop:true});
    }
    else{
      this.setState({showpop:false});
    }

  }
  TogglePopupDono=()=>{
    if(this.state.showdono==false){
      this.setState({showdono:true});
    }
    else{
      this.setState({showdono:false});
    }
  }
  eventControl=(event)=>{
    if (event.type === "mousemove" || event.type === "touchmove") {
      this.setState({dragbool:true});
    }
 
    if (event.type === "mouseup" || event.type === "touchend") {
      setTimeout(() => {
        this.setState({dragbool:false});
      }, 100);
    }
  }
  submit=()=>{
    var boolval = this.checks.validify(this.state.GridLetters);
    alert(boolval);
    if(boolval && this.state.GridLetters!=this.state.storedgrid){//done actual move
      this.setState({storedgrid:this.state.GridLetters});
      this.setState({Round:this.state.Round+1});
      //check used and replace to allow next round to go
      //deal with expanse
    }
    if(boolval && this.state.GridLetters==this.state.storedgrid){//not done move
      this.setState({Round:this.state.Round+1});
      //needs to redeal whole hand
      //add strike til gameover
    }
  }
  DonoWall=()=>{
    return(
      <div className="z-20 flex fixed inset-0 justify-center items-center bg-black w-full h-full bg-opacity-25" hidden="true">
        <div className=" scrollbar-hide">
          <button onTouchStart={()=>!this.state.dragbool &&this.TogglePopupDono()} onClick={()=>!this.state.dragbool &&this.TogglePopupDono()} className=" relative top-0 left-0 h-10 transition ease-in-out hover:scale-110 shadow-md bg-white border text-slate-950 rounded-md lg:max-2xl:rounded-lg aspect-square text-lg sm:text-xl md:text-2xl lg:text-3xl"><XMarkIcon/></button>
          <iframe className="rounded-md lg:rounded-lg scrollbar-hide" id='kofiframe' src='https://ko-fi.com/galtz/?hidefeed=true&widget=true&embed=true&preview=true' height="650" title='galtz'/>
        </div>
      </div>);
  }
  render() {
    return(
    <>
      <div className="flex flex-row w-full z-10 h-1/16 fixed top-0 bg-white border justify-center">
        <button className="transition ease-in-out hover:scale-110 m-1 shadow-md bg-white border text-slate-950 rounded-md sm:rounded-sm md:rounded-md lg:rounded-lg aspect-square text-lg sm:text-xl md:text-2xl lg:text-3xl h-auto"onClick={()=>!this.state.dragbool &&this.TogglePopupMenu()} onTouchStart={()=>!this.state.dragbool &&this.TogglePopupMenu()}>
          <Bars3Icon className="m-1"/>
          </button>
        <div className="h-auto">
          <h1 className=" Bold h-auto mx-4 my-2 sm:text-lg md:text-xl lg:text-2xl text-center bg-gradient-to-br from-blue-500 to-green-300 p-3 text-white rounded-lg">Scrambord</h1>
        </div>
        <button className="flex flex-row transition ease-in-out hover:scale-110 m-1 shadow-md bg-white border text-slate-950 rounded-md sm:rounded-sm aspect-square md:rounded-md lg:rounded-lg" onClick={()=>!this.state.dragbool &&this.TogglePopupDono()} onTouchStart={()=>!this.state.dragbool &&this.TogglePopupDono()}>
          <img className="h-full" src="https://storage.ko-fi.com/cdn/brandasset/kofi_s_logo_nolabel.png"/>
        </button>
      </div>
      {this.state.showdono ? <this.DonoWall /> : null }
      <div className="flex w-screen h-screen justify-center items-center">
        <Draggable onDrag={this.eventControl} onStop={this.eventControl}>
          <div className="flex flex-col justify-center h-5/6 w-full">
              <this.MakeGrid/>
          </div>
        </Draggable>
      </div>
      
      <div className="z-10 border fixed bottom-0 mx-auto w-full h-1/6 bg-white">
        <div className="flex flex-row justify-center px-3 py-2 gap-2 h-full w-full">
          <this.DrawnHand/>
          <button className="w-1/12 h-full transition overflow-hidden ease-in-out hover:scale-110 shadow-md bg-white border text-slate-950 rounded-md lg:max-2xl:rounded-lg sm:text-xl md:text-2xl lg:text-3xl flex justify-center items-center"onClick={()=>!this.state.dragbool &&this.submit()} onTouchStart={()=>!this.state.dragbool &&this.submit()}><ArrowUpOnSquareIcon className="  w-11/12 h-5/6 overflow-hidden stroke-1 hover:stroke-2 hover:stroke-gray-700"></ArrowUpOnSquareIcon></button>
        </div>
      </div>
    </>
    )
  }
}
export default Game