import React from 'react';
import { makeStyles, Theme, createStyles } from '@material-ui/core/styles';
import Accordion from '@material-ui/core/Accordion';
import AccordionDetails from '@material-ui/core/AccordionDetails';
import AccordionSummary from '@material-ui/core/AccordionSummary';
import Typography from '@material-ui/core/Typography';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import {RolesAndCapabilitiesBody} from './rolesAndCapabilities';
import { useTranslation } from 'react-i18next';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      width: '50rem',
    },
    heading: {
      fontSize: theme.typography.pxToRem(15),
      // flexBasis: '33.33%',
      flexShrink: 0,
    },
    secondaryHeading: {
      fontSize: theme.typography.pxToRem(15),
      color: theme.palette.text.secondary,
    },
    accordionHeader: {
      background: '#E1FEEA'
    }
  }),
);

export default function ControlledAccordions(props: any) {
  const classes = useStyles();
  const { t } = useTranslation();
  const [expanded, setExpanded] = React.useState<string | false>(false);

  const handleChange = (panel: string) => (event: React.ChangeEvent<{}>, isExpanded: boolean) => {
    setExpanded(isExpanded ? panel : false);
  };

  return (
    <div className={classes.root}>
      {props.modules.map((item: any) => (<Accordion key={item.id} expanded={expanded === `panel${item.id}`} onChange={handleChange(`panel${item.id}`)}>
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls={`panel${item.id}bh-content`}
          id={`panel${item.id}bh-header`}
          style={expanded === `panel${item.id}`?{
            background: '#E1FEEA'
          }:{}}
        >
          <Typography className={classes.heading}>{t(item.name)}</Typography>
          <Typography className={classes.secondaryHeading}>{t('setRolesCapabilitiesWithinAppSettings')}</Typography>
        </AccordionSummary>
        <AccordionDetails style={{padding: 0}}>
          <Typography>
            <RolesAndCapabilitiesBody data={item} />
          </Typography>
        </AccordionDetails>
      </Accordion>))}
    </div>
  );
}
