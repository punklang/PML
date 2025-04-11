'use client';

import { useWallet } from '@solana/wallet-adapter-react';
import { WalletMultiButton } from '@solana/wallet-adapter-react-ui';
import { truncateAddress } from '@/utils/helpers';

export function WalletConnect() {
  const { publicKey } = useWallet();

  return (
    <div className="flex items-center justify-end mb-8">
      <WalletMultiButton className="btn-primary" />
      {publicKey && (
        <span className="ml-4 text-sm opacity-70">
          Connected: {truncateAddress(publicKey.toString())}
        </span>
      )}
    </div>
  );
} 