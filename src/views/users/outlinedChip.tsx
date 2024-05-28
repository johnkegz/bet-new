import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Avatar from '@material-ui/core/Avatar';
import Chip from '@material-ui/core/Chip';
// import FaceIcon from '@material-ui/icons/Face';
// import DoneIcon from '@material-ui/icons/Done';
import Icon from '@material-ui/core/Icon';

const useStyles = makeStyles({
  chip: {
    marginRight: '5px'
  }
}
);

export default function OutlinedChips() {
  const classes = useStyles();

  const handleDelete = () => {
    alert('You clicked the delete icon.');
  };

  const handleClick = () => {
  };

  return (
    // <div style={{display: 'grid', gap:9, gridTemplateColumns: 'repeat(4, 1fr)' }}>
    <div style={{display: 'flex', flexWrap: 'wrap',}}>
      {/* <Chip label="Basic" variant="outlined" />
      <Chip label="Disabled" disabled variant="outlined" /> */}
      
      {/*<Chip
        avatar={<Avatar alt="Natacha" src="/static/images/avatar/1.jpg" />}
        label="Deletable"
        onDelete={handleDelete}
        variant="outlined"
      />
      <Chip
        icon={<FaceIcon />}
        label="Clickable deletable"
        onClick={handleClick}
        onDelete={handleDelete}
        variant="outlined"
      />
      <Chip
        label="Custom delete icon"
        onClick={handleClick}
        onDelete={handleDelete}
        deleteIcon={<DoneIcon />}
        variant="outlined"
      />
      <Chip label="Clickable link" component="a" href="#chip" clickable variant="outlined" />
      <Chip
        avatar={<Avatar>M</Avatar>}
        label="Primary clickable"
        clickable
        color="primary"
        onDelete={handleDelete}
        // deleteIcon={<DoneIcon />}
        variant="outlined"
      />
      <Chip
        icon={<FaceIcon />}
        label="Primary clickable"
        clickable
        color="primary"
        onDelete={handleDelete}
        deleteIcon={<DoneIcon />}
        variant="outlined"
      />*/} 
      {/* <div><Chip label="Project: IDN-XYZ" onDelete={handleDelete} color="primary" variant="outlined" /></div>  */}
      <div className={classes.chip}><Chip label="Project:IDN-XYZ" onDelete={handleDelete} color="primary" variant="outlined" /></div> 
      <div className={classes.chip}><Chip label="Status: Active" onDelete={handleDelete} color="primary" variant="outlined" /></div> 
      <div className={classes.chip}><Chip label="Role: Forester" onDelete={handleDelete} color="primary" variant="outlined" /></div> 
     <div className={classes.chip}><Chip
        avatar={<Avatar style={{backgroundColor: '#fff'}}><Icon style={{ color: `#27AE60`,  }}>add_circle</Icon></Avatar>}
        label="Add filter"
        onClick={handleClick}
        variant="outlined"
        style={{border: '1px solid #00802B', borderStyle: 'dashed'}}
      /></div>
      {/* <Chip
        icon={<FaceIcon />}
        label="Deletable secondary"
        onDelete={handleDelete}
        color="secondary"
        variant="outlined"
      /> */}
    </div>
  );
}
