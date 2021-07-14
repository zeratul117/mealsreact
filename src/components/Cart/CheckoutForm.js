import { TextField  } from '@material-ui/core';
import CustomButton from '../UI/CustomButton';
import { Formik, Form, useField } from 'formik';
import classes from './Cart.module.css';
import * as Yup from 'yup'


const MyTextField = ({...props}) => {
    const [field, meta] = useField(props);
    const errorText = meta.error && meta.touched ? meta.error : "";

    return (
        <div className={classes.fields}>
            <TextField {...props} {...field} helperText={errorText} error={!!errorText}/>
        </div>
    )
}

const FormSchema = Yup.object().shape({
    name: Yup.string()
    .min(2, 'Name is too short!')
    .max(50, 'Name is too long!')
    .required('Required'),
    
    email: Yup.string()
    .email('Invalid Email')
    .required('Required'),

    street: Yup.string()
    .required('Required'),

    postalCode: Yup.string()
    .min(4, 'Invalid Postal code')
    .max(10, 'Invalid Postal code')
    .required('Required')

});


const CheckoutForm = (props) => {
    return (
        <Formik
        initialValues={{ 
          name: '', 
          email: '', 
          street: '', 
          postalCode: '' }}
        validationSchema={FormSchema}
        onSubmit={( values, { setSubmitting, resetForm }) => {
          props.onSubmitForm(values);
          setSubmitting(false);
          resetForm();
        }}
        >
          {({ isSubmitting }) => (
            <Form>
                <MyTextField variant="outlined" label="Your Name" size="small" name="name" type="input" /> 
                <MyTextField variant="outlined" label="Email" size="small" name="email" type="email" />
                <MyTextField variant="outlined" label="Street" size="small" name="street" type="input" />
                <MyTextField variant="outlined" label="Postal Code" size="small" name="postalCode" type="input" />

              <div className={classes.actions}>
                <CustomButton buttonType="Positive" type="submit" color="primary" variant="contained" disabled={isSubmitting}>Submit</CustomButton>
                <CustomButton buttonType="Negative" variant="contained" color="secondary" onClick={() => {props.hideForm()}}>Cancel</CustomButton>
              </div>
            </Form>
          )}
        </Formik>
    );
}

export default CheckoutForm;