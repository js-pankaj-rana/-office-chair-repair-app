import Image from "next/image";
import { HERO_SHOT } from "@/constants/heroshot";

interface Props {
  handleBooking: () => void;
  // hasCtaPress: boolean;
}

export default function HeroShot({ handleBooking }: Props) {
  const { badge, title, description, ctaText, stats } = HERO_SHOT;

  return (
    <section className="bg-dark text-white py-5">
      <div className="container">
        <div className="row align-items-center">
          <div className="col-lg-7">
            <span className="badge bg-danger mb-3 px-3 py-2">{badge}</span>
            <h1 className="display-4 fw-bold mb-3">{title}</h1>
            <p className="lead text-light mb-4">
              {description.before}
              <strong>{description.gasCylinder}</strong>,
              <strong> {description.basePlate}</strong>, and
              <strong>{description.starBase}</strong>
              {description.after}
            </p>

            <div className="d-flex flex-wrap gap-3">
              <button
                className="btn btn-danger btn-lg px-4 booking-button"
                // disabled={hasCtaPress}
                onClick={handleBooking}
              >
                {ctaText}
              </button>
            </div>

            <div className="row mt-5">
              {stats.map(({ value, label }) => (
                <div
                  key={value.split(" ").join("_")}
                  className="col-6 col-md-3"
                >
                  <h3 className="fw-bold">{value}</h3>
                  <small>{label}</small>
                </div>
              ))}
            </div>
          </div>

          <div className="col-lg-5 text-center mt-5 mt-lg-0">
            <Image
              src="/images/office-chair.png"
              alt="Office Chair"
              className="img-fluid heroshot-img"
              width="300"
              height="300"
            />
          </div>
        </div>
      </div>
    </section>
  );
}
