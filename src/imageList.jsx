import { render } from 'preact';

const envPublicUrl = {
  production: 'https://earthtone0ne.github.io/freecycleGallery/',
  development: '../public',
}

function ImageItem(source, description) {
  const imgSource = `${envPublicUrl[process.env.NODE_ENV || 'development']}/${source}`;
	const returnValue = <li class="image-item">
    <img src={imgSource} alt={process.env.PUBLIC_URL || 'nothin'} onClick={() => window.open(imgSource)} />
  </li>
}


function ImageList({images, description}) {
  console.log(process.env)
  return <ul class="image-list">
    {images.map(image => ImageItem(image, description))}
  </ul>
}
export default ImageList;