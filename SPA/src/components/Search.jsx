import * as React from "react";
import { Link, Redirect } from "react-router-dom";
import { BaseUrl } from './../base.url'

export class Search extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			search: ''
		}
	}

	handleTextChange = (event) => {
		this.setState({ search: event.target.value});
	}

	searchBlogs = (event) => {
        if (event.key === 'Enter') {

			var url = '#' + BaseUrl.SEARCHBLOGS_URL + "/" + this.state.search;
			window.location.href = url;
        }
    }

  render() {
    return (
      <div className="card my-4">
        <h5 className="card-header">Search</h5>
        <div className="card-body">
          <div className="input-group">
			<input type="text" className="form-control" placeholder="Search for..." 
					value={this.state.search ? this.state.search: ''}
										onChange={evt => this.handleTextChange(evt)} 
										onKeyPress={(event) => this.searchBlogs(event)}
										/>
            <span className="input-group-btn">
              {/* <button className="btn btn-secondary" type="button">Go!</button> */}
			  <Link className="btn btn-secondary" to={{pathname: BaseUrl.SEARCHBLOGS_URL + "/" + this.state.search, state: "desiredState"}}>Go!</Link>
            </span>
          </div>
        </div>
      </div>
    )
  }
}