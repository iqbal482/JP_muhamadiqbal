// import { RegistrationView } from "@components/templates/e-registration";
import { withAuthSSR } from "@components/__hocs/with-auth-ssr";
import withLayouts from "@components/__hocs/withLayouts";
import { API } from "@configs";
import moment from "moment";
import { useSession } from "next-auth/react";
import dynamic from "next/dynamic";
import { useRouter } from "next/router";
import { useEffect, useRef, useState } from "react";

const RegistrationView = dynamic(
  () => import("@components/templates/e-registration"),
  { ssr: false, loading: () => <div>Loading...</div> }
);

/**
 * 描述
 * @date 2022-09-11
 * @return {React.Component}
 */
function Registration({user, showAlert}: any) {
  const router = useRouter();
  const [currentStep, setCurrentStep] = useState(1);
  const [patientRegistration, setPatientRegistration] = useState<any>({
    type: null,
    identity_number: user.profile.nik,
    full_name: user.profile.name,
    medical_facility_id: null,
  });
  const registrationPatientRef = useRef(null);
  const [doctors, setDoctors] = useState<any[]>([]);
  const [doctorSelected, setDoctorSelected] = useState<any | null>(null);
  const session = useSession();
  const [areaOptions, setAreasOptions] = useState<any[]>([]);
  const [faskesList, setFaskesList] = useState<any[]>([]);
  const [patientFound, setPatientFound] = useState(false);
  const [polyOptions, setPolyOptions] = useState<any[]>([]);
  const [quotaData, setQuotaData] = useState<any>(null);

  const handleFaskesTypeSelected = async (value: string) => {
    setPatientRegistration({...patientRegistration, type: value});
    const res = await new API(null, "/api/")
      .post("fetcher")
      .payload({
        url: "v1-mobile/medical-facilities",
        method: "get",
        payload: {
          type: value,
          sort: "-id",
          limit: -1,
        },
        token: session.data?.accessToken,
      })
      .fetch();
    const {data, error} = res;
  
    if(data.data && !error){
      setFaskesList(data.data.data);
      setCurrentStep(2);
    }else{
      // error warning
    }
  }

  const handleStepSelected = (step: number) => {
    setCurrentStep(step);
  }

  const handleSubmit = async () => {
    console.log(patientRegistration);
    const payload = {
      medical_facility_id: patientRegistration.faskes.id,
      poly_code: patientRegistration.poli.value,
      poly_name: patientRegistration.poli.desc,
      date: moment(patientRegistration.appointment_date).format("YYYY-MM-DD"),
      start_time: doctorSelected?.times[patientRegistration?.timeIndex || -1]?.start_time || "",
      end_time: doctorSelected?.times[patientRegistration?.timeIndex || -1]?.end_time || "",
      doctor_id: doctorSelected?.id || "",
      doctor_name: doctorSelected?.name || "",
      insurance: patientRegistration.insurance.value,
      health_insurance: patientRegistration.insurance.label,
      insurance_number: patientRegistration.insurance_number || '0000000000',
      referral_number: patientRegistration.referral_number || null,
      id_number: patientRegistration.identity_number,
      medical_record_number: patientRegistration.medical_record_number,
    };
    
    console.log(payload)

    const res = await new API(null, "/api/")
      .post("fetcher")
      .payload({
        url: "v1-mobile/appointments",
        method: "post",
        payload,
        token: session.data?.accessToken,
      })
      .fetch();

    const {data, error} = res.data

    if (error) {
      showAlert({open: true, message: error.message, severity: "error"});
    }
    if (data) {
      showAlert({ open: true, message: "Perjanjian Berhasil Dibuat", severity: "success" });
      router.replace("/kunjungan");
    }
  }

  const handleSearchArea = async (e: any) => {
    console.log(e);
    const res = await new API(null, "/api/")
      .post("fetcher")
      .payload({
        url: "v1-mobile/globals/areas?filter=",
        method: 'get',
        payload: {
          filter: e
        },
        token: session.data?.accessToken
      }).fetch();

    const { data, error } = res;
    if(data.data && !error){
      setAreasOptions(data.data.data);
    }
  }

  const handleFaskesSelected = async (value: any) => {
    if(!value) return
    setPatientRegistration((old: any) => {
      return {
        ...old,
        medical_facility_id: value.id,
        medical_facility_name: value.name,
        faskes: value,
      }
    });

    const resPolies = await new API(null, "/api/")
      .post("fetcher")
      .payload({
        url: "v1-mobile/medical-facilities/" + value.id,
        method: "get",
        payload: {
          with: "polyclinics",
        },
        token: session.data?.accessToken,
      }).fetch();

    const { data: polies, error } = resPolies;

    if(polies.data && !error){
      console.log(polies.data.data);
      setPolyOptions(polies.data.data.polyclinics);
    }else{
      setPolyOptions([]);
    }

    getPatient(value.id)

    // const registeredPatientRes = await new API(null, "/api/")
    //   .post("fetcher")
    //   .payload({
    //     url: `v1-mobile/medical-facilities/${value.id}/patients`,
    //     method: "get",
    //     payload: {
    //       id_type: 'KTP',
    //       id_number: patientRegistration.identity_number,
    //     },
    //     token: session.data?.accessToken,
    //   })
    //   .fetch();

    // const { data: registeredPatient, error: errorRegisteredPatient } = registeredPatientRes;

    // if (registeredPatient.data && !errorRegisteredPatient) {
    //   await setPatientFound(true);
    //   await setPatientRegistration((old: any) => {
    //     return {
    //       ...old,
    //       ...patientRegistration,
    //       medical_record_number: registeredPatient.data.data.noMR,
    //     };
    //   });
    // } else {
    //   await setPatientFound(false);
    // }
  }

  const getPatient = async (faskesId: string) => {
    const registeredPatientRes = await new API(null, "/api/")
      .post("fetcher")
      .payload({
        url: `v1-mobile/medical-facilities/${faskesId}/patients`,
        method: "get",
        payload: {
          id_type: "KTP",
          id_number: patientRegistration.identity_number,
        },
        token: session.data?.accessToken,
      })
      .fetch();

    const { data: registeredPatient, error: errorRegisteredPatient } =
      registeredPatientRes;

    if (registeredPatient.data && !errorRegisteredPatient) {
      await setPatientFound(true);
      await setPatientRegistration((old: any) => {
        return {
          ...old,
          ...patientRegistration,
          medical_record_number: registeredPatient.data.data.noMR,
        };
      });
    } else {
      await setPatientFound(false);
    }
  }

  const handleDateSelected = async (date?: moment.Moment) => {
    setPatientRegistration({
      ...patientRegistration,
      appointment_date: date ? date.format("YYYY-MM-DD") : patientRegistration.appointment_date,
    });

    if (!patientRegistration.faskes) return;
    if (!patientRegistration.poli) return;
    // fetch doctor
    const res = await new API(null, "/api/")
      .post("fetcher")
      .payload({
        url: `v1-mobile/medical-facilities/${patientRegistration.faskes.id}/schedules`,
        method: "get",
        payload: {
          date: date?.format("YYYY-MM-DD") || patientRegistration.appointment_date,
          polyclinic: patientRegistration.poli.value,
        },
        token: session.data?.accessToken,
      })
      .fetch();
    const { data, error } =res;
    if (data.data && !error) {
      if(patientRegistration.type == 'PUSKESMAS'){
        setQuotaData(data.data.data[0])
      }else{
        const doctors = data.data.data.map((item: any) => {
          return {
            id: item.doctorId,
            name: item.doctorName,
            times: item.times || [],
          };
        });
        setDoctors(doctors);
      }
    }else{
      setDoctors([]);
    }
  }

  const registerNewPatient = async (e: any) => {
    const payload = { ...e }
    payload.province = e.area.province_id;
    payload.regency = e.area.regency_id;
    payload.district = e.area.district_id;
    payload.village = e.area.village_id;
    payload.medical_facility_id = patientRegistration.faskes.id;
    payload.nik = e.identity_number;
    payload.name = e.full_name;
    
    
    Object.keys(payload).forEach(
      (key) => {
        if(key != "companion")
          payload[key] = payload[key] instanceof Object ? payload[key]["id"] : payload[key]
      }
    );
    Object.keys(payload.companion).forEach((key) => {
      payload.companion[key] = payload.companion[key] instanceof Object ? payload.companion[key]["id"] : payload.companion[key];
    });

    payload.insurance_number = payload.insurance == "0" ? "" : e.insurance_number;
    delete payload.type;
    delete payload.full_name;
    delete payload.faskes;
    delete payload.medical_record_number;
    delete payload.area
    console.log(payload);
    const res = await new API(null, "/api/")
      .post("fetcher")
      .payload({
        url: `v1-mobile/medical-facilities/${patientRegistration.faskes.id}/patients`,
        method: "post",
        payload,
        token: session.data?.accessToken,
      })
      .fetch();
    const { data, error } = res.data;
    if (error) {
      showAlert({ open: true, message: error.message, severity: "error" });
    }
    if (data) {
      showAlert({
        open: true,
        message: "Pendaftaran Pasien Berhasil, Silakan Lanjutkan Proses Perjanjian",
        severity: "success",
      });
      await getPatient(payload.medical_facility_id);
      setCurrentStep(old => old + 1);
    }
  }
  
  useEffect(() => {
    if(patientRegistration.faskes){
      handleDateSelected();
      setDoctorSelected(null);
    }
  }, [patientRegistration.poli])

  return (
    <RegistrationView
      currentStep={currentStep}
      onFaskesTypeSelected={handleFaskesTypeSelected}
      onNext={() => setCurrentStep((old) => old + 1)}
      onPrev={() => setCurrentStep((old) => old - 1)}
      onFaskesSelected={handleFaskesSelected}
      onStepSelected={handleStepSelected}
      onSubmit={handleSubmit}
      value={patientRegistration}
      onFormRegistrationPatientChanged={(name, value) =>
        setPatientRegistration({ ...patientRegistration, [name]: value })
      }
      registrationPatientRef={registrationPatientRef}
      patientFound={patientFound}
      onDateSelected={handleDateSelected}
      doctors={doctors}
      doctorSelected={doctorSelected}
      onDoctorSelected={(doctor: any) => setDoctorSelected(doctor)}
      handleSearchArea={handleSearchArea}
      areaOptions={areaOptions}
      faskeList={faskesList}
      polyOptions={polyOptions}
      onNewPatientRegistration={registerNewPatient}
      quotaData={quotaData}
    />
  );
}

export const getServerSideProps = withAuthSSR(
  async (context: any, user: any) => {
    return user;
  }
);

Registration.getLayout = (page: any) => withLayouts(page, {mode: 'mobile'});

export default Registration;