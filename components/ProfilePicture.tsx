import { useRef } from 'react';
import { Pencil } from 'lucide-react';

interface ProfilePictureProps {
  imageUrl: string | null;
  userName: string;
  onImageChange: (imageUrl: string) => void;
}

export function ProfilePicture({ imageUrl, userName, onImageChange }: ProfilePictureProps) {
  const fileInputRef = useRef<HTMLInputElement>(null);

  const getInitials = (name: string) => {
    const parts = name.split(' ');
    if (parts.length >= 2) {
      return `${parts[0][0]}${parts[parts.length - 1][0]}`.toUpperCase();
    }
    return name.substring(0, 2).toUpperCase();
  };

  const getGradientFromName = (name: string) => {
    const hash = name.split('').reduce((acc, char) => acc + char.charCodeAt(0), 0);
    const hue1 = hash % 360;
    const hue2 = (hash * 2) % 360;
    return `linear-gradient(135deg, hsl(${hue1}, 50%, 40%), hsl(${hue2}, 50%, 50%))`;
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        onImageChange(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleClick = () => {
    fileInputRef.current?.click();
  };

  return (
    <div className="relative group flex-shrink-0">
      <div
        className="w-20 h-20 md:w-24 md:h-24 rounded-full border-2 border-[#333] overflow-hidden cursor-pointer"
        onClick={handleClick}
        style={
          imageUrl
            ? { background: '#1a1a1a' }
            : { background: getGradientFromName(userName) }
        }
      >
        {imageUrl ? (
          <img
            src={imageUrl}
            alt={`${userName}'s profile picture`}
            className="w-full h-full object-cover"
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center text-[#fafafa] text-2xl md:text-4xl">
            {getInitials(userName)}
          </div>
        )}
      </div>

      <button
        onClick={handleClick}
        className="absolute -bottom-2 -right-2 w-9 h-9 bg-[#fafafa] text-black rounded-full flex items-center justify-center shadow-[0_2px_8px_rgba(0,0,0,0.4)] transition-transform duration-200 hover:scale-110 focus:outline-none focus:ring-2 focus:ring-[#fafafa] focus:ring-offset-2 focus:ring-offset-black"
        aria-label="Edit profile picture"
      >
        <Pencil className="w-4 h-4" />
      </button>

      <input
        ref={fileInputRef}
        type="file"
        accept="image/*"
        onChange={handleFileChange}
        className="hidden"
        aria-label="Upload profile picture"
      />
    </div>
  );
}
