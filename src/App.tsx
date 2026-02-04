import { Header } from "./components/Header";
import { ManagerCard } from "./components/ManagerCard";
import { managers } from "./data/managers";

function App() {
  return (
    <div className="h-screen w-screen bg-[#f4f4f4] flex flex-col overflow-hidden relative">
      {/* Carbon subtle grid overlay */}
      <div
        className="absolute inset-0 pointer-events-none opacity-[0.02]"
        style={{
          backgroundImage: `
            linear-gradient(to right, #000 1px, transparent 1px),
            linear-gradient(to bottom, #000 1px, transparent 1px)
          `,
          backgroundSize: '16px 16px'
        }}
      />
      {/* Focus overlay */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background: 'radial-gradient(circle at center, transparent 0%, rgba(255, 255, 255, 0.2) 100%)'
        }}
      />
      {/* Minimal Header */}
      <Header />

      {/* Main Content */}
      <main className="flex-1 flex items-start lg:items-center justify-center px-6 md:px-10 lg:px-12 py-6 md:py-8 relative z-10 overflow-y-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8 w-full max-w-[1584px] lg:h-[75vh] lg:min-h-[600px] lg:max-h-[800px]">
          {managers.map((manager) => (
            <ManagerCard key={manager.id} {...manager} />
          ))}
        </div>
      </main>
    </div>
  );
}

export default App;
