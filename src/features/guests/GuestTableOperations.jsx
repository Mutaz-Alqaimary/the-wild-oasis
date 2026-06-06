import SortBy from "../../ui/SortBy";
import TableOperations from "../../ui/TableOperations";

function GuestTableOperations() {
  return (
    <TableOperations>
      <SortBy
        options={[
          { value: "fullName-asc", label: "Sort by name (A-Z)" },
          { value: "fullName-desc", label: "Sort by name (Z-A)" },
        ]}
      />
    </TableOperations>
  );
}

export default GuestTableOperations;
