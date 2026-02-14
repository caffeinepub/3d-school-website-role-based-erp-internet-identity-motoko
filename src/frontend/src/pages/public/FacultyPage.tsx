import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';

export default function FacultyPage() {
  const facultyMembers = [
    { name: 'Dr. Sarah Johnson', role: 'Principal', initials: 'SJ' },
    { name: 'Prof. Michael Chen', role: 'Vice Principal', initials: 'MC' },
    { name: 'Ms. Emily Rodriguez', role: 'Head of Elementary', initials: 'ER' },
    { name: 'Mr. David Thompson', role: 'Head of Middle School', initials: 'DT' },
    { name: 'Dr. Lisa Anderson', role: 'Head of High School', initials: 'LA' },
    { name: 'Mr. James Wilson', role: 'Athletics Director', initials: 'JW' },
  ];

  return (
    <div className="container mx-auto px-4 py-16">
      <h1 className="mb-8 text-4xl font-bold">Our Faculty</h1>

      <div className="prose prose-lg mb-12 max-w-none dark:prose-invert">
        <p>
          Our dedicated team of educators brings decades of combined experience and a passion for teaching. 
          Each faculty member is committed to providing personalized attention and fostering a love of learning 
          in every student.
        </p>
      </div>

      <h2 className="mb-6 text-2xl font-semibold">Leadership Team</h2>
      <div className="mb-12 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {facultyMembers.map((member) => (
          <Card key={member.name}>
            <CardHeader className="flex flex-row items-center gap-4">
              <Avatar className="h-16 w-16">
                <AvatarFallback className="bg-primary text-primary-foreground">
                  {member.initials}
                </AvatarFallback>
              </Avatar>
              <div>
                <CardTitle className="text-lg">{member.name}</CardTitle>
                <p className="text-sm text-muted-foreground">{member.role}</p>
              </div>
            </CardHeader>
          </Card>
        ))}
      </div>

      <div className="grid gap-8 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>Our Teaching Philosophy</CardTitle>
          </CardHeader>
          <CardContent>
            <p>
              We believe in student-centered learning that encourages critical thinking, creativity, and 
              collaboration. Our teachers create engaging, inclusive classrooms where every student feels 
              valued and supported.
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Professional Development</CardTitle>
          </CardHeader>
          <CardContent>
            <p>
              Our faculty participates in ongoing professional development to stay current with the latest 
              educational research and teaching methodologies, ensuring our students receive the best possible 
              education.
            </p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
