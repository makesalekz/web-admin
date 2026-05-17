'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { useAuthStore } from '@/stores/auth-store';

export default function LoginPage() {
  const router = useRouter();
  const { setAuth } = useAuthStore();
  const [phone, setPhone] = useState('');
  const [code, setCode] = useState('');
  const [step, setStep] = useState<'phone' | 'code'>('phone');
  const [loading, setLoading] = useState(false);

  const handleSendCode = async () => {
    setLoading(true);
    await fetch('/api/auth/login', {
      method: 'POST',
      body: JSON.stringify({ phone }),
    });
    setStep('code');
    setLoading(false);
  };

  const handleVerify = async () => {
    setLoading(true);
    const res = await fetch('/api/auth/login', {
      method: 'POST',
      body: JSON.stringify({ phone, code }),
    });
    const data = await res.json();
    setAuth(data.accessToken, data.user);
    router.push('/dashboard');
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-muted/30">
      <Card className="w-full max-w-sm">
        <CardHeader>
          <CardTitle className="text-center">Вход в UMAG Admin</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          {step === 'phone' ? (
            <>
              <Input
                placeholder="+7 (777) 000-00-00"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
              />
              <Button
                className="w-full"
                onClick={handleSendCode}
                disabled={loading || !phone}
              >
                Отправить код
              </Button>
            </>
          ) : (
            <>
              <Input
                placeholder="Код из SMS"
                value={code}
                onChange={(e) => setCode(e.target.value)}
                maxLength={6}
              />
              <Button
                className="w-full"
                onClick={handleVerify}
                disabled={loading || !code}
              >
                Войти
              </Button>
              <Button
                variant="ghost"
                className="w-full"
                onClick={() => setStep('phone')}
              >
                Назад
              </Button>
            </>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
