import styled from "styled-components";
import { Link } from "react-router-dom";

import Tag from "../../ui/Tag";
import { Flag } from "../../ui/Flag";
import Button from "../../ui/Button";
import CheckoutButton from "./CheckoutButton";

const StyledTodayItem = styled.li`
  display: grid;
  grid-template-columns: 9rem 2rem 1fr 7rem 9rem;
  gap: 1.2rem;
  align-items: center;

  font-size: 1.4rem;
  padding: 0.8rem 0;
  border-bottom: 1px solid var(--color-grey-100);

  &:first-child {
    border-top: 1px solid var(--color-grey-100);
  }

  @media (max-width: 37.5em) {
    grid-template-columns: auto 2rem auto minmax(0, 1fr);
    gap: 1rem 1.2rem;
    font-size: 1.3rem;
    padding: 1rem 0;
  }

  & > div:nth-child(4) {
    white-space: nowrap;
  }

  & > a,
  & > button {
    justify-self: end;
  }

  @media (max-width: 37.5em) {
    & > a,
    & > button {
      grid-column: 1 / -1;
      justify-self: stretch;
    }
  }

  @media (max-width: 22em) {
    & > div:nth-child(4) {
      grid-column: 2 / 4;
    }
  }

  @media (min-width: 75em) and (max-width: 87.5em) {
    grid-template-columns: auto 2rem auto minmax(0, 1fr);
    & > a,
    & > button {
      grid-column: 1 / -1;
      justify-self: stretch;
    }
  }
`;

const Guest = styled.div`
  font-weight: 500;
  line-height: 1.3;
  min-width: 0;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
`;

function TodayItem({ activity }) {
  const { id, status, guests, numNights } = activity;

  return (
    <StyledTodayItem>
      {status === "unconfirmed" && <Tag type="green">Arriving</Tag>}
      {status === "checked-in" && <Tag type="blue">Departing</Tag>}

      <Flag src={guests.countryFlag} alt={`Flag of ${guests.country}`} />
      <Guest>{guests.fullName}</Guest>
      <div>{numNights} nights</div>

      {status === "unconfirmed" && (
        <Button size="small" as={Link} to={`/checkin/${id}`}>
          Check in
        </Button>
      )}
      {status === "checked-in" && <CheckoutButton bookingId={id} />}
    </StyledTodayItem>
  );
}

export default TodayItem;
