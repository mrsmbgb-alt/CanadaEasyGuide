"use client";

import { useState } from "react";

interface Props {
  initialSettings: Record<string, string>;
}

const SETTING_FIELDS = [
  { key: "site_name", label: "Site Name", type: "text", placeholder: "Canada Easy Guide" },
  { key: "site_tagline", label: "Tagline", type: "text", placeholder: "Your Trusted Immigration Resource" },
  { key: "site_description", label: "Site Description (SEO)", type: "textarea", placeholder: "Describe your site for search engines…" },
  { key: "contact_email", label: "Contact Email", type: "email", placeholder: "info@canadaeasyguide.com" },
  { key: "google_analytics_id", label: "Google Analytics ID", type: "text", placeholder: "G-XXXXXXXXXX" },
  { key: "adsterra_publisher_id", label: "Adsterra Publisher ID", type: "text", placeholder: "Your Adsterra Publisher ID" },
  { key: "facebook_url", label: "Facebook URL", type: "url", placeholder: "https://facebook.com/your-page" },
  { key: "twitter_url", label: "Twitter/X URL", type: "url", placeholder: "https://twitter.com/your-handle" },
  { key: "instagram_url", label: "Instagram URL", type: "url", placeholder: "https://instagram.com/your-handle" },
  { key: "youtube_url", label: "YouTube URL", type: "url", placeholder: "https://youtube.com/your-channel" },
];

export default function SettingsClient({ initialSettings }: Props) {
  const [settings, setSettings] = useState<Record<string, string>>(initialSettings);
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState("");

  function set(key: string, value: string) {
    setSettings((prev) => ({ ...prev, [key]: value }));
  }

  async function handleSave() {
    setSaving(true);
    setMessage("");
    const res = await fetch("/api/settings", {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ settings }),
    });
    if (res.ok) {
      setMessage("✅ Settings saved successfully!");
    } else {
      setMessage("❌ Failed to save settings.");
    }
    setSaving(false);
  }

  return (
    <main className="flex-1 p-6 overflow-auto">
      <div className="max-w-3xl mx-auto">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h1 className="text-2xl font-bold text-white">⚙️ Site Settings</h1>
            <p className="text-gray-400 text-sm mt-1">Configure your website details, SEO, and social links.</p>
          </div>
          <button
            onClick={handleSave}
            disabled={saving}
            className="px-5 py-2.5 bg-red-600 hover:bg-red-700 text-white text-sm font-semibold rounded-xl transition disabled:opacity-50"
          >
            {saving ? "Saving…" : "💾 Save Settings"}
          </button>
        </div>

        {message && (
          <div className={`mb-5 p-3 rounded-xl text-sm border ${message.startsWith("✅") ? "bg-green-900/30 border-green-700 text-green-300" : "bg-red-900/30 border-red-700 text-red-300"}`}>
            {message}
          </div>
        )}

        <div className="space-y-4">
          {/* Site Info */}
          <div className="bg-[#1a1a2e] rounded-2xl p-5 border border-white/5">
            <h2 className="text-white font-semibold mb-4">🌐 Site Information</h2>
            <div className="space-y-4">
              {SETTING_FIELDS.slice(0, 4).map((field) => (
                <div key={field.key}>
                  <label className="block text-xs text-gray-400 mb-1.5">{field.label}</label>
                  {field.type === "textarea" ? (
                    <textarea
                      value={settings[field.key] || ""}
                      onChange={(e) => set(field.key, e.target.value)}
                      rows={3}
                      placeholder={field.placeholder}
                      className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-2.5 text-white placeholder-gray-600 focus:outline-none focus:ring-2 focus:ring-red-500 text-sm resize-none"
                    />
                  ) : (
                    <input
                      type={field.type}
                      value={settings[field.key] || ""}
                      onChange={(e) => set(field.key, e.target.value)}
                      placeholder={field.placeholder}
                      className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-2.5 text-white placeholder-gray-600 focus:outline-none focus:ring-2 focus:ring-red-500 text-sm"
                    />
                  )}
                </div>
              ))}
            </div>
          </div>

          {/* Analytics & Ads */}
          <div className="bg-[#1a1a2e] rounded-2xl p-5 border border-white/5">
            <h2 className="text-white font-semibold mb-4">📊 Analytics & Advertising</h2>
            <div className="space-y-4">
              {SETTING_FIELDS.slice(4, 6).map((field) => (
                <div key={field.key}>
                  <label className="block text-xs text-gray-400 mb-1.5">{field.label}</label>
                  <input
                    type={field.type}
                    value={settings[field.key] || ""}
                    onChange={(e) => set(field.key, e.target.value)}
                    placeholder={field.placeholder}
                    className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-2.5 text-white placeholder-gray-600 focus:outline-none focus:ring-2 focus:ring-red-500 text-sm"
                  />
                </div>
              ))}
              <p className="text-xs text-gray-500">
                ℹ️ For detailed Adsterra ad code management, use the{" "}
                <a href="/admin/ads" className="text-green-400 hover:underline">Ad Manager page</a>.
              </p>
            </div>
          </div>

          {/* Social Links */}
          <div className="bg-[#1a1a2e] rounded-2xl p-5 border border-white/5">
            <h2 className="text-white font-semibold mb-4">📱 Social Media Links</h2>
            <div className="space-y-4">
              {SETTING_FIELDS.slice(6).map((field) => (
                <div key={field.key}>
                  <label className="block text-xs text-gray-400 mb-1.5">{field.label}</label>
                  <input
                    type={field.type}
                    value={settings[field.key] || ""}
                    onChange={(e) => set(field.key, e.target.value)}
                    placeholder={field.placeholder}
                    className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-2.5 text-white placeholder-gray-600 focus:outline-none focus:ring-2 focus:ring-red-500 text-sm"
                  />
                </div>
              ))}
            </div>
          </div>

          {/* Change Password */}
          <div className="bg-[#1a1a2e] rounded-2xl p-5 border border-white/5">
            <h2 className="text-white font-semibold mb-2">🔑 Admin Account</h2>
            <p className="text-gray-400 text-sm mb-4">
              Email: <strong className="text-gray-200">admin@canadaeasyguide.com</strong>
            </p>
            <div className="p-3 bg-yellow-900/30 border border-yellow-700/50 rounded-lg text-yellow-300 text-xs">
              To change your password, update it directly in the database or contact your system administrator.
              Current default: <strong>Admin@Canada2025</strong>
            </div>
          </div>
        </div>

        <div className="mt-6 flex justify-end">
          <button
            onClick={handleSave}
            disabled={saving}
            className="px-6 py-3 bg-red-600 hover:bg-red-700 text-white font-semibold rounded-xl transition disabled:opacity-50"
          >
            {saving ? "Saving…" : "💾 Save All Settings"}
          </button>
        </div>
      </div>
    </main>
  );
}
