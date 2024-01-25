// Checkbox.js
import React from 'react';
import { Checkbox as MuiCheckbox, FormControlLabel } from '@mui/material';
import { Controller } from 'react-hook-form';
const Checkbox = ({ control, name, label }) => {
  return (
    <Controller
    name={name}
    control={control}
    defaultValue={false}
    render={({ field: {onChange, value}, fieldState: {error} }) => (
      <FormControlLabel
        control={<MuiCheckbox 
            checked={value ?? false}
            onChange={(e)=> {
                console.log(e.target.checked)
                onChange(e.target.checked)}}
         />}
        label={label}
      />
    )}
  />
  );
};

export default Checkbox;