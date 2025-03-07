import AppointmentForm from "@/components/forms/AppointmentForm"
import { getPatient } from "@/lib/actions/patient.actions"
import Image from "next/image"

const NewAppointment = async({ params }: SearchParamProps) => {
  const { userid } = await params
  const patient = await getPatient(userid);


  return (
    <div className="flex h-screen max-h-screen">

      <section className="remove-scrollbar container my-auto">
        <div className="sub-container max-w-[860px] flex-1 justify-between">
          <Image
            src="/assets/icons/logo-full.svg"
            height={1000}
            width={1000}
            alt="patient"
            className="mb-12 h-10 w-fit"
          />

          <AppointmentForm 
            userId={userid}
            patientId={patient.$id}
            type="create"
          />

          <p className="copyright py-12">
            &copy; 2024 CarePoint
          </p>
        </div>
      </section>

      <Image
        src="/assets/images/appointment-img.png"
        height={1000}
        width={1000}
        alt="patient"
        className="side-img max-w-[390px]"
      />
    </div>
  )
}

export default NewAppointment;