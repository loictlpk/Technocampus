import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export default async function handler(req, res) {
  const { method, body } = req;
  console.log(body);

  if (method === 'POST') {
    try {
      const tagId = body.tagId;

      if (!tagId) {
        // Message erreur si tagId est manquant
        return res.status(400).json({ error: 'Missing tagId in the request body' });
      }

      const updatedTag = await prisma.tags.update({
        where: { id: tagId },
        data: { visible: false }, // Sur l'élement dont l'id est ... initialisation de visble à false 
      });

      return res.status(200).json(updatedTag);
    } catch (error) {
      console.error('Error updating tag visibility:', error);
      return res.status(500).json({ error: 'Internal Server Error' });
    } finally {
      await prisma.$disconnect();
    }
  } else {
    return res.status(405).json({ error: 'Method Not Allowed' });
  }
}
