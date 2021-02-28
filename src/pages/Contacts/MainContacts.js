import { useContacts } from "./useContacts";
import { TableContacts } from "./TableContacts";
import CircularProgress from '@material-ui/core/CircularProgress';

export const MainContacts = () => {
  const contacts = useContacts();

  if (contacts.isLoading) {
    return <CircularProgress />
  }

  if (contacts.isError) {
    return <div>Error!</div>
  }

  return (
    <main>
      <TableContacts data={contacts.data}/>
    </main>
  )
}
