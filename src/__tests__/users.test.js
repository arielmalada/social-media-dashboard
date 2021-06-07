import React from 'react';
import { Provider } from 'react-redux';
import App from '../App';
import store from '../store';
import { MemoryRouter } from 'react-router';
import { mount } from 'enzyme';

test('render components', () => {
  const user = mount(
    <MemoryRouter initialEntries={['/']}>
      <Provider store={store}>
        <App />
      </Provider>
    </MemoryRouter>
  );
  // first time using unit testing, sorry there's no detail testing
  expect(user.text().includes('Social')).toBe(true);
  expect(user).toMatchSnapshot();
});
