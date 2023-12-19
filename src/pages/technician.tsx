// technician.tsx
import { useSession } from 'next-auth/react';
import { PrismaClient } from '@prisma/client';
import * as React from 'react';

import {
  ChakraProvider,
  Flex, // Import Flex component
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

const prisma = new PrismaClient();

const Technician = ({ visibleTags }) => {
  const { data: sessionData } = useSession();

  // Check if sessionData is defined
  const discordUsername = sessionData?.user?.name as string;

  if (!sessionData) {
    // Redirect or handle unauthorized access
    return <div>You are not authorized to view this page.</div>;
  }

  return (
    <>
      <Navbar discordUsername={sessionData.user?.name} />

      <Flex justify="center" align="center" h="100vh">
        <TableContainer>
          <Table variant='simple'>
            <TableCaption>Visible Tags Information</TableCaption>
            <Thead>
              <Tr>
                <Th>Tag Name</Th>
                <Th>Tag Value</Th>
                <Th>Date</Th>
              </Tr>
            </Thead>
            <Tbody>
              {visibleTags.map((tag, index) => (
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
    bg: props.isOdd ? 'blue.100' : 'white', // Set background color based on odd/even index
  }),
});

export async function getServerSideProps() {
  try {
    // Fetch visible tags from the database
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

    // Convert Date objects to strings
    const formattedVisibleTags = visibleTags.map((tag) => ({
      ...tag,
      date: tag.date.toISOString(),
    }));

    return {
      props: {
        visibleTags: formattedVisibleTags,
      },
    };
  } catch (error) {
    console.error('Error fetching visible tags:', error);
    return {
      props: {
        visibleTags: [],
      },
    };
  }
}

export default Technician;
