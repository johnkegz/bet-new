import React from 'react';
import { makeStyles, withStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import Switch from '@material-ui/core/Switch';
import { useTranslation } from 'react-i18next';

const useStyles = makeStyles({
  table: {
    width: '50rem',
  },
  header: {
    fontWeight: 500
  }
});

const PurpleSwitch = withStyles({
  switchBase: {
    color: '#fff',
    '&$checked': {
      color: '#00802B',
    },
    '&$checked + $track': {
      backgroundColor: '#00802B',
    },
  },
  checked: {},
  track: {},
})(Switch);

export function RolesAndCapabilitiesHeader(props: any) {
  const classes = useStyles();
  const { t } = useTranslation();
  return (
    <TableContainer component={Paper} style={{width: '50rem',}}>
      <Table className={classes.table} aria-label="simple table" >
        <TableBody >
            <TableRow >
              <TableCell style={{width: '12.5rem', maxWidth: '12.5rem', minWidth: '12.5rem', borderRight: '1px solid #BDBDBD'}} className={classes.header}>
              {t('group')}
              </TableCell>
              {props.roles.map((item: any) => (<>
              <TableCell align="center" style={{width: '9.375rem', maxWidth: '9.375rem'}} className={classes.header}>{item.name}</TableCell>
              </>))}
            </TableRow>
        </TableBody>
      </Table>
    </TableContainer>
  );
}

export function RolesAndCapabilitiesBody(props: any) {
  const classes = useStyles();

  const checkCapability = (permissions: any, code:any) => {
    let result = permissions !== undefined && permissions.filter((item: any) => item.code === code)
    let g = result.length === 0? false: true
    return g
  }

  // const alternatingColors = ['#E1FEEA', '#E0E0E0', '#FAFAFA'];
  // const updateAlternatingColors = (newColors: Array<string>) => {
  //   let temp = newColors[0]
  //   newColors.shift()
  //   newColors.push(temp)
  //   return temp;
  // }

  return (
    <TableContainer component={Paper}>
      <Table className={classes.table} aria-label="simple table">
        <TableBody>
          {props.data.permissions.map((row: any) => {
            return(
            <TableRow key={row.id} 
            // style={index % 2 === 0 ? {} : { backgroundColor: updateAlternatingColors(alternatingColors) }}
            >
              <TableCell style={{width: '12.5rem', maxWidth: '12.5rem', minWidth: '12.5rem', borderRight: '1px solid #BDBDBD'}}>
                {row.name}
              </TableCell>
              {props.data.role.map((item: any) => (<TableCell key={item.id}align="center"  style={{width: '9.375rem', maxWidth: '9.375rem'}}>
                <PurpleSwitch name="checkedA" checked={checkCapability(item.permissions, row.code)}/>
              </TableCell>))}
            </TableRow>
          )})}
        </TableBody>
      </Table>
    </TableContainer>
  );
}

