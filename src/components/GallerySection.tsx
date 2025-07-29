import React, { useEffect, useRef, useState } from 'react';
import { Play, X, ExternalLink } from 'lucide-react';
import SVGSeparator from './SVGSeparator';

const GallerySection = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [lightboxImage, setLightboxImage] = useState<string | null>(null);
  const [isVideoPlaying, setIsVideoPlaying] = useState<string | null>(null);
  const sectionRef = useRef<HTMLDivElement>(null);

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
      type: 'image',
      src: 'https://images.pexels.com/photos/3184291/pexels-photo-3184291.jpeg?auto=compress&cs=tinysrgb&w=800',
      title: 'Brand Strategy Workshop',
      category: 'Events'
    },
    {
      type: 'image',
      src: 'https://images.pexels.com/photos/3184340/pexels-photo-3184340.jpeg?auto=compress&cs=tinysrgb&w=800',
      title: 'Digital Marketing Conference',
      category: 'Events'
    },
    {
      type: 'video',
      src: 'https://images.pexels.com/photos/3184357/pexels-photo-3184357.jpeg?auto=compress&cs=tinysrgb&w=800',
      videoUrl: 'https://sample-videos.com/zip/10/mp4/SampleVideo_1280x720_1mb.mp4',
      title: 'Client Success Story',
      category: 'Case Study'
    },
    {
      type: 'image',
      src: 'https://images.pexels.com/photos/3184422/pexels-photo-3184422.jpeg?auto=compress&cs=tinysrgb&w=800',
      title: 'Team Collaboration',
      category: 'Behind the Scenes'
    },
    {
      type: 'image',
      src: 'https://images.pexels.com/photos/3184430/pexels-photo-3184430.jpeg?auto=compress&cs=tinysrgb&w=800',
      title: 'Creative Brainstorming',
      category: 'Process'
    },
    {
      type: 'video',
      src: 'https://images.pexels.com/photos/3184302/pexels-photo-3184302.jpeg?auto=compress&cs=tinysrgb&w=800',
      videoUrl: 'https://sample-videos.com/zip/10/mp4/SampleVideo_1280x720_2mb.mp4',
      title: 'Agency Overview',
      category: 'About Us'
    }
  ];

  const openLightbox = (src: string) => {
    setLightboxImage(src);
  };

  const closeLightbox = () => {
    setLightboxImage(null);
    setIsVideoPlaying(null);
  };

  const playVideo = (videoUrl: string) => {
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
              isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
            }`}
          >
            {/* Header */}
            <div className="text-center mb-16">
              <h2 className="text-4xl md:text-5xl font-bold text-gray-800 mb-6">
                Our Work in Action
              </h2>
              <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
                Take a behind-the-scenes look at our creative process, team events, and success stories 
                that showcase our commitment to excellence.
              </p>
            </div>

            {/* Gallery Grid */}
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {galleryItems.map((item, index) => (
                <div
                  key={index}
                  className={`relative group cursor-pointer overflow-hidden rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-500 ${
                    isVisible ? 'animate-fade-in-up' : ''
                  }`}
                  style={{ animationDelay: `${index * 100}ms` }}
                >
                  <div className="aspect-w-16 aspect-h-10 relative">
                    <img
                      src={item.src}
                      alt={item.title}
                      className="w-full h-64 object-cover group-hover:scale-110 transition-transform duration-700"
                    />
                    
                    {/* Overlay */}
                    <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                      {item.type === 'video' ? (
                        <button
                          onClick={() => item.videoUrl && playVideo(item.videoUrl)}
                          className="bg-white/20 backdrop-blur-sm rounded-full p-4 hover:bg-white/30 transition-all duration-300"
                        >
                          <Play className="w-8 h-8 text-white" />
                        </button>
                      ) : (
                        <button
                          onClick={() => openLightbox(item.src)}
                          className="bg-white/20 backdrop-blur-sm rounded-full p-4 hover:bg-white/30 transition-all duration-300"
                        >
                          <ExternalLink className="w-8 h-8 text-white" />
                        </button>
                      )}
                    </div>
                  </div>
                  
                  {/* Content */}
                  <div className="absolute bottom-0 left-0 right-0 p-6 bg-gradient-to-t from-black/80 to-transparent text-white">
                    <div className="text-sm text-blue-300 mb-1">{item.category}</div>
                    <h3 className="text-lg font-semibold">{item.title}</h3>
                  </div>
                  
                  {/* Video indicator */}
                  {item.type === 'video' && (
                    <div className="absolute top-4 right-4">
                      <div className="bg-red-600 text-white px-2 py-1 rounded text-xs font-semibold">
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
            className="fixed inset-0 bg-black/90 z-50 flex items-center justify-center p-4"
            onClick={closeLightbox}
          >
            <div className="relative max-w-4xl max-h-full">
              <img
                src={lightboxImage}
                alt="Gallery image"
                className="max-w-full max-h-full object-contain"
              />
              <button
                onClick={closeLightbox}
                className="absolute top-4 right-4 bg-black/50 text-white rounded-full p-2 hover:bg-black/70 transition-colors duration-200"
              >
                <X size={24} />
              </button>
            </div>
          </div>
        )}

        {/* Video Modal */}
        {isVideoPlaying && (
          <div 
            className="fixed inset-0 bg-black/90 z-50 flex items-center justify-center p-4"
            onClick={closeLightbox}
          >
            <div className="relative max-w-4xl w-full">
              <video
                src={isVideoPlaying}
                controls
                autoPlay
                className="w-full max-h-[80vh] object-contain"
              />
              <button
                onClick={closeLightbox}
                className="absolute top-4 right-4 bg-black/50 text-white rounded-full p-2 hover:bg-black/70 transition-colors duration-200"
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