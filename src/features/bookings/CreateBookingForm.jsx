import Form from "../../ui/Form";
import FormRow from "../../ui/FormRow";
import Spinner from "../../ui/Spinner";
import Button from "../../ui/Button";
import Input from "../../ui/Input";
import { StyledSelect } from "../../ui/Select";

import { subtractDates, toLocalDateTimeISO } from "../../utils/helpers";

import AddGuest from "../guests/AddGuest";
import { useGuests } from "../guests/useGuests";
import { useCabins } from "../cabins/useCabins";
import { useSettings } from "../settings/useSettings";

import { Controller, useForm } from "react-hook-form";
import { useEffect } from "react";
import { useCreateBooking } from "./useCreateBooking";

function CreateBookingForm({ onCloseModal }) {
  const { guests, isLoading: isLoadingGuests } = useGuests();
  const { cabins, isLoading: isLoadingCabins } = useCabins();
  const { settings, isLoading: isLoadingSettings } = useSettings();
  const { isCreating, createBooking } = useCreateBooking();

  const {
    handleSubmit,
    formState: { errors },
    register,
    watch,
    setValue,
    control,
    reset,
  } = useForm();

  // Sorted Guests Ascending
  const sortedGuests = guests?.sort((a, b) =>
    a.fullName.localeCompare(b.fullName),
  );

  // Sorted Cabins Ascending
  const sortedCabins = cabins?.sort((a, b) => a - b);

  // Track Start Date Value
  const startDateValue = watch("startDate");

  // Track End Date Value
  const endDateValue = watch("endDate");

  // Get current date in local timezone, formatted as YYYY-MM-DDTHH:MM (for datetime-local input)
  const now = toLocalDateTimeISO(new Date());

  // if start date is chosen, set min end date = start date + minBookingLength
  const minEndDate = startDateValue
    ? toLocalDateTimeISO(
        new Date(
          new Date(startDateValue).getTime() +
            24 * 60 * 60 * 1000 * settings?.minBookingLength,
        ),
      )
    : "";

  // Max value for end date = start date + maxBookingLength
  const maxEndDate = startDateValue
    ? toLocalDateTimeISO(
        new Date(
          new Date(startDateValue).getTime() +
            24 * 60 * 60 * 1000 * settings?.maxBookingLength,
        ),
      )
    : "";

  // Select start date before selecting end date
  useEffect(() => {
    if (!startDateValue) setValue("endDate", "");
  }, [setValue, startDateValue]);

  // Num Nights by (End Date - Start Date)
  const numNights =
    !startDateValue || !endDateValue
      ? ""
      : subtractDates(endDateValue, startDateValue);

  useEffect(() => {
    if (
      numNights < settings?.minBookingLength ||
      numNights > settings?.maxBookingLength
    )
      setValue("numNights", "");
    else setValue("numNights", numNights);
  }, [
    setValue,
    numNights,
    settings?.minBookingLength,
    settings?.maxBookingLength,
  ]);

  // Track Selected Cabin Id
  const selectedCabinId = watch("cabinId");

  // Maximum Capacity for Selected Cabin
  const maxCapacity = !selectedCabinId
    ? ""
    : cabins?.find((cabin) => cabin.id === selectedCabinId)?.maxCapacity;

  // Select cabin before selecting Num Guests
  useEffect(() => {
    if (!selectedCabinId) setValue("numGuests", "");
  }, [setValue, selectedCabinId]);

  // Regular Price for Selected Cabin
  const regularPrice = !selectedCabinId
    ? ""
    : cabins?.find((cabin) => cabin.id === selectedCabinId)?.regularPrice;

  // Discount for Selected Cabin
  const discount = !selectedCabinId
    ? ""
    : cabins?.find((cabin) => cabin.id === selectedCabinId)?.discount;

  // Cabin Price for Selected Cabin
  const cabinPrice =
    !selectedCabinId || !watch("numNights")
      ? ""
      : numNights * (regularPrice - discount);

  useEffect(() => {
    setValue("cabinPrice", cabinPrice);
  }, [setValue, cabinPrice]);

  // Extras Price for Selected Cabin
  let extrasPrice;
  if (!watch("hasBreakfast")) extrasPrice = 0;
  if (watch("hasBreakfast")) {
    if (!watch("numNights") || !watch("numGuests")) {
      extrasPrice = "";
    } else {
      extrasPrice =
        watch("numNights") * watch("numGuests") * settings.breakfastPrice;
    }
  }

  useEffect(() => {
    setValue("extrasPrice", extrasPrice);
  }, [setValue, extrasPrice]);

  // Total Price for Selected Cabin
  const totalPrice =
    !cabinPrice || isNaN(extrasPrice) ? "" : cabinPrice + extrasPrice;

  useEffect(() => {
    setValue("totalPrice", totalPrice);
  }, [setValue, totalPrice]);

  // If not paid, status is unconfirmed
  const isPaid = watch("isPaid");

  useEffect(() => {
    if (!isPaid) setValue("status", "unconfirmed");
  }, [setValue, isPaid]);

  if (isLoadingCabins || isLoadingGuests || isLoadingSettings || isCreating)
    return <Spinner />;

  function onSubmit(data) {
    createBooking(
      { ...data },
      {
        onSuccess: () => {
          reset();
          onCloseModal?.();
        },
      },
    );
  }

  return (
    <Form onSubmit={handleSubmit(onSubmit)}>
      <FormRow label="Select Guest" error={errors?.guestId?.message}>
        <div style={{ display: "flex", alignItems: "center", gap: "2.4rem" }}>
          <StyledSelect
            disabled={isCreating}
            id="guestId"
            {...register("guestId", {
              required: "This field is required",
              valueAsNumber: true,
            })}
          >
            <option value="">-- Select Guest --</option>
            {sortedGuests?.map((guest) => (
              <option value={guest.id} key={guest.id}>
                {guest.fullName} - ( {guest.nationality} )
              </option>
            ))}
          </StyledSelect>
          <AddGuest />
        </div>
      </FormRow>

      <FormRow label="Select Cabin" error={errors?.cabinId?.message}>
        <StyledSelect
          id="cabinId"
          disabled={isCreating}
          {...register("cabinId", {
            required: "This field is required",
            valueAsNumber: true,
          })}
        >
          <option value="">-- Select Cabin --</option>
          {sortedCabins?.map((cabin) => (
            <option value={cabin.id} key={cabin.id}>
              {cabin.name} ( Fits up to {cabin.maxCapacity} guests )
            </option>
          ))}
        </StyledSelect>
      </FormRow>

      <FormRow label="Start Date" error={errors?.startDate?.message}>
        <Input
          type="datetime-local"
          id="startDate"
          disabled={isCreating}
          min={now}
          {...register("startDate", {
            required: "This field is required",
            validate: (value) => {
              const selected = new Date(value);
              const current = new Date();
              if (selected < current) return "Start date cannot be in the past";
              return true;
            },
          })}
        />
      </FormRow>

      <FormRow label="End Date" error={errors?.endDate?.message}>
        <Input
          type="datetime-local"
          id="endDate"
          min={minEndDate}
          max={maxEndDate}
          disabled={!startDateValue || isCreating}
          {...register("endDate", {
            required: "This field is required",
            validate: (value) => {
              const start = new Date(startDateValue);
              const end = new Date(value);
              if (end < start) return "End date must be after start date";
              if (end < new Date(minEndDate))
                return `Booking must be at least ${settings?.minBookingLength} day${settings?.minBookingLength > 1 ? "s" : ""} long`;
              if (end > new Date(maxEndDate))
                return `Booking cannot exceed ${settings?.maxBookingLength} day${settings?.maxBookingLength > 1 ? "s" : ""}`;
              return true;
            },
          })}
        />
      </FormRow>

      <FormRow label="Num Nights" error={errors?.numNights?.message}>
        <Input
          type="number"
          id="numNights"
          disabled
          {...register("numNights", {
            required: "This field is required",
            min: {
              value: settings.minBookingLength,
              message: `Num nights must be at least ${settings.minBookingLength} night${settings.minBookingLength > 1 ? "s" : ""}`,
            },
            max: {
              value: settings.maxBookingLength,
              message: `Num nights cannot exceed ${settings.maxBookingLength} night${settings.maxBookingLength > 1 ? "s" : ""}`,
            },
            valueAsNumber: true,
          })}
        />
      </FormRow>

      <FormRow label="Num Guests" error={errors?.numGuests?.message}>
        <Input
          disabled={!selectedCabinId || isCreating}
          type="number"
          id="numGuests"
          min={1}
          max={maxCapacity}
          {...register("numGuests", {
            required: "This field is required",
            valueAsNumber: true,
          })}
        />
      </FormRow>

      <FormRow label="Has Breakfast" error={errors?.hasBreakfast?.message}>
        <Controller
          name="hasBreakfast"
          disabled={isCreating}
          control={control}
          defaultValue={false}
          render={({ field }) => (
            <StyledSelect
              onChange={(e) => field.onChange(e.target.value === "true")}
            >
              <option value="false">False</option>
              <option value="true">True</option>
            </StyledSelect>
          )}
        />
      </FormRow>

      <FormRow label="Cabin Price ($)" error={errors?.cabinPrice?.message}>
        <Input
          type="number"
          id="cabinPrice"
          disabled
          {...register("cabinPrice", {
            required: "This field is required",
            valueAsNumber: true,
          })}
        />
      </FormRow>

      <FormRow label="Extras Price ($)" error={errors?.extrasPrice?.message}>
        <Input
          type="number"
          id="extrasPrice"
          disabled
          {...register("extrasPrice", {
            required: "This field is required",
            valueAsNumber: true,
          })}
        />
      </FormRow>

      <FormRow label="Total Price ($)" error={errors?.totalPrice?.message}>
        <Input
          type="number"
          id="totalPrice"
          disabled
          {...register("totalPrice", {
            required: "This field is required",
            valueAsNumber: true,
          })}
        />
      </FormRow>

      <FormRow label="Is Paid" error={errors?.isPaid?.message}>
        <Controller
          name="isPaid"
          disabled={isCreating}
          control={control}
          defaultValue={false}
          render={({ field }) => (
            <StyledSelect
              onChange={(e) => field.onChange(e.target.value === "true")}
            >
              <option value="false">False</option>
              <option value="true">True</option>
            </StyledSelect>
          )}
        />
      </FormRow>

      <FormRow label="Status" error={errors?.status?.message}>
        <Controller
          name="status"
          disabled={isCreating}
          control={control}
          render={({ field }) => (
            <StyledSelect onChange={(e) => field.onChange(e.target.value)}>
              {watch("isPaid") ? (
                <>
                  <option value="unconfirmed">unconfirmed</option>
                  <option value="checked-in">checked-in</option>
                </>
              ) : (
                <option value="unconfirmed">unconfirmed</option>
              )}
            </StyledSelect>
          )}
        />
      </FormRow>

      <FormRow label="Observations" error={errors?.observations?.message}>
        <Input
          type="text"
          id="observations"
          disabled={isCreating}
          {...register("observations")}
        />
      </FormRow>

      <FormRow>
        <Button
          $variation="secondary"
          type="reset"
          disabled={isCreating}
          onClick={() => onCloseModal?.()}
        >
          Cancel
        </Button>

        <Button type="submit" disabled={isCreating}>
          Create new booking
        </Button>
      </FormRow>
    </Form>
  );
}

export default CreateBookingForm;
