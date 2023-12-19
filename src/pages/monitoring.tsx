// monitoring.tsx
import { useSession } from 'next-auth/react';
import React, { useState } from 'react';
import Navbar from './nav';
import { PrismaClient } from '@prisma/client';
import {
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  Center,
  Box,
  Button,
} from '@chakra-ui/react';

const Monitoring = ({ tagsData }) => {
  const { data: sessionData } = useSession();
  const [updatedTags, setUpdatedTags] = useState(tagsData);

  const handleToggleVisibility = async (tagId) => {
    try {
      const response = await fetch('/api/toggleVisibility', {
        method: 'POST',
        body: JSON.stringify({ tagId }),
        headers: {
          'Content-Type': 'application/json',
        },
      });

      if (response.ok) {
        const updatedTag = await response.json();

        setUpdatedTags((prevTags) =>
          prevTags.map((tag) =>
            tag.id === updatedTag.id ? { ...tag, visible: updatedTag.visible } : tag
          )
        );
      } else {
        console.error('Error updating tag visibility:', response.statusText);
      }
    } catch (error) {
      console.error('Error updating tag visibility:', error);
    }
  };

  const handleToggleVisibilityHide = async (tagId) => {
    try {
      const response = await fetch('/api/toggleVisibilityHide', {
        method: 'POST',
        body: JSON.stringify({ tagId }),
        headers: {
          'Content-Type': 'application/json',
        },
      });

      if (response.ok) {
        const updatedTag = await response.json();

        setUpdatedTags((prevTags) =>
          prevTags.map((tag) =>
            tag.id === updatedTag.id ? { ...tag, visible: updatedTag.visible } : tag
          )
        );
      } else {
        console.error('Error updating tag visibility:', response.statusText);
      }
    } catch (error) {
      console.error('Error updating tag visibility:', error);
    }
  };

  return (
    <>
      <Navbar discordUsername={sessionData?.user?.name || 'loict1'} />
      <h1>Monitoring page</h1>

      <Center>
        <Box margin="4">
          <Table variant="simple">
            <Thead>
              <Tr>
                <Th>ID</Th>
                <Th>Name</Th>
                <Th>State</Th>
                <Th>Date</Th>
                <Th>Visible</Th>
                <Th>Action</Th>
              </Tr>
            </Thead>
            <Tbody>
              {updatedTags.map((tag) => (
                <Tr key={tag.id}>
                  <Td>{tag.id}</Td>
                  <Td>{tag.name}</Td>
                  <Td>{tag.state}</Td>
                  <Td>{new Date(tag.date).toISOString()}</Td>
                  <Td>{tag.visible.toString()}</Td>
                  <Td>
                    <Button
                      onClick={() => handleToggleVisibility(tag.id)}
                      colorScheme={tag.visible ? 'red' : 'green'}
                    >
                      SHOW
                    </Button>
                  </Td>
                  <Td>
                    <Button
                      onClick={() => handleToggleVisibilityHide(tag.id)}
                      colorScheme={tag.visible ? 'red' : 'green'}
                    >
                      HIDE
                    </Button>
                  </Td>
                </Tr>
              ))}
            </Tbody>
          </Table>
        </Box>
      </Center>
    </>
  );
};

export default Monitoring;

export async function getServerSideProps() {
  const prisma = new PrismaClient();

  try {
    const tagsData = await prisma.tags.findMany();

    return {
      props: {
        tagsData: tagsData.map((tag) => ({
          ...tag,
          date: new Date(tag.date).toISOString(),
        })),
      },
    };
  } catch (error) {
    console.error('Error fetching tags:', error);

    return {
      props: {
        tagsData: [],
      },
    };
  } finally {
    await prisma.$disconnect();
  }
}