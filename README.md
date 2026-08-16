# Chair Care – Office Chair Repair Service

Chair Care is a modern web application for booking professional **office chair repair and spare-part replacement services**. The platform helps customers repair their office chairs instead of replacing them by connecting them with technicians who can inspect the chair, identify the required spare parts, and complete the repair at the customer's location.

**Live Website:** https://chaircare.zhelps.in/

## Overview

Chair Care focuses on common office chair problems and provides doorstep repair services for components such as:

- Gas cylinders
- Base plates / tilt mechanisms
- Star bases

Customers can submit a repair request online, upload images of their chair or damaged parts, schedule a service, and track the repair workflow.

## Key Features

### Customer Features

- Online office chair repair booking
- Upload chair and damaged-part images
- Spare-part assessment based on uploaded images
- Technician visit scheduling
- Customer address management
- Order and booking management
- Payment integration
- Payment status tracking
- Invoice generation
- Customer reviews and testimonials
- Responsive UI for desktop and mobile devices

### Repair Services

#### Gas Cylinder Replacement

For chairs that:

- Sink while sitting
- Have height-adjustment problems
- Have faulty hydraulic/gas-lift mechanisms

#### Base Plate Replacement

For chairs with:

- Reclining problems
- Locking-mechanism issues
- Damaged or faulty tilt/base plates

#### Star Base Replacement

For chairs with:

- Broken or cracked chair legs
- Stability problems
- Damaged star bases

## Service Workflow

The application follows a simple four-step repair process:

1. **Booking**  
   Customers submit an office chair repair request online.

2. **Spare-Part Review**  
   Uploaded chair images are reviewed to identify the likely replacement parts required.

3. **Technician Visit**  
   A trained technician visits the customer's location with the required parts.

4. **Repair Complete**  
   The repair is completed and the chair is returned to working condition with applicable warranty coverage.

## Technology Stack

### Frontend

- Next.js `16.2.9`
- React `19.2.4`
- TypeScript
- Redux Toolkit
- React Redux
- React Bootstrap
- Bootstrap 5
- Tailwind CSS
- Ant Design-compatible UI ecosystem where required
- React Datepicker
- React Hot Toast
- Chart.js / React Chart.js
- Mapbox GL

### Backend

- Next.js App Router
- Next.js Route Handlers
- MongoDB
- Mongoose
- NextAuth.js
- Node.js
- bcryptjs
- Nodemailer

### APIs & Integrations

- Cloudinary – image/media management
- SME Pay – payment processing
- Vercel – deployment and hosting
- Vercel Analytics – application analytics
- Mapbox – map/location functionality
- Node Geocoder – address/geolocation support

### Document & Invoice Generation

- html2canvas
- jsPDF
- to-words

## Project Structure

The application uses the Next.js App Router architecture.

```text
office-chair-repair-app/
├── app/
│   ├── api/
│   ├── admin/
│   ├── booking/
│   ├── components/
│   ├── ...
│   ├── layout.tsx
│   └── page.tsx
├── backend/
│   ├── models/
│   ├── ...
│   └── database utilities
├── public/
│   ├── images/
│   └── ...
├── components/
├── redux/
├── types/
├── utils/
├── next.config.*
├── package.json
├── tsconfig.json
└── README.md
```

> The exact directory structure may vary as the application evolves.

## Getting Started

### Prerequisites

Make sure the following are installed:

- Node.js 20+
- npm
- MongoDB database
- Cloudinary account
- Payment gateway credentials
- SMTP/email credentials if email notifications are enabled

### Clone the Repository

```bash
git clone <repository-url>
cd office-chair-repair-app
```

### Install Dependencies

```bash
npm install
```

### Environment Variables

Create a `.env.local` file in the project root.

Example:

```env
# Application
NEXTAUTH_URL=http://localhost:3000
NEXTAUTH_SECRET=your_nextauth_secret

# Database
DB_URI=your_mongodb_connection_string

# Cloudinary
NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME=your_cloudinary_cloud_name
CLOUDINARY_API_KEY=your_cloudinary_api_key
CLOUDINARY_API_SECRET=your_cloudinary_api_secret

# Payment Gateway
SMEPAY_BASE_URL=your_payment_gateway_url
SMEPAY_API_KEY=your_payment_api_key

# Email
SMTP_HOST=your_smtp_host
SMTP_PORT=587
SMTP_USER=your_smtp_username
SMTP_PASSWORD=your_smtp_password

# Map / Location
NEXT_PUBLIC_MAPBOX_ACCESS_TOKEN=your_mapbox_token
```

> Use the actual environment variable names defined in the application's source code. Never commit secrets or production credentials to Git.

## Available Scripts

### Development

