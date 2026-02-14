import { useParams } from '@tanstack/react-router';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

export default function ReceiptPrintPage() {
  const { feeId } = useParams({ from: '/erp/fees/receipt/$feeId' });

  return (
    <div className="space-y-6 print:p-8">
      <h1 className="text-3xl font-bold print:text-2xl">Payment Receipt</h1>
      <Card>
        <CardHeader>
          <CardTitle>Receipt #{feeId}</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-muted-foreground">Printable receipt</p>
        </CardContent>
      </Card>
    </div>
  );
}
