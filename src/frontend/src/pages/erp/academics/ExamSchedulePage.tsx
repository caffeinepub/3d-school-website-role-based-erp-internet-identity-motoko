import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

export default function ExamSchedulePage() {
  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold">Exam Schedule</h1>
      <Card>
        <CardHeader>
          <CardTitle>Upcoming Exams</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-muted-foreground">Exam schedule view</p>
        </CardContent>
      </Card>
    </div>
  );
}
