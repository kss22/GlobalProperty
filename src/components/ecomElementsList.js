import React from 'react';
import Paper from '@mui/material/Paper';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import Checkbox from '@mui/material/Checkbox';
import ListItemText from '@mui/material/ListItemText';

const ElementList = ({ ecomElements, checked, handleToggle }) => {
  return (
    <Paper
      sx={{
        minHeight: 600,
        maxHeight: 600,
        overflow: 'auto',
        maxWidth: 400,
      }}
    >
      <List
        sx={{
          width: '100%',
          maxWidth: 400,
          bgcolor: 'background.paper',
        }}
      >
        {ecomElements.map((value) => {
          return (
            <ListItem
              key={value.ecomElementId}
              disablePadding
              sx={{
                border: '1px solid gray',
                borderRadius: '4px',
              }}
            >
              <ListItemButton
                role={undefined}
                onClick={handleToggle(value.ecomElementId)}
                dense
              >
                <ListItemIcon>
                  <Checkbox
                    edge="start"
                    checked={checked.indexOf(value.ecomElementId) !== -1}
                    tabIndex={-1}
                    disableRipple
                  />
                </ListItemIcon>
                <ListItemText primary={value.elementName} />
              </ListItemButton>
            </ListItem>
          );
        })}
      </List>
    </Paper>
  );
};

export default ElementList;