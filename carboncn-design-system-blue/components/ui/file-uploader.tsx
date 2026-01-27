import * as React from "react"
import { Upload, X, FileText, AlertCircle, CheckCircle } from "lucide-react"
import { cn } from "@/lib/utils"
import { Button } from "./button"

export interface FileItem {
  id: string
  name: string
  size: number
  status: "uploading" | "complete" | "error"
  progress?: number
  errorMessage?: string
}

export interface FileUploaderProps {
  accept?: string
  multiple?: boolean
  disabled?: boolean
  maxSize?: number // in bytes
  files?: FileItem[]
  onFilesChange?: (files: FileItem[]) => void
  onUpload?: (files: File[]) => void
  className?: string
  label?: string
  description?: string
}

const formatFileSize = (bytes: number) => {
  if (bytes === 0) return "0 Bytes"
  const k = 1024
  const sizes = ["Bytes", "KB", "MB", "GB"]
  const i = Math.floor(Math.log(bytes) / Math.log(k))
  return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + " " + sizes[i]
}

const FileUploader = React.forwardRef<HTMLDivElement, FileUploaderProps>(
  (
    {
      accept,
      multiple = false,
      disabled = false,
      maxSize,
      files = [],
      onFilesChange,
      onUpload,
      className,
      label = "Add files",
      description = "or drop files here",
    },
    ref
  ) => {
    const inputRef = React.useRef<HTMLInputElement>(null)
    const [isDragging, setIsDragging] = React.useState(false)

    const handleClick = () => {
      inputRef.current?.click()
    }

    const handleFiles = (fileList: FileList | null) => {
      if (!fileList) return
      const filesArray = Array.from(fileList)
      onUpload?.(filesArray)
    }

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      handleFiles(e.target.files)
      if (inputRef.current) {
        inputRef.current.value = ""
      }
    }

    const handleDragOver = (e: React.DragEvent) => {
      e.preventDefault()
      if (!disabled) setIsDragging(true)
    }

    const handleDragLeave = () => {
      setIsDragging(false)
    }

    const handleDrop = (e: React.DragEvent) => {
      e.preventDefault()
      setIsDragging(false)
      if (!disabled) {
        handleFiles(e.dataTransfer.files)
      }
    }

    const removeFile = (id: string) => {
      onFilesChange?.(files.filter((f) => f.id !== id))
    }

    return (
      <div ref={ref} className={cn("space-y-3", className)}>
        {/* Drop zone */}
        <div
          onClick={handleClick}
          onDragOver={handleDragOver}
          onDragLeave={handleDragLeave}
          onDrop={handleDrop}
          className={cn(
            "flex flex-col items-center justify-center gap-2 p-carbon-07 border-2 border-dashed transition-colors duration-fast-02 cursor-pointer",
            "hover:bg-carbon-gray-10 dark:hover:bg-carbon-gray-80",
            isDragging && "border-carbon-blue-60 bg-carbon-blue-10 dark:bg-carbon-blue-90",
            disabled && "opacity-50 cursor-not-allowed",
            !isDragging && "border-carbon-gray-30 dark:border-carbon-gray-60"
          )}
        >
          <Upload className="h-6 w-6 text-carbon-gray-50" />
          <div className="text-center">
            <Button variant="ghost" size="sm" disabled={disabled} type="button">
              {label}
            </Button>
            <p className="text-sm text-carbon-gray-50 mt-1">{description}</p>
          </div>
          {maxSize && (
            <p className="text-xs text-carbon-gray-50">
              Max file size: {formatFileSize(maxSize)}
            </p>
          )}
        </div>

        <input
          ref={inputRef}
          type="file"
          accept={accept}
          multiple={multiple}
          disabled={disabled}
          onChange={handleChange}
          className="sr-only"
        />

        {/* File list */}
        {files.length > 0 && (
          <div className="space-y-2">
            {files.map((file) => (
              <div
                key={file.id}
                className={cn(
                  "flex items-center gap-3 p-3 bg-carbon-gray-10 dark:bg-carbon-gray-80",
                  file.status === "error" && "bg-carbon-red-10 dark:bg-carbon-red-90"
                )}
              >
                <FileText className="h-5 w-5 shrink-0 text-carbon-gray-50" />
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium truncate">{file.name}</p>
                  <p className="text-xs text-carbon-gray-50">
                    {formatFileSize(file.size)}
                    {file.status === "uploading" && file.progress !== undefined && (
                      <span className="ml-2">{file.progress}%</span>
                    )}
                    {file.status === "error" && file.errorMessage && (
                      <span className="ml-2 text-carbon-red-60">{file.errorMessage}</span>
                    )}
                  </p>
                  {file.status === "uploading" && file.progress !== undefined && (
                    <div className="mt-1 h-1 w-full bg-carbon-gray-20 dark:bg-carbon-gray-70">
                      <div
                        className="h-full bg-carbon-blue-60 transition-all"
                        style={{ width: `${file.progress}%` }}
                      />
                    </div>
                  )}
                </div>
                <div className="shrink-0">
                  {file.status === "complete" && (
                    <CheckCircle className="h-5 w-5 text-carbon-green-60" />
                  )}
                  {file.status === "error" && (
                    <AlertCircle className="h-5 w-5 text-carbon-red-60" />
                  )}
                </div>
                <button
                  type="button"
                  onClick={() => removeFile(file.id)}
                  className="shrink-0 hover:opacity-70 focus:outline-none"
                >
                  <X className="h-5 w-5" />
                </button>
              </div>
            ))}
          </div>
        )}
      </div>
    )
  }
)
FileUploader.displayName = "FileUploader"

export { FileUploader }

