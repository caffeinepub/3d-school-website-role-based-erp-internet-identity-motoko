import { useParams } from '@tanstack/react-router';
import { Card } from '@/components/ui/card';

export default function StudentIdCardPage() {
  const { studentId } = useParams({ from: '/erp/students/$studentId/id-card' });

  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold">Student ID Card</h1>
      <Card className="mx-auto max-w-md">
        <div
          className="relative h-64 bg-cover bg-center p-6"
          style={{ backgroundImage: 'url(/assets/generated/id-card-bg.dim_1050x650.png)' }}
        >
          <p className="text-sm font-semibold">Excellence Academy</p>
          <p className="mt-4 text-xs">Student ID: {studentId}</p>
        </div>
      </Card>
    </div>
  );
}
