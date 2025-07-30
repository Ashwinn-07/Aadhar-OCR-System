import { v2 as cloudinary } from "cloudinary";
import { CloudinaryStorage } from "multer-storage-cloudinary";
import multer from "multer";

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

const storage = new CloudinaryStorage({
  cloudinary,
  params: async (req, file) => ({
    folder: "aadhaar",
    allowed_formats: ["jpg", "png"],
    transformation: [{ width: 1024, crop: "limit" }],
  }),
});

export const upload = multer({ storage });

export async function deleteFromCloudinary(urls: string[]): Promise<void> {
  try {
    const publicIds = urls
      .map((url) => {
        const matches = url.match(/\/upload\/(?:v\d+\/)?([^\.]+)/);
        return matches ? matches[1] : null;
      })
      .filter(Boolean);

    if (publicIds.length > 0) {
      await cloudinary.api.delete_resources(publicIds as string[], {
        resource_type: "image",
      });
      console.log(
        `Successfully deleted ${publicIds.length} images from Cloudinary`
      );
    }
  } catch (error) {
    console.error("Error deleting images from Cloudinary:", error);
  }
}
