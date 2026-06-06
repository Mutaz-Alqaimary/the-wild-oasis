import Heading from "../ui/Heading";
import Row from "../ui/Row";
import GuestTable from "../features/guests/GuestTable";
import AddGuest from "../features/guests/AddGuest";
import GuestTableOperations from "../features/guests/GuestTableOperations";

function Guests() {
  return (
    <>
      <Row type="horizontal">
        <Heading as="h1">All guests</Heading>
        <GuestTableOperations />
      </Row>

      <Row>
        <GuestTable />
        <AddGuest />
      </Row>
    </>
  );
}

export default Guests;
