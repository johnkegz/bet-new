import React, { useState } from 'react';
import { Dialog, DialogContent, DialogTitle, DialogActions, Button, Card, CardContent, CardMedia, Typography } from '@material-ui/core';

const ModalPending = ({open, handleClose}) => {
  

  return (
    <div>
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>Bet</DialogTitle>
        <DialogContent>
          <Card>
            <img
              src="https://c7.alamy.com/comp/2JHPF9R/pending-text-written-on-yellow-black-round-stamp-sign-2JHPF9R.jpg"
              alt="Random Image"
              style={{
                width: '100%',
                height: '100px',
                objectFit: 'contain',
              }}
            />
            <CardContent>
              <Typography gutterBottom variant="h5" component="div">
                Approval pending
              </Typography>
              <Typography variant="body2" >
                Reach out admin to approve your set
              </Typography>
            </CardContent>
          </Card>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Close</Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default ModalPending;
