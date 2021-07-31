import { render } from 'preact'
import { useState } from 'preact/hooks';

import itemRows from './dataRows'
import ListingItem from './listingItem'
import RequestForm from './requestForm'
import './style.scss'

function App(props) {
  const [isFormActive, setIsFormActive] = useState(false);

  const items = itemRows.filter(item => item.status < 3)
  items.sort((a,b) => a.status - b.status);

  const showFormOverlay = evt => {
    setIsFormActive(true)
    document.body.classList.add('noscroll');
  }
  const hideFormOverlay = evt => {
    setIsFormActive(false)
    document.body.classList.remove('noscroll');
  }
  
	return <>
    {isFormActive ?
      <RequestForm items={items} hideFormOverlay={hideFormOverlay}/>
      : <button onClick={showFormOverlay}>Click to Request Items</button>
    }
		<ul class="item-list">
      {items.map(ListingItem) }
    </ul>
	</>
}

render(<App />, document.getElementById('app'))
