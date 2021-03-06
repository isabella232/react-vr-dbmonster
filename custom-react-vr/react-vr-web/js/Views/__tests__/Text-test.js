/**
 * Copyright (c) 2015-present, Facebook, Inc.
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree. An additional grant
 * of patent rights can be found in the PATENTS file in the same directory.
 */

'use strict';

const MockUIView = jest.fn(() => ({
  setHitSlop: jest.fn(),
  setBackgroundColor: jest.fn(),
  setTextSize: jest.fn(),
  setTextAlphaCenter: jest.fn(),
  setTextColorCenter: jest.fn(),
  setTextHAlign: jest.fn(),
  setTextVAlign: jest.fn(),
}));

jest
  .dontMock('../Text')
  .dontMock('../BaseView')
  .dontMock('../../Utils/Utils')
  .mock('ovrui', () => ({
    UIView: MockUIView,
    SDFFONT_MARKER_COLOR: '\x00',
  }), {virtual: true});

const Text = require('../Text').default;

describe('RCTText', () => {
  it('initializes properties on construction', () => {
    const t = new Text();
    expect(t.props._numberOfLines).toBe(0);
    expect(t._textDirty).toBe(true);
    expect(t.isDirty).toBe(true);
    expect(t.view.setTextAlphaCenter.mock.calls[0][0]).toBe(0.49 - 200/10000);
    expect(t.view.setTextColorCenter.mock.calls[0][0]).toBe(0.52 - 200/10000);
    expect(t.view.setTextSize.mock.calls[0][0]).toBe(0.1);
    expect(t._fontSize).toBe(0.1);
    expect(t.view.setTextHAlign.mock.calls[0][0]).toBe('left');
    expect(t.view.setTextVAlign.mock.calls[0][0]).toBe('top');
  });

  it('can extract text with colors', () => {
    const t = new Text();
    const line1 = {props: {text: 'Line one'}, isRawText: true};
    const line2 = {props: {text: 'Line two'}, isRawText: true};
    t.addChild(0, line1);
    t.addChild(1, line2);
    expect(t.textChildren).toEqual([line1, line2]);
    expect(t.getText(0xff336699)).toBe('\x00\x33\x66\x99\xffLine oneLine two');

    const c = new Text();
    c.style.color = 0xffaabbcc;
    c.addChild(0, {props: {text: 'Nested text'}, isRawText: true});
    expect(c.getText()).toBe('\x00\xaa\xbb\xcc\xffNested text');
    t.addChild(1, c);
    // TODO: This should probably happen automatically
    t._textDirty = true;
    expect(t.getText(0xff336699)).toBe(
      '\x00\x33\x66\x99\xffLine one\x00\xaa\xbb\xcc\xffNested textLine two'
    );
  });
});
