import React, {useState} from 'react'
import Placeholder from '../assets/imageplaceholder.png'
import imageCompression from 'browser-image-compression'
import Card from 'react-bootstrap/Card'


function ImageCompressor() {

    const [compress, setCompress] = useState({
        compressedLink: {Placeholder},
        originalImage: "",
        originalLink: "",
        clicked: false,
        uploadImage: false
      })


      const compressFunction=(e)=>{
        const imageFile= e.target.files[0]
        setCompress({
        compressedLink:URL.createObjectURL(imageFile),
        originalImage: imageFile,
        originalLink: imageFile.name,
        uploadImage: true
        })

      }


      const click=(e)=>{
        e.preventDefault()


        const option={
          maxSizeMB:1,
          maxWidthOrHeight:500,
          useWebWorker:true
        }

        if(option.maxSizeMB>= compress.originalImage.size/1024){
          alert(" Image is too small, cant bbe compressed")
          return 0
        }

        let output ;
        imageCompression(compress.originalImage, option).then(x=>{
          output=x
          const downloadLink = URL.createObjectURL(output)
          setCompress({
            compressedLink:downloadLink
          })
        })

        setCompress({
          clicked:true
        })

        return 1
      }
  return (
   
    <div>
        <input type="file"  accept='image' onChange={e=>compressFunction(e)}  />
        <button onClick={e=>click(e)}> Compress</button>
    </div>
  )
}

export default ImageCompressor