import React, { Component,Fragment } from "react";
import {
    CssBaseline,
    AppBar,
    Toolbar,
    Typography,
    withStyles,
    Paper,
    FormControl,
    Select,
    InputLabel,
    MenuItem,
    TextField,
    Button,
    CircularProgress,
    Box
}
from '@material-ui/core';
import { DatePicker,MuiPickersUtilsProvider } from "@material-ui/pickers";
import EditOutlinedIcon from '@material-ui/icons/EditOutlined';
import PropTypes from "prop-types";
import MomentUtils from '@date-io/moment';
import {timeSlots, apiKey, clientId} from '../constants';
import moment from 'moment';
import { connect } from "react-redux";
import {getObject, removeObject} from '../utils';
import SnackBar from './SnackBar';
import AttendeeModal from './AttendeeModal';

const classes = (theme) => ({
    title:{
        flexGrow: 1,
    },
    layout: {
        width: 'auto',
        marginLeft: theme.spacing(2),
        marginRight: theme.spacing(2),
        [theme.breakpoints.up(600 + theme.spacing(2) * 2)]: {
          width: 600,
          marginLeft: 'auto',
          marginRight: 'auto',
        },
    },
    paper: {
        marginTop: theme.spacing(3),
        marginBottom: theme.spacing(3),
        padding: theme.spacing(2),
        [theme.breakpoints.up(600 + theme.spacing(3) * 2)]: {
          marginTop: theme.spacing(6),
          marginBottom: theme.spacing(6),
          padding: theme.spacing(3),
        },
    },
    formControl: {
        marginTop: theme.spacing(4),
    },
    datePicker:{
        margin: theme.spacing(4)
    },
    slot:{
        margin: theme.spacing(1)
    },
    bookButton:{
        margin: theme.spacing(3, 0, 2),
    },
    attendeeContainer:{
        width:'100%',
    },
    list:{
        marginTop:theme.spacing(2)
    },
    editBtn:{
        cursor:'pointer'
    }
})

class Booking extends Component{
    constructor(props){
        super(props);
        this.state={
            employee:{
                name:'',
                room:'',
                description:'',
                date:new Date(),
                slot:'',
                email:'',
                attendees:''
            },
            creatingBooking: false,
            message: '',
            tempName:"",
            openAttendeeModal:false,
            allAttendees:[]
        }       
    }

    componentDidMount(){
        const userDetails = JSON.parse(getObject("session")) || {}
        const email = (userDetails && userDetails.email) || "";
        const firstName = (userDetails && userDetails.firstName) || "";
        const lastName = (userDetails && userDetails.lastName) || "";
        const {employee = {}} = this.state;
        let updatedEmployee = {
            ...employee,
            email,
        }
        this.setState({employee:updatedEmployee,tempName:`${firstName} ${lastName}`});
        this.handleClientLoad();
        
    }

   handleClientLoad = () => {
        window.gapi.load('client:auth2', this.initClient);
    }

    initClient = () => {
        window.gapi.client.init({
          apiKey: apiKey,
          clientId: clientId,
          discoveryDocs: ["https://www.googleapis.com/discovery/v1/apis/calendar/v3/rest"],
          scope: "https://www.googleapis.com/auth/calendar"
        }).then(function () {
            // console.log("success")
        }, function(error) {
            // console.log(error, "error")
        });
    }

    onChange = (e,prop,detail) => {
        const {employee} = this.state;

        if(prop === "date"){
            let updatedEmployee = {
                ...employee,
                [prop]:moment(e).format()
            }
            this.setState({
                employee:updatedEmployee
            })
        }
        else if(prop === "slot"){
            let updatedEmployee = {
                ...employee,
                [prop]:detail
            }
            this.setState({
                employee:updatedEmployee
            })
        }
        else{
            const {value} = e && e.target;
            let updatedEmployee ={
                ...employee,
                [prop]:value
            }
            this.setState({
                employee:updatedEmployee
            })
        }
    }

