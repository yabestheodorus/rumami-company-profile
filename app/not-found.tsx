import Link from 'next/link';
import PageOrnament from '@/components/layout/PageOrnament';

export default function NotFound() {
  return (
    <main className="relative flex flex-col items-center justify-center min-h-[100dvh] bg-background text-dark px-6 overflow-hidden">
      <PageOrnament />

      <div className="relative z-10 flex flex-col items-center justify-center text-center">
        <span className="font-sans text-xs tracking-[0.2em] uppercase text-gray-500 mb-8">
          ERROR
        </span>

        <h1 className="relative font-serif text-[clamp(8rem,20vw,24rem)] leading-[0.8] tracking-[-0.02em] text-dark">
          404
          <span className="absolute top-[40%] left-1/2 -translate-x-1/2 -translate-y-1/2 font-script text-textAccent text-[clamp(6rem,15vw,18rem)] leading-none -rotate-6 whitespace-nowrap z-10 pointer-events-none capitalize">
            Lost
          </span>
        </h1>

        <p className="font-sans text-dark text-lg md:text-[1.35rem] max-w-md mt-24 md:mt-32 leading-relaxed">
          It seems you have ventured<br />
          into uncharted territory.
        </p>

        <Link 
          href="/" 
          className="mt-16 font-sans text-textAccent uppercase tracking-[0.1em] text-sm font-medium flex items-center gap-3 hover:opacity-70 transition-opacity"
        >
          <span aria-hidden className="text-lg leading-none">&raquo;</span> RETURN HOME
        </Link>
      </div>
    </main>
  );
}
