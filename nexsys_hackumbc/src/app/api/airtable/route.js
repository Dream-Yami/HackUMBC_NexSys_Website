import { NextResponse } from 'next/server';
import Airtable from 'airtable';

const AIRTABLE_TOKEN = process.env.AIRTABLE_TOKEN;
const AIRTABLE_BASE_ID = process.env.AIRTABLE_BASE_ID;

if (!AIRTABLE_TOKEN || !AIRTABLE_BASE_ID) {
  console.error('Missing AIRTABLE_TOKEN or AIRTABLE_BASE_ID in environment variables');
}

/**
 * Next.js route handler for POST /api/airtable
 * Expects JSON body: { name, email, comment }
 * Creates a record in the "Email_List" table with fields:
 *  - Name
 *  - Email
 *  - Comment (object with state, value, isStale)
 */
const base = new Airtable({ apiKey: AIRTABLE_TOKEN }).base(AIRTABLE_BASE_ID);

export async function POST(req) {
  try {
    const body = await req.json();
    const name = (body?.name || '').toString().trim();
    const email = (body?.email || '').toString().trim();
    const commentValue = (body?.comment || '').toString();

    if (!name || !email) {
      return NextResponse.json({ error: 'Name and email are required' }, { status: 400 });
    }

    // Store comment as plain text because the Airtable "Comment" field expects a string.
    const commentText = commentValue;

    const created = await new Promise((resolve, reject) => {
      base('Email_List').create(
        [
          {
            fields: {
              Name: name,
              Email: email,
              Comment: commentText,
            },
          },
        ],
        { typecast: true },
        (err, records) => {
          if (err) return reject(err);
          resolve(records);
        }
      );
    });

    // Return created record(s)
    return NextResponse.json({ success: true, records: created }, { status: 200 });
  } catch (err) {
    console.error('Airtable create error:', err);
    const message = err?.message || String(err);
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
