import * as React from 'react';
import { BaseUrl } from './../base.url'
import { apiPredictSpamMail } from '../apiService';
import { SocialNetworkShare } from './SocialNetworkShare'
import _ from 'lodash'
import { MyEditor } from './MyEditor'

export class PredictSpamMail extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            email: {},
            predictResult: ''
        }
    }


    componentWillMount() {
    }

    handleTextChange = (event) => {
        this.state.email = event.target.value;
        this.setState(this.state);
    }

    predictSpamEmail = (event) => {
        event.preventDefault();
        this.setState({ predictResult: '' });

        var model = { email: this.state.email };

        apiPredictSpamMail(model, (response) => {
            if (response.target.status == 200) {
                let data = JSON.parse(response.target.responseText);
                if (data.spamMail) {
                    this.setState({ predictResult: `IT'S SPAM EMAIL!!!` });
                }
                else {
                    this.setState({ predictResult: `IT'S NORMAL EMAIL!!!` });
                }
            }
        },
            (errors) => {
                console.log(errors)
            })
    }

    setContent = (content) => this.setState({ email: content });

    render() {
        let mediaFile = this.state.article ? this.state.article.image : '';
        let title = this.state.article ? this.state.article.Title : 'Predict spam mail'
        return (
            <div className="container">
                <h2 className="mt-4">Predict spam mail</h2>
                <div>
                    <div className="panel-body" >
                        <form className="form-horizontal" role="form" encType="multipart/form-data">
                          
                            <div className="form-group">
                                <div className="row">
                                    <div className="col-md-12">
                                        <MyEditor setContent={(content) => this.setContent(content)} />
                                    </div>
                                </div>
                            </div>
                            {
                                (() => {
                                    if (this.state.predictResult == `IT'S SPAM EMAIL!!!`) {
                                        return (
                                            <div className="alert alert-danger">
                                                <p>{this.state.predictResult}</p>
                                                <span></span>
                                            </div>
                                        )
                                    }
                                    else if (this.state.predictResult == `IT'S NORMAL EMAIL!!!`) {
                                        return (
                                            <div className="alert alert-success">
                                                <p>{this.state.predictResult}</p>
                                                <span></span>
                                            </div>
                                        )
                                    }

                                })()
                            }

                            <div className="form-group">
                                <div className="col-md-12">
                                    <button className="btn btn-info" type="button"
                                        onClick={(e) => this.predictSpamEmail(e)}
                                    ><i className="icon-hand-right"></i> Predict</button>
                                </div>
                            </div>
                        </form>
                    </div>
                </div>

                <hr />
                <SocialNetworkShare mediaFile={mediaFile} title={title} />
                <hr />
            </div>
        )
    }
}