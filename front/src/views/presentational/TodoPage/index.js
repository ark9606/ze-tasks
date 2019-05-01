import React, { PureComponent } from 'react';
import './style.scss';
import Page from '../Page';
import AddTodo from '../AddTodo';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { addTodo, selectTodo, setTodos } from '../../../state/duck/todo';
import { request, baseURL } from '../../../state/util'
import { DateTime } from "luxon";

export const Todo = ({name, time, description, done, onDoneChange, onDeleteTodo}) => {
  const prettyTime = time && time.slice(0, time.lastIndexOf(':'));

  return (
    <div className='todo'>    
      <div className='row'>

        { onDoneChange ? 
          <input className='checkbox' type='checkbox' title="Change" checked={done} onChange={onDoneChange}/>
          : <div className='circle'/>
        }
    
        { time && <span className='time'>{prettyTime}</span>}
        <div className=''>
          <span className='name'>{name}</span>
          { description && <p className="description">{description}</p>}
        </div>

        {onDeleteTodo && <div className='todo_delete_btn' onClick={onDeleteTodo} title="Delete">✖</div>}

      </div>
    </div>
  );
}



const WeatherInfo = ({period, condition:{ name_en }, temperature}) => (
  <p className='weather'>
    <span className='period'>{period}</span>
    <span>{(+temperature) >> 0}&#8451;, {name_en}</span>
  </p>
);

const getWeather = ({latitude, longitude, date}) => {
  return request({
    method: 'post',
    url: `${baseURL}/weather`,
    data: {
      latitude,
      longitude,
      date
    }
  }).then(res => {
    return res;
  })
}

class App extends React.Component {
  constructor(props){
    super(props);

    this.state = {
      current: 0,

      forecast: null,
      latitude: null,
      longitude: null,
    };

    this.now = DateTime.local();

    this.boundActionCreators = bindActionCreators({
      addTodo, selectTodo
    }, props.dispatch);
  }

  componentDidMount() {
    const { user, todo } = this.props;

    this.boundActionCreators.selectTodo()
    .then(() => {
      return new Promise((resolve, reject) => {
        if (!navigator.geolocation) {
          reject(null);
        }
        navigator.geolocation.getCurrentPosition(pos => {
          resolve(pos);
        });
      })     
    })
    .then(pos => {

      this.setState({
        latitude: pos.coords.latitude,
        longitude: pos.coords.longitude,
      });

      return todo.length === 0 ? null : getWeather({
        latitude: pos.coords.latitude,
        longitude: pos.coords.longitude,
        date: this.currDate
      })      
    })
    .then(forecast => {

      if(forecast)
        this.setState({forecast})
    })
    .catch(console.log);
  }
  onNextPage(val) {
    const { latitude, longitude, current } = this.state;
    let newCurr = current + val;
    newCurr = newCurr < 0 ? 0: newCurr;

    if(newCurr === current)
      return;

    const date = this.now.plus({days: newCurr}).toFormat('yyyy-MM-dd');

    this.setState({ current: newCurr }, () => {
      const currTodos = this.currentTodos;

      if(currTodos[0].length + currTodos[1].length === 0 )
        return;

      getWeather({
        latitude: latitude,
        longitude: longitude,
        date,
      })      
      .then(forecast => {
        this.setState({forecast})
      })
    })


  }

  onDoneChange(todoId) {
    const { user, dispatch, todo } = this.props;

    request({
      method: 'put',
      url: `${baseURL}/users/${user.id}/todos/${todoId}`
    })
    .then(res => {
      const newTodos = [...todo];      
      const index = newTodos.findIndex((todo) => todo.id === todoId);
      newTodos[index].done = res.done;
      dispatch(setTodos(newTodos));
    });
  }

  onDeleteTodo(todoId) {
    const { user, dispatch, todo } = this.props;

    request({
      method: 'delete',
      url: `${baseURL}/users/${user.id}/todos/${todoId}`
    })
    .then(res => {
      const newTodos = todo.filter((todo) => todo.id !== todoId);     
      dispatch(setTodos(newTodos));
    });
  }

