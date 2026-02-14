import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

export default function MarkAttendancePage() {
  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold">Mark Attendance</h1>
      <Card>
        <CardHeader>
          <CardTitle>Attendance Entry</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-muted-foreground">Mark attendance for class</p>
        </CardContent>
      </Card>
    </div>
  );
}
