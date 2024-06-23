/**
 * v0 by Vercel.
 * @see https://v0.dev/t/kYxsrRfgvb4
 * Documentation: https://v0.dev/docs#integrating-generated-code-into-your-nextjs-app
 */
import Link from "next/link"

export default function Navbar() {
  return (
    <header className="flex h-16 items-center justify-between px-4 md:px-6 bg-gray-100">
      <Link href="#" className="flex items-center gap-2" prefetch={false}>
        <MountainIcon className="h-6 w-6" />
        <span className="text-lg font-semibold">Sea Salon</span>
      </Link>
      <nav className="hidden gap-4 text-sm font-medium md:flex">
        <Link href="/" className="hover:underline" prefetch={false}>
          Home
        </Link>
        <Link href="review" className="hover:underline" prefetch={false}>
          Review
        </Link>
        <Link href="#" className="hover:underline" prefetch={false}>
          Services
        </Link>
        <Link href="#" className="hover:underline" prefetch={false}>
          Contact
        </Link>
      </nav>
    </header>
  )
}

function MountainIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="m8 3 4 8 5-5 5 15H2L8 3z" />
    </svg>
  )
}