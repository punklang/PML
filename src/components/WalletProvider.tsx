'use client';

import { createContext, useContext, ReactNode } from 'react';
import { useWallet as useSolanaWallet } from '@solana/wallet-adapter-react';
import { WalletMultiButton } from '@solana/wallet-adapter-react-ui';
import { ConnectionProvider, WalletProvider as SolanaWalletProvider } from '@solana/wallet-adapter-react';
import { WalletAdapterNetwork } from '@solana/wallet-adapter-base';
import { PhantomWalletAdapter } from '@solana/wallet-adapter-wallets';
import { clusterApiUrl } from '@solana/web3.js';
import { useMemo } from 'react';

require('@solana/wallet-adapter-react-ui/styles.css');

interface WalletContextType {
  connected: boolean;
  address: string | null;
  connect: () => void;
  disconnect: () => void;
}

const WalletContext = createContext<WalletContextType | undefined>(undefined);

export function WalletProvider({ children }: { children: ReactNode }) {
  const network = WalletAdapterNetwork.Devnet;
  const endpoint = useMemo(() => clusterApiUrl(network), [network]);
  const wallets = useMemo(() => [new PhantomWalletAdapter()], []);

  return (
    <ConnectionProvider endpoint={endpoint}>
      <SolanaWalletProvider wallets={wallets} autoConnect>
        <WalletContextWrapper>{children}</WalletContextWrapper>
      </SolanaWalletProvider>
    </ConnectionProvider>
  );
}

function WalletContextWrapper({ children }: { children: ReactNode }) {
  const { connected, publicKey, disconnect } = useSolanaWallet();

  const connect = () => {
    // The WalletMultiButton component handles the actual connection
    return null;
  };

  return (
    <WalletContext.Provider 
      value={{ 
        connected, 
        address: publicKey?.toBase58() || null, 
        connect, 
        disconnect 
      }}
    >
      {children}
    </WalletContext.Provider>
  );
}

export function useWallet() {
  const context = useContext(WalletContext);
  if (context === undefined) {
    throw new Error('useWallet must be used within a WalletProvider');
  }
  return context;
}

export { WalletMultiButton }; 