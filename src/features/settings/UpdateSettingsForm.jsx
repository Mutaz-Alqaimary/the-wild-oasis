import Form from "../../ui/Form";
import FormRow from "../../ui/FormRow";
import Input from "../../ui/Input";
import Spinner from "../../ui/Spinner";
import { useSettings } from "./useSettings";
import { useUpdateSetting } from "./useUpdateSetting";
import { useForm } from "react-hook-form";

function UpdateSettingsForm() {
  const {
    isLoading,
    settings: {
      minBookingLength,
      maxBookingLength,
      maxGuestsPerBooking,
      breakfastPrice,
    } = {},
  } = useSettings();

  const { isUpdating, updateSetting } = useUpdateSetting();

  const {
    register,
    watch,
    trigger,
    getValues,
    formState: { errors },
  } = useForm({
    values: {
      minBookingLength,
      maxBookingLength,
      maxGuestsPerBooking,
      breakfastPrice,
    },
    mode: "onBlur",
  });

  const minForMinNights = watch("minBookingLength");
  const minForMaxNights = watch("maxBookingLength");

  const handleBlur = async (field) => {
    const isValid = await trigger(field);
    if (!isValid) return;

    const value = getValues(field);
    updateSetting({ [field]: Number(value) });
  };

  if (isLoading) return <Spinner />;

  return (
    <Form>
      <FormRow
        label="Minimum nights/booking"
        error={errors?.minBookingLength?.message}
      >
        <Input
          type="number"
          id="min-nights"
          disabled={isUpdating}
          min={1}
          {...register("minBookingLength", {
            required: "This field is required",
            validate: (value) =>
              Number(value) < Number(minForMaxNights) ||
              "Minimum nights must be less than maximum nights",
          })}
          onBlur={() => handleBlur("minBookingLength")}
        />
      </FormRow>

      <FormRow
        label="Maximum nights/booking"
        error={errors?.maxBookingLength?.message}
      >
        <Input
          type="number"
          id="max-nights"
          disabled={isUpdating}
          min={2}
          {...register("maxBookingLength", {
            required: "This field is required",
            validate: (value) =>
              Number(value) > Number(minForMinNights) ||
              "Maximum nights must be greater than minimum nights",
          })}
          onBlur={() => handleBlur("maxBookingLength")}
        />
      </FormRow>

      <FormRow
        label="Maximum guests/booking"
        error={errors?.maxGuestsPerBooking?.message}
      >
        <Input
          type="number"
          id="max-guests"
          disabled={isUpdating}
          min={1}
          {...register("maxGuestsPerBooking", {
            required: "This field is required",
            min: { value: 1, message: "At least one guest is required" },
          })}
          onBlur={() => handleBlur("maxGuestsPerBooking")}
        />
      </FormRow>

      <FormRow label="Breakfast price" error={errors?.breakfastPrice?.message}>
        <Input
          type="number"
          id="breakfast-price"
          disabled={isUpdating}
          min={0}
          {...register("breakfastPrice", {
            required: "This field is required",
            min: { value: 0, message: "Price cannot be negative" },
          })}
          onBlur={() => handleBlur("breakfastPrice")}
        />
      </FormRow>
    </Form>
  );
}

export default UpdateSettingsForm;
