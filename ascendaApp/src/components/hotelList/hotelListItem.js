import React from 'react';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import Avatar from '@mui/material/Avatar';
import Typography from '@mui/material/Typography';


class HotelListItemInternal extends React.Component {
  render() {
    return <ListItem alignItems="flex-start">
      <ListItemAvatar>
        <Avatar alt={this.props.name} src="/static/images/avatar/1.jpg" />
      </ListItemAvatar>
      <ListItemText
        primary={
          <React.Fragment>
            <Typography
              sx={{ display: 'inline' }}
              component="span"
              variant="body1"
              color="text.primary"
            >
              {this.props.primaryText}
            </Typography>
          </React.Fragment>
        }
        secondary={
          <React.Fragment>
            <Typography
              sx={{ display: 'inline' }}
              component="span"
              variant="body2"
              color="text.primary"
            >
              {this.props.secondary}
            </Typography>
            {this.props.secondaryText}
          </React.Fragment>
        }
      />
    </ListItem>
  }
}

export const HotelListItem = HotelListItemInternal;