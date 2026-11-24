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
  bio: null,
  html_url: 'https://github.com/Jonhsantos',
  followers: 0,
  company: null,
};

describe('Home - falhas e recuperação', () => {
  beforeEach(() => {
    vi.clearAllMocks();
    (service.fetchProfile as any).mockResolvedValue(profile);
  });

  it('exibe 404 e não oferece retry para not_found', async () => {
    (service.searchIssues as any).mockRejectedValue({
      kind: 'not_found',
      message: 'Não encontrado.',
      status: 404,
    });
    render(
      <MemoryRouter initialEntries={['/']}>
        <Home />
      </MemoryRouter>,
    );
    expect(await screen.findByText('Não encontrado.')).toBeInTheDocument();
    expect(screen.queryByRole('button', { name: /tentar novamente/i })).not.toBeInTheDocument();
  });

  it('exibe rate limit com retry e tenta novamente', async () => {
    (service.searchIssues as any)
      .mockRejectedValueOnce({
        kind: 'rate_limit',
        message: 'Limite de requisições atingido. Tente novamente mais tarde.',
        status: 429,
        retryAfter: 60,
      })
      .mockResolvedValueOnce({
        total_count: 0,
        incomplete_results: false,
        items: [],
      });

    render(
      <MemoryRouter initialEntries={['/']}>
        <Home />
      </MemoryRouter>,
    );

    expect(await screen.findByText(/Limite de requisições/i)).toBeInTheDocument();
    expect(screen.getByText(/60s/)).toBeInTheDocument();

    const retryBtn = screen.getByRole('button', { name: /tentar novamente/i });
    fireEvent.click(retryBtn);

    await waitFor(() => {
      expect(service.searchIssues).toHaveBeenCalledTimes(2);
    });
  });
});
