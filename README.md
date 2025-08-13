# Digital E-Gram Panchayat - Modern Digital Governance Platform

<div align="center">

![Digital E-Gram Panchayat](https://img.shields.io/badge/Digital-E--Gram%20Panchayat-blue?style=for-the-badge)
![React](https://img.shields.io/badge/React-18.3.1-61DAFB?style=for-the-badge&logo=react)
![TypeScript](https://img.shields.io/badge/TypeScript-5.5.3-3178C6?style=for-the-badge&logo=typescript)
![Firebase](https://img.shields.io/badge/Firebase-10.13.0-FFCA28?style=for-the-badge&logo=firebase)
![Tailwind CSS](https://img.shields.io/badge/Tailwind%20CSS-3.4.10-06B6D4?style=for-the-badge&logo=tailwindcss)

**A comprehensive digital governance platform that enables village citizens to access government services, apply online, and track applications while allowing staff and officers to manage services and applications efficiently.**

[🚀 Live Demo](https://e-gram-panchayat-54791.web.app) • [📖 Documentation](#documentation) • [🐛 Report Bug](https://github.com/your-username/digital-egram-panchayat/issues) • [✨ Request Feature](https://github.com/your-username/digital-egram-panchayat/issues)

</div>

---

## 📋 Table of Contents

- [🎯 Overview](#-overview)
- [✨ Features](#-features)
- [🛠️ Tech Stack](#️-tech-stack)
- [🚀 Quick Start](#-quick-start)
- [📁 Project Structure](#-project-structure)
- [🔧 Development Workflow](#-development-workflow)
- [🌐 Deployment](#-deployment)
- [🔐 Environment Variables](#-environment-variables)
- [📱 Usage Guide](#-usage-guide)
- [🎨 Design System](#-design-system)
- [🧪 Testing](#-testing)
- [🤝 Contributing](#-contributing)
- [📄 License](#-license)
- [👨‍💻 Developer](#-developer)

---

## 🎯 Overview

Digital E-Gram Panchayat is a modern, responsive web application designed to bridge the digital divide in rural governance. It provides a comprehensive platform for citizens to access government services online, submit applications, and track their progress in real-time.

### 🎨 Design Philosophy
- **Modern UI/UX**: Wix/Webflow-level design quality with smooth animations
- **Accessibility First**: WCAG 2.1 compliant with keyboard navigation support
- **Mobile-First**: Responsive design optimized for all devices
- **Performance**: Optimized for fast loading and smooth interactions

### 🏛️ Government Integration
- **Role-Based Access**: Citizens, Staff, and Admin roles with appropriate permissions
- **Secure Authentication**: Firebase Auth with email verification
- **Document Management**: Secure handling of government documents
- **Audit Trail**: Complete logging of all system activities

---

## ✨ Features

### 🎯 **Core Features**

#### 👥 **For Citizens**
- 📝 **Online Applications**: Submit applications for various government services
- 📊 **Application Tracking**: Real-time status updates and progress tracking
- 🔔 **Email Notifications**: Automated updates on application status changes
- 👤 **Profile Management**: Secure account management with document storage
- 📱 **Mobile Responsive**: Full functionality on all devices

#### 👨‍💼 **For Staff Members**
- 📋 **Application Review**: Comprehensive application management dashboard
- ✅ **Status Updates**: Update application status with remarks
- 📈 **Analytics Dashboard**: Track processing metrics and performance
- 🔍 **Search & Filter**: Advanced filtering for efficient workflow management

#### 🔧 **For Administrators**
- 🛠️ **Service Management**: Create, update, and manage government services
- 👥 **User Management**: Oversee user accounts and role assignments
- 📊 **System Analytics**: Comprehensive reporting and analytics
- ⚙️ **System Configuration**: Platform settings and customization

### 🎨 **UI/UX Features**
- 🌙 **Dark Mode**: Complete dark/light theme toggle with system preference detection
- ✨ **Animations**: Smooth page transitions and micro-interactions using Framer Motion
- 🎭 **Glass Morphism**: Modern glass effects and backdrop blur
- 🎨 **Design System**: Consistent color palette, typography, and spacing
- 📱 **PWA Ready**: Progressive Web App capabilities for offline access

### 🔒 **Security Features**
- 🔐 **Firebase Authentication**: Secure user authentication with email verification
- 🛡️ **Role-Based Access Control**: Granular permissions based on user roles
- 📝 **Audit Logging**: Complete activity tracking for compliance
- 🔒 **Data Encryption**: Secure data transmission and storage
- 🚫 **Input Validation**: Comprehensive client and server-side validation

---

## 🛠️ Tech Stack

### **Frontend**
- **Framework**: React 18.3.1 with TypeScript
- **Build Tool**: Vite 5.4.1 for fast development and building
- **Styling**: Tailwind CSS 3.4.10 with custom design system
- **Animations**: Framer Motion 10.16.4 for smooth transitions
- **Icons**: Lucide React 0.441.0 for consistent iconography
- **Routing**: React Router DOM 6.26.1 for client-side routing

### **Backend & Services**
- **Authentication**: Firebase Auth 10.13.0
- **Database**: Cloud Firestore for real-time data
- **Hosting**: Firebase Hosting for static site deployment
- **Email Service**: EmailJS for transactional emails
- **Functions**: Firebase Functions for server-side logic

### **Development Tools**
- **Language**: TypeScript 5.5.3 for type safety
- **Linting**: ESLint 9.9.0 with React and TypeScript rules
- **Package Manager**: npm with lock file for consistent installs
- **Version Control**: Git with conventional commit messages

### **Design & UI**
- **Design System**: Custom Tailwind configuration
- **Typography**: Inter + Poppins font combination
- **Color System**: Comprehensive color ramps with dark mode support
- **Responsive Design**: Mobile-first approach with breakpoints
- **Accessibility**: WCAG 2.1 AA compliant

---

## 🚀 Quick Start

### **Prerequisites**

Ensure you have the following installed on your system:

- **Node.js** (v16.0.0 or higher) - [Download](https://nodejs.org/)
- **npm** (v7.0.0 or higher) - Comes with Node.js
- **Git** - [Download](https://git-scm.com/)
- **Firebase Account** - [Create Account](https://firebase.google.com/)
- **EmailJS Account** - [Create Account](https://www.emailjs.com/)

### **Installation**

1. **Clone the repository**
   ```bash
   git clone https://github.com/your-username/digital-egram-panchayat.git
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

4. **Configure Environment Variables**
   
   Edit the `.env` file with your configuration:
   ```env
   # Firebase Configuration
   VITE_FIREBASE_API_KEY=your_firebase_api_key
   VITE_FIREBASE_AUTH_DOMAIN=your_project.firebaseapp.com
   VITE_FIREBASE_PROJECT_ID=your_project_id
   VITE_FIREBASE_STORAGE_BUCKET=your_project.appspot.com
   VITE_FIREBASE_MESSAGING_SENDER_ID=your_sender_id
   VITE_FIREBASE_APP_ID=your_app_id

   # EmailJS Configuration
   VITE_EMAILJS_SERVICE_ID=your_service_id
   VITE_EMAILJS_TEMPLATE_ID=your_template_id
   VITE_EMAILJS_OTP_TEMPLATE_ID=your_otp_template_id
   VITE_EMAILJS_PUBLIC_KEY=your_public_key

   # Development Settings
   VITE_ENABLE_LOGGING=false
   ```

5. **Start Development Server**
   ```bash
   npm run dev
   ```

6. **Open in Browser**
   
   Navigate to `http://localhost:5173` to view the application.

### **Firebase Setup**

1. **Create Firebase Project**
   - Go to [Firebase Console](https://console.firebase.google.com/)
   - Create a new project
   - Enable Authentication and Firestore

2. **Configure Authentication**
   - Enable Email/Password authentication
   - Configure authorized domains

3. **Setup Firestore**
   - Create database in production mode
   - Deploy security rules from `firestore.rules`

4. **Deploy Firestore Rules and Indexes**
   ```bash
   npm run firebase:deploy
   ```

### **EmailJS Setup**

1. **Create EmailJS Account**
   - Sign up at [EmailJS](https://www.emailjs.com/)
   - Create a new service (Gmail, Outlook, etc.)

2. **Create Email Templates**
   - Contact form template
   - OTP verification template
   - Application notification template

3. **Get Configuration**
   - Service ID, Template IDs, and Public Key
   - Add to your `.env` file

---

## 📁 Project Structure

```
digital-egram-panchayat/
├── 📁 public/                     # Static assets
│   ├── vite.svg                   # Vite logo
│   └── index.html                 # HTML template
├── 📁 src/                        # Source code
│   ├── 📁 components/             # Reusable components
│   │   ├── 📁 ui/                 # UI components
│   │   │   ├── Button.tsx         # Button component
│   │   │   ├── Card.tsx           # Card component
│   │   │   ├── Input.tsx          # Input component
│   │   │   ├── Modal.tsx          # Modal component
│   │   │   ├── Badge.tsx          # Badge component
│   │   │   ├── OTPInput.tsx       # OTP input component
│   │   │   └── SupportRequestModal.tsx
│   │   ├── 📁 layout/             # Layout components
│   │   │   ├── Header.tsx         # Navigation header
│   │   │   └── Footer.tsx         # Site footer
│   │   └── 📁 Common/             # Common components
│   │       ├── LoadingSpinner.tsx # Loading component
│   │       ├── ProtectedRoute.tsx # Route protection
│   │       └── StatusBadge.tsx    # Status indicator
│   ├── 📁 pages/                  # Page components
│   │   ├── Home.tsx               # Landing page
│   │   ├── Login.tsx              # Login page
│   │   ├── Register.tsx           # Registration page
│   │   ├── Services.tsx           # Services catalog
│   │   ├── Apply.tsx              # Application form
│   │   ├── Profile.tsx            # User profile
│   │   ├── About.tsx              # About page
│   │   ├── Contact.tsx            # Contact page
│   │   ├── Terms.tsx              # Terms of service
│   │   ├── Privacy.tsx            # Privacy policy
│   │   ├── NotFound.tsx           # 404 page
│   │   ├── Unauthorized.tsx       # 403 page
│   │   └── 📁 dashboard/          # Dashboard pages
│   │       ├── UserDashboard.tsx  # Citizen dashboard
│   │       ├── StaffDashboard.tsx # Staff dashboard
│   │       └── AdminDashboard.tsx # Admin dashboard
│   ├── 📁 services/               # API services
│   │   ├── auth.ts                # Authentication service
│   │   ├── applications.ts        # Application management
│   │   ├── services.ts            # Service management
│   │   ├── logging.ts             # Activity logging
│   │   ├── emailService.ts        # Email service
│   │   └── otpService.ts          # OTP management
│   ├── 📁 context/                # React contexts
│   │   └── AuthContext.tsx        # Authentication context
│   ├── 📁 hooks/                  # Custom hooks
│   │   └── useTheme.ts            # Theme management hook
│   ├── 📁 lib/                    # Utility functions
│   │   └── utils.ts               # Common utilities
│   ├── 📁 types/                  # TypeScript types
│   │   └── index.ts               # Type definitions
│   ├── 📁 firebase/               # Firebase configuration
│   │   └── config.ts              # Firebase setup
│   ├── App.tsx                    # Main app component
│   ├── main.tsx                   # App entry point
│   ├── index.css                  # Global styles
│   └── vite-env.d.ts              # Vite type definitions
├── 📁 firebase/                   # Firebase configuration
│   ├── firestore.rules            # Firestore security rules
│   ├── firestore.indexes.json     # Firestore indexes
│   └── firebase.json              # Firebase project config
├── 📄 package.json                # Dependencies and scripts
├── 📄 tailwind.config.js          # Tailwind configuration
├── 📄 tsconfig.json               # TypeScript configuration
├── 📄 vite.config.ts              # Vite configuration
├── 📄 .env.example                # Environment variables template
├── 📄 .gitignore                  # Git ignore rules
└── 📄 README.md                   # Project documentation
```

---

## 🔧 Development Workflow

### **Available Scripts**

```bash
# Development
npm run dev              # Start development server
npm run build            # Build for production
npm run preview          # Preview production build
npm run lint             # Run ESLint

# Firebase
npm run firebase         # Firebase CLI commands
npm run firebase:emulators  # Start Firebase emulators
npm run firebase:deploy  # Deploy to Firebase
```

### **Development Process**

1. **Feature Development**
   ```bash
   # Create feature branch
   git checkout -b feature/your-feature-name
   
   # Make changes and commit
   git add .
   git commit -m "feat: add new feature"
   
   # Push and create PR
   git push origin feature/your-feature-name
   ```

2. **Code Quality**
   - Follow TypeScript best practices
   - Use ESLint for code linting
   - Follow conventional commit messages
   - Write meaningful component and function names

3. **Testing Workflow**
   ```bash
   # Run linting
   npm run lint
   
   # Build project
   npm run build
   
   # Test production build
   npm run preview
   ```

### **Git Workflow**

We follow the **Git Flow** branching model:

- **main**: Production-ready code
- **develop**: Integration branch for features
- **feature/***: Feature development branches
- **hotfix/***: Critical bug fixes
- **release/***: Release preparation branches

### **Commit Convention**

We use [Conventional Commits](https://www.conventionalcommits.org/):

```
feat: add new user registration with OTP verification
fix: resolve authentication state persistence issue
docs: update README with deployment instructions
style: improve button hover animations
refactor: optimize application service queries
test: add unit tests for auth service
chore: update dependencies to latest versions
```

---

## 🌐 Deployment

### **Firebase Hosting Deployment**

1. **Build the project**
   ```bash
   npm run build
   ```

2. **Deploy to Firebase**
   ```bash
   npm run firebase:deploy
   ```

3. **Custom Domain Setup** (Optional)
   - Go to Firebase Console > Hosting
   - Add custom domain
   - Follow DNS configuration instructions

### **Environment-Specific Deployments**

#### **Development Environment**
```bash
# Deploy to development
firebase use development
npm run firebase:deploy
```

#### **Production Environment**
```bash
# Deploy to production
firebase use production
npm run firebase:deploy
```

### **Deployment Checklist**

- [ ] Environment variables configured
- [ ] Firebase project setup complete
- [ ] Firestore rules deployed
- [ ] Authentication providers configured
- [ ] EmailJS templates created
- [ ] Domain DNS configured (if using custom domain)
- [ ] SSL certificate active
- [ ] Performance optimization verified

### **Monitoring & Analytics**

- **Firebase Analytics**: User engagement tracking
- **Performance Monitoring**: Core Web Vitals tracking
- **Error Reporting**: Crash and error monitoring
- **Security Rules**: Regular security rule audits

---

## 🔐 Environment Variables

### **Required Variables**

Create a `.env` file in the root directory with the following variables:

```env
# Firebase Configuration (Required)
VITE_FIREBASE_API_KEY=your_firebase_api_key
VITE_FIREBASE_AUTH_DOMAIN=your_project.firebaseapp.com
VITE_FIREBASE_PROJECT_ID=your_project_id
VITE_FIREBASE_STORAGE_BUCKET=your_project.appspot.com
VITE_FIREBASE_MESSAGING_SENDER_ID=your_sender_id
VITE_FIREBASE_APP_ID=your_app_id

# EmailJS Configuration (Required for email features)
VITE_EMAILJS_SERVICE_ID=service_hai8xx8
VITE_EMAILJS_TEMPLATE_ID=template_kqtzrrk
VITE_EMAILJS_OTP_TEMPLATE_ID=template_o1q3syr
VITE_EMAILJS_PUBLIC_KEY=3R77LKHG0wf2LKb0i

# Development Settings (Optional)
VITE_ENABLE_LOGGING=false
VITE_USE_FIREBASE_EMULATOR=false
```

### **Getting Configuration Values**

#### **Firebase Configuration**
1. Go to [Firebase Console](https://console.firebase.google.com/)
2. Select your project
3. Go to Project Settings > General
4. Scroll down to "Your apps" section
5. Click on the web app to view config

#### **EmailJS Configuration**
1. Go to [EmailJS Dashboard](https://dashboard.emailjs.com/)
2. **Service ID**: Integration > Email Services
3. **Template IDs**: Email Templates section
4. **Public Key**: Account > API Keys

### **Security Notes**

- Never commit `.env` files to version control
- Use different configurations for development/production
- Regularly rotate API keys and secrets
- Use Firebase Security Rules to protect data
- Enable Firebase App Check for additional security

---

## 📱 Usage Guide

### **For Citizens**

#### **Registration Process**
1. **Visit Registration Page**: Navigate to `/register`
2. **Fill Personal Details**: Name, email, password
3. **Email Verification**: Enter OTP sent to email
4. **Account Creation**: Automatic login after verification

#### **Applying for Services**
1. **Browse Services**: Visit `/services` to see available services
2. **Select Service**: Click "Apply Now" on desired service
3. **Fill Application**: Complete the application form
4. **Submit**: Review and submit application
5. **Track Progress**: Monitor status in user dashboard

#### **Dashboard Features**
- **Application Status**: View all submitted applications
- **Status Updates**: Real-time status changes
- **Document Upload**: Attach required documents
- **Profile Management**: Update personal information

### **For Staff Members**

#### **Application Review Process**
1. **Access Staff Dashboard**: Login with staff credentials
2. **Review Applications**: View pending applications
3. **Update Status**: Change application status with remarks
4. **Communication**: Add notes for applicants

#### **Workflow Management**
- **Filter Applications**: By status, date, service type
- **Bulk Operations**: Process multiple applications
- **Analytics**: View processing metrics
- **Reports**: Generate status reports

### **For Administrators**

#### **Service Management**
1. **Create Services**: Add new government services
2. **Configure Requirements**: Set required documents and fees
3. **Manage Categories**: Organize services by category
4. **Activate/Deactivate**: Control service availability

#### **User Management**
- **Role Assignment**: Assign staff and admin roles
- **User Monitoring**: Track user activity
- **Access Control**: Manage permissions
- **Audit Logs**: Review system activities

### **Demo Accounts**

For testing purposes, use these demo accounts:

```
Admin Account:
Email: admin@demo.com
Password: password

Staff Account:
Email: staff@demo.com
Password: password

Citizen Account:
Email: citizen@demo.com
Password: password
```

---

## 🎨 Design System

### **Color Palette**

#### **Primary Colors**
```css
primary-50: #eff6ff    primary-600: #2563eb
primary-100: #dbeafe   primary-700: #1d4ed8
primary-200: #bfdbfe   primary-800: #1e40af
primary-300: #93c5fd   primary-900: #1e3a8a
primary-400: #60a5fa   primary-950: #172554
primary-500: #3b82f6
```

#### **Secondary Colors**
```css
secondary-50: #f8fafc   secondary-600: #475569
secondary-100: #f1f5f9  secondary-700: #334155
secondary-200: #e2e8f0  secondary-800: #1e293b
secondary-300: #cbd5e1  secondary-900: #0f172a
secondary-400: #94a3b8  secondary-950: #020617
secondary-500: #64748b
```

#### **Semantic Colors**
- **Success**: Green shades for positive actions
- **Warning**: Yellow shades for caution
- **Error**: Red shades for errors and destructive actions
- **Accent**: Orange shades for highlights and CTAs

### **Typography**

#### **Font Families**
- **Display Font**: Poppins (headings and titles)
- **Body Font**: Inter (body text and UI elements)

#### **Font Weights**
- **Light**: 300 (subtle text)
- **Regular**: 400 (body text)
- **Medium**: 500 (emphasis)
- **Semibold**: 600 (subheadings)
- **Bold**: 700 (headings)
- **Extrabold**: 800 (display text)
- **Black**: 900 (hero text)

#### **Typography Scale**
```css
text-xs: 12px      text-2xl: 24px
text-sm: 14px      text-3xl: 30px
text-base: 16px    text-4xl: 36px
text-lg: 18px      text-5xl: 48px
text-xl: 20px      text-6xl: 60px
```

### **Spacing System**

Based on 8px grid system:
```css
0: 0px      6: 24px     12: 48px
1: 4px      7: 28px     14: 56px
2: 8px      8: 32px     16: 64px
3: 12px     9: 36px     20: 80px
4: 16px     10: 40px    24: 96px
5: 20px     11: 44px    32: 128px
```

### **Component Guidelines**

#### **Buttons**
- **Primary**: Main actions (Submit, Save, Continue)
- **Secondary**: Secondary actions (Cancel, Back)
- **Outline**: Tertiary actions (Edit, View Details)
- **Ghost**: Subtle actions (Close, Minimize)

#### **Cards**
- **Elevation**: Subtle shadows for depth
- **Rounded Corners**: 12px border radius
- **Padding**: Consistent 24px internal spacing
- **Hover Effects**: Gentle lift animation

#### **Forms**
- **Input Height**: 48px for touch-friendly interaction
- **Label Spacing**: 8px between label and input
- **Error States**: Red border with error message
- **Focus States**: Blue border with ring shadow

### **Animation Guidelines**

#### **Timing Functions**
- **Ease Out**: For entrances and reveals
- **Ease In**: For exits and dismissals
- **Ease In Out**: For state changes

#### **Duration**
- **Fast**: 150ms (hover states, focus)
- **Normal**: 300ms (page transitions)
- **Slow**: 500ms (complex animations)

---

## 🧪 Testing

### **Testing Strategy**

#### **Unit Testing**
- Component testing with React Testing Library
- Service function testing with Jest
- Utility function testing

#### **Integration Testing**
- User flow testing
- API integration testing
- Authentication flow testing

#### **End-to-End Testing**
- Critical user journeys
- Cross-browser compatibility
- Mobile responsiveness

### **Running Tests**

```bash
# Run all tests
npm test

# Run tests in watch mode
npm run test:watch

# Generate coverage report
npm run test:coverage

# Run specific test file
npm test -- Button.test.tsx
```

### **Testing Guidelines**

1. **Test User Behavior**: Focus on what users do, not implementation details
2. **Accessibility Testing**: Ensure components work with screen readers
3. **Error Scenarios**: Test error states and edge cases
4. **Performance Testing**: Monitor bundle size and load times

### **Manual Testing Checklist**

#### **Authentication Flow**
- [ ] User registration with email verification
- [ ] Login with valid credentials
- [ ] Login with invalid credentials
- [ ] Password reset functionality
- [ ] Session persistence across browser refresh

#### **Application Flow**
- [ ] Service browsing and filtering
- [ ] Application form submission
- [ ] File upload functionality
- [ ] Status tracking and updates
- [ ] Email notifications

#### **Responsive Design**
- [ ] Mobile layout (320px - 768px)
- [ ] Tablet layout (768px - 1024px)
- [ ] Desktop layout (1024px+)
- [ ] Touch interactions on mobile
- [ ] Keyboard navigation

#### **Accessibility**
- [ ] Screen reader compatibility
- [ ] Keyboard navigation
- [ ] Color contrast ratios
- [ ] Focus indicators
- [ ] Alt text for images

---

## 🤝 Contributing

We welcome contributions from the community! Here's how you can help:

### **Getting Started**

1. **Fork the Repository**
   ```bash
   git clone https://github.com/your-username/digital-egram-panchayat.git
   ```

2. **Create Feature Branch**
   ```bash
   git checkout -b feature/amazing-feature
   ```

3. **Make Changes**
   - Follow coding standards
   - Add tests for new features
   - Update documentation

4. **Commit Changes**
   ```bash
   git commit -m "feat: add amazing feature"
   ```

5. **Push to Branch**
   ```bash
   git push origin feature/amazing-feature
   ```

6. **Open Pull Request**
   - Provide clear description
   - Link related issues
   - Add screenshots for UI changes

### **Contribution Guidelines**

#### **Code Standards**
- Use TypeScript for type safety
- Follow ESLint configuration
- Write meaningful commit messages
- Add JSDoc comments for functions
- Use semantic HTML elements

#### **Pull Request Process**
1. Update README.md with details of changes
2. Update version numbers following SemVer
3. Ensure all tests pass
4. Get approval from maintainers

#### **Issue Reporting**
- Use issue templates
- Provide reproduction steps
- Include environment details
- Add relevant labels

### **Development Setup for Contributors**

1. **Install Dependencies**
   ```bash
   npm install
   ```

2. **Setup Pre-commit Hooks**
   ```bash
   npm run prepare
   ```

3. **Run Development Server**
   ```bash
   npm run dev
   ```

4. **Run Tests**
   ```bash
   npm test
   ```

### **Areas for Contribution**

- 🐛 **Bug Fixes**: Fix reported issues
- ✨ **Features**: Add new functionality
- 📚 **Documentation**: Improve docs and guides
- 🎨 **UI/UX**: Enhance user interface
- ♿ **Accessibility**: Improve accessibility features
- 🌐 **Internationalization**: Add language support
- 🔧 **Performance**: Optimize performance
- 🧪 **Testing**: Add test coverage

---

## 📄 License

This project is licensed under the **MIT License** - see the [LICENSE](LICENSE) file for details.

### **MIT License Summary**

- ✅ **Commercial Use**: Use for commercial purposes
- ✅ **Modification**: Modify the source code
- ✅ **Distribution**: Distribute the software
- ✅ **Private Use**: Use privately
- ❌ **Liability**: No liability for damages
- ❌ **Warranty**: No warranty provided

---

## 👨‍💻 Developer

<div align="center">

### **Krishna Sevak**
*Full Stack Developer & UI/UX Designer*

[![Portfolio](https://img.shields.io/badge/Portfolio-krishnasevak.vercel.app-blue?style=for-the-badge&logo=netlify)](https://krishnasevak.vercel.app/)
[![LinkedIn](https://img.shields.io/badge/LinkedIn-krishna--sevak-blue?style=for-the-badge&logo=linkedin)](https://www.linkedin.com/in/krishna-sevak/)
[![GitHub](https://img.shields.io/badge/GitHub-krishna142--tech-black?style=for-the-badge&logo=github)](https://github.com/krishna142-tech)
[![Instagram](https://img.shields.io/badge/Instagram-krishnasevak57-purple?style=for-the-badge&logo=instagram)](https://www.instagram.com/krishnasevak57/)

**"Bridging the digital divide through innovative solutions"**

</div>

### **About the Developer**

Krishna Sevak is a passionate full-stack developer with expertise in modern web technologies and a keen eye for user experience design. With a focus on creating accessible and inclusive digital solutions, Krishna has developed this platform to demonstrate the potential of modern web technologies in transforming government services.

#### **Skills & Expertise**
- **Frontend**: React, TypeScript, Tailwind CSS, Framer Motion
- **Backend**: Node.js, Firebase, Express.js
- **Design**: UI/UX Design, Responsive Design, Accessibility
- **Tools**: Git, Figma, Firebase, Netlify, Vercel

#### **Contact Information**
- 📧 **Email**: krishnasevak.dev@gmail.com
- 🌐 **Portfolio**: [krishnasevak.netlify.app](https://krishnasevak.vercel.app/)
- 💼 **LinkedIn**: [linkedin.com/in/krishna-sevak](https://www.linkedin.com/in/krishna-sevak/)
- 🐙 **GitHub**: [github.com/krishna142-tech](https://github.com/krishna142-tech)

---

## 📞 Support & Contact

### **Getting Help**

- 📖 **Documentation**: Check this README and inline code comments
- 🐛 **Bug Reports**: [Create an issue](https://github.com/your-username/digital-egram-panchayat/issues)
- 💡 **Feature Requests**: [Request a feature](https://github.com/your-username/digital-egram-panchayat/issues)
- 💬 **Discussions**: [Join discussions](https://github.com/your-username/digital-egram-panchayat/discussions)

### **Project Links**

- 🚀 **Live Demo**: [https://e-gram-panchayat-delta.vercel.app/](https://e-gram-panchayat-delta.vercel.app/)
- 📂 **Repository**: [https://github.com/your-username/digital-egram-panchayat](https://github.com/your-username/digital-egram-panchayat)
- 📋 **Project Board**: [GitHub Projects](https://github.com/your-username/digital-egram-panchayat/projects)
- 📊 **Analytics**: [Firebase Analytics Dashboard](https://console.firebase.google.com/)

---

<div align="center">

### **⭐ Star this repository if you found it helpful!**

**Made with ❤️ by [Krishna Sevak](https://krishnasevak.netlify.app/)**

*Empowering rural communities through digital innovation*

---

![Footer](https://img.shields.io/badge/Digital%20E--Gram%20Panchayat-2025-blue?style=for-the-badge)

</div>
