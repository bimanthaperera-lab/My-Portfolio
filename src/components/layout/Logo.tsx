type LogoProps = {
  onClick?: () => void;
};

export function Logo({ onClick }: LogoProps) {
  return (
    <a
      href="#home"
      onClick={onClick}
      aria-label="Bimantha Perera, back to top"
      className="font-mono text-base font-medium tracking-tight text-ink-50"
    >
      bp<span className="text-accent">.</span>
    </a>
  );
}
