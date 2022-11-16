import styled from 'styled-components';
import { Header1CSS } from 'components/layout/headers';
import { Text18CSS, TextCSS } from 'components/layout/text';

export const EditorContainer = styled.div`
  p {
    margin-top: 0;
    margin-bottom: 1em
  }

  .ql-editor {
    min-height: 200px;
  }

  .ql-snow.ql-toolbar button.tag {
    width: auto;
  }

  .ql-applyClass {
    width: 180px;

    .ql-picker-item:before {
      content: attr(data-label);
    }

    .ql-picker-label:before {
      content: attr(data-content);
    }
  }

  .discount-price {
    ${Header1CSS};
    color: ${({ theme }) => theme.colors.primary};
  }

  .secondary-text {
    ${TextCSS};
    color: ${({ theme }) => theme.colors.darkGrey};
  }

  .modal-text {
    ${Text18CSS};
    line-height: 1.3;
    color: ${({ theme }) => theme.colors.darkGrey};
    margin: 8px 0;
  }
`;
