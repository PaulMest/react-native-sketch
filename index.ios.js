import React from "react";
import {NativeModules, requireNativeComponent, StyleSheet, View, ViewPropTypes} from "react-native";
import PropTypes from 'prop-types';

const {func, number, string} = PropTypes;
const SketchManager = NativeModules.RNSketchManager || {};
const BASE_64_CODE = 'data:image/png;base64,';
const styles = StyleSheet.create({
  base: {
    flex: 1,
    height: 200,
  },
});

export default class Sketch extends React.Component {
  static propTypes = {
    onReset: func,
    onUpdate: func,
    strokeColor: string,
    strokeThickness: number,
    style: ViewPropTypes.style,
  };

  static defaultProps = {
    onReset: () => {},
    onUpdate: () => {},
    strokeColor: '#000000',
    strokeThickness: 1,
    style: null,
  };

  constructor(props) {
    super(props);
    this.onReset = this.onReset.bind(this);
    this.onUpdate = this.onUpdate.bind(this);
  }

  onReset() {
    this.props.onUpdate(null);
    this.props.onReset();
  }

  onUpdate(e) {
    if (e.nativeEvent.image) {
      this.props.onUpdate(`${BASE_64_CODE}${e.nativeEvent.image}`);
    } else {
      this.onReset();
    }
  }

  saveImage(image) {
    if (typeof image !== 'string') {
      return Promise.reject('You need to provide a valid base64 encoded image.');
    }

    const src = image.indexOf(BASE_64_CODE) === 0 ? image.replace(BASE_64_CODE, '') : image;
    return SketchManager.saveImage(src);
  }

  render() {
    return (
      <RNSketch
        {...this.props}
        onChange={this.onUpdate}
        style={[styles.base, this.props.style]}
      />
    );
  }

}

const RNSketch = requireNativeComponent('RNSketch', Sketch);
