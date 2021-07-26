import { render } from 'preact';

function ImageItem(source, description) {
  const imgSource = `../assets/${source}`;
	return <li class="image-item">
      <img src={imgSource} alt={description} onClick={() => window.open(imgSource)} />
  </li>
}


function ImageList({images, description}) {
  return <ul class="image-list">
    {images.map(image => ImageItem(image, description))}
  </ul>
}
export default ImageList;