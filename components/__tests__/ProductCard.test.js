import { render, screen, fireEvent } from '@testing-library/react';
import ProductCard from '../ProductCard';
const mockPush = jest.fn();
jest.mock('@/context/AppContext', () => ({
  useAppContext: () => ({
    currency: '$',
    router: { 
        push: mockPush,
        query: {},
        pathname: '/product/[id]',
    },
  }),
}));

jest.mock('next/image', () => ({
  __esModule: true,
  default: (props) => <img {...props} />,
}));

describe('ProductCard', () => {
  const mockProduct = {
    _id: '1',
    title: 'Test Product',
    price: 99.99,
    description: 'Test Description',
    image: ['/test-image.jpg'],
  };
  beforeEach(() => {
    mockPush.mockClear();
    window.scrollTo.mockClear();
  });

  it('renders product information correctly', () => {
    render(<ProductCard product={mockProduct} />);
    
    expect(screen.getByText('Test Product')).toBeInTheDocument();
    expect(screen.getByText('$99.99')).toBeInTheDocument();
    expect(screen.getByText('Test Description')).toBeInTheDocument();
  });

  it('navigates to product page on click', () => {
    const { container } = render(<ProductCard product={mockProduct} />);
    fireEvent.click(container.firstChild);
    expect(mockPush).toHaveBeenCalledWith('/product/1');
    expect(window.scrollTo).toHaveBeenCalledWith(0, 0);
  });
});