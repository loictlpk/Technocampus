import { useSession } from 'next-auth/react';
import React, { useState, useEffect } from 'react';
import Navbar from './nav';
import ColorButton from '../components/button';
import { Card } from "@material-tailwind/react"; 

const Technician = () => {
  const { data: sessionData } = useSession();
  const [tags, setTags] = useState([]);

  useEffect(() => {
    const intervalId = setInterval(async () => {
      try {
        const response = await fetch('/api/getVisibleTags');
        if (!response.ok) {
          throw new Error('Failed to fetch data');
        }

        const newVisibleTags = await response.json();
        
        // Tri par ordre alphabétique
        const sortedTags = newVisibleTags.slice().sort((a, b) => a.name.localeCompare(b.name));
        
        setTags(sortedTags);
      } catch (error) {
        console.error('Error fetching visible tags:', error);
      }
    }, 1000);

    // importe les tags lors d'un changement uniquement
    return () => clearInterval(intervalId);
  }, []);

  if (!sessionData) {
    return <div>You are not authorized to view this page.</div>;
  } else {
    return (
      <>
        <Navbar discordUsername={sessionData.user?.name} />

        <div className='flex justify-center mb-4'>
          <ColorButton color="red" className="mx-auto" />
          <ColorButton color="green" className="mx-auto" />
          <ColorButton color="yellow" className="mx-auto" />
          <ColorButton color="white" className="mx-auto" />
          <ColorButton color="" className="mx-auto" />
        </div>

        <Card className="h-full w-full">
          <div className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
            <div className="bg-white overflow-hidden shadow-xl sm:rounded-lg p-6">
              <table className="w-full min-w-max table-auto text-left">
                <thead>
                  <tr>
                    <th className="px-4 py-2">Tag Name</th>
                    <th className="px-4 py-2">Tag Value</th>
                    <th className="px-4 py-2">Date</th>
                  </tr>
                </thead>
                <tbody>
                  {tags.map((tag, index) => (
                    <tr key={tag.id} className={index % 2 === 0 ? 'bg-gray-50' : ''}>
                      <td className="border px-4 py-2">{tag.name}</td>
                      <td className="border px-4 py-2">{tag.state}</td>
                      <td className="border px-4 py-2">{new Date(tag.date).toLocaleString()}</td>
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

export default Technician;
