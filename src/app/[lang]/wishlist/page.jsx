import WishlistClient from '@/components/WishlistClient';

export default async function WishlistPage({ params }) {
  return <WishlistClient lang={(await params).lang} />;
}

