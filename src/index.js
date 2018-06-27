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

export const withDropbar = (Component, map = passThrough) => props =>
  <Context.Consumer
    children={state => (
      <Component
        {...map({ ...props, ...state })}
        {...props}
      />
    )}
  />

export const Label = withDropbar('label', ({
  getLabelProps
}) => getLabelProps())

export const Input = withDropbar('input', ({
  getInputProps
}) => getInputProps())

export const Tag = ({
  is: Component = 'div',
  ...props
}) =>
  <Component {...props} />

/*
export const MenuAlt = withDropbar(({
  isOpen,
  ...props
}) => isOpen ? <Tag {...props} /> : false, ({
  children,
  match,
  isOpen,
  getMenuProps,
  inputValue
}) => ({
  ...getMenuProps(),
  isOpen,
  children: React.Children.toArray(children)
    .filter(el => match(el.props.item, inputValue))
    .map((el, index) => React.cloneElement(el, { index }))
}))
*/

export const Menu = ({
  is: Tag = 'div',
  children,
  ...props
}) =>
  <Context.Consumer
    children={({
      match,
      isOpen,
      getMenuProps,
      inputValue
    }) => isOpen ? (
      <Tag
        {...getMenuProps()}
        {...props}>
        {React.Children.toArray(children)
          .filter(el => match(el.props.item, inputValue))
          .map((el, index) => React.cloneElement(el, { index }))
        }
      </Tag>
    ) : false}
  />

export const Item = ({
  is: Tag = 'div',
  item,
  index,
  ...props
}) =>
  <Context.Consumer
    children={({
      getItemProps,
      selectedItem,
      highlightedIndex,
    }) => (
      <Tag
        {...getItemProps({ item, index, ...props })}
        {...props}
        data-selected={selectedItem === item ? 'true' : undefined}
        data-highlighted={highlightedIndex === index ? 'true' : undefined}
      />
    )}
  />
