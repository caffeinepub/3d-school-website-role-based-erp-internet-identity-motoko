import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

export default function LibraryLoansPage() {
  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold">Library Loans</h1>
      <Card>
        <CardHeader>
          <CardTitle>Book Checkouts</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-muted-foreground">Loan management interface</p>
        </CardContent>
      </Card>
    </div>
  );
}
