import { useParams } from '@tanstack/react-router';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

export default function StudentDetailPage() {
  const { studentId } = useParams({ from: '/erp/students/$studentId' });

  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold">Student Details</h1>
      <Card>
        <CardHeader>
          <CardTitle>Student ID: {studentId}</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-muted-foreground">Student profile details</p>
        </CardContent>
      </Card>
    </div>
  );
}
