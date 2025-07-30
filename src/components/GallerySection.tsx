import React, { useEffect, useRef, useState } from "react";
import { Play, X, ExternalLink } from "lucide-react";

// SVG Separator Component
type SVGSeparatorProps = {
  type: string;
  color: string;
};

const SVGSeparator = ({ type, color }: SVGSeparatorProps) => {
  if (type === "slant") {
    return (
      <div className="relative">
        <svg
          viewBox="0 0 1200 120"
          preserveAspectRatio="none"
          className="w-full h-16"
          style={{ fill: color }}
        >
          <path
            d="M0,0V46.29c47.79,22.2,103.59,32.17,158,28,70.36-5.37,136.33-33.81,206.8-37.5C438.64,32.43,512.34,53.67,583,72.05c69.27,18,138.3,24.88,209.4,13.08,36.15-6,69.85-17.84,104.45-29.34C989.49,25,1113-14.29,1200,52.47V0Z"
            opacity=".25"
          />
          <path
            d="M0,0V15.81C13,36.92,27.64,56.86,47.69,72.05,99.41,111.27,165,111,224.58,91.58c31.15-10.15,60.09-26.07,89.67-39.8,40.92-19,84.73-46,130.83-49.67,36.26-2.85,70.9,9.42,98.6,31.56,31.77,25.39,62.32,62,103.63,73,40.44,10.79,81.35-6.69,119.13-24.28s75.16-39,116.92-43.05c59.73-5.85,113.28,22.88,168.9,38.84,30.2,8.66,59,6.17,87.09-7.5,22.43-10.89,48-26.93,60.65-49.24V0Z"
            opacity=".5"
          />
          <path d="M0,0V5.63C149.93,59,314.09,71.32,475.83,42.57c43-7.64,84.23-20.12,127.61-26.46,59-8.63,112.48,12.24,165.56,35.4C827.93,77.22,886,95.24,951.2,90c86.53-7,172.46-45.71,248.8-84.81V0Z" />
        </svg>
      </div>
    );
  }
  return null;
};

