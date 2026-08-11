import BlackLogo from "../logo/BlackLogo";

export default function InvoiceHeader() {
  return (
    <>
      <div className="row">
        <div className="col-12">
          <div className="text-center py-3">
            <BlackLogo />
          </div>
          <p className="fw-bold text-center mt-2">
            RAJESH ENTERPRISES
            <span className="fw-normal d-block text-capitalize">
              Kumharpatti Road, Near Hanuman Mandir, Manaitanr, Dhanbad,
              Jharkhand 826001
            </span>
            <span className="fw-normal d-block text-capitalize">
              GSTIN: 20CWDPS2561K1ZI
            </span>
            <span className="fw-normal d-block">
              Tel: 0326 3564104 (admin@zhelps.in | www.zhelps.in)
            </span>
          </p>
        </div>
      </div>
    </>
  );
}
