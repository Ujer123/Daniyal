import { render, fireEvent } from '@testing-library/react';
import FeaturedProduct from '../FeaturedProduct';
const mockPush = jest.fn();

jest.mock('next/image', () => ({
  __esModule: true,
  default: (props) => <img {...props} />,
}));

describe('FeaturedProduct', () => {
  const mockProduct = {
    id: '1',
    title: 'Test Product',
    description: 'Test Description',
    image: ['/test-image.jpg'],
  };
  beforeEach(() => {
    mockPush.mockClear();
    window.scrollTo.mockClear();
  });

  it('navigates to product page on click', () => {
    const { container } = render(<FeaturedProduct/>);
    fireEvent.click(container.firstChild);
  });
});