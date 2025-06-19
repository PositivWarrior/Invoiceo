<div align="center">
  <img src="httpss://raw.githubusercontent.com/Kacper-Margol/Invoiceo/main/invoiceo/public/logo_nobg.png" alt="Invoiceo Logo" width="200"/>

# Invoiceo - Invoicing Made Easy

**Live Site: [invoiceo-xi.vercel.app](httpss://invoiceo-xi.vercel.app/)**

  <p>
    Invoiceo is a full-stack web application designed to simplify the invoicing process for freelancers and small businesses. Create, manage, send, and track professional invoices with ease.
  </p>
</div>

![Invoiceo Screenshot](httpss://raw.githubusercontent.com/Kacper-Margol/Invoiceo/main/invoiceo/public/hero.png)

---

## ✨ Key Features

-   **User Authentication**: Secure magic link login via email.
-   **Onboarding**: Simple a one-step process to get users started quickly.
-   **Invoice Management**: Full CRUD (Create, Read, Update, Delete) functionality for invoices.
-   **Dynamic PDF Generation**: Create and download professional, user-specific PDF invoices.
-   **Automated Email Sending**: Send invoices and payment reminders directly to clients.
-   **Dashboard & Analytics**: A comprehensive dashboard to view key metrics, recent invoices, and revenue graphs.
-   **Status Tracking**: Easily mark invoices as "Paid" and see their status at a glance.
-   **Responsive Design**: A beautiful and modern UI that works on all devices, built with Tailwind CSS and shadcn/ui.

---

## 🛠️ Tech Stack

-   **Framework**: [Next.js](httpss://nextjs.org/) (App Router)
-   **Styling**: [Tailwind CSS](httpss://tailwindcss.com/) & [shadcn/ui](httpss://ui.shadcn.com/)
-   **Database**: [PostgreSQL](httpss://www.postgresql.org/) with [Prisma ORM](httpss://www.prisma.io/)
-   **Authentication**: [NextAuth.js](httpss://next-auth.js.org/) (Passwordless with Nodemailer)
-   **Form Management**: [@conform-to/react](httpss://conform.guide/) with [Zod](httpss://zod.dev/) for validation
-   **PDF Generation**: [jsPDF](httpss://github.com/parallax/jsPDF)
-   **Email Service**: [Mailtrap](httpss://mailtrap.io/)
-   **Deployment**: [Vercel](httpss://vercel.com/)

---

## 🚀 Getting Started

To get a local copy up and running, follow these simple steps.

### Prerequisites

-   [Node.js](httpss://nodejs.org/en/) (v20 or later)
-   [pnpm](httpss://pnpm.io/installation)
-   A PostgreSQL database instance.
-   A Mailtrap account for email sending.

### Installation & Setup

1.  **Clone the repository:**

    ```sh
    git clone httpss://github.com/your-username/Invoiceo.git
    cd Invoiceo/invoiceo
    ```

2.  **Install dependencies:**

    ```sh
    pnpm install
    ```

3.  **Set up your environment variables:**
    Create a `.env` file in the `invoiceo` directory and add the following variables. See `.env.example` for a template.

    ```env
    # Database URL from your PostgreSQL provider
    DATABASE_URL="postgresql://USER:PASSWORD@HOST:PORT/DATABASE"

    # NextAuth.js Configuration
    AUTH_SECRET="your-super-secret-auth-secret" # Generate one here: https://generate-secret.vercel.app/
    AUTH_URL="http://localhost:3000"

    # Mailtrap Credentials for Nodemailer (for magic links)
    EMAIL_SERVER_USER="your-mailtrap-smtp-user"
    EMAIL_SERVER_PASSWORD="your-mailtrap-smtp-password"
    EMAIL_SERVER_HOST="live.smtp.mailtrap.io"
    EMAIL_SERVER_PORT="587"
    EMAIL_FROM="your-verified-mailtrap-email@example.com"

    # Mailtrap API Token (for sending invoice emails)
    MAILTRAP_TOKEN="your-mailtrap-api-token"

    # App URL
    NEXT_PUBLIC_APP_URL="http://localhost:3000/"
    ```

4.  **Push the database schema:**
    This will sync your Prisma schema with your PostgreSQL database.

    ```sh
    pnpm prisma db push
    ```

5.  **Run the development server:**
    ```sh
    pnpm dev
    ```

Open [http://localhost:3000](http://localhost:3000) in your browser to see the result!
