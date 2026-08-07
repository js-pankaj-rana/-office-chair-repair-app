import { Card } from "react-bootstrap";
import CustomerReview from "./CustomerReview";

export interface PreferredAgent {
  id: number;
  agentName: string;
  agentImage: string;
  review: string;
  memberSince: string;
}

export const preferredAgents: PreferredAgent[] = [
  {
    id: 1,
    agentName: "Ayush Gupta",
    agentImage: "ayush_gupta.jpeg",
    review:
      "I was about to replace my office chair, but their repair service made it feel brand new. Excellent workmanship and genuine parts. Highly recommended!",
    memberSince: "09-06-2025",
  },
  {
    id: 2,
    agentName: "Anita Sharma",
    agentImage: "Anita.jpg",
    review:
      "My office chair was making annoying noises and the hydraulic lift had stopped working. The technician repaired it quickly using quality replacement parts. It now works perfectly, and I saved a lot compared to buying a new chair.",
    memberSince: "02-07-2025",
  },
  {
    id: 3,
    agentName: "Rajesh Sharma",
    agentImage: "rajesh-sharma.png",
    review:
      "I wasn't sure my old chair could be repaired, but the team exceeded my expectations. The repair was fast, affordable, and the chair looks and feels as good as new. Outstanding customer service!",
    memberSince: "24-07-2025",
  },
  {
    id: 4,
    agentName: "Shushma Soni",
    agentImage: "sushma1.png",
    review:
      "Professional technicians, transparent pricing, and excellent quality. They restored my damaged office chair within a day, and it's now more comfortable than ever. I would definitely recommend their service.",
    memberSince: "26-08-2025",
  },
];

export default function Testimonials() {
  return (
    <section className="py-5">
      <div className="container">
        <div className="text-center mb-5">
          <h2>Trusted by Hundreds of Happy Customers</h2>
        </div>
        <div className="row g-4">
          {preferredAgents.map((agent) => (
            <div className="col-md-3" key={agent.id}>
              <CustomerReview {...agent} />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
