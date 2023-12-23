import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export default async function handler(req, res) {
  try {
    const visibleTags = await prisma.tags.findMany({
      where: {
        visible: true,
      },
      select: {
        id: true,
        name: true,
        state: true,
        date: true,
      },
    });

    // date en chaine de caractères
    const formattedVisibleTags = visibleTags.map((tag) => ({
      ...tag,
      date: tag.date.toISOString(),
    }));

    res.status(200).json(formattedVisibleTags);
  } catch (error) {
    console.error('Error fetching visible tags:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
}
