import Spinner from "../../ui/Spinner";
import Table from "../../ui/Table";
import Menus from "../../ui/Menus";
import Empty from "../../ui/Empty";
import { useGuests } from "./useGuests";
import GuestRow from "./GuestRow";
import { useSearchParams } from "react-router-dom";

function GuestTable() {
  const { isLoading, guests } = useGuests();
  const [searchParams] = useSearchParams();

  if (isLoading) return <Spinner />;
  if (!guests.length) return <Empty resourceName="guests" />;

  // SORT
  const sortBy = searchParams.get("sortBy") || "fullName-asc";
  const [field, direction] = sortBy.split("-");
  const sortedGuests =
    direction === "asc"
      ? guests.sort((a, b) => a[field].localeCompare(b[field]))
      : guests.sort((a, b) => b[field].localeCompare(a[field]));


  return (
    <Menus>
      <Table $columns="1.5fr 1.5fr 1fr 1.1fr 0.7fr 0.2fr">
        <Table.Header>
          <div>Guest</div>
          <div>Email</div>
          <div>National ID</div>
          <div>Nationality</div>
          <div>Country Flag</div>
          <div></div>
        </Table.Header>

        <Table.Body
          // data={guests}
          data={sortedGuests}
          render={(guest) => <GuestRow guest={guest} key={guest.id} />}
        />
      </Table>
    </Menus>
  );
}

export default GuestTable;
