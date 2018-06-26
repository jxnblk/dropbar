import React from 'react'
import { connect } from 'refunk'
import styled from 'styled-components'
import {
  Provider,
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
    backgroundColor: '#ff8'
  }
})

const App = connect(props => (
  <div>
    <h1>down context</h1>
    <pre>{props.value || 'none'}</pre>
    <Provider
      itemToString={item => item ? item.value : ''}
      onInputValueChange={value => {
        props.update({ value })
      }}
      onChange={item => {
        props.update({ value: item.value })
      }}>
      <Relative>
        <Label>Fruit</Label>
        <Input />
        <Dropdown>
          {props.items
            .filter(item => item.value.includes(props.value))
            .map((item, i) => (
            <MenuItem
              key={item.value}
              item={item}
              index={i}>
              {item.value}
            </MenuItem>
          ))}
        </Dropdown>
      </Relative>
    </Provider>
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
