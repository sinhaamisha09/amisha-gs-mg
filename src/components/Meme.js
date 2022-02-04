import React  from 'react';
import '../App.css'

function Meme({image, onClick}) {
    console.log(image.url, "in meme")
  return(
    <div className="meme">
      <img 
      key={image.id} 
      src={image.url} 
      style={{ width: 200}} 
      alt={image.name}
      onClick={onClick}
    /> 
    </div>
  )}

export default Meme;
