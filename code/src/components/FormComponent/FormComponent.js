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
	}

	componentWillMount() {

	}

	componentDidMount() {
	}

	componentWillReceiveProps(nextProps) {
	    // Set default form values (might be appropriate in a different method
	    this.props.setDefaultValues({
	      age: 33,
	      name: 'Sir Fluffalot',
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

	    // All good! Do something with fields.name.value and fields.age.value
	    console.log(formStatus, fields);
	  }

	render() {
			const {
      fields: { age, name },
      formSubmit,
    } = this.props;

		return (
			<div className="FormComponent__container">

				<div className="FormComponent__title"><p>Hello world</p></div>

				<div className="FormComponent__form">
					<div className="FormComponent__input">
						<div className="FormComponent__arabic" >

						</div>
						<div className="FormComponent__roman" >
							// input
						</div>
					</div>
				</div>
					<div className="FormComponent__buttons">
						<button className="FormComponent__submit">Submit</button>
						<button className="FormComponent__clear">Clear</button>
					</div>

					<div>
					      <form onSubmit={formSubmit(this.handleSubmit)}>
					        <div>
					          <input
					            placeholder="Name"
					            type="text"
					            value={name.value}
					            { ...name.events }
					          />
					          <ErrorText { ...name.failProps } />
					        </div>
					        <div>
					          <input
					            placeholder="Age"
					            type="text"
					            value={age.value}
					            { ...age.events }
					          />
					          <ErrorText { ...age.failProps } />
					        </div>
					        <div>
					          <button type="submit">Submit</button>
					        </div>
					      </form>
					    </div>
			</div>
		);
	}
}

const formousOptions = {
  fields: {
    name: {
      name: 'name',
      tests: [
        {
          critical: true,
          failProps: {
            errorText: 'Name is required.',
          },
          test(value) {
            return value !== '';
          },
        }
      ],
    },

    age: {
      name: 'age',
      tests: [
        {
          critical: true,
          failProps: {
            errorText: 'Age should be a number.',
          },
          test(value) {
            return /^\d*$/.test(value);
          },
        },
        {
          critical: false,
          failProps: {
            errorText: 'Are you sure you\'re that old? :o',
          },
          test(value) {
            return +value < 120;
          },
        },
      ],
    },
  },
};

FormComponent.defaultProps = {
};

export default Formous(formousOptions)(FormComponent)
//export default FormComponent;
