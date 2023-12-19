// pages/api/getAllTags.js
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export default async function handler(req, res) {
  try {
    const allTags = await prisma.tags.findMany({
      select: {
        id: true,
        name: true,
        state: true,
        date: true,
        visible: true,
      },
    });

    // Convert Date objects to strings
    const formattedAllTags = allTags.map((tag) => ({
      ...tag,
      date: tag.date.toISOString(),
    }));

    res.status(200).json(formattedAllTags);
  } catch (error) {
    console.error('Error fetching all tags:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
}
