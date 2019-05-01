import React, {PureComponent} from 'react';
import styles from './image_form.module.scss';
import Button from './Button';

export default class PointersGrid extends PureComponent {

  handleClick = (value) => {
    this.props.handlePointerChange('pointer', value);
  }

  render() {
    const {pointer} = this.props;
    return (
      <div className={styles.pointers}>
        <Button title='Top' selected={pointer === 'top'} onClick={() => this.handleClick('top')}/>
        <Button title='Right' selected={pointer === 'right'} onClick={() => this.handleClick('right')}/>
        <Button title='Bottom' selected={pointer === 'bottom'} onClick={() => this.handleClick('bottom')}/>
        <Button title='Left' selected={pointer === 'left'} onClick={() => this.handleClick('left')}/>
      </div>
    );
  }
}