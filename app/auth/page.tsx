import AuthForm from "../../components/AuthForm";

export default function Home() {
  return (
    <main 
      className="min-h-screen bg-black text-white flex items-center justify-center bg-cover bg-center bg-no-repeat relative"
      style={{ backgroundImage: "url('/tea-plantation-bg.png')" }}
    >
      <div className="absolute inset-0 bg-black/60 backdrop-blur-sm"></div>
      <div className="relative z-10 w-full flex justify-center px-4 py-8 overflow-y-auto max-h-screen">
        <AuthForm />
      </div>
    </main>
  );
}