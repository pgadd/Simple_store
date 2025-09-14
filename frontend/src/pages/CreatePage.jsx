import { useState } from "react";
import { Box, Container, Heading, VStack, Button, Input} from "@chakra-ui/react";
import { useProductStore } from "../../store/product";

const CreatePage = () => {

    const [newProduct, setNewProduct] = useState({
        name: "",
        price: "",
        image: "",
    });

    const {createProduct} = useProductStore();

    const handleAddProduct = async() => {
        const {success, message} = await createProduct(newProduct);
        if (!success) {
            alert("fail")
            console.log(message)
            }
        else {
            alert("Success")
        };
        setNewProduct({name: "", price: "", image:""})
    };


  return (
    <Container maxW={"container.sm"}>
        <VStack spacing = {8}>
            <Heading as={"h1"} size={"2xl"} textAlign={"center"} mb={8}> 
                Create New Product
            </Heading>

            <Box
                w={"3xl"}
                p={6} rounded={"lg"} shadow={"md"}
                bg={"gray.900"}
            >
                <VStack spacing={4}>
                
                    <Input 
                    placeholder="Product Name" 
                    name ='name' 
                    value = {newProduct.name}
                    onChange = {(e) => setNewProduct({...newProduct, name: e.target.value })} 
                    />
                    <Input 
                    placeholder="Price" 
                    name = 'price' 
                    type = 'number'
                    value= {newProduct.price}
                    onChange= {(e) => setNewProduct({...newProduct, price: e.target.value })} 
                    />
                    <Input 
                    placeholder="Image URL" 
                    name='image' 
                    value= {newProduct.image}
                    onChange= {(e) => setNewProduct({...newProduct, image: e.target.value })} 
                    />
                    
                    <Button colorSchema="blue" onClick = {handleAddProduct} w="full">Add Product</Button>

                </VStack>
            </Box>
        </VStack>
    </Container>
    
  )
}

export default CreatePage