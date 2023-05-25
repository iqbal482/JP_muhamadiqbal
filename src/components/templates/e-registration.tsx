import { CheckBox } from "@components/atoms/checkbox";
import { Input } from "@components/atoms/input";
import { DatePickerBlock } from "@components/atoms/static-date-picker";
import { DoctorList, WizardStepAction } from "@components/molecules";
import { AccordionComponent } from "@components/molecules/accordion";
import { AutocompleteBox } from "@components/molecules/autocomplete";
import { NewPatientRegistration } from "@components/organisms/new-patient-registration";
import { Alert, Button, Divider, SvgIcon, Typography, Grid } from "@mui/material";
import Box from "@mui/material/Box";
import CssBaseline from "@mui/material/CssBaseline";
import { Stack } from "@mui/system";
import { Copyright } from "@organisms";
import moment from "moment";
import { FormEvent } from "react";
import PuskesmasIcon from '../../assets/icon/svg/Reg-pkc.svg';
import RSUDIcon from "../../assets/icon/svg/Reg-rs.svg";

type RegistrationViewType = {
  currentStep: number;
  onFaskesTypeSelected: (type: string) => void;
  onNext: () => void;
  onPrev: () => void;
  onStepSelected: (step: number) => void;
  onSubmit: (e: FormEvent) => void;
  onFaskesSelected: (value: string) => void;
  onFormRegistrationPatientChanged: (name: string, value: any) => void;
  value: any;
  patientFound: boolean;
  registrationPatientRef: any;
  onDateSelected: (date?: moment.Moment) => void;
  doctors: any[];
  doctorSelected: any | null;
  onDoctorSelected: (doctor: any) => void;
  handleSearchArea: (e: any) => void;
  areaOptions: any[];
  faskeList: any[];
  polyOptions: any[];
  onNewPatientRegistration: (e: FormEvent) => void;
  quotaData: any;
};

