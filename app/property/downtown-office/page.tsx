import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { ArrowLeft, Share, Maximize, Bed, Bath, Wifi, Instagram, Facebook, Twitter, Star, Check } from "lucide-react";
import Link from "next/link";

const features = [
  { name: "Conference Rooms", checked: true },
  { name: "High-Speed Internet", checked: true },
  { name: "Cafeteria", checked: true },
  { name: "Parking", checked: true },
  { name: "Security", checked: true },
  { name: "Central AC", checked: true },
  { name: "Elevator", checked: true },
  { name: "Backup Power", checked: true },
];

export default function DowntownOfficePage() {
  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="flex items-center gap-4 mb-4">
        <Link href="/property">
          <Button variant="ghost" size="icon">
            <ArrowLeft className="w-5 h-5" />
          </Button>
        </Link>
        <h1 className="text-2xl font-bold text-gray-900">Downtown Office Building</h1>
      </div>
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Main Content */}
        <div className="lg:col-span-2 space-y-6">
          {/* Property Images */}
          <Card>
            <CardContent className="p-0">
              <div className="relative">
                <div className="h-96 bg-gradient-to-br from-yellow-400 to-yellow-600 rounded-t-lg relative overflow-hidden">
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
                    <h2 className="text-2xl font-bold mb-2">Downtown Office Building</h2>
                    <div className="flex items-center gap-4 text-sm">
                      <div className="flex items-center gap-1">
                        <Bed className="w-4 h-4" />
                        <span>10 Offices</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <Bath className="w-4 h-4" />
                        <span>4 Bathrooms</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <Wifi className="w-4 h-4" />
                        <span>High-Speed Wifi</span>
                      </div>
                    </div>
                  </div>
                  <div className="absolute bottom-4 right-4 text-white text-sm">1 of 5</div>
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
                The Downtown Office Building is a prime commercial property located in the heart of the business district. It offers modern office spaces, advanced facilities, and a professional environment for businesses of all sizes.
              </p>
              <br />
              <p className="text-gray-600 leading-relaxed">
                Tenants benefit from conference rooms, a cafeteria, secure parking, and 24/7 security. The building is designed for productivity and comfort, making it an ideal choice for growing companies.
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
                {[1, 2, 3, 4, 5].map((item) => (
                  <div key={item} className="aspect-square bg-yellow-200 rounded-lg"></div>
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
              <div className="h-64 bg-gradient-to-br from-yellow-100 to-yellow-200 rounded-lg relative">
                <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
                  <div className="bg-white px-4 py-3 rounded-lg shadow-lg">
                    <p className="text-sm font-medium">Downtown Office Building</p>
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
                <AvatarFallback className="bg-gray-200 text-gray-700 text-lg">DO</AvatarFallback>
              </Avatar>
              <h3 className="font-semibold text-lg mb-1">David Olson</h3>
              <Badge className="bg-yellow-100 text-yellow-700 mb-4">OWNER</Badge>
              <p className="text-sm text-gray-600 mb-4">456 Business Rd, Downtown, NY 10001</p>
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
                <span className="text-sm font-medium">4.6</span>
                <span className="text-xs text-gray-400">(18 reviews)</span>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
} 