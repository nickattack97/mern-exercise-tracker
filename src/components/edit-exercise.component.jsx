import React, { Component } from 'react';
import DatePicker from 'react-datepicker';
import "react-datepicker/dist/react-datepicker.css"
import axios from 'axios';
import { useParams } from 'react-router-dom';


function withParams(Component) {
    return props => <Component {...props} params={useParams()} />;
  }

class EditExercises extends Component {

    state = {
        username: '',
        description: '',
        duration: 0,
        date: new Date(),
        users: [],
    }

    componentDidMount(){
        console.log(this.props.params.id);
        axios.get('http://localhost:3001/exercises/'+this.props.params.id)
            .then(res => {
                this.setState({
                    username: res.data.username,
                    description: res.data.description,
                    duration: res.data.duration,
                    date: new Date(res.data.date),
                })
            })
            .catch((error)=>{
                console.log(error);
            })

            axios.get('http://localhost:3001/users/')
            .then(res => {
                if(res.data.length > 0){
                    this.setState({
                        users: res.data.map(user => user.username),
                    })
                }
            })
    }
    onChangeUsername = (e) => {
        this.setState({
            username: e.target.value
        });
    }

    onChangeDescription = (e) => {
        this.setState({
            description: e.target.value
        });
    }

    onChangeDuration = (e) => {
        this.setState({
            duration: e.target.value
        });
    }

    onChangeDate = (date) => {
        this.setState({
            date: date
        });
    }
   
    onSubmit = (e) => {
        e.preventDefault();

        const exercise = {
            username: this.state.username,
            description: this.state.description,
            duration: this.state.duration,
            date: this.state.date
        }

        console.log(exercise);

        axios.post('http://localhost:3001/exercises/update/'+this.props.params.id, exercise)
        .then(res => console.log(res.data));

        window.location = '/';
    }

    render () {

        return (
            <div className='container'>
                <h2>Edit Exercise Log</h2>
                <form onSubmit={this.onSubmit}> 
                    <div className="form-group">
                        <label>Username: </label>
                        <select ref="userInput"
                            required 
                            onChange={this.onChangeUsername}
                            className="form-control"
                            >
                                {
                                    this.state.users.map(function(user) {
                                        return <option
                                            key={user}
                                            value={user}>{user}
                                            </option>
                                    })
                                }
                            </select>
                    </div>
                    <div className="form-group">
                        <label>Description: </label>
                        <input type="text"
                            required
                            className="form-control"
                            value={this.state.description}
                            onChange={this.onChangeDescription}
                            />
                    </div>
                    <div className="form-group">
                        <label>Duration (in minutes): </label>
                        <input type="text"
                            required
                            className="form-control"
                            value={this.state.duration}
                            onChange={this.onChangeDuration}
                            />
                    </div>
                    <div className="form-group">
                        <label>Date: </label>
                       <div>
                           <DatePicker
                            selected = {this.state.date}
                            onChange={this.onChangeDate}
                            />
                       </div>
                    </div><br/>

                    <div className="form-group">
                        <input type="submit" value="Edit Exercise Log" className="btn btn-primary" />
                    </div>

                </form>
            </div>
        );
    }
}

export default withParams(EditExercises);
