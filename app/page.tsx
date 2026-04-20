'use client';

import Link from 'next/link';
import { useState, useEffect } from 'react';

export default function Home() {
  const [showNotifications, setShowNotifications] = useState(false);
  const [user, setUser] = useState<any>(null);
  const notifications = [
    {
      id: 1,
      title: 'Hotel Partner Rate Update',
      description: 'All hotel partner rates have been refreshed for the upcoming peak season. Please review and confirm your updated pricing.',
      date: '2026-04-03',
      type: 'Partner Update',
      priority: 'high'
    },
    {
      id: 2,
      title: 'Fleet Maintenance Schedule',
      description: 'Peak-season fleet maintenance is scheduled for April 15-20. All vehicles will be inspected and serviced during this period.',
      date: '2026-04-02',
      type: 'Maintenance',
      priority: 'medium'
    },
    {
      id: 3,
      title: 'New Traveler Promotion',
      description: 'Exciting new promotion available for travelers booking packages worth LKR 100,000 or more. 15% discount on all destinations.',
      date: '2026-04-01',
      type: 'Promotion',
      priority: 'high'
    },
    {
      id: 4,
      title: 'Staff Training Update',
      description: 'Monthly staff training session scheduled for April 10th. All team members are required to attend the customer service workshop.',
      date: '2026-03-30',
      type: 'Training',
      priority: 'low'
    },
    {
      id: 5,
      title: 'System Maintenance Notice',
      description: 'Scheduled system maintenance on April 5th from 2:00 AM to 4:00 AM. Services may be temporarily unavailable.',
      date: '2026-03-28',
      type: 'System',
      priority: 'medium'
    }
  ];

  const notificationCount = notifications.length;

  useEffect(() => {
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
  }, []);

  return (
    <div style={{ minHeight: '100vh', background: '#0a0e27', color: '#fff', fontFamily: 'Inter, system-ui, sans-serif' }}>
      <header style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '1rem 2rem', borderBottom: '1px solid #1e2d4a' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
          <div style={{ fontSize: '1.5rem', fontWeight: 'bold' }}>⚡</div>
          <span style={{ fontWeight: 600 }}>YATARA CEYLON</span>
        </div>

        <nav style={{ display: 'flex', gap: '2rem', alignItems: 'center' }}>
          {['Journeys', 'Destinations', 'Transfers', 'Bespoke Tour', 'About', 'Guide'].map((item) => (
            <a key={item} href='#' style={{ color: '#cbd5e1', textDecoration: 'none', fontSize: '0.9rem', fontWeight: 500 }}>
              {item}
            </a>
          ))}

          <div style={{ display: 'flex', alignItems: 'center', gap: '1.5rem', position: 'relative' }}>
            {user && (
              <button
                onClick={() => setShowNotifications((open) => !open)}
                style={{ position: 'relative', cursor: 'pointer', border: 'none', background: 'transparent', padding: 0 }}
                aria-label='Notifications'
              >
                <span style={{ fontSize: '1.5rem' }}>🔔</span>
                {notificationCount > 0 && (
                  <span style={{ position: 'absolute', top: -8, right: -8, background: '#dc2626', color: '#fff', borderRadius: '50%', width: 20, height: 20, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '0.75rem', fontWeight: 'bold' }}>
                    {notificationCount}
                  </span>
                )}
              </button>
            )}

            {showNotifications && user && (
              <div style={{ position: 'absolute', right: 0, top: 48, width: 380, background: '#0f172a', border: '1px solid #334155', borderRadius: 12, boxShadow: '0 12px 24px rgba(0,0,0,0.35)', padding: '1rem', zIndex: 1000, maxHeight: '500px', overflowY: 'auto' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem' }}>
                  <strong style={{ color: '#cbd5e1', fontSize: '1.1rem' }}>Latest Notifications</strong>
                  <span style={{ color: '#64748b', fontSize: '0.8rem' }}>{notificationCount} total</span>
                </div>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
                  {notifications.map((notification) => (
                    <div key={notification.id} style={{ padding: '0.75rem', background: '#1e293b', borderRadius: 8, borderLeft: `4px solid ${notification.priority === 'high' ? '#dc2626' : notification.priority === 'medium' ? '#f59e0b' : '#10b981'}` }}>
                      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '0.5rem' }}>
                        <h4 style={{ color: '#f1f5f9', fontSize: '0.95rem', fontWeight: '600', margin: 0 }}>{notification.title}</h4>
                        <span style={{ color: '#64748b', fontSize: '0.75rem', background: '#334155', padding: '0.2rem 0.5rem', borderRadius: 4, fontWeight: '500' }}>{notification.type}</span>
                      </div>
                      <p style={{ color: '#cbd5e1', fontSize: '0.85rem', lineHeight: 1.4, margin: '0 0 0.5rem 0' }}>{notification.description}</p>
                      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                        <span style={{ color: '#64748b', fontSize: '0.75rem' }}>{new Date(notification.date).toLocaleDateString()}</span>
                        <span style={{ color: notification.priority === 'high' ? '#dc2626' : notification.priority === 'medium' ? '#f59e0b' : '#10b981', fontSize: '0.75rem', fontWeight: '600', textTransform: 'uppercase' }}>{notification.priority}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            <span style={{ color: '#64748b' }}>🪙</span>
            <span style={{ color: '#f59e0b' }} title='Sri Lankan Rupee'>
              LKR
            </span>

            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
              {user && <span style={{ color: '#cbd5e1', fontSize: '0.9rem' }}>Welcome, {user.fullName || user.email}</span>}

              <Link href='/' style={{ background: '#0f172a', color: '#cbd5e1', borderRadius: 999, padding: '0.35rem 0.9rem', textDecoration: 'none', fontWeight: 600, fontSize: '0.8rem', border: '1px solid #334155' }}>
                Home
              </Link>

              <Link href='/auth' style={{ background: '#fbbf24', color: '#000', borderRadius: 999, padding: '0.35rem 0.9rem', textDecoration: 'none', fontWeight: 600, fontSize: '0.8rem' }}>
                LOGIN
              </Link>

              {user && (
                <>
                  <Link href='/packages' style={{ background: '#0ea5e9', color: '#fff', borderRadius: 999, padding: '0.35rem 0.9rem', textDecoration: 'none', fontWeight: 600, fontSize: '0.8rem' }}>
                    My Packages
                  </Link>
                  <Link href='/profile' style={{ background: '#0284c7', color: '#fff', borderRadius: 999, padding: '0.35rem 0.9rem', textDecoration: 'none', fontWeight: 600, fontSize: '0.8rem' }}>
                    Profile
                  </Link>
                  <button
                    onClick={() => {
                      localStorage.removeItem('user');
                      setUser(null);
                      setShowNotifications(false);
                    }}
                    style={{ background: '#dc2626', color: '#fff', borderRadius: 999, padding: '0.35rem 0.9rem', border: 'none', fontWeight: 600, fontSize: '0.8rem', cursor: 'pointer' }}
                  >
                    Logout
                  </button>
                </>
              )}
            </div>
          </div>
        </nav>
      </header>

      <main style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', paddingTop: '4rem', paddingBottom: '2rem', textAlign: 'center' }}>
        <p style={{ color: '#f59e0b', fontSize: '0.85rem', fontWeight: 600, letterSpacing: '0.1em', marginBottom: '1rem' }}>YATARA CEYLON</p>

        <h1 style={{ fontSize: '4rem', fontWeight: 700, margin: '0 0 1rem', lineHeight: 1.1 }}>
          Curated Journeys <br />
          <span style={{ color: '#f59e0b', fontStyle: 'italic' }}>Across Sri Lanka</span>
        </h1>

        <p style={{ color: '#cbd5e1', fontSize: '1.1rem', marginBottom: '2.5rem', maxWidth: 600 }}>BESPOKE ITINERARIES CRAFTED BY LOCAL SPECIALISTS.</p>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '1rem', marginBottom: '2rem', maxWidth: 800 }}>
          {['Travel Month', 'Travelers', 'Travel Style'].map((label) => (
            <button key={label} style={{ background: 'transparent', border: '1px solid #334155', borderRadius: 12, padding: '0.75rem 1.25rem', color: '#cbd5e1', cursor: 'pointer', fontWeight: 500 }}>
              📅 {label}
            </button>
          ))}
        </div>

        <Link href='/dashboard/admin' style={{ background: '#334155', color: '#fff', borderRadius: 12, padding: '0.75rem 2rem', textDecoration: 'none', fontWeight: 600, marginBottom: '1.5rem', display: 'inline-block' }}>
          DESIGN MY JOURNEY →
        </Link>

        <p style={{ color: '#64748b', fontSize: '0.85rem' }}>CUSTOM PROPOSAL DELIVERED WITHIN 24 HOURS</p>

        <div style={{ display: 'flex', justifyContent: 'center', gap: '3rem', marginTop: '3rem', color: '#94a3b8' }}>
          <div>500+ ITINERARIES</div>
          <span style={{ color: '#64748b' }}>•</span>
          <div>4.9/5 RATING</div>
          <span style={{ color: '#64748b' }}>•</span>
          <div>LOCAL SPECIALISTS</div>
        </div>
      </main>

      <footer style={{ textAlign: 'center', padding: '2rem', color: '#64748b', borderTop: '1px solid #1e2d4a' }}>
        <p>© 2026 Yatara Ceylon. All rights reserved. Designed for extraordinary journeys.</p>
      </footer>
    </div>
  );
}

