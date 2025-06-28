# Digital E-Gram Panchayat

A comprehensive digital governance platform that enables village citizens to access government services, apply online, and track applications while allowing staff and officers to manage services and process applications efficiently.

## 🏗️ Architecture Overview

```
Digital E-Gram Panchayat
├── Frontend (React + TypeScript + Tailwind CSS)
├── Backend (Firebase)
│   ├── Authentication (Firebase Auth)
│   ├── Database (Firestore)
│   ├── Hosting (Firebase Hosting)
│   └── Security (Firestore Rules)
├── Logging System (Firestore Collection)
└── Role-based Access Control
```

## 🚀 Features

### Core Functionality
- **Role-based Authentication**: Citizen, Staff, and Admin/Officer roles
- **Service Management**: Create, update, and manage government services
- **Online Applications**: Submit and track application status
- **Real-time Updates**: Live status tracking and notifications
- **Comprehensive Logging**: All user actions logged for audit trails

### User Roles & Permissions

#### Citizens
- Register and login to the platform
- Browse and search available services
- Submit online applications with required documents
- Track application status in real-time
- Manage personal profile

#### Staff
- Review pending applications
- Update application status (Under Review, Approved, Rejected)
- View application details and applicant information
- Process applications efficiently

#### Admin/Officer
- Full service management (create, edit, delete services)
- Override application statuses
- View comprehensive analytics and reports
- Manage system-wide settings

## 🛠️ Technology Stack

- **Frontend**: React 18, TypeScript, Tailwind CSS
- **Backend**: Firebase (Auth, Firestore, Hosting)
- **Routing**: React Router v6
- **State Management**: React Context API
- **UI Components**: Custom components with Lucide React icons
- **Notifications**: React Hot Toast
- **Date Handling**: date-fns
- **Build Tool**: Vite
- **Linting**: ESLint with TypeScript support

## 📦 Installation & Setup

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

3. **Firebase Setup**
   - Create a new Firebase project at [Firebase Console](https://console.firebase.google.com)
   - Enable Authentication (Email/Password)
   - Create a Firestore database
   - Copy your Firebase config

4. **Environment Configuration**
   ```bash
   cp .env.example .env
   ```
   Fill in your Firebase configuration in the `.env` file:
   ```env
   VITE_FIREBASE_API_KEY=your_api_key_here
   VITE_FIREBASE_AUTH_DOMAIN=your_project.firebaseapp.com
   VITE_FIREBASE_PROJECT_ID=your_project_id
   VITE_FIREBASE_STORAGE_BUCKET=your_project.appspot.com
   VITE_FIREBASE_MESSAGING_SENDER_ID=123456789
   VITE_FIREBASE_APP_ID=1:123456789:web:abc123def456
   ```

5. **Initialize Firebase**
   ```bash
   npm install -g firebase-tools
   firebase login
   firebase init
   ```

6. **Start development server**
   ```bash
   npm run dev
   ```

7. **Start Firebase emulators** (optional, for local development)
   ```bash
   npm run emulators
   ```

## 🧪 Testing

### Running Tests
```bash
# Run all tests
npm test

# Run tests in watch mode
npm run test:watch

# Run tests with coverage
npm run test:coverage
```

### Test Structure
```
tests/
├── components/
├── services/
├── utils/
└── integration/
```

## 🚀 Deployment

### Firebase Hosting
```bash
# Build the project
npm run build

# Deploy to Firebase
npm run deploy
```

### CI/CD with GitHub Actions
The project includes GitHub Actions workflow for automatic deployment:
- Triggers on push to `main` branch
- Runs tests and builds the project
- Deploys to Firebase Hosting

## 📊 Performance & Optimization

### Lighthouse Scores Target
- **Performance**: ≥ 90
- **Accessibility**: ≥ 90
- **Best Practices**: ≥ 90
- **SEO**: ≥ 90

### Optimization Features
- Lazy loading for route components
- Firestore query optimization with indexes
- Image optimization and caching
- Bundle splitting and code optimization

## 🔒 Security

### Firestore Security Rules
- Role-based access control
- Data validation and sanitization
- Audit trail for all operations

### Authentication
- Email/password authentication
- Secure session management
- Role-based route protection

## 📝 API Documentation

### Firestore Collections

#### Users Collection
```typescript
{
  uid: string;
  email: string;
  displayName: string;
  role: 'citizen' | 'staff' | 'admin';
  createdAt: Timestamp;
  updatedAt: Timestamp;
}
```

#### Services Collection
```typescript
{
  id: string;
  title: string;
  description: string;
  requiredDocuments: string[];
  fee: number;
  category: string;
  isActive: boolean;
  createdAt: Timestamp;
  createdBy: string;
}
```

#### Applications Collection
```typescript
{
  id: string;
  serviceId: string;
  serviceName: string;
  userId: string;
  userName: string;
  userEmail: string;
  status: 'pending' | 'under-review' | 'approved' | 'rejected';
  formData: Record<string, any>;
  submittedAt: Timestamp;
  updatedAt: Timestamp;
  updatedBy?: string;
  remarks?: string;
}
```

#### Logs Collection
```typescript
{
  id: string;
  userId: string;
  userEmail: string;
  userRole: string;
  action: string;
  details: Record<string, any>;
  timestamp: Timestamp;
  ipAddress?: string;
}
```

## 🤝 Contributing

### Development Workflow
1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

### Coding Standards
- Follow TypeScript best practices
- Use ESLint and Prettier for code formatting
- Write comprehensive tests for new features
- Follow the existing component structure
- Document complex functions and components

### Commit Convention
```
feat: add new feature
fix: bug fix
docs: documentation changes
style: formatting changes
refactor: code refactoring
test: adding tests
chore: maintenance tasks
```

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🆘 Support

For support and questions:
- Create an issue in the GitHub repository
- Email: support@grampanchayat.gov.in
- Documentation: [Project Wiki](link-to-wiki)

## 🙏 Acknowledgments

- Firebase team for the excellent backend services
- React team for the robust frontend framework
- Tailwind CSS for the utility-first CSS framework
- Lucide React for the beautiful icons
- All contributors who helped build this platform

---

**Digital E-Gram Panchayat** - Empowering rural communities through digital governance.