/* eslint-disable no-loop-func */
import React, {Component} from "react";
import "./numbers.css";

class Numbers extends Component {
	// constructor(props){
  //   super(props)

  //   this.state={
	// 		counter:0
  //   }
	// }
	
	// setIntervalLimited = (interval,x) =>{
	// 	for(let i = 0 ; i < x; i +=1){
	// 		setTimeout(this.counter(),interval*x)
	// 	}
	// }

	// counter(){
	// 	let increment = this.state.counter
	// 			increment += 1
	// 			this.setState({
	// 				counter:increment
	// 			})
	// 	}

	render(){
		return (
			<div className="numbers-div">
			<h3>{this.props.number}</h3>
			<h3>{this.props.children}</h3>
			</div>
		);
	}
};

export default Numbers;
