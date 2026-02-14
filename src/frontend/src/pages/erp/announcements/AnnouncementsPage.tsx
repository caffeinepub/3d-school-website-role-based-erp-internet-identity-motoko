import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

export default function AnnouncementsPage() {
  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold">Announcements</h1>
      <Card>
        <CardHeader>
          <CardTitle>School Announcements</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-muted-foreground">Announcement management</p>
        </CardContent>
      </Card>
    </div>
  );
}
