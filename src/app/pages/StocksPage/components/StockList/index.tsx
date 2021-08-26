import * as React from 'react';
import {
  ListSubheader,
  List,
  ListItem,
  ListItemText,
  ListItemIcon,
} from '@material-ui/core';
import styled from 'styled-components/macro';

function StockList(props) {
  return (
    <List
      subheader={
        <ListSubheader disableSticky={true}>{props.subheader}</ListSubheader>
      }
      component="nav"
      aria-label="main"
    >
      {props.list.map(item => {
        return (
          <ListItem
            button
            onClick={() => props.onClick(item)}
            key={item.symbol}
            selected={item.symbol === props.selected}
          >
            <StockListItemText
              primary={item.name || item.securityName}
              secondary={item.symbol}
            />
            <ListItemIcon>{item?.deltaPercent?.toFixed(2)}</ListItemIcon>
          </ListItem>
        );
      })}
    </List>
  );
}

export default StockList;

const StockListItemText = styled(ListItemText)`
  .MuiListItemText-primary {
    text-overflow: ellipsis;
    white-space: nowrap;
    overflow: hidden;
  }
`;
