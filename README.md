# Morgan Logger with Socket.IO

Effortlessly integrate Winston logger for real-time log monitoring across machines. Transmit logs instantly, customize formats, and centralize logging management. Ideal for distributed systems and monitoring applications.

## Features

- Real-time log monitoring across multiple machines.
- Customizable log formats to suit your needs.
- Easy setup and configuration.

## Prerequisites

- Node.js and npm installed.

## Installation

1. Clone this repository.
2. Install the required dependencies using `npm install`.

## Usage

1. Start the server on the machine where logs are generated:

   ```sh
   npm run index.js
   ```
2. Run the client on the remote machine where you want to monitor logs:
   ```sh
   npm run ec2.js
   ```
3. You will now see log messages from the server appearing on the client machine in real-time.

## Customization
- Adjust the log formats in the index.js file to tailor the log messages to your needs.
- Modify the server and client configurations to match your setup.

## License
This project is licensed under the MIT License. See the LICENSE file for details.
