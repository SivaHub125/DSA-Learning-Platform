import { AlgorithmPage } from '@/components/AlgorithmPage';

interface PageProps {
  params: Promise<{ id: string }>;
}

export default async function Page({ params }: PageProps) {
  const { id } = await params;
  return <AlgorithmPage id={id} />;
}
