'use client';

async function addShare() {
  await fetch('/api/shares', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      ticker: '456',
      lastKnownValue: 20,
      units: 950,
    }),
  });
}

export default function Home() {
  return (
    <>
      <h1>Hello, World</h1>
      <button onClick={() => addShare().then(() => console.log('done'))}>Click me</button>
    </>
  );
}
