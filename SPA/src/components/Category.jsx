import * as React from 'react';
import { Link } from "react-router-dom";
import { apiGetCategories } from '../apiService'
import { BaseUrl } from './../base.url'


export class Category extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			categories: []
		}
	}

	loadCategories = () => {
		apiGetCategories((response) => {
			if (response.target.status == 200) {
				let data = JSON.parse(response.target.responseText);
				this.setState({ categories: data })
			}
		},
			(errors) => {
				this.setState({ categories: [] });
			})
	}

	componentWillMount() {
		this.loadCategories();
	}

	renderListCollection = (categories) => {
		let rows = [];
		for (var i = 0; i < categories.length; i++) {
			let name = categories[i].name;
			rows.push(
				<li key={i}>
				 <Link to={{pathname: BaseUrl.CATEGORYBLOGS_URL + "/" + name, state: "desiredState"}}>#{name}</Link>
				</li>
			);
		}
		return rows;
	}

	render() {
		let firstCollection = [];
		let secondCollection = [];
		for (var i = 0; i < this.state.categories.length; i++) {
			if (i % 2 == 0) {
				firstCollection.push(this.state.categories[i]);
			} else {
				secondCollection.push(this.state.categories[i]);
			}
		}
		return (
			<div className="card my-4">
				<h5 className="card-header">Categories</h5>
				<div className="card-body">
					<div className="row">
						<div className="col-lg-6">
							<ul className="list-unstyled mb-0">
								{
									this.renderListCollection(firstCollection)
								}
							</ul>
						</div>
						<div className="col-lg-6">
							<ul className="list-unstyled mb-0">
								{
									this.renderListCollection(secondCollection)
								}
							</ul>
						</div>
					</div>
				</div>
			</div>
		)
	}
}