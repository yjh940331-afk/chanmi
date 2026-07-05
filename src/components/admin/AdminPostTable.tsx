import { useEffect, useMemo, useState } from 'react';
import { Check, EyeOff, RefreshCcw, Search, Trash2 } from 'lucide-react';
import { deleteAdminFanPost, fetchAdminFanPosts, updateAdminFanPost } from '../../lib/api';
import { formatDate } from '../../lib/dates';
import type { FanPost, FanPostStatus } from '../../types';
import { Button } from '../ui/Button';
import { Input } from '../ui/Input';

interface AdminPostTableProps {
  token: string;
  onLogout: () => void;
}

const statuses: Array<FanPostStatus | 'all'> = ['pending', 'approved', 'hidden', 'all'];

export function AdminPostTable({ token, onLogout }: AdminPostTableProps) {
  const [items, setItems] = useState<FanPost[]>([]);
  const [status, setStatus] = useState<FanPostStatus | 'all'>('pending');
  const [query, setQuery] = useState('');
  const [loading, setLoading] = useState(true);
  const [message, setMessage] = useState('');

  const load = async () => {
    setLoading(true);
    setMessage('');
    try {
      const data = await fetchAdminFanPosts(token, status);
      setItems(data.items);
    } catch (requestError) {
      setMessage(requestError instanceof Error ? requestError.message : '목록을 불러오지 못했습니다.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    void load();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [status]);

  const filteredItems = useMemo(() => {
    const normalized = query.trim().toLowerCase();
    if (!normalized) {
      return items;
    }

    return items.filter(
      (item) =>
        item.nickname.toLowerCase().includes(normalized) ||
        item.message.toLowerCase().includes(normalized),
    );
  }, [items, query]);

  const updateStatus = async (id: string, nextStatus: FanPostStatus) => {
    setMessage('');
    try {
      await updateAdminFanPost(token, id, nextStatus);
      await load();
    } catch (requestError) {
      setMessage(requestError instanceof Error ? requestError.message : '상태를 변경하지 못했습니다.');
    }
  };

  const remove = async (id: string) => {
    setMessage('');
    try {
      await deleteAdminFanPost(token, id);
      await load();
    } catch (requestError) {
      setMessage(requestError instanceof Error ? requestError.message : '삭제하지 못했습니다.');
    }
  };

  return (
    <div className="grid gap-5">
      <div className="flex flex-col gap-3 rounded-lg border border-ink/10 bg-white p-4 shadow-lift lg:flex-row lg:items-center lg:justify-between">
        <div>
          <h1 className="text-2xl font-semibold">팬 응원 관리</h1>
          <p className="mt-1 text-sm text-ink/60">승인한 메시지만 공개 페이지에 노출됩니다.</p>
        </div>
        <div className="flex flex-wrap gap-2">
          <Button type="button" variant="secondary" onClick={load} disabled={loading}>
            <RefreshCcw aria-hidden className="h-4 w-4" />
            새로고침
          </Button>
          <Button type="button" variant="ghost" onClick={onLogout}>
            로그아웃
          </Button>
        </div>
      </div>

      <div className="grid gap-3 lg:grid-cols-[1fr_auto]">
        <label className="relative">
          <Search aria-hidden className="pointer-events-none absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-ink/40" />
          <Input
            value={query}
            onChange={(event) => setQuery(event.target.value)}
            className="pl-11"
            placeholder="닉네임 또는 메시지 검색"
          />
        </label>
        <div className="flex gap-2 overflow-x-auto">
          {statuses.map((item) => (
            <Button
              key={item}
              type="button"
              variant={status === item ? 'primary' : 'secondary'}
              onClick={() => setStatus(item)}
            >
              {item}
            </Button>
          ))}
        </div>
      </div>

      {message ? <p className="rounded-lg bg-gold/35 px-4 py-3 text-sm font-bold">{message}</p> : null}

      <div className="grid gap-3">
        {filteredItems.map((item) => (
          <article key={item.id} className="rounded-lg border border-ink/10 bg-white p-4 shadow-lift">
            <div className="flex flex-col gap-4 lg:flex-row lg:items-start lg:justify-between">
              <div className="min-w-0">
                <div className="flex flex-wrap items-center gap-2">
                  <h2 className="font-semibold">{item.nickname}</h2>
                  <span className="rounded-lg bg-ink px-2 py-1 text-xs font-semibold text-paper">
                    {item.status}
                  </span>
                  <span className="text-xs font-bold text-ink/50">{formatDate(item.createdAt)}</span>
                </div>
                <p className="mt-3 whitespace-pre-wrap break-words text-sm leading-6 text-ink/70">
                  {item.message}
                </p>
              </div>
              <div className="flex flex-wrap gap-2">
                <Button type="button" size="sm" onClick={() => updateStatus(item.id, 'approved')}>
                  <Check aria-hidden className="h-4 w-4" />
                  승인
                </Button>
                <Button type="button" size="sm" variant="secondary" onClick={() => updateStatus(item.id, 'hidden')}>
                  <EyeOff aria-hidden className="h-4 w-4" />
                  숨김
                </Button>
                <Button type="button" size="sm" variant="ghost" onClick={() => remove(item.id)}>
                  <Trash2 aria-hidden className="h-4 w-4" />
                  삭제
                </Button>
              </div>
            </div>
          </article>
        ))}
      </div>

      {!loading && filteredItems.length === 0 ? (
        <p className="rounded-lg border border-dashed border-ink/20 bg-white p-8 text-center font-bold text-ink/60">
          표시할 메시지가 없습니다.
        </p>
      ) : null}
    </div>
  );
}

