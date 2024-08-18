"use client"
import React from 'react'
import { useState } from 'react'
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"
import { Button } from "@/components/ui/button"
import {
    Form,
    FormControl,
    FormDescription,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form"
import {
    InputOTP,
    InputOTPGroup,
    InputOTPSeparator,
    InputOTPSlot,
} from "@/components/ui/input-otp"
import { useToast } from "@/components/ui/use-toast"
import { useParams, useRouter } from 'next/navigation'
import { verifySchema } from '@/schemas/verifySchema'
import axios, { AxiosError } from 'axios'
import { ApiResponse } from '@/types/ApiResponse'
import { Input } from '@/components/ui/input'


const VerifyAccount = () => {

    const { toast } = useToast()
    const router = useRouter()

    const form = useForm<z.infer<typeof verifySchema>>({
        resolver: zodResolver(verifySchema),
        defaultValues: {
            email: "",
            code: "",
        },
    })

    const onSubmit = async (data: z.infer<typeof verifySchema>) => {
        try {
            const response = await axios.post(`/api/verify-code`, {
                email: data.email,
                code: data.code
            })
            toast({
                title: "Success",
                description: response.data.message
            })

            router.replace("/sign-in")
        } catch (error) {
            console.log(error)
            const axiosError = error as AxiosError<ApiResponse>
            const errorMessage = axiosError.response?.data.message
            toast({
                title: "SignUp failed",
                description: errorMessage,
                variant: "destructive",
            })
        }

    }

    return (
        <div className='flex flex-col justify-center items-center min-h-screen p-2 bg-gray-100'>
            <div className='w-full max-w-md space-y-6 space-x-9 md:space-x-1 rounded-lg border border-slate-300 shadow-md p-4 md:p-8'>
                <div className='text-center'>
                    <h1 className='text-3xl font-bold tracking-tight lg:text-4xl mb-5'>Verify Your Account</h1>
                    <p className="mb-4 text-gray-600">Enter the verification code sent to your email</p>
                </div>
                <Form {...form}>
                    <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                        <FormField
                            control={form.control}
                            name="email"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Email*</FormLabel>
                                    <FormControl>
                                        <Input placeholder="Enter Your Email" {...field} />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <FormField
                            control={form.control}
                            name="code"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Verification Code*</FormLabel>
                                    <FormControl>
                                        <InputOTP maxLength={6} {...field}>
                                            <InputOTPGroup>
                                                <InputOTPSlot className='border-slate-600' index={0} />
                                                <InputOTPSlot className='border-slate-600' index={1} />
                                                <InputOTPSlot className='border-slate-600' index={2} />
                                            </InputOTPGroup>
                                            <InputOTPSeparator />
                                            <InputOTPGroup>
                                                <InputOTPSlot className='border-slate-600' index={3} />
                                                <InputOTPSlot className='border-slate-600' index={4} />
                                                <InputOTPSlot className='border-slate-600' index={5} />
                                            </InputOTPGroup>
                                        </InputOTP>
                                    </FormControl>
                                    <FormDescription>
                                        Compulsory for the verification process
                                    </FormDescription>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <Button type="submit">Verify</Button>
                    </form>
                </Form>
            </div>
        </div>
    )
}


export default VerifyAccount