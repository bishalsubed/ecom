"use client"
import React, { useEffect, useState } from 'react'
import { Product } from '@/models/Product'

import axios, { AxiosError } from 'axios'
import { ApiResponse } from '@/types/ApiResponse'
import { useToast } from '@/components/ui/use-toast'
import { useRouter } from 'next/navigation'
import Link from 'next/link'



const Dashboard = () => {
  const [productArray, setProductArray] = useState<Product[]>([])
  const { toast } = useToast();
  const router = useRouter()


  useEffect(() => {
    ; (async () => {
      try {
        let response = await axios.get("/api/get-products");
        toast({
          title: "Success",
          description: response.data.message
        })
        setProductArray(response.data.data)
      } catch (error) {
        const axiosError = error as AxiosError<ApiResponse>
        const errorMessage = axiosError.response?.data.message
        toast({
          title: "Submission failed",
          description: errorMessage,
          variant: "destructive",
        });
      }
    })();
  }, []);

  return (
    <>
      <div>Dashboard</div>
      <section className="text-gray-600 body-font">
        <div className="container px-5 py-24 mx-auto">
          <div className="flex justify-around items-center flex-wrap -m-4">
            {productArray.map((product, index) => {
              const key = product._id ? product._id : index;
              return (
                <div className="bg-gray-50 border-2 border-gray-200 border-opacity-60 shadow-sm rounded-lg overflow-hidden lg:w-1/4 md:w-1/2 p-4 w-full" key={key}>
                  <Link href={`/product/${product._id}`} className="block relative h-48 rounded overflow-hidden">
                  <img alt="ecommerce" className="cursor-pointer object-cover object-center w-full h-full block" src={product.image}/>
                  </Link>
                  <div className="mt-4">
                    <h3 className="text-gray-500 text-xs tracking-widest title-font mb-1">{product.category}</h3>
                    <Link href={`/product/${product._id}`}><h2 className="text-gray-900 title-font text-lg font-medium cursor-pointer">{product.title}</h2></Link>
                    <p className="mt-1">Rs.{product.price}</p>
                  </div>
                </div>

              )
            })}
          </div>
        </div>
      </section>

    </>
  )
}

export default Dashboard