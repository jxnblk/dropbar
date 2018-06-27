
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
        }}
        match={(item, value) => item.value.includes(value)}>
        <Label>Choose a fruit</Label>
        <Input />
        <Menu>
          {items.map((item, i) => (
            <Item key={item.value} item={item}>
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

The element components in Dropbar can be styled with `className` or `style` props,
or with a CSS-in-JS library like [styled-components][] or [emotion][].

```jsx
// styled-components example
import React from 'react'
import styled from 'styled-components'
import {
  Dropbar,
  Label as DropLabel,
  Input as DropInput,
  Menu as DropMenu,
  Item as DropItem
} from 'dropbar'

const Relative = styled.div`
  position: relative;
`

const Label = styled(DropLabel)`
  display: block;
`

const Input = styled(DropInput)`
  display: block;
  width: 100%;
  font-size: 16px;
`

const Menu = styled(DropMenu)`
  position: absolute;
  top: 100%;
  left: 0;
  right: 0;
  margin-top: 4px;
  border-radius: 4px;
  box-shadow: 0 0 16px rgba(0, 0, 0, .125);
`

const Item = styled(DropItem)`
  display: flex;
  padding: 4px;

  &[data-highlighted] {
    background-color: #0cf;
  }

  &[data-selected] {
    font-weight: bold;
  }
`

export default ({
  label,
  items = [],
  onChange
}) =>
  <Dropbar onChange={onChange}>
    <Relative>
      <Label>{label}</Label>
      <Input />
      <Menu>
        {items.map(item => (
          <Item key={item.value} item={item}>
            {item.value}
          </Item>
        ))}
      </Menu>
    </Relative>
  </Dropbar>
```


## Rebass Dropbar

MIT License

[styled-components]: https://github.com/styled-components/styled-components
[emotion]: https://github.com/emotion-js/emotion
