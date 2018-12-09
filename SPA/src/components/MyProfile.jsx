import * as React from 'react'

export class MyProfile extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            myProfile: this.props.myProfile ? this.props.myProfile : undefined
        }
    }

    render() {
        return (
            <div>
                <h1 className="my-4">My profile
                </h1>
                <div className="panel-body" >
                    <div className="form-group">
                        <div className="row">
                            <div className="col-md-3"> First name:</div>
                            <div className="col-md-9"> <strong>{this.state.myProfile ? this.state.myProfile.firstName : ''}</strong></div>
                        </div>
                    </div>
                    <div className="form-group">
                        <div className="row">
                            <div className="col-md-3"> Last name:</div>
                            <div className="col-md-9"> <strong>{this.state.myProfile ? this.state.myProfile.lastName : ''}</strong></div>
                        </div>
                    </div>

                    <div className="form-group">
                        <div className="row">
                            <div className="col-md-3"> Email:</div>
                            <div className="col-md-9"> <strong>{this.state.myProfile ? this.state.myProfile.email : ''}</strong></div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}