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
import { makeStyles } from '@material-ui/core/styles';
import { FormatDate } from '../../components/FormatDate';
import { CopyToClipboardText } from '../../components/CopyToClipboardText';
import { NATIONALITIES_TITLES, NATIONALITIES_CLASSES } from '../../constants/nationalities';

const useStyles = makeStyles({
  table: {
    width: "100%"
  },
  link: {
    color: "#188FFF"
  },
  nationality: {
    display: "inline-block",
    padding: "7px",
    borderRadius: "4px",
    fontSize: "small",
    lineHeight: 1,
    color: "white",
    whiteSpace: "nowrap"
  }
});

export const TableContacts = ({ data }) => {
  const classes = useStyles();

  return (
    <TableContainer component={Paper} data-testid="contacts-table">
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
                  <FormatDate date={item.dob.date} /><br/>
                  {item.dob.age} years
                </Typography>
              </TableCell>
              <TableCell>
                <CopyToClipboardText copyText={item.email} />
              </TableCell>
              <TableCell>
                <CopyToClipboardText copyText={item.phone} />
              </TableCell>
              <TableCell>
                <Typography>/{item.location.country}/</Typography>
                <Typography>{item.location.street.number} {item.location.street.name}, {item.location.city}, {item.location.state} {item.location.postcode}</Typography>
              </TableCell>
              <TableCell align="right">
                <Typography className={`${classes.nationality} ${NATIONALITIES_CLASSES[item.nat]}`}>
                  {NATIONALITIES_TITLES[item.nat]}
                </Typography>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  )
}
