import React,{Component} from "react";
import { BrowserRouter, Route, Switch} from 'react-router-dom';
import MeetingBooking from './components/MeetingBooking';
import Login  from './components/Login';

export default class Routes extends Component{
    render(){
        return(
            <BrowserRouter>
                <Switch>
                    <Route path="/booking" component={MeetingBooking}/>
                    <Route exact path="/" component={Login}/>
                </Switch>
            </BrowserRouter>
        )
    }
}