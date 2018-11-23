import React from 'react';
import Collapsible from 'react-collapsible';
import ReactDOM from 'react-dom';
import './style.css'

const API = 'https://www.hatchways.io/api/assessment/students';

class Search extends React.Component {
	doSearch(event) {
		this.props.searchQuery(event.target.value);
	} 

	render() {
		return (
			<div className="container">
				<div className="input-field">
					<label>Search </label>
					<input type="text" onKeyUp={this.doSearch.bind(this)}/>
				</div>
			</div>
		)
	}
}

class App extends React.Component {
	constructor() {
		super();

		this.state = {
			students: [],
			allStudents: [],
			displayGrades: false
		};
	}

	searchQuery(query) {
		let results = this.state.allStudents.filter((student) => {
			return student.firstName.includes(query) ||
			student.lastName.includes(query)
		});
		this.setState({students: results});
	}

	displayGrades = () => {
		this.setState({
			displayGrades: !this.state.displayGrades
		})
	}

	componentDidMount() {
		fetch(API)
			.then(response => response.json())
			.then(data => this.setState({students: data.students,
				allStudents: data.students}));
	}

	render() {
		const {students} = this.state;

		return (
			<div>
				<Search searchQuery = {this.searchQuery.bind(this)}/>
				{students.map(student =>
					<div>
						<div className="container">
							<div className="leftSide">
								<img className="picture" src={student.pic} alt="Profile"/>
							</div>
							<div className="rightSide">
								<h2 className="">{student.firstName} {student.lastName}</h2>
								Email: {student.email}<br/>
								Company: {student.company}<br/>
								Skill: {student.skill}<br/>
								Average: {student.grades.map(Number).reduce(function(p, c) {
									return p + c;
									}) / student.grades.length + "%"
								}
									<Collapsible trigger="+ Click to see all grades" className="expandLink">
									<div>
									{student.grades.map(grade =>
									<p>{grade}</p>
									)}
									</div>
									</Collapsible>
								<hr/>
							</div>
						</div>
					</div>	
				)}
			</div>
		);
	}
}

ReactDOM.render (
	<App />,
	document.getElementById('root')
);