import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

export default function AttendanceReportPage() {
  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold">Attendance Report</h1>
      <Card>
        <CardHeader>
          <CardTitle>Attendance Statistics</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-muted-foreground">Attendance report data</p>
        </CardContent>
      </Card>
    </div>
  );
}
