"use client"
import React, { useState, useEffect } from 'react'
import { useParams } from 'next/navigation'
import axios, { AxiosError } from 'axios'
import { ApiResponse } from '@/types/ApiResponse'
import { useToast } from '@/components/ui/use-toast'
import { Loader } from 'lucide-react'
import { Product } from '@/models/Product'
import { Button } from '@/components/ui/button'
import {CartItem, addItemToCart } from '@/helpers/cartHelper'

const productDesc = () => {
    const [searchingProduct, setSearchingProduct] = useState(true)
    const [product, setProduct] = useState<Product>()
    const params = useParams()
    const { id } = params
    const productId = Array.isArray(id) ? id[0] : id;
    const { toast } = useToast()
    useEffect(() => {
        ; (async () => {
            try {
                const response = await axios.get(`/api/get-product?id=${id}`)
                setProduct(response.data.data)
            } catch (error) {
                const axiosError = error as AxiosError<ApiResponse>;
                const errorMessage = axiosError.response?.data.message
                toast({
                    title: "Couldn't Find Product",
                    description: errorMessage,
                    variant: "destructive"
                })
            } finally {
                setSearchingProduct(false)
            }
        })
            ()

    }, [id])

    const addToCart = (itemObj:CartItem) => {
       try {
         addItemToCart(itemObj)
         toast({
            title: "Success",
            description: "Product Added to the cart",
          });
       } catch (error) {
        toast({
            title: "Operation failed",
            description: "Unable to Add To Cart",
            variant: "destructive",
          });
       }
    }

    const colorClasses = {
        red: "bg-red-800",
        blue: "bg-blue-800",
        green: "bg-green-800",
        yellow: "bg-yellow-800",
        purple: "bg-purple-800",
        pink: "bg-pink-800",
        orange: "bg-orange-800",
        teal: "bg-teal-800",
        indigo: "bg-indigo-800",
        gray: "bg-gray-800",
        black: "bg-black",
        white: "bg-white",
        cyan: "bg-cyan-800",
        lime: "bg-lime-800",
        emerald: "bg-emerald-800",
        amber: "bg-amber-800",
        violet: "bg-violet-800",
        fuchsia: "bg-fuchsia-800",
        rose: "bg-rose-800",
        sky: "bg-sky-800",
        slate: "bg-slate-800",
        stone: "bg-stone-800",
        zinc: "bg-zinc-800",
        neutral: "bg-neutral-800",
    };

    return (
        <>
            {product && <section className="text-gray-600 body-font overflow-hidden">
                <div className="container px-5 py-24 mx-auto">
                    <div className="lg:w-4/5 mx-auto flex flex-wrap">
                        <img alt="ecommerce" className="lg:w-1/2 w-full md:h-80 md:w-3/4 lg:h-96 h-64 object-cover object-center rounded-lg shadow-lg transition-transform duration-300 hover:scale-105 border-2 border-gray-300 mx-auto" src={product.image} />
                        <div className="lg:w-1/2 w-full lg:pl-10 lg:py-6 mt-6 lg:mt-0">
                            <h2 className="text-sm title-font text-gray-500 tracking-widest">{product.category}</h2>
                            <h1 className="text-gray-900 text-3xl title-font font-medium mb-1">{product.title}</h1>
                            <div className="flex mb-4">
                                <span className="flex items-center">
                                    <svg fill="currentColor" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" className="w-4 h-4 text-indigo-500" viewBox="0 0 24 24">
                                        <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"></path>
                                    </svg>
                                    <svg fill="currentColor" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" className="w-4 h-4 text-indigo-500" viewBox="0 0 24 24">
                                        <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"></path>
                                    </svg>
                                    <svg fill="currentColor" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" className="w-4 h-4 text-indigo-500" viewBox="0 0 24 24">
                                        <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"></path>
                                    </svg>
                                    <svg fill="currentColor" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" className="w-4 h-4 text-indigo-500" viewBox="0 0 24 24">
                                        <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"></path>
                                    </svg>
                                    <svg fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" className="w-4 h-4 text-indigo-500" viewBox="0 0 24 24">
                                        <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"></path>
                                    </svg>
                                    <span className="text-gray-600 ml-3">4 Reviews</span>
                                </span>
                                <span className="flex ml-3 pl-3 py-2 border-l-2 border-gray-200 space-x-2s">
                                    <a className="text-gray-500">
                                        <svg fill="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" className="w-5 h-5" viewBox="0 0 24 24">
                                            <path d="M18 2h-3a5 5 0 00-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 011-1h3z"></path>
                                        </svg>
                                    </a>
                                    <a className="text-gray-500">
                                        <svg fill="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" className="w-5 h-5" viewBox="0 0 24 24">
                                            <path d="M23 3a10.9 10.9 0 01-3.14 1.53 4.48 4.48 0 00-7.86 3v1A10.66 10.66 0 013 4s-4 9 5 13a11.64 11.64 0 01-7 2c9 5 20 0 20-11.5a4.5 4.5 0 00-.08-.83A7.72 7.72 0 0023 3z"></path>
                                        </svg>
                                    </a>
                                    <a className="text-gray-500">
                                        <svg fill="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" className="w-5 h-5" viewBox="0 0 24 24">
                                            <path d="M21 11.5a8.38 8.38 0 01-.9 3.8 8.5 8.5 0 01-7.6 4.7 8.38 8.38 0 01-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 01-.9-3.8 8.5 8.5 0 014.7-7.6 8.38 8.38 0 013.8-.9h.5a8.48 8.48 0 018 8v.5z"></path>
                                        </svg>
                                    </a>
                                </span>
                            </div>
                            <p className="leading-relaxed">{product.desc}.</p>
                            <div className="flex mt-6 items-center pb-5 border-b-2 border-gray-100 mb-5">
                                <div className="flex">
                                    <span className="mr-3">Color</span>
                                    {product.color.split(",").map((colour, index) => {
                                        const colourClassName = colorClasses[colour.trim() as keyof typeof colorClasses] || 'bg-gray-600';
                                        return (
                                            <button key={index} className={`border-2 border-gray-300 ml-1 ${colourClassName} rounded-full w-6 h-6 focus:outline-none`}></button>
                                        )
                                    })}
                                </div>
                                <div className='ml-6 '>Remaining: <span className='font-bold'> {product.stock} pieces </span></div>
                            </div>
                            <div className="flex justify-between">
                                <span className="title-font font-medium text-2xl text-gray-900">Rs.{product.price}</span>
                                <div className='flex gap-4'>
                                    <Button className='flex ml-auto py-2 px-6 rounded' type="submit">Buy Now</Button>
                                    <Button onClick={()=>{addToCart({id: productId,name: product.title,price:product.price,quantity: 1})}} className='flex ml-auto py-2 px-6 rounded' type="submit">Add To Cart</Button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
            }
        </>
    )
}

export default productDesc