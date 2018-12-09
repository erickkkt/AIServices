import * as React from 'react'
import { ArticleSummary } from './ArticleSummary';
import { apiGetArticles, apiGetArticlesPaging } from '../apiService';

export class MainArticles extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            articles: [],
            pageIndex: 1
        }
    }

    loadArticles = (page) => {
        apiGetArticlesPaging(page, (response) => {
            if (response.target.status == 200) {
                let data = JSON.parse(response.target.responseText);
                this.setState({ articles: data })
            }
        },
            (errors) => {
                this.setState({ articles: [] });
            })
    }

    componentWillMount() {
        this.loadArticles(1);
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

    render() {
        return (
            <div>
                <h1 className="my-4">Information technologies
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