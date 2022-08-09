import * as React from 'react';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';

export default class HotelQueryDropdown extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return <FormControl fullWidth>
      <InputLabel>{this.props.id}</InputLabel>
      <Select
        labelId={this.props.id}
        id={this.props.id}
        value={this.props.queryParams[[this.props.id]]}
        label={this.props.label}
        onChange={evt => this.props.updateQueryParams(
          {[this.props.id]: evt.target.value}
        )}
      >
        {this.props.isZeroAllowed && <MenuItem className='menuItem' value={0}>0</MenuItem>}
        <MenuItem className='menuItem' value={1}>1</MenuItem>
        <MenuItem className='menuItem' value={2}>2</MenuItem>
        <MenuItem className='menuItem' value={3}>3</MenuItem>
        <MenuItem className='menuItem' value={4}>4</MenuItem>
      </Select>
    </FormControl>
  }
}
