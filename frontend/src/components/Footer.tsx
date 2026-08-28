import Link from "next/link";

export default function Footer() {
  return (
    <footer className="bg-[#1a1a2e] text-gray-400 mt-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-12">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Brand */}
          <div>
            <div className="flex items-center gap-2 mb-4">
              <span className="text-2xl">🍁</span>
              <span className="text-white font-bold text-lg">Canada Easy Guide</span>
            </div>
            <p className="text-sm leading-relaxed">
              Your trusted resource for Canadian immigration, permanent residency, study, and settlement guides.
            </p>
            <div className="flex gap-3 mt-4">
              <a href="#" className="text-gray-400 hover:text-white transition" aria-label="Facebook">
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M18.77 7.46H14.5v-1.9c0-.9.6-1.1 1-1.1h3V.5h-4.33C10.24.5 9.5 3.44 9.5 5.32v2.15h-3v4h3v12h5v-12h3.85l.42-4z"/></svg>
              </a>
              <a href="#" className="text-gray-400 hover:text-white transition" aria-label="Twitter">
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M23.95 4.57a10 10 0 01-2.82.77 4.96 4.96 0 002.16-2.72c-.951.555-2.005.959-3.127 1.184a4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.212.085 4.936 4.936 0 004.604 3.417 9.867 9.867 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.053 0 13.998-7.496 13.998-13.985 0-.21 0-.42-.015-.63A9.935 9.935 0 0024 4.59z"/></svg>
              </a>
              <a href="#" className="text-gray-400 hover:text-white transition" aria-label="YouTube">
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M23.495 6.205a3.007 3.007 0 00-2.088-2.088c-1.87-.501-9.396-.501-9.396-.501s-7.507-.01-9.396.501A3.007 3.007 0 00.527 6.205a31.247 31.247 0 00-.522 5.805 31.247 31.247 0 00.522 5.783 3.007 3.007 0 002.088 2.088c1.868.502 9.396.502 9.396.502s7.506 0 9.396-.502a3.007 3.007 0 002.088-2.088 31.247 31.247 0 00.5-5.783 31.247 31.247 0 00-.5-5.805zM9.609 15.601V8.408l6.264 3.602z"/></svg>
              </a>
            </div>
          </div>

          {/* Immigration */}
          <div>
            <h3 className="text-white font-semibold mb-4">Immigration</h3>
            <ul className="space-y-2 text-sm">
              <li><Link href="/category/express-entry" className="hover:text-white transition">Express Entry</Link></li>
              <li><Link href="/category/provincial-nominee" className="hover:text-white transition">Provincial Nominee (PNP)</Link></li>
              <li><Link href="/category/family-sponsorship" className="hover:text-white transition">Family Sponsorship</Link></li>
              <li><Link href="/category/citizenship" className="hover:text-white transition">Citizenship</Link></li>
            </ul>
          </div>

          {/* Newcomers */}
          <div>
            <h3 className="text-white font-semibold mb-4">Newcomers</h3>
            <ul className="space-y-2 text-sm">
              <li><Link href="/category/study-canada" className="hover:text-white transition">Study in Canada</Link></li>
              <li><Link href="/category/work-permits" className="hover:text-white transition">Work Permits</Link></li>
              <li><Link href="/category/cost-of-living" className="hover:text-white transition">Cost of Living</Link></li>
              <li><Link href="/category/settlement-tips" className="hover:text-white transition">Settlement Tips</Link></li>
            </ul>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-white font-semibold mb-4">Quick Links</h3>
            <ul className="space-y-2 text-sm">
              <li><Link href="/blog" className="hover:text-white transition">All Articles</Link></li>
              <li><Link href="/search" className="hover:text-white transition">Search</Link></li>
              <li><a href="https://www.canada.ca/en/immigration-refugees-citizenship.html" target="_blank" rel="noopener" className="hover:text-white transition">IRCC Official Site ↗</a></li>
              <li><Link href="/admin" className="hover:text-white transition">Admin Panel</Link></li>
            </ul>
          </div>
        </div>

        <div className="border-t border-white/10 mt-10 pt-6 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-sm">© {new Date().getFullYear()} Canada Easy Guide. All rights reserved.</p>
          <p className="text-xs text-gray-500">
            This site is for informational purposes only. Always consult an authorized immigration consultant or lawyer.
          </p>
        </div>
      </div>
    </footer>
  );
}
