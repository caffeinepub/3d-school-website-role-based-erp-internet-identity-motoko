import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

export default function LibraryCatalogPage() {
  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold">Library Catalog</h1>
      <Card>
        <CardHeader>
          <CardTitle>Book Catalog</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-muted-foreground">Library catalog interface</p>
        </CardContent>
      </Card>
    </div>
  );
}
