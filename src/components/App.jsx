import React, {Component} from 'react';
import ReactDOM from 'react-dom';
import Profile from './github/Profile.jsx';
import Search from './github/Search.jsx';
 export default class App extends Component{
 	constructor(props){
 		super(props);
 		this.state = {
 			username : "harpreet-28",
 			userData: [],
 			userRepos: [],
 			perPage: 70
 		}
 	}

 	//get user data from github
 	getUserData(){
 		$.ajax({
 			url: 'https://api.github.com/users/'+this.state.username+'?client_id='+this.props.clientId+'&client_secret='+this.props.clientSecret,
 			dataType: "json",
 			cache: false,
 			success: function(data){
 				//setting the userData state to data fetched with ajax call if we have succeeded to make the call.
 				this.setState({userData: data})
 				console.log(data);
 			}.bind(this),
 			error: function(xhr, status, err){
 				//setting userData state to null if there's an error.
 				this.setState({userData: null})
 				alert(err)
 			}.bind(this)
 			});
 	}

 	//get user repositories from github in a list format
 	getUserRepos(){
 		$.ajax({
 			url: 'https://api.github.com/users/'+this.state.username+'/repos?per_page='+this.state.perPage+'&client_id='+this.props.clientId+'&client_secret='+this.props.clientSecret+'$sort=created',
 			dataType: "json",
 			cache: false,
 			success: function(data){
 				//setting the userData state to data fetched with ajax call if we have succeeded to make the call.
 				this.setState({userRepos: data})
 				console.log(data);
 			}.bind(this),
 			error: function(xhr, status, err){
 				//setting userData state to null if there's an error.
 				this.setState({userData: null})
 				alert(err)
 			}.bind(this)
 			});
 	}

 	handleFormSubmit(username){
 		//alert(username)
 		this.setState({username: username}, function(){
 			this.getUserData();
 			this.getUserRepos();
 			});
 	}

 	componentDidMount(){
 		this.getUserData();
 		this.getUserRepos();
 	}
render(){
	return(
			<div>
				<Search onFormSubmit= {this.handleFormSubmit.bind(this)} />
				<Profile {...this.state} />
			</div>
		)
	}
}

App.propTypes = {
	clientId: React.PropTypes.string,
	clientSecret: React.PropTypes.string
};
App.defaultProps = {
	clientId: '6896045088eebaf7403e',
	clientSecret: 'deb1f7e850edcce0105374fdab86dc3021721703'
}

