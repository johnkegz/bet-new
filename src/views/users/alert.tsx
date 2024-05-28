import React from 'react';
import { makeStyles, Theme, createStyles } from '@material-ui/core/styles';
import Alert from '@material-ui/lab/Alert';
import IconButton from '@material-ui/core/IconButton';
import Collapse from '@material-ui/core/Collapse';
import CloseIcon from '@material-ui/icons/Close';
import { useTranslation } from 'react-i18next';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      width: '100%',
      '& > * + *': {
        marginTop: theme.spacing(2),
      },
    },
    alert:{
        background: '#EFBD24',
        color: '#013712',
        width: '47.5625rem',
        height: '3.5rem',
        marginBottom: '1.875rem'
    }
  }),
);

export default function TransitionAlerts() {
  const classes = useStyles();
  const { t } = useTranslation();
  const [open, setOpen] = React.useState(true);

  return (
    <div className={classes.root}>
      <Collapse in={open}>
        <Alert
          variant="filled" severity="error"
          action={
            <IconButton
              aria-label="close"
              color="inherit"
              size="small"
              onClick={() => {
                setOpen(false);
              }}
            >
              <CloseIcon fontSize="inherit" />
            </IconButton>
          }
          className={classes.alert}
        >
         {t('warningFVIndonesia')}
        </Alert>
      </Collapse>
    </div>
  );
}
