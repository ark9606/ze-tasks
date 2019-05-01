import React, {PureComponent} from 'react';
import PropTypes from 'prop-types';

import styles from './tooltip.module.scss';


export default class Tooltip extends PureComponent {

  render() {
    const { pointer, tooltip,  position, children, classes } = this.props;
    const containerClasses = [styles.container, ...classes].join(' ');

    return(
        <div className={containerClasses}>
          {children}
          {
            tooltip && pointer && 
              <div  style={{'--tooltip-position': `${position}%`}}
                    className={styles.image_tooltip + ' ' + styles[`tooltip_${pointer}`]}>
                {tooltip}
              </div>
          }
        </div>
    );
  }
}

Tooltip.defaultProps = {
  classes: [],
};

Tooltip.propTypes = {
  pointer: PropTypes.string,
  tooltip: PropTypes.string,
  position: PropTypes.number,
  classes: PropTypes.arrayOf(PropTypes.string)
};

