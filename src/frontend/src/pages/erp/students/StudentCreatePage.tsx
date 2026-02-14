import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

export default function StudentCreatePage() {
  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold">Register New Student</h1>
      <Card>
        <CardHeader>
          <CardTitle>Student Registration Form</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-muted-foreground">Student registration interface</p>
        </CardContent>
      </Card>
    </div>
  );
}
