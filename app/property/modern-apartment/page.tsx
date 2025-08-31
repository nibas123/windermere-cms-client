import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { ArrowLeft, Share, Maximize, Bed, Bath, Wifi, Instagram, Facebook, Twitter, Star, Check } from "lucide-react";
import Link from "next/link";

const features = [
  { name: "Gym", checked: true },
  { name: "Elevator", checked: true },
  { name: "Internet", checked: true },
  { name: "Balcony", checked: true },
  { name: "Security", checked: true },
  { name: "Parking", checked: true },
  { name: "Laundry", checked: true },
  { name: "Central Heating", checked: true },
];

export default function ModernApartmentPage() {
  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="flex items-center gap-4 mb-4">
        <Link href="/property">
          <Button variant="ghost" size="icon">
            <ArrowLeft className="w-5 h-5" />
          </Button>
        </Link>
        <h1 className="text-2xl font-bold text-gray-900">Modern Apartment Complex</h1>
      </div>
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Main Content */}
        <div className="lg:col-span-2 space-y-6">
          {/* Property Images */}
          <Card>
            <CardContent className="p-0">
              <div className="relative">
                <div className="h-96 bg-gradient-to-br from-gray-400 to-gray-600 rounded-t-lg relative overflow-hidden">
                  <div className="absolute top-4 right-4 flex gap-2">
                    <Badge className="bg-gray-400 hover:bg-gray-500">Occupied</Badge>
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
                    <h2 className="text-2xl font-bold mb-2">Modern Apartment Complex</h2>
                    <div className="flex items-center gap-4 text-sm">
                      <div className="flex items-center gap-1">
                        <Bed className="w-4 h-4" />
                        <span>3 Bedroom</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <Bath className="w-4 h-4" />
                        <span>2 Bathroom</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <Wifi className="w-4 h-4" />
                        <span>Wifi Available</span>
                      </div>
                    </div>
                  </div>
                  <div className="absolute bottom-4 right-4 text-white text-sm">1 of 6</div>
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
                This modern apartment complex offers urban living at its finest, with contemporary design, top-tier amenities, and a vibrant community atmosphere. Located in the heart of downtown, residents enjoy easy access to shopping, dining, and entertainment options.
              </p>
              <br />
              <p className="text-gray-600 leading-relaxed">
                Spacious units feature open floor plans, large windows for natural light, and high-end finishes throughout. The building includes a state-of-the-art gym, secure parking, and 24/7 security for peace of mind.
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
                {[1, 2, 3, 4, 5, 6].map((item) => (
                  <div key={item} className="aspect-square bg-gray-300 rounded-lg"></div>
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
              <div className="h-64 bg-gradient-to-br from-blue-200 to-blue-300 rounded-lg relative">
                <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
                  <div className="bg-white px-4 py-3 rounded-lg shadow-lg">
                    <p className="text-sm font-medium">Modern Apartment Complex</p>
                    <p className="text-xs text-gray-500">Downtown, NY 10001</p>
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
                <AvatarFallback className="bg-gray-200 text-gray-700 text-lg">MA</AvatarFallback>
              </Avatar>
              <h3 className="font-semibold text-lg mb-1">Maria Anderson</h3>
              <Badge className="bg-gray-100 text-gray-700 mb-4">OWNER</Badge>
              <p className="text-sm text-gray-600 mb-4">123 Main St, Downtown, NY 10001</p>
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
              <div className="flex items-center justify-center gap-1">
                <Star className="w-4 h-4 text-yellow-400" />
                <span className="text-sm font-medium">4.8</span>
                <span className="text-xs text-gray-400">(32 reviews)</span>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
} 