import Image from 'next/image';
import React from 'react';

const Header: React.FC = () => {
  return (
    <div className="flex justify-center w-2/4">
      <Image src="/icons/logo-rect.svg" alt="Logo" width={2000} height={2000} quality={100} />
    </div>
  );
};

export default Header;