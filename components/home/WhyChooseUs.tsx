export default function WhyChooseUs() {
  return (
    <section className="py-5 choose-us">
      <div className="container">
        <div className="text-center mb-5">
          <h2 className="fw-bold">Why Choose Us?</h2>
        </div>

        <div className="row justify-content-center g-4">
          <div className="col-md-2 col-sm-6 col-6">
            <div className="card border rounded p-4 h-100">
              <h5 className="mb-3">Expert Technicians</h5>
              <p>Skilled professionals with years of repair experience.</p>
            </div>
          </div>

          <div className="col-md-2 col-sm-6 col-6">
            <div className="card border rounded p-4 h-100">
              <h5 className="mb-3">Doorstep Service</h5>
              <p>We visit your home or office for hassle-free repairs.</p>
            </div>
          </div>

          <div className="col-md-2 col-sm-6 col-6">
            <div className="card border rounded p-4 h-100">
              <h5 className="mb-3">Quality Parts</h5>
              <p>Premium replacement components with warranty.</p>
            </div>
          </div>

          <div className="col-md-2 col-sm-6 col-6">
            <div className="card border rounded p-4 h-100">
              <h5 className="mb-3">Easy Booking</h5>
              <p>Schedule your repair online in just a few clicks.</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
