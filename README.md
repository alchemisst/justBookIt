# Just Book It

A simple booking management system built with Vite and React that allows users to book slots and manage a waiting list.

## Getting Started

### Prerequisites

- Node.js (v14 or higher)
- npm

### Installation

1. Clone the repository

```bash
git clone https://github.com/alchemisst/justBookIt.git
cd just-book-it
```

2. Install dependencies

```bash
npm install
```

3. Set up environment variables
   Create a `.env` file in the root directory and add:

```
VITE_APP_TOTAL_SLOTS=10
```

You can customize the total number of available slots by modifying this value.

### Running the Application

Start the development server:

```bash
npm run dev
```

The application will be available at `http://localhost:5173`

## Environment Variables

| Variable             | Description                                 | Default |
| -------------------- | ------------------------------------------- | ------- |
| VITE_APP_TOTAL_SLOTS | Total number of slots available for booking | 5       |

## License

MIT
