import React, { useCallback, useRef } from 'react';


import {FiCheckSquare} from 'react-icons/fi'
import {FormHandles} from '@unform/core';
import { Form } from '@unform/web';
import Modal from '../Modal';
import Input from '../Input';





interface Userdata {
    id: number;
    name: string;
    email: string;
    cpf: number;
    password: string;
    avatar_url: string;
    endereco: string;
    numero: number;
    rua: string;
    cidade: string;
}



interface IModalProps {
    isOpen: boolean;
    setIsOpen: () => void;
    handleUpdateUser: (user: Omit<Userdata, 'id'>) => void;
    editingUser: Userdata ;
}

interface IEditUserData {
    id: number;
    name: string;
    email: string;
    cpf: number;
    password: string;
    avatar_url: string;
    endereco: string;
    numero: number;
    rua: string;
    cidade: string;


}

const ModalEditUser: React.FC<IModalProps> = ({
    isOpen,
    setIsOpen,
    editingUser,
    handleUpdateUser,
  }) => {
    const formRef = useRef<FormHandles>(null);
  
    const handleSubmit = useCallback(
      async (data: IEditUserData) => {
        handleUpdateUser(data);
        setIsOpen();
      },
      [handleUpdateUser, setIsOpen],
    );


    return (
        <Modal isOpen={isOpen} setIsOpen={setIsOpen}>
          <Form ref={formRef} onSubmit={handleSubmit} initialData={editingUser}>
            <h1>Editar Usuario Cadastrado</h1>
        
            <Input name="name" placeholder="Ex: Moda Italiana" />
            <Input name="price" placeholder="Ex: 19.90" />
    

    
            <button type="submit" data-testid="edit-food-button">
              <div className="text">Editar Prato</div>
              <div className="icon">
                <FiCheckSquare size={24} />
              </div>
            </button>
          </Form>
        </Modal>
      );
}

export default ModalEditUser;