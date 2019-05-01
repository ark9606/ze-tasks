import React, {PureComponent} from 'react';

import styles from './image_form.module.scss';

export default class Button extends PureComponent {

  render(){
    const { title, onClick, selected } = this.props;
    return(
      <button onClick={onClick} 
              className={styles.button + ` ${selected ? styles.button_selected : ''}`}>
              { title }
      </button>
    );
  }
}
