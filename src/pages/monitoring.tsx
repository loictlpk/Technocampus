import { useSession } from 'next-auth/react';
import React, { useState, useEffect } from 'react';
import Navbar from './nav';
import { Card } from "@material-tailwind/react";

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

      // Tri tag : alphabétique
      const sortedTags = allTags.slice().sort((a, b) => a.name.localeCompare(b.name));

      setTagsData(sortedTags);
    } catch (error) {
      console.error('Error fetching all tags:', error);
    }
  };

  useEffect(() => {
    // Importation des tags pour valeur au démarrage
    fetchAllTags();

    // Importation des tags toutes les secondes
    const intervalId = setInterval(fetchAllTags, 1000);

    // importe les tags lors d'un changement uniquement
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

  if (!sessionData) {
    return <div>You are not authorized to view this page.</div>;
  } else {
    return (
      <>
        <Navbar discordUsername={sessionData?.user?.name || 'loict1'} />
        <Card className="h-full w-full">
          <div className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
            <div className="bg-white overflow-hidden shadow-xl sm:rounded-lg p-6">
              <table className="w-full min-w-max table-auto text-left">
                <thead>
                  <tr>
                    <th className="px-4 py-2">ID</th>
                    <th className="px-4 py-2">Name</th>
                    <th className="px-4 py-2">State</th>
                    <th className="px-4 py-2">Date</th>
                    <th className="px-4 py-2">Visible</th>
                    <th className="px-4 py-2">Action</th>
                    <th className="px-4 py-2">Action</th> 
                  </tr>
                </thead>
                <tbody>
                  {tagsData.map((tag) => (
                    <tr key={tag.id}>
                      <td className="border px-4 py-2">{tag.id}</td>
                      <td className="border px-4 py-2">{tag.name}</td>
                      <td className="border px-4 py-2">{tag.state}</td>
                      <td className="border px-4 py-2">{new Date(tag.date).toISOString()}</td>
                      <td className="border px-4 py-2">{tag.visible.toString()}</td>
                      <td className="border px-4 py-2">
                        <button
                          className="bg-[#374151] hover:bg-green-700 text-white font-bold py-2 px-4 rounded"
                          onClick={() => handleToggleVisibility(tag.id)}
                        >
                          SHOW
                        </button>
                      </td>
                      <td className="border px-4 py-2">
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
            </div>
          </div>
        </Card>
      </>
    );
  }
};

export default Monitoring;
