import * as React from 'react';
import { Redirect } from 'react-router-dom'
import { apiRegisterAccount } from './../apiService';
import {BaseUrl} from './../base.url'

export class Register extends React.Component{
    constructor(props) {
        super(props);
        this.state = {
            registerModel: {},
            errorMessage: '',
            redirectToMyProfile: false
        }
    }

    setUserProfile = (profile) => {
        this.props.setUserProfile(profile);
    }

    handleTextChange = (event, name) => {
        this.state.registerModel[name] = event.target.value;
        this.setState({ registerModel: this.state.registerModel });
    }

    registerAccount = (event) => {
        event.preventDefault();
        this.setState({ errorMessage: '' });

        var registerModel = this.state.registerModel;

        apiRegisterAccount(registerModel, (response) => {
            if (response.target.status == 200) {
                let data = JSON.parse(response.target.responseText);
                this.setState({ redirectToMyProfile: true });
                this.setUserProfile(data);
            }
            else {
                this.setState({ redirectToMyProfile: false });
                this.setState({ errorMessage: "Error when register account from server" });
            }
        },
            (errors) => {
                this.setState({ redirectToMyProfile: false });
                this.setState({ errorMessage: 'Error when register account!' });
            })

    }

    render() {
        if (this.state.redirectToMyProfile) {
            return <Redirect to={BaseUrl.MYPROFILE_URL} />;
        }

        return (
            <div>
                <h1 className="my-4">Sign up
            </h1>
                <div className="panel-body" >
                    <form id="signupform" className="form-horizontal" role="form">
                        {
                            (() => {
                                if (this.state.errorMessage != '') {
                                    return (
                                        <div id="signupalert" className="alert alert-danger">
                                            <p>{this.state.errorMessage}</p>
                                            <span></span>
                                        </div>
                                    )
                                }
                            })()
                        }

                        <div className="form-group">
                            <div className="row">
                                <label className="col-md-3 control-label">User name</label>
                                <div className="col-md-9">
                                    <input type="text"
                                        value={this.state.registerModel.userName ? this.state.registerModel.userName : ""}
                                        onChange={evt => this.handleTextChange(evt, 'userName')}
                                        className="form-control" placeholder="User name" />
                                </div>
                            </div>
                        </div>

                        <div className="form-group">
                            <div className="row">
                                <label className="col-md-3 control-label">Email</label>
                                <div className="col-md-9">
                                    <input type="text"
                                        value={this.state.registerModel.email ? this.state.registerModel.email : ""}
                                        onChange={evt => this.handleTextChange(evt, 'email')}
                                        className="form-control" placeholder="Email address" />
                                </div>
                            </div>
                        </div>

                        <div className="form-group">
                            <div className="row">
                                <label className="col-md-3 control-label">First Name</label>
                                <div className="col-md-9">
                                    <input type="text"
                                        value={this.state.registerModel.firstName ? this.state.registerModel.firstName : ""}
                                        onChange={evt => this.handleTextChange(evt, 'firstName')}
                                        className="form-control" placeholder="First name" />
                                </div>
                            </div>
                        </div>
                        <div className="form-group">
                            <div className="row">
                                <label className="col-md-3 control-label">Last Name</label>
                                <div className="col-md-9">
                                    <input type="text"
                                        value={this.state.registerModel.lastName ? this.state.registerModel.lastName : ""}
                                        onChange={evt => this.handleTextChange(evt, 'lastName')}
                                        className="form-control" placeholder="Last name" />
                                </div>
                            </div>
                        </div>
                        <div className="form-group">
                            <div className="row">
                                <label className="col-md-3 control-label">Password</label>
                                <div className="col-md-9">
                                    <input type="password"
                                        value={this.state.registerModel.password ? this.state.registerModel.password : ""}
                                        onChange={evt => this.handleTextChange(evt, 'password')}
                                        className="form-control" placeholder="Password" />
                                </div>
                            </div>
                        </div>
                        <div className="form-group">
                            <div className="row">
                                <label className="col-md-3 control-label">Confirm Password</label>
                                <div className="col-md-9">
                                    <input type="password"
                                        value={this.state.registerModel.confirmPassword ? this.state.registerModel.confirmPassword : ""}
                                        onChange={evt => this.handleTextChange(evt, 'confirmPassword')}
                                        className="form-control" placeholder="Confirm Password" />
                                </div>
                            </div>
                        </div>

                        <div className="form-group">
                            <div className="col-md-offset-3 col-md-9">
                                <button className="btn btn-info" type="button"
                                    onClick={(e) => this.registerAccount(e)}
                                ><i className="icon-hand-right"></i> Sign Up</button>
                            </div>
                        </div>
                    </form>
                </div>
            </div>
        )
    }
}