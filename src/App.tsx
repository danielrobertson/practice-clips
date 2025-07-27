import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import cloudflareLogo from './assets/Cloudflare_Logo.svg'
import './App.css'
import { Button } from './components/ui/button'
import { ThemeToggle } from './components/theme-toggle'

function App() {
  const [count, setCount] = useState(0)
  const [name, setName] = useState('unknown')

  return (
    <div className="min-h-screen bg-background text-foreground transition-colors duration-300">
      {/* Header */}
      <header className="flex items-center justify-between p-4 border-b border-border">
        <h1 className="text-2xl font-bold">Vite + React + Cloudflare</h1>
        <ThemeToggle />
      </header>

      <main className="container mx-auto p-6 space-y-6">
        {/* Logo section */}
        <div className='flex flex-row gap-4 justify-center'>
          <a href='https://vite.dev' target='_blank'>
            <img src={viteLogo} className='logo' alt='Vite logo' />
          </a>
          <a href='https://react.dev' target='_blank'>
            <img src={reactLogo} className='logo react' alt='React logo' />
          </a>
          <a href='https://workers.cloudflare.com/' target='_blank'>
            <img src={cloudflareLogo} className='logo cloudflare' alt='Cloudflare logo' />
          </a>
        </div>

        {/* Cards section */}
        <div className="grid gap-6 md:grid-cols-2">
          <div className='card bg-card text-card-foreground border border-border rounded-lg p-6 shadow-sm'>
            <Button
              onClick={() => setCount((count) => count + 1)}
              aria-label='increment'
              className="w-full mb-4"
            >
              count is {count}
            </Button>
            <p className="text-muted-foreground">
              Edit <code className="bg-muted px-1 py-0.5 rounded text-sm">src/App.tsx</code> and save to test HMR
            </p>
          </div>

          <div className='card bg-card text-card-foreground border border-border rounded-lg p-6 shadow-sm'>
            <Button
              onClick={() => {
                fetch('/api/')
                  .then((res) => res.json() as Promise<{ name: string }>)
                  .then((data) => setName(data.name))
              }}
              aria-label='get name'
              className="w-full mb-4"
            >
              Name from API is: {name}
            </Button>
            <p className="text-muted-foreground">
              Edit <code className="bg-muted px-1 py-0.5 rounded text-sm">worker/index.ts</code> to change the name
            </p>
          </div>
        </div>

        {/* Demo section showing different Tailwind classes */}
        <div className="space-y-4">
          <h2 className="text-xl font-semibold">Theme Override Demo</h2>
          <p className="text-muted-foreground">
            Click the sun/moon icon in the top right to override your system preference. 
            The app will remember your choice and can still follow system changes when set to "system".
          </p>
          <div className="grid gap-4 md:grid-cols-3">
            <div className="bg-primary text-primary-foreground p-4 rounded-lg">
              <h3 className="font-medium">Primary</h3>
              <p className="text-sm opacity-90">Primary background and text</p>
            </div>
            <div className="bg-secondary text-secondary-foreground p-4 rounded-lg">
              <h3 className="font-medium">Secondary</h3>
              <p className="text-sm opacity-90">Secondary background and text</p>
            </div>
            <div className="bg-muted text-muted-foreground p-4 rounded-lg">
              <h3 className="font-medium">Muted</h3>
              <p className="text-sm opacity-90">Muted background and text</p>
            </div>
          </div>
        </div>

        <p className='read-the-docs text-center text-muted-foreground'>
          Click on the Vite and React logos to learn more
        </p>
      </main>
    </div>
  )
}

export default App