export const RegistrationView = ({
  currentStep,
  onFaskesTypeSelected,
  onNext,
  onPrev,
  onStepSelected,
  onSubmit,
  onFaskesSelected,
  onFormRegistrationPatientChanged,
  value,
  patientFound = false,
  registrationPatientRef,
  onDateSelected,
  doctors,
  doctorSelected,
  onDoctorSelected,
  handleSearchArea,
  areaOptions,
  faskeList,
  polyOptions,
  onNewPatientRegistration,
  quotaData,
}: RegistrationViewType) => {
  return (
    <>
      <CssBaseline />
      <Box sx={{ mt: 1 }}>
        <AccordionComponent
          title={"Pilih Tipe Faskes"}
          expanded={currentStep === 1}
          onChange={() => onStepSelected(currentStep === 1 ? 0 : 1)}
        >
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
            }}
          >
            <Button
              onClick={() => onFaskesTypeSelected("PUSKESMAS")}
              variant="outlined"
              sx={{
                width: "100%",
                height: "100px",
                marginRight: "10px",
              }}
            >
              <Box
                sx={{
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                }}
              >
                <Box sx={{ flex: 1 }}>
                  <SvgIcon component={PuskesmasIcon} inheritViewBox />
                </Box>
                <Box sx={{}}>Puskesmas</Box>
              </Box>
            </Button>

            <Button
              onClick={() => onFaskesTypeSelected("RSUD")}
              component={"button"}
              variant="outlined"
              sx={{
                width: "100%",
                height: "100px",
              }}
            >
              <Box
                sx={{
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                }}
              >
                <Box sx={{ flex: 1 }}>
                  {" "}
                  <SvgIcon component={RSUDIcon} inheritViewBox />
                </Box>
                <Box sx={{}}>RSUD</Box>
              </Box>
            </Button>
          </Box>
        </AccordionComponent>
        {/* Step 2 Data Dasar Pasien */}
        <AccordionComponent
          disabled={currentStep < 2}
          title={"Isi Data Dasar Pasien"}
          expanded={currentStep === 2}
          onChange={() => onStepSelected(currentStep === 2 ? 0 : 2)}
        >
          <Input
            sx={{ width: "100%" }}
            required
            onChange={(e: any) =>
              onFormRegistrationPatientChanged(
                "identity_number",
                e.target.value
              )
            }
            inputProps={{ inputMode: "numeric", pattern: "[0-9]*" }}
            error={false}
            label={"Nomor Induk Kependudukan"}
            value={value.identity_number}
            name={"identity_number"}
          />

          <Input
            sx={{ width: "100%" }}
            required
            error={false}
            onChange={(e: any) =>
              onFormRegistrationPatientChanged("full_name", e.target.value)
            }
            label={"Nama Lengkap"}
            value={value.full_name}
            name={"full_name"}
          />

          <AutocompleteBox
            onChange={(e: any, newValue: any) =>
              onFormRegistrationPatientChanged("insurance", newValue)
            }
            label={"Jenis Pasien"}
            name={"insurance"}
            required
            options={[
              { id: "1", label: "BPJS" },
              { id: "0", label: "UMUM" },
            ]}
          />
          {value.insurance?.id === "1" && (
            <Input
              sx={{ width: "100%" }}
              required
              onChange={(e: any) =>
                onFormRegistrationPatientChanged(
                  "insurance_number",
                  e.target.value
                )
              }
              inputProps={{ inputMode: "numeric", pattern: "[0-9]*" }}
              error={false}
              label={"Nomor BPJS"}
              defaultValue={""}
              name={"insurance_number"}
            />
          )}
          <WizardStepAction
            canNext={
              value.identity_number &&
              value.full_name &&
              value.insurance &&
              ((value.insurance.id === "1" && value.insurance_number) ||
                value.insurance.id === "0")
            }
            onNext={onNext}
            onPrev={onPrev}
            variant={"outlined"}
          />
        </AccordionComponent>
        {/* End of Step 2 */}

        {/* Step 3 Pilih Faskes */}
        <AccordionComponent
          disabled={currentStep < 3}
          title={"Pilih Faskes"}
          expanded={currentStep === 3}
          onChange={() => onStepSelected(currentStep === 3 ? 0 : 3)}
        >
          {value.insurance &&
            value.insurance.value == 1 &&
            value.type == "RSUD" && (
              <Alert severity="info" sx={{ mb: 1.5 }}>
                Pastikan Memilih RSUD sesuai Rujukan yang anda miliki
              </Alert>
            )}
          {value.insurance &&
            value.insurance.value == 1 &&
            value.type == "PUSKESMAS" && (
              <Alert severity="info" sx={{ mb: 1.5 }}>
                Pastikan Memilih Puskesmas sesuai lokasi pelayanan kesehatan
                pada Fasilitas Kesehatan Tingkat Pertama anda terdaftar
              </Alert>
            )}
          <AutocompleteBox
            onChange={(e: any, newValue: string) => {
              onFaskesSelected(newValue);
            }}
            label={"Pilih Fasilitas Kesehatan"}
            name={"faskes"}
            optionLabel={"name"}
            required
            options={faskeList}
          />
          {value.faskes && !patientFound && (
            <NewPatientRegistration
              ref={registrationPatientRef}
              defaultValue={value}
              onAreaSearchParamChanged={handleSearchArea}
              onSubmit={(e: any) => {
                onNewPatientRegistration(e);
              }}
              areaOptions={areaOptions}
            />
          )}
          <WizardStepAction
            canNext={
              value.faskes &&
              (patientFound || (registrationPatientRef && !patientFound))
            }
            onNext={() => {
              if (registrationPatientRef && !patientFound)
                registrationPatientRef.current.submitForm();
              else onNext();
            }}
            onPrev={onPrev}
            variant={"outlined"}
          />
        </AccordionComponent>
        {/* End Of Step 3 */}

        {/* Step 4 Pilih Jadwal */}
        <AccordionComponent
          disabled={currentStep < 4}
          title={"Pilih Poli dan Jadwal Kunjungan"}
          expanded={currentStep === 4}
          onChange={() => onStepSelected(currentStep === 4 ? 0 : 4)}
        >
          <AutocompleteBox
            onChange={(e: any, newValue: string) => {
              onFormRegistrationPatientChanged("poli", newValue);
            }}
            label={"Pilih Poliklinik"}
            name={"poly"}
            error={!value.poli && value.appointment_date}
            optionLabel={"desc"}
            required
            options={polyOptions}
          />
          <Box>
            <DatePickerBlock
              onChange={onDateSelected}
              value={value.appointment_date}
            />
          </Box>

          {doctors.length > 0 && (
            <>
              <Divider />
              <Box>
                <h4>Pilih Dokter</h4>
                <DoctorList
                  datas={doctors}
                  selected={doctorSelected}
                  onSelected={onDoctorSelected}
                  selectedTime={value.timeIndex}
                  onTimeSelected={(index: number, value: any) => {
                    onFormRegistrationPatientChanged("time", value);
                    onFormRegistrationPatientChanged(
                      "timeIndex",
                      index.toString()
                    );
                  }}
                />
              </Box>
            </>
          )}

          {(value.type == 'PUSKESMAS' && quotaData) && (
            <></>
          )}
          {/* {JSON.stringify(quotaData)} */}
          
          <Grid container>
            <Grid container xs={6}>
              <Grid xs={5}>
                <h4>Kuota</h4>
                <h4>Sisa Kuota</h4>
              </Grid>
              <Grid xs={1}>
                <h4>:</h4>
                <h4>:</h4>
              </Grid>
              <Grid>
                <h4>{quotaData?.kuota}</h4>
                <h4>{quotaData?.sisakuota}</h4>
              </Grid>
            </Grid>
            <Grid container xs={6}>
              <Grid xs={5}>
                <h4>Antrean</h4>
                <h4>Sisa Antrean</h4>
              </Grid>
              <Grid xs={1}>
                <h4>:</h4>
                <h4>:</h4>
              </Grid>
              <Grid>
                <h4>{quotaData?.totalantrean}</h4>
                <h4>{quotaData?.sisaantrean}</h4>
              </Grid>
            </Grid>
          </Grid>

          <WizardStepAction
            canNext={
              value.appointment_date &&
              (doctorSelected || value.type == "PUSKESMAS")
            }
            onNext={onNext}
            onPrev={onPrev}
            variant={"outlined"}
          />
        </AccordionComponent>
        {/* End Of Step 4 */}

        {/* Step 5 Summary */}
        <AccordionComponent
          disabled={currentStep < 5}
          title={"Ringkasan Jadwal Kunjungan"}
          expanded={currentStep === 5}
          onChange={() => onStepSelected(currentStep === 5 ? 0 : 5)}
        >
          <Box sx={{ mb: 2 }}>
            <h4 style={{ marginTop: 0 }}>Ringkasan Jadwal Kunjungan</h4>
            <Stack direction={"column"} spacing={1}>
              <Box>
                <Typography variant="body2" color="text.secondary">
                  Nama Pasien
                </Typography>
                <Typography variant="body1" color="text.primary">
                  {value.full_name}
                </Typography>
              </Box>
              <Box>
                <Typography variant="body2" color="text.secondary">
                  Poliklinik
                </Typography>
                <Typography variant="body1" color="text.primary">
                  {value.poli?.desc}
                </Typography>
              </Box>
              <Box>
                <Typography variant="body2" color="text.secondary">
                  Waktu Kunjungan
                </Typography>
                <Typography variant="body1" color="text.primary">
                  {value.poli?.desc}
                </Typography>
              </Box>
              {doctorSelected && (
                <Box>
                  <Typography variant="body2" color="text.secondary">
                    Dokter
                  </Typography>
                  <Typography variant="body1" color="text.primary">
                    {value.poli?.desc}
                  </Typography>
                </Box>
              )}
            </Stack>
          </Box>
          <Divider />
          <Box sx={{ mb: 3 }}>
            <h4>Informasi Pasien</h4>
            <Stack
              direction={"column"}
              spacing={1}
              divider={<Divider sx={{ mt: 1 }} />}
            >
              <Stack
                justifyContent={"space-between"}
                direction={"row"}
                flexWrap={{ xs: "wrap", sm: "nowrap" }}
              >
                <Typography variant="body2" color="text.secondary">
                  NIK
                </Typography>
                <Typography variant="body1" color="text.primary">
                  {value.nik || value.identity_number}
                </Typography>
              </Stack>
              <Stack
                justifyContent={"space-between"}
                direction={"row"}
                flexWrap={{ xs: "wrap", sm: "nowrap" }}
              >
                <Typography variant="body2" color="text.secondary">
                  Nama Pasien
                </Typography>
                <Typography variant="body1" color="text.primary">
                  {value.full_name}
                </Typography>
              </Stack>
              <Stack
                justifyContent={"space-between"}
                direction={"row"}
                flexWrap={{ xs: "wrap", sm: "nowrap" }}
              >
                <Typography variant="body2" color="text.secondary">
                  Jenis Pasien
                </Typography>
                <Typography variant="body1" color="text.primary">
                  {value.insurance?.value == 1 ? "BPJS" : "Umum"}
                </Typography>
              </Stack>
              <Stack
                justifyContent={"space-between"}
                direction={"row"}
                flexWrap={{ xs: "wrap", sm: "nowrap" }}
              >
                <Typography variant="body2" color="text.secondary">
                  No. BPJS
                </Typography>
                <Typography variant="body1" color="text.primary">
                  {value.insurance?.value == 1 ? value.insurance_number : "-"}
                </Typography>
              </Stack>
            </Stack> 
          </Box>
          <CheckBox
            options={[
              {
                label:
                  "Dengan ini saya menyatakan menyetujui segala kebijakan dari dinas kesehatan DKI Jakarta",
                value: "agree",
              },
            ]}
            value={value.agree ? "agree" : ""}
            onChange={(e: any) => {
              onFormRegistrationPatientChanged("agree", e.target.checked);
            }}
          />
          <WizardStepAction
            isLastStep
            canNext={value.agree}
            onFinish={onSubmit}
            onPrev={onPrev}
            variant={"outlined"}
          />
        </AccordionComponent>
        {/* End Of Step 5 */}
      </Box>
      <Copyright sx={{ mt: 8, mb: 4 }} />
    </>
  );
};

export default RegistrationView;