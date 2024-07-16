import { NextResponse } from 'next/server';
import prisma from '../../../prisma';

export async function POST(request: Request) {
  const { dishId } = await request.json();

  try {
    const dish = await prisma.dishes.findUnique({ where: { dishId: dishId } });
    if (!dish) throw new Error('Dish not found');
    
    const updatedDish = await prisma.dishes.update({
      where: { dishId: dishId },
      data: { isPublished: !dish.isPublished },
    });
    
    return NextResponse.json(updatedDish);
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
