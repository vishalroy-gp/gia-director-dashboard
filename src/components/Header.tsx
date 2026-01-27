import giaLogo from "@/assets/logo.png";

export function Header() {
  return (
    <header className="h-16 w-full bg-white border-b border-carbon-gray-20 px-carbon-07 flex items-center shadow-sm relative z-10">
      <div className="flex items-center gap-carbon-04">
        <img src={giaLogo} alt="Gia" className="h-10" />
        <h1 className="text-xl font-light tracking-wide text-carbon-gray-100">
          DIRECTOR DASHBOARD
        </h1>
      </div>
    </header>
  );
}
