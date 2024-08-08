import { cloudinary } from "@/lib/cloudinary";
import { ApiResponse } from "@/types/ApiResponse";
import { NextRequest } from "next/server";


type UploadResponse = 
  { success: true; result: ApiResponse } | 
  { success: false; error: ApiResponse };

export async function uploadOnCloudinary (
  fileUri: string, fileName: string): Promise<UploadResponse>{
  return new Promise((resolve, reject) => {
    cloudinary.uploader
      .upload(fileUri, {
        invalidate: true,
        resource_type: "auto",
        filename_override: fileName,
        folder: "product-images", 
        use_filename: true,
      })
      .then((result) => {
        const apiResponse: ApiResponse = {
          success: true,
          message: "Upload successful",
          data: result 
        };
        resolve({ success: true, result: apiResponse });
      })
      .catch((error) => {
        // Format the error to match ApiResponse
        const apiErrorResponse: ApiResponse = {
          success: false,
          message: error.message, 
          errorCode: error.code 
        };
        reject({ success: false, error: apiErrorResponse });
      });
  });
};

