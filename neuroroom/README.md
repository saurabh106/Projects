# NeuroRoom

A modern Next.js application built with TypeScript, featuring a comprehensive UI component library and database integration with Drizzle ORM.

## 🚀 Features

- **Next.js 15** with App Router and Turbopack
- **TypeScript** for type safety
- **Tailwind CSS** for styling
- **Drizzle ORM** with PostgreSQL database
- **Radix UI** components for accessible UI
- **React Hook Form** with Zod validation
- **Next Themes** for dark/light mode support
- **Lucide React** for beautiful icons
- **Sonner** for toast notifications

## 🛠️ Tech Stack

### Frontend
- **Next.js 15** - React framework with App Router
- **React 19** - Latest React version
- **TypeScript** - Type-safe JavaScript
- **Tailwind CSS** - Utility-first CSS framework
- **Radix UI** - Accessible UI primitives
- **Lucide React** - Icon library
- **React Hook Form** - Form handling
- **Zod** - Schema validation

### Backend & Database
- **Drizzle ORM** - Type-safe database toolkit
- **PostgreSQL** - Database (via Neon)
- **Drizzle Kit** - Database migrations and management

### Development Tools
- **ESLint** - Code linting
- **TypeScript** - Type checking
- **Turbopack** - Fast bundler

## 📦 Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd neuroroom
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Set up environment variables**
   Create a `.env.local` file in the root directory:
   ```env
   DATABASE_URL="your-postgresql-connection-string"
   ```

4. **Set up the database**
   ```bash
   # Push the schema to your database
   npm run db:push
   ```

5. **Start the development server**
   ```bash
   npm run dev
   ```

Open [http://localhost:3000](http://localhost:3000) to view the application.

## 🗄️ Database

The project uses Drizzle ORM with PostgreSQL. The current schema includes:

### Users Table
```typescript
export const usersTable = pgTable("users", {
  id: integer().primaryKey().generatedAlwaysAsIdentity(),
  name: varchar({ length: 255 }).notNull(),
  age: integer().notNull(),
  email: varchar({ length: 255 }).notNull().unique(),
});
```

### Database Commands

- **Push schema changes**: `npm run db:push`
- **Open Drizzle Studio**: `npm run db:studio`

## 📁 Project Structure

```
neuroroom/
├── src/
│   ├── app/                 # Next.js App Router
│   │   ├── layout.tsx      # Root layout
│   │   ├── page.tsx        # Home page
│   │   └── globals.css     # Global styles
│   ├── components/         # React components
│   │   └── ui/            # UI components (Radix UI)
│   ├── db/                # Database configuration
│   │   ├── index.ts       # Database connection
│   │   └── schema.ts      # Database schema
│   ├── hooks/             # Custom React hooks
│   └── lib/               # Utility functions
├── public/                # Static assets
├── drizzle.config.ts      # Drizzle configuration
└── package.json           # Dependencies and scripts
```

## 🎨 UI Components

The project includes a comprehensive set of UI components built with Radix UI and styled with Tailwind CSS:

- **Layout**: Accordion, Collapsible, Separator, Tabs
- **Navigation**: Breadcrumb, Navigation Menu, Menubar
- **Forms**: Button, Input, Label, Select, Textarea, Checkbox, Radio Group, Switch
- **Feedback**: Alert, Alert Dialog, Progress, Toast (Sonner)
- **Data Display**: Avatar, Badge, Card, Table
- **Overlay**: Dialog, Drawer, Popover, Tooltip, Hover Card
- **Input**: Input OTP, Slider, Toggle, Toggle Group
- **Layout**: Aspect Ratio, Resizable, Scroll Area, Sheet, Sidebar
- **Feedback**: Skeleton, Switch
- **Data Visualization**: Chart, Carousel

## 🚀 Available Scripts

- `npm run dev` - Start development server with Turbopack
- `npm run build` - Build the application for production
- `npm run start` - Start the production server
- `npm run lint` - Run ESLint
- `npm run db:push` - Push database schema changes
- `npm run db:studio` - Open Drizzle Studio

## 🔧 Configuration

### Drizzle Configuration
The database is configured in `drizzle.config.ts`:
```typescript
import { defineConfig } from 'drizzle-kit';

export default defineConfig({
  out: './drizzle',
  schema: './src/db/schema.ts',
  dialect: 'postgresql',
  dbCredentials: {
    url: process.env.DATABASE_URL!,
  },
});
```

### Environment Variables
- `DATABASE_URL` - PostgreSQL connection string

## 🎯 Development

### Adding New Components
1. Create your component in `src/components/`
2. Import and use Radix UI primitives
3. Style with Tailwind CSS classes
4. Export from the components directory

### Database Changes
1. Modify the schema in `src/db/schema.ts`
2. Run `npm run db:push` to apply changes
3. Use `npm run db:studio` to view and manage data

### Styling
- Use Tailwind CSS utility classes
- Follow the existing design system
- Use Radix UI primitives for accessibility

## 📝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Run tests and linting
5. Submit a pull request

## 📄 License

This project is private and proprietary.

## 🤝 Support

For support and questions, please open an issue in the repository.
