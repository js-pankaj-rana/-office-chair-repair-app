import Image from "next/image";

interface CustomerReviewProps {
  agentName: string;
  agentImage: string;
  review: string;
  memberSince: string;
}

export default function CustomerReview({
  agentName,
  agentImage,
  review,
  memberSince,
}: CustomerReviewProps) {
  return (
    <div className="card review-card">
      {/* Header */}
      <div className="review-header">
        <div className="review-profile">
          <Image
            src={`/profile/${agentImage}`}
            alt={agentName}
            width={44}
            height={44}
            className="review-image"
          />

          <div>
            <span className="review-label">Entrolled on {memberSince}</span>
            <div className="review-name">{agentName}</div>
          </div>
        </div>
      </div>
      {/* Company */}
      <div className="customer-review p-3">
        <p>{review}</p>
      </div>
    </div>
  );
}
