import { render } from 'preact'
import ImageList from './imageList'

const STATUS = {
  1: "available",
  2: "promised",
  3: "taken",
  4: "hidden",
}

function ListingItem({status,description,measurements,condition, images}) {
	return <li class={`item-card item-${STATUS[status]}`}>
    <ImageList images={images} description={description} />
    <h3>{description}</h3>
    <p class="condition">{condition}</p>
    <p class="measurements">{measurements}</p>
	</li>
}

export default ListingItem;