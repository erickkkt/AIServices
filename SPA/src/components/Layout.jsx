import * as React from "react";
import { Route, Link,Switch } from "react-router-dom"
import { Search } from "./Search";
import { Category } from "./Category";
import { Article } from "./Article";
import { MainArticles } from "./MainArticles";
import { Register } from "./Register";
import { Login } from "./Login";
import { MyProfile } from "./MyProfile";
import { MyBlogs } from "./MyBlogs";
import { CreateBlog } from "./CreateBlog";
import { CategoryBlogs } from "./CategoryBlogs"
import { BaseUrl } from "../base.url";
import { guid } from "./../helper"
import { SearchBlogs } from "./SearchBlogs";
import { PredictSpamMail } from "./PredictSpamMail";

export class Layout extends React.Component {

    constructor(props) {
        super(props);

        const retrievedUserProfile = localStorage.getItem('userProfile');

        this.state = {
            userProfile: retrievedUserProfile?JSON.parse(retrievedUserProfile):undefined,
            categoryName:''
        }
    }

    logOut = (e) => {
        e.preventDefault();
        this.setState({ userProfile: undefined });
        localStorage.removeItem('userProfile');
    }

    setUserProfile = (profile) => {
        this.setState({ userProfile: profile });
        //Set to local storage
        localStorage.setItem('userProfile', JSON.stringify(profile));
    }

    render() {
        return (
            <div>
                <nav className="navbar navbar-expand-lg navbar-dark bg-dark fixed-top">
                    <div className="container">
                        {/* <a className="navbar-brand" href="#">WebBlog</a> */}
                        <Link className="navbar-brand" to={BaseUrl.HOME_URL}>AI-Services</Link>
                        <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarResponsive" aria-controls="navbarResponsive" aria-expanded="false" aria-label="Toggle navigation">
                            <span className="navbar-toggler-icon"></span>
                        </button>
                        <div className="collapse navbar-collapse" id="navbarResponsive">
                            {
                                (() => {
                                    if (this.state.userProfile != undefined) {
                                        return (
                                            <ul className="navbar-nav ml-auto">
                                                <li className="nav-item active">
                                                    <Link className="nav-link" to={BaseUrl.MYBLOGS_URL}>My blogs</Link>
                                                </li>
                                                <li className="nav-item active">
                                                    <Link className="nav-link" to={BaseUrl.CREATE_BLOG_URL}>Write blog</Link>
                                                </li>
                                                <li className="nav-item">
                                                    <Link className="nav-link" to={BaseUrl.MYPROFILE_URL}>My profile</Link>
                                                </li>
                                                <li className="nav-item">
                                                    <a className="nav-link" href="#" onClick={(e) => this.logOut(e)}>Logout </a>
                                                </li>
                                            </ul>
                                        )
                                    } else {
                                        return (
                                            <ul className="navbar-nav ml-auto">

                                                <li className="nav-item">
                                                    <Link className="nav-link" to={BaseUrl.LOGIN_URL}>Login</Link>
                                                </li>
                                                <li className="nav-item">
                                                    <Link className="nav-link" to={BaseUrl.REGISTER_URL}>Register</Link>
                                                </li>
                                            </ul>
                                        )
                                    }
                                })()
                            }
                        </div>
                    </div>
                </nav>

                <div className="container">
                    <div className="row">
                        <div className="col-lg-8">
                            <Route path={BaseUrl.HOME_URL} exact component={MainArticles} />
                            <Route path={BaseUrl.ARTICLE_DETAIL_URL} component={Article} />
                            <Route path={BaseUrl.LOGIN_URL} component={() => <Login setUserProfile={(profile) => this.setUserProfile(profile)} />} />
                            <Route path={BaseUrl.REGISTER_URL} component={() => <Register setUserProfile={(profile) => this.setUserProfile(profile)} />} />
                            <Route path={BaseUrl.MYPROFILE_URL} component={() => <MyProfile myProfile={this.state.userProfile} />} />
                            <Route path={BaseUrl.MYBLOGS_URL} component={() => <MyBlogs myProfile={this.state.userProfile} />} />
                            <Route path={BaseUrl.CATEGORYBLOGS_DETAIL_URL} render={(props) => <CategoryBlogs {...props} key={guid()}/>} />
                            <Route path={BaseUrl.SEARCHBLOGS_DETAIL_URL} render={(props) => <SearchBlogs {...props} key={guid()}/>} />
                            <Route path={BaseUrl.CREATE_BLOG_URL} component={() => <CreateBlog userProfile={this.state.userProfile} />} />
                            <Route path={BaseUrl.PREDICT_SPAM_URL} component={PredictSpamMail} />
                        </div>

                        <div className="col-md-4">
                            <Search />
                            <Category />
                        </div>
                    </div>

                </div>

                <footer className="py-5 bg-dark">
                    <div className="container">
                        <p className="m-0 text-center text-white">Copyright &copy; erickkkt 2018</p>
                    </div>
                </footer>

            </div>
        )
    }
}
