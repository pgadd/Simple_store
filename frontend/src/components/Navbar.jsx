import { Container, Flex, Text, HStack, Button } from "@chakra-ui/react";
import {Link} from "react-router-dom";

import { AiFillPlusCircle } from "react-icons/ai"



const Navbar = () => {
    

  return (
    <Container maxW = {"1140px"} px={4}>
        <Flex
            h = {16}
            alignItems = {"center"}
            justifyContent = {"space-between"}
            flexDir = {{
                base: "column",
                sm: "row"
            }}
        >

            <Text
                fontSize={{base: "28px", sm:"36px"}}
                fontweight={"bold"}
                textTransform={"uppercase"}
                textAlign={"center"}
                bgGradient= {"to-r" }
                gradientFrom= {"red.400" }
                gradientTo= {"blue.200"}
                bgClip={"text"}
            >
                <Link to = {'/'}>Product Store</Link>
            </Text>


            <HStack spacing={2} alignItems={"center"}>
                <Link to={"/create"}>
                    <Button>
                        <AiFillPlusCircle fontSize={20}/>
                    </Button>
                  
                </Link>
            </HStack>

        </Flex>
    </Container>
  )
}

export default Navbar