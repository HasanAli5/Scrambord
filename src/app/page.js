"use client"
import Draggable from "react-draggable";
import React from "react";
import {Bars3Icon,XMarkIcon} from '@heroicons/react/24/solid';

class Game extends React.Component{
  //class intial
  constructor(props){
    super(props)
    this.state = {
      gamestart:true,
      dragbool:false,
      showdono:false,
      SelectedLetterIndex:"",
      GridX:5,
      GridY:5,
      LetterStored:null,
      HandLetters:Array(10).fill("w"),
      disabledButtons:Array(10).fill(false),
      GridLetters:Array(5*5).fill(""),
      BoardApends:Array(10).fill(Array(2).fill[""]),
      storedgrid:Array(5*5).fill("")};
  }
//grid props
  MakeGrid=()=>{
    var x = this.state.GridX;
    var y = this.state.GridY;
    
    let gridhtml=[];
    for(let i = 0;i<y;i++){
      var a=parseInt(x*i);
      gridhtml.push(<div className="py-1 flex flex-row justify-center gap-2"><this.MakeRow offset={a}/></div>);
    }
    return gridhtml;
    
  }
  MakeRow=(offset)=>{
    let rowbuttons = [];
    
    var x = this.state.GridX
    
    for(let i = 0;i<x;i++){
      let a = parseInt(i+offset.offset);
      const b = (<button onClick={()=>!this.state.dragbool &&this.BoardInput(a)} id={"GridButton"+a} className="transition  w-20 h-20 ease-in-out hover:scale-110 shadow-md bg-white border text-slate-950 rounded-md lg:max-2xl:rounded-lg aspect-square text-lg sm:text-xl md:text-2xl lg:text-3xl">{this.state.GridLetters[a]}</button>);
      rowbuttons.push(b)
    }
    return(
      rowbuttons
    )
  }
  BoardInput(i){
    if(this.state.gamestart){
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
      const b = (<button disabled={this.state.disabledButtons[i]} onClick={()=>!this.state.dragbool &&this.HandInput(i)} id={"HandButton"+i} className=" disabled:hover:scale-100 disabled:opacity-25 disabled:bg-neutral-400 w-auto h-auto transition ease-in-out hover:scale-110 shadow-md bg-white border text-slate-950 rounded-md lg:max-2xl:rounded-lg aspect-square text-lg sm:text-xl md:text-2xl lg:text-3xl">{this.state.HandLetters[i]}</button>);
      gridbutton.push(b)
    }
    return (gridbutton)
  }
  
  HandInput(i){
    if(this.state.gamestart){
      this.setState({SelectedLetterIndex:i});
    }
  }

  TogglePopupMenu =()=>{

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
  DonoWall=()=>{
    return(
      <div className="z-20 flex fixed inset-0 justify-center items-center bg-black w-full h-full bg-opacity-25" hidden="true">
        <div className="">
          <button onClick={()=>!this.state.dragbool &&this.TogglePopupDono()} className=" relative top-0 left-0 h-10 transition ease-in-out hover:scale-110 shadow-md bg-white border text-slate-950 rounded-md lg:max-2xl:rounded-lg aspect-square text-lg sm:text-xl md:text-2xl lg:text-3xl"><XMarkIcon/></button>
          <iframe className="rounded-md lg:rounded-lg" id='kofiframe' src='https://ko-fi.com/galtz/?hidefeed=true&widget=true&embed=true&preview=true' height="550" title='galtz'/>
        </div>
      </div>);
  }
  render() {
    return(
    <>
      <div className="flex flex-row w-full z-10 h-1/16 fixed top-0 bg-white border justify-center">
        <button className="transition ease-in-out hover:scale-110 m-1 shadow-md bg-white border text-slate-950 sm:rounded-sm md:rounded-md lg:rounded-lg aspect-square text-lg sm:text-xl md:text-2xl lg:text-3xl h-auto" onClick={()=>!this.state.dragbool &&this.TogglePopupMenu()}>
          <Bars3Icon className="m-1"/>
          </button>
        <div className="h-auto">
          <h1 className=" Bold h-auto mx-4 my-2 sm:text-lg md:text-xl lg:text-2xl text-center bg-gradient-to-br from-blue-500 to-green-300 p-3 text-white rounded-lg">Scrambord</h1>
        </div>
        <button className="flex flex-row transition ease-in-out hover:scale-110 m-1 shadow-md bg-white border text-slate-950 sm:rounded-sm aspect-square md:rounded-md lg:rounded-lg" onClick={()=>!this.state.dragbool &&this.TogglePopupDono()}>
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
          <button className="h-auto w-auto transition ease-in-out hover:scale-110 shadow-md bg-white border text-slate-950 rounded-md lg:max-2xl:rounded-lg aspect-square sm:text-xl md:text-2xl lg:text-3xl" onClick={()=>!this.state.dragbool &&this.updateGrid(100,100)}></button>
        </div>
      </div>
    </>
    )
  }
}
export default Game