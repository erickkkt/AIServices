import * as React from 'react';
import { WithContext as ReactTags } from 'react-tag-input';
import { apiCreateArticle, apiUploadPhoto, apiGetCategories } from './../apiService'
import { Redirect } from 'react-router-dom'
import { BaseUrl } from './../base.url'
import { MyEditor} from './MyEditor'

export class CreateBlog extends React.Component{
	constructor(props) {
		super(props);

		this.state = {
			article: {},
			errorMessage: '',
			userProfile: this.props.userProfile,
			redirectToMyBlogs: false,
			file: undefined,
			tags: [],
			suggestions: [],
			fullContent:''
		}

		this.handleDelete = this.handleDelete.bind(this);
		this.handleAddition = this.handleAddition.bind(this);
		this.handleDrag = this.handleDrag.bind(this);
    	
	}

	loadCategories = () => {
		apiGetCategories((response) => {
			if (response.target.status == 200) {
				let data = JSON.parse(response.target.responseText);
				const suggestions = data.map((category) => {
					return {
						id: category.name,
						text: category.name
					}
				})
				this.setState({ suggestions: suggestions })
			}
		},
			(errors) => {
				this.setState({ suggestions: [] });
			})
	}

	componentWillMount() {
		this.loadCategories();
	}

	handleImageChange = (event) => {
		event.preventDefault();
		let reader = new FileReader();
		let file = event.target.files[0];

		reader.onloadend = () => {
			this.setState({ file: file });
			this.uploadPhoto();
		}
		reader.readAsDataURL(file)
	}


	uploadPhoto() {
		apiUploadPhoto(this.state.file, (response) => {
			if (response.target.status == 200) {
				let data = JSON.parse(response.target.responseText);
				if (data.success) {
					this.state.article.Image = data.data;
					this.setState({ article: this.state.article });
				}
				else {
					this.setState({ redirectToMyBlogs: false, errorMessage: data.errorMessage });
				}
			}
		},
			(errors) => {
				this.setState({ redirectToMyBlogs: false, errorMessage: 'Error when upload image' });
			})
	}

	handleTextChange = (event, name) => {

		switch (name) {
			case 'title':
				this.state.article.Title = event.target.value;
				break;
			case 'fullcontent':
				this.state.article.FullContent = event.target.value;
				break;
		}
		this.setState({ article: this.state.article });
	}

	createBlog = (event) => {
		event.preventDefault();
		this.setState({ errorMessage: '' });

		var article = this.state.article;
		article.CreatedBy = this.state.userProfile ? this.state.userProfile.email : '';
		let tags = '';
		this.state.tags && this.state.tags.forEach((element) => {
			tags += (element.id + ',');
		});

		if (tags.length > 1)
			tags = tags.substring(0, tags.length - 1);

		article.Tags = tags;
		article.FullContent = this.state.fullContent;

		apiCreateArticle(article, (response) => {
			if (response.target.status == 200) {
				let data = JSON.parse(response.target.responseText);
				if (data.success) {
					this.setState({ redirectToMyBlogs: true });
				}
				else {
					this.setState({ redirectToMyBlogs: false, errorMessage: data.errorMessage });
				}
			}
			else {
				this.setState({ redirectToMyBlogs: false, errorMessage: "Error when write new blog from server" });
			}
		},
			(errors) => {
				this.setState({ redirectToMyBlogs: false, errorMessage: 'Error when write new blog account!' });
			})

	}


	handleDelete(i) {
		const { tags } = this.state;
		this.setState({
			tags: tags.filter((tag, index) => index !== i),
		});
	}

	handleAddition(tag) {
		if (this.state.tags) {
			this.state.tags.push(tag);
		}
		this.setState({ tags: this.state.tags });
	}

	handleDrag(tag, currPos, newPos) {
		const tags = [...this.state.tags];
		const newTags = tags.slice();

		newTags.splice(currPos, 1);
		newTags.splice(newPos, 0, tag);

		// re-render
		this.setState({ tags: newTags });
	}

	setContent = (content) => this.setState({fullContent:content});

	render() {

		if (this.props.userProfile == undefined || this.props.userProfile.email == undefined) {
			return <Redirect to={BaseUrl.HOME_URL} />;
		}

		if (this.state.redirectToMyBlogs) {
			return <Redirect to={BaseUrl.MYBLOGS_URL} />;
		}

		return (
			<div>
				<h1 className="my-4">Write new blog
		</h1>
				<div className="panel-body" >
					<form className="form-horizontal" role="form" encType="multipart/form-data">
						{
							(() => {
								if (this.state.errorMessage != '') {
									return (
										<div className="alert alert-danger">
											<p>{this.state.errorMessage}</p>
											<span></span>
										</div>
									)
								}
							})()
						}

						<div className="form-group">
							<div className="row">
								<label className="col-md-3 control-label">Title</label>
								<div className="col-md-9">
									<input type="text"
										value={this.state.article ? this.state.article.Title : ""}
										onChange={evt => this.handleTextChange(evt, 'title')}
										className="form-control" placeholder="Title" />
								</div>
							</div>
						</div>

						<div className="form-group">
							<div className="row">
								<label className="col-md-3 control-label">Image</label>
								<div className="col-md-6">
									<input type="file" accept="image/*"
										onChange={this.handleImageChange}
										className="form-control" placeholder="Image" />

								</div>
								<div className="col-md-3">
									{this.state.article.Image ?
										(
											<img width="100%" src={this.state.article.Image} alt="icon" />
										) : (
											<img width="100%" src="images/img_not_available.png" alt="icon" />
										)
									}
								</div>

							</div>
						</div>

						<div className="form-group">
							<div className="row">
								<label className="col-md-3 control-label">Full content</label>
								
								<div className="col-md-9">
									<MyEditor  setContent={(content) => this.setContent(content)}/>     
								</div>
							</div>
						</div>

						<div className="form-group">
							<div className="row">
								<label className="col-md-3 control-label">Tags</label>
								<div className="col-md-9">
									<div>
										<ReactTags
											tags={this.state.tags}
											suggestions={this.state.suggestions}
											delimiters={delimiters}
											handleDelete={this.handleDelete}
											handleAddition={this.handleAddition}
											handleDrag={this.handleDrag}
										/>
									</div>
								</div>
							</div>
						</div>

						<div className="form-group">
							<div className="col-md-offset-3 col-md-9">
								<button className="btn btn-info" type="button"
									onClick={(e) => this.createBlog(e)}
								><i className="icon-hand-right"></i> Write new blog</button>
							</div>
						</div>
					</form>
				</div>
			</div>
		)
	}
}