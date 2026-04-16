import { Share2 } from "lucide-react";
import { useState } from "react";

const CopyUrlButton = ({ id }) => {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    const url = `${window.location.origin}/read/${id}`;
    await navigator.clipboard.writeText(url);
    setCopied(true);

    setTimeout(() => setCopied(false), 1500);
  };

  return (
    <button onClick={handleCopy} className="flex items-center gap-1">
      <Share2 className="h-5 cursor-pointer" />
      {copied && <span className="text-green-500 text-xs">Copied!</span>}
    </button>
  );
};

export default CopyUrlButton;