"use client"

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useProperties, useCreateProperty, useUpdateProperty, useDeleteProperty, usePropertyGallery, useUploadGalleryImages } from "@/hooks/use-api";
import { apiClient } from "@/lib/api";
import { toast } from "sonner";
import { Loader2, ImageIcon } from "lucide-react";

export default function TestPropertyPage() {
  const [selectedFiles, setSelectedFiles] = useState<File[]>([]);
  const [galleryFiles, setGalleryFiles] = useState<File[]>([]);
  const [testPropertyId, setTestPropertyId] = useState<string>("");
  const [uploadsInfo, setUploadsInfo] = useState<any>(null);

  // API hooks
  const [propertiesState, propertiesActions] = useProperties();
  const [createPropertyState, createPropertyActions] = useCreateProperty();
  const [updatePropertyState, updatePropertyActions] = useUpdateProperty();
  const [deletePropertyState, deletePropertyActions] = useDeleteProperty();
  const [galleryState, galleryActions] = usePropertyGallery(testPropertyId);
  const [uploadGalleryState, uploadGalleryActions] = useUploadGalleryImages();

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>, isGallery = false) => {
    const files = Array.from(e.target.files || []);
    if (isGallery) {
      setGalleryFiles(files);
    } else {
      setSelectedFiles(files);
    }
  };

  const testCreateProperty = async () => {
    if (selectedFiles.length !== 4) {
      toast.error("Exactly 4 featured images are required");
      return;
    }

    try {
      const formData = new FormData();
      formData.append('name', 'Test Property');
      formData.append('description', 'This is a test property description');
      formData.append('address', '123 Test Street, Test City');
      formData.append('refNo', 'TEST001');
      formData.append('price', '500000');
      formData.append('longitude', '-2.5879');
      formData.append('latitude', '51.4545');
      formData.append('status', 'active');
      
      // Add features
      formData.append('features', 'Swimming pool');
      formData.append('features', 'Air conditioning');
      formData.append('features', 'Internet');
      formData.append('features', 'Terrace');

      // Add images
      selectedFiles.forEach(file => {
        formData.append('images', file);
      });

      const result = await createPropertyActions.execute(formData);
      toast.success(`Property created successfully! ID: ${result.id}`);
      setTestPropertyId(result.id);
      propertiesActions.execute(); // Reload properties list
    } catch (error) {
      console.error('Property creation error:', error);
      toast.error(error instanceof Error ? error.message : "Failed to create property");
    }
  };

  const testDeleteProperty = async () => {
    if (!testPropertyId) {
      toast.error("No property ID available");
      return;
    }

    try {
      await deletePropertyActions.execute(testPropertyId);
      toast.success("Property deleted successfully!");
      setTestPropertyId("");
      propertiesActions.execute(); // Reload properties list
    } catch (error) {
      console.error('Property deletion error:', error);
      toast.error(error instanceof Error ? error.message : "Failed to delete property");
    }
  };

  const testUpdateProperty = async () => {
    if (!testPropertyId) {
      toast.error("No property ID available");
      return;
    }

    try {
      const formData = new FormData();
      formData.append('name', 'Updated Test Property');
      formData.append('description', 'This is an updated test property description');
      formData.append('address', '456 Updated Street, Updated City');
      formData.append('refNo', 'TEST001-UPDATED');
      formData.append('price', '600000');
      formData.append('longitude', '-2.5879');
      formData.append('latitude', '51.4545');
      formData.append('status', 'active');
      
      // Add features
      formData.append('features', 'Swimming pool');
      formData.append('features', 'Air conditioning');
      formData.append('features', 'Internet');
      formData.append('features', 'Terrace');
      formData.append('features', 'Garden');

      const result = await updatePropertyActions.execute(testPropertyId, formData);
      toast.success("Property updated successfully!");
      propertiesActions.execute(); // Reload properties list
    } catch (error) {
      console.error('Property update error:', error);
      toast.error(error instanceof Error ? error.message : "Failed to update property");
    }
  };

  const testUploadGallery = async () => {
    if (!testPropertyId) {
      toast.error("No property ID available");
      return;
    }

    if (galleryFiles.length === 0) {
      toast.error("No gallery files selected");
      return;
    }

    try {
      const formData = new FormData();
      galleryFiles.forEach((file, index) => {
        formData.append('images', file);
        // Assign categories
        const categories = ['exterior', 'interior', 'surroundings'];
        formData.append('tags', categories[index % categories.length]);
      });

      const result = await uploadGalleryActions.execute(testPropertyId, formData);
      toast.success(`Gallery images uploaded successfully! ${result.length} images added`);
      galleryActions.execute(); // Reload gallery
    } catch (error) {
      console.error('Gallery upload error:', error);
      toast.error(error instanceof Error ? error.message : "Failed to upload gallery images");
    }
  };

  const testLoadGallery = async () => {
    if (!testPropertyId) {
      toast.error("No property ID available");
      return;
    }

    try {
      await galleryActions.execute();
      toast.success("Gallery loaded successfully!");
    } catch (error) {
      console.error('Gallery load error:', error);
      toast.error(error instanceof Error ? error.message : "Failed to load gallery");
    }
  };

  const testUploadsDirectory = async () => {
    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL || 'http://localhost:4000/api'}/test-uploads`);
      const data = await response.json();
      setUploadsInfo(data);
      toast.success("Uploads directory checked successfully!");
    } catch (error) {
      console.error('Uploads directory check failed:', error);
      toast.error("Failed to check uploads directory");
    }
  };

  const testAuthStatus = async () => {
    try {
      const token = localStorage.getItem('authToken');
      if (!token) {
        toast.error("No auth token found. Please login first.");
        return;
      }
      
      // Test API connectivity
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL || 'http://localhost:4000/api'}/health`);
      if (response.ok) {
        toast.success("API is accessible and auth token is present");
      } else {
        toast.error("API is not accessible");
      }
    } catch (error) {
      toast.error("Failed to check auth status");
    }
  };

  const testImageUrls = async () => {
    if (!propertiesState.data || propertiesState.data.length === 0) {
      toast.error("No properties available to test");
      return;
    }

    const property = propertiesState.data[0];
    if (!property.images || property.images.length === 0) {
      toast.error("No images in the first property");
      return;
    }

    const imageUrl = apiClient.getImageUrl(property.images[0]);
    console.log('Testing image URL:', imageUrl);
    
    try {
      const response = await fetch(imageUrl, { method: 'HEAD' });
      if (response.ok) {
        toast.success(`Image URL is accessible: ${imageUrl}`);
      } else {
        toast.error(`Image URL returned ${response.status}: ${imageUrl}`);
      }
    } catch (error) {
      toast.error(`Failed to access image URL: ${imageUrl}`);
      console.error('Image URL test error:', error);
    }
  };

  return (
    <div className="p-6 space-y-6">
      <h1 className="text-2xl font-bold">Property API Test Page</h1>
      
      {/* Auth Test */}
      <Card>
        <CardHeader>
          <CardTitle>0. Test Authentication & API</CardTitle>
        </CardHeader>
        <CardContent>
          <Button onClick={testAuthStatus} className="mb-2">
            Test Auth & API Connectivity
          </Button>
        </CardContent>
      </Card>

      {/* Load Properties */}
      <Card>
        <CardHeader>
          <CardTitle>1. Load Properties</CardTitle>
        </CardHeader>
        <CardContent>
          <Button 
            onClick={() => propertiesActions.execute()}
            disabled={propertiesState.loading}
          >
            {propertiesState.loading ? (
              <Loader2 className="w-4 h-4 animate-spin" />
            ) : (
              "Load Properties"
            )}
          </Button>
          {propertiesState.data && (
            <div className="mt-4">
              <p className="text-sm text-gray-600">Found {propertiesState.data.length} properties</p>
              {propertiesState.data.map(property => (
                <div key={property.id} className="mt-2 p-2 bg-gray-100 rounded">
                  <p><strong>ID:</strong> {property.id}</p>
                  <p><strong>Name:</strong> {property.name}</p>
                  <p><strong>Status:</strong> {property.status}</p>
                  <p><strong>Images:</strong> {property.images.length}</p>
                </div>
              ))}
            </div>
          )}
        </CardContent>
      </Card>

      {/* Create Property */}
      <Card>
        <CardHeader>
          <CardTitle>2. Create Test Property</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div>
            <label className="block text-sm font-semibold mb-2">Featured Images (Exactly 4 required)</label>
            <input
              type="file"
              multiple
              accept="image/*"
              onChange={(e) => handleFileChange(e, false)}
              className="w-full border rounded-lg px-3 py-2"
            />
            <p className="text-sm text-gray-600 mt-1">
              Selected {selectedFiles.length} images. {selectedFiles.length === 4 ? '✓ Perfect!' : `You need exactly 4 featured images.`}
            </p>
          </div>
          <Button 
            onClick={testCreateProperty}
            disabled={selectedFiles.length !== 4 || createPropertyState.loading}
          >
            {createPropertyState.loading ? (
              <Loader2 className="w-4 h-4 animate-spin" />
            ) : (
              "Create Test Property"
            )}
          </Button>
          {testPropertyId && (
            <p className="text-sm text-green-600">Test Property ID: {testPropertyId}</p>
          )}
        </CardContent>
      </Card>

      {/* Update Property */}
      <Card>
        <CardHeader>
          <CardTitle>3. Update Test Property</CardTitle>
        </CardHeader>
        <CardContent>
          <Button 
            onClick={testUpdateProperty}
            disabled={!testPropertyId || updatePropertyState.loading}
          >
            {updatePropertyState.loading ? (
              <Loader2 className="w-4 h-4 animate-spin" />
            ) : (
              "Update Test Property"
            )}
          </Button>
        </CardContent>
      </Card>

      {/* Delete Property */}
      <Card>
        <CardHeader>
          <CardTitle>4. Delete Test Property</CardTitle>
        </CardHeader>
        <CardContent>
          <Button 
            onClick={testDeleteProperty}
            disabled={!testPropertyId || deletePropertyState.loading}
            variant="destructive"
          >
            {deletePropertyState.loading ? (
              <Loader2 className="w-4 h-4 animate-spin" />
            ) : (
              "Delete Test Property"
            )}
          </Button>
        </CardContent>
      </Card>

      {/* Upload Gallery */}
      <Card>
        <CardHeader>
          <CardTitle>5. Upload Gallery Images</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div>
            <label className="block text-sm font-semibold mb-2">Gallery Images</label>
            <input
              type="file"
              multiple
              accept="image/*"
              onChange={(e) => handleFileChange(e, true)}
              className="w-full border rounded-lg px-3 py-2"
            />
            <p className="text-sm text-gray-600 mt-1">
              Selected {galleryFiles.length} gallery images
            </p>
          </div>
          <Button 
            onClick={testUploadGallery}
            disabled={!testPropertyId || galleryFiles.length === 0 || uploadGalleryState.loading}
          >
            {uploadGalleryState.loading ? (
              <Loader2 className="w-4 h-4 animate-spin" />
            ) : (
              "Upload Gallery Images"
            )}
          </Button>
        </CardContent>
      </Card>

      {/* Load Gallery */}
      <Card>
        <CardHeader>
          <CardTitle>6. Load Gallery</CardTitle>
        </CardHeader>
        <CardContent>
          <Button 
            onClick={testLoadGallery}
            disabled={!testPropertyId || galleryState.loading}
          >
            {galleryState.loading ? (
              <Loader2 className="w-4 h-4 animate-spin" />
            ) : (
              "Load Gallery"
            )}
          </Button>
          {galleryState.data && (
            <div className="mt-4">
              <p className="text-sm text-gray-600">Found {galleryState.data.length} gallery images</p>
              <div className="grid grid-cols-4 gap-2 mt-2">
                {galleryState.data.map(image => (
                  <div key={image.id} className="text-xs p-2 bg-gray-100 rounded">
                    <p><strong>Tag:</strong> {image.tag}</p>
                    <p><strong>URL:</strong> {image.url}</p>
                  </div>
                ))}
              </div>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Debug Info */}
      <Card>
        <CardHeader>
          <CardTitle>Debug Information</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="space-y-2 text-sm">
              <p><strong>API Base URL:</strong> {process.env.NEXT_PUBLIC_API_URL || 'http://localhost:4000/api'}</p>
              <p><strong>Image Base URL:</strong> {process.env.NEXT_PUBLIC_API_URL?.replace('/api', '') || 'http://localhost:4000'}</p>
              <p><strong>Auth Token:</strong> {localStorage.getItem('authToken') ? 'Present' : 'Missing'}</p>
              <p><strong>Test Property ID:</strong> {testPropertyId || 'None'}</p>
              <p><strong>Properties Count:</strong> {propertiesState.data?.length || 0}</p>
              <p><strong>Gallery Images Count:</strong> {galleryState.data?.length || 0}</p>
            </div>
            
            {/* Uploads Directory Test */}
            <div>
              <Button onClick={testUploadsDirectory} className="mb-2 mr-2">
                Test Uploads Directory
              </Button>
              <Button onClick={testImageUrls} className="mb-2">
                Test Image URLs
              </Button>
              {uploadsInfo && (
                <div className="p-2 bg-gray-100 rounded text-xs">
                  <p><strong>Uploads Path:</strong> {uploadsInfo.uploadsPath}</p>
                  <p><strong>Total Files:</strong> {uploadsInfo.totalFiles}</p>
                  <p><strong>Sample Files:</strong> {uploadsInfo.files?.join(', ') || 'None'}</p>
                </div>
              )}
            </div>
            
            {/* Image URL Debug */}
            {propertiesState.data && propertiesState.data.length > 0 && (
              <div className="mt-4">
                <p className="font-semibold">Sample Image URLs:</p>
                {propertiesState.data[0].images.slice(0, 2).map((imagePath, index) => (
                  <div key={index} className="mt-2 p-2 bg-gray-100 rounded">
                    <p><strong>Original Path:</strong> {imagePath}</p>
                    <p><strong>Full URL:</strong> {apiClient.getImageUrl(imagePath)}</p>
                    <img 
                      src={apiClient.getImageUrl(imagePath)} 
                      alt={`Test ${index}`}
                      className="w-20 h-20 object-cover mt-1 border"
                      onError={(e) => {
                        console.error('Image failed to load:', apiClient.getImageUrl(imagePath));
                        e.currentTarget.style.border = '2px solid red';
                      }}
                      onLoad={() => console.log('Image loaded successfully:', apiClient.getImageUrl(imagePath))}
                    />
                  </div>
                ))}
              </div>
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  );
} 