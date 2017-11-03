import React, {Component} from 'react';
import ReactDOM from 'react-dom';
import Repo from './Repo.jsx';

export default class RepoList extends Component{
	render(){
		return(
				<div>
					<ul className="list-group">
					{this.props.userRepos.map(repo =>{
					//	console.log(repo)
						return <Repo
							repo={repo} 
							key={repo.id}
							{...this.props} />
						})}
					</ul>
				</div>
			)
	}
}