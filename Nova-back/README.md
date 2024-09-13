# Nova Kyiv backend

## Description
This backend service is designed for an e-commerce shop, facilitating efficient data management and seamless data transfer between the database and the frontend. It ensures that all necessary information is saved, processed, and delivered to the user interface, providing a smooth and reliable shopping experience.

## Requirements

Ensure that Node.js is installed on your machine before starting.

## Setup and Run Backend

To run the backend, create a `.env` file in the root of the project with the following environment variables:

1. PORT=3000 
2. EMAIL_USER=example@mail.com 
3. EMAIL_PASS=yourpassword

When steps above are done: 

1. Open your terminal and navigate to the backend folder:
    ```bash
    cd nova-back
    ```

2. Initialize the project using npm:
    ```bash
    npm init
    ```

3. Start the server:
    ```bash
    npm start
    ```

## Additional Information

Files such as `data.json`, `callback.json`, and `subscribe.json` are currently used for local data storage. In the future, these files should be adapted and migrated to a database.

## Contributing

You are welcome to contribute to the project by forking the repository, creating a new branch, and submitting a pull request.

## Author

Fully developed and created by Antonii Bondar.
