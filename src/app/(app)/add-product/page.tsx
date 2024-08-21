"use client";
import { useState, useRef, ChangeEvent } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { ApiResponse } from "@/types/ApiResponse";
import axios, { AxiosError } from "axios";
import { Loader2 } from "lucide-react";
import { Input } from "@/components/ui/input";
import { addProductSchema } from "@/schemas/addProductSchema";
import { useToast } from "@/components/ui/use-toast";

const AddProduct = () => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { toast } = useToast();
  const imageRef = useRef<HTMLInputElement>(null);

  const form = useForm<z.infer<typeof addProductSchema>>({
    resolver: zodResolver(addProductSchema),
    defaultValues: {
      image: [],
      title: "",
      description: "",
      price: "",
      category: "",
      stock: "",
      size: "",
      color: ""
    }
  });

  const { reset, handleSubmit, control, setValue } = form;

  const onSubmit = async (data: z.infer<typeof addProductSchema>) => {
    setIsSubmitting(true);
    try {
      const formData = new FormData();
      formData.append("title", data.title);
      formData.append("description", data.description);
      formData.append("price", data.price);
      formData.append("category", data.category);
      formData.append("stock", data.stock);
      formData.append("size", data.size);
      formData.append("color", data.color);
      
      if (data.image && data.image.length > 0) {
        formData.append("image", data.image[0]);
      }

      const res = await axios.post<ApiResponse>("/api/add-products", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      toast({
        title: "Success",
        description: res.data.message,
      });

      // Clear the form fields
      reset();
      // Clear the file input
      if (imageRef.current) {
        imageRef.current.value = "";
      }
    } catch (error) {
      const axiosError = error as AxiosError<ApiResponse>;
      const errorMessage = axiosError.response?.data.message;
      
      toast({
        title: "Submission failed",
        description: errorMessage,
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gradient-to-r from-blue-50 to-gray-50 p-8">
      <div className="w-full max-w-md rounded-lg shadow-lg p-8 space-y-6 bg-white border border-gray-200">
        <div className="flex flex-col gap-4 justify-center items-center">
          <h1 className="text-3xl md:text-4xl font-bold text-center mt-3 text-gray-800">Add Product</h1>
          <p className="mb-4 text-sm text-gray-500">Provide Goods And Services</p>
        </div>
        <Form {...form}>
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
            <FormField
              control={control}
              name="title"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-gray-700">Title</FormLabel>
                  <FormControl>
                    <Input placeholder="Enter Product Name" {...field} className="border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-300" />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={control}
              name="description"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-gray-700">Description</FormLabel>
                  <FormControl>
                    <Input placeholder="Enter Product Description" {...field} className="border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-300" />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={control}
              name="image"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-gray-700">Images</FormLabel>
                  <FormControl>
                    <Input
                      type="file"
                      multiple
                      ref={imageRef}
                      onChange={(e) => field.onChange(e.target.files)}
                      className="border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-300"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={control}
              name="price"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-gray-700">Price (In Rs.)</FormLabel>
                  <FormControl>
                    <Input type="number"
                      placeholder="Enter Product Price"
                      {...field}
                      onChange={(e) => field.onChange(e.target.value)}
                      className="border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-300" />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={control}
              name="category"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-gray-700">Category</FormLabel>
                  <FormControl>
                    <Input placeholder="Enter Product Category" {...field} className="border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-300" />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={control}
              name="stock"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-gray-700">Stock</FormLabel>
                  <FormControl>
                    <Input type="number"
                      placeholder="Enter Product Stock"
                      {...field}
                      onChange={(e) => field.onChange(e.target.value)}
                      className="border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-300" />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={control}
              name="size"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-gray-700">Size</FormLabel>
                  <FormControl>
                    <Input placeholder="e.g., L*B" {...field} className="border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-300" />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={control}
              name="color"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-gray-700">Available Color</FormLabel>
                  <FormControl>
                    <Input placeholder="Enter Product Colors" {...field} className="border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-300" />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button type="submit" disabled={isSubmitting} className="w-full py-3 mt-4 ">
              {isSubmitting ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" /> Please Wait
                </>
              ) : "Add Product"}
            </Button>
          </form>
        </Form>
      </div>
    </div>
  );
};

export default AddProduct;
