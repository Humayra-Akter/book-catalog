'use client';
import { FcGoogle } from 'react-icons/fc';
import * as React from 'react';
import { useForm } from 'react-hook-form';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { createUser } from '@/redux/features/user/userSlice';
import { useAppDispatch } from '@/redux/hook';
import { useSignInWithGoogle } from 'react-firebase-hooks/auth';
import { auth } from '@/firebase.init';

type UserAuthFormProps = React.HTMLAttributes<HTMLDivElement>;

interface SignupFormInputs {
  email: string;
  password: string;
}

export function SignupForm({ className, ...props }: UserAuthFormProps) {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<SignupFormInputs>();
  const [signInWithGoogle] = useSignInWithGoogle(auth);
  const dispatch = useAppDispatch();

  const onSubmit = (data: SignupFormInputs) => {
    console.log(data);
    dispatch(createUser({ email: data.email, password: data.password }));
  };

  return (
    <div className={cn('grid gap-6', className)} {...props}>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="grid gap-2">
          <div className="grid gap-1">
            <Label className="sr-only" htmlFor="email">
              Email
            </Label>
            <Input
              id="email"
              placeholder="name@example.com"
              type="email"
              autoCapitalize="none"
              autoComplete="email"
              autoCorrect="off"
              {...register('email', { required: 'Email is required' })}
            />
            {errors.email && <p>{errors.email.message}</p>}
            <Input
              id="password"
              placeholder="your password"
              type="password"
              autoCapitalize="none"
              autoCorrect="off"
              {...register('password', { required: 'Password is required' })}
            />{' '}
            {errors.password && <p>{errors.password.message}</p>}
            <Input
              id="password"
              placeholder="confirm password"
              type="password"
              autoCapitalize="none"
              autoCorrect="off"
            />
          </div>
          <Button className="bg-blue-800">Create Account</Button>
        </div>
      </form>
      <div className="relative">
        <div className="absolute inset-0 flex items-center">
          <span className="w-full border-t" />
        </div>
        <div className="relative flex justify-center text-xs uppercase">
          <span className="bg-background px-2 text-muted-foreground">
            Or continue with
          </span>
        </div>
      </div>
      <Button
        variant="outline"
        type="button"
        onClick={() => signInWithGoogle()}
        className="items-center justify-between"
      >
        <p>Google</p>
        <FcGoogle />
      </Button>
    </div>
  );
}
