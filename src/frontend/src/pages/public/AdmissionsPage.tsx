import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Link } from '@tanstack/react-router';

export default function AdmissionsPage() {
  return (
    <div className="container mx-auto px-4 py-16">
      <h1 className="mb-8 text-4xl font-bold">Admissions</h1>

      <div className="mb-12 rounded-lg bg-primary/10 p-6">
        <h2 className="mb-4 text-2xl font-semibold">Now Accepting Applications</h2>
        <p className="mb-4 text-lg">
          We welcome students of all backgrounds who are eager to learn and grow. Our admissions process 
          is designed to identify students who will thrive in our academic environment.
        </p>
        <Link to="/contact">
          <Button size="lg">Contact Admissions Office</Button>
        </Link>
      </div>

      <div className="grid gap-8 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>Application Process</CardTitle>
            <CardDescription>Steps to join Excellence Academy</CardDescription>
          </CardHeader>
          <CardContent>
            <ol className="list-inside list-decimal space-y-3">
              <li>Submit online application form</li>
              <li>Provide academic transcripts</li>
              <li>Schedule entrance assessment</li>
              <li>Attend parent-student interview</li>
              <li>Receive admission decision</li>
              <li>Complete enrollment paperwork</li>
            </ol>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Required Documents</CardTitle>
            <CardDescription>What you'll need to apply</CardDescription>
          </CardHeader>
          <CardContent>
            <ul className="list-inside list-disc space-y-2">
              <li>Completed application form</li>
              <li>Birth certificate</li>
              <li>Previous school records</li>
              <li>Immunization records</li>
              <li>Two passport-size photographs</li>
              <li>Proof of residence</li>
            </ul>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Important Dates</CardTitle>
            <CardDescription>2026-2027 Academic Year</CardDescription>
          </CardHeader>
          <CardContent>
            <ul className="space-y-2">
              <li><strong>Application Opens:</strong> October 1, 2025</li>
              <li><strong>Application Deadline:</strong> March 31, 2026</li>
              <li><strong>Entrance Exams:</strong> April 2026</li>
              <li><strong>Admission Decisions:</strong> May 2026</li>
              <li><strong>Enrollment Deadline:</strong> June 15, 2026</li>
            </ul>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Tuition & Financial Aid</CardTitle>
            <CardDescription>Investment in your child's future</CardDescription>
          </CardHeader>
          <CardContent>
            <p className="mb-4">
              We believe quality education should be accessible. We offer various financial aid options 
              including scholarships, payment plans, and need-based assistance.
            </p>
            <Link to="/contact">
              <Button variant="outline">Learn About Financial Aid</Button>
            </Link>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
