import { NextRequest } from 'next/server';
import { NextRequest } from 'next/server';
import { handleBoardsNoBody, handleBoardsWithBody } from '../_proxy';

export async function GET(req: NextRequest, ctx: { params: { path: string[] } }) {
  return handleBoardsNoBody('GET', req, ctx.params.path || []);
}

export async function POST(req: NextRequest, ctx: { params: { path: string[] } }) {
  return handleBoardsWithBody('POST', req, ctx.params.path || []);
}

export async function PUT(req: NextRequest, ctx: { params: { path: string[] } }) {
  return handleBoardsWithBody('PUT', req, ctx.params.path || []);
}

export async function PATCH(req: NextRequest, ctx: { params: { path: string[] } }) {
  return handleBoardsWithBody('PATCH', req, ctx.params.path || []);
}

export async function DELETE(req: NextRequest, ctx: { params: { path: string[] } }) {
  return handleBoardsNoBody('DELETE', req, ctx.params.path || []);
}
