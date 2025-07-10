import { render, screen, waitFor } from '@testing-library/react';
import { describe, it, expect, vi, afterEach } from 'vitest';
import { MemoryRouter } from 'react-router';
import Home from '../components/Home';
import api from '../utils/api';

// Define a single, controllable mock function for navigation
const mockNavigate = vi.fn();

// Mock useNavigate from react-router-dom
vi.mock('react-router-dom', async (importOriginal) => {
  const original = await importOriginal<typeof import('react-router')>();
  return {
    ...original,
    useNavigate: () => mockNavigate,
  };
});

// Mock the API module
vi.mock('../utils/api');

describe('Home', () => {
  afterEach(() => {
    vi.clearAllMocks();
  });

  it('renders loading initially', () => {
    render(
      <MemoryRouter>
        <Home />
      </MemoryRouter>
    );
    expect(screen.getByText(/loading/i)).toBeInTheDocument();
  });

  it('renders products after fetching the Products Successfully', async () => {
    const mockProducts = [
      { id: 1, name: 'Product 1', model: 'Model A' },
      { id: 2, name: 'Product 2', model: 'Model B' },
    ];
    (api.get as vi.Mock).mockResolvedValueOnce({ data: mockProducts });

    render(
      <MemoryRouter>
        <Home />
      </MemoryRouter>
    );

    await waitFor(() => {
      expect(screen.getByText(/Product 1/i)).toBeInTheDocument();
      expect(screen.getByText(/model a/i)).toBeInTheDocument();
      expect(screen.getByText(/model b/i)).toBeInTheDocument();
    });
  });

  it('renders error message on fetch failure', async () => {
    (api.get as vi.Mock).mockRejectedValueOnce(new Error('Network error'));

    render(
      <MemoryRouter>
        <Home />
      </MemoryRouter>
    );
    await waitFor(() => {
      expect(screen.getByText(/failed to load products/i)).toBeInTheDocument();
    });
  });
});