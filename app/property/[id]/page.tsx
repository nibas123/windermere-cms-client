"use client";

import { useState, useEffect } from "react";
import { useParams } from "next/navigation";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import {
  Star,
  Edit,
  Save,
  X,
  MessageSquare,
  ArrowLeft,
  Share,
  Maximize,
  Bed,
  Bath,
  Wifi,
  Instagram,
  Facebook,
  Twitter,
  Check,
  Loader2,
} from "lucide-react";
import {
  useProperty,
  usePropertyGallery,
  useUpdateProperty,
  useUploadGalleryImages,
  useDeleteGalleryImage,
  useUpdateGalleryImage,
  useComments,
  useUploadFeaturedImages,
} from "@/hooks/use-api";
import { apiClient } from "@/lib/api";
import { useToast } from "@/hooks/use-toast";
import Link from "next/link";
import GalleryImages from "@/components/gallery-images";
import FeaturedImagesGallery from "@/components/featured-image";

// Hardcoded features to match the original design
const features = [
  { name: "Air Conditioning", checked: true },
  { name: "Heating", checked: true },
  { name: "Kitchen", checked: true },
  { name: "Washing Machine", checked: true },
  { name: "Dryer", checked: true },
  { name: "Wifi", checked: true },
  { name: "TV", checked: true },
  { name: "Cable TV", checked: true },
  { name: "Parquet", checked: true },
];

