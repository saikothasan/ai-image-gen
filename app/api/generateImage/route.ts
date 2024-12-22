import { NextResponse } from 'next/server';

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const prompt = searchParams.get('prompt');

    if (!prompt) {
      return NextResponse.json({ error: 'Missing prompt parameter' }, { status: 400 });
    }

    const response = await fetch(`https://silent-lab.aicodegen.workers.dev/?prompt=${encodeURIComponent(prompt)}`);

    if (!response.ok) {
      return NextResponse.json({ error: 'Failed to generate image' }, { status: 500 });
    }

    const imageUrl = await response.json(); // Assuming the API returns an image URL
    return NextResponse.json({ imageUrl: imageUrl?.imageUrl }, { status: 200 });
  } catch (error) {
    console.error('Error generating image:', error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}
