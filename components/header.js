import { appName } from '../app.config.js'

export default function Header(){
  return (
    <header className="w-full border-b border-solid border-gray-500">
      <nav aria-label="Main" role="navigation" className="flex flex-wrap justify-center sm:justify-between items-center max-w-3xl mx-auto sm:px-4 sm:space-x-4">

          <a className="text-3xl text-gray-800 font-light tracking-tighter my-2" href="/">{appName}</a>
          <div hidden>Menu</div>
          <ul className="w-full sm:w-auto flex flex-col sm:flex-row sm:space-x-4 border-t sm:border-0 border-solid border-gray-500">
            <li><a className="justify-center text-current" href="/denizens/">Denizens</a></li>
            <li><a className="justify-center text-current" href="/about/">About</a></li>
          </ul>

      </nav>
    </header>
  );
}
