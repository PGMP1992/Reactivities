import { ErrorMessage, Formik } from "formik";
import { Form } from "react-router-dom";
import MyTextInput from "../../app/common/form/MyTextInput";
import { Button, Header, Label } from "semantic-ui-react";
import { observer } from "mobx-react-lite";
import {useStore} from '../../app/stores/store';

export default observer(function LoginForm () {
    const {userStore} = useStore();

    return (
        <Formik 
            initialValues={{email: '', password: '', error: null}}
            onSubmit={(values, {setErrors}) => userStore.login(values).catch(
                () => setErrors({error: 'Invalid Email or Password'}))}
        >
            {({ handleSubmit, isSubmitting, errors}) => (
                <Form className="ui form"
                    onSubmit={handleSubmit} autoComplete="off">
                        <Header as='h2' content= 'Login to Reactivities' color='teal' textAlign="center" />
                        <MyTextInput placeholder="Email" name='email' />
                        <MyTextInput placeholder="Password" name='password' type="password" />
                        <ErrorMessage 
                            name= "error" render={() => 
                            <Label style={{marginTop:10}} basic color="red" content={errors.error} />} 
                        />
                        <Button loading={isSubmitting} positive content="Login" type="submit" fluid />
                </Form>

            )}
        </Formik>
    )
})