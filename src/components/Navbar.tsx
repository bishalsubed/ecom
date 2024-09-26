'use client'

import { useEffect, useState } from 'react'
import { Dialog, DialogPanel } from '@headlessui/react'
import { Bars3Icon, XMarkIcon } from '@heroicons/react/24/outline'
import { useSession, signIn, signOut } from 'next-auth/react'
import Link from 'next/link'
import { ModeToggle } from './theme-toggle'
import { Button } from './ui/button'
import { useToast } from './ui/use-toast'
import { useCart } from '@/context/CardContext'
import {
  Sheet,
  SheetClose,
  SheetFooter,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet"
import { CartItemType } from '@/helpers/cartHelper'

const navigation = [
  { name: 'Products', href: '/dashboard' },
  { name: 'Features', href: '/' },
  { name: 'Contact Us', href: '/contact' },
  { name: 'About Us', href: '/about' },
]

export default function Example() {
  const { data: session, status } = useSession()
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const { toast } = useToast()
  const { cart, subTotal, clearCart, removeFromCart, increaseQuantity, decreaseQuantity } = useCart();

  const handleRemoveFromCart = (id: string) => {
    try {
      removeFromCart(id)
      toast({
        title: "Success",
        description: "Product Removed from the cart",
      });
    } catch (error) {
      toast({
        title: "Error occured",
        description: "Unable to remove product from the cart",
        variant: "destructive"
      });
    }
  }

  const handleClearCart = () => {
    try {
      clearCart()
      toast({
        title: "Success",
        description: "Product cart cleared",
      });
    } catch (error) {
      toast({
        title: "Error occured",
        description: "Unable to clear product cart",
        variant: "destructive"
      });
    }
  }

  const handleIncreaseQuantity = (id: string) => {
    try {
      increaseQuantity(id)
    } catch (error) {
      toast({
        title: "Error occured",
        description: "Unable to add product quantity",
        variant: "destructive"
      });
    }
  }

  const handleDecreaseQuantity = (id: string) => {
    try {
      decreaseQuantity(id)
    } catch (error) {
      toast({
        title: "Error occured",
        description: "Unable to subtract product quantity",
        variant: "destructive"
      });
    }
  }



  return (
    <div className="bg-green-50 dark:bg-gray-950 py-12 mb-6">
      <header className="absolute inset-x-0 -top-4 z-50">
        <nav aria-label="Global" className="flex items-center justify-between lg:px-6">
          <div className="flex lg:flex-1">
            <a href={"/"} className="-m-1 p-1 dark:invert">
              <span className="sr-only">GharSadhan</span>
              <img
                alt=""
                src="/gharsadhan-logo-transformed.webp"
                className="h-28 w-28"
              />
            </a>
          </div>
          <div className="hidden lg:flex lg:gap-x-12">
            {navigation.map((item) => (
              <Link key={item.name} href={item.href} className="dark:text-white text-sm font-semibold  cursor-pointer transition-transform duration-200 hover:translate-y-[-2px] leading-6 text-gray-900 hover:underline-offset-8 hover:underline decoration-[2px] decoration-green-400 dark:decoration-orange-500">
                {item.name}
              </Link>
            ))}
          </div>
          {!session && (
            <div className="hidden gap-4 lg:flex lg:flex-1 lg:justify-end items-center">
              <Link href={"/sign-up"}><button className="text-gray-900 bg-gradient-to-r from-teal-200 to-lime-200 hover:bg-gradient-to-l hover:from-teal-200 hover:to-lime-200 focus:ring-4 focus:outline-none focus:ring-lime-200 dark:focus:ring-teal-700 font-medium rounded-lg text-sm px-6 py-[12px] text-center me-2">SignUp</button></Link>
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
          <div className='mx-4'>
            <ModeToggle />
          </div>
          {session && (<div className='mx-4'>
            <Sheet>
              <SheetTrigger asChild>
                <Button variant="outline">View Cart</Button>
              </SheetTrigger>
              <SheetContent className='flex flex-col h-full'>
                <SheetHeader>
                  <SheetTitle>Your Cart</SheetTitle>
                  <SheetDescription>
                    Review your items before checkout. Modify quantity or remove items if needed.
                  </SheetDescription>
                </SheetHeader>
                {cart.length == 0 ? (
                  <div className="text-center text-lg font-semibold text-gray-500 py-20">
                    Looks like your cart is empty.
                  </div>
                ) :
                  (<div className="flex-1 overflow-y-auto space-y-2">
                    {cart.map(((product: CartItemType, index: number) => (
                      <div key={index} className="flex space-x-2 gap-3 py-3 items-center">
                        <div className="w-1/4">
                          <img
                            alt={`${product.name} image`}
                            className="cursor-pointer object-cover object-center w-full h-auto max-h-20"
                            src={product.img}
                          />
                        </div>
                        <div className="w-3/4 flex flex-col justify-between">
                          <div className="font-medium sm:text-lg uppercase">
                            {product.name}
                          </div>
                          <div className="flex justify-between items-center mt-2">
                            <div className=" flex gap-2 font-medium">
                              <button onClick={() => { handleIncreaseQuantity(product.id) }}>
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
                                  <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v6m3-3H9m12 0a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
                                </svg>
                              </button>
                              {product.quantity}
                              <button onClick={() => { handleDecreaseQuantity(product.id) }}>
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
                                  <path strokeLinecap="round" strokeLinejoin="round" d="M15 12H9m12 0a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
                                </svg>
                              </button>

                            </div>
                            <div id="price" className="text-sm font-medium">
                              रु.{(product.price) * (product.quantity)}
                            </div>
                            <button
                              type="button"
                              className="flex items-center justify-center"
                              onClick={() => handleRemoveFromCart(product.id)}
                            >
                              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
                                <path strokeLinecap="round" strokeLinejoin="round" d="m9.75 9.75 4.5 4.5m0-4.5-4.5 4.5M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
                              </svg>
                            </button>
                          </div>
                        </div>
                      </div>
                    )))}
                    <div className='flex justify-center tracking-tight font-medium bg-green-100 p-2 mt-auto'>
                      SubTotal: रु. <span className='font-semibold'>{subTotal}</span>
                    </div>

                  </div>)}
                {cart.length > 0 && (
                  <SheetFooter className="border-t p-4 flex justify-between">
                    <SheetClose asChild>
                      <Button type="button" onClick={() => { handleClearCart() }} className="w-full bg-red-500 text-white hover:bg-red-700 mr-2">Clear Cart</Button>
                    </SheetClose>
                    <Button type="button" className="w-full my-2 sm:my-0 bg-blue-500 text-white hover:bg-blue-700">Checkout</Button>
                  </SheetFooter>
                )}
              </SheetContent>
            </Sheet>

          </div>)}
          <div className="flex lg:hidden">
            <button
              type="button"
              onClick={() => setMobileMenuOpen(true)}
              className="m-2.5 inline-flex items-center justify-center dark:bg-gray-800 border border-gray-300 dark:border-gray-600 p-2 rounded-full text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700 transition-all shadow-lg"
            >
              <span className="sr-only">Open main menu</span>
              <Bars3Icon aria-hidden="true" className="h-6 w-6 text-gray-700 dark:text-gray-200" />
            </button>
          </div>


        </nav>
        <Dialog open={mobileMenuOpen} onClose={setMobileMenuOpen} className="lg:hidden">
          <div className="fixed inset-0 z-50" />
          <DialogPanel className="fixed inset-y-0 right-0 z-50 w-full overflow-y-auto bg-white dark:bg-gray-900 px-6 py-6 sm:max-w-sm sm:ring-1 sm:ring-gray-900/10">
            <div className="flex items-center justify-between">
              <a href="/" className="-m-1.5 p-1.5 dark:invert">
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
                      className="-mx-3 block rounded-lg px-3 py-2 text-base font-semibold leading-7 text-gray-900 hover:bg-gray-400 dark:text-white"
                    >
                      {item.name}
                    </a>
                  ))}
                </div>
                <div className="py-6">
                  <Link
                    href={"/sign-up"}
                    className="-mx-3 block rounded-lg px-3 py-2.5 text-base font-semibold leading-7 text-gray-900 hover:bg-gray-400 dark:text-white"
                  >
                    SignUp
                  </Link>
                  <Link
                    href={"/sign-in"}
                    className="-mx-3 block rounded-lg px-3 py-2.5 text-base font-semibold leading-7 text-gray-900 hover:bg-gray-400 dark:text-white"
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