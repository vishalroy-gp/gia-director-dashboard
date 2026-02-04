import giaLogo from "@/assets/logo.png";

export function Header() {
  return (
    <header className="h-[48px] w-full bg-white border-b border-border px-4 md:px-8 flex items-center justify-between relative z-10">
      <div className="flex items-center gap-4">
        <img src={giaLogo} alt="Gia" className="h-[20px]" />
        <div className="w-[1px] h-4 bg-border"></div>
        <h1 className="text-[14px] font-semibold tracking-[0.16px] text-foreground uppercase">
          Director Dashboard
        </h1>
      </div>
    </header>
  );
}
