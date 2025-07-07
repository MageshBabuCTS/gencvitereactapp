import { render, screen, waitFor } from '@testing-library/react';
import { vi } from 'vitest';
import Home from '../components/Home';
import api from '../utils/api';

vi.mock('../utils/api');

describe('Home', () => {
    afterEach(() => {
        vi.clearAllMocks();
    });

    it('renders loading initially', () => {
        render(<Home />);
        expect(screen.getByText(/loading/i)).toBeInTheDocument();
    });

    it('renders products after fetching the Products Successfully', async () => {
        const mockProducts = [
            { id: 1, name: 'Product 1', model: 'Model A' },
            { id: 2, name: 'Product 2', model: 'Model B' },
        ];
        (api.get as vi.Mock).mockResolvedValueOnce({ data: mockProducts });

        render(<Home />);

        await waitFor(() => {
            expect(screen.getByText(/product 1/i)).toBeInTheDocument();
            expect(screen.getByText(/model a/i)).toBeInTheDocument();
            expect(screen.getByText(/product 2/i)).toBeInTheDocument();
            expect(screen.getByText(/model b/i)).toBeInTheDocument();
        });
    });

    it('renders error message on fetch failure', async () => {
        (api.get as any).mockRejectedValueOnce(new Error('Network error'));

        render(<Home />);
        await waitFor(() => {
            expect(screen.getByText(/failed to load products/i)).toBeInTheDocument();
        });
    });
});