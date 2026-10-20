import { Link } from 'react-router-dom';
import { Facebook, Twitter, Linkedin, Instagram, Mail, Send, Youtube, Rss, Globe, Shield, Award } from 'lucide-react';
import { cn } from '@/utils';
import { Button, Input } from '@/components/ui';
import { categories } from '@/data/categories';
import { useToast } from '@/components/ui/Toast';

const footerSections = [
  {
    title: 'Telusuri Berita',
    links: [
      { label: 'Nasional', href: '/category/hot' },
      { label: 'Ekonomi & Bisnis', href: '/category/finance' },
      { label: 'Teknologi & AI', href: '/category/science' },
      { label: 'Olahraga', href: '/category/sport' },
      { label: 'Gaya Hidup', href: '/category/lifestyle' },
      { label: 'Internasional', href: '/category/global' },
      { label: 'Hiburan & K-Pop', href: '/category/hype' },
      { label: 'Kesehatan', href: '/category/health' },
      { label: 'Kuliner', href: '/category/food' },
      { label: 'Travel & Wisata', href: '/category/travel' },
      { label: 'Otomotif', href: '/category/oto' },
    ],
  },
  {
    title: 'Tentang Kami',
    links: [
      { label: 'Visi & Misi', href: '/about#mission' },
      { label: 'Tim Redaksi', href: '/about#team' },
      { label: 'Kepemimpinan', href: '/about#leadership' },
      { label: 'Sejarah & Milestone', href: '/about#milestones' },
      { label: 'Kebijakan Editorial', href: '/editorial-policy' },
      { label: 'Pedoman Media Siber', href: '/guidelines' },
      { label: 'Kode Etik Jurnalistik', href: '/ethics' },
    ],
  },
  {
    title: 'Layanan & Produk',
    links: [
      { label: 'Aplikasi Mobile', href: '/app' },
      { label: 'Newsletter Harian', href: '/newsletter' },
      { label: 'RSS Feed', href: '/rss' },
      { label: 'Widget Website', href: '/widgets' },
      { label: 'API Developer', href: '/api-docs' },
      { label: 'Iklan & Kerjasama', href: '/advertise' },
      { label: 'Karir & Magang', href: '/careers' },
    ],
  },
  {
    title: 'Bantuan & Dukungan',
    links: [
      { label: 'Hubungi Redaksi', href: '/contact' },
      { label: 'Kirim Tip Berita', href: '/contact?subject=tip' },
      { label: 'Request Koreksi', href: '/contact?subject=koreksi' },
      { label: 'FAQ', href: '/faq' },
      { label: 'Pusat Bantuan', href: '/help' },
      { label: 'Laporan Konten', href: '/report' },
    ],
  },
];

const socialLinks = [
  { name: 'Facebook', icon: Facebook, href: 'https://facebook.com/brikingnyus', color: 'hover:text-blue-600 dark:hover:text-blue-400', bg: 'bg-blue-600' },
  { name: 'Twitter/X', icon: Twitter, href: 'https://twitter.com/brikingnyus', color: 'hover:text-sky-500 dark:hover:text-sky-400', bg: 'bg-sky-500' },
  { name: 'Instagram', icon: Instagram, href: 'https://instagram.com/brikingnyus', color: 'hover:text-pink-600 dark:hover:text-pink-400', bg: 'bg-pink-600' },
  { name: 'YouTube', icon: Youtube, href: 'https://youtube.com/@brikingnyus', color: 'hover:text-red-600 dark:hover:text-red-400', bg: 'bg-red-600' },
  { name: 'LinkedIn', icon: Linkedin, href: 'https://linkedin.com/company/brikingnyus', color: 'hover:text-blue-700 dark:hover:text-blue-400', bg: 'bg-blue-700' },
  { name: 'RSS', icon: Rss, href: '/rss', color: 'hover:text-orange-600 dark:hover:text-orange-400', bg: 'bg-orange-600' },
];

