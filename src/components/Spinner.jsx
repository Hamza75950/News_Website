import { Component } from "react";
import spinner from "../loading spinner.gif"

export default class Spinner extends Component{
    render(){
        return(
            <div className="text-center mt-5">
                <img src={spinner} alt="" />
            </div>
        )
    }
}