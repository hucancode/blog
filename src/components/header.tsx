import Link from 'next/link'

const Header = () => {
  return (
    <div className="flex items-start justify-start gap-4 py-8">
      <h2 className="text-2xl md:text-4xl font-bold tracking-tight md:tracking-tighter leading-tight">
        <Link href="/">
          <a className="hover:underline">Blog</a>
        </Link>
      </h2>
      <h2 className="text-2xl md:text-4xl font-bold tracking-tight md:tracking-tighter leading-tight">
        <Link href="/archive">
          <a className="hover:underline">Archive</a>
        </Link>
      </h2>
      <h2 className="text-2xl md:text-4xl font-bold tracking-tight md:tracking-tighter leading-tight">
        <Link href="/about">
          <a className="hover:underline">About</a>
        </Link>
      </h2>
    </div>
  )
}

export default Header
