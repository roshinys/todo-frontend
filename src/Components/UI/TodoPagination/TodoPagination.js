import { IconButton } from "@mui/material";
import React from "react";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import ArrowBackIosIcon from "@mui/icons-material/ArrowBackIos";
import styles from "./TodoPagination.module.css";

function TodoPagination({
  onPrevChange,
  hasPrev,
  hasNext,
  page,
  onNextChange,
}) {
  return (
    <div className={styles.pagination}>
      {hasPrev && (
        <IconButton onClick={onPrevChange}>
          <ArrowBackIosIcon />
        </IconButton>
      )}
      <IconButton>{page}</IconButton>
      {hasNext && (
        <IconButton onClick={onNextChange}>
          <ArrowForwardIosIcon />
        </IconButton>
      )}
    </div>
  );
}

export default TodoPagination;
