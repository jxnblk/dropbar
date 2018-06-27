import React from 'react'
import { connect } from 'refunk'
import styled from 'styled-components'
import {
  Dropbar,
  Label,
  Input,
  Menu,
  Item,
} from '../src'

const Relative = styled.div([], {
  position: 'relative'
})

const Dropdown = styled(Menu)([], {
  position: 'absolute',
  top: '100%',
  left: 0,
  right: 0,
  marginTop: '4px',
  boxShadow: '0 0 16px rgba(0, 0, 0, .25)'
})

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
    <h1>down context</h1>
    <pre>{props.value || 'none'}</pre>
    <Dropbar
      itemToString={item => item ? item.value : ''}
      onChange={item => {
        props.update({ value: item.value })
      }}>
      <Relative>
        <Label>Fruit</Label>
        <Input />
        <Dropdown match={(item, value) => item.value.includes(value)}>
          {props.items.map(item => (
            <MenuItem key={item.value} item={item}>
              {item.value}
            </MenuItem>
          ))}
        </Dropdown>
      </Relative>
    </Dropbar>
  </div>
))

App.defaultProps = {
  items: [
    {value: 'apple'},
    {value: 'pear'},
    {value: 'orange'},
    {value: 'grape'},
    {value: 'banana'},
  ],
  value: ''
}

export default App
