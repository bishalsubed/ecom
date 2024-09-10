'use client'

import { useState } from 'react'
import { Dialog, DialogPanel } from '@headlessui/react'
import { Bars3Icon, XMarkIcon } from '@heroicons/react/24/outline'
import { useSession, signIn, signOut } from 'next-auth/react'
import { Button } from './ui/button'
import Link from 'next/link'

const navigation = [
  { name: 'Products', href: '/dashboard' },
  { name: 'Features', href: '/' },
  { name: 'Contact Us', href: '/contact' },
  { name: 'About Us', href: '/about' },
]

export default function Example() {
  const { data: session, status } = useSession()
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

  return (
    <div className="bg-green-50 py-12 mb-6">
      <header className="absolute inset-x-0 -top-4 z-50">
        <nav aria-label="Global" className="flex items-center justify-between lg:px-6">
          <div className="flex lg:flex-1">
            <a href={"/"} className="-m-1 p-1">
              <span className="sr-only">GharSadhan</span>
              <img
                alt=""
                src="/gharsadhan-logo-transformed.webp"
                className="h-28 w-28"
              />
            </a>
          </div>
          <div className="flex lg:hidden">
            <button
              type="button"
              onClick={() => setMobileMenuOpen(true)}
              className="-m-2.5 inline-flex items-center justify-center rounded-md p-[1.625rem] text-gray-700"
            >
              <span className="sr-only">Open main menu</span>
              <Bars3Icon aria-hidden="true" className="h-6 w-6" />
            </button>
          </div>
          <div className="hidden lg:flex lg:gap-x-12">
            {navigation.map((item) => (
              <Link key={item.name} href={item.href} className="text-sm font-semibold  cursor-pointer transition-transform duration-200 hover:translate-y-[-2px] leading-6 text-gray-900 hover:underline-offset-8 hover:underline decoration-[2px] decoration-green-400">
                {item.name}
              </Link>
            ))}
          </div>
          {!session && (
            <div className="hidden gap-4 lg:flex lg:flex-1 lg:justify-end">
              <Link href={"/sign-up"}><button className="text-gray-900 bg-gradient-to-r from-teal-200 to-lime-200 hover:bg-gradient-to-l hover:from-teal-200 hover:to-lime-200 focus:ring-4 focus:outline-none focus:ring-lime-200 dark:focus:ring-teal-700 font-medium rounded-lg text-sm px-6 py-3 text-center me-2">SignUp</button></Link>
              <Link href={"/sign-in"}><button className="relative inline-flex items-center justify-center p-0.5 me-2 overflow-hidden text-sm font-semibold text-gray-900 rounded-md group bg-gradient-to-br from-green-400 to-blue-600 group-hover:from-green-400 group-hover:to-blue-600 hover:text-white dark:text-white focus:ring-4 focus:outline-none focus:ring-green-200 dark:focus:ring-green-800">
                <span className="relative text-sm font-semibold leading-6 px-3 py-1.5 transition-all ease-in duration-75 bg-green-50 dark:bg-gray-900 rounded-md group-hover:bg-opacity-0">
                  Login <span aria-hidden="true">&rarr;</span>
                </span>
              </button></Link>
            </div>
          )}
          {session && (
            <div className="hidden lg:flex lg:flex-1 lg:justify-end">
              <button className="relative inline-flex items-center justify-center p-0.5 me-2 overflow-hidden text-sm font-medium text-gray-900 rounded-md group bg-gradient-to-br from-green-400 to-blue-600 group-hover:from-green-400 group-hover:to-blue-600 hover:text-white dark:text-white focus:ring-4 focus:outline-none focus:ring-green-200 dark:focus:ring-green-800" onClick={() => { signOut() }}>
                <span className="relative text-sm font-semibold leading-6 px-3 py-1.5 transition-all ease-in duration-75 bg-green-50 dark:bg-gray-900 rounded-md group-hover:bg-opacity-0">
                  SignOut<span aria-hidden="true">&rarr;</span>
                </span>
              </button>
            </div>
          )}

        </nav>
        <Dialog open={mobileMenuOpen} onClose={setMobileMenuOpen} className="lg:hidden">
          <div className="fixed inset-0 z-50" />
          <DialogPanel className="fixed inset-y-0 right-0 z-50 w-full overflow-y-auto bg-white px-6 py-6 sm:max-w-sm sm:ring-1 sm:ring-gray-900/10">
            <div className="flex items-center justify-between">
              <a href="/" className="-m-1.5 p-1.5">
                <span className="sr-only">GharSadhan</span>
                <img
                  alt=""
                  src="/gharsadhan-logo-transformed.webp"
                  className="h-28 w-28"
                />
              </a>
              <button
                type="button"
                onClick={() => setMobileMenuOpen(false)}
                className="-m-2.5 rounded-md p-2.5 text-gray-700"
              >
                <span className="sr-only">Close menu</span>
                <XMarkIcon aria-hidden="true" className="h-6 w-6" />
              </button>
            </div>
            <div className="mt-6 flow-root">
              <div className="-my-6 divide-y divide-gray-500/10">
                <div className="space-y-2 py-6">
                  {navigation.map((item) => (
                    <a
                      key={item.name}
                      href={item.href}
                      className="-mx-3 block rounded-lg px-3 py-2 text-base font-semibold leading-7 text-gray-900 hover:bg-gray-50"
                    >
                      {item.name}
                    </a>
                  ))}
                </div>
                <div className="py-6">
                  <Link
                    href={"/sign-in"}
                    className="-mx-3 block rounded-lg px-3 py-2.5 text-base font-semibold leading-7 text-gray-900 hover:bg-gray-50"
                  >
                    Login
                  </Link>
                </div>
              </div>
            </div>
          </DialogPanel>
        </Dialog>
      </header>


    </div>
  )
}