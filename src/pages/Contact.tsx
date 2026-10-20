import { Mail, MapPin, Phone, Clock, Send, MessageSquare, Headphones, Shield, CheckCircle, AlertCircle, Loader2 } from 'lucide-react';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { cn } from '@/utils';
import { Button, Input, Textarea, Card, CardContent, Badge } from '@/components/ui';
import { Container, Section } from '@/components/layout/PageLayout';

const contactInfo = [
  { icon: Mail, title: 'Email Redaksi', value: 'redaksi@brikingnyus.com', href: 'mailto:redaksi@brikingnyus.com', description: 'Balasan dalam 1x24 jam', color: 'text-blue-600' },
  { icon: Mail, title: 'Tip Berita', value: 'tip@brikingnyus.com', href: 'mailto:tip@brikingnyus.com', description: 'Kirim liputan & saksi mata', color: 'text-green-600' },
  { icon: Mail, title: 'Iklan & Kerjasama', value: 'ads@brikingnyus.com', href: 'mailto:ads@brikingnyus.com', description: 'Media kit & proposal', color: 'text-purple-600' },
  { icon: MapPin, title: 'Kantor Pusat', value: 'Jl. Jend. Sudirman Kav. 123, Jakarta Pusat 10220', href: 'https://maps.google.com/?q=Jl.+Jend.+Sudirman+Kav.+123+Jakarta', description: 'Senin-Jumat, 09:00-18:00 WIB', color: 'text-orange-600' },
  { icon: Phone, title: 'Telepon', value: '+62 21 1234 5678', href: 'tel:+622112345678', description: 'Senin-Jumat, 09:00-17:00 WIB', color: 'text-red-600' },
  { icon: Clock, title: 'Jam Operasional', value: 'Senin - Jumat: 09:00 - 18:00 WIB', description: 'Sabtu - Minggu & Libur Nasional: Tutup', color: 'text-gray-600' },
];

const faqs = [
  { q: 'Bagaimana cara mengirimkan tip berita?', a: 'Anda dapat mengirimkan tip berita melalui formulir kontak di atas dengan memilih subjek "Tip Berita" atau mengirim email langsung ke tip@brikingnyus.com. Sertakan bukti foto/video dan lokasi kejadian jika memungkinkan.' },
  { q: 'Apakah Briking Nyus menerima iklan?', a: 'Ya, kami menerima iklan. Silakan hubungi tim sales kami di advertising@brikingnyus.com untuk media kit, harga, dan format iklan yang tersedia (banner, native, video, sponsored content).' },
  { q: 'Bagaimana cara meminta koreksi artikel?', a: 'Jika Anda menemukan kesalahan pada artikel, silakan kirim email ke koreksi@brikingnyus.com dengan menyertakan URL artikel dan penjelasan koreksi yang diperlukan. Tim editor akan meninjau dalam 24 jam.' },
  { q: 'Apakah konten Briking Nyus bisa digunakan ulang?', a: 'Konten kami dilindungi hak cipta. Untuk penggunaan ulang (kutipan, republika, terjemahan), silakan hubungi permissions@brikingnyus.com untuk lisensi. Kutipan singkat dengan atribusi diperbolehkan.' },
  { q: 'Bagaimana cara berlangganan newsletter?', a: 'Anda dapat berlangganan newsletter melalui formulir di footer halaman atau halaman /newsletter. Gratis, tanpa spam, dan bisa dibatalkan kapan saja via link unsubscribe di email.' },
  { q: 'Apakah Briking Nyus punya aplikasi mobile?', a: 'Ya, aplikasi Briking Nyus tersedia di App Store (iOS) dan Play Store (Android). Fitur: notifikasi breaking news, baca offline, bookmark, mode gelap, dan personalisasi feed.' },
];

