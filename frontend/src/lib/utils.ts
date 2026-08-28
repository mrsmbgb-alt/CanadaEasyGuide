export function formatDate(date: Date | string | null) {
  if (!date) return "";
  return new Date(date).toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
}

export function timeAgo(date: Date | string | null) {
  if (!date) return "";
  const now = new Date();
  const d = new Date(date);
  const diff = now.getTime() - d.getTime();
  const mins = Math.floor(diff / 60000);
  const hours = Math.floor(diff / 3600000);
  const days = Math.floor(diff / 86400000);
  if (mins < 60) return `${mins}m ago`;
  if (hours < 24) return `${hours}h ago`;
  if (days < 30) return `${days}d ago`;
  return formatDate(date);
}

export function truncate(str: string, n: number) {
  return str.length > n ? str.slice(0, n) + "…" : str;
}

export function stripHtml(html: string) {
  return html.replace(/<[^>]*>/g, "");
}

export function generateSlug(title: string) {
  return title
    .toLowerCase()
    .replace(/[^a-z0-9\s-]/g, "")
    .replace(/\s+/g, "-")
    .replace(/-+/g, "-")
    .trim();
}

export const CATEGORIES = [
  "Express Entry",
  "Provincial Nominee",
  "Study in Canada",
  "Work Permits",
  "Family Sponsorship",
  "Citizenship",
  "Cost of Living",
  "Settlement Tips",
  "General",
];

export const CATEGORY_COLORS: Record<string, string> = {
  "Express Entry": "bg-blue-100 text-blue-800",
  "Provincial Nominee": "bg-green-100 text-green-800",
  "Study in Canada": "bg-yellow-100 text-yellow-800",
  "Work Permits": "bg-red-100 text-red-800",
  "Family Sponsorship": "bg-purple-100 text-purple-800",
  Citizenship: "bg-orange-100 text-orange-800",
  "Cost of Living": "bg-cyan-100 text-cyan-800",
  "Settlement Tips": "bg-brown-100 text-amber-800",
  General: "bg-gray-100 text-gray-700",
};

export const CATEGORY_BG: Record<string, string> = {
  "Express Entry": "#1a73e8",
  "Provincial Nominee": "#0f9d58",
  "Study in Canada": "#f4b400",
  "Work Permits": "#db4437",
  "Family Sponsorship": "#9c27b0",
  Citizenship: "#ff5722",
  "Cost of Living": "#00bcd4",
  "Settlement Tips": "#795548",
  General: "#607d8b",
};
