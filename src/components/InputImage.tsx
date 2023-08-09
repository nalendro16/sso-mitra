import React from 'react'
import imageCompression from 'browser-image-compression'

interface InputImageProps {
  id: string
  onResult: ({ image, base64 }: { image: File; base64: string }) => void
}

export const InputImage: React.FC<InputImageProps> = ({ id, onResult }) => {
  const handleInputImage = async (event: any) => {
    const imageFile = event.target.files[0]
    const options = {
      maxSizeMB: 2,
      useWebWorker: true,
    }
    try {
      const compressedFile = await imageCompression(imageFile, options)
      const base64 = await imageCompression.getDataUrlFromFile(imageFile)

      let attach = {
        image: compressedFile,
        base64: base64,
      }
      if (onResult) {
        onResult(attach)
      }
    } catch (error) {
      console.log(error)
    }
    event.target.value = null
  }

  return (
    <input
      style={{ display: 'none' }}
      accept='image/*'
      id={id}
      type='file'
      onChange={handleInputImage}
    />
  )
}
