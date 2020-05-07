import React,{Component} from "react";
import { BrowserRouter, Route, Switch,Redirect} from 'react-router-dom';
import MeetingBooking from './components/MeetingBooking';
import Login  from './components/Login';
import NotFound from './components/NotFound';
import {isLoggedIn} from './utils';

const PrivateRoute = ({ component: Component, ...rest }) => (
	<Route {...rest} render={props => {
		return isLoggedIn() ? (
				<MeetingBooking {...props} />
		) :
			(
				<Redirect to={{ pathname: `/` }} />
			)
	}} />
)

export default class Routes extends Component{
    render(){
        return(
            <BrowserRouter>
                <Switch>
                    <PrivateRoute path="/booking" component={MeetingBooking}/>
                    <Route exact path="/" component={Login}/>
                    <Route component={NotFound}/>
                </Switch>
            </BrowserRouter>
        )
    }
}