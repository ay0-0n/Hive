# Forum MERN Stack Project

Welcome to the Forum MERN Stack Project! This project is an online platform where people can hold conversations in the form of posted messages. Developed using the MERN stack (MongoDB, Express.js, React.js, Node.js), this project serves as a comprehensive example of building a full-stack application with a focus on real-time updates, responsive design, and secure authentication.

## Admin Credentials
- **Username:** admin
- **Password:** admin@1234

## Live Site URL
- [Client Side](https://hive-23537.web.app/)
- [Server Side](https://hive-forum.vercel.app/)

## Key Features
- **Responsive Design**: The application is fully responsive and optimized for mobile, tablet, and desktop views.
- **User Authentication**: Secure login and registration system with social login options with Firebase. ImgBB api for storing user images.
- **Real-Time Updates**: Real-time notifications for CRUD operations and successful authentication using sweet alerts/toasts using Swal.
- **Forum Functionality**: Users can post messages, comment, upvote/downvote posts, report and share posts.
- **Pagination**: Efficient pagination implemented for homepage.
- **Search and Tags**: Advanced search functionality based on tags, with backend implementation.
- **User Dashboard**: Personal dashboard for users to manage profiles, add posts, and managing posts with post visiblity option.
- **Admin Dashboard**: Comprehensive admin panel to manage users, reports management, and site announcements.
- **Data Fetching with Tanstack Query and Axios**: Utilized for GET requests to ensure efficient data fetching and caching.

## Project Structure

### Home Page
- **Navbar**: Includes logo, website name, Home, Membership, Anncouncement icon, and Join Us button.
- **Banner**: Features a search bar for searching posts based on tags.
- **Drawer**: Displays available tags for posts,Shows latest announcements and sort functionality Based on Popularity and Comments.
- **Posts Section**: Displays posts from newest to oldest with and pagination.

### Post Details
- **Post View**: Displays post details including author image, name, title, description, tags, time, comment count, and vote count.
- **Comment Section**: Allows logged-in users to comment, upvote/downvote, and share or report post / comments.

### Membership Page (Private Route)
- **Payment Page**: Users can become members to unlock additional features.

### User Dashboard (Private Route)
- **MyProfile**: Displays user information and recent posts with badges.
- **Add Post**: Form to add new posts.
- **MyPosts**: Lists user's posts with options to change visibilty, delete etc.

### Admin Dashboard (Private Route)
- **AdminProfile**: Admin details with a pie chart(Rechart) of site statistics. Add Tags section.
- **Manage Users**: List of users with options to make admin and delete users who are not admin. Sort and Searching Functionality
- **Reported Post & Comments**: View reported comments, posts and take action if necessary.
- **Make Announcement**: Form to create site announcements.

## Environment Variables

- **Frontend**: Firebase Config, ImgBB Api Key, Stripe Payment Gateway Key
- **Backend**: MongoDB Credentials, JWT Secret, STRIPE SECRET KEY

## Installation and Setup

1. **Clone the Repository**:

2. **Create .env files**

3. **Install Dependencies on Backend and Frontend**:
   ```bash
   npm install
