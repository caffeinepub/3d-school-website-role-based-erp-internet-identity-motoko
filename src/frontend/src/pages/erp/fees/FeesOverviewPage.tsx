import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

export default function FeesOverviewPage() {
  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold">Fee Management</h1>
      <Card>
        <CardHeader>
          <CardTitle>Fee Overview</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-muted-foreground">Fee management interface</p>
        </CardContent>
      </Card>
    </div>
  );
}