    createBooking = (e) => {
        const { employee={},allAttendees=[] } = this.state;
        this.toggleCreateBookingLoading();

        const { date="", slot="", name="", room="", description=""} = employee;
        const startDateTime = moment(moment(date).format('MM/DD/YYYY') + " " +  slot, 'MM/DD/YYYY hh:mm A').format();
        
        let endTimeSlot = slot.split(":");
        endTimeSlot[0] = parseInt(endTimeSlot[0] || 10) + 1;
        endTimeSlot = endTimeSlot.join(":");

        const endDateTime = moment(moment(date).format('MM/DD/YYYY') + " " + endTimeSlot, 'MM/DD/YYYY hh:mm A').format();
        
        var event = {
            'summary': name,
            'location': room,
            'description': description,
            'start': {
              'dateTime': startDateTime,
              'timeZone': 'Asia/Calcutta'
            },
            'end': {
              'dateTime': endDateTime,
              'timeZone': 'Asia/Calcutta'
            },
            'attendees': allAttendees,
            'reminders': {
              'useDefault': false,
              'overrides': [
                {'method': 'email', 'minutes': 24 * 60},
                {'method': 'popup', 'minutes': 10}
              ]
            },
            sendNotifications: true
        };
        var request = window.gapi.client.calendar.events.insert({
            'calendarId': 'primary',
            'resource': event
        });
          
        request.execute((event) => {
            let message = "Event Created Successfully";
            this.toggleCreateBookingLoading();
            if(event.error) {
                message = event.message;
            }
            else {
                this.setState({
                    employee:{}
                })
            }
            this.openSnackBar(message);
        });
    }

    openSnackBar = (message) => {
        this.setState((prevState) => ({
            open: !prevState.open,
            message
        }));
    }

    closeSnackBar = () => {
        this.setState((prevState) => ({
            open: !prevState.open,
            message: ''
        }));
    }

    logOut = () => {
        removeObject("session")
        setTimeout(() => {
            this.setState({
                loading: false
            });
            this.props.history.push("/");
        }, 500);
    }

    toggleCreateBookingLoading = () => {
        this.setState((prevState) => ({
            creatingBooking: !prevState.creatingBooking
        }))
    }

    toggleAttendeeModal = () => {
        this.setState((prevState) => ({
            openAttendeeModal:!prevState.openAttendeeModal
        }))
    }

    onSaveAttendees = () => {
        const {employee = {}} = this.state;
        const {attendees} = employee;
        let attendeeArr =  attendees && attendees.split(',')
        let allAttendees = attendeeArr && attendeeArr.map((att) => {
            return {'email' : att}
        })
        this.setState({
            allAttendees 
        },() => {
            this.openSnackBar("Attendees saved successfully")
            this.toggleAttendeeModal();
        })
    }

