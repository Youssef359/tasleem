import { useState, useRef, useEffect } from 'react';
import { Pencil, Check } from 'lucide-react';

interface EditableFieldProps {
  value: string;
  onSave: (value: string) => void;
  className?: string;
  inputClassName?: string;
}

export function EditableField({ value, onSave, className = '', inputClassName = '' }: EditableFieldProps) {
  const [isEditing, setIsEditing] = useState(false);
  const [editValue, setEditValue] = useState(value);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (isEditing && inputRef.current) {
      inputRef.current.focus();
      inputRef.current.select();
    }
  }, [isEditing]);

  const handleSave = () => {
    if (editValue.trim() && editValue !== value) {
      onSave(editValue.trim());
    } else {
      setEditValue(value);
    }
    setIsEditing(false);
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      handleSave();
    } else if (e.key === 'Escape') {
      setEditValue(value);
      setIsEditing(false);
    }
  };

  if (isEditing) {
    return (
      <div className={`flex items-center gap-3 ${className}`}>
        <input
          ref={inputRef}
          type="text"
          value={editValue}
          onChange={(e) => setEditValue(e.target.value)}
          onKeyDown={handleKeyDown}
          onBlur={handleSave}
          className={`bg-transparent border border-[#333] rounded px-2 py-1 text-[#fafafa] focus:border-[#fafafa] focus:outline-none ${inputClassName}`}
        />
        <button
          onClick={handleSave}
          className="text-[#fafafa] hover:text-white transition-colors"
          aria-label="Save changes"
        >
          <Check className="w-4 h-4" />
        </button>
      </div>
    );
  }

  return (
    <div className={`flex items-center gap-3 ${className}`}>
      <span className={inputClassName}>{value}</span>
      <button
        onClick={() => setIsEditing(true)}
        className="text-[#888] hover:text-[#fafafa] transition-colors opacity-60 hover:opacity-100"
        aria-label={`Edit ${value}`}
      >
        <Pencil className="w-4 h-4" />
      </button>
    </div>
  );
}
