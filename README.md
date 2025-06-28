# Digital E-Gram Panchayat - Modern UI

A comprehensive digital governance platform with a modern, professional UI that enables village citizens to access government services, apply online, and track applications while allowing staff and officers to manage services and applications efficiently.

## 🎨 Design Features

- **Modern UI/UX**: Wix/Webflow-level design quality with smooth animations
- **Dark Mode Support**: Complete dark/light theme toggle
- **Responsive Design**: Mobile-first approach with perfect responsiveness
- **Framer Motion**: Smooth page transitions and micro-interactions
- **Glass Morphism**: Modern glass effects and backdrop blur
- **Professional Typography**: Inter + Poppins font combination
- **Gradient Backgrounds**: Beautiful gradient overlays and patterns

## 🚀 Tech Stack

- **Frontend**: React 18 + TypeScript + Vite
- **Styling**: Tailwind CSS with custom design system
- **Animations**: Framer Motion for smooth transitions
- **Backend**: Firebase (Auth, Firestore, Hosting)
- **Routing**: React Router v6
- **State Management**: React Context API
- **Icons**: Lucide React
- **Notifications**: React Hot Toast

## ✨ Key Features

### 🎯 Role-Based Access Control
- **Citizens**: Browse services, submit applications, track progress
- **Staff**: Review applications, update statuses, manage workflow
- **Admins**: Full service management, user oversight, system control

### 🎨 Modern UI Components
- **Reusable Components**: Button, Card, Input, Modal, Badge
- **Responsive Layout**: Mobile-first design with breakpoints
- **Dark Mode**: System preference detection with manual toggle
- **Animations**: Page transitions, hover effects, loading states
- **Glass Effects**: Modern backdrop blur and transparency

### 📱 User Experience
- **Intuitive Navigation**: Clean header with role-based menus
- **Dashboard Cards**: Beautiful stat cards with icons and gradients
- **Status Tracking**: Visual progress indicators and badges
- **Toast Notifications**: Elegant success/error messages
- **Loading States**: Smooth loading animations throughout

## 🛠️ Installation & Setup

### Prerequisites
- Node.js (v16 or higher)
- npm or yarn
- Firebase account

### Quick Start

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd digital-egram-panchayat
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Environment Setup**
   ```bash
   cp .env.example .env
   ```
   
   Fill in your Firebase configuration:
   ```env
   VITE_FIREBASE_API_KEY=your_api_key_here
   VITE_FIREBASE_AUTH_DOMAIN=your_project.firebaseapp.com
   VITE_FIREBASE_PROJECT_ID=your_project_id
   VITE_FIREBASE_STORAGE_BUCKET=your_project.appspot.com
   VITE_FIREBASE_MESSAGING_SENDER_ID=123456789
   VITE_FIREBASE_APP_ID=1:123456789:web:abc123def456
   ```

4. **Start development server**
   ```bash
   npm run dev
   ```

5. **Start Firebase emulators** (optional)
   ```bash
   npm run emulators
   ```

## 🎨 Design System

### Color Palette
- **Primary**: Blue shades (#3b82f6 to #1e3a8a)
- **Secondary**: Gray shades (#f8fafc to #020617)
- **Accent**: Orange shades (#fef7ee to #431506)
- **Success**: Green shades (#f0fdf4 to #052e16)
- **Warning**: Yellow shades (#fffbeb to #451a03)
- **Error**: Red shades (#fef2f2 to #450a0a)

### Typography
- **Display Font**: Poppins (headings)
- **Body Font**: Inter (body text)
- **Font Weights**: 300, 400, 500, 600, 700, 800, 900

### Animations
- **Page Transitions**: Fade in/out with Framer Motion
- **Hover Effects**: Scale, translate, and shadow changes
- **Loading States**: Smooth spinner and skeleton loading
- **Micro-interactions**: Button press, card hover, input focus

## 📁 Project Structure

```
src/
├── components/
│   ├── ui/                 # Reusable UI components
│   │   ├── Button.tsx
│   │   ├── Card.tsx
│   │   ├── Input.tsx
│   │   ├── Modal.tsx
│   │   └── Badge.tsx
│   ├── layout/             # Layout components
│   │   ├── Header.tsx
│   │   ├── Footer.tsx
│   │   └── Layout.tsx
│   └── Common/             # Common components
├── pages/                  # Page components
│   ├── Home.tsx
│   ├── Login.tsx
│   ├── Register.tsx
│   ├── Services.tsx
│   └── dashboard/
├── hooks/                  # Custom hooks
│   └── useTheme.ts
├── lib/                    # Utility functions
│   └── utils.ts
├── services/               # Firebase services
├── context/                # React contexts
└── types/                  # TypeScript types
```

## 🎯 Pages & Routes

- **/** - Modern landing page with hero section
- **/login** - Elegant login form with glass effect
- **/register** - Multi-step registration with role selection
- **/services** - Service catalog with search and filters
- **/dashboard/user** - Citizen dashboard with application tracking
- **/dashboard/staff** - Staff dashboard for application management
- **/dashboard/admin** - Admin dashboard for service management
- **/profile** - User profile management

## 🔧 Development

### Available Scripts
```bash
npm run dev          # Start development server
npm run build        # Build for production
npm run preview      # Preview production build
npm run lint         # Run ESLint
npm test             # Run tests
npm run emulators    # Start Firebase emulators
npm run deploy       # Deploy to Firebase
```

### Code Quality
- **ESLint**: Code linting and formatting
- **TypeScript**: Type safety and better DX
- **Prettier**: Code formatting (configured in ESLint)
- **Husky**: Git hooks for quality checks

## 🚀 Deployment

### Firebase Hosting
```bash
npm run build
npm run deploy
```

### Environment Variables
Set up the following in your Firebase project:
- Authentication providers (Email/Password)
- Firestore database with security rules
- Hosting configuration

## 🎨 Customization

### Theme Customization
Edit `tailwind.config.js` to customize:
- Color palette
- Typography scale
- Spacing system
- Animation timings
- Breakpoints

### Component Styling
All components use Tailwind CSS with:
- Custom design tokens
- Dark mode support
- Responsive utilities
- Animation classes

## 📱 Mobile Experience

- **Touch-friendly**: Large tap targets and gestures
- **Performance**: Optimized for mobile devices
- **Responsive**: Fluid layouts across all screen sizes
- **PWA-ready**: Service worker and manifest support

## 🔒 Security

- **Firebase Security Rules**: Role-based data access
- **Input Validation**: Client and server-side validation
- **XSS Protection**: Sanitized user inputs
- **HTTPS**: Secure data transmission

## 🧪 Testing

```bash
npm test              # Run unit tests
npm run test:watch    # Watch mode
npm run test:coverage # Coverage report
```

## 📊 Performance

- **Lighthouse Score**: Target 90+ on all metrics
- **Bundle Size**: Optimized with code splitting
- **Loading**: Skeleton screens and progressive loading
- **Caching**: Service worker for offline support

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests if needed
5. Submit a pull request

## 📄 License

This project is licensed under the MIT License.

## 🆘 Support

For support and questions:
- Create an issue in the GitHub repository
- Email: support@grampanchayat.gov.in

---

**Digital E-Gram Panchayat** - Empowering rural communities through modern digital governance.