import * as React from 'react'
import { ArticleSummary } from './ArticleSummary';
import { apiGetArticlesByUser, apiGetArticlesByUserPaging } from '../apiService';
import { Redirect } from 'react-router-dom';
import { BaseUrl } from './../base.url'

export class MyBlogs extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            articles: [],
            pageIndex: 1
        }
    }

    loadArticles = (page) => {
        let email = this.props.myProfile ? this.props.myProfile.email : '';
        let userModel = { "Email": email };

        apiGetArticlesByUserPaging(page, userModel, (response) => {
            if (response.target.status == 200) {
                let data = JSON.parse(response.target.responseText);
                this.setState({ articles: data })
            }
        },
            (errors) => {
                this.setState({ articles: [] });
            })
    }

    loadOlder = (e) => {
        e.preventDefault();
        let newState = { ...this.state };
        let pageIndex = newState.pageIndex + 1;

        this.loadArticles(pageIndex);
        this.setState(newState)
    }

    loadNewer = (e) => {
        e.preventDefault();
        let newState = { ...this.state };
        let pageIndex = newState.pageIndex > 1 ? newState.pageIndex - 1 : 1;

        this.loadArticles(pageIndex);
        this.setState(newState)
    }

    componentDidMount() {
        this.loadArticles(1);
    }

    render() {
        if (this.props.myProfile == undefined || this.props.myProfile.email == undefined) {
            return <Redirect to={BaseUrl.HOME_URL} />;
        }

        return (
            <div>
                <h1 className="my-4">My blogs
                </h1>

                {this.state.articles && this.state.articles.map((article, i) => {
                    return (
                        <div key={i}>
                            <ArticleSummary article={article} key={article.articleId} />
                        </div>
                    )
                })}

                <ul className="pagination justify-content-center mb-4">
                    <li className="page-item">
                        <a className="page-link" onClick={(e) => { this.loadOlder(e) }}>&larr; Older</a>
                    </li>
                    <li className="page-item">
                        <a className="page-link" onClick={(e) => { this.loadNewer(e) }}>Newer &rarr;</a>
                    </li>
                </ul>
            </div>
        )
    }
}