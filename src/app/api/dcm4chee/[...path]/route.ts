import { NextRequest, NextResponse } from 'next/server';

function buildTarget(path: string[], searchParams: URLSearchParams) {
  const base = (process.env.DCM4CHEE_BASE_URL || 'http://localhost:8080/dcm4chee-arc').replace(/\/$/, '');
  const url = new URL(`${base}/${path.map(encodeURIComponent).join('/')}`);
  searchParams.forEach((value, key) => {
    url.searchParams.append(key, value);
  });
  return url;
}

function jsonHeaders() {
  return {
    'content-type': 'application/json; charset=utf-8',
    'cache-control': 'no-store',
  };
}

export async function GET(request: NextRequest, context: { params: Promise<{ path: string[] }> }) {
  const { path } = await context.params;
  const target = buildTarget(path, request.nextUrl.searchParams);
  const isCountOrSize = /\/(count|size)$/.test(target.pathname);
  const isRendered = /\/rendered$/.test(target.pathname);

  try {
    const upstream = await fetch(target, {
      method: 'GET',
      headers: {
        Accept: request.headers.get('accept') || '*/*',
      },
      cache: 'no-store',
    });

    if (!upstream.ok) {
      if (isRendered) {
        return new NextResponse('Not found', { status: 404 });
      }
      if (isCountOrSize) {
        return new NextResponse('0', {
          status: 200,
          headers: { 'content-type': 'text/plain; charset=utf-8', 'cache-control': 'no-store' },
        });
      }
      return NextResponse.json([], { status: 200, headers: jsonHeaders() });
    }

    const contentType = upstream.headers.get('content-type') || '';
    if (contentType.includes('application/json')) {
      const data = await upstream.json();
      return NextResponse.json(data, { status: 200, headers: jsonHeaders() });
    }

    const buffer = Buffer.from(await upstream.arrayBuffer());
    return new NextResponse(buffer, {
      status: 200,
      headers: {
        'content-type': contentType || 'application/octet-stream',
        'cache-control': 'no-store',
      },
    });
  } catch (error) {
    if (isRendered) {
      return new NextResponse('Upstream unavailable', { status: 502 });
    }
    if (isCountOrSize) {
      return new NextResponse('0', {
        status: 200,
        headers: { 'content-type': 'text/plain; charset=utf-8', 'cache-control': 'no-store' },
      });
    }
    return NextResponse.json([], { status: 200, headers: jsonHeaders() });
  }
}
