import Container from '@material-ui/core/Container';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import { makeStyles, createStyles } from '@material-ui/core/styles';
import { MainContacts } from './MainContacts';

const useStyles = makeStyles((theme) =>
  createStyles({
    root: {
      marginTop: theme.spacing(3),
    },
  })
);

export const Contacts = () => {
  const classes = useStyles();

  return (
    <Container className={classes.root}>
      <Grid container spacing={3}>
        <Grid item xs={12}>
          <header>
            <Typography variant="h3" component="h1">
              Contacts
            </Typography>
          </header>
        </Grid>
        <Grid item xs={12}>
          <MainContacts />
        </Grid>
      </Grid>
    </Container>
  )
}
