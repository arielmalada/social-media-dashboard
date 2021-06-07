import React from 'react';
import { Provider } from 'react-redux';
import App from '../App';
import store from '../store';
import { MemoryRouter } from 'react-router';
import { mount } from 'enzyme';

test('render components', () => {
  const userDetail = mount(
    <MemoryRouter initialEntries={['/user/1']}>
      <Provider store={store}>
        <App />
      </Provider>
    </MemoryRouter>
  );

  expect(userDetail.text().includes('Intro')).toBe(true);
  expect(userDetail).toMatchSnapshot();
});
