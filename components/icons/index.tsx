import React from "react";
// import "./style.css";

export const IconBooking = (props: React.SVGProps<SVGSVGElement>) => (
  <svg
    width="64"
    height="64"
    viewBox="0 0 64 64"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <g
      stroke="#7B2CBF"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <rect x="10" y="10" width="40" height="28" rx="3" />
      <line x1="15" y1="18" x2="28" y2="18" />
      <line x1="15" y1="24" x2="28" y2="24" />
      <line x1="15" y1="30" x2="28" y2="30" />
      <rect x="32" y="16" width="13" height="14" rx="2" />
      <line x1="30" y1="38" x2="30" y2="46" />
      <line x1="18" y1="46" x2="42" y2="46" />
    </g>
  </svg>
);

export const IconReview = (props: React.SVGProps<SVGSVGElement>) => (
  <svg
    width="64"
    height="64"
    viewBox="0 0 64 64"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <circle cx="26" cy="26" r="16" stroke="#7B2CBF" strokeWidth="2.5" />
    <line
      x1="37.5"
      y1="37.5"
      x2="51"
      y2="51"
      stroke="#7B2CBF"
      strokeWidth="2.5"
      strokeLinecap="round"
    />
    <path
      d="M17 26C19.5 21.5 24 19 28 19C32 19 36.5 21.5 39 26C36.5 30.5 32 33 28 33C24 33 19.5 30.5 17 26Z"
      stroke="#7B2CBF"
      strokeWidth="2.2"
      strokeLinejoin="round"
    />
    <circle cx="28" cy="26" r="3" fill="#7B2CBF" />
  </svg>
);

export const IconTechnician = (props: React.SVGProps<SVGSVGElement>) => (
  <svg
    width="64"
    height="64"
    viewBox="0 0 64 64"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <g
      stroke="#7B2CBF"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <rect x="14" y="14" width="36" height="34" rx="4" />
      <line x1="14" y1="22" x2="50" y2="22" />
      <line x1="22" y1="10" x2="22" y2="18" />
      <line x1="42" y1="10" x2="42" y2="18" />
      <circle cx="32" cy="34" r="8" />
      <path d="M32 29v5l3 2" />
    </g>
  </svg>
);

export const IconComplete = (props: React.SVGProps<SVGSVGElement>) => (
  <svg
    width="64"
    height="64"
    viewBox="0 0 64 64"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <g
      stroke="#7B2CBF"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <rect x="12" y="12" width="40" height="36" rx="3" />
      <line x1="12" y1="20" x2="52" y2="20" />
      <circle cx="32" cy="34" r="9" />
      <path d="M28 34l3 3 6-6" />
    </g>
  </svg>
);
