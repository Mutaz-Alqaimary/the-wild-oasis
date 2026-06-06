import { useForm, Controller } from "react-hook-form";

import Input from "../../ui/Input";
import Form from "../../ui/Form";
import Button from "../../ui/Button";
import ListOfCountries from "../../ui/ListOfCountries";
import FormRow from "../../ui/FormRow";
import { Flag } from "../../ui/Flag";

import { useCreateGuest } from "./useCreateGuest";
import { useEditGuest } from "./useEditGuest";
import GetCodeOfCountry from "../../ui/GetCodeOfCountry";
import { useEffect } from "react";

function CreateGuestForm({ guestToEdit = {}, onCloseModal }) {
  const { isCreating, createGuest } = useCreateGuest();
  const { isEditing, editGuest } = useEditGuest();
  const isWorking = isCreating || isEditing;

  const { id: editId, ...editValues } = guestToEdit;
  const isEditSession = Boolean(editId);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
    watch,
    control,
    setValue,
  } = useForm({
    defaultValues: isEditSession ? editValues : {},
  });

  const countryName = watch("nationality");
  const codeOfCountry = GetCodeOfCountry(countryName);

  useEffect(() => {
    if (codeOfCountry) {
      setValue("countryFlag", `https://flagcdn.com/${codeOfCountry}.svg`);
    }
  }, [codeOfCountry, setValue]);

  function onSubmit(data) {
    if (isEditSession) {
      editGuest(
        { newGuestData: { ...data }, id: editId },
        {
          onSuccess: () => {
            reset();
            onCloseModal?.();
          },
        },
      );
    } else {
      createGuest(
        { ...data },
        {
          onSuccess: () => {
            reset();
            onCloseModal?.();
          },
        },
      );
    }
  }

  return (
    <Form
      onSubmit={handleSubmit(onSubmit)}
      type={onCloseModal ? "modal" : "regular"}
    >
      <FormRow label="Full name" error={errors?.fullName?.message}>
        <Input
          type="text"
          id="fullName"
          disabled={isWorking}
          {...register("fullName", { required: "This field is required" })}
        />
      </FormRow>

      <FormRow label="Email address" error={errors?.email?.message}>
        <Input
          type="email"
          id="email"
          disabled={isWorking}
          {...register("email", {
            required: "This field is required",
            pattern: {
              value:
                /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/,
              message: "Please enter a valid email address",
            },
          })}
        />
      </FormRow>

      <FormRow label="National ID" error={errors?.nationalID?.message}>
        <Input
          type="number"
          id="nationalID"
          disabled={isWorking}
          {...register("nationalID", {
            required: "This field is required",
            valueAsNumber: true,
            validate: (value) =>
              value > 0 || "Please enter a valid national ID",
          })}
        />
      </FormRow>

      <FormRow label="Nationality" error={errors?.nationality?.message}>
        <Controller
          name="nationality"
          control={control}
          rules={{ required: "This field is required" }}
          render={({ field: { onChange, value } }) => (
            <ListOfCountries
              value={value}
              onChange={onChange}
              disabled={isWorking}
            />
          )}
        />
      </FormRow>

      <FormRow label="Country flag" error={errors?.countryFlag?.message}>
        {codeOfCountry ? (
          <>
            <Input type="hidden" {...register("countryFlag")} />
            <Flag
              src={`https://flagcdn.com/${codeOfCountry}.svg`}
              alt={`Flag of ${countryName}`}
              style={{ maxWidth: "5rem" }}
            />
          </>
        ) : (
          <p style={{ color: "var(--color-red-700)" }}>No country selected</p>
        )}
      </FormRow>

      <FormRow>
        <Button
          $variation="secondary"
          type="reset"
          onClick={() => onCloseModal?.()}
          disabled={isWorking}
        >
          Cancel
        </Button>

        <Button disabled={isWorking} type="submit">
          {isEditSession ? "Edit guest" : "Create new guest"}
        </Button>
      </FormRow>
    </Form>
  );
}

export default CreateGuestForm;
