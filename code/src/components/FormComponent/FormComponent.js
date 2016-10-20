/*******************************
 * [_FormComponent.js]
 * Define the FormComponent code here
 ******************************/
/*eslint-disable */

/**
* Dependencies
*/
import React from 'react';
import Formous from 'formous';
require('./FormComponent.scss');
import translateInput from './../../helpers/translateInput';


/**
 * Component
 */

 class ErrorText extends React.Component {
	 render() {
		 return <div style={{ color: '#f00' }}>
			 {this.props.errorText}
		 </div>
	 }
 }

class FormComponent extends React.Component {
	constructor(props) {
		super(props);
		this.handleSubmit = this.handleSubmit.bind(this);
		//this.translateInput = this.translateInput.bind(this);
		this.mutateComponent = this.mutateComponent.bind(this);
	}

	componentWillMount() {
	}

	componentDidMount() {
		console.log(this.props)
	}

	componentWillReceiveProps(nextProps) {
			this.props.setDefaultValues({
				arabic: '',
				english:  '',
			});
	}

	handleSubmit(formStatus, fields) {
		if (!formStatus.touched) {
			alert('Please fill out the form.');
			return;
		}

		if (!formStatus.valid) {
			alert('Please fill in a number');
			return;
		}

		// No errors found, continue.

		// Initial state
		let fieldState = this.props.fields;

		// Mutate
		translateInput(fieldState, (result) => this.mutateComponent(result));


	}

	mutateComponent(payload){
		console.log("FormComponent__mutateComponent: init payload:");

		// Pass back into the view
		this.setState(this.props.fields.english = {
			value : payload.english.value,
			events : this.props.fields.english.events,
			valid : this.props.fields.english.valid,
		});
	}

	render() {
			const {
			fields: { arabic, english },
			formSubmit,
		} = this.props;
		return (
			<div className="FormComponent__container">
				<div className="FormComponent__title"><h1>Translation, please</h1></div>

				 <form onSubmit={formSubmit(this.handleSubmit)}>
					<div className="FormComponent__form">
						<div className="FormComponent__input">
							<div className="FormComponent__arabic" >
								<input
									placeholder="Arabic numeral"
									type="text"
									value={arabic.value}
									{ ...arabic.events }
								/>
								<ErrorText { ...arabic.failProps } />
							</div>
							<div className="FormComponent__english" >
								<h5>Your translation:</h5> <p>{this.props.fields.english.value}</p>
							</div>
						</div>
					</div>
						<div className="FormComponent__buttons">
							<button className="FormComponent__submit" type="submit">Submit</button>
							<button className="FormComponent__clear" type="button" onClick={this.props.clearForm}>Clear</button>
						</div>
				</form>
			</div>
		);
	}
}

const formousOptions = {
	fields: {
		arabic: {
			tests: [
				{
					critical: true,
					failProps: {
						errorText: 'Arabic should be a number',
					},
					test(value) {
						return /^\d*$/.test(value);
					},
				},
			],
		},
		english: {
			tests: [
				{
					critical: true,
					failProps: {
						errorText: 'English should be in letters!',
					},
					test(value) {
						return /^[a-zA-Z-]*$/.test(value);
					},
				},
				{
					critical: true,
					failProps: {
						errorText: 'English should be in letters!',
					},
					test(value) {
						return /^[a-zA-Z-]*$/.test(value);
					},
				}
			],
		},
	},
};

export default Formous(formousOptions)(FormComponent)