import React from 'react'
import * as DB from './index'
import * as Rebass from 'rebass'
import {
  Box,
  Flex,
  Relative,
  Absolute,
  Label as RebassLabel,
  Input as RebassInput,
} from 'rebass'
import styled from 'styled-components'
import { themeGet } from 'styled-system'

const Shadow = styled(Box)([], props => ({
  maxHeight: '512px',
  overflowY: 'auto',
  WebkitOverflowScrolling: 'touch',
  borderRadius: '2px',
  boxShadow: `0 0 32px ${themeGet('colors.darken')(props)}`
}))

export const Dropbar = props =>
  <Relative>
    <DB.Dropbar {...props} />
  </Relative>

export const Label = props =>
  <RebassLabel
    {...props}
    is={DB.Label}
  />

export const Input = props =>
  <RebassInput
    {...props}
    is={DB.Input}
  />

export const Menu = props =>
  <Absolute
    top='100%'
    left={0}
    right={0}
    mt={1}
  >
    <Shadow
      bg='white'
      {...props}
      is={DB.Menu}
    />
  </Absolute>

export const Item = styled(props =>
  <Flex
    px={1}
    py={2}
    {...props}
    is={DB.Item}
  />)([], {
    userSelect: 'none',
    cursor: 'pointer',
    '&[data-highlighted]': {
      backgroundColor: 'cyan'
    },
    '&[data-selected]': {
      fontWeight: 'bold'
    },
  })
