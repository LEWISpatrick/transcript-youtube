# AI YouTube Script Generator

## Overview

This project is a web application that uses AI to help users write YouTube scripts. It features a modern, responsive interface built with Next.js and React.

## Key Features

- AI-powered script generation
- User-friendly interface
- Responsive design for desktop and mobile

## Technologies

- Next.js
- React
- TypeScript
- Tailwind CSS
- Prisma
- Resend

## Getting Started

1. Clone the repository
2. Install dependencies: `npm install`
3. Run the development server: `npm run dev`
4. Add .env file with all the nessecarry data.
5. npm run database, to run 'schema.prisma'
6. Open [http://localhost:3000](http://localhost:3000) in your browser

## GROQ AI Setup

1. Go to [console.groq.com](https://console.groq.com) and create a Free account.
2. Click on the "Keys" link on the left and create a new key
3. Copy the key and paste it in the .env file:

```bash
GROQ_API_KEY="YOUR_API_KEY_GOES_HERE"
```

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## License

[MIT License](LICENSE)
