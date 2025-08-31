import { useState, useEffect } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Star, Edit, Save, X, Plus, Trash2, Upload, MessageSquare, ArrowLeft, Share, Maximize, Bed, Bath, Wifi, Instagram, Facebook, Twitter, Check, Loader2 } from "lucide-react"
import { useProperty, usePropertyGallery, useUpdateProperty, useUploadGalleryImages, useDeleteGalleryImage, useUpdateGalleryImage, useComments } from "@/hooks/use-api"
import { apiClient } from "@/lib/api"
import { useToast } from "@/hooks/use-toast"
import Link from "next/link"

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

const imageCategories = [
  { value: 'exterior', label: 'Exterior' },
  { value: 'interior', label: 'Interior' },
  { value: 'surroundings', label: 'Surroundings' }
];

export default function LuxuryDreamHousePage() {
  const propertyId = "luxury-dream-house";
  const { toast } = useToast();
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [allImages, setAllImages] = useState<string[]>([]);
  const [isEditing, setIsEditing] = useState(false);
  const [editForm, setEditForm] = useState({
    name: "",
    description: "",
    address: "",
    refNo: "",
    price: "",
    longitude: "",
    latitude: "",
    features: [""],
    status: "active",
  });
  const [galleryFiles, setGalleryFiles] = useState<File[]>([]);
  const [galleryTags, setGalleryTags] = useState<string[]>([]);
  const [showGalleryUpload, setShowGalleryUpload] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState<string>("exterior");

  // API hooks
  const [propertyState, propertyActions] = useProperty(propertyId);
  const [galleryState, galleryActions] = usePropertyGallery(propertyId);
  const [updatePropertyState, updatePropertyActions] = useUpdateProperty();
  const [uploadGalleryState, uploadGalleryActions] = useUploadGalleryImages();
  const [deleteGalleryState, deleteGalleryActions] = useDeleteGalleryImage();
  const [updateGalleryState, updateGalleryActions] = useUpdateGalleryImage();
  const [commentsState, commentsActions] = useComments({ propertyId, status: 'APPROVED' });

  // Load property, gallery, and comments data
  useEffect(() => {
    if (propertyId) {
      propertyActions.execute();
      galleryActions.execute();
      commentsActions.execute();
    }
  }, [propertyId]);

  // Combine property images and gallery images
  useEffect(() => {
    if (propertyState.data && galleryState.data) {
      const propertyImages = propertyState.data.images || [];
      const galleryImages = galleryState.data.map(img => img.url);
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
    return new Date(dateString).toLocaleDateString('en-GB', {
      day: 'numeric',
      month: 'short',
      year: 'numeric'
    });
  };

  // Get initials from name
  const getInitials = (name: string) => {
    return name.split(' ').map(n => n[0]).join('').toUpperCase();
  };

  const handleEditChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setEditForm(prev => ({
      ...prev,
      [name]: value
    }));
  };

  return (
    <div className="p-4 lg:p-6 space-y-6 bg-gray-50 min-h-full">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <Link href="/property">
            <Button variant="ghost" size="icon">
              <ArrowLeft className="w-5 h-5" />
            </Button>
          </Link>
          <h1 className="text-2xl font-bold text-gray-900">Luxury Dream House T-001234</h1>
        </div>
        <div className="relative">
          <input
            placeholder="Search here..."
            className="pl-10 pr-4 py-2 w-80 bg-white border border-gray-200 rounded-lg"
          />
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
                  <div className="absolute top-4 right-4 flex gap-2">
                    <Badge className="bg-green-500 hover:bg-green-600">Available</Badge>
                  </div>
                  <div className="absolute top-4 right-4 flex gap-2 mt-10">
                    <Button size="icon" variant="secondary" className="w-8 h-8">
                      <Share className="w-4 h-4" />
                    </Button>
                    <Button size="icon" variant="secondary" className="w-8 h-8">
                      <Maximize className="w-4 h-4" />
                    </Button>
                  </div>
                  <div className="absolute bottom-4 left-4 text-white">
                    <h2 className="text-2xl font-bold mb-2">Luxury Dream House T-001234</h2>
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
                  <div className="absolute bottom-4 right-4 text-white text-sm">1 of 8</div>
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
              <p className="text-gray-600 leading-relaxed">
                This stunning luxury dream house represents the pinnacle of modern living, combining sophisticated
                design with unparalleled comfort. Located in one of the most prestigious neighborhoods, this property
                offers breathtaking views and exceptional amenities that cater to the most discerning tastes.
              </p>
              <br />
              <p className="text-gray-600 leading-relaxed">
                The spacious interior features high-end finishes throughout, including marble countertops, hardwood
                floors, and custom cabinetry. The open-concept living area seamlessly flows into the gourmet kitchen,
                perfect for entertaining guests. Each of the four bedrooms offers ample space and natural light, with
                the master suite featuring a private balcony and spa-like ensuite bathroom.
              </p>
              <br />
              <p className="text-gray-600 leading-relaxed">
                The outdoor space is equally impressive, featuring a resort-style swimming pool, landscaped gardens, and
                multiple entertainment areas. This property truly offers a lifestyle of luxury and convenience, with
                easy access to premium shopping, dining, and recreational facilities.
              </p>
            </CardContent>
          </Card>

          {/* Gallery */}
          <Card>
            <CardHeader>
              <CardTitle>Gallery</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-4 gap-4">
                {[1, 2, 3, 4, 5, 6, 7, 8].map((item) => (
                  <div
                    key={item}
                    className="aspect-square bg-gradient-to-br from-gray-200 to-gray-300 rounded-lg"
                  ></div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Location */}
          <Card>
            <CardHeader>
              <CardTitle>Location</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="h-64 bg-gradient-to-br from-green-200 to-green-300 rounded-lg relative">
                <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
                  <div className="bg-white px-4 py-3 rounded-lg shadow-lg">
                    <p className="text-sm font-medium">Luxury Dream House</p>
                    <p className="text-xs text-gray-500">Beverly Hills, CA 90210</p>
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
              <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                {features.map((feature, index) => (
                  <div key={index} className="flex items-center gap-2">
                    <div className="w-5 h-5 bg-green-500 rounded-full flex items-center justify-center">
                      <Check className="w-3 h-3 text-white" />
                    </div>
                    <span className="text-sm text-gray-700">{feature.name}</span>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Sidebar */}
        <div className="space-y-6">
          {/* Owner Info */}
          <Card>
            <CardContent className="p-6 text-center">
              <Avatar className="w-20 h-20 mx-auto mb-4">
                <AvatarFallback className="bg-gray-200 text-gray-700 text-lg">LK</AvatarFallback>
              </Avatar>
              <h3 className="font-semibold text-lg mb-1">Levi Kusnandar</h3>
              <Badge className="bg-green-100 text-green-700 mb-4">OWNER</Badge>
              <p className="text-sm text-gray-600 mb-4">
                Beverly Hills Estate Agent specializing in luxury properties with over 15 years of experience.
              </p>
              <div className="flex justify-center gap-2 mb-6">
                <Button size="icon" className="w-8 h-8 bg-teal-600 hover:bg-teal-700">
                  <Instagram className="w-4 h-4" />
                </Button>
                <Button size="icon" className="w-8 h-8 bg-blue-600 hover:bg-blue-700">
                  <Facebook className="w-4 h-4" />
                </Button>
                <Button size="icon" className="w-8 h-8 bg-blue-400 hover:bg-blue-500">
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
                <p className="text-3xl font-bold text-blue-600">$ 2,500,000</p>
                <p className="text-sm text-gray-500">Luxury Premium Property</p>
              </div>
              <Button className="w-full bg-teal-600 hover:bg-teal-700">Schedule Viewing</Button>
              <Button variant="outline" className="w-full bg-transparent">
                Contact Agent
              </Button>
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
                        {getInitials(comment.visitor?.name || 'Anonymous')}
                      </AvatarFallback>
                    </Avatar>
                    <div className="flex-1">
                      <h4 className="font-medium text-gray-900">
                        {comment.visitor?.name || 'Anonymous User'}
                      </h4>
                      <p className="text-sm text-gray-500 mb-2">
                        {formatDate(comment.createdAt)}
                      </p>
                      {comment.rating && (
                        <div className="flex gap-1 mb-2">
                          {[...Array(5)].map((_, i) => (
                            <Star
                              key={i}
                              className={`w-4 h-4 ${i < comment.rating! ? "text-orange-400 fill-current" : "text-gray-300"}`}
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
  )
}
