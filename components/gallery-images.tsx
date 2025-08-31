import { Loader2, Trash2, Upload } from "lucide-react";
import { Button } from "./ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { useParams } from "next/navigation";
import { useToast } from "./ui/use-toast";
import { useEffect, useState } from "react";
import Swal from "sweetalert2";
import {
  useDeleteGalleryImage,
  usePropertyGallery,
  useUpdateGalleryImage,
  useUploadGalleryImages,
} from "@/hooks/use-api";
import { apiClient } from "@/lib/api";

export default function GalleryImages({ isEditing }: { isEditing: boolean }) {
  const params = useParams();
  const propertyId = params.id as string;
  const { toast } = useToast();

  const [galleryFiles, setGalleryFiles] = useState<File[]>([]);
  const [galleryTags, setGalleryTags] = useState<string[]>([]);
  const [showGalleryUpload, setShowGalleryUpload] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState<string>("exterior");

  const [uploadGalleryState, uploadGalleryActions] = useUploadGalleryImages();
  const [deleteGalleryState, deleteGalleryActions] = useDeleteGalleryImage();
  const [updateGalleryState, updateGalleryActions] = useUpdateGalleryImage();
  const [galleryState, galleryActions] = usePropertyGallery(propertyId);

  useEffect(() => {
    if (propertyId) {
      // propertyActions.execute();
      galleryActions.execute();
      // commentsActions.execute();
    }
  }, [propertyId]);

  const imageCategories = [
    { value: "exterior", label: "Exterior" },
    { value: "interior", label: "Interior" },
    { value: "surroundings", label: "Surroundings" },
  ];

  const handleUploadGallery = async () => {
    try {
      const formData = new FormData();

      galleryFiles.forEach((file, index) => {
        formData.append("images", file);
        formData.append("tags", galleryTags[index]);
      });

      const response = await uploadGalleryActions.execute(propertyId, formData);
      console.log(response);
      setShowGalleryUpload(false);
      setGalleryFiles([]);
      setGalleryTags([]);
      Swal.fire({
        title: "Success",
        text: "Category images updated",
        icon: "success",
        confirmButtonText: "ok",
      });
      // toast({
      //   title: "Success",
      //   description: "Gallery images uploaded successfully",
      // });
      galleryActions.execute();
      // Refresh gallery
    } catch (error) {
      Swal.fire({
        title: "error",
        text: "Couldn't update images",
        icon: "error",
        confirmButtonText: "ok",
      });
    }
  };

  const handleUpdateGalleryImage = async (imageId: string, tag: string) => {
    try {
      await updateGalleryActions.execute(imageId, tag);
      galleryActions.execute(); // Refresh gallery
      toast({
        title: "Success",
        description: "Image updated successfully",
      });
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to update image",
        variant: "destructive",
      });
    }
  };

  const handleGalleryTagChange = (index: number, tag: string) => {
    const newTags = [...galleryTags];
    newTags[index] = tag;
    setGalleryTags(newTags);
  };

  const handleGalleryFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name } = e.target;

    const files = Array.from(e.target.files || []);
    if (name === "gallery") {
      setGalleryFiles(files);
      setGalleryTags(files.map(() => selectedCategory));
      return;
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
          await deleteGalleryActions.execute(imageId);
          galleryActions.execute(); // Refresh gallery

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
            confirmButtonText: "OK"
          })
        }
      }
    });
  };

  const galleryImages = galleryState.data || [];

  return (
    <>
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle>Gallery</CardTitle>
            {isEditing && (
              <Button
                onClick={() => setShowGalleryUpload(true)}
                className="bg-teal-600 hover:bg-teal-700"
              >
                <Upload className="w-4 h-4 mr-2" />
                Upload Images
              </Button>
            )}
          </div>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {/* Gallery Images by Category */}
            {imageCategories.map((category) => {
              const categoryImages = galleryImages.filter(
                (img) => img.tag === category.value
              );
              return (
                <div key={category.value} className="space-y-3">
                  <h4 className="font-semibold text-gray-700 capitalize">
                    {category.label}
                  </h4>
                  <div className="grid grid-cols-4 gap-4">
                    {categoryImages.map((image: any) => (
                      <div key={image.id} className="relative group">
                        <img
                          src={apiClient.getImageUrl(image.url)}
                          alt={`${category.label} ${image.id}`}
                          className="aspect-square w-full object-cover rounded-lg"
                        />
                        <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-50 transition-all duration-200 rounded-lg flex items-center justify-center">
                          <div className="opacity-0 group-hover:opacity-100 transition-opacity duration-200 flex gap-2">
                            <select
                              value={image.tag}
                              onChange={(e) =>
                                handleUpdateGalleryImage(
                                  image.id,
                                  e.target.value
                                )
                              }
                              className="text-xs bg-white text-black px-2 py-1 rounded"
                            >
                              {imageCategories.map((cat) => (
                                <option key={cat.value} value={cat.value}>
                                  {cat.label}
                                </option>
                              ))}
                            </select>
                            <button
                              onClick={() => handleDeleteGalleryImage(image.id)}
                              className="bg-red-600 text-white p-1 rounded"
                            >
                              <Trash2 className="w-3 h-3" />
                            </button>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                  {categoryImages.length === 0 && (
                    <p className="text-gray-500 text-sm">
                      No {category.label.toLowerCase()} images
                    </p>
                  )}
                </div>
              );
            })}
          </div>
        </CardContent>
      </Card>
      {showGalleryUpload && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/30">
          <div className="bg-white rounded-lg p-6 w-full max-w-md">
            <h3 className="text-lg font-semibold mb-4">
              Upload Gallery Images
            </h3>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-semibold mb-2">
                  Default Category
                </label>
                <select
                  value={selectedCategory}
                  onChange={(e) => setSelectedCategory(e.target.value)}
                  className="w-full border rounded-lg px-3 py-2"
                >
                  {imageCategories.map((cat) => (
                    <option key={cat.value} value={cat.value}>
                      {cat.label}
                    </option>
                  ))}
                </select>
              </div>
              <div>
                <label className="block text-sm font-semibold mb-2">
                  Select Images
                </label>
                <input
                  type="file"
                  multiple
                  name="gallery"
                  accept="image/*"
                  onChange={handleGalleryFileChange}
                  className="w-full border rounded-lg px-3 py-2"
                />
              </div>
              {galleryFiles.length > 0 && (
                <div className="space-y-3">
                  <p className="text-sm font-medium">
                    Set categories for each image:
                  </p>
                  {galleryFiles.map((file, index) => (
                    <div key={index} className="flex items-center gap-2">
                      <span className="text-sm text-gray-600 flex-1 truncate">
                        {file.name}
                      </span>
                      <select
                        value={galleryTags[index]}
                        onChange={(e) =>
                          handleGalleryTagChange(index, e.target.value)
                        }
                        className="text-sm border rounded px-2 py-1"
                      >
                        {imageCategories.map((cat) => (
                          <option key={cat.value} value={cat.value}>
                            {cat.label}
                          </option>
                        ))}
                      </select>
                    </div>
                  ))}
                </div>
              )}
            </div>
            <div className="flex gap-2 justify-end mt-6">
              <Button
                variant="outline"
                onClick={() => {
                  setShowGalleryUpload(false);
                  setGalleryFiles([]);
                  setGalleryTags([]);
                }}
              >
                Cancel
              </Button>
              <Button
                onClick={handleUploadGallery}
                disabled={
                  galleryFiles.length === 0 || uploadGalleryState.loading
                }
                className="bg-teal-600 hover:bg-teal-700"
              >
                {uploadGalleryState.loading ? (
                  <Loader2 className="w-4 h-4 animate-spin" />
                ) : (
                  "Upload"
                )}
              </Button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
