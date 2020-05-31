import styled from 'styled-components'
import React, {Component} from 'react'
import { Formik } from 'formik'
import { useDispatch, useSelector } from 'react-redux'

import Form from 'components/Form'
import Input from 'components/Input'
import Button from 'components/Button'
import NavLink from 'components/NavLink'
import Label from 'components/Label'
import Text from 'components/Text'
import Title from 'components/Title'

import { loginRequest } from './actions'

const LoginPage = () => {
  const dispatch = useDispatch()
  const user = useSelector(state => state.user)
  console.log('Logiun page user', user);
  return (
    <div>
      <Title>Login Page</Title>
      <Formik
        initialValues={{ email: '', password: '' }}
        validate={values => {
          let errors = {};
          let regexPattern = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
          if (!values.email) {
            errors.email = 'Email is required'
          } else if (!regexPattern.test(values.email)) {
            errors.email = 'Invalid email address'
          }

          if (!values.password) {
            errors.password = 'A password is required'
          } else if (values.password.length < 6) {
            errors.password = 'Password must be 6 characters'
          }
          return errors;
        }}
        onSubmit={({ email, password }) => {
          dispatch(loginRequest(email, password))
        }}
        render={({
          touched,
          errors,
          values,
          handleChange,
          handleBlur,
          handleSubmit,
        }) => (
          <Form onSubmit={handleSubmit}>
            <Label>
              Email *
              {touched.email &&
                errors.email && <Text color="red">{errors.email}</Text>}
              <Input
                onChange={handleChange}
                onBlur={handleBlur}
                value={values.email}
                border={touched.email && errors.email && "1px solid red"}
                type="text"
                name="email"
              />
            </Label>
            <Label>
              Password *
              {touched.password &&
                errors.password && <Text color="red">{errors.password}</Text>}
              <Input
                onChange={handleChange}
                onBlur={handleBlur}
                value={values.password}
                border={
                  touched.password && errors.password && "1px solid red"
                }
                type="password"
                name="password"
              />
            </Label>
            <Button type="submit">Sign in</Button>
          </Form>
        )}
      />
      <NavLink href='signup'>
        Don't have an account? Sign Up
      </NavLink>
    </div>
  )
}

export default LoginPage
