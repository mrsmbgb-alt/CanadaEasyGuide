"use client";

import { useState } from "react";

interface Ad {
  id: number;
  name: string;
  adsterraCode: string;
  isActive: boolean;
  applyToAll: boolean;
  updatedAt: Date | string;
}

interface Props {
  initialAds: Ad[];
}

export default function AdManagerClient({ initialAds }: Props) {
  const [ads, setAds] = useState<Ad[]>(initialAds);
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState("");
  const [messageType, setMessageType] = useState<"success" | "error">("success");
  const [expandedId, setExpandedId] = useState<number | null>(null);

  function updateAd(id: number, field: keyof Ad, value: string | boolean) {
    setAds((prev) => prev.map((a) => (a.id === id ? { ...a, [field]: value } : a)));
  }

  async function handleGlobalUpdate() {
    setSaving(true);
    setMessage("");
    try {
      const res = await fetch("/api/ads", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ placements: ads }),
      });
      const data = await res.json();
      if (res.ok) {
        setMessage(`✅ ${data.message}`);
        setMessageType("success");
      } else {
        setMessage(`❌ ${data.error || "Update failed"}`);
        setMessageType("error");
      }
    } catch {
      setMessage("❌ Network error. Please try again.");
      setMessageType("error");
    }
    setSaving(false);
  }

  async function handleAddPlacement() {
    const name = prompt("Enter placement name (e.g., 'Post Bottom Banner'):");
    if (!name) return;
    try {
      const res = await fetch("/api/ads", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, adsterraCode: "", isActive: true, applyToAll: true }),
      });
      const data = await res.json();
      if (res.ok) {
        setAds((prev) => [...prev, data.ad]);
        setMessage("✅ New ad placement added!");
        setMessageType("success");
      }
    } catch {
      setMessage("❌ Failed to add placement.");
      setMessageType("error");
    }
  }

  async function handleDelete(id: number) {
    if (!confirm("Remove this ad placement?")) return;
    const res = await fetch(`/api/ads/${id}`, { method: "DELETE" });
    if (res.ok) {
      setAds((prev) => prev.filter((a) => a.id !== id));
      setMessage("✅ Placement removed.");
      setMessageType("success");
    }
  }

  const placementGuide: Record<string, string> = {
    "Header Banner": "Shown at the top of every page. Best for 728×90 leaderboard.",
    "In-Post Top": "Shown at the top of every article. Best for 300×250.",
    "In-Post Middle": "Shown in the middle of articles. Best for 300×250.",
    "Sidebar Rectangle": "Shown in the right sidebar. Best for 300×250.",
    "Footer Banner": "Shown at the bottom of pages. Best for 728×90.",
    "Pop-Under": "Pop-under ad script. Paste the full Adsterra script here.",
  };

  return (
    <main className="flex-1 p-6 overflow-auto">
      <div className="max-w-5xl mx-auto">
        {/* Header */}
        <div className="flex items-start justify-between mb-6">
          <div>
            <h1 className="text-2xl font-bold text-white">📢 Ad Manager</h1>
            <p className="text-gray-400 text-sm mt-1">
              Manage all Adsterra ad placements. One global update applies to{" "}
              <strong className="text-red-400">all posts automatically</strong>.
            </p>
          </div>
          <div className="flex gap-2">
            <button
              onClick={handleAddPlacement}
              className="px-4 py-2.5 text-sm text-gray-300 border border-white/10 rounded-xl hover:bg-white/5 transition"
            >
              + Add Placement
            </button>
            <button
              onClick={handleGlobalUpdate}
              disabled={saving}
              className="px-5 py-2.5 text-sm font-semibold text-white bg-green-600 hover:bg-green-700 rounded-xl transition disabled:opacity-50"
            >
              {saving ? "⏳ Updating…" : "🔄 Save & Apply to All Posts"}
            </button>
          </div>
        </div>

        {/* Message */}
        {message && (
          <div
            className={`mb-5 p-4 rounded-xl text-sm border ${
              messageType === "success"
                ? "bg-green-900/30 border-green-700 text-green-300"
                : "bg-red-900/30 border-red-700 text-red-300"
            }`}
          >
            {message}
          </div>
        )}

        {/* How it works */}
        <div className="bg-[#1a1a2e] rounded-2xl p-5 border border-yellow-500/20 mb-6">
          <h2 className="text-yellow-400 font-semibold mb-2">⚡ How Ad Management Works</h2>
          <ul className="text-gray-300 text-sm space-y-1.5">
            <li>• Paste your <strong className="text-white">Adsterra ad code</strong> (script tag or banner HTML) into each placement.</li>
            <li>• Toggle active/inactive per placement without deleting the code.</li>
            <li>• Click <strong className="text-green-400">"Save & Apply to All Posts"</strong> — changes instantly apply to every article on your site.</li>
            <li>• New posts you create will <strong className="text-white">automatically inherit</strong> the current ad codes.</li>
            <li>• Use the <strong className="text-white">Publisher ID</strong> field in Settings for account-level Adsterra configuration.</li>
          </ul>
        </div>

        {/* Ad Placements */}
        <div className="space-y-4">
          {ads.map((ad) => (
            <div
              key={ad.id}
              className={`bg-[#1a1a2e] rounded-2xl border transition ${
                ad.isActive ? "border-white/5" : "border-white/5 opacity-60"
              }`}
            >
              {/* Card Header */}
              <div
                className="flex items-center gap-4 p-5 cursor-pointer"
                onClick={() => setExpandedId(expandedId === ad.id ? null : ad.id)}
              >
                <div className="flex items-center gap-3 flex-1 min-w-0">
                  {/* Active toggle */}
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      updateAd(ad.id, "isActive", !ad.isActive);
                    }}
                    className={`relative w-10 h-6 rounded-full transition flex-shrink-0 ${ad.isActive ? "bg-green-500" : "bg-gray-600"}`}
                    title={ad.isActive ? "Click to deactivate" : "Click to activate"}
                  >
                    <div
                      className={`absolute top-1 left-1 w-4 h-4 bg-white rounded-full shadow transition-transform ${ad.isActive ? "translate-x-4" : ""}`}
                    />
                  </button>

                  <div className="min-w-0">
                    <h3 className="text-white font-semibold text-sm">{ad.name}</h3>
                    <p className="text-gray-500 text-xs mt-0.5">
                      {placementGuide[ad.name] || "Custom ad placement"}
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  <span
                    className={`px-2.5 py-1 rounded-full text-xs font-medium ${
                      ad.isActive ? "bg-green-900/40 text-green-400" : "bg-gray-700 text-gray-400"
                    }`}
                  >
                    {ad.isActive ? "Active" : "Inactive"}
                  </span>
                  {ad.adsterraCode && !ad.adsterraCode.startsWith("<!--") && (
                    <span className="px-2.5 py-1 rounded-full text-xs font-medium bg-blue-900/40 text-blue-400">
                      Code Set ✓
                    </span>
                  )}
                  <span className="text-gray-400 text-lg">{expandedId === ad.id ? "▲" : "▼"}</span>
                </div>
              </div>

              {/* Expanded editor */}
              {expandedId === ad.id && (
                <div className="px-5 pb-5 border-t border-white/5">
                  <div className="pt-4 space-y-4">
                    <div>
                      <label className="block text-xs text-gray-400 mb-1.5">Placement Name</label>
                      <input
                        type="text"
                        value={ad.name}
                        onChange={(e) => updateAd(ad.id, "name", e.target.value)}
                        className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-2 text-white text-sm focus:outline-none focus:ring-2 focus:ring-green-500"
                      />
                    </div>

                    <div>
                      <label className="block text-xs text-gray-400 mb-1.5">
                        Adsterra Ad Code{" "}
                        <span className="text-gray-500">(paste the full script or banner HTML from your Adsterra dashboard)</span>
                      </label>
                      <textarea
                        value={ad.adsterraCode}
                        onChange={(e) => updateAd(ad.id, "adsterraCode", e.target.value)}
                        rows={8}
                        placeholder={`<!-- Paste your Adsterra ad code here -->\n<script type="text/javascript">\n  atOptions = {\n    'key': 'your_key_here',\n    'format': 'iframe',\n    ...\n  };\n</script>\n<script src="//...adsterra.com/..."></script>`}
                        className="w-full bg-black/30 border border-white/10 rounded-xl px-4 py-3 text-green-300 text-xs font-mono focus:outline-none focus:ring-2 focus:ring-green-500 resize-y"
                      />
                    </div>

                    <div className="flex items-center gap-6">
                      <label className="flex items-center gap-2 cursor-pointer">
                        <div className={`relative w-8 h-5 rounded-full transition ${ad.applyToAll ? "bg-blue-500" : "bg-gray-600"}`}>
                          <input
                            type="checkbox"
                            className="sr-only"
                            checked={ad.applyToAll}
                            onChange={(e) => updateAd(ad.id, "applyToAll", e.target.checked)}
                          />
                          <div className={`absolute top-0.5 left-0.5 w-4 h-4 bg-white rounded-full shadow transition-transform ${ad.applyToAll ? "translate-x-3" : ""}`} />
                        </div>
                        <span className="text-xs text-gray-300">Auto-apply to all posts</span>
                      </label>

                      <button
                        onClick={() => handleDelete(ad.id)}
                        className="ml-auto text-xs text-red-400 hover:text-red-300 transition"
                      >
                        Remove Placement
                      </button>
                    </div>
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>

        {/* Adsterra Guide */}
        <div className="mt-8 bg-[#1a1a2e] rounded-2xl p-6 border border-white/5">
          <h2 className="text-white font-semibold mb-4">📖 Adsterra Integration Guide</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 text-sm">
            {[
              {
                step: "1",
                title: "Get Your Ad Code",
                desc: "Log in to your Adsterra publisher dashboard. Create a new ad unit and copy the generated JavaScript code.",
              },
              {
                step: "2",
                title: "Choose Placement",
                desc: "Select the right placement (header, in-post, sidebar, footer) and paste the code in the editor above.",
              },
              {
                step: "3",
                title: "One-Click Update",
                desc: 'Toggle it active and click "Save & Apply to All Posts". Every article on your site will show the ad immediately.',
              },
              {
                step: "4",
                title: "New Posts Automatic",
                desc: "Every new post you publish automatically loads the current active ad codes — zero extra work needed.",
              },
            ].map((item) => (
              <div key={item.step} className="flex gap-3">
                <div className="w-7 h-7 rounded-full bg-red-600 text-white flex items-center justify-center text-xs font-bold flex-shrink-0">
                  {item.step}
                </div>
                <div>
                  <p className="text-white font-medium">{item.title}</p>
                  <p className="text-gray-400 text-xs mt-1">{item.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </main>
  );
}
