import React from 'react'
import { connect } from 'refunk'
import styled from 'styled-components'
import us from 'us'
import {
  Dropbar,
  Label,
  Input,
  Menu,
  Item,
} from '../src'

const states = us.STATES

const MenuItem = styled(Item)([], {
  display: 'flex',
  padding: '8px',
  '&[data-selected]': {
    fontWeight: 'bold',
  },
  '&[data-highlighted]': {
    backgroundColor: '#0cf'
  }
})

const App = connect(props => (
  <div>
    <h1>Dropbar</h1>
    <pre>{props.value && props.value.name || 'none'}</pre>
    <Dropbar
      itemToString={state => state ? state.name : ''}
      match={(state, value) => state.name.toLowerCase().includes(value)}
      onChange={state => {
        props.update({ value: state })
      }}>
      <Label>State</Label>
      <Input />
      <Menu>
        {props.states.map(state => (
          <MenuItem key={state.name} item={state}>
            {state.name}
          </MenuItem>
        ))}
      </Menu>
    </Dropbar>
  </div>
))

App.defaultProps = {
  states,
  value: ''
}

export default App
