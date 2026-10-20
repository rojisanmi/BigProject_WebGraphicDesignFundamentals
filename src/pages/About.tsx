import { Link } from 'react-router-dom';
import { Target, Shield, Users, Globe, Award, Zap, Heart, BookOpen, Clock, TrendingUp, Rocket, Lightbulb, Layers, BarChart3, Star, Menu } from 'lucide-react';
import { cn } from '@/utils';
import { Button, Badge, Card, CardContent } from '@/components/ui';
import { Container, Section } from '@/components/layout/PageLayout';

const missionItems = [
  { icon: Target, title: 'Akurasi', description: 'Menyajikan berita yang terverifikasi, akurat, dan berbasis fakta.', color: 'text-blue-600', bgColor: 'bg-blue-600' },
  { icon: Shield, title: 'Kredibilitas', description: 'Menjaga integritas jurnalistik dan standar etika profesi.', color: 'text-green-600', bgColor: 'bg-green-600' },
  { icon: Users, title: 'Kepentingan Publik', description: 'Memprioritaskan kebutuhan informasi masyarakat.', color: 'text-purple-600', bgColor: 'bg-purple-600' },
  { icon: Globe, title: 'Cakupan Luas', description: 'Menjangkau audiens di seluruh Indonesia dan diaspora.', color: 'text-orange-600', bgColor: 'bg-orange-600' },
  { icon: Award, title: 'Inovasi', description: 'Mengadopsi teknologi terbaru untuk pengalaman pengguna terbaik.', color: 'text-pink-600', bgColor: 'bg-pink-600' },
  { icon: Zap, title: 'Kecepatan', description: 'Mengirim berita breaking news secara real-time.', color: 'text-red-600', bgColor: 'bg-red-600' },
];

const values = [
  { icon: Heart, title: 'Empati', description: 'Memahami perspektif pembaca dan subjek berita.' },
  { icon: BookOpen, title: 'Transparansi', description: 'Terbuka mengenai sumber, metodologi, dan koreksi.' },
  { icon: Shield, title: 'Keberanian', description: 'Berani mengungkap kebenaran meski sulit.' },
  { icon: TrendingUp, title: 'Kemajuan', description: 'Terus belajar dan beradaptasi dengan perubahan era.' },
];

const team = [
  { name: 'Bambang Sutrisno', role: 'Ketua Redaksi', bio: '20+ tahun pengalaman di jurnalistik investigasi. Bekas wartawan senior Kompas & Tempo.', avatar: 'BS', color: 'bg-blue-600' },
  { name: 'Siti Nurhaliza', role: 'Wakil Ketua Redaksi', bio: 'Ahli jurnalistik data dan fact-checking. Sertifikasi Google News Initiative.', avatar: 'SN', color: 'bg-green-600' },
  { name: 'Ahmad Fauzi', role: 'Editor Olahraga', bio: 'Bekas wartawan sepak bola internasional. Liput Piala Dunia 2018 & 2022.', avatar: 'AF', color: 'bg-orange-600' },
  { name: 'Dewi Sartika', role: 'Editor Gaya Hidup', bio: 'Pakar tren budaya dan digital lifestyle. Kontributor majas fashion internasional.', avatar: 'DS', color: 'bg-pink-600' },
  { name: 'Rudi Hartono', role: 'Editor Teknologi', bio: 'Background ilmu komputer dan startup. Ahli AI, blockchain, dan cybersecurity.', avatar: 'RH', color: 'bg-purple-600' },
  { name: 'Maya Indah', role: 'Editor Internasional', bio: 'Koresponden luar negeri berpengalaman. Liput ASEAN, APEC, dan G20.', avatar: 'MI', color: 'bg-teal-600' },
];

