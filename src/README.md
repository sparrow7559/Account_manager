# React Account Management Application

A React application for user account management with authentication, registration, and profile editing functionality.

## Features

- **User Registration**: Create new accounts with email and password
- **User Login**: Authenticate with email and password
- **Account Management**: View and edit user profile information
- **Protected Routes**: Secure pages that require authentication
- **Form Validation**: Client-side validation for all forms
- **Error Handling**: Graceful error handling with user-friendly messages
- **Responsive Design**: Mobile-friendly interface using Bootstrap

## Technical Stack

- **React** (v16+)
- **React Router** - For navigation and routing
- **React Context API** - For state management
- **Bootstrap** - For styling and UI components
- **TypeScript** - For type safety
- **LocalStorage** - For data persistence

## Project Structure

```
/
├── App.tsx                 # Main application component with routing
├── context/
│   └── AuthContext.tsx    # Authentication context and logic
├── components/
│   ├── Login.tsx          # Login page component
│   ├── Register.tsx       # Registration page component
│   ├── Account.tsx        # Account management page
│   └── PrivateRoute.tsx   # Protected route wrapper
└── README.md              # This file
```

## How to Run

1. **Clone the repository**
   ```bash
   git clone <your-repository-url>
   cd <repository-name>
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Start the development server**
   ```bash
   npm run dev
   ```

4. **Open in browser**
   Navigate to `http://localhost:5173` (or the port shown in terminal)

## Usage

### Registration
1. Navigate to the registration page
2. Fill in all required fields:
   - First Name
   - Last Name
   - Email Address
   - Password (minimum 6 characters)
   - Confirm Password
3. Click "Register" to create your account
4. You'll be redirected to the login page upon successful registration

### Login
1. Enter your registered email and password
2. Click "Login" to authenticate
3. You'll be redirected to your account page upon successful login

### Account Management
1. After logging in, you'll see your account information
2. Click "Edit Profile" to modify your information
3. Update any of the following fields:
   - First Name
   - Last Name
   - Email Address
   - Phone Number (optional)
4. Click "Save Changes" to update your profile
5. Click "Cancel" to discard changes
6. Click "Logout" to end your session

## Data Storage

This application uses browser localStorage for data persistence:
- **users**: Array of all registered users (includes passwords)
- **currentUser**: Currently logged-in user information

**Note**: This is a demonstration application. In a production environment, you should:
- Use a proper backend API
- Hash passwords securely
- Implement token-based authentication
- Use secure HTTPS connections
- Never store sensitive data in localStorage

## Form Validation

The application includes comprehensive form validation:

### Registration Validation
- All fields are required
- Email must be in valid format
- Password must be at least 6 characters
- Passwords must match
- Email must be unique

### Login Validation
- All fields are required
- Email must be in valid format
- Credentials must match registered user

### Profile Update Validation
- First name, last name, and email are required
- Email must be in valid format
- Phone number must contain only valid characters (if provided)

## Error Handling

The application handles various error scenarios:
- Invalid login credentials
- Duplicate email during registration
- Form validation errors
- Missing required fields
- Network errors (simulated)

All errors are displayed to users with clear, actionable messages.

## Future Enhancements

Potential improvements for this application:
- Backend API integration (e.g., Supabase, Firebase)
- Password reset functionality
- Email verification
- Password strength indicator
- Profile picture upload
- Session timeout
- Remember me functionality
- Social authentication (Google, Facebook, etc.)

## Browser Compatibility

This application works on all modern browsers:
- Chrome (recommended)
- Firefox
- Safari
- Edge

## License

This project is created for interview purposes.

## Contact

For questions or issues, please contact the repository owner.