```bash
npm run dev
```

Starts the Next.js development server.

### Production Build

```bash
npm run build
```

Creates a production build of the application.

### Production Server

```bash
npm run start
```

Starts the application using the production build.

### Lint

```bash
npm run lint
```

Runs ESLint.

### Fix Lint Issues

```bash
npm run lint:fix
```

Automatically fixes supported ESLint issues.

### Format Code

```bash
npm run format
```

Formats the project using Prettier.

### Check Formatting

```bash
npm run format:check
```

Checks whether files conform to the configured Prettier formatting rules.

## Authentication

The application uses **NextAuth.js** for authentication.

Authentication can be used for:

- Customer login
- Customer sessions
- Protected customer pages
- Admin authentication
- API authorization

The application uses JWT-based sessions where configured.

## Image Uploads

Customers can upload images of their office chairs and damaged components to help technicians identify the required repair parts.

Cloudinary is used for media storage and delivery.

Typical image workflow:

```text
Customer
   │
   ▼
Upload Chair Images
   │
   ▼
Cloudinary
   │
   ▼
Image URL stored with booking/order
   │
   ▼
Technician reviews images
```

For better assessment, customers should provide clear images of the damaged area and relevant chair components.

## State Management

The application uses **Redux Toolkit** and **RTK Query** for client-side state management and API communication.

RTK Query is used for:

- Fetching bookings/orders
- Fetching customer addresses
- Updating orders
- Uploading/deleting product images
- Cache invalidation and revalidation
- Managing API request state

## Payment Flow

The application supports online payment processing through the configured payment provider.

A typical payment flow is:

```text
Create Booking
      │
      ▼
Generate Payment Request
      │
      ▼
Customer Completes Payment
      │
      ▼
Payment Gateway Response
      │
      ▼
Update Payment Status
      │
      ▼
Generate / Update Invoice
```

Payment credentials must be configured through environment variables and should never be exposed to the client.

## Invoice Generation

Invoices can be generated from booking/order information.

The application uses:

- `html2canvas` for rendering invoice HTML
- `jsPDF` for PDF generation
- `to-words` for converting monetary amounts into words

The generated invoice can be stored or uploaded through the application's configured media workflow.

## Database

MongoDB is used as the primary application database with Mongoose as the ODM.

Application data can include:

- Users
- Addresses
- Orders
- Bookings
- Payments
- Invoices
- Reviews
- Order counters
- Service information

Database connection strings should be configured using environment variables.

## Deployment

The application is designed to be deployed on **Vercel**.

A typical deployment process is:

1. Push the project to GitHub/GitLab/Bitbucket.
2. Import the repository into Vercel.
3. Configure all required production environment variables.
4. Configure the production domain.
5. Deploy the application.
6. Verify authentication, database, payment, image upload, email, and API functionality.

### Important Production Checks

Before deploying, verify:

- MongoDB production connection string
- NextAuth production URL and secret
- Cloudinary credentials
- Payment gateway credentials
- SMTP configuration
- Mapbox token
- Vercel environment variables
- Domain/DNS configuration
- HTTPS
- API route functionality
- Authentication callbacks
- Payment callbacks/webhooks, if applicable

## Security

Do not commit the following to source control:

```text
.env
.env.local
.env.production
API keys
Database credentials
Cloudinary secrets
Payment gateway secrets
SMTP passwords
NextAuth secrets
```

Use Vercel Environment Variables or another secure secret-management solution for production credentials.

## Service Benefits

Chair Care is designed around the principle of **repair instead of replacement**.

The service provides:

- Professional technicians
- Doorstep repair
- Quality replacement parts
- Online booking
- Convenient scheduling
- Transparent service workflow
- Warranty-backed repairs where applicable

## Performance & User Experience

The application is built with Next.js and React to provide:

- Server-side rendering and modern React capabilities
- Responsive layouts
- Optimized image delivery
- Client-side API caching with RTK Query
- Mobile-friendly booking experience
- Fast navigation between service and booking pages

## Contributing

1. Create a feature branch:

```bash
git checkout -b feature/your-feature-name
```

2. Make your changes.
3. Run linting:

```bash
npm run lint
```

4. Format the code:

```bash
npm run format
```

5. Build the project:

```bash
npm run build
```

6. Commit your changes:

```bash
git commit -m "feat: add your feature"
```

7. Push the branch and create a pull request.

## License

This project is proprietary software for the Chair Care service.

Unauthorized copying, redistribution, or commercial use of the source code and application logic is not permitted without permission from the project owner.

## Contact

For service-related information, visit:

**Chair Care:** https://chaircare.zhelps.in/

---

### Chair Care

**Repair your office chair. Don't replace it.**
