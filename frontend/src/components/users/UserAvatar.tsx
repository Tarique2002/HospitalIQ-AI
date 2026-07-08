import { User } from "lucide-react";

interface UserAvatarProps {
  name: string;
}

export default function UserAvatar({
  name,
}: UserAvatarProps) {
  return (
    <div className="flex items-center gap-3">
      <div className="h-11 w-11 rounded-full bg-indigo-100 flex items-center justify-center">
        <User className="h-5 w-5 text-indigo-600" />
      </div>

      <div>
        <p className="font-semibold text-slate-800">
          {name}
        </p>

        <p className="text-xs text-slate-500">
          Hospital Staff
        </p>
      </div>
    </div>
  );
}