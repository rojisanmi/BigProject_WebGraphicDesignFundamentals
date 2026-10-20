import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { Loader2, CheckCircle, AlertCircle } from 'lucide-react';
import { cn } from '@/utils';
import { Button, Input, Textarea } from '@/components/ui';
import { useSubmitContact, useToast } from '@/hooks';
import type { ContactFormData } from '@/types';

export function ContactForm() {
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle');
  const { addToast } = useToast();
  const { mutate: submitContact, isPending } = useSubmitContact();

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<ContactFormData>();

  const onSubmit = (data: ContactFormData) => {
    setSubmitStatus('idle');
    submitContact(data, {
      onSuccess: () => {
        setSubmitStatus('success');
        reset();
        addToast({ type: 'success', title: 'Pesan Terkirim', message: 'Terima kasih telah menghubungi kami. Kami akan merespons segera.' });
      },
      onError: (error) => {
        setSubmitStatus('error');
        addToast({ type: 'error', title: 'Gagal Mengirim', message: error.message || 'Terjadi kesalahan. Silakan coba lagi.' });
      },
    });
  };

  if (submitStatus === 'success') {
    return (
      <div className="text-center py-12" role="alert">
        <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-green-100 dark:bg-green-900/30">
          <CheckCircle className="h-8 w-8 text-green-600 dark:text-green-400" aria-hidden="true" />
        </div>
        <h3 className="heading-3 mb-2">Pesan Terkirim!</h3>
        <p className="text-gray-600 dark:text-gray-400 mb-6 max-w-md mx-auto">
          Terima kasih telah menghubungi kami. Tim kami akan merespons pesan Anda sesegera mungkin.
        </p>
        <Button onClick={() => setSubmitStatus('idle')}>Kirim Pesan Lain</Button>
      </div>
    );
  }

  return (
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

      <Input
        label="Subjek"
        placeholder="Subjek pesan"
        error={errors.subject?.message}
        {...register('subject', { required: 'Subjek wajib diisi', minLength: { value: 5, message: 'Subjek minimal 5 karakter' } })}
      />

      <Textarea
        label="Pesan"
        placeholder="Tulis pesan Anda di sini..."
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
            <li>Jelaskan keluhan/saran dengan detail</li>
            <li>Kami tidak membagikan data Anda ke pihak ketiga</li>
          </ul>
        </div>
      </div>

      <Button type="submit" className="w-full sm:w-auto" loading={isPending} leftIcon={isPending ? <Loader2 className="h-4 w-4 animate-spin" /> : undefined}>
        {isPending ? 'Mengirim...' : 'Kirim Pesan'}
      </Button>

      <p className="text-xs text-gray-500 dark:text-gray-500 text-center">
        Dengan mengirim formulir ini, Anda menyetujui <a href="/privacy" className="underline hover:text-accent">Kebijakan Privasi</a> kami.
      </p>
    </form>
  );
}

interface NewsletterFormProps {
  className?: string;
  variant?: 'inline' | 'card';
}

export function NewsletterForm({ className, variant = 'card' }: NewsletterFormProps) {
  const [email, setEmail] = useState('');
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
  const { mutate: subscribe } = useSubscribeNewsletter();
  const { addToast } = useToast();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !email.includes('@')) {
      addToast({ type: 'error', title: 'Email tidak valid' });
      return;
    }

    setStatus('loading');
    subscribe(email, {
      onSuccess: () => {
        setStatus('success');
        setEmail('');
        addToast({ type: 'success', title: 'Berlangganan berhasil!', message: 'Terima kasih telah berlangganan newsletter kami.' });
        setTimeout(() => setStatus('idle'), 3000);
      },
      onError: () => {
        setStatus('error');
        addToast({ type: 'error', title: 'Gagal berlangganan', message: 'Silakan coba lagi nanti.' });
        setTimeout(() => setStatus('idle'), 3000);
      },
    });
  };

  if (variant === 'inline') {
    return (
      <form onSubmit={handleSubmit} className={cn('flex gap-2', className)} noValidate>
        <Input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Email Anda"
          className="flex-1"
          aria-label="Email for newsletter"
        />
        <Button type="submit" loading={status === 'loading'}>
          Berlangganan
        </Button>
      </form>
    );
  }

  return (
    <div className={cn('bg-gray-50 dark:bg-gray-800 rounded-xl p-6 md:p-8', className)}>
      <h3 className="heading-3 mb-2">Newsletter Harian</h3>
      <p className="text-gray-600 dark:text-gray-400 mb-4">
        Dapatkan berita terpilih langsung ke email Anda setiap pagi.
      </p>
      <form onSubmit={handleSubmit} className="flex gap-2 max-w-md" noValidate>
        <Input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Masukkan email Anda"
          className="flex-1"
          aria-label="Email for newsletter"
          disabled={status === 'loading' || status === 'success'}
        />
        <Button type="submit" loading={status === 'loading'}>
          {status === 'success' ? 'Terdaftar!' : 'Berlangganan'}
        </Button>
      </form>
      <p className="mt-3 text-xs text-gray-500 dark:text-gray-500">
        Tanpa spam. Batalkan kapan saja. <a href="/privacy" className="underline hover:text-accent">Kebijakan Privasi</a>.
      </p>
    </div>
  );
}

import { useSubscribeNewsletter } from '@/hooks/useNews';