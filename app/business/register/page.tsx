import Image from "next/image"
// import Link from "next/link"

import BusinessRegisterForm from "@/components/forms/BusinessRegisterForm"

const Business = () => {
  return (
    <div className="flex h-screen max-h-screen">

      <section className="remove-scrollbar container">
        <div className="sub-container max-w-[860px] flex-1 flex-col py-10">
          <Image
            src="/assets/icons/carepoint-logo.png"
            height={1000}
            width={1000}
            alt="patient"
            className="mb-12 h-10 w-fit"
          />

          <BusinessRegisterForm />

          <p className="copyright py-12">
            &copy; 2024 CarePoint
          </p>
        </div>
      </section>

      <Image
        src="/assets/images/register-img.png"
        height={1000}
        width={1000}
        alt="patient"
        className="side-img max-w-[390px]"
      />
    </div>
  )
}

export default Business