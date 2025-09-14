import React, { useState } from 'react';
import ReactDOM from 'react-dom'; // Import ReactDOM
import './Modal.css'; // Import the CSS file

const CustomModal = ({ isOpen, onClose, product, handleUpdateProduct }) => {
    const [updatedProduct, setUpdatedProduct] = useState({
        name: product.name,
        price: product.price,
        image: product.image,
    });

    if (!isOpen) {
        return null;
    }

    const handleOverlayClick = (e) => {
        // Prevent clicks inside the modal content from closing the modal
        if (e.target.className === 'modal-overlay') {
            onClose();
        }
    };

    // Use a portal to render the modal outside of the parent component's DOM tree
    return ReactDOM.createPortal(
        <div className='modal-overlay' onClick={handleOverlayClick}>
            <div className='modal-content' onClick={(e) => e.stopPropagation()}>
                <div className='modal-header'>
                    <h2>Update Product</h2>
                    <button className='modal-close-btn' onClick={onClose}>
                        &times;
                    </button>
                </div>
                <div className='modal-body'>
                    <div className='input-stack'>
                        <input
                            className='modal-input'
                            placeholder='Product Name'
                            name='name'
                            value={updatedProduct.name}
                            onChange={(e) => setUpdatedProduct({ ...updatedProduct, name: e.target.value })}
                        />
                        <input
                            className='modal-input'
                            placeholder='Price'
                            name='price'
                            type='number'
                            value={updatedProduct.price}
                            onChange={(e) => setUpdatedProduct({ ...updatedProduct, price: e.target.value })}
                        />
                        <input
                            className='modal-input'
                            placeholder='Image URL'
                            name='image'
                            value={updatedProduct.image}
                            onChange={(e) => setUpdatedProduct({ ...updatedProduct, image: e.target.value })}
                        />
                    </div>
                </div>
                <div className='modal-footer'>
                    <button
                        className='modal-update-btn'
                        onClick={() => handleUpdateProduct(product._id, updatedProduct)}
                    >
                        Update
                    </button>
                    <button className='modal-cancel-btn' onClick={onClose}>
                        Cancel
                    </button>
                </div>
            </div>
        </div>,
        document.body // Append the modal to the document body
    );
};

export default CustomModal;