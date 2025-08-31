import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { ArrowLeft, Share, Maximize, Bed, Bath, Wifi, Instagram, Facebook, Twitter, Star, Check } from "lucide-react";
import Link from "next/link";

const features = [
  { name: "Large Garden", checked: true },
  { name: "Playground", checked: true },
  { name: "Garage", checked: true },
  { name: "Fireplace", checked: true },
  { name: "Laundry Room", checked: true },
  { name: "Basement", checked: true },
  { name: "Patio", checked: true },
  { name: "Security System", checked: true },
];

export default function SuburbanHomePage() {
  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="flex items-center gap-4 mb-4">
        <Link href="/property">
          <Button variant="ghost" size="icon">
            <ArrowLeft className="w-5 h-5" />
          </Button>
        </Link>
        <h1 className="text-2xl font-bold text-gray-900">Suburban Family Home</h1>
      </div>
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Main Content */}
        <div className="lg:col-span-2 space-y-6">
          {/* Property Images */}
          <Card>
            <CardContent className="p-0">
              <div className="relative">
                <div className="h-96 bg-gradient-to-br from-green-400 to-green-600 rounded-t-lg relative overflow-hidden">
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
                    <h2 className="text-2xl font-bold mb-2">Suburban Family Home</h2>
                    <div className="flex items-center gap-4 text-sm">
                      <div className="flex items-center gap-1">
                        <Bed className="w-4 h-4" />
                        <span>5 Bedroom</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <Bath className="w-4 h-4" />
                        <span>4 Bathroom</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <Wifi className="w-4 h-4 text-gray-400" />
                        <span>No Wifi</span>
                      </div>
                    </div>
                  </div>
                  <div className="absolute bottom-4 right-4 text-white text-sm">1 of 7</div>
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
                The Suburban Family Home is perfect for those seeking comfort, space, and a family-friendly environment. Located in a peaceful neighborhood, this property features a large garden, playground, and modern amenities for everyday living.
              </p>
              <br />
              <p className="text-gray-600 leading-relaxed">
                The spacious interior includes five bedrooms, a cozy fireplace, and a finished basement. The backyard is ideal for gatherings and play, making it a wonderful place to raise a family.
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
                {[1, 2, 3, 4, 5, 6, 7].map((item) => (
                  <div key={item} className="aspect-square bg-green-200 rounded-lg"></div>
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
              <div className="h-64 bg-gradient-to-br from-green-100 to-green-200 rounded-lg relative">
                <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
                  <div className="bg-white px-4 py-3 rounded-lg shadow-lg">
                    <p className="text-sm font-medium">Suburban Family Home</p>
                    <p className="text-xs text-gray-500">Sunnyvale, CA 94086</p>
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
                <AvatarFallback className="bg-gray-200 text-gray-700 text-lg">SF</AvatarFallback>
              </Avatar>
              <h3 className="font-semibold text-lg mb-1">Sarah Foster</h3>
              <Badge className="bg-green-100 text-green-700 mb-4">OWNER</Badge>
              <p className="text-sm text-gray-600 mb-4">789 Maple Ave, Sunnyvale, CA 94086</p>
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
                <span className="text-sm font-medium">4.9</span>
                <span className="text-xs text-gray-400">(21 reviews)</span>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
} 