import { NextRequest } from 'next/server';
import { handleBoardsNoBody, handleBoardsWithBody } from '../_proxy';

type RouteParams = { path?: string[] };

async function resolveParams(raw: RouteParams | Promise<RouteParams>): Promise<RouteParams> {
  return raw instanceof Promise ? await raw : raw;
}

export async function GET(req: NextRequest, ctx: { params: RouteParams | Promise<RouteParams> }) {
  const { path = [] } = await resolveParams(ctx.params);
  return handleBoardsNoBody('GET', req, path);
}

export async function POST(req: NextRequest, ctx: { params: RouteParams | Promise<RouteParams> }) {
  const { path = [] } = await resolveParams(ctx.params);
  return handleBoardsWithBody('POST', req, path);
}

export async function PUT(req: NextRequest, ctx: { params: RouteParams | Promise<RouteParams> }) {
  const { path = [] } = await resolveParams(ctx.params);
  return handleBoardsWithBody('PUT', req, path);
}

export async function PATCH(req: NextRequest, ctx: { params: RouteParams | Promise<RouteParams> }) {
  const { path = [] } = await resolveParams(ctx.params);
  return handleBoardsWithBody('PATCH', req, path);
}

export async function DELETE(
  req: NextRequest,
  ctx: { params: RouteParams | Promise<RouteParams> },
) {
  const { path = [] } = await resolveParams(ctx.params);
  return handleBoardsNoBody('DELETE', req, path);
}
