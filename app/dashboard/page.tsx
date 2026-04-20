export default function DashboardHomePage() {
  return (
    <main style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', background: 'transparent', color: '#f8fafc', fontFamily: 'Inter, system-ui, sans-serif' }}>
      <div style={{ textAlign: 'center', background: 'rgba(15, 23, 42, 0.65)', backdropFilter: 'blur(16px)', padding: '2rem 3rem', borderRadius: '1rem', border: '1px solid #1e293b', boxShadow: '0 8px 32px rgba(0, 0, 0, 0.2)' }}>
        <h1 style={{ marginBottom: '0.75rem', fontSize: '2.5rem' }}>Dashboard Home</h1>
        <p style={{ margin: 0, fontSize: '1.1rem', color: '#cbd5e1' }}>Use the left nav to switch to admin, staff, fleet, hotel, or notifications dashboards.</p>
      </div>
    </main>
  );
}
