import React from 'react'
import Downshift from 'downshift'

export const Context = React.createContext(null)

export class Provider extends React.Component {
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

export const Label = props =>
  <Context.Consumer
    children={({
      getLabelProps
    }) => (
      <label
        {...getLabelProps()}
        {...props}
      />
    )}
  />

export const Input = props =>
  <Context.Consumer
    children={({
      getInputProps
    }) => (
      <input
        {...getInputProps()}
        {...props}
      />
    )}
  />

export const Menu = ({
  is: Tag = 'div',
  children,
  ...props
}) =>
  <Context.Consumer
    children={({
      isOpen,
      getMenuProps,
      inputValue
    }) => isOpen ? (
      <Tag
        {...getMenuProps()}
        {...props}>
        {children}
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
