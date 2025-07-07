import { describe, it, expect, vi, beforeEach } from 'vitest';
import { render, fireEvent, screen, waitFor } from '@testing-library/react';
import { MemoryRouter } from 'react-router';
import * as authModule from '../utils/auth';
import Login from '../components/Login';

// Mock useNavigate from react-router
const mockNavigate = vi.fn(); // Define a single, controllable mock function

vi.mock('react-router', async (importOriginal) => {
    const original = await importOriginal<typeof import('react-router')>();
    return {
        ...original,
        useNavigate: () => mockNavigate, // Always return the SAME mockNavigate instance
    };
});

describe('Login component', () => {
    let mockLogin: ReturnType<typeof vi.fn>;  

    beforeEach(() => {
        mockLogin = vi.fn();
       mockNavigate.mockClear(); 
        vi.spyOn(authModule, 'login').mockImplementation(mockLogin);
    });

    it('renders username and password inputs and login button', () => {
        render(
            <MemoryRouter>
                <Login />
            </MemoryRouter>
        );
        expect(screen.getByPlaceholderText(/username/i)).toBeInTheDocument();
        expect(screen.getByPlaceholderText(/password/i)).toBeInTheDocument();
        expect(screen.getByRole('button', { name: /login/i })).toBeInTheDocument();
    });

    it('updates username and password state on input', () => {
        render(
            <MemoryRouter>
                <Login />
            </MemoryRouter>
        );
        const usernameInput = screen.getByPlaceholderText(/username/i);
        const passwordInput = screen.getByPlaceholderText(/password/i);

        fireEvent.change(usernameInput, { target: { value: 'testuser' } });
        fireEvent.change(passwordInput, { target: { value: 'testpass' } });

        expect((usernameInput as HTMLInputElement).value).toBe('testuser');
        expect((passwordInput as HTMLInputElement).value).toBe('testpass');
    });

    it('calls login and navigates on successful login', async () => {
        mockLogin.mockResolvedValueOnce({});
        render(
            <MemoryRouter>
                <Login />
            </MemoryRouter>
        );
        fireEvent.change(screen.getByPlaceholderText(/username/i), { target: { value: 'user' } });
        fireEvent.change(screen.getByPlaceholderText(/password/i), { target: { value: 'pass' } });
        fireEvent.click(screen.getByRole('button', { name: /login/i }));

        await waitFor(() => {
            expect(mockLogin).toHaveBeenCalledWith('user', 'pass');
            expect(mockNavigate).toHaveBeenCalledWith('/home');
        });
    });

    it('shows error message on failed login', async () => {
        mockLogin.mockRejectedValueOnce(new Error('Invalid credentials'));
        render(
            <MemoryRouter>
                <Login />
            </MemoryRouter>
        );
        fireEvent.change(screen.getByPlaceholderText(/username/i), { target: { value: 'baduser' } });
        fireEvent.change(screen.getByPlaceholderText(/password/i), { target: { value: 'badpass' } });
        fireEvent.click(screen.getByRole('button', { name: /login/i }));

        await waitFor(() => {
            expect(screen.getByText(/invalid credentials/i)).toBeInTheDocument();
        });
    });
});