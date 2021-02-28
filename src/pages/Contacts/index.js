import Container from '@material-ui/core/Container';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import { makeStyles, createStyles } from '@material-ui/core/styles';
import { MainContacts } from './MainContacts';
import { ViewModeButtons } from '../../components/ViewModeButtons';
import { useViewMode } from './useViewMode';

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

export const Contacts = () => {
  const classes = useStyles();
  const [viewMode, setViewMode] = useViewMode();

  return (
    <Container className={classes.root}>
      <Grid container spacing={3}>
        <Grid item xs={12}>
          <header className={classes.header}>
            <Typography variant="h3" component="h1">Contacts</Typography>
            <ViewModeButtons
              viewMode={viewMode}
              setViewMode={setViewMode}
            />
          </header>
        </Grid>
        <Grid item xs={12}>
          <MainContacts viewMode={viewMode}/>
        </Grid>
      </Grid>
    </Container>
  )
}
