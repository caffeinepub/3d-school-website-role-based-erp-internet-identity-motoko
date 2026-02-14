import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

export default function LeaveRequestsPage() {
  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold">Leave Requests</h1>
      <Card>
        <CardHeader>
          <CardTitle>Manage Leave</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-muted-foreground">Leave request management</p>
        </CardContent>
      </Card>
    </div>
  );
}