  get currDate() {
    const { current } = this.state;
    return this.now.plus({days: current}).toFormat('yyyy-MM-dd');
  }

  get currentTodos() {
    const { todo: todos } = this.props;
    const { forecast } = this.state;

    const date = this.currDate;

    const timeTodo = [];
    let dayTodo = [];

    todos.forEach(todo => {
      if(todo.date === date) {
        if(todo.time) 
          timeTodo.push(todo);        
        else 
          dayTodo.push(todo);        
      }
    });

    const timeTodoWithWeather = [];

    if (forecast) {
      const weather = forecast.forecasts[0];
      // const timePeriods = Object.keys(forecast.forecasts[0]).filter(item => item !== 'date');
      const timePeriods = ["morning",  "afternoon", "evening", "night"]

      timePeriods.forEach(period => {


        const suitableTodos = [];

        timeTodo.forEach(todo => {
          const h = +todo.time.split(':')[0];

          switch (period) {
            case "morning":  
                if(4 < h && h < 11) {          
                  suitableTodos.push(<Todo key={todo.id} {...todo} 
                          onDeleteTodo={() => this.onDeleteTodo(todo.id)}
                          onDoneChange={() => this.onDoneChange(todo.id)}/>)
                }              
              break;
            case "afternoon":
                if(11 < h && h < 16) {          
                  suitableTodos.push(<Todo key={todo.id} {...todo} 
                          onDeleteTodo={() => this.onDeleteTodo(todo.id)}
                          onDoneChange={() => this.onDoneChange(todo.id)}/>)
                }              
              break;
            case "evening":
                if(16 < h && h < 21) {          
                  suitableTodos.push(<Todo key={todo.id} {...todo} 
                          onDeleteTodo={() => this.onDeleteTodo(todo.id)}
                          onDoneChange={() => this.onDoneChange(todo.id)}/>)
                }   
              break;
            case "night":
                if(h < 4 || h > 21) {          
                  suitableTodos.push(<Todo key={todo.id} {...todo} 
                          onDeleteTodo={() => this.onDeleteTodo(todo.id)}
                          onDoneChange={() => this.onDoneChange(todo.id)}/>)
                }   
              break;
          
            default:
              break;
          }

        });

        if(suitableTodos.length > 0) {
          timeTodoWithWeather.push(<WeatherInfo key={period} period={period} {...weather[period]}/>);
          timeTodoWithWeather.push(...suitableTodos);
        }

      })
      
    }

    dayTodo = dayTodo.map(todo => <Todo key={todo.id} {...todo} 
      onDeleteTodo={() => this.onDeleteTodo(todo.id)}
      onDoneChange={() => this.onDoneChange(todo.id)}/>);
    
    return [ timeTodoWithWeather, dayTodo ];
  }

  render() {  
    const { addTodo } = this.boundActionCreators;
    const { current } = this.state;
    const { todo } = this.props;
    
    const [ timedTodos, dayTodos ] = this.currentTodos;

    return (
      <Page className='todo_page' title=''>
        <p className="page_title">Add TODO to your plan</p>
        <AddTodo addTodo={addTodo}/>

        <header className="date">
          <div className='next_page_btn' onClick={() => this.onNextPage(-1)}>&larr;</div>
          <p className="page_title">{this.now.plus({day: current}).setLocale('en').toLocaleString({ month: 'long', day: 'numeric', year: 'numeric' })}</p>
          <div className='next_page_btn' onClick={() => this.onNextPage(1)}>&rarr;</div>
        </header>

        {dayTodos.length + timedTodos.length === 0 && <p className='no_tasks'>No tasks... Let's create one!</p>}

        <div className='todo_list_container'>
          <div className='todo_list'>
            {timedTodos}
          </div>
          { dayTodos.length !== 0 && 
            <React.Fragment>
              <div className='todo_list_breakline'/>
              <div className='todo_list_breakline_text'>Day tasks</div>

            </React.Fragment>
          
          }
          <div className='todo_list'>
            {dayTodos}
          </div>
        </div>


      </Page>
    );
  }
}

const mapStateToProps = ({user, todo}) => ({
  user, todo
});

export default connect(mapStateToProps, null)(App);