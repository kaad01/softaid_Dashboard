import { redirect } from 'next/navigation';

export default function Home() {
  // Weiterleitung zur Anmeldeseite
  redirect('/login');
}