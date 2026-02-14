import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

export default function AcademicsPage() {
  return (
    <div className="container mx-auto px-4 py-16">
      <h1 className="mb-8 text-4xl font-bold">Academic Programs</h1>

      <Tabs defaultValue="elementary" className="w-full">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="elementary">Elementary</TabsTrigger>
          <TabsTrigger value="middle">Middle School</TabsTrigger>
          <TabsTrigger value="high">High School</TabsTrigger>
        </TabsList>

        <TabsContent value="elementary" className="mt-8">
          <div className="grid gap-6 md:grid-cols-2">
            <Card>
              <CardHeader>
                <CardTitle>Core Curriculum</CardTitle>
                <CardDescription>Grades 1-5</CardDescription>
              </CardHeader>
              <CardContent>
                <ul className="list-inside list-disc space-y-2">
                  <li>Language Arts & Reading</li>
                  <li>Mathematics</li>
                  <li>Science</li>
                  <li>Social Studies</li>
                  <li>Physical Education</li>
                  <li>Arts & Music</li>
                </ul>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Special Programs</CardTitle>
                <CardDescription>Enrichment opportunities</CardDescription>
              </CardHeader>
              <CardContent>
                <ul className="list-inside list-disc space-y-2">
                  <li>STEM Lab</li>
                  <li>Creative Arts</li>
                  <li>Library & Media</li>
                  <li>Character Education</li>
                </ul>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="middle" className="mt-8">
          <div className="grid gap-6 md:grid-cols-2">
            <Card>
              <CardHeader>
                <CardTitle>Core Subjects</CardTitle>
                <CardDescription>Grades 6-8</CardDescription>
              </CardHeader>
              <CardContent>
                <ul className="list-inside list-disc space-y-2">
                  <li>English Language Arts</li>
                  <li>Advanced Mathematics</li>
                  <li>Life & Physical Sciences</li>
                  <li>World History & Geography</li>
                  <li>Foreign Languages</li>
                  <li>Technology & Computing</li>
                </ul>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Electives</CardTitle>
                <CardDescription>Choose your path</CardDescription>
              </CardHeader>
              <CardContent>
                <ul className="list-inside list-disc space-y-2">
                  <li>Band & Orchestra</li>
                  <li>Visual Arts</li>
                  <li>Drama & Theater</li>
                  <li>Robotics</li>
                  <li>Sports Programs</li>
                </ul>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="high" className="mt-8">
          <div className="grid gap-6 md:grid-cols-2">
            <Card>
              <CardHeader>
                <CardTitle>College Prep</CardTitle>
                <CardDescription>Grades 9-12</CardDescription>
              </CardHeader>
              <CardContent>
                <ul className="list-inside list-disc space-y-2">
                  <li>Advanced Placement (AP) Courses</li>
                  <li>Honors Programs</li>
                  <li>College Counseling</li>
                  <li>SAT/ACT Preparation</li>
                  <li>Dual Enrollment Options</li>
                </ul>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Career Pathways</CardTitle>
                <CardDescription>Prepare for the future</CardDescription>
              </CardHeader>
              <CardContent>
                <ul className="list-inside list-disc space-y-2">
                  <li>STEM Academy</li>
                  <li>Business & Entrepreneurship</li>
                  <li>Arts & Humanities</li>
                  <li>Health Sciences</li>
                  <li>Internship Programs</li>
                </ul>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
}
