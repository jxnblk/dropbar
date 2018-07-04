import React from 'react'
import PropTypes from 'prop-types'
import Downshift from 'downshift'

export const Context = React.createContext(null)

export class Dropbar extends React.Component {
  static propTypes = {
    match: PropTypes.func
  }

  static defaultProps = {
    match: () => true
  }

  render () {
    const { children, ...props } = this.props

    return (
      <Downshift
        {...props}
        children={state => (
          <div>
            <Context.Provider
              value={{ ...props, ...state }}>
              {children}
            </Context.Provider>
          </div>
        )}
      />
    )
  }
}

const passThrough = n => n

export const withDropbar = (Component, map = passThrough) => React.forwardRef((props, ref) =>
  <Context.Consumer
    children={state => (
      <Component
        ref={ref}
        {...props}
        {...map({ ...props, ...state })}
      />
    )}
  />
)

export const Label = withDropbar('label', ({
  getLabelProps
}) => getLabelProps())

export const Input = withDropbar('input', ({
  getInputProps
}) => getInputProps())

export const Tag = React.forwardRef(({
  is: Component = 'div',
  ...props
}, ref) =>
  <Component ref={ref} {...props} />
)

const MenuBase = React.forwardRef(({ isOpen, open, ...props }, ref) =>
  isOpen || open
  ? <Tag {...props} />
  : false
)

const mapMenuProps = ({
  match,
  isOpen,
  getMenuProps,
  inputValue,
  children
}) => ({
  ...getMenuProps(),
  isOpen,
  children: React.Children.toArray(children)
    .filter(el => match(el.props.item, inputValue))
    .map((el, index) => React.cloneElement(el, { index }))
})

export const Menu = withDropbar(MenuBase, mapMenuProps)

export const Item = withDropbar(Tag, ({
  item,
  index,
  getItemProps,
  selectedItem,
  highlightedIndex,
  ...props
}) => {
  const selected = selectedItem === item
  const highlighted = highlightedIndex === index
  const className = [
    props.className,
    selected ? 'selected' : null,
    highlighted ? 'highlighted' : null,
  ].join(' ')
  return {
    ...getItemProps({ item, index, }),
    className,
    ['data-selected']: selected ? 'true' : undefined,
    ['data-highlighted']: highlighted ? 'true' : undefined,
  }
})
