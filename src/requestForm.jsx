import { Component } from 'preact'
const myUrl = 'https://maker.ifttt.com/trigger/freecycle_interest/with/key/dGco58H-wr8YW4kHPt0IpY'

class ItemCheckbox extends Component {

  render({ item, checked, toggleCheckbox }) {
    return (
      <li class="checkbox-item">
        <label>
          <input
            type="checkbox"
            checked={checked}
            onClick={toggleCheckbox}
            disabled={item.status > 2}
            data-key={item.key}
          />
          <span class="checkbox-text">{item.description}</span>
        </label>
      </li>
    );
  }
}

class RequestForm extends Component {
  state = { 
    name: '',
    email: '',
    itemsOfInterest: {},
    pickupAvailability: '',
    comments: '',
  };

  toggleCheckbox = (event) => {
    event.stopPropagation()
    this.setState((prevState) => {
      const prevChecked = prevState.itemsOfInterest;
      const key = event.target.dataset.key;
      prevChecked[key] = !prevChecked[key];
        return {
        itemsOfInterest: prevChecked, 
        ...prevState
      }
    });
  };
  validateOnBlur = ({ target }) => {
    setTimeout(() => target.classList.add('input-visited'), 700);
  }
  encodeOrBlank = (str) => encodeURIComponent(str ? str.trim() : '')
  
  render({ items, hideFormOverlay }, { name, email, pickupAvailability, comments, itemsOfInterest }) {
    const onSubmit = e => {
      e.preventDefault();
      console.log('submit', this.state)
      const emailString = this.encodeOrBlank(email)
      const nameString = this.encodeOrBlank(name)
      const emailName = [emailString, nameString].join('__')
      const value1 = emailName ? `value1=${emailName}` : null
      const items = Object.keys(itemsOfInterest)
      const value2 = items.length ? `value2=${encodeURIComponent(items)}` : null
      const commentPickupString = [
        this.encodeOrBlank(comments), this.encodeOrBlank(pickupAvailability)
      ].join('__')
      const value3 = commentPickupString ? `value3=${commentPickupString}` : null
      const params = [value1, value2, value3].filter(x => x).join('&')
      fetch(`${myUrl}?${params}`)
      // console.log(`${myUrl}?${params}`)
      hideFormOverlay();
    }
    
    const onInput = e => {
      console.log(e, this.state)
      const { value, name } = e.target;
      this.setState({ [name]: value })
      this.validateOnBlur(e)
    }
    return (
      <div class="form-container">
        <form onSubmit={onSubmit} class="interest-form">
          <label>
            <span class="label-text">Name</span>
            <input
              class={`input ${!name.trim() && 'empty'}`} type="text" name="name" value={name}
              onInput={onInput} onBlur={this.validateOnBlur}
            />
          </label>
          <label>
            <span class="label-text">Email (phone if you prefer text)</span>
            <input
              class={`input ${!email.trim() && 'empty'}`} type="text" name="email" value={email}
              onInput={onInput} onBlur={this.validateOnBlur}
            />
          </label>
          <label class="checkbox-section">
            <p class="label-text">What item(s) are you interested in?</p>
            <ul>
              {items.map(item => (
                <ItemCheckbox
                  item={item}
                  toggleCheckbox={this.toggleCheckbox}
                  checked={itemsOfInterest[item.description]}/>)
                )}
            </ul>
          </label>
          <label>
            <p class="label-text">Comments? (let me know you're a human by telling me briefly why you're interested)</p>
            <textarea
              class={`input ${!comments.trim() && 'empty'}`} name="comments" value={comments}
              onInput={onInput} onBlur={this.validateOnBlur}
            />
          </label>
          <label>
            <p class="label-text">Are you able to pick up in Hawthorne NJ before August 10?</p>
            <input
              class={`input ${!pickupAvailability.trim() && 'empty'}`} type="text" name="pickupAvailability" value={pickupAvailability}
              onInput={onInput} onBlur={this.validateOnBlur}
            />
          </label>
          <button type="submit">Send request</button>
        </form>
      </div>


    );
  }
}
export default RequestForm