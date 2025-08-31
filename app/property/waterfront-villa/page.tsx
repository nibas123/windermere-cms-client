import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { ArrowLeft, Share, Maximize, Bed, Bath, Wifi, Instagram, Facebook, Twitter, Star, Check } from "lucide-react";
import Link from "next/link";

const features = [
  { name: "Private Dock", checked: true },
  { name: "Boat House", checked: true },
  { name: "Infinity Pool", checked: true },
  { name: "Outdoor Kitchen", checked: true },
  { name: "Fire Pit", checked: true },
  { name: "Jacuzzi", checked: true },
  { name: "Smart Home", checked: true },
  { name: "Security System", checked: true },
];

export default function WaterfrontVillaPage() {
  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="flex items-center gap-4 mb-4">
        <Link href="/property">
          <Button variant="ghost" size="icon">
            <ArrowLeft className="w-5 h-5" />
          </Button>
        </Link>
        <h1 className="text-2xl font-bold text-gray-900">Waterfront Villa</h1>
      </div>
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Main Content */}
        <div className="lg:col-span-2 space-y-6">
          {/* Property Images */}
          <Card>
            <CardContent className="p-0">
              <div className="relative">
                <div className="h-96 bg-gradient-to-br from-blue-300 to-blue-700 rounded-t-lg relative overflow-hidden">
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
                    <h2 className="text-2xl font-bold mb-2">Waterfront Villa</h2>
                    <div className="flex items-center gap-4 text-sm">
                      <div className="flex items-center gap-1">
                        <Bed className="w-4 h-4" />
                        <span>6 Bedroom</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <Bath className="w-4 h-4" />
                        <span>5 Bathroom</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <Wifi className="w-4 h-4 text-green-500" />
                        <span>Wifi Available</span>
                      </div>
                    </div>
                  </div>
                  <div className="absolute bottom-4 right-4 text-white text-sm">1 of 9</div>
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
                The Waterfront Villa is a luxurious retreat offering stunning water views, private amenities, and a tranquil atmosphere. Perfect for those who love boating, entertaining, and relaxing in style.
              </p>
              <br />
              <p className="text-gray-600 leading-relaxed">
                This villa features a private dock, infinity pool, and smart home technology. The spacious outdoor kitchen and fire pit make it ideal for gatherings and family fun.
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
                {[1, 2, 3, 4, 5, 6, 7, 8, 9].map((item) => (
                  <div key={item} className="aspect-square bg-blue-200 rounded-lg"></div>
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
              <div className="h-64 bg-gradient-to-br from-blue-100 to-blue-200 rounded-lg relative">
                <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
                  <div className="bg-white px-4 py-3 rounded-lg shadow-lg">
                    <p className="text-sm font-medium">Waterfront Villa</p>
                    <p className="text-xs text-gray-500">Lakeview, FL 32003</p>
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
                <AvatarFallback className="bg-gray-200 text-gray-700 text-lg">WV</AvatarFallback>
              </Avatar>
              <h3 className="font-semibold text-lg mb-1">William Vance</h3>
              <Badge className="bg-blue-100 text-blue-700 mb-4">OWNER</Badge>
              <p className="text-sm text-gray-600 mb-4">101 Lakeview Dr, Lakeview, FL 32003</p>
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
                <span className="text-sm font-medium">4.7</span>
                <span className="text-xs text-gray-400">(15 reviews)</span>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
} 