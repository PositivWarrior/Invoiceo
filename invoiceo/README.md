<div align="center">
  <img src="https://raw.githubusercontent.com/Kacper-Margol/Invoiceo/main/invoiceo/public/logo_nobg.png" alt="Invoiceo Logo" width="200"/>

# Invoiceo - Professional Invoice Management

**Live Site: [invoiceo-xi.vercel.app](https://invoiceo-xi.vercel.app/)**

  <p>
    A modern, full-stack invoice management application built with Next.js 15. Create, manage, and track professional invoices with real-time analytics, automated email delivery, and comprehensive PDF generation.
  </p>
</div>

![Invoiceo Screenshot](https://raw.githubusercontent.com/Kacper-Margol/Invoiceo/main/invoiceo/public/hero.png)

---

## ✨ Key Features

### 🔐 Authentication & Security

-   **Passwordless Authentication**: Secure magic link login via email using NextAuth.js
-   **User Session Management**: Persistent sessions with automatic session handling
-   **Protected Routes**: Role-based access control for all dashboard features

### 📊 Dashboard & Analytics

-   **Revenue Analytics**: Real-time dashboard with total revenue calculations
-   **Interactive Charts**: Payment trends visualization with Recharts
-   **Key Metrics**: Track total invoices, paid invoices, and pending payments
-   **Recent Activity**: Quick overview of latest invoice activities

### 📄 Invoice Management

-   **Full CRUD Operations**: Create, read, update, and delete invoices
-   **Smart Invoice Numbering**: Automatic sequential invoice number generation
-   **Status Tracking**: Pending/Paid status management with visual indicators
-   **Multi-Currency Support**: USD, EUR, and NOK currency options
-   **Tax Calculations**: Built-in tax rate and amount calculations

### 📧 Email Automation

-   **Automated Invoice Delivery**: Send invoices directly to clients via email
-   **Reminder System**: Send payment reminder emails to clients
-   **Template-Based Emails**: Professional email templates via Mailtrap
-   **Dynamic Content**: Personalized emails with invoice and user data

### 📱 PDF Generation

-   **Professional PDFs**: High-quality invoice PDFs using jsPDF
-   **Custom Layouts**: Branded invoice templates with company information
-   **Download & Share**: Direct download and email delivery of PDFs
-   **Responsive Design**: Optimized for print and digital viewing

### 🎨 Modern UI/UX

-   **Responsive Design**: Mobile-first design that works on all devices
-   **Dark/Light Mode**: Theme switching with next-themes
-   **Gradient Cards**: Beautiful gradient designs with smooth animations
-   **Component Library**: Built with shadcn/ui and Radix UI components
-   **Accessibility**: WCAG compliant interface elements

### 🔧 Developer Experience

-   **TypeScript**: Full type safety throughout the application
-   **Testing Suite**: Comprehensive Jest testing with 100% coverage on utilities
-   **Form Validation**: Robust validation using Zod schemas
-   **Database Management**: PostgreSQL with Prisma ORM
-   **API Routes**: RESTful API endpoints for all operations

---

## 🛠️ Tech Stack

### Frontend

-   **[Next.js 15](https://nextjs.org/)** - React framework with App Router
-   **[React 19](https://reactjs.org/)** - Latest React with concurrent features
-   **[TypeScript](https://www.typescriptlang.org/)** - Type-safe JavaScript
-   **[Tailwind CSS](https://tailwindcss.com/)** - Utility-first CSS framework
-   **[shadcn/ui](https://ui.shadcn.com/)** - Re-usable component library
-   **[Radix UI](https://www.radix-ui.com/)** - Accessible component primitives
-   **[Lucide React](https://lucide.dev/)** - Icon library
-   **[Recharts](https://recharts.org/)** - Data visualization library

### Backend & Database

-   **[PostgreSQL](https://www.postgresql.org/)** - Production database
-   **[Prisma ORM](https://www.prisma.io/)** - Type-safe database client
-   **[NextAuth.js](https://next-auth.js.org/)** - Authentication framework
-   **[Prisma Adapter](https://authjs.dev/reference/adapter/prisma)** - Database session storage

### Forms & Validation

-   **[@conform-to/react](https://conform.guide/)** - Progressive form enhancement
-   **[Zod](https://zod.dev/)** - TypeScript-first schema validation
-   **[React Hook Form](https://react-hook-form.com/)** - Performant form handling

### Email & PDF

-   **[Mailtrap](https://mailtrap.io/)** - Email delivery service
-   **[Nodemailer](https://nodemailer.com/)** - Email transport
-   **[jsPDF](https://github.com/parallax/jsPDF)** - PDF generation library

### Development & Testing

-   **[Jest](https://jestjs.io/)** - JavaScript testing framework
-   **[React Testing Library](https://testing-library.com/)** - React component testing
-   **[ESLint](https://eslint.org/)** - JavaScript linting
-   **[Prettier](https://prettier.io/)** - Code formatting

### Deployment & Infrastructure

-   **[Vercel](https://vercel.com/)** - Deployment platform
-   **[pnpm](https://pnpm.io/)** - Package manager
-   **[GitHub](https://github.com/)** - Version control

---

## 📁 Project Structure

```
invoiceo/
├── app/                          # Next.js App Router
│   ├── actions.ts               # Server actions
│   ├── api/                     # API routes
│   │   ├── auth/                # Authentication endpoints
│   │   ├── email/               # Email sending API
│   │   └── invoice/             # PDF generation API
│   ├── components/              # React components
│   │   ├── CreateInvoice.tsx    # Invoice creation form
│   │   ├── DashboardBlocks.tsx  # Analytics cards
│   │   ├── Graph.tsx            # Chart component
│   │   ├── InvoiceGraph.tsx     # Payment analytics
│   │   └── ...                  # Other components
│   ├── dashboard/               # Protected dashboard pages
│   │   ├── invoices/            # Invoice management
│   │   └── page.tsx             # Dashboard home
│   ├── utils/                   # Utility functions
│   │   ├── auth.ts              # NextAuth configuration
│   │   ├── db.ts                # Prisma client
│   │   ├── zodSchemas.ts        # Validation schemas
│   │   └── ...                  # Other utilities
│   └── ...                      # Other app files
├── components/                   # Reusable UI components
│   ├── ui/                      # shadcn/ui components
│   └── magicui/                 # Custom magic components
├── prisma/                      # Database schema
│   └── schema.prisma            # Prisma schema
├── __tests__/                   # Test files
│   ├── formatCurrency.test.tsx  # Currency formatting tests
│   ├── zodSchemas.test.tsx      # Schema validation tests
│   └── utils.test.tsx           # Utility function tests
├── public/                      # Static assets
└── ...                          # Config files
```

---

## 🚀 Getting Started

### Prerequisites

-   **[Node.js](https://nodejs.org/en/)** (v20 or later)
-   **[pnpm](https://pnpm.io/installation)** (recommended package manager)
-   **PostgreSQL database** (local or cloud instance)
-   **[Mailtrap account](https://mailtrap.io/)** for email functionality

### Installation & Setup

1. **Clone the repository:**

    ```bash
    git clone https://github.com/your-username/Invoiceo.git
    cd Invoiceo/invoiceo
    ```

2. **Install dependencies:**

    ```bash
    pnpm install
    ```

3. **Set up environment variables:**

    Create a `.env` file in the `invoiceo` directory:

    ```env
    # Database Configuration
    DATABASE_URL="postgresql://username:password@host:port/database"

    # NextAuth.js Configuration
    AUTH_SECRET="your-super-secret-auth-secret"  # Generate: https://generate-secret.vercel.app/
    AUTH_URL="http://localhost:3000"

    # Email Configuration (for magic links)
    EMAIL_SERVER_USER="your-mailtrap-smtp-user"
    EMAIL_SERVER_PASSWORD="your-mailtrap-smtp-password"
    EMAIL_SERVER_HOST="live.smtp.mailtrap.io"
    EMAIL_SERVER_PORT="587"
    EMAIL_FROM="your-verified-email@example.com"

    # Mailtrap API (for invoice emails)
    MAILTRAP_TOKEN="your-mailtrap-api-token"

    # Application URL
    NEXT_PUBLIC_APP_URL="http://localhost:3000"
    ```

4. **Set up the database:**

    ```bash
    # Push the schema to your database
    pnpm prisma db push

    # (Optional) Open Prisma Studio to view your data
    pnpm prisma studio
    ```

5. **Run the development server:**

    ```bash
    pnpm dev
    ```

6. **Open your browser:**

    Navigate to [http://localhost:3000](http://localhost:3000)

---

## 🧪 Testing

The project includes comprehensive testing with Jest and React Testing Library:

```bash
# Run all tests
pnpm test

# Run tests in watch mode
pnpm test:watch

# Generate coverage report
pnpm test:coverage
```

### Test Coverage

-   **Utility Functions**: 100% coverage
-   **Validation Schemas**: 100% coverage
-   **Currency Formatting**: Edge cases and all currencies
-   **Form Validation**: All schema rules and error cases

---

## 📊 Database Schema

### Core Models

-   **User**: User profiles with authentication data
-   **Invoice**: Complete invoice information with line items
-   **Account/Session**: NextAuth.js authentication tables

### Key Relationships

-   Users have many Invoices (one-to-many)
-   Invoices track status (PENDING/PAID)
-   Built-in audit trails with createdAt/updatedAt

---

## 🔄 API Endpoints

### Authentication

-   `POST /api/auth/signin` - Magic link authentication
-   `GET /api/auth/session` - Current session data

### Invoices

-   `GET /api/invoice/[id]` - Generate and download PDF
-   `POST /api/email/[id]` - Send reminder email

### Server Actions

-   `createInvoice()` - Create new invoice with email
-   `editInvoice()` - Update existing invoice
-   `markAsPaidAction()` - Update invoice status
-   `deleteInvoice()` - Remove invoice

---

## 🌟 Key Features Deep Dive

### Smart Invoice Creation

-   Auto-increment invoice numbers
-   Real-time validation with Zod
-   Multi-currency support with proper formatting
-   Automatic email delivery to clients

### Advanced Analytics

-   Payment trend visualization
-   Revenue tracking over time
-   Invoice status distribution
-   Real-time dashboard updates

### Professional PDF Generation

-   Company branding integration
-   Itemized billing with calculations
-   Professional layout and typography
-   Downloadable and email-ready format

### Email System

-   Template-based professional emails
-   Magic link authentication
-   Invoice delivery automation
-   Payment reminder system

---

## 🚀 Deployment

### Vercel Deployment (Recommended)

1. **Push to GitHub**
2. **Connect to Vercel**
3. **Set environment variables** in Vercel dashboard
4. **Deploy automatically** on every push

### Environment Variables for Production

Ensure all environment variables are properly set in your production environment, especially database URLs and email credentials.

---

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

---

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

---

## 🙏 Acknowledgments

-   [Next.js Team](https://nextjs.org/) for the amazing framework
-   [shadcn](https://twitter.com/shadcn) for the beautiful component library
-   [Vercel](https://vercel.com/) for seamless deployment
-   [Prisma](https://www.prisma.io/) for the excellent ORM

---

<div align="center">
  <p>Made with ❤️ by the Invoiceo Team</p>
  <p>
    <a href="https://invoiceo-xi.vercel.app/">Live Demo</a> •
    <a href="#-getting-started">Getting Started</a> •
    <a href="#-api-endpoints">API Docs</a> •
    <a href="#🤝-contributing">Contributing</a>
  </p>
</div>
