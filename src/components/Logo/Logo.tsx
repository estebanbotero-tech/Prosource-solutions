import React from 'react';
import Image from 'next/image';

interface LogoProps {
  className?: string;
  variant?: 'header' | 'footer';
}

export default function Logo({ className, variant = 'footer' }: LogoProps) {
  const imgSrc = variant === 'header' ? '/logo-header.webp' : '/logo.webp';
  
  // Header logo is just the icon, should be small like a standard icon
  const width = variant === 'header' ? 45 : 200;
  const height = variant === 'header' ? 45 : 70;

  return (
    <div className={className} style={{ position: 'relative', display: 'flex', alignItems: 'center' }}>
      <Image
        src={imgSrc}
        alt="Prosource Logo"
        width={width}
        height={height}
        style={{ objectFit: 'contain', width: `${width}px`, height: `${height}px` }}
        className={variant === 'header' ? 'onlyLight' : undefined}
        priority
        unoptimized
      />
      {/* Dark mode: same icon with the blue figures in white */}
      {variant === 'header' && (
        <Image
          src="/logo-header-white.webp"
          alt="Prosource Logo"
          width={width}
          height={height}
          style={{ objectFit: 'contain', width: `${width}px`, height: `${height}px` }}
          className="onlyDark"
          unoptimized
        />
      )}
    </div>
  );
}