    render(){
        const { classes } = this.props;
        const { employee={}, creatingBooking=false, open=false, message='', tempName='', openAttendeeModal=false } = this.state;
        return(
            <Fragment>
            <CssBaseline />
            <AppBar position="static" color="default">
                <Toolbar>
                    <Typography variant="h6" color="inherit" className={classes.title}>
                        {tempName !== " " ? tempName : (employee && employee.email) }
                    </Typography>
                    <Button color="inherit" onClick={this.logOut}>Logout</Button>
                </Toolbar>
            </AppBar>
            <main className={classes.layout}>
                <Paper className={classes.paper}>
                    <Typography component="h5" variant="h5" align="center">
                        Meeting Room Booking
                    </Typography>
                    <FormControl variant="outlined" className={classes.formControl} fullWidth>
                        <InputLabel id="demo-simple-select-outlined-label">Meeting Room</InputLabel>
                            <Select
                                labelId="demo-simple-select-outlined-label"
                                id="demo-simple-select-outlined"
                                value={employee.room}
                                onChange={(e)=>{this.onChange(e,"room")}}
                                label="Meeting Room"
                                fullWidth
                            >
                                <MenuItem value="">
                                    <em>None</em>
                                </MenuItem>
                                <MenuItem value={"room1"}>Room 1</MenuItem>
                                <MenuItem value={"room2"}>Room 2</MenuItem>
                                <MenuItem value={"room3"}>Room 3</MenuItem>
                            </Select>
                    </FormControl>
                    <TextField
                        variant="outlined"
                        margin="normal"
                        label="Name"
                        fullWidth
                        onChange = {(e)=>this.onChange(e,"name")}
                        value={employee.name || ''}
                    />
                    <TextField
                        label="Meeting Description"
                        multiline
                        rows={4}
                        variant="outlined"
                        fullWidth
                        value={employee.description || ''}
                        onChange={(e)=>this.onChange(e,"description")}
                    />
                    <div className = {classes.attendeeContainer}>
                    {employee && employee.attendees ? 
                        <Box display="flex" flexDirection="row">
                            <Box>
                                <Typography component="h4" noWrap  align="left" className={classes.list}>
                                    Attendees: {employee.attendees || ''}
                                </Typography>
                            </Box>
                            <Box p={2} className={classes.editBtn}>
                                <EditOutlinedIcon onClick={this.toggleAttendeeModal} />
                            </Box>
                        </Box>
                        :
                        <Button variant="outlined" color="default" className={classes.list} onClick={this.toggleAttendeeModal}>Add Attendees</Button>
                    }
                    </div>
                    <div className={classes.datePicker}>
                        <MuiPickersUtilsProvider utils={MomentUtils} >
                            <DatePicker
                                autoOk
                                orientation="landscape"
                                variant="static"
                                openTo="date"
                                value={employee.date}
                                onChange={(e) => this.onChange(e,"date")}
                                fullWidth
                                disablePast
                            />
                        </MuiPickersUtilsProvider>
                    </div>
                    <div>
                    <Typography component="h5" noWrap  align="left">
                        Please select your preferred slot
                    </Typography>
                    {
                        timeSlots && timeSlots.map((slot,key)=>{
                            return(
                                <Button key={key} variant={`${slot === employee.slot ? 'contained' : 'outlined'}`} 
                                        className={classes.slot} 
                                        onClick={(e)=>this.onChange(e,"slot",slot)}
                                        color={`${slot === employee.slot ? 'primary' : 'default'}`}
                                >
                                    {slot}
                                </Button>
                            )
                        })
                    }
                    </div>
                    <Button
                        fullWidth
                        variant="contained"
                        color="primary"
                        onClick={this.createBooking}
                        className={classes.bookButton}
                    >
                        {creatingBooking ? <CircularProgress color="#FFF" /> : 'Book Appointment'}
                    </Button>
                </Paper>
            </main>
            <SnackBar open={open} message={message} handleClose={this.closeSnackBar}/>
            <AttendeeModal
                open={openAttendeeModal}
                handleClose={this.toggleAttendeeModal}
                modalTitle="Add Attendees"
                modalText={"Enter email addresses of attendees for your meeting (Address must be comma seperated)"}
                modalBody={
                    <TextField
                        label="Enter Attendees Email"
                        multiline
                        rows={4}
                        variant="outlined"
                        fullWidth
                        value={employee.attendees || ''}
                        onChange={(e)=>this.onChange(e,"attendees")}
                    />
                }
                onSave={this.onSaveAttendees}
            />
        </Fragment>
        )
    }
}

Booking.propTypes = {
    classes: PropTypes.object.isRequired
}

const BookingConnected = withStyles(classes)(Booking);
const mapStateToProps = state => {
    return {
        user: state.user
    };
};
const MeetingBooking = connect(mapStateToProps)(BookingConnected)

export default MeetingBooking;