# Verse App

**Verse App** is a web application designed to provide a new Bible verse every day. The app allows users to view the verse of the day, receive notifications, and explore previous verses. It is built using **Laravel 10.10**, with a front-end powered by **React**, **Vite** for asset bundling, and **Tailwind CSS** for styling.

## Features

- **Daily Verse**: Displays a different verse each day.
- **Verse History**: Users can view previous verses.
- **Notifications**: Users can receive daily notifications with the verse of the day.
- **Responsive Design**: Optimized to work properly on mobile devices, tablets, and desktops.
- **Modern UI**: Styled with **Tailwind CSS** and built with **React** components.

## Requirements

To run the project on your local environment, you need the following requirements installed:

- **PHP** (version 8.1 or higher)  
- **Laravel 10.10**
- **Composer** for PHP dependency management
- **Node.js** (version 16 or higher) for front-end dependencies
- **MySQL** or **SQLite** (for database)

## Installation

Follow these steps to get the project up and running on your local machine:

1. Clone the repository to your local machine:
    ```bash
    git clone https://github.com/yourusername/verse-app.git
    ```

2. Navigate to the project directory:
    ```bash
    cd verse-app
    ```

3. Install PHP dependencies:
    ```bash
    composer install
    ```

4. Set up the `.env` file (you can copy `.env.example` to `.env`):
    ```bash
    cp .env.example .env
    ```

5. Generate the application key:
    ```bash
    php artisan key:generate
    ```

6. Set up the database configuration in the `.env` file.

7. Run the migrations to create the necessary database tables:
    ```bash
    php artisan migrate
    ```

8. Install front-end dependencies using **npm** or **yarn**:
    ```bash
    npm install
    ```

9. Start the Vite development server for front-end assets:
    ```bash
    npm run dev
    ```

10. Run the Laravel development server:
    ```bash
    php artisan serve
    ```

Now, the application should be running at [http://localhost:8000](http://localhost:8000).

## Usage

Once the application is up and running, you can access it at [http://localhost:8000](http://localhost:8000).

### Available Features:

- **View Daily Verse**: Users can view the verse of the day on the homepage.
- **Verse History**: Users can browse previous verses from their dashboard.
- **Notifications**: Users will receive a daily notification with the verse of the day.
- **Responsive Design**: The application is mobile-friendly, adjusting layouts based on screen size.
- **Modern UI**: Built with React components and styled using Tailwind CSS.

## Technologies Used

- **Laravel 10.10**: PHP framework for web development.
- **Vite**: Fast build tool for modern web development, used to compile and bundle assets.
- **React**: JavaScript library for building user interfaces, powering the front-end.
- **Tailwind CSS**: Utility-first CSS framework for rapid UI development.
- **MySQL** or **SQLite**: Database management system.
- **Blade**: Laravel’s templating engine for the back-end.

## Contributions

If you'd like to contribute to the project, please follow these steps:

1. Fork the repository.
2. Create a new branch (`git checkout -b feature/new-feature`).
3. Make your changes and commit them (`git commit -am 'Add new feature'`).
4. Push your branch (`git push origin feature/new-feature`).
5. Open a Pull Request explaining the changes you made.

## License

This project is licensed under the [MIT License](https://opensource.org/licenses/MIT).

## Contact

For inquiries or questions, please contact [nohiriavg@gmail.com](mailto:nohiriavg@gmail.com).
