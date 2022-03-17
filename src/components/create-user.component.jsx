import React, { Component } from 'react'; 
import axios from 'axios';

export default class CreateUsers extends Component {
    state = {
        username: ''
    }
    onChangeUsername = (e) => {
        this.setState({
            username: e.target.value
        });
    }

    onSubmit = (e) => {
        e.preventDefault();

        const user = {
            username: this.state.username
        }

        console.log(user);

        axios.post('http://localhost:3007/users/add', user)
            .then(res => console.log(res.data));

        this.setState({
            username: ''
        });
    }

    render () {
        return (
            <div className='container'>
                <h2>Create New User</h2>
                <form onSubmit={this.onSubmit}>
                    <div className="form-group">
                        <label>Username: </label>
                        <input type="text"
                            required
                            className="form-control"
                            value={this.state.username}
                            onChange={this.onChangeUsername}
                            />
                    </div>
                    <br/>

                    <div className="form-group">
                        <input type="submit" value="Create User" className="btn btn-primary" />
                    </div>

                </form>
            </div>
        );
    }
}