import React, { PureComponent } from 'react';
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

import './style.scss';
import { request, baseURL } from '../../../state/util';
import { DateTime } from "luxon";


const getCategories = async () => {
  return await request({
    method: 'get',
    url: `${baseURL}/categories`,
  })
  .then(res => {
    return res;
  })
  .catch(err => {
    console.log(err);
  });
}

const IconPlus = () => (
  <svg height="448pt" viewBox="0 0 448 448" width="448pt" xmlns="http://www.w3.org/2000/svg">
    <path d="m408 184h-136c-4.417969 0-8-3.582031-8-8v-136c0-22.089844-17.910156-40-40-40s-40 17.910156-40 40v136c0 4.417969-3.582031 8-8 8h-136c-22.089844 0-40 17.910156-40 40s17.910156 40 40 40h136c4.417969 0 8 3.582031 8 8v136c0 22.089844 17.910156 40 40 40s40-17.910156 40-40v-136c0-4.417969 3.582031-8 8-8h136c22.089844 0 40-17.910156 40-40s-17.910156-40-40-40zm0 0"/>
  </svg>
);

const IconPlus2 = () => (
<svg version="1.1" id="Capa_1" xmlns="http://www.w3.org/2000/svg" x="0px" y="0px"
   viewBox="0 0 491.86 491.86" style={{"enableBackground": "new 0 0 491.86 491.86"}}>
   
  <g>
    <g>
      <path d="M465.167,211.614H280.245V26.691c0-8.424-11.439-26.69-34.316-26.69s-34.316,18.267-34.316,26.69v184.924H26.69
        C18.267,211.614,0,223.053,0,245.929s18.267,34.316,26.69,34.316h184.924v184.924c0,8.422,11.438,26.69,34.316,26.69
        s34.316-18.268,34.316-26.69V280.245H465.17c8.422,0,26.69-11.438,26.69-34.316S473.59,211.614,465.167,211.614z"/>
    </g>
  </g>
</svg>);


const Row = ({children, className, ...props}) => (<div className={`row ${className}`} {...props}>{children}</div>);


export default class AddTodo extends PureComponent {

  initialState = {
    name: "",
    description: "",
    date: null,
    time: null,
    // repeat: "",
    category: null,
  };

  constructor(props){
    super(props);

    this.state = this.initialState;
  }

  componentDidMount() {

    getCategories()
    .then(cats => {
      this.setState({cats});
    })
  }


  submit = (e) => {
    e.preventDefault();
  }

  onSave = () => {
    const { name, description, date, time, category } = this.state;
    
    this.props.addTodo({
      name,
      description: description === "" ? null: description,
      categoryId: +category === 0 ? null : category,
      date: date ? DateTime.fromJSDate(date).toFormat('yyyy-MM-dd') : DateTime.local().toFormat('yyyy-MM-dd'),
      time
    }).then(res => {
      alert('Success!');
      this.setState(this.initialState);
    });
  }

  onChange = (e) => {
    this.setState({
      [e.target.name]: e.target.value
    });

  }

  onSetDate = (dt) => {
    if(!dt) {
      this.setState({date: null, time: null});
      return;
    }

    const h = dt.getHours();
    const m = dt.getMinutes();
    const time = `${h}:${m}:00`;
 
    this.setState({
      date: dt,
      time: (+h + +m) === 0 ? null: time
    });
  }

  render() {

    const { name, description, date, cats, category } = this.state;

    
    return (
      <form onSubmit={this.submit} className="add_todo">


        <details>
          <summary title='Show more'>
            <Row>
              <input type="text" className="input_txt control" name="name" placeholder="Title" minLength={3} maxLength={80} value={name} required onChange={this.onChange}/>
              <button type="submit" className="button" onClick={this.onSave}><IconPlus/></button>
            </Row>
          </summary>
          <Row>
          <textarea name="description" className={`input_txt control ${description === '' ? 'fade': ''}`} placeholder="Description" maxLength={200} value={description} onChange={this.onChange}/>
        </Row>

        <Row className='drop_inputs'>
          <DatePicker
            selected={date}
            showTimeSelect
            dateFormat="MMMM d, yyyy h:mm aa"
            timeCaption="time"
            timeIntervals={15}
            minDate={new Date()}
            timeFormat="HH:mm"
            isClearable={true}
            placeholderText="Click to select a date" 
            className={`drop_input control ${date ? '' : 'fade'}`}
            onChange={this.onSetDate}/>
     

          { cats && <select defaultValue={0} name='category' className={`drop_input control ${ !!+category ? '' : 'fade'}`} onChange={this.onChange}>
              <option value={0}>No category</option>
              {cats.map(cat => <option key={cat.id} value={cat.id}>{cat.name}</option>)}
            </select>
          }
        </Row>


        </details>


      </form>
    );
  }
}
