import { useSession } from 'next-auth/react';
import React, { useState, useEffect } from 'react';
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

const Monitoring = () => {
  const { data: sessionData } = useSession();
  const [tagsData, setTagsData] = useState([]);

  const fetchAllTags = async () => {
    try {
      const response = await fetch('/api/getAllTags');
      if (!response.ok) {
        throw new Error('Failed to fetch all tags');
      }

      const allTags = await response.json();
      setTagsData(allTags);
    } catch (error) {
      console.error('Error fetching all tags:', error);
    }
  };

  useEffect(() => {
    // Fetch all tags when the component mounts
    fetchAllTags();

    // Fetch all tags every 1 seconds 
    const intervalId = setInterval(fetchAllTags, 1000);

    // Cleanup the interval on component unmount
    return () => clearInterval(intervalId);
  }, []);

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

        setTagsData((prevTags) =>
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

        setTagsData((prevTags) =>
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
              {tagsData.map((tag) => (
                <Tr key={tag.id}>
                  <Td>{tag.id}</Td>
                  <Td>{tag.name}</Td>
                  <Td>{tag.state}</Td>
                  <Td>{new Date(tag.date).toISOString()}</Td>
                  <Td>{tag.visible.toString()}</Td>
                  <Td>
                    <Button onClick={() => handleToggleVisibility(tag.id)}>
                      SHOW
                    </Button>
                  </Td>
                  <Td>
                    <Button onClick={() => handleToggleVisibilityHide(tag.id)}>
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