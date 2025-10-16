"use client";

import { registerUser } from '@/actions/register';
import { Button, Input, Form  } from '@heroui/react';

import { useState } from 'react';

interface IProps {
    onClose: () => void;
}

const RegistrationForm = ({onClose} : IProps) => {
    const [formData, setFormData] = useState({ 
        email: '',
        password: '',
        confirmPassword: '' 
    });

    const validateEmail = (email: string) => {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(String(email).toLowerCase());
    }

    const handlerSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        console.log('Form submitted:', formData);

        const result = await registerUser(formData);
        console.log('Registration result:', result);

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
                if(!validateEmail(value)) return "Invalid email address";
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
                if(value.length < 6) return "Password must be at least 6 characters";
                return null;
            }}
        />

        <Input
            isRequired 
            name="confirmPassword" 
            placeholder="Confirm your password"
            type="password"
            value={formData.confirmPassword}    
            classNames={{
                innerWrapper: "bg-default-100",
                input: "text-sm focus:outline-none",
            }}
            onChange={(e) => 
                setFormData({ ...formData, confirmPassword: e.target.value })}
            validate={(value) => {
                if(!value) return "Please confirm your password";
                if(value !== formData.password) return "Passwords do not match";
                return null;
            }}
        />

        <div className='flex w-[100%] gap-4 items-center justify-end pt-8'>
            <Button variant='light' onPress={onClose}>
                Cancel
            </Button>
            <Button color='primary' type='submit'>
                Register
            </Button>
        </div>

    </Form>
  );
}

export default RegistrationForm;
