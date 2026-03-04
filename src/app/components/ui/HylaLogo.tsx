import logoDark from "figma:asset/2feac97d50efff953286b27b3c4820dfb3f029b4.png";
import logoLight from "figma:asset/d957db570789ac424a55e9ebe088770122733c80.png";

interface HylaLogoProps {
  className?: string;
  variant?: 'light' | 'dark'; // 'light' = light bg (dark logo), 'dark' = dark bg (white logo)
  color?: string;
  showName?: boolean;
}

export function HylaLogo({ className = "h-12 w-auto", variant = 'light', showName = true }: HylaLogoProps) {
  // 'light' variant = dark logo for light backgrounds
  // 'dark' variant = white logo for dark backgrounds
  const logoSrc = variant === 'dark' ? logoLight : logoDark;

  return (
    <img 
      src={logoSrc}
      alt="Hakan Akkus"
      className={`object-contain ${className}`}
      draggable={false}
    />
  );
}