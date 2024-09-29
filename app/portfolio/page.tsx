import Portfolio from '@/app/components/Portfolio';

export default async function PortfolioPage() {
  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Portfolio</h1>
      <Portfolio />
    </div>
  );
}
