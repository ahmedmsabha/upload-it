# Upload-It

A modern, full-stack file upload and management application built with Next.js 15, TypeScript, and Appwrite.

## 🚀 Features

- Modern and responsive UI built with Tailwind CSS and Radix UI components
- Secure file upload and management system
- User authentication and authorization
- Real-time updates and notifications
- Dark/Light mode support
- Type-safe development with TypeScript
- Optimized performance with Next.js App Router

## 🛠️ Tech Stack

- **Framework:** Next.js 15
- **Language:** TypeScript
- **Styling:** Tailwind CSS
- **UI Components:** Radix UI
- **Backend:** Appwrite
- **State Management:** TanStack Query
- **Form Handling:** React Hook Form with Zod validation
- **Date Handling:** date-fns
- **Charts:** Recharts
- **File Upload:** react-dropzone
- **Animations:** tailwindcss-animate
- **Development Tools:** ESLint, Prettier, TypeScript

## 📦 Prerequisites

- Node.js 18.x or later
- pnpm (recommended) or npm
- Appwrite instance

## 🔧 Installation

1. Clone the repository:
```bash
git clone https://github.com/yourusername/upload-it.git
cd upload-it
```

2. Install dependencies:
```bash
pnpm install
```

3. Create a `.env` file in the root directory and add your environment variables:
```env
NEXT_PUBLIC_APPWRITE_URL=your_appwrite_url
NEXT_PUBLIC_APPWRITE_PROJECT_ID=your_project_id
# Add other required environment variables
```

4. Start the development server:
```bash
pnpm dev
```

The application will be available at [http://localhost:3000](http://localhost:3000).

## 🏗️ Project Structure

```
src/
├── app/              # Next.js app router pages
├── components/       # Reusable UI components
├── lib/             # Utility functions and configurations
├── hooks/           # Custom React hooks
├── types/           # TypeScript type definitions
├── constants/       # Application constants
└── assets/          # Static assets
```

## 📝 Available Scripts

- `pnpm dev` - Start the development server with Turbopack
- `pnpm build` - Build the application for production
- `pnpm start` - Start the production server
- `pnpm lint` - Run ESLint for code linting

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## 📄 License

This project is licensed under the MIT License - see the LICENSE file for details.

## 🙏 Acknowledgments

- [Next.js](https://nextjs.org/) for the amazing framework
- [Appwrite](https://appwrite.io/) for the backend services
- [Radix UI](https://www.radix-ui.com/) for the accessible components
- [Tailwind CSS](https://tailwindcss.com/) for the styling system
