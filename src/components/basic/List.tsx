import React from "react";

interface ListProps {
  items: { text: string; icon?: React.ReactNode; onClick?: () => void; subItems?: ListProps["items"] }[];
  className?: string;
  type?: "unordered" | "ordered" | "inline";
  bulletColor?: string;
  textColor?: string;
  backgroundColor?: string;
  borderColor?: string;
}

export const List: React.FC<ListProps> = ({
  items,
  className = "",
  type = "unordered",
  bulletColor = "#333",
  textColor = "#000",
  backgroundColor = "#fff",
  borderColor = "#ddd",
}) => {
  const listStyles = {
    unordered: "list-disc pl-5",
    ordered: "list-decimal pl-5",
    inline: "flex space-x-4",
  };

  return (
    <div
      className={`p-4 rounded-lg shadow-md ${className}`}
      style={{ backgroundColor, borderColor, color: textColor, borderWidth: borderColor ? "1px" : "0px" }}
    >
      {type === "ordered" ? (
        <ol className={listStyles[type]}>
          {items.map((item, index) => (
            <ListItem key={index} {...item} bulletColor={bulletColor} textColor={textColor} />
          ))}
        </ol>
      ) : (
        <ul className={listStyles[type]}>
          {items.map((item, index) => (
            <ListItem key={index} {...item} bulletColor={bulletColor} textColor={textColor} />
          ))}
        </ul>
      )}
    </div>
  );
};

// List Item Component
const ListItem: React.FC<{ text: string; icon?: React.ReactNode; onClick?: () => void; bulletColor: string; textColor: string; subItems?: ListProps["items"] }> = ({
  text,
  icon,
  onClick,
  bulletColor,
  textColor,
  subItems,
}) => {
  return (
    <li className="flex items-center space-x-2 cursor-pointer" onClick={onClick} style={{ color: textColor }}>
      {icon ? <span className="text-lg">{icon}</span> : <span className="w-2 h-2 rounded-full" style={{ backgroundColor: bulletColor }}></span>}
      <span>{text}</span>

      {/* Nested List */}
      {subItems && subItems.length > 0 && (
        <ul className="ml-6 list-disc">
          {subItems.map((subItem, index) => (
            <ListItem key={index} {...subItem} bulletColor={bulletColor} textColor={textColor} />
          ))}
        </ul>
      )}
    </li>
  );
};
