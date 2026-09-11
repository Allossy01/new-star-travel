import { NextResponse } from 'next/server';
import { packages as defaultPackages } from '@/lib/data';

// In-memory store for packages (persists during server lifetime on Vercel)
// Falls back to default packages from data.ts on cold start
let serverPackages: typeof defaultPackages | null = null;

function getPackages() {
  if (!serverPackages) serverPackages = [...defaultPackages];
  return serverPackages;
}

export async function GET() {
  return NextResponse.json(getPackages());
}

export async function POST(req: Request) {
  const pkg = await req.json();
  const pkgs = getPackages();
  const exists = pkgs.findIndex(p => p.id === pkg.id);
  if (exists >= 0) {
    pkgs[exists] = pkg;
  } else {
    pkgs.push(pkg);
  }
  serverPackages = pkgs;
  return NextResponse.json({ ok: true });
}

export async function DELETE(req: Request) {
  const { id } = await req.json();
  serverPackages = getPackages().filter(p => p.id !== id);
  return NextResponse.json({ ok: true });
}
