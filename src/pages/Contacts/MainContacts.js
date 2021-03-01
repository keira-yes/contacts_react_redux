import { useContacts } from "./useContacts";
import { TableContacts } from "./TableContacts";
import CircularProgress from '@material-ui/core/CircularProgress';
import { VIEW_MODE } from '../../constants/viewMode';

export const MainContacts = ({ viewMode }) => {
  const contacts = useContacts();

  if (contacts.isLoading) {
    return <CircularProgress data-testid="contacts-loader" />
  }

  if (contacts.isError) {
    return <div data-testid="contacts-error">Error!</div>
  }

  return (
    <main>
      {viewMode === VIEW_MODE.TABLE && <TableContacts data={contacts.data}/>}
      {viewMode === VIEW_MODE.GRID && <div>Grid</div>}
    </main>
  )
}