const GallerySection = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [lightboxImage, setLightboxImage] = useState(null);
  const [isVideoPlaying, setIsVideoPlaying] = useState(null);
  const sectionRef = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.2 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, []);

  const galleryItems = [
    {
      type: "image",
      src: "https://images.unsplash.com/photo-1544717297-fa95b6ee9643?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
      title: "Mumbai Business Conference",
      category: "Events",
    },
    {
      type: "image",
      src: "https://images.unsplash.com/photo-1582213782179-e0d53f98f2ca?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
      title: "Delhi Digital Summit",
      category: "Events",
    },
    {
      type: "video",
      src: "https://images.unsplash.com/photo-1524178232363-1fb2b075b655?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
      videoUrl:
        "http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/WeAreGoingOnBullrun.mp4",
      title: "Bangalore Startup Success",
      category: "Case Study",
    },
    {
      type: "image",
      src: "https://images.unsplash.com/photo-1606107557195-0e29a4b5b4aa?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
      title: "Indian Team Collaboration",
      category: "Behind the Scenes",
    },
    {
      type: "image",
      src: "https://images.unsplash.com/photo-1557804506-669a67965ba0?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
      title: "Creative Workshop in Pune",
      category: "Process",
    },
    {
      type: "video",
      src: "https://images.unsplash.com/photo-1559136555-9303baea8ebd?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
      videoUrl:
        "http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4",
      title: "Indian Market Overview",
      category: "About Us",
    },
  ];

  const openLightbox = (src: any) => {
    setLightboxImage(src);
  };

  const closeLightbox = () => {
    setLightboxImage(null);
    setIsVideoPlaying(null);
  };

  const playVideo = (videoUrl: any) => {
    setIsVideoPlaying(videoUrl);
  };

  return (
    <>
      <SVGSeparator type="slant" color="#f9fafb" />
      <section id="gallery" className="py-20 bg-gray-50">
        <div className="container mx-auto px-4">
          <div
            ref={sectionRef}
            className={`transition-all duration-1000 ${
              isVisible
                ? "opacity-100 translate-y-0"
                : "opacity-0 translate-y-10"
            }`}
          >
            {/* Header */}
            <div className="text-center mb-16">
              <h2 className="text-4xl md:text-5xl font-bold text-gray-800 mb-6">
                Our Work in Action
              </h2>
              <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
                Take a behind-the-scenes look at our creative process, team
                events, and success stories that showcase our commitment to
                excellence.
              </p>
            </div>

            {/* Gallery Grid */}
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {galleryItems.map((item, index) => (
                <div
                  key={index}
                  className={`relative group cursor-pointer overflow-hidden rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-1 ${
                    isVisible
                      ? "opacity-100 translate-y-0"
                      : "opacity-0 translate-y-8"
                  }`}
                  style={{
                    transitionDelay: `${index * 100}ms`,
                  }}
                >
                  <div className="relative">
                    <img
                      src={item.src}
                      alt={item.title}
                      className="w-full h-64 object-cover group-hover:scale-110 transition-transform duration-700"
                      loading="lazy"
                    />

                    {/* Overlay */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black from-opacity-80 via-black via-opacity-20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                      {item.type === "video" ? (
                        <button
                          onClick={() =>
                            item.videoUrl && playVideo(item.videoUrl)
                          }
                          className="bg-white bg-opacity-20 backdrop-blur-sm rounded-full p-4 hover:bg-opacity-30 transition-all duration-300 hover:scale-110"
                        >
                          <Play className="w-8 h-8 text-white fill-white" />
                        </button>
                      ) : (
                        <button
                          onClick={() => openLightbox(item.src)}
                          className="bg-white bg-opacity-20 backdrop-blur-sm rounded-full p-4 hover:bg-opacity-30 transition-all duration-300 hover:scale-110"
                        >
                          <ExternalLink className="w-8 h-8 text-white" />
                        </button>
                      )}
                    </div>
                  </div>

                  {/* Content */}
                  <div className="absolute bottom-0 left-0 right-0 p-6 bg-gradient-to-t from-black from-opacity-90 to-transparent text-white">
                    <div className="text-sm text-blue-300 mb-1 font-medium">
                      {item.category}
                    </div>
                    <h3 className="text-lg font-semibold">{item.title}</h3>
                  </div>

                  {/* Video indicator */}
                  {item.type === "video" && (
                    <div className="absolute top-4 right-4">
                      <div className="bg-red-600 text-white px-3 py-1 rounded-full text-xs font-semibold flex items-center gap-1">
                        <Play className="w-3 h-3 fill-white" />
                        VIDEO
                      </div>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Lightbox */}
        {lightboxImage && (
          <div
            className="fixed inset-0 bg-black bg-opacity-95 z-50 flex items-center justify-center p-4 backdrop-blur-sm animate-fade-in"
            onClick={closeLightbox}
          >
            <div className="relative max-w-4xl max-h-full transform transition-all duration-300 scale-100 opacity-100">
              <img
                src={lightboxImage}
                alt="Gallery image"
                className="max-w-full max-h-full object-contain rounded-lg shadow-2xl"
              />
              <button
                onClick={closeLightbox}
                className="absolute -top-12 right-0 bg-white bg-opacity-10 text-white rounded-full p-3 hover:bg-opacity-20 transition-all duration-200 backdrop-blur-sm"
              >
                <X size={24} />
              </button>
            </div>
          </div>
        )}

        {/* Video Modal */}
        {isVideoPlaying && (
          <div
            className="fixed inset-0 bg-black bg-opacity-95 z-50 flex items-center justify-center p-4 backdrop-blur-sm animate-fade-in"
            onClick={closeLightbox}
          >
            <div className="relative max-w-5xl w-full transform transition-all duration-300 scale-100 opacity-100">
              <video
                src={isVideoPlaying}
                controls
                autoPlay
                className="w-full max-h-screen object-contain rounded-lg shadow-2xl"
                style={{ maxHeight: "85vh" }}
                onError={(e) => {
                  console.error("Video failed to load:", e);
                }}
              />
              <button
                onClick={closeLightbox}
                className="absolute -top-12 right-0 bg-white bg-opacity-10 text-white rounded-full p-3 hover:bg-opacity-20 transition-all duration-200 backdrop-blur-sm"
              >
                <X size={24} />
              </button>
            </div>
          </div>
        )}
      </section>
    </>
  );
};

export default GallerySection;
