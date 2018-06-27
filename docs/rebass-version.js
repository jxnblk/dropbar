import React from 'react'
import { Box } from 'rebass'
import us from 'us'
import {
  Dropbar,
  Label,
  Input,
  Menu,
  Item,
} from '../src/rebass'

const states = us.STATES

export default () =>
  <Box p={4}>
    Rebass version
    <Dropbar
      itemToString={item => item ? item.name : ''}
      match={(item, value) => item.name.toLowerCase().includes(value.toLowerCase())}
      onChange={state => {
        console.log(state)
      }}
    >
      <Label>States</Label>
      <Input />
      <Menu
      >
        {states.map(state => (
          <Item
            key={state.name}
            item={state}
            children={state.name}
          />
        ))}
      </Menu>
    </Dropbar>
  </Box>
