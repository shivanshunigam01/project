// src/pages/OurWorkDetailPage.tsx
import { useLocation, useNavigate } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';

const OurWorkDetailPage = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const item = location.state;

  if (!item) {
    return (
      <div className="p-8 text-center">
        <h2 className="text-2xl font-semibold mb-4">No project selected</h2>
        <button
          onClick={() => navigate(-1)}
          className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
        >
          Go Back
        </button>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 p-6 md:p-16">
      <button
        onClick={() => navigate(-1)}
        className="mb-6 flex items-center text-blue-600 hover:underline"
      >
        <ArrowLeft className="w-5 h-5 mr-2" /> Back to Gallery
      </button>

      <div className="max-w-4xl mx-auto bg-white p-6 rounded-2xl shadow-xl">
        <div className="mb-6">
          <span className="text-sm uppercase text-gray-500 tracking-widest">
            {item.category}
          </span>
          <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mt-2">
            {item.title}
          </h1>
        </div>

        <div className="mb-6">
          {item.type === 'image' ? (
            <img
              src={item.src}
              alt={item.title}
              className="rounded-xl w-full max-h-[500px] object-cover"
            />
          ) : (
            <video
              src={item.videoUrl}
              controls
              className="w-full rounded-xl max-h-[500px] object-contain"
            />
          )}
        </div>

        <p className="text-gray-700 text-lg leading-relaxed">
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla accumsan, metus ultrices
          eleifend gravida, nulla nunc varius lectus, nec rutrum justo nibh eu lectus. Ut vulputate
          semper dui. Fusce erat odio, sollicitudin vel erat vel, interdum mattis neque.
        </p>
      </div>
    </div>
  );
};

export default OurWorkDetailPage;
