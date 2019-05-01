import React, {PureComponent} from 'react';
import PropTypes from 'prop-types';

import styles from './image_view.module.scss';

import Tooltip from '../Tooltip';

const ImageButton = ({position, onClick, children}) => (
  <button className={styles.button} 
          data-pos={position} onClick={onClick}>{children}</button>
)


export default class ImageView extends PureComponent {

  render() {
    const { onClose, image, ...rest} = this.props;
    
    return(
      <div className={styles.wrapper}>
        <Tooltip {...rest} classes={[styles.image_container]}>
          <img src={image} alt={rest.tooltip}/>
          <ImageButton position='right' onClick={onClose}>Close</ImageButton>
        </Tooltip>
      </div>
    );
  }
}



ImageView.propTypes = {
  pointer: PropTypes.string,
  tooltip: PropTypes.string,
};

