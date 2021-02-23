import dateFormat from 'dateformat';
import { makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import Avatar from '@material-ui/core/Avatar';
import Typography from '@material-ui/core/Typography';
import Link from '@material-ui/core/Link';

const useStyles = makeStyles({
  table: {
    width: "100%"
  },
  link: {
    color: "#188FFF"
  }
});

const formatDate = (str) => {
  const date = new Date(str);
  return dateFormat(date, "dddd, m/d/yyyy, h:MM:ss TT")
}

export const TableContacts = ({ data }) => {
  const classes = useStyles();

  return (
    <TableContainer component={Paper}>
      <Table className={classes.table} aria-label="contacts table">
        <TableHead>
          <TableRow>
            <TableCell>Avatar</TableCell>
            <TableCell>Full name</TableCell>
            <TableCell>Birthday</TableCell>
            <TableCell>Email</TableCell>
            <TableCell>Phone</TableCell>
            <TableCell>Location</TableCell>
            <TableCell align="right">Nationality</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {data.map((item) => (
            <TableRow key={item.login.uuid}>
              <TableCell>
                <Avatar src={item.picture.thumbnail} alt={item.name.last} />
              </TableCell>
              <TableCell>
                <Link href="#" className={classes.link}>{item.name.title} {item.name.first} {item.name.last}</Link>
              </TableCell>
              <TableCell>
                <Typography variant="body2">
                  {formatDate(item.dob.date)}<br/>
                  {item.dob.age} years
                </Typography>
              </TableCell>
              <TableCell>{item.email}</TableCell>
              <TableCell>{item.phone}</TableCell>
              <TableCell>
                /{item.location.country}/<br/>
                {item.location.street.number} {item.location.street.name}, {item.location.city}, {item.location.state} {item.location.postcode}
              </TableCell>
              <TableCell align="right">{item.nat}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  )
}
