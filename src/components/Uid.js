import React from 'react';
import PropTypes from 'prop-types';
export class Uid extends React.Component {
  static contextTypes = {
    uid: PropTypes.string
  }

  static propTypes = {
    children: PropTypes.func.isRequired
  }

  render() {
    return this.props.children(this.context.uid);
  }
}