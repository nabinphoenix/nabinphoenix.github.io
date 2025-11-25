// app/projects/[id]/FishDetectionDemo.tsx
'use client'

import { useState, useRef, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Upload, X, Loader2, Fish, Info, AlertCircle, CheckCircle2 } from 'lucide-react'

interface DetectionMetadata {
  species: string
  confidence: number
  confidence_percentage: number
  lifespan: string
  diet: Array<{ term: string; explanation: string }>
  estimated_weight: string
  bbox: [number, number, number, number]
}

interface DetectionResponse {
  fish_detected: string[]
  confidence: number[]
  annotated_image: string
  metadata: DetectionMetadata[]
}

const API_URL = '/api/fish'

// Helper function to check if backend is reachable
async function checkBackendHealth(): Promise<boolean> {
  try {
    const controller = new AbortController()
    const timeoutId = setTimeout(() => controller.abort(), 3000) // 3 second timeout

    const response = await fetch(`${API_URL}/`, {
      method: 'GET',
      signal: controller.signal,
    })

    clearTimeout(timeoutId)
    return response.ok
  } catch (err) {
    console.log('Backend health check failed:', err)
    return false
  }
}

export default function FishDetectionDemo() {
  const [selectedFile, setSelectedFile] = useState<File | null>(null)
  const [preview, setPreview] = useState<string | null>(null)
  const [loading, setLoading] = useState(false)
  const [results, setResults] = useState<DetectionResponse | null>(null)
  const [error, setError] = useState<string | null>(null)
  const [backendStatus, setBackendStatus] = useState<'checking' | 'online' | 'offline'>('checking')
  const fileInputRef = useRef<HTMLInputElement>(null)

  // Check backend status on mount
  useEffect(() => {
    checkBackendHealth().then((isOnline) => {
      setBackendStatus(isOnline ? 'online' : 'offline')
      if (!isOnline) {
        // Don't set error on mount, just show status
        // Let user try anyway - the actual detection will show proper error
      }
    })
  }, [])

  // Function to manually retry backend connection
  const retryBackendCheck = async () => {
    setBackendStatus('checking')
    setError(null)
    const isOnline = await checkBackendHealth()
    setBackendStatus(isOnline ? 'online' : 'offline')
    if (isOnline) {
      // Clear any previous errors if backend is now online
      setError(null)
    }
  }

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      if (!file.type.startsWith('image/')) {
        setError('Please select an image file')
        return
      }
      setSelectedFile(file)
      setError(null)
      setResults(null)

      // Create preview
      const reader = new FileReader()
      reader.onloadend = () => {
        setPreview(reader.result as string)
      }
      reader.readAsDataURL(file)
    }
  }

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault()
    const file = e.dataTransfer.files[0]
    if (file && file.type.startsWith('image/')) {
      setSelectedFile(file)
      setError(null)
      setResults(null)

      const reader = new FileReader()
      reader.onloadend = () => {
        setPreview(reader.result as string)
      }
      reader.readAsDataURL(file)
    } else {
      setError('Please drop an image file')
    }
  }

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault()
  }

  const handleRemove = () => {
    setSelectedFile(null)
    setPreview(null)
    setResults(null)
    setError(null)
    if (fileInputRef.current) {
      fileInputRef.current.value = ''
    }
  }

  // Auto-detect when file is selected
  useEffect(() => {
    if (selectedFile && !results && !loading && !error) {
      handleDetect()
    }
  }, [selectedFile])

  const handleDetect = async () => {
    if (!selectedFile) return

    setLoading(true)
    setError(null)
    setResults(null)

    try {
      const formData = new FormData()
      formData.append('file', selectedFile)

      console.log('Attempting to detect fish...')
      console.log('API URL:', API_URL)
      console.log('File:', selectedFile.name, selectedFile.size, selectedFile.type)

      const response = await fetch(`${API_URL}/detect`, {
        method: 'POST',
        body: formData,
      })

      if (!response.ok) {
        if (response.status === 0) {
          throw new Error(
            `Unable to connect to the detection server at ${API_URL}. ` +
            'Please make sure the FastAPI backend is running. ' +
            'Start it with: uvicorn main:app --reload --host 0.0.0.0 --port 8000'
          )
        }
        if (response.status >= 500) {
          throw new Error('Server error. Please check if the backend is running correctly.')
        }
        const errorData = await response.json().catch(() => ({}))
        throw new Error(errorData.detail || `Server error: ${response.status}`)
      }

      const data: DetectionResponse = await response.json()
      setResults(data)

      setTimeout(() => {
        const resultsElement = document.getElementById('detection-results')
        if (resultsElement) {
          resultsElement.scrollIntoView({ behavior: 'smooth', block: 'start' })
        }
      }, 100)
    } catch (err: any) {
      if (err.name === 'TypeError' && err.message.includes('fetch')) {
        setError(
          `Connection failed. The backend server at ${API_URL} is not reachable. ` +
          'Please ensure:\n' +
          '1. The FastAPI backend is running (uvicorn main:app --reload --port 8000)\n' +
          '2. CORS is properly configured in the backend\n' +
          '3. The API URL is correct in your .env.local file'
        )
      } else {
        setError(err.message || 'An error occurred while detecting fish. Please try again.')
      }
      console.error('Detection error:', err)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="space-y-6">
      {/* Backend Status Indicator */}
      {backendStatus !== 'checking' && (
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className={`p-4 rounded-lg flex items-center justify-between gap-4 ${backendStatus === 'online'
            ? 'bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800'
            : 'bg-yellow-50 dark:bg-yellow-900/20 border border-yellow-200 dark:border-yellow-800'
            }`}
        >
          <div className="flex items-center gap-3">
            {backendStatus === 'online' ? (
              <>
                <CheckCircle2 size={20} className="text-green-600 dark:text-green-400" />
                <span className="text-sm font-medium text-green-800 dark:text-green-300">
                  Backend server is online and ready
                </span>
              </>
            ) : (
              <>
                <AlertCircle size={20} className="text-yellow-600 dark:text-yellow-400" />
                <div>
                  <span className="text-sm font-medium text-yellow-800 dark:text-yellow-300 block">
                    Backend server appears offline
                  </span>
                  <span className="text-xs text-yellow-700 dark:text-yellow-400">
                    You can still try to detect - the system will check when you click the button
                  </span>
                </div>
              </>
            )}
          </div>
          {backendStatus === 'offline' && (
            <button
              onClick={retryBackendCheck}
              className="px-4 py-2 bg-yellow-600 hover:bg-yellow-700 text-white text-sm font-medium rounded-lg transition-colors flex items-center gap-2"
            >
              <Loader2 size={16} className="animate-spin" />
              Retry Connection
            </button>
          )}
        </motion.div>
      )}

      {backendStatus === 'checking' && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="p-4 bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-lg flex items-center gap-3"
        >
          <Loader2 size={20} className="text-blue-600 dark:text-blue-400 animate-spin" />
          <span className="text-sm text-blue-800 dark:text-blue-300">
            Checking backend connection...
          </span>
        </motion.div>
      )}

      {/* Upload Area */}
      <div
        onDrop={handleDrop}
        onDragOver={handleDragOver}
        className={`relative border-2 border-dashed rounded-xl p-8 transition-all ${preview
          ? 'border-primary-500 bg-primary-50/50 dark:bg-primary-900/10'
          : 'border-gray-300 dark:border-gray-700 hover:border-primary-500 dark:hover:border-primary-600'
          }`}
      >
        {!preview ? (
          <div className="text-center">
            <Upload className="mx-auto h-12 w-12 text-gray-400 mb-4" />
            <div className="space-y-2">
              <p className="text-lg font-medium text-gray-900 dark:text-white">
                Drop an image here or click to upload
              </p>
              <p className="text-sm text-gray-500 dark:text-gray-400">
                Supports JPG, PNG, and other image formats
              </p>
            </div>
            <input
              ref={fileInputRef}
              type="file"
              accept="image/*"
              onChange={handleFileSelect}
              className="hidden"
              id="fish-image-upload"
            />
            <label
              htmlFor="fish-image-upload"
              className="mt-4 inline-flex items-center px-6 py-3 bg-primary-600 hover:bg-primary-700 text-white font-medium rounded-lg transition-colors cursor-pointer"
            >
              <Upload size={20} className="mr-2" />
              Select Image
            </label>
          </div>
        ) : (
          <div className="relative">
            <button
              onClick={handleRemove}
              className="absolute top-2 right-2 z-10 p-2 bg-red-500 hover:bg-red-600 text-white rounded-full transition-colors"
              aria-label="Remove image"
            >
              <X size={20} />
            </button>
            <div className="relative w-full max-w-2xl mx-auto">
              <img
                src={preview}
                alt="Preview"
                className="max-h-96 w-auto mx-auto rounded-lg shadow-lg"
              />
              {/* Loading Overlay */}
              {loading && (
                <div className="absolute inset-0 bg-black/50 rounded-lg flex flex-col items-center justify-center text-white">
                  <Loader2 size={48} className="animate-spin mb-4" />
                  <p className="text-lg font-semibold">Analyzing Image...</p>
                  <p className="text-sm text-gray-200">Identifying fish species</p>
                </div>
              )}
            </div>
            <div className="mt-4 flex justify-center gap-4">
              <button
                onClick={handleRemove}
                className="px-4 py-2 border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors"
                disabled={loading}
              >
                Remove
              </button>
              {/* Retry button only shows if there was an error */}
              {error && (
                <button
                  onClick={handleDetect}
                  className="px-6 py-2 bg-primary-600 hover:bg-primary-700 text-white font-medium rounded-lg transition-colors flex items-center gap-2"
                >
                  <Loader2 size={20} className={loading ? 'animate-spin' : ''} />
                  Retry Detection
                </button>
              )}
            </div>
          </div>
        )}
      </div>

      {/* Error Message */}
      <AnimatePresence>
        {error && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="p-4 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg"
          >
            <div className="flex items-start gap-3">
              <AlertCircle className="text-red-600 dark:text-red-400 flex-shrink-0 mt-0.5" size={20} />
              <div className="flex-1">
                <p className="text-sm font-medium text-red-800 dark:text-red-300 mb-2">Connection Error</p>
                <p className="text-sm text-red-700 dark:text-red-400 whitespace-pre-line">{error}</p>
                <div className="mt-4 p-3 bg-red-100 dark:bg-red-900/30 rounded-lg">
                  <p className="text-xs font-medium text-red-800 dark:text-red-300 mb-2">Quick Setup:</p>
                  <ol className="text-xs text-red-700 dark:text-red-400 space-y-1 list-decimal list-inside">
                    <li>Navigate to: <code className="bg-red-200 dark:bg-red-800 px-1 rounded">c:/Users/A S U S/FISH DECTECT/backend</code></li>
                    <li>Run: <code className="bg-red-200 dark:bg-red-800 px-1 rounded">uvicorn main:app --reload --host 0.0.0.0 --port 8000</code></li>
                    <li>Wait for: <code className="bg-red-200 dark:bg-red-800 px-1 rounded">Application startup complete</code></li>
                    <li>Then try uploading again</li>
                  </ol>
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Results */}
      <AnimatePresence>
        {results && (
          <motion.div
            id="detection-results"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 20 }}
            className="space-y-6 mt-8"
          >
            {/* Success Message - More Prominent */}
            <motion.div
              initial={{ scale: 0.95 }}
              animate={{ scale: 1 }}
              className="p-6 bg-gradient-to-r from-green-50 to-emerald-50 dark:from-green-900/30 dark:to-emerald-900/30 border-2 border-green-300 dark:border-green-700 rounded-xl shadow-lg flex items-start gap-4"
            >
              <div className="flex-shrink-0">
                <CheckCircle2 className="text-green-600 dark:text-green-400" size={32} />
              </div>
              <div className="flex-1">
                <p className="text-lg font-bold text-green-900 dark:text-green-200 mb-1">
                  🎉 Detection Complete!
                </p>
                <p className="text-base text-green-800 dark:text-green-300">
                  Successfully detected <span className="font-bold text-green-900 dark:text-green-100">{results.fish_detected.length}</span> fish species in the image
                </p>
              </div>
            </motion.div>

            {/* Annotated Image - Larger and More Prominent */}
            {results.annotated_image && (
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.2 }}
                className="bg-white dark:bg-gray-800 rounded-2xl p-8 shadow-2xl border-2 border-primary-200 dark:border-primary-800"
              >
                <div className="flex items-center gap-3 mb-6">
                  <Fish className="text-primary-600 dark:text-primary-400" size={28} />
                  <h3 className="text-2xl font-bold text-gray-900 dark:text-white">
                    Detection Results
                  </h3>
                </div>
                <div className="relative w-full rounded-xl overflow-hidden border-4 border-primary-300 dark:border-primary-700 shadow-xl bg-gray-100 dark:bg-gray-900 p-2">
                  <img
                    src={`data:image/jpeg;base64,${results.annotated_image}`}
                    alt="Detection results with bounding boxes"
                    className="w-full h-auto rounded-lg"
                  />
                </div>
                <p className="text-sm text-gray-600 dark:text-gray-400 mt-4 text-center">
                  Yellow boxes indicate detected fish species with confidence scores
                </p>
              </motion.div>
            )}

            {/* Species Information - Enhanced */}
            {results.metadata && results.metadata.length > 0 && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.3 }}
                className="space-y-6"
              >
                <div className="flex items-center gap-3">
                  <Info className="text-primary-600 dark:text-primary-400" size={28} />
                  <h3 className="text-2xl font-bold text-gray-900 dark:text-white">
                    Species Information
                  </h3>
                </div>
                <div className="grid grid-cols-1 gap-6">
                  {results.metadata.map((meta, index) => (
                    <motion.div
                      key={index}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.4 + index * 0.1 }}
                      className="bg-gradient-to-br from-white to-gray-50 dark:from-gray-800 dark:to-gray-900 rounded-2xl p-8 shadow-xl border-2 border-primary-200 dark:border-primary-800 hover:shadow-2xl transition-shadow"
                    >
                      <div className="flex items-start justify-between mb-6 pb-4 border-b-2 border-primary-200 dark:border-primary-700">
                        <div>
                          <h4 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
                            {meta.species}
                          </h4>
                          <div className="flex items-center gap-2">
                            <span className="px-4 py-1.5 bg-primary-100 dark:bg-primary-900/50 text-primary-700 dark:text-primary-300 rounded-full text-sm font-bold">
                              {meta.confidence_percentage}% Confidence
                            </span>
                          </div>
                        </div>
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                        <div className="bg-primary-50 dark:bg-primary-900/20 rounded-xl p-4">
                          <p className="text-sm font-semibold text-primary-700 dark:text-primary-300 mb-2 uppercase tracking-wide">
                            Lifespan
                          </p>
                          <p className="text-lg font-bold text-gray-900 dark:text-white">{meta.lifespan}</p>
                        </div>
                        <div className="bg-primary-50 dark:bg-primary-900/20 rounded-xl p-4">
                          <p className="text-sm font-semibold text-primary-700 dark:text-primary-300 mb-2 uppercase tracking-wide">
                            Estimated Weight
                          </p>
                          <p className="text-lg font-bold text-gray-900 dark:text-white">
                            {meta.estimated_weight}
                          </p>
                        </div>
                      </div>

                      {meta.diet && meta.diet.length > 0 && (
                        <div className="mt-6">
                          <p className="text-lg font-bold text-gray-900 dark:text-white mb-4 flex items-center gap-2">
                            <span>🍽️</span>
                            <span>Diet Information</span>
                          </p>
                          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                            {meta.diet.map((dietItem, dietIndex) => (
                              <motion.div
                                key={dietIndex}
                                initial={{ opacity: 0, scale: 0.95 }}
                                animate={{ opacity: 1, scale: 1 }}
                                transition={{ delay: 0.5 + dietIndex * 0.05 }}
                                className="flex items-start gap-3 p-4 bg-white dark:bg-gray-800 rounded-xl border border-primary-200 dark:border-primary-700 hover:shadow-md transition-shadow"
                              >
                                <Info size={20} className="text-primary-600 dark:text-primary-400 flex-shrink-0 mt-0.5" />
                                <div className="flex-1">
                                  <p className="text-sm font-bold text-gray-900 dark:text-white mb-1">
                                    {dietItem.term}
                                  </p>
                                  <p className="text-xs text-gray-600 dark:text-gray-400 leading-relaxed">
                                    {dietItem.explanation}
                                  </p>
                                </div>
                              </motion.div>
                            ))}
                          </div>
                        </div>
                      )}
                    </motion.div>
                  ))}
                </div>
              </motion.div>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}

