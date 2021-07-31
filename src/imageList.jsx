import { render } from 'preact';

const envPublicUrl = import.meta ? import.meta.env.VITE_PUBLIC_URL : '';

function ImageItem(source, description) {
  const imgSource = `${envPublicUrl}/${source}`;
  return <li class="image-item">
    <a href={imgSource} target="_blank">
      <img src={imgSource} alt={description} />
    </a>
  </li>
}

function ImageList({images, description}) {
  return <ul class="image-list">
    {images.map(image => ImageItem(image, description))}
  </ul>
}
export default ImageList;