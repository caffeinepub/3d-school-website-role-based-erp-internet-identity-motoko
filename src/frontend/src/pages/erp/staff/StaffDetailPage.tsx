import { useParams } from '@tanstack/react-router';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

export default function StaffDetailPage() {
  const { staffId } = useParams({ from: '/erp/staff/$staffId' });

  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold">Staff Details</h1>
      <Card>
        <CardHeader>
          <CardTitle>Staff ID: {staffId}</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-muted-foreground">Staff profile details</p>
        </CardContent>
      </Card>
    </div>
  );
}
