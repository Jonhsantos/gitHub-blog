import { render, screen } from '@testing-library/react';
import { MemoryRouter, Route, Routes } from 'react-router-dom';
import { describe, it, expect, vi, beforeEach } from 'vitest';
import * as service from '../services/github.service';
import { PostDetail } from '../pages/PostDetail';

vi.mock('../services/github.service', () => ({
  fetchProfile: vi.fn(),
  searchIssues: vi.fn(),
  fetchIssue: vi.fn(),
}));

describe('PostDetail - acesso direto com Markdown', () => {
  beforeEach(() => {
    vi.clearAllMocks();
    (service.fetchIssue as any).mockResolvedValue({
      number: 1,
      title: 'Título do post',
      body: '# Olá\n\nTexto com [link](https://example.com) e `code`.',
      state: 'open',
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString(),
      comments: 3,
      html_url: 'https://github.com/Jonhsantos/gitHub-blog/issues/1',
      user: { login: 'Jonhsantos', avatar_url: 'https://example.com/a.png' },
    });
  });

  it('renderiza título e markdown', async () => {
    render(
      <MemoryRouter initialEntries={['/post/1']}>
        <Routes>
          <Route path="/post/:number" element={<PostDetail />} />
        </Routes>
      </MemoryRouter>,
    );

    expect(await screen.findByText('Título do post')).toBeInTheDocument();
    expect(await screen.findByText(/Texto com/)).toBeInTheDocument();
    const link = screen.getByRole('link', { name: /ver no github/i });
    expect(link).toHaveAttribute('href', 'https://github.com/Jonhsantos/gitHub-blog/issues/1');
  });

  it('rejeita número inválido', async () => {
    render(
      <MemoryRouter initialEntries={['/post/abc']}>
        <Routes>
          <Route path="/post/:number" element={<PostDetail />} />
        </Routes>
      </MemoryRouter>,
    );
    expect(await screen.findByText(/inválido/i)).toBeInTheDocument();
  });
});
