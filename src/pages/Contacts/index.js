import { useState, useEffect } from 'react';
import Container from '@material-ui/core/Container';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import ViewListIcon from '@material-ui/icons/ViewList';
import ViewModuleIcon from '@material-ui/icons/ViewModule';
import ToggleButton from '@material-ui/lab/ToggleButton';
import ToggleButtonGroup from '@material-ui/lab/ToggleButtonGroup';
import { makeStyles, createStyles } from '@material-ui/core/styles';
import { MainContacts } from './MainContacts';
import { VIEW_MODE } from '../../constants/viewMode';

const useStyles = makeStyles((theme) =>
  createStyles({
    root: {
      marginTop: theme.spacing(3)
    },
    header: {
      display: "flex",
      justifyContent: "space-between",
      alignItems: "center"
    }
  })
);

const getInitialViewMode = () => {
  return localStorage.getItem("viewMode") || VIEW_MODE.TABLE;
}

export const Contacts = () => {
  const classes = useStyles();
  const [viewMode, setViewMode] = useState(getInitialViewMode);

  const handleChangeViewMode = (event, nextView) => {
    setViewMode(nextView);
  };

  useEffect(() =>{
    localStorage.setItem("viewMode", viewMode);
  }, [viewMode])

  return (
    <Container className={classes.root}>
      <Grid container spacing={3}>
        <Grid item xs={12}>
          <header className={classes.header}>
            <Typography variant="h3" component="h1">Contacts</Typography>
            <ToggleButtonGroup
              value={viewMode}
              size="small"
              exclusive
              onChange={handleChangeViewMode}
            >
              <ToggleButton value={VIEW_MODE.GRID} aria-label="Grid view mode">
                <ViewModuleIcon />
              </ToggleButton>
              <ToggleButton value={VIEW_MODE.TABLE} aria-label="Data view mode">
                <ViewListIcon />
              </ToggleButton>
            </ToggleButtonGroup>
          </header>
        </Grid>
        <Grid item xs={12}>
          <MainContacts viewMode={viewMode}/>
        </Grid>
      </Grid>
    </Container>
  )
}