const trustBadges = [
  { icon: Shield, label: 'Terpercaya', desc: 'Standar jurnalisme profesional' },
  { icon: Award, label: 'Berpenghargaan', desc: 'PWI Best Digital News 2025' },
  { icon: Globe, label: 'Jangkauan Nasional', desc: '500+ kota di Indonesia' },
];

export function Footer() {
  const { addToast } = useToast();
  const [email, setEmail] = useState('');
  const [subscribeStatus, setSubscribeStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !email.includes('@')) {
      addToast({ type: 'error', title: 'Email tidak valid', message: 'Masukkan alamat email yang benar' });
      return;
    }
    setSubscribeStatus('loading');
    // Simulate API call
    setTimeout(() => {
      setSubscribeStatus('success');
      setEmail('');
      addToast({ type: 'success', title: 'Berlangganan berhasil!', message: 'Terima kasih telah berlangganan newsletter kami' });
      setTimeout(() => setSubscribeStatus('idle'), 3000);
    }, 1000);
  };

  return (
    <footer className="bg-gray-50 dark:bg-gray-950 border-t border-gray-100 dark:border-gray-800" role="contentinfo">
      <div className="container-custom py-12 lg:py-16">
        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-6">
          {/* Brand */}
          <div className="lg:col-span-2 xl:col-span-2">
            <Link to="/" className="flex items-center gap-2 mb-4" aria-label="Briking Nyus - Home">
              <div className="relative">
                <img src="/images/logo.gif" alt="" width="40" height="40" className="h-10 w-10 object-contain" aria-hidden="true" />
                <span className="absolute -bottom-1 -right-1 h-3 w-3 rounded-full bg-accent" aria-hidden="true" />
              </div>
              <span className="font-display font-bold text-xl sm:text-2xl text-primary dark:text-white">
                Briking<span className="text-accent">Nyus</span>
              </span>
            </Link>
            <p className="text-sm text-gray-600 dark:text-gray-400 mb-6 leading-relaxed max-w-xs">
              Portal berita digital independen Indonesia. Menyajikan berita akurat, cepat, dan bermakna untuk memberdayakan masyarakat melalui informasi berkualitas.
            </p>
            
            {/* Trust Badges */}
            <div className="flex flex-wrap gap-4 mb-6">
              {trustBadges.map((badge, index) => (
                <div key={index} className="flex items-center gap-2 text-xs text-gray-500 dark:text-gray-400">
                  <span className="p-1.5 rounded bg-accent/10 text-accent">
                    <badge.icon className="h-3.5 w-3.5" aria-hidden="true" />
                  </span>
                  <div>
                    <div className="font-medium text-primary dark:text-white">{badge.label}</div>
                    <div>{badge.desc}</div>
                  </div>
                </div>
              ))}
            </div>

            {/* Social Links */}
            <div className="flex gap-3">
              {socialLinks.map((social) => (
                <a
                  key={social.name}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={cn('p-2 rounded-lg text-gray-500 transition-all duration-200', social.color, 'hover:bg-white dark:hover:bg-gray-800')}
                  aria-label={social.name}
                >
                  <social.icon className="h-5 w-5" aria-hidden="true" />
                </a>
              ))}
            </div>
          </div>

          {/* Sections */}
          {footerSections.map((section) => (
            <nav key={section.title} aria-label={section.title}>
              <h3 className="font-heading font-semibold text-primary dark:text-white mb-4">{section.title}</h3>
              <ul className="space-y-2.5" role="list">
                {section.links.map((link) => (
                  <li key={link.label}>
                    <Link
                      to={link.href}
                      className="text-sm text-gray-600 dark:text-gray-400 hover:text-accent transition-colors flex items-center gap-1 group"
                    >
                      {link.label}
                      <ArrowRight className="h-3.5 w-3.5 opacity-0 group-hover:opacity-100 transition-opacity" aria-hidden="true" />
                    </Link>
                  </li>
                ))}
              </ul>
            </nav>
          ))}

          {/* Newsletter */}
          <div>
            <h3 className="font-heading font-semibold text-primary dark:text-white mb-2">Newsletter Harian</h3>
            <p className="text-sm text-gray-600 dark:text-gray-400 mb-4">
              Dapatkan berita terpilih langsung ke email Anda setiap pagi. Gratis, tanpa spam.
            </p>
            <form onSubmit={handleSubscribe} className="space-y-2">
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" aria-hidden="true" />
                <input
                  type="email"
                  name="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Email Anda"
                  className="input pl-10"
                  aria-label="Email address for newsletter"
                  required
                  disabled={subscribeStatus === 'loading' || subscribeStatus === 'success'}
                />
              </div>
              <Button type="submit" className="w-full" loading={subscribeStatus === 'loading'} leftIcon={subscribeStatus === 'success' ? <CheckCircle className="h-4 w-4" /> : <Send className="h-4 w-4" />}>
                {subscribeStatus === 'success' ? 'Terdaftar!' : 'Berlangganan'}
              </Button>
            </form>
            <p className="mt-2 text-xs text-gray-500 dark:text-gray-500">
              Dengan berlangganan, Anda menyetujui
              <Link to="/privacy" className="underline hover:text-accent">Kebijakan Privasi</Link>
              dan <Link to="/terms" className="underline hover:text-accent ml-1">Syarat & Ketentuan</Link>.
            </p>
            
            {/* App Store Badges */}
            <div className="mt-6 flex gap-3">
              <a href="/app" className="px-3 py-2 bg-gray-900 dark:bg-white text-white dark:text-gray-900 rounded-lg text-xs font-medium hover:opacity-80 transition-opacity flex items-center gap-1">
                <svg className="h-4 w-4" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true"><path d="M18 2H6c-1.1 0-2 .9-2 2v16c0 1.1.9 2 2 2h12c1.1 0 2-.9 2-2V4c0-1.1-.9-2-2-2zm0 18H6V4h12v16z"/></svg>
                App Store
              </a>
              <a href="/app" className="px-3 py-2 bg-gray-900 dark:bg-white text-white dark:text-gray-900 rounded-lg text-xs font-medium hover:opacity-80 transition-opacity flex items-center gap-1">
                <svg className="h-4 w-4" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true"><path d="M18 2H6c-1.1 0-2 .9-2 2v16c0 1.1.9 2 2 2h12c1.1 0 2-.9 2-2V4c0-1.1-.9-2-2-2zm0 18H6V4h12v16z"/></svg>
                Google Play
              </a>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="mt-12 pt-8 border-t border-gray-100 dark:border-gray-800">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4 text-sm text-gray-500 dark:text-gray-400">
              <p>&copy; {new Date().getFullYear()} Briking Nyus. Hak Cipta Dilindungi.</p>
              <div className="flex flex-wrap items-center justify-center gap-4">
                <Link to="/privacy" className="hover:text-accent transition-colors">Kebijakan Privasi</Link>
                <span aria-hidden="true">·</span>
                <Link to="/terms" className="hover:text-accent transition-colors">Syarat & Ketentuan</Link>
                <span aria-hidden="true">·</span>
                <Link to="/cookies" className="hover:text-accent transition-colors">Kebijakan Cookie</Link>
                <span aria-hidden="true">·</span>
                <a href="https://www.pwi.or.id/" target="_blank" rel="noopener noreferrer" className="hover:text-accent transition-colors">Anggota PWI</a>
              </div>
            </div>
            <div className="flex items-center gap-2 text-xs text-gray-500 dark:text-gray-400">
              <span>Dibangun dengan</span>
              <span className="text-red-500" aria-hidden="true">❤</span>
              <span>di Indonesia 🇮🇩</span>
              <span aria-hidden="true">·</span>
              <span>Powered by React + TypeScript + Tailwind</span>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}