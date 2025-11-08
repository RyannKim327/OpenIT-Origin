import React, { useEffect, useState } from 'react';

export default function Report() {
  const [activeTab, setActiveTab] = useState<'photo' | 'text'>('photo');
  const [description, setDescription] = useState<string>('');
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [preview, setPreview] = useState<string | null>(null);
  const [isPhotoUploaded, setIsPhotoUploaded] = useState<boolean>(false);

  useEffect(() => {
    return () => {
      if (preview) URL.revokeObjectURL(preview);
    };
  }, [preview]);

  const handleUploadPhoto = () => {
    const input = document.getElementById('photo-input') as HTMLInputElement;
    input?.click();
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0] ?? null;
    setImageFile(file);
    if (file) {
      setPreview(URL.createObjectURL(file));
      setIsPhotoUploaded(true);
    } else {
      setPreview(null);
      setIsPhotoUploaded(false);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Report submitted!');
    alert(`Report Type: Text\nDescription: ${description}`);
    setDescription('');
  };

  const getTabClasses = (tabName: 'photo' | 'text') => {
    const baseClasses = "flex-1 py-2 text-sm font-medium transition-colors duration-150 rounded-md";
    if (activeTab === tabName) {
      return `${baseClasses} bg-gray-200 text-gray-800`;
    } else {
      return `${baseClasses} bg-white text-gray-500 hover:bg-gray-50`;
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col items-center pt-50">
      
      <h1 className="text-5xl font-bold text-gray-900 mb-10">
        Submit Your Report Here
      </h1>
      

      <form
        onSubmit={handleSubmit}
        className="w-full max-w-lg bg-white p-6 md:p- rounded-xl shadow-2xl"
      >
        
        <div className="p-1 rounded-md bg-white flex space-x-1 border border-gray-200">
          <button
            type="button"
            className={getTabClasses('photo')}
            onClick={() => setActiveTab('photo')}
          >
            Photo
          </button>
          <button
            type="button"
            className={getTabClasses('text')}
            onClick={() => setActiveTab('text')}
          >
            Text
          </button>
        </div>

        {activeTab === 'photo' && (
          <div className="mt-4 p-3 bg-red-50 border border-red-300 rounded-md">
            <p className="text-sm text-black]">
              <strong>Photo Report:</strong> Upload an image to report an incident. Your photo will be used as evidence for the report.
            </p>
          </div>
        )}
        {activeTab === 'text' && (
          <>
            <label htmlFor="incident-description" className="block text-sm font-medium text-gray-700 mt-6 mb-2">
              Describe the Incident
            </label>

            <textarea
              id="incident-description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              rows={5}
              className="w-full p-3 border border-gray-300 rounded-md shadow-sm focus:border-red-500 focus:ring-red-500 resize-none"
              placeholder="Enter a detailed description of the incident..."
              required
            />

            <button
              type="submit"
              className="w-full mt-6 py-3 px-4 bg-red-600 text-white font-semibold rounded-md shadow-lg hover:bg-[#941900] focus:outline-none focus:ring-4 focus:ring-red-500 focus:ring-opacity-50 transition duration-150"
            >
              Submit Report
            </button>
          </>
        )}

        {activeTab === 'photo' && (
          <>
            <div className="mt-6">
              <input
                id="photo-input"
                type="file"
                accept="image/*"
                onChange={handleFileChange}
                className="hidden"
              />

              <button
                type="button"
                onClick={handleUploadPhoto}
                className="w-full py-3 px-4 bg-[#CE2503] text-white font-semibold rounded-md shadow-lg hover:bg-[#941900] focus:outline-none focus:ring-4 focus:ring-blue-500 focus:ring-opacity-50 transition duration-150"
              >
                {isPhotoUploaded ? 'Change Photo' : 'Insert Image'}
              </button>

              {preview && (
                <div className="mt-4">
                  <img src={preview} alt="Uploaded preview" className="w-full max-h-64 object-contain rounded-md shadow-sm" />
                  <p className="text-sm text-gray-600 mt-2 text-center">
                    Image uploaded successfully: {imageFile?.name}
                  </p>
                </div>
              )}
            </div>
          </>
        )}
      </form>

    </div>
  );
}