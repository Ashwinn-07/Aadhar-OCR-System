import { useOCR } from "../hooks/useOcr";
import {
  Upload,
  FileText,
  CheckCircle,
  AlertCircle,
  CreditCard,
  RotateCcw,
} from "lucide-react";

const FileUploader = () => {
  const {
    previewFront,
    previewBack,
    handleFile,
    runOCR,
    clearAll,
    data,
    loading,
    error,
  } = useOCR();

  const FileUploadBox = ({
    type,
    preview,
    onFileChange,
  }: {
    type: "front" | "back";
    preview: string | undefined;
    onFileChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  }) => (
    <div className="relative group">
      <input
        type="file"
        accept="image/*"
        onChange={onFileChange}
        className="absolute inset-0 w-full h-full opacity-0 cursor-pointer z-10"
      />
      <div
        className={`
        relative border-2 border-dashed rounded-2xl transition-all duration-300 overflow-hidden
        ${
          preview
            ? "border-emerald-400 bg-emerald-50"
            : "border-gray-300 bg-gray-50 hover:border-blue-400 hover:bg-blue-50"
        } 
        group-hover:shadow-lg group-hover:scale-[1.02]
      `}
      >
        {preview ? (
          <div className="relative">
            <img
              src={preview}
              alt={`${type} preview`}
              className="max-h-full max-w-full object-contain rounded-xl "
              onLoad={() => console.log(`${type} image loaded successfully`)}
              onError={(e) => {
                console.error(`Error loading ${type} image:`, e);
                console.log(`Image src: ${preview}`);
              }}
            />
            <div className="absolute bg-black bg-opacity-0 group-hover:bg-opacity-10 transition-all duration-300 rounded-xl flex items-center justify-center">
              <div className="opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                <div className="bg-white rounded-full p-2 shadow-lg">
                  <Upload className="w-5 h-5 text-gray-600" />
                </div>
              </div>
            </div>
            <div className="absolute top-3 right-3 bg-emerald-500 rounded-full p-1">
              <CheckCircle className="w-4 h-4 text-white" />
            </div>
          </div>
        ) : (
          <div className="flex flex-col items-center justify-center py-12 px-6">
            <div className="bg-blue-100 rounded-full p-4 mb-4 group-hover:bg-blue-200 transition-colors duration-300">
              <CreditCard className="w-8 h-8 text-blue-600" />
            </div>
            <h3 className="text-lg font-semibold text-gray-900 mb-2">
              Upload {type === "front" ? "Front" : "Back"} Side
            </h3>
            <p className="text-sm text-gray-500 text-center mb-3">
              Click to browse and upload your Aadhaar card {type} image
            </p>
            <div className="flex items-center text-xs text-gray-400">
              <FileText className="w-4 h-4 mr-1" />
              PNG, JPG up to 10MB
            </div>
          </div>
        )}
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 py-8">
      <div className="max-w-4xl mx-auto px-4">
        <div className="text-center mb-10">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-r from-blue-600 to-purple-600 rounded-2xl mb-4">
            <CreditCard className="w-8 h-8 text-white" />
          </div>
          <h1 className="text-4xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent mb-2">
            Aadhaar OCR Scanner
          </h1>
          <p className="text-gray-600 text-lg">
            Extract information from your Aadhaar card instantly
          </p>
        </div>

        <div className="bg-white rounded-3xl shadow-xl p-8 mb-8">
          <div className="grid md:grid-cols-2 gap-8 mb-8">
            <div>
              <label className=" text-sm font-semibold text-gray-700 mb-3 flex items-center">
                <span className="bg-blue-100 text-blue-800 text-xs px-2 py-1 rounded-full mr-2">
                  1
                </span>
                Front Side
              </label>
              <FileUploadBox
                type="front"
                preview={previewFront}
                onFileChange={(e) => handleFile(e, "front")}
              />
            </div>

            <div>
              <label className="text-sm font-semibold text-gray-700 mb-3 flex items-center">
                <span className="bg-blue-100 text-blue-800 text-xs px-2 py-1 rounded-full mr-2">
                  2
                </span>
                Back Side
              </label>
              <FileUploadBox
                type="back"
                preview={previewBack}
                onFileChange={(e) => handleFile(e, "back")}
              />
            </div>
          </div>

          <div className="flex justify-center gap-4">
            <button
              onClick={runOCR}
              disabled={loading || !previewFront || !previewBack}
              className={`
                group relative px-8 py-4 rounded-2xl font-semibold text-lg transition-all duration-300 
                flex items-center space-x-3 min-w-[200px] justify-center cursor-pointer
                ${
                  loading || !previewFront || !previewBack
                    ? "bg-gray-100 text-gray-400 cursor-not-allowed"
                    : "bg-gradient-to-r from-blue-600 to-purple-600 text-white hover:from-blue-700 hover:to-purple-700 hover:shadow-lg hover:scale-105 active:scale-95"
                }
              `}
            >
              {loading ? (
                <>
                  <div className="animate-spin rounded-full h-5 w-5 border-2 border-white border-t-transparent"></div>
                  <span>Processing...</span>
                </>
              ) : (
                <>
                  <FileText className="w-5 h-5" />
                  <span>Extract Information</span>
                </>
              )}
            </button>

            {(previewFront || previewBack || data || error) && (
              <button
                onClick={clearAll}
                disabled={loading}
                className={`
                  group relative px-6 py-4 rounded-2xl font-semibold text-lg transition-all duration-300 
                  flex items-center space-x-3 justify-center cursor-pointer
                  ${
                    loading
                      ? "bg-gray-100 text-gray-400 cursor-not-allowed"
                      : "bg-gray-600 text-white hover:bg-gray-700 hover:shadow-lg hover:scale-105 active:scale-95"
                  }
                `}
              >
                <RotateCcw className="w-5 h-5" />
                <span>Clear All</span>
              </button>
            )}
          </div>
        </div>

        {error && (
          <div className="bg-red-50 border border-red-200 rounded-2xl p-6 mb-8 animate-in slide-in-from-top duration-300">
            <div className="flex items-center space-x-3">
              <div className="bg-red-100 rounded-full p-2">
                <AlertCircle className="w-5 h-5 text-red-600" />
              </div>
              <div>
                <h3 className="font-semibold text-red-800">Error</h3>
                <p className="text-red-600">{error}</p>
              </div>
            </div>
          </div>
        )}

        {data && (
          <div className="bg-white rounded-3xl shadow-xl p-8 animate-in slide-in-from-bottom duration-500">
            <div className="flex items-center space-x-3 mb-6">
              <div className="bg-emerald-100 rounded-full p-2">
                <CheckCircle className="w-6 h-6 text-emerald-600" />
              </div>
              <h2 className="text-2xl font-bold text-gray-900">
                Extracted Information
              </h2>
            </div>

            <div className="grid gap-4">
              {Object.entries(data).map(([key, val]: any, index) => (
                <div
                  key={key}
                  className="p-4 bg-gray-50 rounded-xl border border-gray-200"
                  style={{ animationDelay: `${index * 100}ms` }}
                >
                  <span className="text-sm font-medium text-gray-500 uppercase tracking-wide">
                    {key}
                  </span>
                  <p className="text-lg font-semibold text-gray-900 mt-1">
                    {val}
                  </p>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default FileUploader;
