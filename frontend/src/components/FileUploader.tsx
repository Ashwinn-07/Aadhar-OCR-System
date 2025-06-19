import { useOCR } from "../hooks/useOcr";

const FileUploader = () => {
  const {
    previewFront,
    previewBack,
    handleFile,
    runOCR,
    data,
    loading,
    error,
  } = useOCR();

  return (
    <div className="p-4 max-w-md mx-auto">
      <h1 className="text-2xl font-bold mb-4">Aadhaar OCR</h1>

      <label className="block mb-2">
        Front Image:
        <input
          type="file"
          accept="image/*"
          onChange={(e) => handleFile(e, "front")}
        />
      </label>
      {previewFront && (
        <img src={previewFront} className="mb-4 w-full object-contain" />
      )}

      <label className="block mb-2">
        Back Image:
        <input
          type="file"
          accept="image/*"
          onChange={(e) => handleFile(e, "back")}
        />
      </label>
      {previewBack && (
        <img src={previewBack} className="mb-4 w-full object-contain" />
      )}

      <button
        onClick={runOCR}
        disabled={loading}
        className="bg-blue-600 text-white px-4 py-2 rounded disabled:opacity-50"
      >
        {loading ? "Processing..." : "Run OCR"}
      </button>

      {error && <p className="text-red-600 mt-2">{error}</p>}
      {data && (
        <div className="mt-4 bg-gray-100 p-4 rounded">
          {Object.entries(data).map(([key, val]: any) => (
            <p key={key}>
              <strong>{key}:</strong> {val}
            </p>
          ))}
        </div>
      )}
    </div>
  );
};

export default FileUploader;
