import React from 'react'
import styled from 'styled-components'
import PulseLoader from 'react-spinners/PulseLoader'

const LoadingDiv = styled.div`
  display: flex;
  justify-content: center;
  margin: 96px;
`
const Loading = () => (
  <LoadingDiv>
    <PulseLoader size={60} color={'#36D7B7'} loading />
  </LoadingDiv>
)

export default Loading

