import { Camera, Edit, Save, Trash2Icon } from "lucide-react";
import { useRef, useState } from "react";
import { useNavigate } from "react-router-dom";

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
  const navigate = useNavigate();

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
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
      <div className="flex min-h-screen items-center justify-center bg-[#f5f1e4] p-8 font-inconsolata">
        <Card className="relative mx-auto w-full max-w-2xl rounded-none border-4 border-double border-[#1c3f39] bg-[#e8e0c5] shadow-[8px_8px_0_0_#1c3f39]">
          <CardContent className="p-8">
            <Button
              type="button"
              onClick={() => navigate("/")}
              variant={"vintage_icon"}
              className="absolute"
            >
              Back to Home
            </Button>
            <div className="mb-8 flex flex-col items-center">
              <Avatar
                className={`mb-6 h-40 w-40 border-4 border-double border-[#1c3f39] shadow-[4px_4px_0_0_#1c3f39] ${
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
                <AvatarFallback className="bg-[#d4c9a8] text-4xl text-[#1c3f39]">
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
                  className="border-2 border-[#1c3f39] bg-[#f5f1e4] text-[#1c3f39] shadow-[2px_2px_0_0_#1c3f39] transition-all hover:bg-[#e8e0c5] hover:shadow-none"
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
              <div className="grid grid-cols-2 gap-6">
                <div>
                  <Label
                    htmlFor="username"
                    className="mb-2 text-sm font-bold uppercase tracking-wider text-[#1c3f39]"
                  >
                    Username
                  </Label>
                  <Input
                    id="username"
                    name="username"
                    value={formData.username}
                    onChange={handleInputChange}
                    className="border-2 border-[#1c3f39] bg-[#f5f1e4] text-[#1c3f39] shadow-[inset_2px_2px_0_0_#1c3f39] transition-all focus:shadow-[inset_-2px_-2px_0_0_#1c3f39]"
                    disabled={!isEditing}
                  />
                </div>
                <div>
                  <Label
                    htmlFor="email"
                    className="mb-2 text-sm font-bold uppercase tracking-wider text-[#1c3f39]"
                  >
                    Email
                  </Label>
                  <Input
                    id="email"
                    name="email"
                    type="email"
                    value={user?.email}
                    className="border-2 border-[#1c3f39] bg-[#f5f1e4] text-[#1c3f39] shadow-[inset_2px_2px_0_0_#1c3f39] transition-all focus:shadow-[inset_-2px_-2px_0_0_#1c3f39]"
                    disabled={true}
                  />
                </div>
              </div>

              <div>
                <Label
                  htmlFor="bio"
                  className="mb-2 text-sm font-bold uppercase tracking-wider text-[#1c3f39]"
                >
                  Bio
                </Label>
                <Textarea
                  id="bio"
                  name="bio"
                  value={formData.bio}
                  onChange={handleInputChange}
                  className="border-2 border-[#1c3f39] bg-[#f5f1e4] text-[#1c3f39] shadow-[inset_2px_2px_0_0_#1c3f39] transition-all focus:shadow-[inset_-2px_-2px_0_0_#1c3f39]"
                  rows={4}
                  placeholder="Tell us about yourself..."
                  disabled={!isEditing}
                />
              </div>

              <div className="flex justify-between">
                <Button
                  className="rounded-none border-2 border-[#1c3f39] bg-[#1c3f39] font-bold uppercase tracking-wider text-[#f5f1e4] shadow-[4px_4px_0_0_#0a1f1c] transition-all hover:bg-[#2c4f49] hover:shadow-none"
                  type="submit"
                  disabled={isLoading}
                >
                  {isEditing ? (
                    <>
                      <Save className="mr-2 h-4 w-4" />
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
                  className="rounded-none border-2 border-[#8b0000] bg-[#f5f1e4] font-bold uppercase tracking-wider text-[#8b0000] shadow-[4px_4px_0_0_#8b0000] transition-all hover:bg-[#e8d8b0] hover:text-[#a50000] hover:shadow-none"
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
