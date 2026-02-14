import { useParams } from '@tanstack/react-router';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

export default function ReportCardPrintPage() {
  const { studentId } = useParams({ from: '/erp/grades/report-card/$studentId' });

  return (
    <div className="space-y-6 print:p-8">
      <h1 className="text-3xl font-bold print:text-2xl">Report Card</h1>
      <Card>
        <CardHeader>
          <CardTitle>Student ID: {studentId}</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-muted-foreground">Printable report card</p>
        </CardContent>
      </Card>
    </div>
  );
}
