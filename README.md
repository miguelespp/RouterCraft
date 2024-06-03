# RouterCraft

RouterCraft is a route mapping project built with Laravel and React.

## Features

- User authentication using JWT (JSON Web Tokens)
- Interactive route mapping interface
- Real-time updates of route data
- Route optimization algorithms

## Technologies Used

- Backend: Laravel with JWT authentication
- Frontend: React

## Installation

1. Clone the repository:

    ```bash
    git clone https://github.com/your-username/RouterCraft.git
    ```

2. Install the backend dependencies:

    ```bash
    cd RouterCraft/Backend-RouterCraft
    composer install
    ```

3. Set up the database:

    ```bash
    cp .env.example .env
    php artisan key:generate
    php artisan migrate
    ```

4. Install the frontend dependencies:

    ```bash
    cd ../Frontend-RouterCraft
    npm install
    ```

5. Start the development server:

    ```bash
    php artisan serve
    npm run dev
    ```

## Usage

1. Open your browser and navigate to `http://localhost:5173`.
2. Sign up or log in to access the route mapping interface.
3. Start mapping your routes and enjoy the features of RouterCraft!

## Contributing

Contributions are welcome! Please follow the guidelines in [CONTRIBUTING.md](CONTRIBUTING.md).

## License

This project is licensed under the [MIT License](LICENSE).