import React from 'react';
import Enzyme, { shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import ListBooks from './ListBooks';

Enzyme.configure({ adapter: new Adapter() });

it('list books title', () => {
  const books = [
    {
      id: '1',
      title: 'Livro A',
      authors: [],
      imageLinks: [{ thumbnail: 'url' }]
    },
    {
      id: '2',
      title: 'Livro B',
      authors: [],
      imageLinks: [{ thumbnail: 'url' }]
    }
  ];
  const wrapper = shallow(<ListBooks books={books} />);
  const items = wrapper.find('li');

  expect(items.length).toEqual(2);

  expect(
    wrapper
      .find('.book-title')
      .first()
      .text()
  ).toEqual('Livro A');
  expect(
    wrapper
      .find('.book-title')
      .last()
      .text()
  ).toEqual('Livro B');
});

it('list books authors', () => {
  const books = [
    {
      id: '1',
      title: 'Livro A',
      authors: ['Fulano'],
      imageLinks: [{ thumbnail: 'url' }]
    }
  ];

  const wrapper = shallow(<ListBooks books={books} />);
  expect(
    wrapper
      .find('.book-authors')
      .first()
      .text()
  ).toEqual('Fulano');
});
