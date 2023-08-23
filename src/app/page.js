"use client"
import Draggable from "react-draggable";
import React from "react";
import {Bars3Icon,XMarkIcon,ArrowDownCircleIcon,ArrowLeftCircleIcon,ArrowRightCircleIcon,ArrowUpCircleIcon} from '@heroicons/react/24/solid';
import {ArrowUpOnSquareIcon} from '@heroicons/react/24/outline';
import jsonadata from './words_dictionary.json' assert { type: 'json' };
import { Tiro_Devanagari_Hindi } from "next/font/google";
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
      console.log(board[0].length,board.length);//y then x
      for (let j = 0; j < board[0].length; j++){//horizontal
        for(let i =0; i <board.length ;i++){
          console.log(i,j)
          if(board[i][j]!=""){
            preword+=board[i][j];
            console.log(preword,"h");
          }
          if(board[i][j] != "" && (i + 1 == board.length || board[i+1][j] == "") && preword.length > 0){
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
              if (j + 1 != board[0].length)//check up
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
                        break;
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
            console.log(i,j);
              if (board[i][j] != "")//read to add a letters to word
              {
                  preword += board[i][j];
                  console.log(preword,"v");
              }
              if (board[i][j] != "" && (j + 1 == board[0].length || board[i][j + 1] == "") && preword.length > 0)//ending of word
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
                      if (i + 1 != board.length)//check right
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
                              break;
                          }
                          else if ((this.wordsarray[k]).split("").reverse().join("") == preword)
                          {
                              isword = true;
                              break;
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
    getscr(intlen){
      var score = 0;
      for(let i=1;i<=intlen;i++){
        score+=1*i;
      }
      return score
    }
    Evalute(board){
      var preword = new String();
      var arr = [];
      var wordcount = 0;
      var score = 0;
      console.log(board[0].length,board.length);//y then x
      for (let j = 0; j < board[0].length; j++){//horizontal
        for(let i =0; i <board.length ;i++){
          if(board[i][j]!=""){
            preword+=board[i][j];
          }
          if(board[i][j] != "" && (i + 1 == board.length || board[i+1][j] == "") && preword.length > 0){
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
              if (j + 1 != board[0].length)//check up
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
                        console.log("ADDED WORDCOUNT");
                        wordcount+=1;
                        score+=this.getscr(preword.length);
                        break;
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
            console.log(i,j);
              if (board[i][j] != "")//read to add a letters to word
              {
                  preword += board[i][j];
                  console.log(preword,"v");
              }
              if (board[i][j] != "" && (j + 1 == board[0].length || board[i][j + 1] == "") && preword.length > 0)//ending of word
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
                      if (i + 1 != board.length)//check right
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
                              wordcount+=1;
                              score+=this.getscr(preword.length);
                              break;
                          }
                          else if (this.wordsarray[k] == preword.split("").reverse().join(""))
                          {
                              isword = true;
                              wordcount+=1;
                              score+=this.getscr(preword.length);
                              break;
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
      arr = [wordcount,score]
      return arr;
    }
}
class DateRandom{
  constructor(dateinput){
    this.randomlettergen = seedrandom(dateinput+"letter");
    this.randomvowelgen = seedrandom(dateinput+"vowel");
    this.randomconsonantsgen = seedrandom(dateinput+"consonants");
  }
  GetLetter(){
    var random=this.randomlettergen();
    var Lindex=Math.floor(random*98);
    var alphabet = "aaaaaaaaabbccddddeeeeeeeeeeeeffggghhiiiiiiiiijkllllmmnnnnnnooooooooppqrrrrrrssssttttttuuuuvvwwxyyz";
    var arr = (alphabet).split("");
    var letter=arr[Lindex]
    return letter;
  }
  GetVowel(){
    var random=this.randomvowelgen();
    var Lindex=Math.floor(random*42);
    var alphabet = "aaaaaaaaaeeeeeeeeeeeeiiiiiiiiioooooooouuuu";
    var arr = (alphabet).split("");
    var letter=arr[Lindex]
    return letter;
  }
  GetConsonants(){
    var random=this.randomconsonantsgen();
    var Lindex=Math.floor(random*56);
    var alphabet = "bbccddddffggghhjkllllmmnnnnnnppqrrrrrrssssttttttvvwwxyyz";
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
      darkmode:localStorage.theme,
      SelectedLetterIndex:"",
      GridX:5,
      GridY:5,
      Round:1,
      PrevWordCount:0,
      Score:0,
      ExpandPoint:1,
      IntermediatePoints:0,
      PenaltyPoints:0,
      LetterStored:null,
      HandLetters:[this.randomiser.GetVowel(),this.randomiser.GetVowel(),this.randomiser.GetLetter(),this.randomiser.GetLetter(),this.randomiser.GetLetter(),this.randomiser.GetLetter(),this.randomiser.GetLetter(),this.randomiser.GetLetter(),this.randomiser.GetConsonants(),this.randomiser.GetConsonants()],
      disabledButtons:Array(10).fill(false),
      GridLetters:Array.from({length:5},e=> Array(5).fill("")),//the board in realtime start goes down then  right
      BoardAppends:new Array(),//the action on the board
      storedgrid:Array.from({length:5},e=> Array(5).fill(""))
    };//no edits
  }
//grid props
  MakeGrid=()=>{
    let gridhtml=[];
    for(let i = 0;i<this.state.GridX;i++){
      gridhtml.push(<div className="flex flex-col-reverse justify-center gap-2"><this.MakeRow posx={i}/></div>);
    }
    return gridhtml;
    
  }
  MakeRow=(posx)=>{
    let rowbuttons = [];
    for(let i = 0;i<this.state.GridY;i++){
      const b = (<button onClick={()=>!this.state.dragbool &&this.BoardInput(posx.posx,i)} onTouchStart={()=>!this.state.dragbool &&this.BoardInput(posx.posx,i)} id={"GridButton"+((i+1)+((posx.posx)*this.state.GridX))} className="transition w-19 h-19 ease-in-out hover:scale-110 shadow-md bg-white border text-slate-950 rounded-md lg:max-2xl:rounded-lg aspect-square text-xl sm:text-xl md:text-2xl lg:text-3xl xl:text-4xl 2xl:text-5xl">{this.state.GridLetters[posx.posx][i]}</button>);
      rowbuttons.push(b)
    }
    return(
      rowbuttons
    )
  }
  BoardInput=(i,j)=>{//takes input and places needs:erasiion
    console.log(i,j)
    if(this.state.gamestart){
      var gridcopy=this.state.GridLetters.map(function(arr){return arr.slice()});
      var appendcopy = this.state.BoardAppends.map(function(arr){return arr.slice()});
      var disbuttonscopy=this.state.disabledButtons.slice();
      if(gridcopy[i][j]!=="" && this.state.SelectedLetterIndex!=""){//do a swap
        for(let k=0;k<appendcopy.length;k++){
          if(appendcopy[k][0]==i&&appendcopy[k][1]==j){
            gridcopy[i][j]="";
            disbuttonscopy[appendcopy[k][2]]=false;
            appendcopy.splice(k,1);
            gridcopy[i][j]=this.state.HandLetters[this.state.SelectedLetterIndex];
            disbuttonscopy[this.state.SelectedLetterIndex]=true;
            appendcopy.push(new Array(i,j,this.state.SelectedLetterIndex));
            break;
          }
        }
      }
      else if(gridcopy[i][j]!==""){//erasion
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

  ExpandGrid(direction){
    if(!this.state.gamestart){
      return;
    }
    var agridcopy=this.state.GridLetters.map(function(arr){
      return arr.slice();
    });
    var ogridcopy=this.state.storedgrid.map(function(arr){
      return arr.slice();
    });
    var appendcopy = this.state.BoardAppends.map(function(arr){return arr.slice()});
    //expand up
    //expand down
    //expand right
    //expand left
    //bottom right is 0 0
    if(direction=="right"||direction=="left"){
      if(direction=="right"){
        agridcopy.push(Array(agridcopy[0].length).fill(""));
        ogridcopy.push(Array(ogridcopy[0].length).fill(""));
      }
      else{
        agridcopy.splice(0,0,Array(agridcopy[0].length).fill(""));
        ogridcopy.splice(0,0,Array(ogridcopy[0].length).fill(""));
        for(let k =0;k<appendcopy.length;k++){
          appendcopy[k][0]+=1;
        }
      }
      this.setState({GridLetters:agridcopy});
      this.setState({storedgrid:ogridcopy});
      console.log(appendcopy);
      this.setState({BoardAppends:appendcopy});
      this.setState({GridX:this.state.GridX+1});
    }
    else if(direction=="up"||direction=="down"){
      for(let i=0;i<agridcopy.length;i++){
        if(direction=="up"){
          agridcopy[i].push("");
          ogridcopy[i].push("");
        }
        else{
          agridcopy[i].splice(0,0,"");
          ogridcopy[i].splice(0,0,"");
          
        }
      }
      if(direction=="down"){for(let k =0;k<appendcopy.length;k++){
        appendcopy[k][1]+=1;
      }}
      this.setState({GridLetters:agridcopy});
      this.setState({storedgrid:ogridcopy});
      console.log(appendcopy);
      this.setState({BoardAppends:appendcopy});
      this.setState({GridY:this.state.GridY+1});
    }
    this.setState({ExpandPoint:this.state.ExpandPoint-1});
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
  ToggleDark =()=>{
    if(localStorage.theme=='light'){
      localStorage.theme = 'dark';
      this.setState({darkmode:localStorage.theme});
    }
    else{
      localStorage.theme = 'light';
      this.setState({darkmode:localStorage.theme});
    }
    if (localStorage.theme === 'dark' || (!('theme' in localStorage) && window.matchMedia('(prefers-color-scheme: dark)').matches)) {
      document.documentElement.classList.add('dark')
    } else {
      document.documentElement.classList.remove('dark')
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
    
    console.log(this.state.GridLetters);
    var boolval = this.checks.validify(this.state.GridLetters);
    console.log(boolval);
    if(boolval && this.state.GridLetters.toString()!=this.state.storedgrid.toString()){//done actual move
      var vals = this.checks.Evalute(this.state.GridLetters);
      if(vals[0]-this.state.PrevWordCount>0){
        this.setState({ExpandPoint:this.state.ExpandPoint+(1*(vals[0]-this.state.PrevWordCount))});
      }
      this.setState({PrevWordCount:vals[0]});
      console.log(this.state.GridLetters);
      console.log(this.state.storedgrid);
      
      var handcopy = this.state.HandLetters.slice();
      for(let i =0;i<handcopy.length;i++){
        if(this.state.disabledButtons[i]==true){
          if(i>7){//consonants
            handcopy[i]=this.randomiser.GetConsonants();
          }
          else if(i<2){//vowels
            handcopy[i]=this.randomiser.GetVowel();
          }
          else{//letter
            handcopy[i]=this.randomiser.GetLetter();
          }
        }
      }
      this.setState({Round:this.state.Round+1});
      this.setState({BoardAppends:new Array()});
      this.setState({disabledButtons:Array(10).fill(false)});
      this.setState({storedgrid:this.state.GridLetters.map(function(arr){return arr.slice()})});
      this.setState({HandLetters:handcopy});
    }
    else if(boolval && this.state.GridLetters.toString()==this.state.storedgrid.toString()){//not done move
      console.log("2");
      this.setState({PenaltyPoints:this.state.PenaltyPoints+1});
      if(this.state.PenaltyPoints+1==3){
        this.setState({gamestart:false});
        //give gameover card
        return;
      }
      this.setState({Round:this.state.Round+1});
      this.setState({storedgrid:this.state.GridLetters.map(function(arr){return arr.slice()})});
      this.setState({HandLetters:[this.randomiser.GetVowel(),this.randomiser.GetVowel(),this.randomiser.GetLetter(),this.randomiser.GetLetter(),this.randomiser.GetLetter(),this.randomiser.GetLetter(),this.randomiser.GetLetter(),this.randomiser.GetLetter(),this.randomiser.GetConsonants(),this.randomiser.GetConsonants()]});
    }
  }
  PopupMenu=()=>{
    
    return(
      <div className="z-20 fixed inset-0 flex flex-col justify-center items-center bg-black w-full h-full bg-opacity-25">
        <div className=" w-80 relative bg-white rounded-md">
        <button onTouchStart={()=>!this.state.dragbool &&this.TogglePopupMenu()} onClick={()=>!this.state.dragbool &&this.TogglePopupMenu()} className="absolute top-0 left-0 h-10 transition ease-in-out bg-white text-slate-950 rounded-md lg:max-2xl:rounded-lg aspect-square text-lg sm:text-xl md:text-2xl lg:text-3xl"><XMarkIcon className=" stroke-1 "/></button>
        <h1 className="text-7xl text-center">Menu</h1>
        <div className="w-full justify-center flex flex-row gap-1"><span className=" grow text-5xl self-stretch m-1">Dark Mode</span> <button className=" grow border self-stretch text-3xl m-1" onTouchStart={()=>!this.state.dragbool &&this.ToggleDark()} onClick={()=>!this.state.dragbool &&this.ToggleDark()}>{this.state.darkmode}</button></div>
        </div>
      </div>
    )
  }
  DonoWall=()=>{
    return(
      <div className="z-20 flex flex-col fixed inset-0 justify-center items-center bg-black w-full h-full bg-opacity-25">
        <div className="relative scrollbar-hide">
          <button onTouchStart={()=>!this.state.dragbool &&this.TogglePopupDono()} onClick={()=>!this.state.dragbool &&this.TogglePopupDono()} className="absolute top-0 left-0 h-10 transition ease-in-out bg-white text-slate-950 rounded-md lg:max-2xl:rounded-lg aspect-square text-lg sm:text-xl md:text-2xl lg:text-3xl"><XMarkIcon className=" stroke-1"/></button>
          <iframe className="rounded-md lg:rounded-lg scrollbar-hide" id='kofiframe' src='https://ko-fi.com/galtz/?hidefeed=true&widget=true&embed=true&preview=true' height="650" title='galtz'/>
        </div>
      </div>);
  }
  Penalty=()=>{
    var penrep =[];
    for(let i=0;i<this.state.PenaltyPoints;i++){
      penrep.push(<XMarkIcon className=" w-auto !aspect-square stroke-2 m-1 stroke-red-500"/>);
    }
    for(let i=0;i<3-this.state.PenaltyPoints;i++){
      penrep.push(<XMarkIcon className=" w-auto !aspect-square stroke-2 m-1 stroke-gray-300"/>);
    }
    return(penrep);
  }
  ReducePenalty=()=>{
    if(this.state.PenaltyPoints==3){
      this.setState({gamestart:true});
    }
    this.setState({PenaltyPoints:this.state.PenaltyPoints-1});
    this.setState({ExpandPoint:this.state.ExpandPoint-1});
  }
  Intermediate=()=>{
    var intrep =[];
    for(let i=0;i<this.state.IntermediatePoints;i++){
      intrep.push(<XMarkIcon className=" w-auto !aspect-square stroke-2 m-1 stroke-red-500"/>);
    }
    for(let i=0;i<4-this.state.IntermediatePoints;i++){
      intrep.push(<XMarkIcon className=" w-auto !aspect-square stroke-2 m-1 stroke-gray-300"/>);
    }
    return(intrep);
  }
  render() {
    
    return(
    <>
      <div className="flex flex-row w-full z-10 h-1/16 fixed top-0 bg-white border justify-center">
        <button className="transition ease-in-out hover:scale-110 m-1 shadow-md bg-white border text-slate-950 rounded-md sm:rounded-sm md:rounded-md lg:rounded-lg aspect-square h-auto"onClick={()=>!this.state.dragbool &&this.TogglePopupMenu()} onTouchStart={()=>!this.state.dragbool &&this.TogglePopupMenu()}>
          <Bars3Icon className="m-1 "/>
        </button>
        <div className="m-1 Bold h-auto sm:text-lg md:text-xl lg:text-xl text-center inset-0 bg-gradient-to-br from-sky-500 to-lime-300 p-3 text-white rounded-lg flex flex-col justify-center"><span className="">Scrambord</span></div>
        
        <button className="flex flex-row transition ease-in-out hover:scale-110 m-1 shadow-md bg-white border text-slate-950 rounded-md sm:rounded-sm aspect-square md:rounded-md lg:rounded-lg" onClick={()=>!this.state.dragbool &&this.TogglePopupDono()} onTouchStart={()=>!this.state.dragbool &&this.TogglePopupDono()}>
          <img className="h-full" src="https://storage.ko-fi.com/cdn/brandasset/kofi_s_logo_nolabel.png"/>
        </button>
      </div>
      {this.state.showdono ? <this.DonoWall /> : null }
      {this.state.showpop?<this.PopupMenu/>:null}
      <div className="flex w-screen h-screen justify-center items-center">
        <Draggable onDrag={this.eventControl} onStop={this.eventControl}>
          <div className="flex flex-col justify-center gap-2">
            {(this.state.ExpandPoint>0)?<button className=" flex justify-center self-center transition w-full h-19 ease-in-out hover:border-lime-400 border-2 border-zinc-50 rounded-t-full "  onClick={()=>!this.state.dragbool &&this.ExpandGrid("up")}><ArrowUpCircleIcon onTouchStart={()=>!this.state.dragbool &&this.ExpandGrid("up")} className=" h-14 w-14 fill-lime-400 overflow-hidden"></ArrowUpCircleIcon></button>:null}
            <div className="flex flex-row justify-center gap-2">
              {(this.state.ExpandPoint>0)?<button className="transition w-full h-19 ease-in-out hover:border-lime-400 border-2 border-zinc-50 rounded "  onClick={()=>!this.state.dragbool &&this.ExpandGrid("left")}><ArrowLeftCircleIcon onTouchStart={()=>!this.state.dragbool &&this.ExpandGrid("left")} className="  h-14 w-14 fill-lime-400 overflow-hidden"></ArrowLeftCircleIcon></button>:null}
              <this.MakeGrid/>
              {(this.state.ExpandPoint>0)?<button className="transition w-full h-19 ease-in-out hover:border-lime-400 border-2 rounded border-zinc-50"  onClick={()=>!this.state.dragbool &&this.ExpandGrid("right")}><ArrowRightCircleIcon onTouchStart={()=>!this.state.dragbool &&this.ExpandGrid("right")} className=" h-14 w-14 fill-lime-400 overflow-hidden"></ArrowRightCircleIcon></button>:null}
            </div>
            {(this.state.ExpandPoint>0)?<button className=" flex justify-center transition w-full h-19 ease-in-out hover:border-lime-400 border-2 rounded-b-full border-zinc-50"  onClick={()=>!this.state.dragbool &&this.ExpandGrid("down")}><ArrowDownCircleIcon onTouchStart={()=>!this.state.dragbool &&this.ExpandGrid("down")} className="  h-14 w-14 fill-lime-400 overflow-hidden" ></ArrowDownCircleIcon></button>:null}
          </div>
        </Draggable>
      </div>
      
      <div className="z-10 border fixed bottom-0 flex flex-col mx-auto w-full h-1/6 bg-white gap-1">
        <div className="flex flex-row justify-center px-3 gap-2">
          <this.DrawnHand/>
          <button className="w-1/12 h-full transition overflow-hidden ease-in-out hover:scale-110 shadow-md bg-white border text-slate-950 rounded-md lg:max-2xl:rounded-lg sm:text-xl md:text-2xl lg:text-3xl flex justify-center items-center"onClick={()=>!this.state.dragbool&&this.state.gamestart &&this.submit()} onTouchStart={()=>!this.state.dragbool&&this.state.gamestart &&this.submit()}><ArrowUpOnSquareIcon className="  w-11/12 h-5/6 overflow-hidden stroke-1 hover:w-full hover:h-full hover:stroke-sky-500"></ArrowUpOnSquareIcon></button>
        </div>
        <div className="flex items-stretch flex-row w-full justify-stretch r px-3 gap-1">
          <div className="flex flex-col justify-center"><div className="px-1 h-full w-full flex-row Bold sm:text-lg md:text-xl lg:text-xl text-center bg-gradient-to-br to-sky-500 from-lime-300 text-white rounded-lg flex justify-center" onClick={()=>!this.state.dragbool&&this.state.PenaltyPoints>0&&this.state.ExpandPoint>0 &&this.ReducePenalty()} onTouchStart={()=>!this.state.dragbool&&this.state.PenaltyPoints>0&&this.state.ExpandPoint>0 &&this.ReducePenalty()}><this.Penalty/></div></div>
          <div className="flex flex-col justify-center"><div className="px-1 h-full w-full flex-row Bold sm:text-lg md:text-xl lg:text-xl text-center bg-gradient-to-br to-sky-500 from-lime-300 text-white rounded-lg flex justify-center" onClick={()=>!this.state.dragbool&&this.state.PenaltyPoints>0&&this.state.ExpandPoint>0 &&this.ReducePenalty()} onTouchStart={()=>!this.state.dragbool&&this.state.PenaltyPoints>0&&this.state.ExpandPoint>0 &&this.ReducePenalty()}><this.Intermediate/></div></div>
          <div className=" Bold h-auto sm:text-lg md:text-xl lg:text-xl text-center bg-gradient-to-br to-sky-500 from-lime-300 p-3 text-white rounded-lg flex flex-col justify-center"><span className="">{"ExP : "+this.state.ExpandPoint}</span></div>
          <div className=" Bold h-auto sm:text-lg md:text-xl lg:text-xl text-center bg-gradient-to-br to-sky-500 from-lime-300 p-3 text-white rounded-lg flex flex-col justify-center"><span className="">{"Round : "+this.state.Round}</span></div>
        </div>
      </div>
    </>
    )
  }
}
export default Game
//do a score system
//exponental letter placed down to score
