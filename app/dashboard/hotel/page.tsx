'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';

export default function Page() {
  const router = useRouter();
  const [user, setUser] = useState<{ name: string; role: string } | null>(null);

  useEffect(() => {
    const stored =
      typeof window !== 'undefined' ? localStorage.getItem('user') : null;

    if (!stored) {
      router.push('/auth');
      return;
    }

    try {
      const parsed = JSON.parse(stored);

      if (parsed.role !== 'hotel' && parsed.role !== 'hotel_partner') {
        router.push('/dashboard');
        return;
      }

      setUser({
        name: parsed.fullName || parsed.email || 'Hotel Partner',
        role: parsed.role,
      });
    } catch {
      router.push('/auth');
    }
  }, [router]);

  const handleLogout = () => {
    localStorage.removeItem('user');
    router.push('/');
  };

  return (
    <div
      style={{
        minHeight: '100vh',
        background: 'transparent',
        color: '#e2e8f0',
        fontFamily: 'Inter, system-ui, sans-serif',
      }}
    >
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: '240px 1fr',
          minHeight: '100vh',
        }}
      >
        <aside
          style={{
            background: 'rgba(15, 23, 42, 0.65)', backdropFilter: 'blur(20px)',
            borderRight: '1px solid #1e293b',
            padding: '1.25rem',
          }}
        >
          <h2
            style={{
              margin: 0,
              color: '#f8fafc',
              fontSize: '1.3rem',
            }}
          >
            Hotel Dashboard
          </h2>

          <p
            style={{
              color: '#94a3b8',
              marginTop: 6,
              marginBottom: 16,
            }}
          >
            Minimal partner workflow overview
          </p>

          <nav style={{ display: 'grid', gap: '0.4rem' }}>
            {[
              { label: 'Dashboard', href: '/dashboard' },
              { label: 'Fleet', href: '/dashboard/fleet' },
              { label: 'Hotel', href: '/dashboard/hotel' },
              { label: 'Bookings', href: '/dashboard/bookings' },
            ].map((item) => (
              <a
                key={item.label}
                href={item.href}
                style={{
                  color:
                    item.href === '/dashboard/hotel' ? '#f8fafc' : '#cbd5e1',
                  background:
                    item.href === '/dashboard/hotel'
                      ? '#1d4ed8'
                      : 'transparent',
                  borderRadius: 8,
                  padding: '0.55rem 0.75rem',
                  textDecoration: 'none',
                  fontWeight: 500,
                }}
              >
                {item.label}
              </a>
            ))}
          </nav>
        </aside>

        <main style={{ padding: '1.25rem' }}>
          <header
            style={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              marginBottom: '1.25rem',
            }}
          >
            <div>
              <h1
                style={{
                  margin: 0,
                  color: '#f8fafc',
                  fontSize: '2rem',
                }}
              >
                Welcome, {user?.name || 'Hotel partner'}
              </h1>

              <p style={{ color: '#94a3b8', marginTop: 6 }}>
                Your hotel partner tools are ready.
              </p>
            </div>
            <button 
              onClick={handleLogout}
              style={{ background: '#ef4444', color: '#fff', border: 'none', borderRadius: 8, padding: '0.6rem 1rem', cursor: 'pointer', fontWeight: 500 }}
            >
              Logout
            </button>
          </header>

          <section
            style={{
              display: 'grid',
              gap: '1rem',
              gridTemplateColumns: 'repeat(3, minmax(0,1fr))',
              marginBottom: '1rem',
            }}
          >
            <article
              style={{
                background: 'rgba(30, 41, 59, 0.7)', backdropFilter: 'blur(16px)', boxShadow: '0 8px 32px rgba(0, 0, 0, 0.15)',
                border: '1px solid #1e293b',
                borderRadius: 12,
                padding: 16,
              }}
            >
              <p style={{ margin: 0, color: '#94a3b8', fontWeight: 600 }}>
                Registered Properties
              </p>
              <h2
                style={{
                  margin: '0.4rem 0 0',
                  color: '#f8fafc',
                  fontSize: '1.75rem',
                }}
              >
                3
              </h2>
            </article>

            <article
              style={{
                background: 'rgba(30, 41, 59, 0.7)', backdropFilter: 'blur(16px)', boxShadow: '0 8px 32px rgba(0, 0, 0, 0.15)',
                border: '1px solid #1e293b',
                borderRadius: 12,
                padding: 16,
              }}
            >
              <p style={{ margin: 0, color: '#94a3b8', fontWeight: 600 }}>
                Total Rooms Available
              </p>
              <h2
                style={{
                  margin: '0.4rem 0 0',
                  color: '#f8fafc',
                  fontSize: '1.75rem',
                }}
              >
                97
              </h2>
            </article>

            <article
              style={{
                background: 'rgba(30, 41, 59, 0.7)', backdropFilter: 'blur(16px)', boxShadow: '0 8px 32px rgba(0, 0, 0, 0.15)',
                border: '1px solid #1e293b',
                borderRadius: 12,
                padding: 16,
              }}
            >
              <p style={{ margin: 0, color: '#94a3b8', fontWeight: 600 }}>
                Pending Approvals
              </p>
              <h2
                style={{
                  margin: '0.4rem 0 0',
                  color: '#f8fafc',
                  fontSize: '1.75rem',
                }}
              >
                1
              </h2>
            </article>
          </section>

          <section
            style={{
              background: 'rgba(30, 41, 59, 0.7)', backdropFilter: 'blur(16px)', boxShadow: '0 8px 32px rgba(0, 0, 0, 0.15)',
              border: '1px solid #1e293b',
              borderRadius: 12,
              padding: 16,
            }}
          >
            <h2 style={{ margin: 0, color: '#f8fafc' }}>My Hotel Properties</h2>

            <div style={{ marginTop: 12, overflowX: 'auto' }}>
              <table style={{ width: '100%', borderCollapse: 'collapse' }}>
                <thead>
                  <tr style={{ color: '#94a3b8', fontSize: '0.89rem' }}>
                    <th style={{ textAlign: 'left', padding: '0.6rem' }}>ID</th>
                    <th style={{ textAlign: 'left', padding: '0.6rem' }}>
                      Hotel Name
                    </th>
                    <th style={{ textAlign: 'left', padding: '0.6rem' }}>
                      Location
                    </th>
                    <th style={{ textAlign: 'left', padding: '0.6rem' }}>
                      Total Rooms
                    </th>
                    <th style={{ textAlign: 'left', padding: '0.6rem' }}>
                      Status
                    </th>
                  </tr>
                </thead>

                <tbody style={{ color: '#e2e8f0' }}>
                  {[
                    {
                      id: 'PROP-101',
                      hotel: 'Sea View Resort',
                      location: 'Mirissa',
                      rooms: '45',
                      status: 'Active',
                    },
                    {
                      id: 'PROP-102',
                      hotel: 'Mountain Breeze Hotel',
                      location: 'Ella',
                      rooms: '22',
                      status: 'Active',
                    },
                    {
                      id: 'PROP-103',
                      hotel: 'City Center Inn',
                      location: 'Colombo',
                      rooms: '30',
                      status: 'Pending',
                    },
                  ].map((row) => (
                    <tr key={row.id} style={{ borderTop: '1px solid #1e293b' }}>
                      <td style={{ padding: '0.55rem' }}>{row.id}</td>
                      <td style={{ padding: '0.55rem' }}>{row.hotel}</td>
                      <td style={{ padding: '0.55rem' }}>{row.location}</td>
                      <td style={{ padding: '0.55rem' }}>{row.rooms}</td>
                      <td style={{ padding: '0.55rem' }}>{row.status}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </section>

          <section style={{ background: 'rgba(30, 41, 59, 0.7)', backdropFilter: 'blur(16px)', boxShadow: '0 8px 32px rgba(0, 0, 0, 0.15)', border: '1px solid #1e293b', borderRadius: 12, padding: 16, marginTop: '1rem' }}>
            <h2 style={{ margin: 0, color: '#f8fafc', fontSize: '1.25rem' }}>Your Notifications</h2>
            <div style={{ marginTop: 12, display: 'grid', gap: '0.75rem' }}>
              {[
                { id: 1, message: 'Hotel partner rate refresh for peak season.', type: 'Update', date: '2026-04-01' },
                { id: 3, message: 'New traveler offer for camping packages.', type: 'Offer', date: '2026-04-02' }
              ].map(n => (
                <div key={n.id} style={{ padding: '0.75rem', background: 'rgba(15, 23, 42, 0.65)', backdropFilter: 'blur(20px)', border: '1px solid #1e293b', borderRadius: 8, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <div>
                    <span style={{ fontSize: '0.75rem', padding: '0.2rem 0.4rem', background: n.type === 'Update' ? '#065f46' : '#1e3a8a', color: '#fff', borderRadius: 4, marginRight: '0.5rem' }}>{n.type}</span>
                    <span style={{ color: '#e2e8f0' }}>{n.message}</span>
                  </div>
                  <span style={{ color: '#94a3b8', fontSize: '0.85rem' }}>{n.date}</span>
                </div>
              ))}
            </div>
          </section>
        </main>
      </div>
    </div>
  );
}