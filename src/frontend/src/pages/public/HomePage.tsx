import { Link } from '@tanstack/react-router';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { GraduationCap, Users, BookOpen, Award } from 'lucide-react';
import SchoolHero3D from '../../components/three/SchoolHero3D';
import SchoolHeroFallback from '../../components/three/SchoolHeroFallback';
import { useWebGLSupport } from '../../components/three/WebGLSupport';

export default function HomePage() {
  const { isSupported } = useWebGLSupport();

  return (
    <div className="flex flex-col">
      {/* Hero Section */}
      <section className="relative h-[600px] w-full overflow-hidden">
        {isSupported ? <SchoolHero3D /> : <SchoolHeroFallback />}
        <div className="absolute inset-0 flex items-center justify-center bg-black/30">
          <div className="container mx-auto px-4 text-center text-white">
            <h1 className="mb-4 text-5xl font-bold md:text-6xl">Welcome to Excellence Academy</h1>
            <p className="mb-8 text-xl md:text-2xl">Empowering minds, shaping futures</p>
            <div className="flex flex-wrap justify-center gap-4">
              <Link to="/admissions">
                <Button size="lg" variant="default">
                  Apply Now
                </Button>
              </Link>
              <Link to="/campus-tour">
                <Button size="lg" variant="outline" className="bg-white/10 backdrop-blur">
                  Virtual Tour
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="container mx-auto px-4 py-16">
        <h2 className="mb-12 text-center text-4xl font-bold">Why Choose Excellence Academy</h2>
        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-4">
          <Card>
            <CardHeader>
              <GraduationCap className="mb-2 h-12 w-12 text-primary" />
              <CardTitle>Academic Excellence</CardTitle>
            </CardHeader>
            <CardContent>
              <CardDescription>
                Rigorous curriculum designed to challenge and inspire students to reach their full potential.
              </CardDescription>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <Users className="mb-2 h-12 w-12 text-primary" />
              <CardTitle>Expert Faculty</CardTitle>
            </CardHeader>
            <CardContent>
              <CardDescription>
                Dedicated teachers with years of experience and passion for education.
              </CardDescription>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <BookOpen className="mb-2 h-12 w-12 text-primary" />
              <CardTitle>Modern Facilities</CardTitle>
            </CardHeader>
            <CardContent>
              <CardDescription>
                State-of-the-art classrooms, labs, and libraries equipped with the latest technology.
              </CardDescription>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <Award className="mb-2 h-12 w-12 text-primary" />
              <CardTitle>Holistic Development</CardTitle>
            </CardHeader>
            <CardContent>
              <CardDescription>
                Focus on academics, sports, arts, and character building for well-rounded growth.
              </CardDescription>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* Quick Links Section */}
      <section className="bg-muted/50 py-16">
        <div className="container mx-auto px-4">
          <h2 className="mb-8 text-center text-3xl font-bold">Quick Access</h2>
          <div className="grid gap-6 md:grid-cols-3">
            <Link to="/academics">
              <Card className="cursor-pointer transition-shadow hover:shadow-lg">
                <CardHeader>
                  <CardTitle>Academics</CardTitle>
                  <CardDescription>Explore our programs and curriculum</CardDescription>
                </CardHeader>
              </Card>
            </Link>
            <Link to="/events">
              <Card className="cursor-pointer transition-shadow hover:shadow-lg">
                <CardHeader>
                  <CardTitle>Events</CardTitle>
                  <CardDescription>Stay updated with school activities</CardDescription>
                </CardHeader>
              </Card>
            </Link>
            <Link to="/contact">
              <Card className="cursor-pointer transition-shadow hover:shadow-lg">
                <CardHeader>
                  <CardTitle>Contact Us</CardTitle>
                  <CardDescription>Get in touch with our team</CardDescription>
                </CardHeader>
              </Card>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
