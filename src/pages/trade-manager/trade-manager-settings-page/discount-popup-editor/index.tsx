import React, { useCallback, useEffect, useMemo } from 'react';
import ReactQuill, { Quill, Range, UnprivilegedEditor } from 'react-quill';

import 'react-quill/dist/quill.snow.css';

import { EditorContainer } from './elements';

import type { Sources } from 'quill';
import type { ReactQuillProps } from 'react-quill';

interface IDiscountPopupEditor extends ReactQuillProps {
  value?: string;
  onChange?: (value?: string) => void;
}

const Inline = Quill.import('blots/inline');

class ApplyPopupClass extends Inline {
  static blotName = 'applyPopupClass';
  static tagName = 'span';

  static create({ className }: { className: string }) {
    const node = super.create() as HTMLElement;
    node.setAttribute('class', className);

    return node;
  }

  static formats(domNode: HTMLElement) {
    return domNode || true;
  }

  formats() {
    return super.formats();
  }
}

Quill.register(ApplyPopupClass);

const getModules = (className: string) => ({
  toolbar: {
    container: `#toolbar${className}`,
    handlers: {
      'applyClass': function(value: string) {
        const quill = (this as unknown as { quill: typeof Quill.prototype }).quill;
        const range = quill.getSelection();

        if (range) {
          quill.formatText(range.index, range.length, 'applyPopupClass', { className: value });
          quill.setSelection(range.index, range.length);
        }
      },
      'insertPrice': function() {
        const quill = (this as unknown as { quill: typeof Quill.prototype }).quill;
        const cursorPosition = quill.getSelection()?.index;
        quill.insertText(cursorPosition || 0, '[PRICE]');
      },
      'insertDiscount': function() {
        const quill = (this as unknown as { quill: typeof Quill.prototype }).quill;
        const cursorPosition = quill.getSelection()?.index;
        quill.insertText(cursorPosition || 0, '[DISCOUNT]');
      },
      'insertRate': function() {
        const quill = (this as unknown as { quill: typeof Quill.prototype }).quill;
        const cursorPosition = quill.getSelection()?.index;
        quill.insertText(cursorPosition || 0, '[RATE]');
      },
    },
  },
});

export const DiscountPopupEditor = ({ value, onChange, className = '' }: IDiscountPopupEditor) => {
  const cachedModules = useMemo(() => getModules(className), [className]);
  const onSelectionChange = useCallback((selection: Range, source: Sources, editor: UnprivilegedEditor) => {
    const apply = document.querySelector(`#toolbar${className} .ql-applyClass .ql-picker-label`);
    let popupClassValue = 'Select text style';

    if (apply && selection) {
      const content = editor.getContents(selection.index, selection.length).ops;
      if (content) {
        content.forEach((item) => {
          const DOM = item.attributes?.['applyPopupClass'] as HTMLElement;
          if (DOM !== undefined) {
            popupClassValue = document.querySelector(`.ql-picker-item[data-value="${DOM.className}"]`)?.getAttribute("data-label") || '';
          }
        });
      }

      apply.setAttribute('data-content', popupClassValue);
    }
  }, [className]);

  useEffect(() => {
    const defaultSelector = document.querySelector(`#toolbar${className} .ql-applyClass .ql-picker-label`);

    if (defaultSelector) {
      defaultSelector.setAttribute('data-content', 'Select text style');
    }
  }, [className]);

  return (
    <EditorContainer className={className}>
      <div id={`toolbar${className}`}>
        <span className="ql-formats">
          <button className="ql-bold" />
          <button className="ql-italic" />
          <button className="ql-underline" />
          <button className="ql-strike" />
        </span>

        <span className="ql-formats">
          <button className="ql-list" value="ordered" />
          <button className="ql-list" value="bullet" />
          <button className="ql-indent" value="-1" />
          <button className="ql-indent" value="+1" />
          <button className="ql-clean"></button>
        </span>

        <span className="ql-formats">
          <button className="ql-insertPrice tag">[PRICE]</button>
          <button className="ql-insertDiscount tag">[DISCOUNT]</button>
          <button className="ql-insertRate tag">[RATE]</button>
        </span>

        <span className="ql-formats">
          <select className="ql-applyClass">
            <option value="modal-text">Main text</option>
            <option value="secondary-text">Secondary text</option>
            <option value="discount-price">Price text</option>
          </select>
        </span>
      </div>

      <ReactQuill
        value={value}
        onChange={onChange}
        modules={cachedModules}
        onChangeSelection={onSelectionChange}
      />
    </EditorContainer>
  );
};
