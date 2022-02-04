import React, { 
        useState, 
        useEffect, 
        // useRef 
      } from 'react';
// import { toJpeg } from 'html-to-image';
import './App.css'

import Meme from './components/Meme';

function App() {
  const [images, setImages] = useState([])
  // const ref = useRef<HTMLDivElement>(null);
  const [selectedImage, setSelectedImage] = useState(null);
  const [memeImage, setMemeImage] = useState(null)
  const [meme, setMeme] = useState(
    {
        textAtTop: "",
        textAtBottom: "",
    }
  )

  // function to select ramdom image
  // function randomImage()  {
  //   let index = Math.floor(Math.random() * images.length)
  //   return images[index];
  // }

  //functon to convert object to query params
  function objectToQueryParam(obj) {
    const params = Object.entries(obj).map(([key, value]) => `${key}=${value}`);
    // console.log(params, "object")
    return "?" + params.join("&");
  };
  

  //function to generate meme
  const generateMeme = async () => {
    // const params = {
    //   template_id: selectedImage.id,
    //   text0: meme.textAtTop,
    //   text1: meme.textAtBottom,
    //   username: "xzk03017",
    //   password: "xzk03017@cndps.com"
    // }

    // const res = await fetch(
    //   `https://api.imgflip.com/caption_image${objectToQueryParam(
    //     params
    //   )}`
    // );
    // const response = await res.json();
    console.log(selectedImage.url, "response")
    
    setMemeImage(selectedImage.url)
    console.log(meme, "attributes")
  
  }

  // handle chnage in text input
  function handleChange(e) {
      e.preventDefault();
      const { name , val} = e.target
      setMeme( newMeme => ({
          ...newMeme,
          [e.target.name]: e.target.value
          
      }))
      // console.log(meme)
  }

  // fetching meme images and storing it in meme object
  useEffect( () => {
    fetch(`https://api.imgflip.com/get_memes`)
        .then((response) => response.json())
        .then( data => {
            setImages([...data.data.memes])
            console.log(images)
        })
        .catch( error => {
            console.log(error)
        })
  }, [])

  // function to download image
  // function imageDownload() {
  //     if (ref.current === null) {
  //         return
  //     }
  //     toJpeg(ref.current, { cacheBust: true, })
  //     .then(function (dataUrl) {
  //         var link = document.createElement('a');
  //         link.download = `meme-image${new Date()}.jpeg`;
  //         link.href = dataUrl;
  //         link.click();
  //     });
  // }

  // if(memeImage) {
  //   return (
  //     <div className='meme'>
  //       <img src={memeImage} alt="Generated meme" />
  //       <h2 className="top">{meme.textAtTop}</h2>
  //       <h2 className="bottom">{meme.textAtBottom}</h2>
  //     </div>
  //   );
  // }

  return (
    <div className="App" >
      <h1>MEME GENERATOR</h1>
      {selectedImage && (
        <div className='row'>
          
          <div className='form'>
              <h3 className='head1' >Text at Top:</h3>
              <input 
                  type="text"
                  placeholder="Text at Top"
                  className="top-text"
                  name="textAtTop"
                  value={meme.textAtTop}
                  onChange={handleChange}
              />
              <h3 className='head1' >Text at Bottom:</h3>
              <input 
                  type="text"
                  placeholder="Text at Bottom "
                  className="bottom-text"
                  name="textAtBottom"
                  value={meme.textAtBottom}
                  onChange={handleChange}
              />
              <button 
                  className="submit-button"
                  onClick={generateMeme}
              >
              Generate Meme
              </button> 
          </div>
          <h2>Meme Preview</h2>
          { memeImage &&(
            <>
            <div className='meme'>
              <img src={memeImage} alt="Generated meme" />
              <h2 className="top">{meme.textAtTop}</h2>
              <h2 className="bottom">{meme.textAtBottom}</h2>
            </div>
            </>
        )
          }
          
        </div>
        )
      }
      {!selectedImage && 
        (
          <>
          <h2>Select a Meme Template</h2>
          {
            images.slice(0, 20).map( (image) => {
              return (
                <Meme
                  image={image}
                  onClick={ () => {
                    setSelectedImage(image);
                    console.log(image, "image selected")
                  }}
                />
              );
            })
          }
          </>
        )
        }
    </div>
  );
}

export default App;
