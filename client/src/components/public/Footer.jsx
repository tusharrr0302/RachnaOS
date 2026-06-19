import { Link } from 'react-router-dom'

const FOOTER_LINKS = {
  Pages: [
    { label: 'Dashboard', href: '/creator' },
    { label: 'AudienceLab', href: '/creator/audience-lab' },
    { label: 'Marketplace', href: '/creator/marketplace' },
    { label: 'Expert Connect', href: '/creator/expert-connect' },
  ],
  Company: [
    { label: 'About', href: '#about' },
    { label: 'Blog', href: '#' },
    { label: 'Careers', href: '#' },
    { label: 'Mission', href: '#' },
  ],
  Resources: [
    { label: 'Creator Academy', href: '/creator/academy' },
    { label: 'API Docs', href: '#' },
    { label: 'Help Center', href: '#' },
  ],
}

export default function Footer() {
  return (
    <footer className="bg-rachna-dark text-white">
      <div className="max-w-7xl mx-auto px-6 py-16">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-10">
          {/* Brand */}
          <div>
            <div className="mb-4">
              <img src="/logo.png" alt="RachnaOS Logo" className="h-20 w-auto object-contain" />
            </div>
            <p className="text-sm text-white/50 leading-relaxed max-w-48">
              The unified creator operating system. Stop guessing. Start building.
            </p>
            <div className="flex items-center gap-3 mt-6">
              {[['𝕏', 'Twitter'], ['▶', 'YouTube'], ['📷', 'Instagram']].map(([icon, label]) => (
                <a
                  key={label}
                  href="#"
                  aria-label={label}
                  className="w-9 h-9 rounded-xl bg-white/10 flex items-center justify-center hover:bg-rachna-indigo transition-colors text-sm font-bold"
                >
                  {icon}
                </a>
              ))}
            </div>
          </div>

          {/* Links */}
          {Object.entries(FOOTER_LINKS).map(([section, links]) => (
            <div key={section}>
              <p className="text-xs font-display font-semibold text-white/40 uppercase tracking-wider mb-4">{section}</p>
              <ul className="space-y-3">
                {links.map(({ label, href }) => (
                  <li key={label}>
                    <a href={href} className="text-sm text-white/60 hover:text-white transition-colors">
                      {label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="mt-12 pt-8 border-t border-white/10 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-sm text-white/40">© 2025 RachnaOS. All rights reserved.</p>
          <div className="flex items-center gap-6">
            {['Privacy Policy', 'Terms of Service', 'Cookie Policy'].map(item => (
              <a key={item} href="#" className="text-xs text-white/40 hover:text-white/70 transition-colors">{item}</a>
            ))}
          </div>
        </div>
      </div>
    </footer>
  )
}
