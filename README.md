# Windermere Admin Frontend

This is the admin dashboard for the Windermere property management system.

## Features

- **Authentication**: Complete user registration, login, and password reset
- **Property Management**: Create, edit, delete, and view properties
- **Gallery Management**: Upload and manage property gallery images with tags
- **Review Management**: Approve, reject, reply to, and delete customer comments
- **Real-time API Integration**: Connected to the backend API

## Setup Instructions

### 1. Environment Configuration

Create a `.env.local` file in the root directory with:

```env
NEXT_PUBLIC_API_URL=http://localhost:4000/api
```

### 2. Install Dependencies

```bash
npm install
```

### 3. Start the Development Server

```bash
npm run dev
```

The admin interface will be available at `http://localhost:3000`

## API Integration

The admin frontend is fully integrated with the backend API and includes:

### Authentication APIs
- `POST /api/auth/register` - Register new admin user
- `POST /api/auth/login` - Admin login
- `POST /api/auth/admin/request-password-reset` - Request password reset
- `POST /api/auth/admin/verify-reset-code` - Verify reset code
- `POST /api/auth/admin/reset-password` - Reset password

### Property APIs
- `GET /api/properties` - List all properties
- `GET /api/properties/:id` - Get property details
- `POST /api/properties` - Create new property
- `PUT /api/properties/:id` - Update property
- `DELETE /api/properties/:id` - Delete property

### Gallery APIs
- `GET /api/properties/:id/gallery` - Get property gallery
- `POST /api/properties/:id/gallery` - Upload gallery images
- `DELETE /api/properties/gallery/:imageId` - Delete gallery image
- `PATCH /api/properties/gallery/:imageId` - Update gallery image tag

### Comment APIs
- `GET /api/comments` - List all comments (with optional filters)
- `PATCH /api/comments/:id/approve` - Approve comment
- `PATCH /api/comments/:id/reject` - Reject comment
- `POST /api/comments/:id/reply` - Reply to comment
- `DELETE /api/comments/:id` - Delete comment

## Usage

### Authentication
1. **Registration**: Navigate to `/auth/signup` to create a new admin account
2. **Login**: Navigate to `/auth/signin` to access the admin dashboard
3. **Password Reset**: Use `/auth/forgot-password` to reset your password
4. **Password Requirements**: Minimum 8 characters with uppercase, lowercase, number, and special character

### Property Management
1. Navigate to `/property` to view all properties
2. Click "Add New Property" to create a new property
3. Click "View Details" on any property to edit or manage its gallery
4. Use the edit mode to update property details and features
5. Upload gallery images with appropriate tags (exterior, interior, surroundings)

### Review Management
1. Navigate to `/reviews` to view all customer comments
2. Filter comments by status (pending, approved, rejected)
3. Approve or reject pending comments
4. Reply to comments with admin responses
5. Delete inappropriate comments

## File Structure

```
windermere-admin/
├── app/
│   ├── auth/
│   │   ├── signin/
│   │   │   └── page.tsx          # Admin login
│   │   ├── signup/
│   │   │   └── page.tsx          # Admin registration
│   │   └── forgot-password/
│   │       └── page.tsx          # Password reset
│   ├── property/
│   │   ├── page.tsx              # Property list page
│   │   └── [id]/
│   │       └── page.tsx          # Property detail page
│   └── reviews/
│       └── page.tsx              # Reviews/comments management
├── lib/
│   └── api.ts                    # API client and types
├── hooks/
│   └── use-api.ts                # Custom hooks for API operations
└── components/
    └── ui/                       # UI components
```

## Testing the Integration

### 1. Start the Backend
```bash
cd backend
npm run backend
```

### 2. Start the Admin Frontend
```bash
cd windermere-admin
npm run dev
```

### 3. Test Authentication
1. Navigate to `/auth/signup` and create a new admin account
2. Navigate to `/auth/signin` and login with your credentials
3. Test password reset functionality at `/auth/forgot-password`

### 4. Test Property Operations
1. Create a new property with images
2. Edit property details and features
3. Upload and manage gallery images
4. Delete properties

### 5. Test Review Management
1. Handle comments and replies
2. Approve/reject comments
3. Filter comments by status

## Authentication Flow

### Registration
1. User fills out registration form with name, email, and password
2. Password validation ensures security requirements
3. Account is created in the database
4. User is redirected to login page

### Login
1. User enters email and password
2. Credentials are verified against database
3. JWT token is generated and stored
4. User is redirected to property dashboard

### Password Reset
1. User requests password reset with email
2. Reset code is generated and logged to console (for demo)
3. User enters the code to verify
4. User sets new password with validation
5. User is redirected to login page

## Notes

- The admin interface requires authentication
- Property creation requires exactly 4 featured images
- Gallery images must be tagged as exterior, interior, or surroundings
- All API calls include proper error handling and loading states
- The interface uses real-time data from the backend API
- Password reset codes are logged to console for demo purposes
- JWT tokens are automatically managed and included in API requests 