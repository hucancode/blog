import Container from './container'
import { EXAMPLE_PATH } from 'lib/constants'

const Footer = () => {
  return (
    <footer className="bg-neutral-50 border-t border-neutral-200">
      <Container>
        <div className="py-6 flex flex-col lg:flex-row items-center">
          <h3 className="text-lg font-bold tracking-tighter leading-tight text-center lg:text-left mb-10 lg:mb-0 lg:pr-4 lg:w-1/2">
            Powered by{' '}
            <a href="https://nextjs.org"
              target="_blank"
              className="text-blue-400 hover:text-blue-600">Next.js</a>{' '}and{' '}
            <a href="https://www.buymeacoffee.com/hucancode"
              target="_blank"
              className="text-blue-400 hover:text-blue-600">Coffee</a>
          </h3>
          <div className="flex flex-col lg:flex-row justify-center items-center lg:pl-4 lg:w-1/2">
            <a
              href="https://hucanco.de"
              className="mx-3 bg-black hover:bg-white hover:text-black border border-black text-white font-bold py-3 px-12 lg:px-8 duration-200 transition-colors mb-6 lg:mb-0"
            >
              My Portfolio
            </a>
            <a
              href="https://github.com/hucancode"
              className="mx-3 bg-black hover:bg-white hover:text-black border border-black text-white font-bold py-3 px-12 lg:px-8 duration-200 transition-colors mb-6 lg:mb-0"
            >
              My GitHub
            </a>
          </div>
        </div>
      </Container>
    </footer>
  )
}

export default Footer
