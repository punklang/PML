'use client';

import { useWallet } from '@/components/WalletProvider';
import { WalletMultiButton } from '@solana/wallet-adapter-react-ui';

export default function WalletConnect() {
  const { connected, address } = useWallet();

  return (
    <div className="flex items-center gap-4">
      {connected && address && (
        <div className="text-sm text-gray-600">
          {address.slice(0, 4)}...{address.slice(-4)}
        </div>
      )}
      <WalletMultiButton className="!bg-black hover:!bg-gray-800" />
    </div>
  );
} 