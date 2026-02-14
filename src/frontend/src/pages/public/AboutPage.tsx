import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

export default function AboutPage() {
  return (
    <div className="container mx-auto px-4 py-16">
      <h1 className="mb-8 text-4xl font-bold">About Excellence Academy</h1>
      
      <div className="prose prose-lg max-w-none dark:prose-invert">
        <p className="text-lg leading-relaxed">
          Excellence Academy has been a beacon of quality education for over 50 years. Founded in 1974, 
          our institution has grown from a small community school to a comprehensive educational center 
          serving thousands of students.
        </p>

        <div className="my-12 grid gap-8 md:grid-cols-3">
          <Card>
            <CardHeader>
              <CardTitle>Our Mission</CardTitle>
            </CardHeader>
            <CardContent>
              <p>
                To provide world-class education that nurtures intellectual curiosity, critical thinking, 
                and ethical values in every student.
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Our Vision</CardTitle>
            </CardHeader>
            <CardContent>
              <p>
                To be a leading educational institution recognized for academic excellence, innovation, 
                and holistic student development.
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Our Values</CardTitle>
            </CardHeader>
            <CardContent>
              <p>
                Integrity, Excellence, Respect, Innovation, and Community - these core values guide 
                everything we do.
              </p>
            </CardContent>
          </Card>
        </div>

        <h2 className="mb-4 mt-12 text-3xl font-bold">Our History</h2>
        <p>
          What started as a vision to provide quality education to the local community has evolved into 
          a comprehensive institution offering programs from elementary through high school. Our commitment 
          to excellence has remained unwavering throughout the decades.
        </p>

        <h2 className="mb-4 mt-12 text-3xl font-bold">Accreditation</h2>
        <p>
          Excellence Academy is fully accredited by national and international educational bodies, 
          ensuring our curriculum meets the highest standards of academic rigor and quality.
        </p>
      </div>
    </div>
  );
}
