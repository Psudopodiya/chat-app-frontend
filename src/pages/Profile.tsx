import { Camera, Edit, Trash2Icon, User } from "lucide-react";
import { useRef, useState } from "react";

import {
  Avatar,
  AvatarFallback,
  AvatarImage,
  Button,
  Card,
  CardContent,
  Input,
  Label,
  Textarea,
} from "@/components/ui";
import { useAuth } from "@/context/AuthContext";
import { useToast } from "@/hooks/use-toast";
import { updateProfile } from "@/service/userApi";

type FormDataType = {
  username?: string;
  bio?: string;
  email?: string;
  profile_image?: string;
};

export default function ProfilePage() {
  const { user, setUser } = useAuth();
  const { toast } = useToast();
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [formData, setFormData] = useState<FormDataType>({
    username: user?.username || "",
    bio: user?.bio || "",
  });
  const [profileImage, setProfileImage] = useState<File | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [previewImage, setPreviewImage] = useState<string | null>(null);

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!isEditing) {
      setIsEditing(true);
      return;
    }

    setIsLoading(true);

    const updatedFormData = new FormData();
    Object.entries(formData).forEach(([key, value]) => {
      updatedFormData.append(key, value);
    });
    if (profileImage) {
      updatedFormData.append("profile_image", profileImage);
    }

    try {
      const updatedUser = await updateProfile(updatedFormData);
      setUser(updatedUser);
      setPreviewImage(null);
      setIsEditing(false);
      toast({
        title: "Profile Updated",
        description: "Your profile has been successfully updated.",
      });
    } catch (error) {
      console.error("Failed to update profile:", error);
      toast({
        title: "Update Failed",
        description:
          "There was an error updating your profile. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleDeleteAccount = () => {
    toast({
      title: "Account Deletion",
      description: "Account deletion functionality is not implemented yet.",
      variant: "destructive",
    });
  };

  const handleImageClick = () => {
    if (isEditing) {
      fileInputRef.current?.click();
    }
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setProfileImage(file);
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreviewImage(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <div>
      <div className="font-inconsolata min-h-screen bg-gradient-to-b from-[#1c3f39] to-[#354f52] p-8 flex items-center justify-center">
        <Card className="w-full max-w-2xl mx-auto bg-[#f2e8cf] shadow-xl rounded-xl overflow-hidden">
          <CardContent className="p-6">
            <div className="flex flex-col items-center mb-8">
              <Avatar
                className={`w-32 h-32 mb-4 border-4 border-[#354f52] shadow-lg ${
                  isEditing ? "cursor-pointer" : ""
                }`}
                onClick={handleImageClick}
              >
                <AvatarImage
                  src={
                    previewImage ||
                    `http://127.0.0.1:8001${user?.profile_image}`
                  }
                  alt="Profile picture"
                  className="object-cover"
                />
                <AvatarFallback className="text-4xl">
                  {user?.username.slice(0, 2).toUpperCase()}
                </AvatarFallback>
              </Avatar>
              <input
                type="file"
                ref={fileInputRef}
                className="hidden"
                accept="image/*"
                onChange={handleImageChange}
                disabled={!isEditing}
              />
              {isEditing && (
                <Button
                  variant="outline"
                  size="sm"
                  className="bg-white hover:bg-gray-100"
                  onClick={handleImageClick}
                >
                  <Camera className="mr-2 h-4 w-4" />
                  Change Picture
                </Button>
              )}
            </div>

            <form
              className="flex flex-col justify-center gap-8"
              onSubmit={handleSubmit}
            >
              <div className="flex items-center justify-around">
                <div>
                  <Label
                    htmlFor="username"
                    className="text-sm font-medium text-gray-700"
                  >
                    Username
                  </Label>
                  <Input
                    id="username"
                    name="username"
                    value={formData.username}
                    onChange={handleInputChange}
                    className="bg-white w-fit"
                    disabled={!isEditing}
                  />
                </div>
                <div>
                  <Label
                    htmlFor="email"
                    className="text-sm font-medium text-gray-700"
                  >
                    Email
                  </Label>
                  <Input
                    id="email"
                    name="email"
                    type="email"
                    value={user?.email}
                    className="bg-white"
                    disabled={true}
                  />
                </div>
              </div>

              <div>
                <Label
                  htmlFor="bio"
                  className="text-sm font-medium text-gray-700"
                >
                  Bio
                </Label>
                <Textarea
                  id="bio"
                  name="bio"
                  value={formData.bio}
                  onChange={handleInputChange}
                  className="bg-white mt-1"
                  rows={4}
                  placeholder="Tell us about yourself..."
                  disabled={!isEditing}
                />
              </div>

              <div className="flex justify-around">
                <Button
                  className="w-fit bg-[#354f52] hover:bg-[#1c3f39] text-white"
                  type="submit"
                  disabled={isLoading}
                >
                  {isEditing ? (
                    <>
                      <User className="mr-2 h-4 w-4" />
                      {isLoading ? "Updating..." : "Update Changes"}
                    </>
                  ) : (
                    <>
                      <Edit className="mr-2 h-4 w-4" />
                      Edit Profile
                    </>
                  )}
                </Button>

                <Button
                  variant="outline"
                  className="w-fit text-red-600 hover:text-red-700 hover:bg-red-50 border-red-200"
                  onClick={handleDeleteAccount}
                  type="button"
                >
                  <Trash2Icon className="mr-2 h-4 w-4" />
                  Delete Account
                </Button>
              </div>
            </form>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
