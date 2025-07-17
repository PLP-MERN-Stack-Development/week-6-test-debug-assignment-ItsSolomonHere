import React from 'react';
import { render, screen, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom';

// Sample component for demonstration
function FetchPosts() {
  const [posts, setPosts] = React.useState([]);
  React.useEffect(() => {
    fetch('/api/posts')
      .then(res => res.json())
      .then(data => setPosts(data));
  }, []);
  return (
    <div>
      <h1>Posts</h1>
      <ul>
        {posts.map(post => (
          <li key={post._id}>{post.title}</li>
        ))}
      </ul>
    </div>
  );
}

describe('FetchPosts Integration', () => {
  beforeEach(() => {
    global.fetch = jest.fn(() =>
      Promise.resolve({
        json: () => Promise.resolve([
          { _id: '1', title: 'Test Post 1' },
          { _id: '2', title: 'Test Post 2' },
        ]),
      })
    );
  });
  afterEach(() => {
    global.fetch.mockClear();
    delete global.fetch;
  });
  it('fetches and displays posts', async () => {
    render(<FetchPosts />);
    expect(screen.getByText('Posts')).toBeInTheDocument();
    await waitFor(() => {
      expect(screen.getByText('Test Post 1')).toBeInTheDocument();
      expect(screen.getByText('Test Post 2')).toBeInTheDocument();
    });
  });
}); 