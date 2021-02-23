import { useContacts } from "./useContacts";
import { TableContacts } from "./TableContacts";

export const MainContacts = () => {
  const contacts = useContacts();

  if (contacts.isLoading) {
    return <div>is loading...</div>
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
