/*******************************
 * [_FormComponent.js]
 * Define the root component code here
 ******************************/
/*eslint-disable */
/**
* Dependencies
*/
import React from 'react';
import Formous from 'formous';
require('./FormComponent.scss');


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
		this.translateInput = this.translateInput.bind(this);
	}

	componentWillMount() {
	}

	componentDidMount() {
		console.log(this.props)
	}

	componentWillReceiveProps(nextProps) {
			// Set default form values (might be appropriate in a different method
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
			alert('Please address the errors in the form.');
			return;
		}

		if (this.props.fields.arabic.value != '' && this.props.fields.english.value != '') {
			console.log(this.props.fields)
			alert('You filled in both elements, please clear one.');
			return;
		}

		// All good! Do something with fields.name.value and fields.arabic.value


		// Initial state
		let fieldState = this.props.fields;

		// Mutate
		fieldState.arabic.value = 'test';
		fieldState.english.value = 'test';

		// Pass back in
		this.setState(this.props.fields.arabic = {
			value : fieldState.arabic.value,
			events : fieldState.arabic.events,
			valid : fieldState.arabic.valid,
		});

		this.setState(this.props.fields.english = {
			value : fieldState.english.value,
			events : fieldState.english.events,
			valid : fieldState.english.valid,
		});
	}

	translateInput(input, cb){

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
								<input
									placeholder="English"
									type="text"
									value={english.value}
									{ ...english.events }
								/>
								<ErrorText { ...english.failProps } />
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
				}
			],
		},

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
/*				{
					critical: false,
					failProps: {
						errorText: 'Are you sure you\'re that old? :o',
					},
					test(value) {
						return +value < 120;
					},
				},*/
			],
		},
	},
};

FormComponent.defaultProps = {
};

export default Formous(formousOptions)(FormComponent)
//export default FormComponent;
