import { useEffect, useState } from 'react';
import { AdminLogin } from '../components/admin/AdminLogin';
import { AdminPostTable } from '../components/admin/AdminPostTable';

const storageKey = 'chanmi-admin-token';

export default function AdminPage() {
  const [token, setToken] = useState(() => sessionStorage.getItem(storageKey) || '');

  useEffect(() => {
    document.title = 'Admin | 나는 찬미 Official';
  }, []);

  const login = (nextToken: string) => {
    sessionStorage.setItem(storageKey, nextToken);
    setToken(nextToken);
  };

  const logout = () => {
    sessionStorage.removeItem(storageKey);
    setToken('');
  };

  return (
    <main className="min-h-[70vh] bg-paper">
      <section className="section-shell py-12">
      {token ? <AdminPostTable token={token} onLogout={logout} /> : <AdminLogin onLogin={login} />}
      </section>
    </main>
  );
}