export default function PropertyDetailPage() {
  const params = useParams();
  const propertyId = params.id as string;
  const { toast } = useToast();
  const [currentImageIndex, setCurrentImageIndex] = useState(3);
  const [allImages, setAllImages] = useState<string[]>([]);
  const [isEditing, setIsEditing] = useState(false);
  const [editForm, setEditForm] = useState({
    name: "",
    description: "",
    address: "",
    refNo: "",
    price: "",
    longitude: "",
    size: "",
    guests: "",
    rooms: "",
    latitude: "",
    features: [""],
    status: "active",
  });

  const [mainImages, setMainImages] = useState<string[]>([]);
  // const [selectedCategory, setSelectedCategory] = useState<string>("exterior");


  // API hooks
  const [propertyState, propertyActions] = useProperty(propertyId);
  const [galleryState, galleryActions] = usePropertyGallery(propertyId);
  const [updatePropertyState, updatePropertyActions] = useUpdateProperty();

  const [commentsState, commentsActions] = useComments({
    propertyId,
    status: "APPROVED",
  });

  // Load property, gallery, and comments data
  useEffect(() => {
    if (propertyId) {
      propertyActions.execute();
      galleryActions.execute();
      // commentsActions.execute();
    }
  }, [propertyId]);

  // Combine property images and gallery images
  useEffect(() => {
    if (propertyState.data && galleryState.data) {
      const propertyImages = propertyState.data.images || [];
      const galleryImages = galleryState.data.map((img) => img.url);
      setMainImages([...propertyImages]);
      setAllImages([...propertyImages, ...galleryImages]);
    } else if (propertyState.data) {
      setAllImages(propertyState.data.images || []);
    }
  }, [propertyState.data, galleryState.data]);

  // Initialize edit form when property data loads
  useEffect(() => {
    if (propertyState.data) {
      setEditForm({
        name: propertyState.data.name,
        description: propertyState.data.description,
        address: propertyState.data.address,
        rooms: propertyState.data.rooms,
        guests: propertyState.data.rooms,
        size: propertyState.data.size,
        refNo: propertyState.data.refNo,
        price: propertyState.data.price?.toString() || "",
        longitude: propertyState.data.longitude?.toString() || "",
        latitude: propertyState.data.latitude?.toString() || "",
        features: propertyState.data.features || [""],
        status: propertyState.data.status || "active",
      });
    }
  }, [propertyState.data]);

  // Get top 4 recent comments
  const recentComments = commentsState.data?.slice(0, 4) || [];

  // Format date for display
  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("en-GB", {
      day: "numeric",
      month: "short",
      year: "numeric",
    });
  };

  // Get initials from name
  const getInitials = (name: string) => {
    return name
      .split(" ")
      .map((n) => n[0])
      .join("")
      .toUpperCase();
  };

  const handleEditChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    const { name, value } = e.target;
    setEditForm((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleFeatureChange = (index: number, value: string) => {
    setEditForm((prev) => ({
      ...prev,
      features: prev.features.map((feat, i) => (i === index ? value : feat)),
    }));
  };

  const addFeature = () => {
    setEditForm((prev) => ({
      ...prev,
      features: [...prev.features, ""],
    }));
  };

  const removeFeature = (index: number) => {
    setEditForm((prev) => ({
      ...prev,
      features: prev.features.filter((_, i) => i !== index),
    }));
  };

  const handleSave = async () => {
    try {
      const formData = new FormData();
      formData.append("name", editForm.name);
      formData.append("description", editForm.description);
      formData.append("address", editForm.address);
      formData.append("refNo", editForm.refNo);
      formData.append("price", editForm.price);
      formData.append("longitude", editForm.longitude);
      formData.append("latitude", editForm.latitude);
      formData.append(
        "features",
        JSON.stringify(editForm.features.filter((f) => f.trim()))
      );
      formData.append("status", editForm.status);
      formData.append("size", editForm.size);
      formData.append("guests", editForm.guests);
      formData.append("rooms", editForm.rooms);

      await updatePropertyActions.execute(propertyId, formData);
      setIsEditing(false);
      propertyActions.execute(); // Refresh data
      toast({
        title: "Success",
        description: "Property updated successfully",
      });
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to update property",
        variant: "destructive",
      });
    }
  };

  if (propertyState.loading) {
    return (
      <div className="p-4 lg:p-6 space-y-6 bg-gray-50 flex items-center justify-center">
        <div className="flex items-center gap-2">
          <Loader2 className="w-6 h-6 animate-spin" />
          <span>Loading property details...</span>
        </div>
      </div>
    );
  }

  if (propertyState.error || !propertyState.data) {
    return (
      <div className="p-4 lg:p-6 space-y-6 bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <p className="text-red-600 mb-4">Failed to load property details</p>
          <Link href="/property">
            <Button>Back to Properties</Button>
          </Link>
        </div>
      </div>
    );
  }

  const property = propertyState.data;
  // const galleryImages = galleryState.data || [];

  // Use property features if available, otherwise use default features
  const displayFeatures =
    property.features && property.features.length > 0
      ? property.features.map((feature) => ({ name: feature, checked: true }))
      : features;

  return (
    <div className="p-4 lg:p-6 space-y-6 bg-gray-50">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <Link href="/property">
            <Button variant="ghost" size="icon">
              <ArrowLeft className="w-5 h-5" />
            </Button>
          </Link>
          <h1 className="text-2xl font-bold text-gray-900">
            {property.name} {property.refNo}
          </h1>
          <Badge
            className={
              property.status === "active" ? "bg-green-500" : "bg-red-500"
            }
          >
            {property.status === "active" ? "Active" : "Inactive"}
          </Badge>
        </div>
        <div className="flex items-center gap-2">
          <div className="relative">
            <input
              placeholder="Search here..."
              className="pl-10 pr-4 py-2 w-80 bg-white border border-gray-200 rounded-lg"
            />
          </div>
          {isEditing ? (
            <div className="flex gap-2">
              <Button
                onClick={handleSave}
                disabled={updatePropertyState.loading}
                className="bg-teal-600 hover:bg-teal-700"
              >
                {updatePropertyState.loading ? (
                  <Loader2 className="w-4 h-4 animate-spin" />
                ) : (
                  <Save className="w-4 h-4" />
                )}
                Save
              </Button>
              <Button variant="outline" onClick={() => setIsEditing(false)}>
                <X className="w-4 h-4" />
                Cancel
              </Button>
            </div>
          ) : (
            <Button
              onClick={() => setIsEditing(true)}
              className="bg-blue-600 hover:bg-blue-700"
            >
              <Edit className="w-4 h-4" />
              Edit
            </Button>
          )}
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Main Content */}
        <div className="lg:col-span-2 space-y-6">
          {/* Property Images */}
          <Card>
            <CardContent className="p-0">
              <div className="relative">
                <div className="h-96 bg-gradient-to-br from-blue-400 to-blue-600 rounded-t-lg relative overflow-hidden">
                  {allImages.length > 0 && allImages[currentImageIndex] && (
                    <img
                      src={apiClient.getImageUrl(allImages[currentImageIndex])}
                      alt={property.name}
                      className="w-full h-full object-cover"
                    />
                  )}
                  <div className="absolute top-4 right-4 flex gap-2 mt-10">
                    <Button size="icon" variant="secondary" className="w-8 h-8">
                      <Share className="w-4 h-4" />
                    </Button>
                    <Button size="icon" variant="secondary" className="w-8 h-8">
                      <Maximize className="w-4 h-4" />
                    </Button>
                  </div>
                  <div className="absolute bottom-4 left-4 text-white">
                    <h2 className="text-2xl font-bold mb-2">
                      {property.name} {property.refNo}
                    </h2>
                    <div className="flex items-center gap-4 text-sm">
                      <div className="flex items-center gap-1">
                        <Bed className="w-4 h-4" />
                        <span>4 Bedroom</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <Bath className="w-4 h-4" />
                        <span>3 Bathroom</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <Wifi className="w-4 h-4" />
                        <span>Wifi Available</span>
                      </div>
                    </div>
                  </div>
                  <div className="absolute bottom-4 right-4 text-white text-sm">
                    {currentImageIndex + 1} of {Math.max(allImages.length, 0)}
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Description */}
          <Card>
            <CardHeader>
              <CardTitle>Description</CardTitle>
            </CardHeader>
            <CardContent>
              {isEditing ? (
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-semibold mb-2">
                      Property Name
                    </label>
                    <input
                      name="name"
                      value={editForm.name}
                      onChange={handleEditChange}
                      className="w-full border rounded-lg px-3 py-2"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-semibold mb-2">
                      Reference Number
                    </label>
                    <input
                      name="refNo"
                      value={editForm.refNo}
                      onChange={handleEditChange}
                      className="w-full border rounded-lg px-3 py-2"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-semibold mb-2">
                      Address
                    </label>
                    <input
                      name="address"
                      value={editForm.address}
                      onChange={handleEditChange}
                      className="w-full border rounded-lg px-3 py-2"
                    />
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-semibold mb-2">
                        Longitude
                      </label>
                      <input
                        name="longitude"
                        type="number"
                        step="any"
                        value={editForm.longitude}
                        onChange={handleEditChange}
                        className="w-full border rounded-lg px-3 py-2"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-semibold mb-2">
                        Latitude
                      </label>
                      <input
                        name="latitude"
                        type="number"
                        step="any"
                        value={editForm.latitude}
                        onChange={handleEditChange}
                        className="w-full border rounded-lg px-3 py-2"
                      />
                    </div>
                  </div>
                  <div>
                    <label className="block text-sm font-semibold mb-2">
                      Price
                    </label>
                    <input
                      name="price"
                      type="number"
                      value={editForm.price}
                      onChange={handleEditChange}
                      className="w-full border rounded-lg px-3 py-2"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-semibold mb-2">
                      Description
                    </label>
                    <textarea
                      name="description"
                      value={editForm.description}
                      onChange={handleEditChange}
                      className="w-full border rounded-lg px-3 py-2"
                      rows={4}
                    />
                  </div>
                  <div className="grid grid-cols-3 gap-2">
                    <div>
                      <label className="block text-sm font-semibold mb-2">
                        No of guests
                      </label>
                      <input
                        name="guests"
                        value={editForm.guests}
                        onChange={handleEditChange}
                        className="w-full border rounded-lg px-3 py-2"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-semibold mb-2">
                        No of rooms
                      </label>
                      <input
                        name="rooms"
                        value={editForm.rooms}
                        onChange={handleEditChange}
                        className="w-full border rounded-lg px-3 py-2"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-semibold mb-2">
                        Size of the lodge
                      </label>
                      <input
                        name="size"
                        value={editForm.size}
                        onChange={handleEditChange}
                        className="w-full border rounded-lg px-3 py-2"
                      />
                    </div>
                  </div>
                  <div>
                    <label className="block text-sm font-semibold mb-2">
                      Status
                    </label>
                    <select
                      name="status"
                      value={editForm.status}
                      onChange={handleEditChange}
                      className="w-full border rounded-lg px-3 py-2"
                    >
                      <option value="active">Active</option>
                      <option value="inactive">Inactive</option>
                      {/* <option value="sold">Occupied</option>
                      <option value="rented">Available</option> */}
                    </select>
                  </div>
                </div>
              ) : (
                <>
                  <p className="text-gray-600 leading-relaxed">
                    {property.description}
                  </p>
                </>
              )}
            </CardContent>
          </Card>

          {/* Gallery */}
          
          <FeaturedImagesGallery isEditing={isEditing}/>
          <GalleryImages isEditing={isEditing}/>


          {/* Location */}
          <Card>
            <CardHeader>
              <CardTitle>Location</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="h-64 bg-gradient-to-br from-green-200 to-green-300 rounded-lg relative">
                <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
                  <div className="bg-white px-4 py-3 rounded-lg shadow-lg">
                    <p className="text-sm font-medium">{property.name}</p>
                    <p className="text-xs text-gray-500">{property.address}</p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Features */}
          <Card>
            <CardHeader>
              <CardTitle>Features</CardTitle>
            </CardHeader>
            <CardContent>
              {isEditing ? (
                <div className="space-y-3">
                  {editForm.features.map((feature, index) => (
                    <div key={index} className="flex items-center gap-2">
                      <input
                        type="text"
                        value={feature}
                        onChange={(e) =>
                          handleFeatureChange(index, e.target.value)
                        }
                        className="flex-grow border rounded-lg px-3 py-2"
                        placeholder="Feature name"
                      />
                      <button
                        type="button"
                        onClick={() => removeFeature(index)}
                        className="text-red-500 hover:text-red-600"
                      >
                        <X className="w-4 h-4" />
                      </button>
                    </div>
                  ))}
                  <button
                    type="button"
                    onClick={addFeature}
                    className="text-teal-600 hover:text-teal-700 text-sm font-semibold"
                  >
                    + Add Feature
                  </button>
                </div>
              ) : (
                <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                  {displayFeatures.map((feature, index) => (
                    <div key={index} className="flex items-center gap-2">
                      <div className="w-5 h-5 bg-green-500 rounded-full flex items-center justify-center">
                        <Check className="w-3 h-3 text-white" />
                      </div>
                      <span className="text-sm text-gray-700">
                        {feature.name}
                      </span>
                    </div>
                  ))}
                </div>
              )}
            </CardContent>
          </Card>
        </div>

        <div className="space-y-6">
          <Card>
            <CardContent className="p-6 text-center">
              <Avatar className="w-20 h-20 mx-auto mb-4">
                <AvatarFallback className="bg-gray-200 text-gray-700 text-lg">
                  LK
                </AvatarFallback>
              </Avatar>
              <h3 className="font-semibold text-lg mb-1">Levi Kusnandar</h3>
              <Badge className="bg-green-100 text-green-700 mb-4">OWNER</Badge>
              <p className="text-sm text-gray-600 mb-4">
                Beverly Hills Estate Agent specializing in luxury properties
                with over 15 years of experience.
              </p>
              <div className="flex justify-center gap-2 mb-6">
                <Button
                  size="icon"
                  className="w-8 h-8 bg-teal-600 hover:bg-teal-700"
                >
                  <Instagram className="w-4 h-4" />
                </Button>
                <Button
                  size="icon"
                  className="w-8 h-8 bg-blue-600 hover:bg-blue-700"
                >
                  <Facebook className="w-4 h-4" />
                </Button>
                <Button
                  size="icon"
                  className="w-8 h-8 bg-blue-400 hover:bg-blue-500"
                >
                  <Twitter className="w-4 h-4" />
                </Button>
              </div>
            </CardContent>
          </Card>
          {/* Price */}
          <Card>
            <CardHeader>
              <CardTitle>Price</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="text-center">
                <p className="text-sm text-gray-500 mb-2">Starting from</p>
                <p className="text-3xl font-bold text-blue-600">
                  £ {property.price?.toLocaleString() || "2,500,000"}
                </p>
                <p className="text-sm text-gray-500">Luxury Premium Property</p>
              </div>
              {/* <Button className="w-full bg-teal-600 hover:bg-teal-700">Schedule Viewing</Button>
              <Button variant="outline" className="w-full bg-transparent">
                Contact Agent
              </Button> */}
            </CardContent>
          </Card>

          {/* Recent Comments */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <MessageSquare className="w-5 h-5" />
                Recent Comments
              </CardTitle>
            </CardHeader>

            <CardContent className="space-y-4">
              {recentComments.length > 0 ? (
                recentComments.map((comment, index) => (
                  <div key={comment.id} className="flex gap-3">
                    <Avatar>
                      <AvatarFallback className="bg-gray-200 text-gray-700">
                        {getInitials(comment.visitor?.name || "Anonymous")}
                      </AvatarFallback>
                    </Avatar>
                    <div className="flex-1">
                      <h4 className="font-medium text-gray-900">
                        {comment.visitor?.name || "Anonymous User"}
                      </h4>
                      <p className="text-sm text-gray-500 mb-2">
                        {formatDate(comment.createdAt)}
                      </p>
                      {comment.rating && (
                        <div className="flex gap-1 mb-2">
                          {[...Array(5)].map((_, i) => (
                            <Star
                              key={i}
                              className={`w-4 h-4 ${
                                i < comment.rating!
                                  ? "text-orange-400 fill-current"
                                  : "text-gray-300"
                              }`}
                            />
                          ))}
                        </div>
                      )}
                      <p className="text-sm text-gray-700">{comment.content}</p>
                    </div>
                  </div>
                ))
              ) : (
                <div className="text-center py-4">
                  <MessageSquare className="w-8 h-8 text-gray-400 mx-auto mb-2" />
                  <p className="text-gray-500">No comments yet</p>
                </div>
              )}
            </CardContent>
          </Card>
        </div>
      </div>      
    </div>
  );
}