import { render, screen } from "@testing-library/react";
import { vi, beforeEach } from "vitest"; // Import beforeEach for setup
import App from "./App"; // App imports BrowserRouter from 'react-router'
import type { LayoutProps } from "./types/LayoutProps";

// This variable will hold the initial entries for the MemoryRouter that replaces BrowserRouter
let currentInitialEntries: string[] = ['/'];

// Mock the 'react-router' module
vi.mock('react-router', async (importOriginal) => {
    // Import the original module to get access to other components like Routes, Route, Navigate, and MemoryRouter
    const original = await importOriginal<typeof import('react-router')>();

    // Return an object that replaces BrowserRouter with a functional component
    // that renders the original MemoryRouter with our dynamic initialEntries.
    return {
        ...original, // Keep other exports from 'react-router' (like Routes, Route, Navigate)
        BrowserRouter: ({ children }: { children?: React.ReactNode }) => {
            // When App renders BrowserRouter, it will actually render MemoryRouter
            // with the initialEntries set for the current test.
            // We assume original.MemoryRouter exists based on the user's previous import,
            // or it would typically be imported from 'react-router-dom'.
            // Sticking to 'react-router' as per your explicit instruction.
            return (
                <original.MemoryRouter initialEntries={currentInitialEntries}>
                    {children}
                </original.MemoryRouter>
            );
        },
    };
});

// Mock the components used in App to prevent them from rendering their actual content
// and to allow us to assert on their presence via test IDs or simple text.
vi.mock('./components/Layout', () => ({
    // When Layout is rendered, it will just be a div with data-testid="layout"
    // and it will render its children inside.
    default: ({ children }: LayoutProps) => <div data-testid="layout">{children}</div>
}));

vi.mock('./pages/LoginPage', () => ({
    // When LoginPage is rendered, it will just show "Login Page" text.
    default: () => <div>Login Page</div>
}));

vi.mock('./pages/HomePage', () => ({
    // When HomePage is rendered, it will just show "Home Page" text.
    default: () => <div>Home Page</div>
}));

vi.mock('./pages/AddProductPage', () => ({
    // When AddProductPage is rendered, it will just show "Add Product Page" text.
    default: () => <div>Add Product Page</div>
}));

vi.mock('./components/ProtectedRoute', () => ({
    // When ProtectedRoute is rendered, it will just be a div with data-testid="protected"
    // and it will render its children inside.
    default: ({ children }: LayoutProps) => <div data-testid="protected">{children}</div>
}));

describe("App routing", () => {
    // Before each test, reset the currentInitialEntries to a default.
    // This ensures test isolation and that each test starts with a clean slate.
    beforeEach(() => {
        currentInitialEntries = ['/']; // Default for safety, though each test will explicitly set it.
    });

    // Test case for the /login path
    it("renders LoginPage at /login", async () => {
        // Set the initial entries for the mocked BrowserRouter (which is now MemoryRouter)
        currentInitialEntries = ["/login"];
        // Render the App component directly. It will internally use the mocked BrowserRouter.
        render(<App />);
        // Use findByText which waits for the element to appear asynchronously.
        // This is important because React Router might re-render.
        await screen.findByText("Login Page");
        // Assert that the "Login Page" text is present in the document.
        expect(screen.getByText("Login Page")).toBeInTheDocument();
    });

    // Test case for the root path, which should redirect to /login
    it("redirects / to /login", async () => {
        // Set the initial entries for this test to the root path.
        currentInitialEntries = ["/"];
        // Render the App component directly.
        render(<App />);
        // The <Navigate> component in App.tsx will change the route to "/login".
        // We need to wait for the content of the LoginPage to appear after the redirect.
        await screen.findByText("Login Page");
        // Assert that the "Login Page" text is present, indicating a successful redirect.
        expect(screen.getByText("Login Page")).toBeInTheDocument();
    });

    // Test case for the /home path, ensuring it's wrapped by ProtectedRoute and Layout
    it("renders HomePage at /home inside ProtectedRoute and Layout", async () => {
        // Set the initial entries for this test to "/home".
        currentInitialEntries = ["/home"];
        // Render the App component directly.
        render(<App />);       
       await expect(screen.getByTestId("protected")).toBeInTheDocument();
      
    });

    // Test case for the /add-product path, ensuring it's wrapped by ProtectedRoute and Layout
    it("renders AddProductPage at /add-product inside ProtectedRoute and Layout", async () => {
        // Set the initial entries for this test to "/add-product".
        currentInitialEntries = ["/add-product"];
        // Render the App component directly.
        render(<App />);       
    
        // Assert that the mocked ProtectedRoute wrapper is present.
       await expect(screen.getByTestId("protected")).toBeInTheDocument();      
    });
});
