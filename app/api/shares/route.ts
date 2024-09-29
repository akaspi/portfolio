import axios from 'axios';
import https from 'https';
import { JSDOM } from 'jsdom';
import { NextResponse } from 'next/server';

export async function GET() {
  try {
    const agent = new https.Agent({
      rejectUnauthorized: false, // Allows self-signed certificates
    });

    const res = await axios.get('https://www.bizportal.co.il/tradedfund/quote/generalview/1159169', {
      httpsAgent: agent, // `httpsAgent` is supported in axios
    });

    const html = res.data;
    const dom = new JSDOM(html);
    const document = dom.window.document;

    const valueNode = document.querySelector('body > div.container.body-content.redesignedquote > section > article.top-area > div.data-row.mutual-funds.etf > span:nth-child(1)');
    const value = valueNode?.textContent;
    console.log('value', value);

    // Return a success message
    return NextResponse.json({ message: value }, { status: 200 });

  } catch (error) {
    console.error('Error:', error);

    // Return a failure message
    return NextResponse.json({ message: 'Error Share' }, { status: 500 });
  }
}
