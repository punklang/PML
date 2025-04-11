export function truncateAddress(address: string): string {
  if (!address) return '';
  const start = address.slice(0, 4);
  const end = address.slice(-4);
  return `${start}...${end}`;
}

export function copyToClipboard(text: string): void {
  navigator.clipboard.writeText(text).catch(console.error);
}

export function formatDate(date: Date): string {
  return new Intl.DateTimeFormat('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
  }).format(date);
} 