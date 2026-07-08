import { Pencil, Trash2, Eye } from "lucide-react";

interface Props {
  onView?: () => void;
  onEdit?: () => void;
  onDelete?: () => void;
}

export default function UserActions({ onView, onEdit, onDelete }: Props) {
  return (
    <div className="flex items-center gap-2">
      <button
        onClick={onView}
        className="btn-ghost p-1.5 rounded-lg"
        title="View"
      >
        <Eye size={14} style={{ color: "var(--brand-primary)" }} />
      </button>
      <button
        onClick={onEdit}
        className="btn-ghost p-1.5 rounded-lg"
        title="Edit"
      >
        <Pencil size={14} style={{ color: "var(--text-secondary)" }} />
      </button>
      <button
        onClick={onDelete}
        className="btn-ghost p-1.5 rounded-lg"
        title="Delete"
      >
        <Trash2 size={14} style={{ color: "var(--danger)" }} />
      </button>
    </div>
  );
}