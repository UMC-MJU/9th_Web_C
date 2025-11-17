// src/components/AddLpModal.tsx
import { FC, useRef, useState, ChangeEvent } from "react";
import { X } from "lucide-react";

interface AddLpModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (data: {
    name: string;
    content: string;
    tags: string[];
    file?: File;
  }) => void;
}

const AddLpModal: FC<AddLpModalProps> = ({ isOpen, onClose, onSubmit }) => {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [name, setName] = useState("");
  const [content, setContent] = useState("");
  const [tagInput, setTagInput] = useState("");
  const [tags, setTags] = useState<string[]>([]);
  const [file, setFile] = useState<File | undefined>(undefined);

  const handleBackgroundClick = (e: React.MouseEvent) => {
    if ((e.target as HTMLElement).dataset.backdrop === "true") {
      onClose();
    }
  };

  const handleTagAdd = () => {
    if (tagInput.trim()) {
      setTags((prev) => [...prev, tagInput.trim()]);
      setTagInput("");
    }
  };

  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    const f = e.target.files?.[0];
    if (f) {
      setFile(f);
    }
  };

  const triggerFileSelect = () => {
    fileInputRef.current?.click();
  };

  const handleSubmit = () => {
    onSubmit({ name, content, tags, file });
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50"
      data-backdrop="true"
      onClick={handleBackgroundClick}
    >
      <div className="bg-[#2c2f36] p-6 rounded-2xl w-full max-w-md relative">
        <button
          className="absolute top-4 right-4 text-gray-400 hover:text-white"
          onClick={onClose}
        >
          <X size={20} />
        </button>

        <div
          className="mx-auto w-40 h-40 mb-6 cursor-pointer"
          onClick={triggerFileSelect}
        >
          <img
            src={file ? URL.createObjectURL(file) : "/defaultImage.png"}
            alt="LP cover"
            className="w-full h-full object-cover rounded-full"
          />
          <input
            type="file"
            accept="image/*"
            ref={fileInputRef}
            className="hidden"
            onChange={handleFileChange}
          />
        </div>

        <div className="space-y-4">
          <input
            type="text"
            placeholder="LP Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="w-full px-4 py-2 bg-gray-700 text-white rounded-lg"
          />
          <input
            type="text"
            placeholder="LP Content"
            value={content}
            onChange={(e) => setContent(e.target.value)}
            className="w-full px-4 py-2 bg-gray-700 text-white rounded-lg"
          />

          <div className="flex gap-2">
            <input
              type="text"
              placeholder="LP Tag"
              value={tagInput}
              onChange={(e) => setTagInput(e.target.value)}
              className="flex-1 px-4 py-2 bg-gray-700 text-white rounded-lg"
            />
            <button
              type="button"
              onClick={handleTagAdd}
              className="px-4 py-2 bg-gray-500 text-white rounded-lg"
            >
              Add
            </button>
          </div>

          <div className="flex gap-2 flex-wrap">
            {tags.map((tag) => (
              <span
                key={tag}
                className="flex items-center gap-1 bg-pink-600 text-white px-2 py-1 rounded-full text-sm"
              >
                <span>{tag}</span>
                <X
                  size={12}
                  className="cursor-pointer ml-1"
                  onClick={() => setTags(tags.filter((t) => t !== tag))}
                />
              </span>
            ))}
          </div>

          <button
            onClick={handleSubmit}
            className="w-full mt-4 px-4 py-2 bg-gray-500 text-white rounded-lg"
          >
            Add LP
          </button>
        </div>
      </div>
    </div>
  );
};

export default AddLpModal;
