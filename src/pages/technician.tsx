// technician.tsx
import { useSession } from 'next-auth/react';
import * as React from 'react';
import { useState, useEffect } from 'react';
import {
  ChakraProvider,
  Flex,
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  TableContainer,
  TableCaption,
  Tfoot,
  chakra,
} from '@chakra-ui/react';
import Navbar from './nav';

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
        setTags(newVisibleTags);
      } catch (error) {
        console.error('Error fetching visible tags:', error);
      }
    }, 1000);
  
    // Cleanup the interval on component unmount
    return () => clearInterval(intervalId);
  }, []);

  if (!sessionData) {
    return <div>You are not authorized to view this page.</div>;
  }

  return (
    <>
      <Navbar discordUsername={sessionData.user?.name} />
      <Flex justify="center" align="center" h="100vh">
        <TableContainer>
          <Table variant="simple">
            <TableCaption>Visible Tags Information</TableCaption>
            <Thead>
              <Tr>
                <Th>Tag Name</Th>
                <Th>Tag Value</Th>
                <Th>Date</Th>
              </Tr>
            </Thead>
            <Tbody>
              {tags.map((tag, index) => (
                <StyledTr key={tag.id} isOdd={index % 2 !== 0}>
                  <Td>{tag.name}</Td>
                  <Td>{tag.state}</Td>
                  <Td>{new Date(tag.date).toLocaleString()}</Td>
                </StyledTr>
              ))}
            </Tbody>
            <Tfoot>
              <Tr>
                <Th>Tag Name</Th>
                <Th>Tag Value</Th>
                <Th>Date</Th>
              </Tr>
            </Tfoot>
          </Table>
        </TableContainer>
      </Flex>
    </>
  );
};

const StyledTr = chakra(Tr, {
  baseStyle: (props) => ({
    bg: props.isOdd ? 'blue.100' : 'white',
  }),
});

export default Technician;
