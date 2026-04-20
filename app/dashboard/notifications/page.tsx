'use client';

import { useMemo, useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';

type NotificationItem = {
  id: number;
  message: string;
  type: 'Update' | 'Alert' | 'Offer';
  audience: 'All' | 'Staff' | 'Fleet' | 'Hotel';
  status: 'Draft' | 'Published' | 'Archived';
  date: string;
};

const initialNotifications: NotificationItem[] = [
  { id: 1, message: 'Hotel partner rate refresh for peak season.', type: 'Update', audience: 'Hotel', status: 'Published', date: '2026-04-01' },
  { id: 2, message: 'Peak-season fleet maintenance alert.', type: 'Alert', audience: 'Fleet', status: 'Published', date: '2026-04-01' },
  { id: 3, message: 'New traveler offer for camping packages.', type: 'Offer', audience: 'All', status: 'Published', date: '2026-04-02' },
  { id: 4, message: 'Staff training schedule updated.', type: 'Update', audience: 'Staff', status: 'Draft', date: '2026-04-03' },
];

export default function NotificationsPage() {
  const router = useRouter();
  
  useEffect(() => {
    const stored = typeof window !== 'undefined' ? localStorage.getItem('user') : null;
    if (!stored) {
      router.push('/auth');
      return;
    }
    try {
      const parsed = JSON.parse(stored);
      if (parsed.role === 'fleet_manager' || parsed.role === 'hotel_partner' || parsed.role === 'fleet' || parsed.role === 'hotel') {
        router.push('/dashboard');
      }
    } catch {
      router.push('/auth');
    }
  }, [router]);

  const [notifications, setNotifications] = useState<NotificationItem[]>(initialNotifications);
  const [typeFilter, setTypeFilter] = useState<'All' | 'Update' | 'Alert' | 'Offer'>('All');
  const [audienceFilter, setAudienceFilter] = useState<'All' | 'Staff' | 'Fleet' | 'Hotel'>('All');
  const [statusFilter, setStatusFilter] = useState<'All' | 'Draft' | 'Published' | 'Archived'>('All');

  const [showComposeModal, setShowComposeModal] = useState(false);
  const [form, setForm] = useState({ message: '', type: 'Update', audience: 'All', status: 'Draft' });

  const filtered = useMemo(() => {
    return notifications.filter((item) => {
      const typeMatch = typeFilter === 'All' || item.type === typeFilter;
      const audienceMatch = audienceFilter === 'All' || item.audience === audienceFilter;
      const statusMatch = statusFilter === 'All' || item.status === statusFilter;
      return typeMatch && audienceMatch && statusMatch;
    });
  }, [notifications, typeFilter, audienceFilter, statusFilter]);

  const deleteNotification = (id: number) => {
    if (!confirm('Delete this notification?')) return;
    setNotifications((prev) => prev.filter((item) => item.id !== id));
  };

  const viewNotification = (item: NotificationItem) => {
    alert(`Notification\n\nMessage: ${item.message}\nType: ${item.type}\nAudience: ${item.audience}\nStatus: ${item.status}\nDate: ${item.date}`);
  };

  const editNotification = (item: NotificationItem) => {
    const newMessage = prompt('Edit notification message', item.message);
    if (!newMessage) return;
    setNotifications((prev) => prev.map((n) => (n.id === item.id ? { ...n, message: newMessage } : n)));
  };

  const addNotification = (event: React.FormEvent) => {
    event.preventDefault();
    if (!form.message.trim()) {
      alert('Message is required');
      return;
    }
    const nextId = notifications.length ? Math.max(...notifications.map((n) => n.id)) + 1 : 1;
    setNotifications((prev) => [
      ...prev,
      { id: nextId, message: form.message.trim(), type: form.type as NotificationItem['type'], audience: form.audience as NotificationItem['audience'], status: form.status as NotificationItem['status'], date: new Date().toISOString().split('T')[0] },
    ]);
    setForm({ message: '', type: 'Update', audience: 'All', status: 'Draft' });
    setShowComposeModal(false);
  };

  const user = typeof window !== 'undefined' ? localStorage.getItem('user') : null;
  const parsedUser = user ? JSON.parse(user) : null;
  const role = parsedUser?.role || 'staff';
  const navLinks = role === 'admin' ? ['Dashboard', 'Fleet', 'Hotel', 'Bookings', 'Notifications'] : ['Dashboard', 'Fleet', 'Hotel', 'Bookings', 'Notifications'];

  return (
    <div style={{ display: 'grid', gridTemplateColumns: '240px 1fr', minHeight: '100vh', background: 'transparent', color: '#e2e8f0' }}>
      <aside style={{ background: 'rgba(15, 23, 42, 0.65)', backdropFilter: 'blur(20px)', borderRight: '1px solid #1e293b', padding: '1rem' }}>
        <h2 style={{ margin: 0, fontSize: '1.25rem', color: '#f8fafc' }}>Notification panel</h2>
        <nav style={{ marginTop: 20, display: 'grid', gap: '0.35rem' }}>
          {navLinks.map((item) => {
            const href = item === 'Dashboard' ? '/dashboard' : `/dashboard/${item.toLowerCase()}`;
            return (
              <a
                key={item}
                href={href}
                style={{
                  padding: '0.55rem 0.7rem',
                  borderRadius: '8px',
                  color: '#e2e8f0',
                  textDecoration: 'none',
                  background: item === 'Notifications' ? '#1e3a8a' : 'transparent',
                }}
              >
                {item}
              </a>
            );
          })}
        </nav>
      </aside>

      <main style={{ padding: '1.25rem', background: 'transparent' }}>
        <section style={{ maxWidth: 1200, margin: '0 auto' }}>
          <header style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem' }}>
            <div>
              <h1 style={{ margin: 0, fontSize: '2rem' }}>Notifications</h1>
              <p style={{ margin: '0.25rem 0', color: '#94a3b8' }}>Total notifications: {notifications.length}</p>
            </div>
            <button
              onClick={() => setShowComposeModal(true)}
              style={{ background: '#1d4ed8', color: '#fff', border: 'none', borderRadius: 8, padding: '0.6rem 1rem', cursor: 'pointer' }}
            >
              + Compose
            </button>
          </header>

          <section style={{ display: 'grid', gap: '1rem', gridTemplateColumns: 'repeat(auto-fit, minmax(170px, 1fr))', marginBottom: '1rem' }}>
            <article style={{ background: 'rgba(30, 41, 59, 0.7)', backdropFilter: 'blur(16px)', boxShadow: '0 8px 32px rgba(0, 0, 0, 0.15)', borderRadius: 12, padding: '1rem' }}>
              <p style={{ margin: 0, color: '#cbd5e1' }}>Total sent</p>
              <strong style={{ fontSize: '1.8rem' }}>{notifications.length}</strong>
            </article>
            <article style={{ background: 'rgba(30, 41, 59, 0.7)', backdropFilter: 'blur(16px)', boxShadow: '0 8px 32px rgba(0, 0, 0, 0.15)', borderRadius: 12, padding: '1rem' }}>
              <p style={{ margin: 0, color: '#cbd5e1' }}>Alerts</p>
              <strong style={{ fontSize: '1.8rem' }}>{notifications.filter((n) => n.type === 'Alert').length}</strong>
            </article>
            <article style={{ background: 'rgba(30, 41, 59, 0.7)', backdropFilter: 'blur(16px)', boxShadow: '0 8px 32px rgba(0, 0, 0, 0.15)', borderRadius: 12, padding: '1rem' }}>
              <p style={{ margin: 0, color: '#cbd5e1' }}>Offers</p>
              <strong style={{ fontSize: '1.8rem' }}>{notifications.filter((n) => n.type === 'Offer').length}</strong>
            </article>
          </section>

          <section style={{ background: 'rgba(30, 41, 59, 0.7)', backdropFilter: 'blur(16px)', borderRadius: 14, padding: '1rem', boxShadow: '0 10px 25px rgba(0,0,0,0.18)' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '0.75rem', flexWrap: 'wrap' }}>
              <select value={typeFilter} onChange={(e) => setTypeFilter(e.target.value as any)} style={{ borderRadius: 8, padding: '0.45rem 0.6rem', border: '1px solid #334155', background: '#19233b', color: '#e2e8f0' }}>
                <option value='All'>Type: All</option>
                <option value='Update'>Update</option>
                <option value='Alert'>Alert</option>
                <option value='Offer'>Offer</option>
              </select>
              <select value={audienceFilter} onChange={(e) => setAudienceFilter(e.target.value as any)} style={{ borderRadius: 8, padding: '0.45rem 0.6rem', border: '1px solid #334155', background: '#19233b', color: '#e2e8f0' }}>
                <option value='All'>Audience: All</option>
                <option value='Staff'>Staff</option>
                <option value='Fleet'>Fleet</option>
                <option value='Hotel'>Hotel</option>
              </select>
              <select value={statusFilter} onChange={(e) => setStatusFilter(e.target.value as any)} style={{ borderRadius: 8, padding: '0.45rem 0.6rem', border: '1px solid #334155', background: '#19233b', color: '#e2e8f0' }}>
                <option value='All'>Status: All</option>
                <option value='Draft'>Draft</option>
                <option value='Published'>Published</option>
                <option value='Archived'>Archived</option>
              </select>
            </div>

            <div style={{ overflowX: 'auto' }}>
              <table style={{ width: '100%', borderCollapse: 'separate', borderSpacing: '0 0.35rem', minWidth: '800px' }}>
                <thead style={{ color: '#94a3b8', fontSize: '0.92rem' }}>
                  <tr>
                    <th style={{ padding: '0.6rem 0.75rem', textAlign: 'left' }}>ID</th>
                    <th style={{ padding: '0.6rem 0.75rem', textAlign: 'left' }}>Message</th>
                    <th style={{ padding: '0.6rem 0.75rem', textAlign: 'left' }}>Type</th>
                    <th style={{ padding: '0.6rem 0.75rem', textAlign: 'left' }}>Audience</th>
                    <th style={{ padding: '0.6rem 0.75rem', textAlign: 'left' }}>Status</th>
                    <th style={{ padding: '0.6rem 0.75rem', textAlign: 'left' }}>Date</th>
                    <th style={{ padding: '0.6rem 0.75rem', textAlign: 'left' }}>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {filtered.map((item) => (
                    <tr key={item.id} style={{ background: 'rgba(15, 23, 42, 0.65)', backdropFilter: 'blur(20px)', borderRadius: 10 }}>
                      <td style={{ padding: '0.69rem 0.75rem' }}>{item.id}</td>
                      <td style={{ padding: '0.69rem 0.75rem', maxWidth: 300, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{item.message}</td>
                      <td style={{ padding: '0.69rem 0.75rem' }}>{item.type}</td>
                      <td style={{ padding: '0.69rem 0.75rem' }}>{item.audience}</td>
                      <td style={{ padding: '0.69rem 0.75rem' }}>{item.status}</td>
                      <td style={{ padding: '0.69rem 0.75rem' }}>{item.date}</td>
                      <td style={{ padding: '0.69rem 0.75rem', display: 'flex', gap: '0.35rem' }}>
                        <button onClick={() => viewNotification(item)} style={{ background: '#1e3a8a', border: '1px solid #93c5fd', color: '#fff', borderRadius: 6, padding: '0.35rem 0.5rem', cursor: 'pointer' }}>View</button>
                        <button onClick={() => editNotification(item)} style={{ background: '#065f46', border: '1px solid #6ee7b7', color: '#fff', borderRadius: 6, padding: '0.35rem 0.5rem', cursor: 'pointer' }}>Edit</button>
                        <button onClick={() => deleteNotification(item.id)} style={{ background: '#991b1b', border: '1px solid #fecaca', color: '#fff', borderRadius: 6, padding: '0.35rem 0.5rem', cursor: 'pointer' }}>Delete</button>
                      </td>
                    </tr>
                  ))}
                  {filtered.length === 0 && (
                    <tr>
                      <td colSpan={7} style={{ textAlign: 'center', padding: '1rem 0', color: '#94a3b8' }}>No notifications found.</td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </section>
        </section>
      </main>

      {showComposeModal && (
        <div style={{ position: 'fixed', inset: 0, zIndex: 1000, background: 'rgba(0, 0, 0, 0.45)', display: 'flex', justifyContent: 'center', alignItems: 'center', padding: '1rem' }}>
          <div style={{ width: 'min(100%, 500px)', background: '#0b1220', borderRadius: 12, border: '1px solid #334155', padding: '1.25rem', boxShadow: '0 20px 40px rgba(0, 0, 0, 0.35)' }}>
            <h2 style={{ margin: '0 0 0.8rem', color: '#f8fafc' }}>Compose New Notification</h2>
            <form onSubmit={addNotification} style={{ display: 'grid', gap: '0.75rem' }}>
              <textarea
                value={form.message}
                onChange={(e) => setForm((prev) => ({ ...prev, message: e.target.value }))}
                placeholder='Type message...'
                rows={4}
                style={{ width: '100%', borderRadius: 8, border: '1px solid #334155', padding: '0.7rem', background: 'rgba(15, 23, 42, 0.65)', backdropFilter: 'blur(20px)', color: '#e2e8f0' }}
              />
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, minmax(0, 1fr))', gap: '0.5rem' }}>
                <select value={form.type} onChange={(e) => setForm((prev) => ({ ...prev, type: e.target.value }))} style={{ borderRadius: 8, border: '1px solid #334155', background: 'rgba(15, 23, 42, 0.65)', backdropFilter: 'blur(20px)', color: '#e2e8f0', padding: '0.45rem' }}>
                  <option value='Update'>Update</option>
                  <option value='Alert'>Alert</option>
                  <option value='Offer'>Offer</option>
                </select>
                <select value={form.audience} onChange={(e) => setForm((prev) => ({ ...prev, audience: e.target.value }))} style={{ borderRadius: 8, border: '1px solid #334155', background: 'rgba(15, 23, 42, 0.65)', backdropFilter: 'blur(20px)', color: '#e2e8f0', padding: '0.45rem' }}>
                  <option value='All'>All</option>
                  <option value='Staff'>Staff</option>
                  <option value='Fleet'>Fleet</option>
                  <option value='Hotel'>Hotel</option>
                </select>
                <select value={form.status} onChange={(e) => setForm((prev) => ({ ...prev, status: e.target.value }))} style={{ borderRadius: 8, border: '1px solid #334155', background: 'rgba(15, 23, 42, 0.65)', backdropFilter: 'blur(20px)', color: '#e2e8f0', padding: '0.45rem' }}>
                  <option value='Draft'>Draft</option>
                  <option value='Published'>Published</option>
                  <option value='Archived'>Archived</option>
                </select>
              </div>
              <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '0.5rem' }}>
                <button type='button' onClick={() => setShowComposeModal(false)} style={{ borderRadius: 8, border: '1px solid #334155', background: '#1f2937', color: '#e2e8f0', padding: '0.5rem 0.8rem', cursor: 'pointer' }}>
                  Cancel
                </button>
                <button type='submit' style={{ borderRadius: 8, border: 'none', background: '#22c55e', color: '#0f172a', padding: '0.5rem 0.8rem', cursor: 'pointer' }}>
                  Save
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
