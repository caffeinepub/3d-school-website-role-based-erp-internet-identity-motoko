export default function GalleryPage() {
  const galleryImages = [
    { src: '/assets/generated/gallery-01.dim_1600x1000.jpg', alt: 'Campus view' },
    { src: '/assets/generated/gallery-02.dim_1600x1000.jpg', alt: 'Students in classroom' },
    { src: '/assets/generated/gallery-03.dim_1600x1000.jpg', alt: 'Science laboratory' },
    { src: '/assets/generated/gallery-04.dim_1600x1000.jpg', alt: 'Sports activities' },
    { src: '/assets/generated/gallery-05.dim_1600x1000.jpg', alt: 'Library' },
    { src: '/assets/generated/gallery-06.dim_1600x1000.jpg', alt: 'School event' },
  ];

  return (
    <div className="container mx-auto px-4 py-16">
      <h1 className="mb-8 text-4xl font-bold">Gallery</h1>
      
      <p className="mb-12 text-lg text-muted-foreground">
        Take a visual journey through our campus, classrooms, and community events.
      </p>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {galleryImages.map((image, index) => (
          <div
            key={index}
            className="group relative overflow-hidden rounded-lg shadow-md transition-transform hover:scale-105"
          >
            <img
              src={image.src}
              alt={image.alt}
              className="h-64 w-full object-cover"
              loading="lazy"
            />
            <div className="absolute inset-0 bg-black/50 opacity-0 transition-opacity group-hover:opacity-100">
              <div className="flex h-full items-center justify-center">
                <p className="text-lg font-semibold text-white">{image.alt}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
