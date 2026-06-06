import styled from "styled-components";

import { HiPencil, HiTrash } from "react-icons/hi2";
import Modal from "../../ui/Modal";
import ConfirmDelete from "../../ui/ConfirmDelete";
import Menus from "../../ui/Menus";
import Table from "../../ui/Table";
import { Flag } from "../../ui/Flag";

import CreateGuestForm from "./CreateGuestForm";
import { useDeleteGuest } from "./useDeleteGuest";

const Guest = styled.div`
  font-size: 1.6rem;
  font-weight: 600;
  color: var(--color-grey-600);
  font-family: "Sono";
`;

const Email = styled.div`
  font-family: "Sono";
  font-weight: 500;
  font-style: italic;
  color: var(--color-grey-500);
`;

const NationalID = styled.div`
  font-family: "Sono";
  font-weight: bold;
`;

const Nationality = styled.div`
  font-family: "Sono";
  font-weight: 700;
  color: var(--color-grey-500);
`;

function GuestRow({ guest }) {
  const { isDeleting, deleteGuest } = useDeleteGuest();

  const {
    id: guestId,
    fullName,
    email,
    nationalID,
    nationality,
    countryFlag,
  } = guest;

  return (
    <Table.Row>
      <Guest>{fullName}</Guest>
      <Email>{email}</Email>
      <NationalID>{Number(nationalID)}</NationalID>
      <Nationality>{nationality}</Nationality>
      <Flag src={countryFlag} style={{ maxWidth: "3rem", margin: "0 auto" }} />

      <div>
        <Modal>
          <Menus.Menu>
            <Menus.Toggle id={guestId} />

            <Menus.List id={guestId}>
              <Modal.Open opens="edit">
                <Menus.Button icon={<HiPencil />}>Edit</Menus.Button>
              </Modal.Open>

              <Modal.Open opens="delete">
                <Menus.Button icon={<HiTrash />}>Delete</Menus.Button>
              </Modal.Open>
            </Menus.List>

            <Modal.Window name="edit">
              <CreateGuestForm guestToEdit={guest} />
            </Modal.Window>

            <Modal.Window name="delete">
              <ConfirmDelete
                resourceName="guest"
                disabled={isDeleting}
                onConfirm={() => deleteGuest(guestId)}
              />
            </Modal.Window>
          </Menus.Menu>
        </Modal>
      </div>
    </Table.Row>
  );
}

export default GuestRow;
