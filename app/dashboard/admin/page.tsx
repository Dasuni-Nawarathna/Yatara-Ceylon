'use client';

import { useMemo, useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';

type Partner = {
  id: number;
  name: string;
  type: 'Staff' | 'Fleet' | 'Hotel';
  city: string;
  email: string;
};

const initialPartners: Partner[] = [
  { id: 1, name: 'Nimal Perera', type: 'Staff', city: 'Colombo', email: 'nimal@yatara.lk' },
  { id: 2, name: 'Dilshan Fernando', type: 'Fleet', city: 'Galle', email: 'dilshan@fleet.lk' },
  { id: 3, name: 'Sunethra Kumari', type: 'Hotel', city: 'Kandy', email: 'sunethra@hotels.lk' },
  { id: 4, name: 'Mihiri Silva', type: 'Staff', city: 'Negombo', email: 'mihiri@yatara.lk' },
  { id: 5, name: 'Kumar Jayasuriya', type: 'Fleet', city: 'Anuradhapura', email: 'kumar@fleet.lk' },
  { id: 6, name: 'Tharuka Senanayake', type: 'Hotel', city: 'Ella', email: 'tharuka@hotels.lk' },
];

const destinations = [
  { title: 'Sigiriya Rock Fortress', description: 'Ancient rock citadel and UNESCO site with panoramic views.', image: 'https://www.orientations.com.hk/highlights/sigiriya-an-early-designed-landscape-in-sri-lanka' },
  { title: 'Ella Nine Arch Bridge', description: 'Iconic railway bridge in the hills surrounded by tea plantations.', image: 'https://themanduls.com/nine-arch-bridge-ella/' },
  { title: 'Mirissa Beach', description: 'Golden sand and calm water for whale watching and relaxing.', image: 'https://metshutravels.com/mirissa-a-tropical-beach-haven/' },
];

export default function AdminDashboardPage() {
  const router = useRouter();
  const [partners, setPartners] = useState<Partner[]>(initialPartners);
  const [selectedType, setSelectedType] = useState<'All' | 'Staff' | 'Fleet' | 'Hotel'>('All');
  const [userRole, setUserRole] = useState<string | null>(null);

  useEffect(() => {
    const user = localStorage.getItem('user');
    if (user) {
      try {
        const parsedUser = JSON.parse(user);
        setUserRole(parsedUser.role);
        if (parsedUser.role !== 'admin') {
          router.push('/dashboard/staff');
        }
      } catch (e) {
        router.push('/auth');
      }
    } else {
      router.push('/auth');
    }
  }, [router]);

  const handleLogout = () => {
    localStorage.removeItem('user');
    router.push('/');
  };

  const filteredPartners = useMemo(() => {
    if (selectedType === 'All') return partners;
    return partners.filter((p) => p.type === selectedType);
  }, [partners, selectedType]);

  const counts = useMemo(() => ({
    staff: partners.filter((p) => p.type === 'Staff').length,
    fleet: partners.filter((p) => p.type === 'Fleet').length,
    hotel: partners.filter((p) => p.type === 'Hotel').length,
  }), [partners]);

  const handleDelete = (id: number) => {
    if (confirm('Are you sure you want to delete this partner?')) {
      setPartners((prev) => prev.filter((p) => p.id !== id));
    }
  };

  const handleView = (partner: Partner) => {
    alert(`View ${partner.type}: ${partner.name}\nCity: ${partner.city}\nEmail: ${partner.email}`);
  };

  const handleEdit = (partner: Partner) => {
    const newName = prompt('Update name', partner.name);
    if (newName && newName.trim()) {
      setPartners((prev) => prev.map((p) => (p.id === partner.id ? { ...p, name: newName.trim() } : p)));
    }
  };

  return (
    <div style={{ display: 'grid', gridTemplateColumns: '240px 1fr', minHeight: '100vh', fontFamily: 'Inter, system-ui, sans-serif', background: 'transparent', color: '#e2e8f0' }}>
      <aside style={{ background: 'rgba(15, 23, 42, 0.65)', backdropFilter: 'blur(20px)', borderRight: '1px solid #1e293b', padding: '1.25rem' }}>
        <div style={{ marginBottom: '2rem' }}>
          <h2 style={{ margin: 0, fontSize: '1.25rem', color: '#f8fafc' }}>Yatara Admin</h2>
          <p style={{ marginTop: '0.25rem', color: '#94a3b8' }}>Notifications panel</p>
        </div>

        <nav style={{ display: 'grid', gap: '0.25rem' }}>
          {['Dashboard', 'Fleet', 'Hotel', 'Bookings', 'Notifications'].map((item) => {
            const href = item === 'Dashboard' ? '/dashboard' : `/dashboard/${item.toLowerCase()}`;
            const active = item === 'Dashboard';
            return (
              <a key={item} href={href} style={{ textDecoration: 'none', color: active ? '#f8fafc' : '#cbd5e1', padding: '0.65rem 0.75rem', borderRadius: '8px', background: active ? '#1d4ed8' : 'transparent', fontWeight: active ? 600 : 500, border: active ? '1px solid #2563eb' : '1px solid transparent' }}>
                {item}
              </a>
            );
          })}
        </nav>
        <button onClick={handleLogout} style={{ marginTop: '1.5rem', width: '100%', border: '1px solid #334155', background: '#dc2626', color: '#fff', borderRadius: '8px', padding: '0.7rem', cursor: 'pointer' }}>
          Logout
        </button>
      </aside>

      <main style={{ padding: '1.25rem', display: 'flex', flexDirection: 'column', gap: '1rem', background: 'transparent' }}>
        <header style={{ display: 'flex', alignItems: 'baseline', justifyContent: 'space-between', gap: '1rem' }}>
          <div>
            <h1 style={{ margin: 0, fontSize: '2rem' }}>Admin Dashboard</h1>
          </div>
        </header>

        <section style={{ display: 'grid', gridTemplateColumns: 'repeat(3, minmax(0,1fr))', gap: '1rem' }}>
          <article style={{ background: 'rgba(30, 41, 59, 0.7)', backdropFilter: 'blur(16px)', boxShadow: '0 8px 32px rgba(0, 0, 0, 0.15)', border: '1px solid #1e293b', borderRadius: '12px', padding: '1rem' }}>
            <p style={{ margin: 0, color: '#94a3b8', fontWeight: 600 }}>Staff members</p>
            <h3 style={{ margin: '0.4rem 0 0', fontSize: '1.9rem', color: '#f8fafc' }}>{counts.staff}</h3>
          </article>
          <article style={{ background: 'rgba(30, 41, 59, 0.7)', backdropFilter: 'blur(16px)', boxShadow: '0 8px 32px rgba(0, 0, 0, 0.15)', border: '1px solid #1e293b', borderRadius: '12px', padding: '1rem' }}>
            <p style={{ margin: 0, color: '#94a3b8', fontWeight: 600 }}>Fleet partners</p>
            <h3 style={{ margin: '0.4rem 0 0', fontSize: '1.9rem', color: '#f8fafc' }}>{counts.fleet}</h3>
          </article>
          <article style={{ background: 'rgba(30, 41, 59, 0.7)', backdropFilter: 'blur(16px)', boxShadow: '0 8px 32px rgba(0, 0, 0, 0.15)', border: '1px solid #1e293b', borderRadius: '12px', padding: '1rem' }}>
            <p style={{ margin: 0, color: '#94a3b8', fontWeight: 600 }}>Hotel partners</p>
            <h3 style={{ margin: '0.4rem 0 0', fontSize: '1.9rem', color: '#f8fafc' }}>{counts.hotel}</h3>
          </article>
        </section>

        <section style={{ background: 'rgba(30, 41, 59, 0.7)', backdropFilter: 'blur(16px)', boxShadow: '0 8px 32px rgba(0, 0, 0, 0.15)', border: '1px solid #1e293b', borderRadius: '12px', padding: '1rem' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.75rem' }}>
            <h2 style={{ margin: 0, color: '#f8fafc' }}>Partner Management</h2>
            <div style={{ display: 'flex', gap: '0.5rem' }}>
              {(['All', 'Staff', 'Fleet', 'Hotel'] as const).map((filter) => (
                <button key={filter} onClick={() => setSelectedType(filter)} style={{ background: selectedType === filter ? '#1d4ed8' : '#0f172a', color: selectedType === filter ? '#fff' : '#cbd5e1', border: '1px solid #334155', borderRadius: '999px', padding: '0.35rem 0.8rem', cursor: 'pointer' }}>
                  {filter}
                </button>
              ))}
            </div>
          </div>

          <div style={{ overflowX: 'auto' }}>
            <table style={{ width: '100%', borderCollapse: 'collapse' }}>
              <thead>
                <tr style={{ borderBottom: '1px solid #334155' }}>
                  <th style={{ textAlign: 'left', padding: '0.6rem', color: '#94a3b8' }}>#</th>
                  <th style={{ textAlign: 'left', padding: '0.6rem', color: '#94a3b8' }}>Name</th>
                  <th style={{ textAlign: 'left', padding: '0.6rem', color: '#94a3b8' }}>Type</th>
                  <th style={{ textAlign: 'left', padding: '0.6rem', color: '#94a3b8' }}>City</th>
                  <th style={{ textAlign: 'left', padding: '0.6rem', color: '#94a3b8' }}>Email</th>
                  <th style={{ textAlign: 'left', padding: '0.6rem', color: '#94a3b8' }}>Actions</th>
                </tr>
              </thead>
              <tbody>
                {filteredPartners.length === 0 ? (
                  <tr>
                    <td colSpan={6} style={{ padding: '1rem', textAlign: 'center', color: '#64748b' }}>
                      No partners found.
                    </td>
                  </tr>
                ) : (
                  filteredPartners.map((p) => (
                    <tr key={p.id} style={{ borderBottom: '1px solid #e2e8f0' }}>
                      <td style={{ padding: '0.65rem' }}>{p.id}</td>
                      <td style={{ padding: '0.65rem' }}>{p.name}</td>
                      <td style={{ padding: '0.65rem' }}>{p.type}</td>
                      <td style={{ padding: '0.65rem' }}>{p.city}</td>
                      <td style={{ padding: '0.65rem' }}>{p.email}</td>
                      <td style={{ padding: '0.65rem', display: 'flex', gap: '0.35rem' }}>
                        <button onClick={() => handleView(p)} style={{ border: '1px solid #60a5fa', background: '#1d4ed8', color: '#ffffff', borderRadius: '6px', padding: '0.35rem 0.6rem', cursor: 'pointer' }}>View</button>
                        <button onClick={() => handleEdit(p)} style={{ border: '1px solid #a78bfa', background: '#065f46', color: '#f8fafc', borderRadius: '6px', padding: '0.35rem 0.6rem', cursor: 'pointer' }}>Edit</button>
                        <button onClick={() => handleDelete(p.id)} style={{ border: '1px solid #fca5a5', background: '#dc2626', color: '#ffffff', borderRadius: '6px', padding: '0.35rem 0.6rem', cursor: 'pointer' }}>Delete</button>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </section>

        <section style={{ display: 'grid', gap: '1rem' }}>
          <h2 style={{ color: '#f8fafc' }}>Scenic Destinations in Sri Lanka</h2>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '1rem' }}>
            {destinations.map((dest) => (
              <article key={dest.title} style={{ borderRadius: '12px', overflow: 'hidden', border: '1px solid #1e293b', boxShadow: '0 10px 28px rgba(15, 23, 42, 0.4)', background: '#0b1222' }}>
                <div style={{ height: '140px', backgroundImage: `url(${dest.image})`, backgroundSize: 'cover', backgroundPosition: 'center' }} />
                <div style={{ padding: '0.85rem' }}>
                  <h3 style={{ margin: '0 0 0.35rem', fontSize: '1.05rem', color: '#f8fafc' }}>{dest.title}</h3>
                  <p style={{ margin: 0, color: '#94a3b8', fontSize: '0.92rem' }}>{dest.description}</p>
                </div>
              </article>
            ))}
          </div>
        </section>
      </main>
    </div>
  );
}
