import { useState, useCallback } from "react";
import PropTypes from 'prop-types';
import { useCopyToClipboard } from "react-use";
import { createStyles, makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import ClickAwayListener from '@material-ui/core/ClickAwayListener';
import Tooltip from '@material-ui/core/Tooltip';
import FileCopyOutlinedIcon from '@material-ui/icons/FileCopyOutlined';

const useStyles = makeStyles((theme) =>
  createStyles({
    root: {
      textTransform: 'lowercase',
      color: '#188FFF',
      cursor: 'pointer',
      whiteSpace: 'nowrap'
    },
    icon: {
      marginRight: theme.spacing(1)
    }
  })
);

const STATUS_COPY = {
  COPY: 'copy',
  COPIED: 'copied'
}

export const CopyToClipboardText = ({ copyText }) => {
  const classes = useStyles();
  const [, copyToClipboard] = useCopyToClipboard();
  const [statusCopy, setStatusCopy] = useState(STATUS_COPY.COPY)

  const onClickAway = useCallback(() => {
    setStatusCopy(STATUS_COPY.COPY);
  }, [setStatusCopy])

  const onClickCopy = useCallback(() => {
    copyToClipboard(copyText);
    setStatusCopy(STATUS_COPY.COPIED);
  }, [copyText, copyToClipboard])

  return (
    <ClickAwayListener onClickAway={onClickAway}>
      <Tooltip title={statusCopy} placement="top" arrow>
        <Button
          className={classes.root}
          onClick={onClickCopy}
        >
          <FileCopyOutlinedIcon fontSize="small" className={classes.icon}/>
          {copyText}
        </Button>
      </Tooltip>
    </ClickAwayListener>
  )
}

CopyToClipboardText.propTypes = {
  copyText: PropTypes.string.isRequired
}
