import { NextResponse } from 'next/server';
import Share from '@/models/Share'; // Make sure this path matches your project structure
import { connectDB } from '@/lib/connect'; // Assuming the `connect` function is in `/lib/connect`

export async function POST(request: Request) {
  try {
    // Connect to the database
    await connectDB();

    // Parse the request body
    const body = await request.json();
    const { ticker, lastKnownValue, units } = body;

    // Validate the required fields
    if (!ticker || typeof lastKnownValue !== 'number' || typeof units !== 'number') {
      return NextResponse.json({ message: 'Invalid input' }, { status: 400 });
    }

    // Create a new Share instance
    const newShare = new Share({
      ticker,
      lastKnownValue,
      units
    });

    // Save the Share to the database
    await newShare.save();

    // Return a success message
    return NextResponse.json({ message: 'Share saved successfully' }, { status: 201 });

  } catch (error) {
    console.error('Error saving Share:', error);

    // Return a failure message
    return NextResponse.json({ message: 'Error saving Share' }, { status: 500 });
  }
}
