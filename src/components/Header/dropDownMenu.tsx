import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import { palette } from '../../theme/palette';
import MenuItem from "@material-ui/core/MenuItem";
import TextField from "@material-ui/core/TextField";
import { useHistory } from "react-router";

import {
    withStyles,
  } from '@material-ui/core/styles';
import { useDispatch } from "react-redux";

//const useStyles = makeStyles((theme) => ({
const useStyles = makeStyles({
  menu: {
  },
  textField: {
    marginRight: '20px',
    '&, & *': {
      boxSizing: 'border-box',
      height: '40px',
      lineHeight: '40px',
      padding: 0,
    }
  },
  dense: {
    marginTop: 0
  },
  icon: {
    top: 0,
    right: '5px',
    fill: palette.icon.contrast,    
  },
  selectDropdown: {
    color: palette.text.suppressed,
  },
});

const CssTextField = withStyles({
    root: {    
      '& .MuiOutlinedInput-root': {
        borderWidth: '1px',
        borderStyle: 'solid',
        borderColor: palette.primary.light,
        transition: 'all .2s ease',
        '&:hover, &.Mui-focused': {
          borderColor: palette.primary.light,
          backgroundColor: palette.primary.light,
          color: palette.primary.contrastText,
          borderWidth: '1px',
        },
        '& fieldset': {
          height: '40px',
          top: 0,
          border: '0 none',
          '& legend': {
            display: 'none',
          }
        },
      },
      '& .MuiSelect-root': {
        paddingLeft: '15px',
      },
      '& .MuiSelect-iconOutlined': {
        top: 0,
        right: 0,
      }
    },
  })(TextField);

export default function TextFields(props: any) {
  const classes = useStyles();
  const [values, setValues] = React.useState({
    currency: {}
  });

  const router = useHistory();
  const dispatch = useDispatch();

  const handleChange = (name: any) => (event: any) => {
    setValues({ ...values, [name]: event.target.value });
    props.handleCurrentOrganization(event.target.value)
    dispatch.organizations.selectedOrganization(event.target.value)
  };

  React.useEffect(() => {
    if(props.organizations && props.organizations.length !==0 && Object.keys(values.currency).length === 0){
        setValues({ ...values, currency: props.organizations[0] });
        props.handleCurrentOrganization(props.organizations[0])
      }
    
  }, [props])

  return (
      <CssTextField
      id="outlined-select-currency-native"
        select
        className={classes.textField}
        style={router.location.pathname === "/users" || router.location.pathname === "/dashboard" || router.location.pathname === "/" ?{}:{display:'none'}}
        value={values.currency}
        onChange={handleChange("currency")}
        SelectProps={{
          MenuProps: {
            className: classes.menu
          },
          renderValue: (option: any) => option.name
        }}
        variant="outlined"
        InputProps={{
            className: classes.selectDropdown
        }}
      >
        {props.organizations && props.organizations.map((option: any) => (
          <MenuItem key={option.id} value={option}>
            {option.name}
          </MenuItem>
        ))}
      </CssTextField>
  );
}
