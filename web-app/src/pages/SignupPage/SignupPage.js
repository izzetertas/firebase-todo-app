import styled from 'styled-components'
import React, { useState, useEffect } from 'react'
import { useFormik } from 'formik'
import * as yup from 'yup'
import to from 'await-to-js'
import { useHistory } from 'react-router-dom'

import Form from 'components/Form'
import Input from 'components/Input'
import Button from 'components/Button'
import NavLink from 'components/NavLink'
import Label from 'components/Label'
import Text from 'components/Text'
import Title from 'components/Title'

import userService from 'services/userService'
import validateEmailAddress from 'utils/validateEmailAddress'

const SignupPage = () => {
  const [loading, setLoading] = useState(false)
  const history = useHistory()

  const formik = useFormik({
    initialValues: {
      firstName: '',
      lastName: '',
      email: '',
    },
    validationSchema: yup.object({
      firstName: yup.string()
        .max(15, 'Must be 15 characters or less')
        .required('First name is required'),
      lastName: yup.string()
        .max(20, 'Must be 20 characters or less')
        .required('Last name is required'),
      email: yup.string()
        .email('Invalid email address')
        .required('Email is required'),
      password: yup.string()
        .min(6, 'Password must be 6 characters')
        .max(6, 'Password must be 6 characters')
        .required('A password is required'),
    }),
    onSubmit: async (data, { setErrors }) =>  {
      setLoading(true)
      const [err, token] = await to(userService.signup(data))
      setLoading(false)
      if(err) {
        return setErrors(err)
      }
      history.push('/login')
    },
  })

  return (
    <div>
      <Title>Signup Page</Title>
      <Form onSubmit={formik.handleSubmit}>
        <Label>
          Name *
          {formik.touched.firstName && formik.errors.firstName &&
            <Text color="red">{formik.errors.firstName}</Text>
          }
          <Input
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.firstName}
            border={
              formik.touched.firstName && formik.errors.firstName && "1px solid red"
            }
            name="firstName"
          />
        </Label>
        <Label>
          Last name *
          {formik.touched.lastName && formik.errors.lastName &&
            <Text color="red">{formik.errors.lastName}</Text>
          }
          <Input
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.lastName}
            border={
              formik.touched.lastName && formik.errors.lastName && '1px solid red'
            }
            name="lastName"
          />
        </Label>
        <Label>
          Email *
          {formik.touched.email && formik.errors.email &&
            <Text color="red">{formik.errors.email}</Text>
          }
          <Input
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.email}
            border={formik.touched.email && formik.errors.email && '1px solid red'}
            type="text"
            name="email"
          />
        </Label>
        <Label>
          Password *
          {formik.touched.password &&
            formik.errors.password && <Text color="red">{formik.errors.password}</Text>}
          <Input
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.password}
            border={
              formik.touched.password && formik.errors.password && "1px solid red"
            }
            type="password"
            name="password"
          />
        </Label>
        {/* <Text color="red">{errorMessage}</Text> */}
        <Button
          type='submit'
          disabled={loading}
        >
          {(loading) ? 'loading...' : 'Sign up'}
        </Button>
      </Form>
      <NavLink href='login'>
        Do you have an account? Sign in
      </NavLink>
    </div>
  )
}

export default SignupPage