export function ContactPage() {
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'submitting' | 'success' | 'error'>('idle');
  const [errorMessage, setErrorMessage] = useState('');

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

  const onSubmit = async (data: any) => {
    setSubmitStatus('submitting');
    setErrorMessage('');
    
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1500));
    
    // Simulate success (in real app, call actual API)
    setSubmitStatus('success');
    reset();
  };

  if (submitStatus === 'success') {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50 dark:bg-gray-950">
        <Container>
          <div className="max-w-md mx-auto text-center py-16">
            <div className="mx-auto mb-6 w-20 h-20 rounded-full bg-green-100 dark:bg-green-900/30 flex items-center justify-center">
              <CheckCircle className="h-10 w-10 text-green-600 dark:text-green-400" aria-hidden="true" />
            </div>
            <h2 className="heading-2 mb-3">Pesan Terkirim!</h2>
            <p className="text-gray-600 dark:text-gray-400 mb-8">
              Terima kasih telah menghubungi kami. Tim kami akan merespons pesan Anda sesegera mungkin (biasanya dalam 1x24 jam).
            </p>
            <div className="flex flex-col sm:flex-row gap-3 justify-center">
              <Button onClick={() => setSubmitStatus('idle')}>Kirim Pesan Lain</Button>
              <Button variant="outline" onClick={() => window.location.href = '/'}>Kembali ke Beranda</Button>
            </div>
          </div>
        </Container>
      </div>
    );
  }

  return (
    <div className="min-h-screen">
      <Container className="py-8">
        <div className="max-w-3xl mx-auto text-center mb-12">
          <Badge variant="outline" className="mb-4" style={{ borderColor: 'var(--color-accent)', color: 'var(--color-accent)' }}>
            Hubungi Kami
          </Badge>
          <h1 className="heading-1 mb-4">Butuh Bantuan? Kami Siap Membantu</h1>
          <p className="body-lg text-gray-600 dark:text-gray-400">
            Apapun pertanyaan, saran, kritik, atau tip berita Anda, tim kami siap mendengarkan dan merespons.
          </p>
        </div>

        <div className="grid gap-8 lg:grid-cols-3">
          {/* Contact Info */}
          <div className="lg:col-span-1 space-y-4">
            {contactInfo.map((item, index) => (
              <Card key={index} hover className="transition-all duration-300">
                <CardContent className="pt-6">
                  <div className="flex items-start gap-4">
                    <div className={cn('flex-shrink-0 p-3 rounded-xl', item.color.replace('text-', 'bg-') + '/10')}>
                      <item.icon className={cn('h-6 w-6', item.color)} aria-hidden="true" />
                    </div>
                    <div>
                      <h3 className="font-heading font-semibold text-primary dark:text-white">{item.title}</h3>
                      {item.href ? (
                        <a href={item.href} className={cn('text-accent hover:text-accent-hover underline mt-1 block transition-colors', item.color)}>
                          {item.value}
                        </a>
                      ) : (
                        <p className="text-gray-600 dark:text-gray-400 mt-1">{item.value}</p>
                      )}
                      <p className="text-sm text-gray-500 mt-1">{item.description}</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}

            {/* Why Contact Us */}
            <Card className="bg-gradient-to-br from-primary via-primary/90 to-primary-light">
              <CardContent className="pt-6 text-white">
                <h3 className="font-heading font-semibold text-white mb-4 flex items-center gap-2">
                  <MessageSquare className="h-5 w-5 text-accent" />
                  Mengapa Menghubungi Kami?
                </h3>
                <ul className="space-y-3 text-white/90">
                  <li className="flex items-center gap-2"><Shield className="h-4 w-4 text-accent" /> Respon cepat & profesional</li>
                  <li className="flex items-center gap-2"><Headphones className="h-4 w-4 text-accent" /> Tim support yang ramah</li>
                  <li className="flex items-center gap-2"><Shield className="h-4 w-4 text-accent" /> Data Anda aman & privat (GDPR compliant)</li>
                  <li className="flex items-center gap-2"><Send className="h-4 w-4 text-accent" /> Follow-up garantit</li>
                </ul>
              </CardContent>
            </Card>
          </div>

          {/* Contact Form */}
          <div className="lg:col-span-2">
            <Card>
              <CardContent className="pt-6">
                <h2 className="heading-3 mb-2">Kirim Pesan ke Kami</h2>
                <p className="text-gray-600 dark:text-gray-400 mb-6">Isi formulir di bawah ini, kami akan membalas secepatnya.</p>

                <form onSubmit={handleSubmit(onSubmit)} className="space-y-6" noValidate>
                  <div className="grid gap-6 md:grid-cols-2">
                    <Input
                      label="Nama Lengkap"
                      placeholder="Masukkan nama Anda"
                      error={errors.name?.message}
                      {...register('name', { required: 'Nama wajib diisi', minLength: { value: 2, message: 'Nama minimal 2 karakter' } })}
                    />
                    <Input
                      label="Email"
                      type="email"
                      placeholder="email@contoh.com"
                      error={errors.email?.message}
                      {...register('email', { required: 'Email wajib diisi', pattern: { value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i, message: 'Format email tidak valid' } })}
                    />
                  </div>

                  <div className="grid gap-6 md:grid-cols-2">
                    <Input
                      label="Subjek"
                      placeholder="Pilih subjek"
                      error={errors.subject?.message}
                      {...register('subject', { required: 'Subjek wajib dipilih' })}
                      as="select"
                    >
                      <option value="">-- Pilih Subjek --</option>
                      <option value="umum">Pertanyaan Umum</option>
                      <option value="tip">Tip Berita / Liputan</option>
                      <option value="koreksi">Koreksi Artikel</option>
                      <option value="iklan">Iklan & Kerjasama</option>
                      <option value="teknis">Masalah Teknis Website/App</option>
                      <option value="lainnya">Lainnya</option>
                    </Input>
                    <Input
                      label="No. Telepon (Opsional)"
                      type="tel"
                      placeholder="+62 8xx xxxx xxxx"
                      {...register('phone', { pattern: { value: /^(\+62|62|0)8[1-9][0-9]{7,9}$/, message: 'Format nomor Indonesia tidak valid' } })}
                    />
                  </div>

                  <Textarea
                    label="Pesan"
                    placeholder="Tulis pesan Anda di sini... (minimal 20 karakter)"
                    rows={5}
                    error={errors.message?.message}
                    {...register('message', { required: 'Pesan wajib diisi', minLength: { value: 20, message: 'Pesan minimal 20 karakter' } })}
                  />

                  <div className="flex items-start gap-3 p-4 bg-gray-50 dark:bg-gray-800 rounded-lg">
                    <AlertCircle className="h-5 w-5 text-gray-500 mt-0.5 flex-shrink-0" aria-hidden="true" />
                    <div className="text-sm text-gray-600 dark:text-gray-400">
                      <p className="font-medium mb-1">Sebelum mengirim:</p>
                      <ul className="list-disc list-inside space-y-1">
                        <li>Pastikan email Anda valid untuk mendapat balasan</li>
                        <li>Jelaskan keluhan/saran dengan detail dan jelas</li>
                        <li>Kami tidak membagikan data Anda ke pihak ketiga</li>
                        <li>Untuk tip berita, sertakan bukti (foto/video) jika ada</li>
                      </ul>
                    </div>
                  </div>

                  <Button type="submit" className="w-full sm:w-auto" loading={submitStatus === 'submitting'} leftIcon={submitStatus === 'submitting' ? <Loader2 className="h-4 w-4 animate-spin" /> : <Send className="h-4 w-4" />}>
                    {submitStatus === 'submitting' ? 'Mengirim...' : 'Kirim Pesan'}
                  </Button>

                  <p className="text-xs text-gray-500 dark:text-gray-500 text-center">
                    Dengan mengirim formulir ini, Anda menyetujui <a href="/privacy" className="underline hover:text-accent">Kebijakan Privasi</a> dan <a href="/terms" className="underline hover:text-accent">Syarat & Ketentuan</a> kami.
                  </p>
                </form>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* FAQ Section */}
        <Section className="mt-16" aria-labelledby="faq-heading">
          <Container>
            <div className="max-w-3xl mx-auto text-center mb-10">
              <h2 id="faq-heading" className="heading-2 mb-3">Pertanyaan Umum</h2>
              <p className="text-gray-600 dark:text-gray-400">Jawaban cepat untuk pertanyaan yang sering diajukan</p>
            </div>

            <div className="max-w-3xl mx-auto space-y-3">
              {faqs.map((faq, index) => (
                <details key={index} className="group bg-white dark:bg-gray-800 rounded-xl border border-gray-100 dark:border-gray-700 overflow-hidden">
                  <summary className="flex items-center justify-between p-5 cursor-pointer list-none">
                    <span className="font-medium text-primary dark:text-white pr-4">{faq.q}</span>
                    <svg className="h-5 w-5 text-gray-400 transition-transform group-open:rotate-180 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                    </svg>
                  </summary>
                  <div className="px-5 pb-5 text-gray-600 dark:text-gray-400 animate-slide-down">
                    <p>{faq.a}</p>
                  </div>
                </details>
              ))}
            </div>

            <div className="mt-10 text-center">
              <p className="text-gray-600 dark:text-gray-400 mb-4">Masih punya pertanyaan lain?</p>
              <Button variant="outline" leftIcon={<MessageSquare className="h-4 w-4" />} onClick={() => setSubmitStatus('idle')}>
                Kirim Pertanyaan Lain
              </Button>
            </div>
          </Container>
        </Section>
      </Container>
    </div>
  );
}