import React, { useEffect } from 'react'
import { useFormik } from 'formik'
import * as yup from 'yup'

import { useDispatch, useSelector } from 'react-redux'
import { useHistory } from 'react-router-dom'

import { FormattedMessage } from 'react-intl'

import Form from 'components/Form'
import Input from 'components/Input'
import Button from 'components/Button'
import NavLink from 'components/NavLink'
import Label from 'components/Label'
import Text from 'components/Text'
import Title from 'components/Title'

import { loginRequest } from './actions'
import messages from './messages'

const LoginPage = () => {
  const dispatch = useDispatch()
  const { loggedIn, loading, errorMessage } = useSelector(state => state.user)
  const history = useHistory()

  useEffect(() => {
    if(loggedIn) {
      history.push('todos')
    }
  }, [loggedIn])

  const formik = useFormik({
    initialValues: { email: '', password: '' },
    validationSchema: yup.object({
      email: yup.string()
        .email('Invalid email address')
        .required('Email is required'),
      password: yup.string()
        .min(6, 'Password must be min 6 characters')
        .max(16, 'Password must be max 16 characters')
        .required('A password is required'),
    }),
    onSubmit: async (data, { setErrors }) =>  {
      const { email, password } = data
      dispatch(loginRequest(email, password))
    },
  })

  return (
    <div>
      <Title>
        <FormattedMessage {...messages.header} />
      </Title>
      <Form onSubmit={formik.handleSubmit}>
        <Label>
          <FormattedMessage {...messages.email} />
          {formik.touched.email && formik.errors.email &&
            <Text color='red'>{formik.errors.email}</Text>
          }
          <Input
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.email}
            border={formik.touched.email && formik.errors.email && '1px solid red'}
            type='text'
            name='email'
          />
        </Label>
        <Label>
          <FormattedMessage {...messages.password} />
          {formik.touched.password && formik.errors.password &&
            <Text color='red'>{formik.errors.password}</Text>
          }
          <Input
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.password}
            border={
              formik.touched.password && formik.errors.password && '1px solid red'
            }
            type='password'
            name='password'
          />
        </Label>
        <Text color='red'>{errorMessage}</Text>
        <Button
          type='submit'
          disabled={loading}
        >
          {(loading &&  !errorMessage) ? 
          <FormattedMessage {...messages.buttonLoading} />
          : 
          <FormattedMessage {...messages.buttonText} />}
        </Button>
      </Form>
      <NavLink href='signup'>
        <FormattedMessage {...messages.navLink} />
      </NavLink>
    </div>
  )
}

export default LoginPage
