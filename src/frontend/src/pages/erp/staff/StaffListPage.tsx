import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

export default function StaffListPage() {
  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold">Staff Management</h1>
      <Card>
        <CardHeader>
          <CardTitle>Staff List</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-muted-foreground">Staff management interface</p>
        </CardContent>
      </Card>
    </div>
  );
}
