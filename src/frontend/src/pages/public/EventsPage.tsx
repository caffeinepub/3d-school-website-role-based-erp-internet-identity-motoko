import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Calendar } from 'lucide-react';

export default function EventsPage() {
  const upcomingEvents = [
    {
      title: 'Spring Open House',
      date: 'March 15, 2026',
      description: 'Visit our campus and meet our faculty. Tours available throughout the day.',
    },
    {
      title: 'Science Fair',
      date: 'April 10, 2026',
      description: 'Students showcase their innovative science projects and experiments.',
    },
    {
      title: 'Spring Concert',
      date: 'April 25, 2026',
      description: 'Our music students perform in the annual spring concert.',
    },
    {
      title: 'Sports Day',
      date: 'May 5, 2026',
      description: 'Annual athletics competition featuring track and field events.',
    },
    {
      title: 'Art Exhibition',
      date: 'May 20, 2026',
      description: 'Showcasing student artwork from all grade levels.',
    },
    {
      title: 'Graduation Ceremony',
      date: 'June 10, 2026',
      description: 'Celebrating our graduating class of 2026.',
    },
  ];

  return (
    <div className="container mx-auto px-4 py-16">
      <h1 className="mb-8 text-4xl font-bold">Events & Activities</h1>

      <div className="mb-12 rounded-lg bg-primary/10 p-6">
        <h2 className="mb-2 text-2xl font-semibold">Stay Connected</h2>
        <p className="text-lg">
          Join us for exciting events throughout the year. From academic showcases to cultural celebrations, 
          there's always something happening at Excellence Academy.
        </p>
      </div>

      <h2 className="mb-6 text-2xl font-semibold">Upcoming Events</h2>
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {upcomingEvents.map((event) => (
          <Card key={event.title}>
            <CardHeader>
              <div className="mb-2 flex items-center gap-2 text-sm text-muted-foreground">
                <Calendar className="h-4 w-4" />
                {event.date}
              </div>
              <CardTitle>{event.title}</CardTitle>
            </CardHeader>
            <CardContent>
              <CardDescription>{event.description}</CardDescription>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
