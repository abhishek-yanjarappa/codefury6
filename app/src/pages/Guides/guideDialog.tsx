import { ArrowLeft, ArrowLeftSharp, ArrowRight } from "@mui/icons-material";
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogProps,
  DialogTitle,
  Icon,
  IconButton,
} from "@mui/material";
import React, { useState } from "react";

const GuideDialog: React.FC<DialogProps & { data: any }> = ({ ...props }) => {
  const [currentSlide, setCurrentSlide] = useState(0);
  return (
    <Dialog open={props.open} onClose={props?.onClose}>
      <DialogTitle>Guided Activity for {props.data.emotion}</DialogTitle>

      <DialogContent>
        <DialogContentText>
          {props?.data?.todo?.[currentSlide]}
        </DialogContentText>
      </DialogContent>
      <DialogActions>
        <IconButton
          onClick={() => setCurrentSlide(Math.max(currentSlide - 1, 0))}
        >
          <ArrowLeft />
        </IconButton>
        <IconButton
          onClick={() =>
            setCurrentSlide(
              Math.min(currentSlide + 1, props?.data?.todo?.length - 1)
            )
          }
        >
          <ArrowRight />
        </IconButton>
      </DialogActions>
    </Dialog>
  );
};

export default GuideDialog;
