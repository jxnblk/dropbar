
# Dropbar :bike:

Simple, accessible React autocomplete components built with [Downshift][]

:warning: **This is a beta version and the API is unstable. Use with caution**

- Easy to style components
- Smart defaults on top of [Downshift][]
- Simplified component API
- Automatic toggling of the dropdown menu
- Uses React [context][]
- Rebass version

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

The `Dropbar` component accepts all props that [Downshift][] accepts, in addition to:

- `match` (function) filter the children of the `Menu` component based on the `item` prop

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

To use a version with default styles from [Rebass][], import `dropbar/rebass`
and ensure [styled-components][] and [Rebass][] are installed.

```sh
npm i rebass styled-components
```

```jsx
import {
  Dropbar,
  Label,
  Input,
  Menu,
  Item
} from 'dropbar/rebass'
```

## API

### Dropbar

Root context provider component that wraps the Downshift component.
Accepts all props for the Downshift component, plus

- `match` (function) filters the direct children of the `Menu` component based on the `item` prop

#### `match`

```js
match: (item: any, value: string) => boolean
```

The `match` props accepts a function that receives two arguments:

- `item` (any) the item prop from a direct child of the `Menu` component
- `value` (string) the `inputValue` from Downshift

### Label

Renders a `<label>` element with Downshift's `getLabelProps` method automatically added.

### Input

Renders an `<input>` element with Downshift's `getInputProps` method automatically added.

### Menu

Renders an `<div>` element with Downshift's `getMenuProps` method automatically added.

**Props**

- `is` (component or string) changes the underlying component type

### Item

Use the `Item` component as a direct child of the `Menu` component to render options for the autocomplete.
The Item component passes all props through, but requires an `item` prop for Downshift.

**Props**

- `item` (any) **required** for Downshift to track values
- `is` (component or string) changes the underlying component type

MIT License

[Downshift]: https://github.com/paypal/downshift
[styled-components]: https://github.com/styled-components/styled-components
[emotion]: https://github.com/emotion-js/emotion
[Rebass]: https://jxnblk.com/rebass
[context]: https://reactjs.org/docs/context.html
