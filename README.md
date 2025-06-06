# Ventixe - Event Management Frontend

This is the frontend application for the Ventixe event management system, built using React and Vite. The application interfaces with several microservices to provide a complete event management solution.



## Microservices Integration

The frontend interfaces with the following microservices:

- **AuthService**: User authentication and authorization
- **EventService**: Event management
- **BookingService**: Booking management
- **PaymentService**: Payment processing
- **NotificationService**: User notifications
- **CategoryService**: Event categories
- **InvoiceService**: Invoice generation and management
- **UserProfileService**: User profile management

## Getting Started

### Prerequisites

- Node.js (LTS version recommended)
- npm or yarn

### Installation

1. Clone the repository:

   ```
   git clone <repository-url>
   cd Frontend
   ```

2. Install dependencies:

   ```
   npm install
   ```

3. Create a `.env` file in the root directory with the following variables:

   ```
   REACT_APP_AUTH_API_URL=http://localhost:5001/api
   REACT_APP_EVENTS_API_URL=http://localhost:5002/api
   REACT_APP_BOOKINGS_API_URL=http://localhost:5003/api
   REACT_APP_PAYMENTS_API_URL=http://localhost:5004/api
   REACT_APP_NOTIFICATIONS_API_URL=http://localhost:5005/api
   REACT_APP_CATEGORIES_API_URL=http://localhost:5006/api
   REACT_APP_INVOICES_API_URL=http://localhost:5007/api
   REACT_APP_USER_PROFILES_API_URL=http://localhost:5008/api
   ```

   Adjust the URLs as needed for your development or production environment.

### Running the Application

To start the development server:

```
npm run dev
```

The application will be available at [http://localhost:3000](http://localhost:3000).

## Building for Production

To build the application for production:

```
npm run build
```

This will create a `dist` directory with the compiled and optimized application.
