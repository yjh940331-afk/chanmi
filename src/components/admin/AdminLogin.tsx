import { FormEvent, useState } from 'react';
import { Lock } from 'lucide-react';
import { Button } from '../ui/Button';
import { Input } from '../ui/Input';

interface AdminLoginProps {
  onLogin: (token: string) => void;
}

export function AdminLogin({ onLogin }: AdminLoginProps) {
  const [token, setToken] = useState('');

  const onSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (token.trim()) {
      onLogin(token.trim());
    }
  };

  return (
    <form onSubmit={onSubmit} className="mx-auto max-w-md rounded-lg border border-ink/10 bg-white p-5 shadow-lift">
      <div className="mb-5 inline-flex h-12 w-12 items-center justify-center rounded-lg bg-ink text-paper">
        <Lock aria-hidden className="h-5 w-5" />
      </div>
      <h1 className="text-2xl font-black">관리자</h1>
      <p className="mt-2 text-sm leading-6 text-ink/60">ADMIN_TOKEN을 입력해 팬 응원 메시지를 관리합니다.</p>
      <label className="mt-5 grid gap-2">
        <span className="text-sm font-black">Admin token</span>
        <Input
          type="password"
          value={token}
          onChange={(event) => setToken(event.target.value)}
          placeholder="ADMIN_TOKEN"
          autoComplete="current-password"
        />
      </label>
      <Button type="submit" className="mt-5 w-full">
        로그인
      </Button>
    </form>
  );
}

