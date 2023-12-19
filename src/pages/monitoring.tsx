import { useSession } from 'next-auth/react';
import React, { useState, useEffect } from 'react';
import Navbar from './nav';
import { Card, Typography } from "@material-tailwind/react";

import { PrismaClient } from '@prisma/client';
// import {
//   Table,
//   Thead,
//   Tbody,
//   Tr,
//   Th,
//   Td,
//   Center,
//   Box,
//   Button,
// } from '@chakra-ui/react';

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

      // Sort the tags alphabetically by name
      const sortedTags = allTags.slice().sort((a, b) => a.name.localeCompare(b.name));

      setTagsData(sortedTags);
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
  
  if (!sessionData ) {
    return <div>You are not authorized to view this page.</div>;
  }
  else {
  return (
    <>
      <Navbar discordUsername={sessionData?.user?.name || 'loict1'} />
      <Card className="h-full w-full overflow-scroll">
        <table className="w-full min-w-max table-auto text-left">
          <thead>
            <tr>
              <th>ID</th>
              <th>Name</th>
              <th>State</th>
              <th>Date</th>
              <th>Visible</th>
              <th>Action</th>
              <th>Action</th> 
            </tr>
          </thead>
          <tbody>
            {tagsData.map((tag) => (
              <tr key={tag.id}>
                <td>{tag.id}</td>
                <td>{tag.name}</td>
                <td>{tag.state}</td>
                <td>{new Date(tag.date).toISOString()}</td>
                <td>{tag.visible.toString()}</td>
                <td>
                  <button
                    className="bg-[#374151] hover:bg-green-700 text-white font-bold py-2 px-4 rounded"
                    onClick={() => handleToggleVisibility(tag.id)}
                  >
                    SHOW
                  </button>
                </td>
                <td>
                  <button
                    className="bg-[#374151] hover:bg-red-700 text-white font-bold py-2 px-4 rounded"
                    onClick={() => handleToggleVisibilityHide(tag.id)}
                  >
                    HIDE
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </Card>
    </>
  );
};

}

export default Monitoring;