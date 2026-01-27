import { Header } from "./components/Header";
import { ManagerCard } from "./components/ManagerCard";
import { managers } from "./data/managers";

function App() {
  return (
    <div className="h-screen w-screen bg-white flex flex-col overflow-hidden relative">
      {/* Faded Grid Background */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          backgroundImage: `
            linear-gradient(to right, rgba(0, 0, 0, 0.1) 1px, transparent 1px),
            linear-gradient(to bottom, rgba(0, 0, 0, 0.1) 1px, transparent 1px)
          `,
          backgroundSize: '48px 48px'
        }}
      />
      {/* Radial fade overlay */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background: 'radial-gradient(ellipse at center, transparent 0%, rgba(255, 255, 255, 0.7) 70%, rgba(255, 255, 255, 1) 100%)'
        }}
      />
      {/* Minimal Header */}
      <Header />

      {/* Main Content */}
      <main className="flex-1 flex items-start lg:items-center justify-center px-carbon-05 md:px-carbon-06 lg:px-carbon-07 py-carbon-05 md:py-carbon-06 relative z-10 overflow-y-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-carbon-05 md:gap-carbon-06 w-full max-w-[1280px] lg:h-full lg:max-h-[600px]">
          {managers.map((manager) => (
            <ManagerCard key={manager.id} {...manager} />
          ))}
        </div>
      </main>
    </div>
  );
}

export default App;
