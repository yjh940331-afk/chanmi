import { FormEvent, useCallback, useState } from 'react';
import { Send, Upload } from 'lucide-react';
import { createFanPost } from '../../lib/api';
import { fanPostLimits, validateFanPostInput } from '../../lib/validators';
import { Button } from '../ui/Button';
import { Input } from '../ui/Input';
import { Textarea } from '../ui/Textarea';
import { TurnstileWidget } from './TurnstileWidget';

interface FanPostFormProps {
  onCreated?: () => void;
}

export function FanPostForm({ onCreated }: FanPostFormProps) {
  const [nickname, setNickname] = useState('');
  const [message, setMessage] = useState('');
  const [turnstileToken, setTurnstileToken] = useState('');
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [status, setStatus] = useState('');
  const [submitting, setSubmitting] = useState(false);

  const handleToken = useCallback((token: string) => {
    setTurnstileToken(token);
  }, []);

  const onSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setStatus('');

    const validation = validateFanPostInput(nickname, message);
    setErrors(validation.errors);
    if (!validation.ok) {
      return;
    }

    setSubmitting(true);
    try {
      await createFanPost({
        nickname: nickname.trim(),
        message: message.trim(),
        turnstileToken,
      });
      setNickname('');
      setMessage('');
      setTurnstileToken('');
      setErrors({});
      setStatus('응원이 접수되었습니다. 관리자 확인 후 공개됩니다.');
      onCreated?.();
    } catch (requestError) {
      setStatus(requestError instanceof Error ? requestError.message : '응원을 남기지 못했습니다.');
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <form onSubmit={onSubmit} className="rounded-lg border border-ink/10 bg-white p-4 shadow-lift">
      <div className="grid gap-3">
        <label className="grid gap-1.5">
          <span className="text-xs font-black">닉네임</span>
          <Input
            value={nickname}
            onChange={(event) => setNickname(event.target.value)}
            maxLength={fanPostLimits.nicknameMax}
            placeholder="찬며든 팬"
            autoComplete="nickname"
          />
          {errors.nickname ? <span className="text-xs font-bold text-cherry">{errors.nickname}</span> : null}
        </label>

        <label className="grid gap-1.5">
          <span className="text-xs font-black">응원 메시지</span>
          <Textarea
            value={message}
            onChange={(event) => setMessage(event.target.value)}
            maxLength={fanPostLimits.messageMax}
            placeholder="따뜻한 응원 한마디를 남겨주세요."
          />
          <span className="text-right text-xs font-bold text-ink/45">
            {message.length}/{fanPostLimits.messageMax}
          </span>
          {errors.message ? <span className="text-xs font-bold text-cherry">{errors.message}</span> : null}
        </label>

        <label className="grid gap-1.5">
          <span className="text-xs font-black">이미지</span>
          <div className="flex min-h-9 items-center gap-2 rounded-lg border border-dashed border-ink/20 bg-ink/5 px-3 text-xs font-bold text-ink/60">
            <Upload aria-hidden className="h-4 w-4" />
            이미지 첨부는 준비 중입니다.
          </div>
        </label>

        <TurnstileWidget onTokenChange={handleToken} />

        {status ? (
          <p className="rounded-lg bg-gold/35 px-3 py-2 text-xs font-bold text-ink/70">{status}</p>
        ) : null}

        <Button type="submit" size="md" disabled={submitting}>
          <Send aria-hidden className="h-4 w-4" />
          응원 남기기
        </Button>
      </div>
    </form>
  );
}
