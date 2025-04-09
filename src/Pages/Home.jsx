import { Flex, Box, Stack, Text, Button, useBreakpointValue } from '@chakra-ui/react'
import { useEffect, useState } from 'react';
import { getTokenInfo } from '../utils/coinMarketCap';
import HomeTop from '../HomeComponents/HomeTop';
import HomeServices from '../HomeComponents/HomeService';
import HomeDoctor from '../HomeComponents/HomeDoctor';
import Sliding from '../HomeComponents/Sliding';
import { HomeFAQ } from '../HomeComponents/HomeFAQ';

function Home() {
    const [priceChange, setPriceChange] = useState(null);
    useEffect(() => {
        const fetchBNBPrice = async () => {
            try {
                const data = await getTokenInfo('BNB');
                if (data instanceof Error) {
                    throw data;
                }
                console.log(data)
                setPriceChange(data.percent_change_1h);
            } catch (error) {
                console.error('Error fetching BNB price:', error);
            }
        };

        fetchBNBPrice();
    }, []);

    const redirectTo = () => {
        window.location.href = '/services'; 
    }

    return(  
        <Box
            maxWidth="100%" mx="auto"
            w={"full"}
            overflow="hidden"
            position="relative"
        >
            <Box
                position="absolute"
                top={0}
                left={0}
                right={0}
                w="50%"
            />
            <Box>
            <Box 
                position="relative" 
                height="100%"
                _before={{
                    content: '""',
                    position: 'absolute',
                    top: 0,
                    left: 0,
                    right: 0,
                    bottom: 0,
                    backgroundColor: priceChange > 0 ? 'rgba(19, 214, 168, 0.1)' : 'rgba(255, 0, 0, 0.1)',
                    zIndex: 2,
                    pointerEvents: 'none'
                }}
            >
                <Box>
                    <Flex>
                        <Sliding />
                        <Box position="absolute" zIndex={5}  left={0} right={0} p={4}>
                            <Stack maxW={'2xl'} align={'flex-start'} spacing={6} alignSelf={'flex-start'} textAlign={"left"} mt={200}>
                                <Text
                                    color={'white'}       
                                    fontWeight={"semibold"}
                                    lineHeight={1.2}
                                    fontSize={useBreakpointValue({ base: '1xl', md: '1xl' })}>
                                    WE GIVE YOU THE BEST
                                </Text>
                                <Text color={'#13d6a8'}
                                    fontWeight={700}
                                    lineHeight={1.2}
                                    fontSize={useBreakpointValue({ base: '3xl', md: '5xl' })}>
                                    Care Better Together
                                </Text>
                                <Stack direction={{"base":"column","sm":"column","md":"row"}}>
                                    <Button onClick={redirectTo} borderRadius={0} color={"white"}  bg="rgba(1, 213, 162, 1)" variant='solid' opacity={1} size={'lg'} fontSize={'xs'} >SEE OUR SERVICES</Button>
                                </Stack>
                            </Stack>
                        </Box>
                    </Flex>
                </Box>
            </Box>
        </Box>

        <Box>
            <HomeTop />
        </Box>
        <Box>
            <HomeServices />
        </Box>
        <Box padding={10}>
            <HomeDoctor />
        </Box>
        <Box>
            <HomeFAQ />
        </Box>
    
    </Box>
    )
}

export default Home;