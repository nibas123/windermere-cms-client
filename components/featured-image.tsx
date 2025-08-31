import {
  useDeleteFeaturedImage,
  useDeleteGalleryImage,
  useProperty,
  usePropertyGallery,
  useUploadFeaturedImages,
} from "@/hooks/use-api";
import { useToast } from "@/hooks/use-toast";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Trash2, Upload } from "lucide-react";
import { Button } from "@/components/ui/button";
import Swal from "sweetalert2";
export default function FeaturedImagesGallery({
  isEditing,
}: {
  isEditing: boolean;
}) {
  const params = useParams();
  const propertyId = params.id as string;

  const [showMainUpload, setShowMainUpload] = useState(false);
  const [mainFiles, setMainFiles] = useState<File[]>([]);
  const [mainImages, setMainImages] = useState<string[]>([]);

  const [featuredImageState, featuredImageActions] = useUploadFeaturedImages();
  const [deleteFeaturedState, deleteFeaturedActions] = useDeleteFeaturedImage();
  const [galleryState, galleryActions] = usePropertyGallery(propertyId);
  const [propertyState, propertyActions] = useProperty(propertyId);

  useEffect(() => {
    if (propertyId) {
      propertyActions.execute();
    }
  }, [propertyId]);

  useEffect(() => {
    if (propertyState.data && galleryState.data) {
      const propertyImages = propertyState.data.images || [];
      setMainImages([...propertyImages]);
    }
  }, [propertyState.data, galleryState.data]);

  const { toast } = useToast();

  const handleDeleteGallery_Image = async (imageId: string) => {
    try {
      await deleteFeaturedActions.execute(imageId);
      galleryActions.execute(); // Refresh gallery
      toast({
        title: "Success",
        description: "Image deleted successfully",
      });
    } catch (error) {
      console.log(error);
      toast({
        title: "Error",
        description: "Failed to delete image",
        variant: "destructive",
      });
    }
  };

  const handleDeleteGalleryImage = async (imageId: string) => {
    Swal.fire({
      title: "Warning",
      text: "Do you want to delete this image",
      icon: "warning",
      showConfirmButton: true,
      showCancelButton: true,
      confirmButtonText: "confirm",
      confirmButtonColor: "Red",
    }).then(async (r) => {
      if (r.isConfirmed) {
        try {
          const response = await deleteFeaturedActions.execute(
            propertyId,
            imageId
          );
          setMainImages(response.images);

          Swal.fire({
            icon: "success",
            title: "success",
            text: "Image succesfully deleted",
            confirmButtonText: "OK",
          });
        } catch (error) {
          console.log(error);
          Swal.fire({
            title: "Error Occured",
            text: "Couldn't delete the image",
            icon: "error",
            confirmButtonText: "OK",
          });
        }
      }
    });
  };

  const handleGalleryFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name } = e.target;

    const files = Array.from(e.target.files || []);

    if (name === "main") {
      setMainFiles(files);
      return;
    }
  };

  const handleMainImageUpload = async () => {
    try {
      const formData = new FormData();
      console.log(formData);
      mainFiles.map((file) => {
        formData.append("images", file);
      });

      const response = await featuredImageActions.execute(propertyId, formData);
      setShowMainUpload(false);
      setMainImages(response);
      toast({
        title: "Success",
        description: "Feature images uploaded successfully",
      });

      // console.log(mainFiles);
    } catch (err) {
      toast({
        title: "Error",
        description: "Failed to update property",
        variant: "destructive",
      });
    }
  };
  return (
    <>
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle>Featured Images</CardTitle>
            {isEditing && (
              <Button
                onClick={() => setShowMainUpload(true)}
                className="bg-teal-600 hover:bg-teal-700"
              >
                <Upload className="w-4 h-4 mr-2" />
                Upload Images
              </Button>
            )}
          </div>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            <div className="grid grid-cols-4 gap-4">
              {mainImages.length === 0 ? (
                <>No images found</>
              ) : (
                mainImages.map((image, indx) => (
                  <div key={indx} className="relative group">
                    <img
                      src={image}
                      // alt={`${category.label} ${image.id}`}
                      className="aspect-square w-full object-cover rounded-lg"
                    />
                    <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-50 transition-all duration-200 rounded-lg flex items-center justify-center">
                      <div className="opacity-0 group-hover:opacity-100 transition-opacity duration-200 flex gap-2">
                        <button
                          onClick={() => handleDeleteGalleryImage(image)}
                          className="bg-red-600 text-white p-1 rounded"
                        >
                          <Trash2 className="w-3 h-3" />
                        </button>
                      </div>
                    </div>
                  </div>
                ))
              )}
            </div>
          </div>
        </CardContent>
      </Card>
      {showMainUpload && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/30">
          <div className="bg-white rounded-lg p-6 w-full max-w-md">
            <h3 className="text-lg font-semibold mb-4">Upload Main Images</h3>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-semibold mb-2">
                  Select Images
                </label>
                <input
                  name="main"
                  type="file"
                  multiple
                  accept="image/*"
                  onChange={handleGalleryFileChange}
                  className="w-full border rounded-lg px-3 py-2"
                />
              </div>
            </div>
            <div className="flex gap-2 justify-end mt-6">
              <Button
                variant="outline"
                onClick={() => {
                  setShowMainUpload(false);
                  setMainFiles([]);
                  // setGalleryTags([]);
                }}
              >
                Cancel
              </Button>
              <Button
                onClick={handleMainImageUpload}
                disabled={mainFiles.length === 0 || featuredImageState.loading}
                className="bg-teal-600 hover:bg-teal-700"
              >
                {featuredImageState.loading ? "uploading files...." : "Upload"}
              </Button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
