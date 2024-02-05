import React from 'react';
import { Dialog, DialogContent, DialogTitle, IconButton } from '@mui/material';
import { Close } from '@mui/icons-material';
import PDFDocument from './PDFDocument';

const PDFDialog = ({ open, handleClose, reportDetails }) => {
  return (
    <Dialog open={open} onClose={handleClose} maxWidth="lg">
      <DialogTitle>
        PDF Report
        <IconButton aria-label="close" onClick={handleClose} sx={{ position: 'absolute', right: 8, top: 8 }}>
          <Close />
        </IconButton>
      </DialogTitle>
      <DialogContent>
        <PDFDocument reportDetails={reportDetails} />
      </DialogContent>
    </Dialog>
  );
};

export default PDFDialog;
