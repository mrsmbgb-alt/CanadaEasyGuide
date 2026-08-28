"use client";

interface AdSlotProps {
  code: string;
  name: string;
  type?: "leaderboard" | "rectangle" | "auto";
  className?: string;
}

export default function AdSlot({ code, name, type = "auto", className = "" }: AdSlotProps) {
  const isEmpty = !code || code.startsWith("<!--");
  const heightClass =
    type === "leaderboard" ? "ad-slot-leaderboard" : type === "rectangle" ? "ad-slot-rectangle" : "";

  if (isEmpty) {
    return (
      <div className={`ad-slot ${heightClass} ${className}`}>
        <span>Advertisement – {name}</span>
      </div>
    );
  }

  return (
    <div
      className={`ad-slot ${heightClass} ${className}`}
      dangerouslySetInnerHTML={{ __html: code }}
    />
  );
}
