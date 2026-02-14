import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

export default function MyTimetablePage() {
  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold">My Timetable</h1>
      <Card>
        <CardHeader>
          <CardTitle>Class Schedule</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-muted-foreground">Your timetable view</p>
        </CardContent>
      </Card>
    </div>
  );
}
