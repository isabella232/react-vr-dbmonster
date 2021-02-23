/**
 * Copyright (c) 2015-present, Facebook, Inc.
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree. An additional grant
 * of patent rights can be found in the PATENTS file in the same directory.
 *
 * @providesModule DirectionalLight
 */
'use strict';

const ColorPropType = require('ColorPropType');
const NativeMethodsMixin = require('react/lib/NativeMethodsMixin');
const PropTypes = require('react/lib/ReactPropTypes');
const React = require('React');
const ReactNative = require('ReactNative');
const View = require('View');
const StyleSheetPropType = require('StyleSheetPropType');
const LayoutAndTransformPropTypes = require('LayoutAndTransformPropTypes');

const requireNativeComponent = require('requireNativeComponent');

const stylePropTypes = StyleSheetPropType({
  ...LayoutAndTransformPropTypes,
  backgroundColor: ColorPropType,
});

/**
 * A light which is an infinite distance away and orientated along a particular direction
 *
 * [Wikipedia](https://en.wikipedia.org/wiki/Shading#Directional_lighting) defines directional
 * lighting as a light source which illuminates all objects equally from a given direction,
 * like an area light of infinite size and infinite distance from the scene; there is shading,
 * but cannot be any distance falloff.
 *
 * Representation of
 *
 * https://threejs.org/docs/index.html#Reference/Lights/DirectionalLight
 */
const DirectionalLight = React.createClass({
  mixins: [NativeMethodsMixin],

  propTypes: {
    ...View.propTypes,
    style: stylePropTypes,

    /**
     * Intensity of the light
     */
    intensity: PropTypes.number,
  },

  getDefaultProps: function() {
    return {
    };
  },
  render: function() {
    var props = {...this.props} || {};
    props.style = props.style || {};
    if (!props.style.position) {
      props.style.position = 'absolute';
    }
    return (
      <RKDirectionalLight
        {...props}
        testID={this.props.testID}
        onStartShouldSetResponder={() => true}
        onResponderTerminationRequest={() => false}>
        {this.props.children}
      </RKDirectionalLight>
    );
  }
});

const RKDirectionalLight = requireNativeComponent('DirectionalLight', DirectionalLight, {
  nativeOnly: {
  }
});

module.exports = DirectionalLight;