import React, { useState } from 'react';


const Qrcode = () => {

  const [img, setImg] = useState("");
  const [loading, setLoading] = useState(false);
  const [qrData, setQrData] = useState("");
  const [size, setSize] = useState("150");


 async function generate(){
  try{
    const url=`https://api.qrserver.com/v1/create-qr-code/?size=${size}x${size}&data=${encodeURIComponent(qrData)}`;
    setImg(url);

  }catch(error){
    console.error("Error generating Qr code",error);


  }finally{
    setLoading(false);
  }
  
  }

  function downloadQr(){
    fetch(img)
    .then((response)=>response.blob())
    .then((blob)=>{
      const link=document.createElement("a")
      link.href=URL.createObjectURL(blob);
      link.download="qrcode.png"
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);

    })
  }
    
  return (
   
   <div className="app-container">
    <h1>QR CODE GENERATED</h1>
    {loading && <p>Please wait...</p>}
    {img && <img src={img} className='qr-image' />}
    <div>
    <label htmlFor="dataInput" className='input-label' >
        Data for Qr code
    </label>
    <input type="text" value={qrData} id='dataInput'  placeholder='Enter Data for Qrcode' onChange={(e)=>setQrData(e.target.value)} />
    <label htmlFor="sizeInput" className='input-label' >
       Image size (e.g 150)
    </label>
    <input type="text" id='sizeInput' value={size} placeholder='Enter the image size' onChange={(e)=>setSize(e.target.value)} />
    <button className='generate-button' disabled={loading} onClick={generate} >Generate QR Code</button>
    <button className='download-button' onClick={downloadQr}>Download QR code</button>

   </div>
   
   </div>
  )
}

export default Qrcode