
# Dropbar :bike:

Simple, accessible React autocomplete components built with Downshift

```sh
npm i dropbar
```

```jsx
// unstyled version
import React from 'react'
import {
  Dropbar,
  Label,
  Input,
  Menu,
  Item
} from 'dropbar'

const items = [
  {value: 'apple'},
  {value: 'pear'},
  {value: 'orange'},
  {value: 'grape'},
  {value: 'banana'},
]

export default class extends React.Component {
  state = {
    value: ''
  }

  render () {
    return (
      <Dropbar
        onChange={item => {
          this.setState({
            value: item.value
          })
        }}>
        <Label>Choose a fruit</Label>
        <Input />
        <Menu>
          {items.map((item, i) => (
            <Item
              key={item.value}
              item={item}
              index={i}>
              {item.value}
            </Item>
          ))}
        </Menu>
      </Dropbar>
    )
  }
}
```

## Styling Components

## Rebass Dropbar

MIT License
