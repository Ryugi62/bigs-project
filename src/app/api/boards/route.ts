import { NextRequest } from 'next/server';
import { handleBoardsNoBody, handleBoardsWithBody } from './_proxy';

export async function GET(req: NextRequest) {
  return handleBoardsNoBody('GET', req);
}

export async function POST(req: NextRequest) {
  return handleBoardsWithBody('POST', req);
}
