import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

export default function ClassSectionsPage() {
  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold">Class Sections</h1>
      <Card>
        <CardHeader>
          <CardTitle>Manage Classes</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-muted-foreground">Class section management</p>
        </CardContent>
      </Card>
    </div>
  );
}
