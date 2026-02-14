import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

export default function TimetableEditorPage() {
  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold">Timetable Editor</h1>
      <Card>
        <CardHeader>
          <CardTitle>Create/Edit Timetables</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-muted-foreground">Timetable management interface</p>
        </CardContent>
      </Card>
    </div>
  );
}
