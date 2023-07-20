"use client"
import Draggable from "react-draggable";
import { useState } from "react";
import React from "react";

class Game extends React.Component{
  
  constructor(props){
    super(props)
    this.state = {BoolDrag:false,GridX:5,GridY:5,LetterStored:null,HandLetters:Array(10).fill("w"),GridLetters:Array(5*5).fill("w")};
    this.props.gridbutton
  }

  ExpandBoard=()=>{
    let gridbuttons = [];
    
    const x = this.state.GridX
    const y = this.state.GridY
    for(let i = 0;i<x*y;i++){
      const b = (<button onDoubleClick={()=>this.BoardInput(i)} id={"GridButton"+i} className=" bg-white border text-slate-950 rounded-2xl aspect-square">{this.state.GridLetters[i]}</button>);
      gridbuttons.push(b)
    }
    return(
      gridbuttons
    )
  }
  DrawnHand=()=>{
    let gridbutton = []
    for(let i =0;i<10;i++){
      const b = (<button onDoubleClick={()=>this.HandInput(i)} className="bg-white border text-slate-950 rounded-2xl aspect-square">{this.state.HandLetters[i]}</button>);
      gridbutton.push(b)
    }
    return (gridbutton)
  }
  BoardInput(i){
    if(this.state.BoolDrag==false){
      return alert("Board #"+i);
    }
  }
  HandInput(i){
    if(this.state.BoolDrag==false){
      return alert("Hand #"+i);
    }
  }

  UpdateDrag=()=>{
    if(this.state.BoolDrag==true){
      this.setState({BoolDrag:false});
    }
    if(this.state.BoolDrag==false){
      this.setState({BoolDrag:true});
    }
    
  }

  render() {
    return(
      <>
      <div className="z-10 container fixed top-0 w-2/12 ">
        <h1 className="mx-4 my-2 text-6xl">Name</h1>
      </div>
        <Draggable onStart={this.UpdateDrag} onStop={this.UpdateDrag}>
          <div className="container w-1/3">
            <div className={`grid gap-2 grid-cols-5 grid-cols-${this.state.GridX}`}>
              <this.ExpandBoard/>
            </div>
          </div>
          
        </Draggable>

        <div className="z-10 border container fixed bottom-0 left-0.5 right-0.5 center h-1/5 bg-gray-50 rounded-t-3xl">
          <div className="flex px-7 py-2 gap-2 h-full">
            <this.DrawnHand/>
          </div>
        </div>
    </>
    )
  }
}
export default Game