import PropTypes from 'prop-types';
import { useCopyToClipboard } from "react-use";
import { createStyles, makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import Tooltip from '@material-ui/core/Tooltip';
import FileCopyOutlinedIcon from '@material-ui/icons/FileCopyOutlined';

const useStyles = makeStyles((theme) =>
  createStyles({
    root: {
      color: '#188FFF',
      cursor: 'pointer'
    },
    icon: {
      marginRight: theme.spacing(1)
    }
  })
);

export const CopyToClipboardText = ({ copyText }) => {
  const classes = useStyles();
  const [state, copyToClipboard] = useCopyToClipboard();

  return (
    <Tooltip title="Copy" placement="top" arrow>
      <Button
        className={classes.root}
        onClick={() => copyToClipboard(copyText)}
      >
        <FileCopyOutlinedIcon fontSize="small" className={classes.icon}/>
        {copyText}
      </Button>
    </Tooltip>
  )
}

CopyToClipboardText.propTypes = {
  copyText: PropTypes.string.isRequired
}
