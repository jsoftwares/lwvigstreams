import { Component } from "react";
import { Field, reduxForm } from 'redux-form';
import { connect } from 'react-redux';
import { createStream } from '../../actions';


class StreamCreate extends Component {

    renderError(meta) {
        if (meta.touched && meta.error) {
            return (
                <div className="ui error message">
                    <p className="header">{meta.error}</p>
                </div>
            );
        }
    }

    // in order to use this inside this fn due to the context of THIS in class, we convert it to an arror fn
    renderInput = ({input, label, meta}) => {
        // return <input value={formProps.input.value} onChange={formProps.input.onChange} />
        const className = `field ${meta.error && meta.touched ? 'error' : ''}`;
        return (
            <div className={className}>
                <label>{label}</label>
                <input {...input} autoComplete="off" />
                { this.renderError(meta) }
            </div>
        );
    }

    onSubmit = (formValues) => {
        // console.log(formValues);
        this.props.createStream(formValues);
    }

    render() {
        return (
            <form onSubmit={this.props.handleSubmit(this.onSubmit)} className="ui form error">
                <Field name="title" component={this.renderInput} label="Enter Title" />
                <Field name="description" component={this.renderInput} label="Enter Description" />
                <button className="ui button primary">Submit</button>
            </form>
        );
    }
};

/**This function is used to validate form field values. It passed an argument that contains all the form field
 * then we write check for these field & append a key-value (fieldName-errorMessage) pair to an errors object 
 * we define. We then return errors object from d form. if d errors object is empty, Redux-Form considers our form
 * validation to be successful else it goes through errors, & for each key, it compares it to the form field names
 * then, adds an error key to d META props of that field. We then receive META as a prop in our form element and 
 * use it to display each error below each field that has a validation error.
 * validate is passed to reduxForm() as a property. For d error message to show, we need to add a class 'error' to
 * our form bcos sentic ui automatically hides elements with a class of 'error'. We can also add 'error' class to
 * <div> housing our input element & this will cause it & d label to be highlighted in red when there is an error
 */
const validate = formValues => {
    const errors = {};

    if (!formValues.title) {
        errors.title = 'You must enter a title';
    }
    if (!formValues.description) {
        errors.description = 'You must enter a description';
    }

    return errors;
}

// export default connect()(reduxForm({ form: 'streamCreate', validate })(StreamCreate));
const formWrapped = reduxForm({ form: 'streamCreate', validate})(StreamCreate)
export default connect(null, { createStream})(formWrapped);
/**REDUX-FORM() gives us alot of props that we can now use to manipulate our form (get values from d store to d 
 * form and from d form back to the redux store). The 'form' property we passed to reduxForm() is used to give d 
 * form in this component a name. 'validate' property is used to track errors on each form field, it has a value
 * of d our validate fn. The link btw of form & this errors is  */