import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

export default function AssignmentsPage() {
  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold">Assignments</h1>
      <Card>
        <CardHeader>
          <CardTitle>Assignment Portal</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-muted-foreground">Assignment management</p>
        </CardContent>
      </Card>
    </div>
  );
}
