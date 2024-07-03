import React from 'react';
import { Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle } from '@material-ui/core';

const FrozenModal = ({ open, handleClose, handleTransaction }) => {
    return (
        <Dialog open={open} onClose={(e, reason) => reason === "backdropClick" ? null : handleClose()}>
            <DialogTitle>Transaction Confirmation</DialogTitle>
            <DialogContent>
                <DialogContentText>
                    The balance is insufficient please recharge before submitting?
                </DialogContentText>
            </DialogContent>
            <DialogActions>
                <Button onClick={handleClose} color="primary">
                    Cancel
                </Button>
                <Button onClick={handleTransaction} color="primary">
                    Recharge
                </Button>
            </DialogActions>
        </Dialog>
    );
};

export default FrozenModal;
