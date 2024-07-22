import React, { useRef, useState, useEffect } from "react";

const MAX_LENGTH = 150; // الحد الأقصى لطول النص قبل عرض "more"

const AutoResizeTextarea = ({ text }: any) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  const toggleExpand = () => {
    setIsExpanded(!isExpanded);
  };

  useEffect(() => {
    if (textareaRef.current) {
      textareaRef.current.style.height = "auto"; // إعادة تعيين الارتفاع إلى تلقائي للسماح بإعادة الحساب
      textareaRef.current.style.height = `${textareaRef.current.scrollHeight}px`; // تعيين الارتفاع بناءً على ارتفاع المحتوى
    }
  }, [text, isExpanded]);

  const displayText = isExpanded ? text : text.slice(0, MAX_LENGTH);

  return (
    <div>
      <div>
        <textarea
          ref={textareaRef}
          className="resize-none outline-none text-sm bg-[#0000] w-full sm:text-base"
          value={displayText}
          readOnly
        ></textarea>
      </div>

      {text.length > MAX_LENGTH && (
        <span className="text-blue-500 cursor-pointer" onClick={toggleExpand}>
          {isExpanded ? " Read Less.." : "Read More.."}
        </span>
      )}
    </div>
  );
};

export default AutoResizeTextarea;
