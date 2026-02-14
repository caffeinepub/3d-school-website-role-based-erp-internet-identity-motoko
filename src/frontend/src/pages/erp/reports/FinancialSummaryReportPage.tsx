import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

export default function FinancialSummaryReportPage() {
  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold">Financial Summary</h1>
      <Card>
        <CardHeader>
          <CardTitle>Fee Collection Summary</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-muted-foreground">Financial report data</p>
        </CardContent>
      </Card>
    </div>
  );
}
