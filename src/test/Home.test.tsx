import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import { describe, it, expect, vi, beforeEach } from 'vitest';
import * as service from '../services/github.service';
import { Home } from '../pages/Home';

vi.mock('../services/github.service', () => ({
  fetchProfile: vi.fn(),
  searchIssues: vi.fn(),
  fetchIssue: vi.fn(),
}));

const profile = {
  login: 'Jonhsantos',
  name: 'Jonhsantos',
  avatar_url: 'https://example.com/a.png',
  bio: 'bio',
  html_url: 'https://github.com/Jonhsantos',
  followers: 32,
  company: 'SENAC',
};

const makeIssue = (n: number) => ({
  number: n,
  title: `Post ${n}`,
  body: 'Conteúdo',
  state: 'open' as const,
  created_at: new Date().toISOString(),
  updated_at: new Date().toISOString(),
  comments: 1,
  html_url: `https://github.com/x/${n}`,
  user: { login: 'Jonhsantos', avatar_url: 'https://example.com/a.png' },
});

describe('Home - debounce e paginação', () => {
  beforeEach(() => {
    vi.clearAllMocks();
    (service.fetchProfile as any).mockResolvedValue(profile);
    (service.searchIssues as any).mockResolvedValue({
      total_count: 12,
      incomplete_results: false,
      items: [makeIssue(1)],
    });
  });

  it('debounce: busca só após 500ms', async () => {
    render(
      <MemoryRouter initialEntries={['/']}>
        <Home />
      </MemoryRouter>,
    );
    await waitFor(() => expect(service.searchIssues).toHaveBeenCalled());

    const input = screen.getByLabelText(/buscar publicações/i);
    fireEvent.change(input, { target: { value: 'react' } });

    await waitFor(
      () => {
        const calls = (service.searchIssues as any).mock.calls;
        const last = calls.at(-1)?.[0];
        expect(last?.query).toBe('react');
      },
      { timeout: 1500 },
    );
  });

  it('paginação chama Search API com página 2', async () => {
    (service.searchIssues as any).mockResolvedValue({
      total_count: 12,
      incomplete_results: false,
      items: Array(6).fill(makeIssue(1)),
    });
    render(
      <MemoryRouter initialEntries={['/']}>
        <Home />
      </MemoryRouter>,
    );
    await waitFor(() => expect(service.searchIssues).toHaveBeenCalled());

    const nextBtn = await screen.findByRole('button', { name: /próxima/i });
    fireEvent.click(nextBtn);

    await waitFor(() => {
      const lastCall = (service.searchIssues as any).mock.calls.at(-1)[0];
      expect(lastCall.page).toBe(2);
    });
  });
});
