import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Link } from '@tanstack/react-router';

export default function ReportsIndexPage() {
  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold">Reports & Analytics</h1>
      <div className="grid gap-6 md:grid-cols-3">
        <Link to="/erp/reports/attendance">
          <Card className="cursor-pointer transition-shadow hover:shadow-lg">
            <CardHeader>
              <CardTitle>Attendance Report</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground">View attendance statistics</p>
            </CardContent>
          </Card>
        </Link>
        <Link to="/erp/reports/performance">
          <Card className="cursor-pointer transition-shadow hover:shadow-lg">
            <CardHeader>
              <CardTitle>Performance Report</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground">Academic performance data</p>
            </CardContent>
          </Card>
        </Link>
        <Link to="/erp/reports/financial">
          <Card className="cursor-pointer transition-shadow hover:shadow-lg">
            <CardHeader>
              <CardTitle>Financial Report</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground">Fee collection summary</p>
            </CardContent>
          </Card>
        </Link>
      </div>
    </div>
  );
}