const milestones = [
  { year: '2021', title: 'Luncurkan Briking Nyus', description: 'Memulai perjalanan sebagai portal berita digital independen dengan tim 10 orang.', icon: Rocket, color: 'text-blue-600' },
  { year: '2022', title: '1 Juta Pengunjung Bulanan', description: 'Mencapai milestone pembaca pertama dan menjadi top 10 portal berita Indonesia.', icon: Users, color: 'text-green-600' },
  { year: '2023', title: 'Luncurkan Aplikasi Mobile', description: 'Aplikasi iOS & Android dengan fitur offline, notifikasi, dan personalisasi feed.', icon: Layers, color: 'text-purple-600' },
  { year: '2024', title: 'Tim Redaksi 50+ Orang', description: 'Memperluas tim jurnalis profesional di seluruh Indonesia + koran internasional.', icon: Users, color: 'text-orange-600' },
  { year: '2025', title: 'Penghargaan PWI & AI Innovation', description: 'Menerima penghargaan jurnalistik terbaik kategori digital & inovasi AI Bahasa Nusantara.', icon: Award, color: 'text-pink-600' },
];

const stats = [
  { label: 'Pembaca Bulanan', value: '2.5M+', icon: Users, color: 'text-blue-600' },
  { label: 'Artikel Per Bulan', value: '500+', icon: Layers, color: 'text-green-600' },
  { label: 'Jurnalis Profesional', value: '50+', icon: Shield, color: 'text-purple-600' },
  { label: 'Kategori Berita', value: '12', icon: BarChart3, color: 'text-orange-600' },
  { label: 'Bahasa Daerah Didukung', value: '700+', icon: Globe, color: 'text-pink-600' },
  { label: 'Penghargaan', value: '8', icon: Star, color: 'text-yellow-600' },
];

const leadership = [
  { name: 'Bambang Sutrisno', position: 'Ketua Redaksi / Founder', period: '2021 - Sekarang', bio: 'Pendiri Briking Nyus dengan visi jurnalisme independen berbasis data. Bekas Editor Utama Tempo.' },
  { name: 'Siti Nurhaliza', position: 'Wakil Ketua Redaksi', period: '2022 - Sekarang', bio: 'Memimpin tim fact-checking dan jurnalisme data. Advokat media literacy.' },
  { name: 'Dr. Ahmad Riyadi', position: 'Direktur Teknologi (CTO)', period: '2023 - Sekarang', bio: 'PhD Computer Science, MIT. Memimpin pengembangan AI Bahasa Nusantara dan platform digital.' },
];

