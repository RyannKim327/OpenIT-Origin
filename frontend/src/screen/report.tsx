import React, { useEffect, useState } from "react";
import Footer from "../component/footer";

// Report Components
export default function Report() {
  const [activeTab, setActiveTab] = useState<"photo" | "text">("photo");
  const [description, setDescription] = useState<string>("");
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [preview, setPreview] = useState<string | null>(null);
  const [isPhotoUploaded, setIsPhotoUploaded] = useState<boolean>(false);
  const [message, setMessage] = useState("");

  useEffect(() => {
    return () => {
      if (preview) URL.revokeObjectURL(preview);
    };
  }, [preview]);

  // Handle photo upload
  const handleUploadPhoto = () => {
    const input = document.getElementById("photo-input") as HTMLInputElement;
    input?.click();
  };

  // Handle file selection
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

  // Handle form submission
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const payload = {
      reporter: "",
      photo: imageFile,
      description: description,
      latitude: "",
      longitude: "",
    };

    // console.log("Report submitted!");
    if (activeTab === "photo") {
      setMessage(`Image uploaded successfully ${imageFile?.name}`);
      setImageFile(null);
      setPreview(null);
    } else {
      alert(`Report Type: Text\nDescription: ${description}`);
      setDescription("");
    }
  };

  // Get tab classes based on active state
  const getTabClasses = (tabName: "photo" | "text") => {
    const baseClasses =
      "flex-1 py-2 text-sm font-medium transition-colors duration-150 rounded-md";
    if (activeTab === tabName) {
      return `${baseClasses} bg-gray-200 text-gray-800`;
    } else {
      return `${baseClasses} bg-white text-gray-500 hover:bg-gray-50`;
    }
  };

  return (
    <div className="flex flex-col h-full w-full bg-gray-50">
      <div className="flex flex-col w-full h-full items-center justify-center px-4 py-50">
        <h1 className="text-5xl font-bold text-gray-900 pb-10">
          Submit Your Report Here
        </h1>

        <form
          onSubmit={handleSubmit}
          className="w-ful lg:w-1/3 bg-white p-6 rounded-xl shadow-2xl"
        >
          <div className="p-1 rounded-md bg-white flex space-x-1 border border-gray-200">
            <button
              type="button"
              className={getTabClasses("photo")}
              onClick={() => setActiveTab("photo")}
            >
              Photo
            </button>
            <button
              type="button"
              className={getTabClasses("text")}
              onClick={() => setActiveTab("text")}
            >
              Text
            </button>
          </div>

          {activeTab === "photo" && (
            <div className="mt-4 p-3 bg-red-50 border border-red-300 rounded-md">
              <p className="text-sm text-black]">
                <strong>Photo Report:</strong> Upload an image to report an
                incident. Your photo will be used as evidence for the report.
              </p>
            </div>
          )}
          {activeTab === "text" && (
            <>
              <label
                htmlFor="incident-description"
                className="block text-sm font-medium text-gray-700 mt-6 mb-2"
              >
                Describe the Incident
              </label>

              <textarea
                id="incident-description"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                rows={5}
                className="w-full p-3 border border-gray-300 rounded-md shadow-sm resize-none"
                placeholder="Enter a detailed description of the incident..."
                required
              />

              <button
                type="submit"
                className="w-full mt-6 py-3 px-4 bg-red-600 text-white font-semibold rounded-md shadow-lg hover:bg-[#941900] transition duration-150"
              >
                Submit Report
              </button>
            </>
          )}

          {activeTab === "photo" && (
            <>
              <div className="mt-6">
                <input
                  id="photo-input"
                  type="file"
                  accept="image/*"
                  onChange={handleFileChange}
                  className="hidden"
                />

                <p className="text-sm text-gray-600 mt-2 text-center py-4">
                  {message}
                </p>

                <button
                  type="button"
                  onClick={handleUploadPhoto}
                  className="w-full py-3 px-4 bg-[#CE2503] text-white font-semibold rounded-md shadow-lg hover:bg-[#941900] transition duration-150"
                >
                  {isPhotoUploaded ? "Change Photo" : "Insert Image"}
                </button>

                {preview && (
                  <div className="my-4">
                    <img
                      src={preview}
                      alt="Uploaded preview"
                      className="w-full max-h-64 object-contain rounded-md shadow-sm"
                    />
                    <button
                      type="submit"
                      className="w-full py-3 px-4 bg-[#CE2503] text-white font-semibold rounded-md shadow-lg hover:bg-[#941900] transition duration-150"
                    >
                      Submit Report
                    </button>
                  </div>
                )}
              </div>
            </>
          )}
        </form>
      </div>
      <Footer />
    </div>
  );
}
