import React from 'react';
import { mount } from 'enzyme';

import {} from '../../entry.noworker';
import PageSVG from '../PageSVG';

import failingPage from '../../../__mocks__/_failing_page';

import { makeAsyncCallback, muteConsole, restoreConsole } from '../../__tests__/utils';

/* eslint-disable comma-dangle */

describe('PageSVG', () => {
  describe('loading', () => {
    it('calls onRenderError when failed to render canvas', async () => {
      const {
        func: onRenderError, promise: onRenderErrorPromise
      } = makeAsyncCallback();

      muteConsole();

      mount(
        <PageSVG />,
        {
          context: {
            onRenderError,
            page: failingPage,
          }
        }
      );

      expect.assertions(1);
      await expect(onRenderErrorPromise).resolves.toBeInstanceOf(Error);

      restoreConsole();
    });
  });
});
