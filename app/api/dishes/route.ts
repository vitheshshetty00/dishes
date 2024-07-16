import { NextResponse } from 'next/server';
import prisma from '../../../prisma';

export async function GET() {
  try {
    const dishes = await prisma.dishes.findMany();
    return NextResponse.json(dishes);
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

export async function POST(request: Request) {
  const { dishName, imageUrl } = await request.json();

  try {
    const count = await prisma.dishes.count();
    const newDishId = (count + 1).toString();

    const newDish = await prisma.dishes.create({
      data: {
        dishId: newDishId,
        dishName,
        imageUrl,
        isPublished: false,
      },
    });

    return NextResponse.json(newDish);
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
