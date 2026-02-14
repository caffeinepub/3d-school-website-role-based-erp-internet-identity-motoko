import { useState } from 'react';
import { Button } from '@/components/ui/button';
import PanoramaViewer from '../../components/three/PanoramaViewer';
import { tourSpots } from '../../components/three/tourSpots';

export default function CampusTourPage() {
  const [currentSpot, setCurrentSpot] = useState(0);

  return (
    <div className="flex h-[calc(100vh-4rem)] flex-col">
      <div className="container mx-auto px-4 py-6">
        <h1 className="mb-4 text-3xl font-bold">Virtual Campus Tour</h1>
        <p className="mb-4 text-muted-foreground">
          Explore our campus in 360°. Use your mouse or touch to look around.
        </p>
        <div className="flex flex-wrap gap-2">
          {tourSpots.map((spot, index) => (
            <Button
              key={index}
              variant={currentSpot === index ? 'default' : 'outline'}
              onClick={() => setCurrentSpot(index)}
            >
              {spot.name}
            </Button>
          ))}
        </div>
      </div>

      <div className="flex-1">
        <PanoramaViewer imageUrl={tourSpots[currentSpot].imageUrl} />
      </div>
    </div>
  );
}
