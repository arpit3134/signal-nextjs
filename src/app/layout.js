import './globals.css'

export const metadata = {
  title: 'Signal — The signal for what\'s next',
  description: 'Discover articles, ideas, and insights across every topic that matters.',
  keywords: 'articles, blog, insights, tools, technology, AI, finance, health',
  authors: [{ name: 'Signal Team' }],
  openGraph: {
    title: 'Signal — The signal for what\'s next',
    description: 'Discover articles, ideas, and insights across every topic that matters.',
    type: 'website',
  },
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        <link href="https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,400;0,500;0,600;0,700;0,800;0,900;1,400&family=DM+Sans:opsz,wght@9..40,300;9..40,400;9..40,500;9..40,600;9..40,700&family=DM+Mono:wght@300;400;500&display=swap" rel="stylesheet" />
      </head>
      <body>{children}</body>
    </html>
  )
}
