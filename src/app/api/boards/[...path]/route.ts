import { NextRequest } from 'next/server';
import { handleBoardsNoBody, handleBoardsWithBody } from '../_proxy';

type RouteParams = { path?: string[] };

type RouteContext = { params: Promise<RouteParams> };

export async function GET(req: NextRequest, ctx: RouteContext) {
  const { path = [] } = await ctx.params;
  return handleBoardsNoBody('GET', req, path);
}

export async function POST(req: NextRequest, ctx: RouteContext) {
  const { path = [] } = await ctx.params;
  return handleBoardsWithBody('POST', req, path);
}

export async function PUT(req: NextRequest, ctx: RouteContext) {
  const { path = [] } = await ctx.params;
  return handleBoardsWithBody('PUT', req, path);
}

export async function PATCH(req: NextRequest, ctx: RouteContext) {
  const { path = [] } = await ctx.params;
  return handleBoardsWithBody('PATCH', req, path);
}

export async function DELETE(req: NextRequest, ctx: RouteContext) {
  const { path = [] } = await ctx.params;
  return handleBoardsNoBody('DELETE', req, path);
}
