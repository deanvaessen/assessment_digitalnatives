/*******************************
 * [_FormComponent.js]
 * Define the FormComponent code here
 ******************************/

/* eslint react/prop-types: 0 */

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
		return <div style={{color : '#f00' }}>
					{this.props.errorText}
				</div>;
	}
 }

 ErrorText.propTypes = {
	// errorText : React.PropTypes.string
	// Prop validation is already done through Formous
};

class FormComponent extends React.Component {
	constructor(props) {
		super(props);
		this.handleSubmit = this.handleSubmit.bind(this);
		this.handleKeyPress = this.handleKeyPress.bind(this);
		this.mutateComponent = this.mutateComponent.bind(this);
		this.shouldHideTranslationHeader = true;
	}

	componentWillMount() {
	}

	componentDidMount() {
	}

	componentWillReceiveProps(nextProps) {
			this.props.setDefaultValues({
				arabic : '',
				english : '',
				shouldHideTranslationHeader : true
			});
	}

	handleSubmit(formStatus, fields) {
		// Initial state
		let fieldState = this.props.fields;

		if (!formStatus.touched) {
			alert('Please fill out the form.');
			return;
		}

		if (!formStatus.valid) {
			alert('Please fill in a number');
			return;
		}

		if (this.props.fields.arabic.value.replace(/ /g, '') == '') {
			alert('Please fill in a number');
			return;
		}

		// No errors found, continue.


		// Mutate
		translateInput(fieldState, (result) => this.mutateComponent(result));
	}

	handleKeyPress(e) {
		if (e.key === 'Enter') {
			// Prevent enter key, Formous doesn't seem to like the enter key
			e.preventDefault();
		}
	}

	mutateComponent(payload){
		// Pass back into the view
		this.setState(this.props.fields.english = {
			value : payload.english.value,
			events : this.props.fields.english.events,
			valid : this.props.fields.english.valid
		});

		this.shouldHideTranslationHeader = false;
	}

	render() {

		/*eslint-disable */
		const {
			fields : { arabic, english },
			formSubmit
		} = this.props;
		/*eslint-enable */

		return (
		<div className="FormComponent__outerContainer">
			<div className="FormComponent__title"><h1>Translation, please</h1></div>
			<div className="FormComponent__innerContainer">

				<form onSubmit={formSubmit(this.handleSubmit)}>
					<div className="FormComponent__form">
						<div className="FormComponent__input">
							<div className="FormComponent__arabic" >
								<h5>Arabic numeral input:</h5>
								<input
									placeholder="Arabic numeral"
									type="text"
									value={arabic.value}
									onKeyPress={this.handleKeyPress}
									{ ...arabic.events }
								/>
								<ErrorText { ...arabic.failProps } />
							</div>
							<div className="FormComponent__english" >
								<h5 className={this.shouldHideTranslationHeader ? 'hidden' : ''}>
									Your translation:
								</h5>
								<p>{this.props.fields.english.value}</p>
							</div>
						</div>
					</div>
						<div className="FormComponent__buttons">
							<button className="FormComponent__submit" type="submit">Submit</button>
							<button className="FormComponent__clear" type="button" onClick={this.props.clearForm}>Clear</button>
						</div>
				</form>
			</div>
		</div>
		);
	}
};

FormComponent.propTypes = {
	// Prop validation is already done through Formous
};

const formousOptions = {
	fields : {
		arabic : {
			tests : [
				{
					critical : true,
					failProps : {
						errorText : 'Arabic should be a number'
					},
					test(value) {
						return /^\d*$/.test(value);
					}
				}
			]
		},
		english : {
			tests : [
				{
					critical : true,
					failProps : {
						errorText : 'English should be in letters!'
					},
					test(value) {
						return /^[a-zA-Z-]*$/.test(value);
					}
				},
				{
					critical : true,
					failProps : {
						errorText : 'English should be in letters!'
					},
					test(value) {
						return /^[a-zA-Z-]*$/.test(value);
					}
				}
			]
		}
	}
};

export default Formous(formousOptions)(FormComponent);
