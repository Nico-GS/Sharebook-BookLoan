import React from "react";
import axios from "axios";
import "../scss/AddUser.scss";
import {Link, withRouter} from 'react-router-dom';

class AddUser extends React.Component {

    constructor() {
        super();
        this.state = {userData: {}}
    }

    handleChange = (event) => {
        let currentState = {...this.state.userData};
        currentState[event.target.name] = event.target.value;
        this.setState({userData: currentState});
    }

    onSubmit = (event) => {
        event.preventDefault();
        axios.post('/users', {
            ...this.state.userData
        }).then(response => {
            this.props.setUserInfo(response.data.firstName + " " + response.data.lastName)
            this.props.history.push("/listBooks")
        })

    }

    render() {
        return (
            <div className="add-user-container">
                <div>
                    <h1>M'inscrire</h1>
                    <div>
                        <form onSubmit={this.onSubmit}>
                            <div>
                                <label>Email</label>
                                <input name="email" type="text" className="form-control" onChange={this.handleChange}/>
                            </div>
                            <div>
                                <label>Nom</label>
                                <input name="lastName" type="text" className="form-control"
                                       onChange={this.handleChange}/>
                            </div>
                            <div>
                                <label>Prénom</label>
                                <input name="firstName" type="text" className="form-control"
                                       onChange={this.handleChange}/>
                            </div>
                            <div>
                                <label>Password</label>
                                <input name="password" type="password" className="form-control"
                                       onChange={this.handleChange}/>
                            </div>
                            <div className="container-valid text-center">
                                <input type="submit" value="Valider" className="btn btn-primary"
                                       onChange={this.handleChange}/>
                            </div>
                        </form>
                    </div>
                    <div><Link to="/">Retour à l'accueil</Link></div>
                </div>
            </div>

        )
    }

}

export default withRouter(AddUser)

