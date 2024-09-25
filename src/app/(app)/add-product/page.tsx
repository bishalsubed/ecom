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
  const [colors, setColors] = useState<string[]>([]);
  const [imagePreview, setImagePreview] = useState<string | ArrayBuffer | null>(null);
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
      color: "",
    }
  });

  const { reset, handleSubmit, control, setValue } = form;

  const handleColorInputKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === "Enter" || event.key === ",") {
      event.preventDefault();
      const color = event.currentTarget.value.trim();
      if (color && !colors.includes(color)) {
        setColors((prevColors) => [...prevColors, color]);
        setValue("color", colors.join(", "));
        event.currentTarget.value = "";
      }
    }
  };

  const removeColor = (colorToRemove: string) => {
    setColors((prevColors) => {
      const newColors = prevColors.filter(color => color !== colorToRemove);
      setValue("color", newColors.join(", "));
      return newColors;
    });
  };

  const handleFileChange = (event: ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files[0]) {
      const file = event.target.files[0];
      const reader = new FileReader();
      
      reader.onloadend = () => {
        setImagePreview(reader.result);
      };

      reader.readAsDataURL(file); 
      form.setValue("image", event.target.files); 
    }
  };

  const onSubmit = async (data: z.infer<typeof addProductSchema>) => {
    setIsSubmitting(true);
    console.log("submitting")
    try {
      const formData = new FormData();
      formData.append("title", data.title);
      formData.append("description", data.description);
      formData.append("price", data.price);
      formData.append("category", data.category);
      formData.append("stock", data.stock);
      formData.append("color", colors.join(", "));

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
      reset();
      if (imageRef.current) {
        imageRef.current.value = "";
      }
      setColors([]);
      setImagePreview(null); 
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
                  <FormLabel className="text-gray-700 font-semibold">Images</FormLabel>
                  <FormControl>
                    <div className="relative">
                      <input
                        type="file"
                        multiple
                        ref={imageRef}
                        onChange={handleFileChange}
                        className="hidden"
                        id="file-upload"
                      />
                      <label
                        htmlFor="file-upload"
                        className="cursor-pointer border border-gray-300 rounded-lg p-2 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition duration-200 ease-in-out shadow-sm hover:border-blue-400 inline-block"
                      >
                        {imagePreview ? (
                          <img
                            src={imagePreview as string}
                            alt="Preview"
                            className="w-32 h-32 object-cover rounded-lg"
                          />
                        ) : (
                          'Select Images'
                        )}
                      </label>
                    </div>
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
              name="color"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-gray-700">Available Color</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="Enter colors and press Enter"
                      onKeyDown={handleColorInputKeyDown}
                      className="border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-300"
                    />
                  </FormControl>
                  <div className="mt-2">
                    {colors.map((color, index) => (
                      <span
                        key={index}
                        className="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2 mb-2 cursor-pointer"
                        onClick={() => removeColor(color)}
                      >
                        {color} &times;
                      </span>
                    ))}
                  </div>
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
