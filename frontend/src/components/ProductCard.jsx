import { GrUpdate } from "react-icons/gr";
import { FaRegTrashAlt } from "react-icons/fa";
import {
	Box,
	Heading,
	HStack,
	IconButton,
	Image,
	Text,
} from "@chakra-ui/react";
import {useColorModeValue} from "@/components/ui/color-mode"
import { useProductStore } from "../../store/product";
import CustomModal from './CustomModal'; // Adjust the path as needed
import { useState } from "react";


const ProductCard = ({product}) => {

    // State for the modal
    const [isOpen, setIsOpen] = useState(false);

    // State for the product being updated
    const [updatedProduct, setUpdatedProduct] = useState({
        name: product.name,
        price: product.price,
        image: product.image,
    });

    // Handlers for the modal
    const onOpen = () => setIsOpen(true);
    const onClose = () => setIsOpen(false);

    const {updateProduct} = useProductStore()
    // Handler for the update action
    const handleUpdateProduct = async (pid, updatedProduct) => {
        const { success, message } = await updateProduct(pid, updatedProduct);
        onClose(); // Close the modal after updating
        if (!success) {
            alert("Failed to update");
        } else {
            alert("Updated successfully");
        }
    };



    const textColor = useColorModeValue("gray.600", "gray.200");
	const bg = useColorModeValue("white", "gray.800");

    const {deleteProduct} = useProductStore();

    const handleDeleteProduct = async(pid) => {
        const {success, message} = await deleteProduct(pid);
        if(!success) {
            alert("Product failed to delete")
        } else {
            alert("Product Deleted")
        }
    }
    

    return (
        <Box shadow='lg'
			rounded='lg'
			overflow='hidden'
			transition='all 0.3s'
			_hover={{ transform: "translateY(-5px)", shadow: "xl" }}
			bg={bg}>
                <Image src={product.image} alt={product.name} h={48} w='full' objectFit='cover' />

                <Box p={4}>
				<Heading as='h3' size='md' mb={2}>
					{product.name}
				</Heading>

				<Text fontWeight='bold' fontSize='xl' color={textColor} mb={4}>
					${product.price}
				</Text>

				<HStack spacing={2}>
                    
					<IconButton onClick={onOpen} colorPalette='blue' ><GrUpdate /></IconButton>
					<IconButton
						onClick={() => handleDeleteProduct(product._id)}
						colorPalette='red'
					><FaRegTrashAlt /></IconButton>
				</HStack>
			    </Box>

                <CustomModal
                    isOpen={isOpen}
                    onClose={onClose}
                    product={product}
                    updatedProduct={updatedProduct}
                    setUpdatedProduct={setUpdatedProduct}
                    handleUpdateProduct={handleUpdateProduct}
                />

            </Box>
    )
};


export default ProductCard;