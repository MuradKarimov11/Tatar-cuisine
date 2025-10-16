'use client';
import { signInWithCredentials } from '@/actions/sign-in';
import { Button, Input, Form } from '@heroui/react';
import { useState } from 'react';

interface IProps {
    onClose: () => void;
}

const LoginForm = ({onClose} : IProps) => {
    const [formData, setFormData] = useState({ 
        email: '',
        password: '',
        confirmPassword: '' 
    });

   
    const handlerSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        console.log('Form submitted:', formData);

        const result = await signInWithCredentials(formData.email, formData.password);
        console.log('Sign-in result:', result);
        onClose();
    }

  return (
    <Form className='w-full' onSubmit={handlerSubmit}>
         <Input
            aria-label='Email'
            isRequired
            name="email"
            placeholder="Enter your email"
            type="email"
            value={formData.email}
            classNames={{
                innerWrapper: "bg-default-100",
                input: "text-sm focus:outline-none",
            }}
            onChange={(e) => setFormData({ ...formData, email: e.target.value })}
            validate={(value) => {
                if(!value) return "Email is required";
                return null;
            }}
        />

        <Input
            isRequired 
            name="password"
            placeholder="Enter your password"
            type="password"
            value={formData.password}
            classNames={{
                innerWrapper: "bg-default-100",
                input: "text-sm focus:outline-none",
            }}
            onChange={(e) => setFormData({ ...formData, password: e.target.value })}
            validate={(value) => {
                if(!value) return "Password is required";
                return null;
            }}
        />
      
        <div className='flex w-[100%] gap-4 items-center justify-end pt-8'>
            <Button variant='light' onPress={onClose}>
                Cancel
            </Button>
            <Button color='primary' type='submit'>
                Login
            </Button>
        </div>

    </Form>
  );
}

export default LoginForm;
