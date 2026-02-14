import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

export default function GradebookPage() {
  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold">Gradebook</h1>
      <Card>
        <CardHeader>
          <CardTitle>Student Grades</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-muted-foreground">Grade management interface</p>
        </CardContent>
      </Card>
    </div>
  );
}