export function AboutPage() {
  return (
    <div className="min-h-screen">
      {/* Hero */}
      <section className="relative min-h-[550px] flex items-center overflow-hidden bg-gradient-to-br from-primary via-primary/90 to-primary-light">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-accent/10 via-transparent to-transparent" />
        <Container className="relative z-10 py-16">
          <div className="max-w-4xl mx-auto text-center">
            <Badge variant="outline" className="mb-4 text-white border-white/30" style={{ backgroundColor: 'rgba(255,255,255,0.1)' }}>
              Tentang Kami
            </Badge>
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-display font-bold text-white mb-6 text-balance">
              Briking Nyus: Berita <span className="text-accent">Terkini</span>, Terpercaya, Bermakna
            </h1>
            <p className="text-xl text-white/90 mb-8 max-w-2xl mx-auto leading-relaxed">
              Portal berita digital independen yang mengutamakan akurasi, kecepatan, dan kedalaman dalam setiap liputan. 
              Kami hadir untuk memberdayakan masyarakat dengan informasi berkualitas.
            </p>
            <div className="flex flex-wrap items-center justify-center gap-4">
              <Button size="lg" leftIcon={<BookOpen className="h-5 w-5" />}>Baca Visi & Misi</Button>
              <Button variant="outline" size="lg" className="bg-transparent border-white/30 text-white hover:bg-white/10" leftIcon={<Users className="h-5 w-5" />}>
                Kenal Tim Kami
              </Button>
            </div>
          </div>
        </Container>
      </section>

      {/* Stats */}
      <Section className="bg-gray-50 dark:bg-gray-950" aria-labelledby="stats-heading">
        <Container>
          <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6">
            {stats.map((stat, index) => (
              <div key={index} className="text-center group">
                <div className="mx-auto mb-3 p-3 rounded-xl bg-white dark:bg-gray-800 shadow-sm group-hover:shadow-md transition-shadow">
                  <stat.icon className={cn('h-7 w-7 mx-auto', stat.color)} aria-hidden="true" />
                </div>
                <div className="text-3xl sm:text-4xl font-display font-bold text-primary dark:text-white mb-1">
                  {stat.value}
                </div>
                <div className="text-gray-600 dark:text-gray-400 text-sm font-medium">{stat.label}</div>
              </div>
            ))}
          </div>
        </Container>
      </Section>

      {/* Mission */}
      <Section aria-labelledby="mission-heading">
        <Container>
          <div className="max-w-3xl mx-auto text-center mb-12">
            <h2 id="mission-heading" className="heading-2 mb-4">Visi & Misi Kami</h2>
            <p className="text-gray-600 dark:text-gray-400 text-lg">
              Komitmen kami untuk menyajikan berita berkualitas tinggi yang memberdayakan masyarakat.
            </p>
          </div>

          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {missionItems.map((item, index) => (
              <Card key={index} hover className="h-full border-2 border-transparent hover:border-accent/50 transition-all duration-300">
                <CardContent className="pt-6">
                  <div className="mx-auto mb-4 p-4 rounded-xl w-16 h-16 flex items-center justify-center" style={{ backgroundColor: item.color.replace('text-', 'bg-') + '/10' }}>
                    <item.icon className="h-8 w-8" style={{ color: item.color.replace('text-', '') }} aria-hidden="true" />
                  </div>
                  <h3 className="font-heading font-semibold text-primary dark:text-white mb-2 text-center">{item.title}</h3>
                  <p className="text-gray-600 dark:text-gray-400 text-center">{item.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </Container>
      </Section>

      {/* Values */}
      <Section className="bg-gray-50 dark:bg-gray-950" aria-labelledby="values-heading">
        <Container>
          <div className="max-w-3xl mx-auto text-center mb-12">
            <h2 id="values-heading" className="heading-2 mb-4">Nilai-Nilai Kami</h2>
            <p className="text-gray-600 dark:text-gray-400 text-lg">Pedasar setiap keputusan dan tindakan kami sehari-hari.</p>
          </div>

          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
            {values.map((value, index) => (
              <Card key={index} className="text-center border-2 border-transparent hover:border-accent/50 transition-colors">
                <CardContent className="pt-6">
                  <div className="mx-auto mb-4 p-3 rounded-xl bg-accent/10 w-14 h-14 flex items-center justify-center">
                    <value.icon className="h-7 w-7 text-accent" aria-hidden="true" />
                  </div>
                  <h3 className="font-heading font-semibold text-primary dark:text-white mb-2">{value.title}</h3>
                  <p className="text-gray-600 dark:text-gray-400">{value.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </Container>
      </Section>

      {/* Leadership */}
      <Section aria-labelledby="leadership-heading">
        <Container>
          <div className="max-w-3xl mx-auto text-center mb-12">
            <h2 id="leadership-heading" className="heading-2 mb-4">Kepemimpinan</h2>
            <p className="text-gray-600 dark:text-gray-400 text-lg">Tim kepemimpinan yang memimpin Briking Nyus menuju masa depan.</p>
          </div>

          <div className="grid gap-6 md:grid-cols-3">
            {leadership.map((leader, index) => (
              <Card key={index} className="text-center h-full">
                <CardContent className="pt-6">
                  <div className="mx-auto mb-4 w-24 h-24 rounded-full bg-accent/20 flex items-center justify-center text-accent font-bold text-3xl">
                    {leader.name.split(' ').map(n => n[0]).join('')}
                  </div>
                  <h3 className="font-heading font-semibold text-primary dark:text-white">{leader.name}</h3>
                  <p className="text-accent text-sm font-medium mb-1">{leader.position}</p>
                  <p className="text-gray-500 dark:text-gray-400 text-xs mb-3">{leader.period}</p>
                  <p className="text-gray-600 dark:text-gray-400 text-sm">{leader.bio}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </Container>
      </Section>

      {/* Team */}
      <Section aria-labelledby="team-heading">
        <Container>
          <div className="max-w-3xl mx-auto text-center mb-12">
            <h2 id="team-heading" className="heading-2 mb-4">Tim Redaksi</h2>
            <p className="text-gray-600 dark:text-gray-400 text-lg">Profesional berpengalaman yang berdedikasi untuk jurnalisme berkualitas.</p>
          </div>

          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6">
            {team.map((member, index) => (
              <Card key={index} className="text-center group">
                <CardContent className="pt-6">
                  <div className="mx-auto mb-4 w-20 h-20 rounded-full flex items-center justify-center text-white font-bold text-2xl group-hover:scale-110 transition-transform" style={{ backgroundColor: member.color }}>
                    {member.avatar}
                  </div>
                  <h3 className="font-heading font-semibold text-primary dark:text-white">{member.name}</h3>
                  <p className="text-accent text-sm font-medium mb-2">{member.role}</p>
                  <p className="text-gray-600 dark:text-gray-400 text-sm">{member.bio}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </Container>
      </Section>

      {/* Milestones */}
      <Section className="bg-gray-50 dark:bg-gray-950" aria-labelledby="milestones-heading">
        <Container>
          <div className="max-w-3xl mx-auto text-center mb-12">
            <h2 id="milestones-heading" className="heading-2 mb-4">Perjalanan Kami</h2>
            <p className="text-gray-600 dark:text-gray-400 text-lg">Milestone penting dalam sejarah Briking Nyus.</p>
          </div>

          <div className="relative max-w-2xl mx-auto">
            <div className="absolute left-1/2 top-0 bottom-0 w-0.5 bg-gradient-to-b from-accent to-accent/20 -translate-x-1/2" aria-hidden="true" />
            <div className="space-y-10 relative">
              {milestones.map((milestone, index) => (
                <div key={index} className="relative flex items-start gap-6">
                  <div className="flex-shrink-0 w-14 h-14 rounded-full bg-white dark:bg-gray-900 border-4 border-accent flex items-center justify-center text-accent font-bold text-sm z-10 shadow-lg">
                    {index + 1}
                  </div>
                  <div className={cn('flex-1 pt-2', index % 2 === 0 ? 'text-right pr-8' : 'pl-8')}>
                    <Badge variant="outline" className="mb-2" style={{ borderColor: 'var(--color-accent)', color: 'var(--color-accent)' }}>
                      {milestone.year}
                    </Badge>
                    <div className="flex items-center gap-2 mb-1">
                      <milestone.icon className={cn('h-5 w-5', milestone.color)} aria-hidden="true" />
                      <h3 className="font-heading font-semibold text-primary dark:text-white">{milestone.title}</h3>
                    </div>
                    <p className="text-gray-600 dark:text-gray-400">{milestone.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </Container>
      </Section>

      {/* CTA */}
      <Section className="bg-primary relative overflow-hidden" aria-label="Join us">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-accent/20 via-transparent to-transparent" />
        <Container className="relative z-10 py-16">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-3xl sm:text-4xl font-display font-bold text-white mb-4">Bergabung Bersama Kami</h2>
            <p className="text-white/80 mb-8 text-lg">
              Apakah Anda punya passion di jurnalisme, teknologi, atau desain? Kami selalu mencari talenta baru untuk berkarya bersama.
            </p>
            <div className="flex flex-wrap items-center justify-center gap-4">
              <Button size="lg" variant="secondary" leftIcon={<BookOpen className="h-5 w-5" />}>Lihat Lowongan Karir</Button>
              <Button size="lg" variant="outline" className="bg-transparent border-white/30 text-white hover:bg-white/10" leftIcon={<Mail className="h-5 w-5" />}>Kirim Lamaran Spontan</Button>
            </div>
            <div className="mt-8 flex items-center justify-center gap-8 text-white/60 text-sm">
              <div className="flex items-center gap-2"><Lightbulb className="h-4 w-4" /> Inovasi Terus</div>
              <div className="flex items-center gap-2"><Rocket className="h-4 w-4" /> Tumbuh Cepat</div>
              <div className="flex items-center gap-2"><Users className="h-4 w-4" /> Tim Solid</div>
            </div>
          </div>
        </Container>
      </Section>
    </div>
  );
}