import React, {PureComponent} from 'react';

const style = {
  // textAlign: 'start',
  fontWeight: 600,
  margin: '10px'
}

export default class Title extends PureComponent {
  render() {

    return (<h2 style={style}>{this.props.text}</h2>);
  }
}
