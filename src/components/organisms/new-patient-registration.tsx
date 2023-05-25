import { Input } from "@components/atoms/input";
import { AutocompleteBox } from "@components/molecules/autocomplete";
import { Box, Button } from "@mui/material";
import { forwardRef, useImperativeHandle, useRef, useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { masterOptions } from "src/constants/option-form";
import { PatientType } from "src/constants/patient-type";

export const NewPatientRegistration = forwardRef((props: any, ref: any) => {
  const {defaultValue} = props;
  const refButton = useRef(null);
  const [insurance, setInsurance] = useState<any>(defaultValue.insurance?.id || "1");
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<PatientType>({defaultValues: {...defaultValue}});
  useImperativeHandle(ref, () => ({
    submitForm() {
      (refButton?.current as any).click();
      // refForm.current.
    },
  }));

  return (
    <Box>
      <form onSubmit={handleSubmit(props.onSubmit)}>
        <Controller
          control={control}
          name="citizenship"
          rules={{
            required: true,
          }}
          defaultValue={"WNI"}
          render={({ field: { onChange, onBlur, value } }) => (
            <Input label="Kewarganegaraan" readonly value={value} />
          )}
        />

        <Controller
          control={control}
          name="identity_type"
          rules={{
            required: true,
          }}
          defaultValue="KTP"
          render={({ field: { onChange, onBlur, value } }) => (
            <Input label="Jenis Identitas" readonly value={value} />
          )}
        />

        <Controller
          control={control}
          name="identity_number"
          rules={{
            required: true,
          }}
          defaultValue={defaultValue?.identity_number}
          render={({ field: { onChange, onBlur, value } }) => (
            <Input
              value={value}
              disabled
              label="Nomor Identitas"
              onChange={onChange}
              error={errors.identity_number || false}
              helperText={errors.identity_number?.message || ""}
            />
          )}
        />

        <Controller
          control={control}
          name="full_name"
          rules={{
            required: true,
          }}
          defaultValue={defaultValue?.full_name}
          render={({ field: { onChange, onBlur, value } }) => (
            <Input
              value={value}
              label="Nama Lengkap"
              onChange={onChange}
              error={errors.full_name || false}
              helperText={errors.full_name?.message || ""}
            />
          )}
        />

        <Controller
          control={control}
          name="insurance"
          rules={{
            required: true,
          }}
          render={({ field: { onChange, onBlur, value } }) => (
            <AutocompleteBox
              disabled
              onChange={(e: any, newVal: any) => {
                onChange(newVal);
                setInsurance(newVal.id);
              }}
              label="Jenis Pasien"
              options={masterOptions.insurance}
              error={errors.insurance || false}
              helperText={errors.insurance?.message || ""}
            />
          )}
        />

        {insurance == "1" && (
          <Controller
            control={control}
            name="insurance_number"
            rules={{
              required: true,
            }}
            render={({ field: { onChange, onBlur, value } }) => (
              <Input
                value={value}
                onChange={onChange}
                label="Nomor BPJS"
                error={errors.insurance_number || false}
                helperText={errors.insurance_number?.message || ""}
              />
            )}
          />
        )}

        <Controller
          control={control}
          name={"family_card_number"}
          rules={{
            required: true,
          }}
          render={({ field: { onChange, onBlur, value } }) => (
            <Input
              label="Nomor KK"
              onChange={onChange}
              error={errors.family_card_number || false}
              helperText={errors.family_card_number?.message || ""}
            />
          )}
        />

        <Controller
          control={control}
          name="religion"
          rules={{
            required: true,
          }}
          render={({ field: { onChange, onBlur, value } }) => (
            <AutocompleteBox
              onChange={(e: any, newVal: any) => onChange(newVal)}
              label="Agama"
              options={masterOptions.religion}
              error={errors.religion || false}
              helperText={errors.religion?.message || ""}
            />
          )}
        />

        <Controller
          control={control}
          name="gender"
          rules={{
            required: true,
          }}
          render={({ field: { onChange, onBlur, value } }) => (
            <AutocompleteBox
              onChange={(e: any, newVal: any) => onChange(newVal)}
              label="Jenis Kelamiin"
              options={masterOptions.jenkel}
              error={errors.gender || false}
              helperText={errors.gender?.message || ""}
            />
          )}
        />

        <Controller
          control={control}
          name="place_of_birth"
          rules={{
            required: true,
          }}
          render={({ field: { onChange, onBlur, value } }) => (
            <Input
              label="Tempat Lahir"
              onChange={onChange}
              error={errors.place_of_birth || false}
              helperText={errors.place_of_birth?.message || ""}
            />
          )}
        />

        <Controller
          control={control}
          name="date_of_birth"
          rules={{
            required: true,
          }}
          render={({ field: { onChange, onBlur, value } }) => (
            <Input
              type="date"
              label="Tanggal Lahir"
              onChange={onChange}
              error={errors.date_of_birth || false}
              helperText={errors.date_of_birth?.message || ""}
            />
          )}
        />

        <Controller
          control={control}
          name={"area"}
          rules={{
            required: true,
          }}
          render={({ field: { onChange, onBlur, value } }) => (
            <AutocompleteBox
              onChange={(e: any, newValue: string) => {
                if (e.target.value && !newValue) {
                  props.onAreaSearchParamChanged(e.target.value);
                }
                onChange(newValue);
              }}
              label={"Alamat 1"}
              required
              optionLabel={"address"}
              error={errors.area || false}
              helperText={errors.area?.message || ""}
              options={props.areaOptions}
            />
          )}
        />

        <Controller
          control={control}
          name="address"
          rules={{
            required: true,
          }}
          render={({ field: { onChange, onBlur, value } }) => (
            <Input
              label="Alamat 2"
              onChange={onChange}
              error={errors.address || false}
              helperText={errors.address?.message || ""}
            />
          )}
        />

        <Controller
          control={control}
          name="rt"
          rules={{
            required: true,
          }}
          render={({ field: { onChange, onBlur, value } }) => (
            <Input
              label="RT"
              onChange={onChange}
              error={errors.rt || false}
              helperText={errors.rt?.message || ""}
            />
          )}
        />

        <Controller
          control={control}
          name="rw"
          rules={{
            required: true,
          }}
          render={({ field: { onChange, onBlur, value } }) => (
            <Input
              label="RW"
              onChange={onChange}
              error={errors.rw || false}
              helperText={errors.rw?.message || ""}
            />
          )}
        />

        <Controller
          control={control}
          name="postal_code"
          rules={{
            required: true,
          }}
          render={({ field: { onChange, onBlur, value } }) => (
            <Input
              label="Kode Pos"
              onChange={onChange}
              error={errors.postal_code || false}
              helperText={errors.postal_code?.message || ""}
            />
          )}
        />

        <Controller
          control={control}
          name="phone_number"
          rules={{
            required: true,
          }}
          render={({ field: { onChange, onBlur, value } }) => (
            <Input
              label="No. Telp"
              onChange={onChange}
              error={errors.phone_number || false}
              helperText={errors.phone_number?.message || ""}
            />
          )}
        />

        <Controller
          control={control}
          name="email"
          rules={{
            required: true,
          }}
          render={({ field: { onChange, onBlur, value } }) => (
            <Input
              label="E-mail"
              onChange={onChange}
              error={errors.email || false}
              helperText={errors.email?.message || ""}
            />
          )}
        />

        <Controller
          control={control}
          name="education"
          rules={{
            required: true,
          }}
          render={({ field: { onChange, onBlur, value } }) => (
            <AutocompleteBox
              onChange={(e: any, newValue: any) => onChange(newValue)}
              label="Pendidikan"
              options={masterOptions.education}
              error={errors.education || false}
              helperText={errors.education?.message || ""}
            />
          )}
        />

        <Controller
          control={control}
          name="occupation"
          rules={{
            required: true,
          }}
          render={({ field: { onChange, onBlur, value } }) => (
            <AutocompleteBox
              onChange={(e: any, newValue: any) => onChange(newValue)}
              label="Pekerjaan"
              options={masterOptions.occupation}
              error={errors.occupation || false}
              helperText={errors.occupation?.message || ""}
            />
          )}
        />

        <Controller
          control={control}
          name="tribe"
          rules={{
            required: true,
          }}
          render={({ field: { onChange, onBlur, value } }) => (
            <Input
              label="Suku"
              onChange={onChange}
              error={errors.tribe || false}
              helperText={errors.tribe?.message || ""}
            />
          )}
        />

        <Controller
          control={control}
          name="mother_name"
          rules={{
            required: true,
          }}
          render={({ field: { onChange, onBlur, value } }) => (
            <Input
              label="Nama Ibu Kandung"
              onChange={onChange}
              error={errors.mother_name || false}
              helperText={errors.mother_name?.message || ""}
            />
          )}
        />

        <Controller
          control={control}
          name="marital_status"
          rules={{
            required: true,
          }}
          render={({ field: { onChange, onBlur, value } }) => (
            <AutocompleteBox
              onChange={(e: any, newValue: any) => onChange(newValue)}
              label="Status Kawin"
              options={masterOptions.marital_status}
              error={errors.marital_status || false}
              helperText={errors.marital_status?.message || ""}
            />
          )}
        />

        <Controller
          control={control}
          name="blood_type"
          rules={{
            required: true,
          }}
          render={({ field: { onChange, onBlur, value } }) => (
            <AutocompleteBox
              onChange={(e: any, newValue: string) => onChange(newValue)}
              label="Gol. Darah"
              options={masterOptions.goldar}
              error={errors.blood_type || false}
              helperText={errors.blood_type?.message || ""}
            />
          )}
        />

        <Controller
          control={control}
          name="companion.name"
          render={({ field: { onChange, onBlur, value } }) => (
            <Input
              label="Penanggung Jawab"
              onChange={onChange}
              error={errors.companion?.name || false}
              helperText={errors.companion?.name?.message || ""}
            />
          )}
        />

        <Controller
          control={control}
          name="companion.relationship"
          render={({ field: { onChange, onBlur, value } }) => (
            <AutocompleteBox
              onChange={(e: any, newValue: any) => onChange(newValue)}
              label="Hubungan dengan Penanggung Jawab"
              options={masterOptions.relationship}
              error={errors.companion?.relationship || false}
              helperText={errors.companion?.relationship?.message || ""}
            />
          )}
        />

        <Controller
          control={control}
          name="companion.gender"
          render={({ field: { onChange, onBlur, value } }) => (
            <AutocompleteBox
              onChange={(e: any, newValue: any) => onChange(newValue)}
              label="Jenis Kelamin Penanggung Jawab"
              options={masterOptions.jenkel}
              error={errors.companion?.gender || false}
              helperText={errors.companion?.gender?.message || ""}
            />
          )}
        />

        <Controller
          control={control}
          name="companion.phone_number"
          render={({ field: { onChange, onBlur, value } }) => (
            <Input
              label="No. Telp Penanggung Jawab"
              onChange={onChange}
              error={errors.companion?.phone_number || false}
              helperText={errors.companion?.phone_number?.message || ""}
            />
          )}
        />

        <Controller
          control={control}
          name="companion.date_of_birth"
          render={({ field: { onChange, onBlur, value } }) => (
            <Input
              label="Tgl Lahir Penanggung Jawab"
              onChange={onChange}
              type="date"
              error={errors.companion?.date_of_birth || false}
              helperText={errors.companion?.date_of_birth?.message || ""}
            />
          )}
        />

        <Controller
          control={control}
          name="companion.address"
          render={({ field: { onChange, onBlur, value } }) => (
            <Input
              label="Alamat Penanggung Jawab"
              onChange={onChange}
              error={errors["companion"]?.address || false}
              helperText={errors["companion"]?.address?.message || ""}
            />
          )}
        />
        <Button sx={{ display: "none" }} type="submit" ref={refButton}>
          {" "}
          Submit{" "}
        </Button>
      </form>
    </Box>
  );
});