import { useLoginMutation } from '../api/authApi';
import { useAppDispatch } from '@/app/hooks';
import { setCredentials } from '../store/auth.slice';

export function useLogin() {
  const dispatch = useAppDispatch();
  const [login, loginState] = useLoginMutation();

  const signIn = async (
    email: string,
    password: string,
    rememberMe: boolean,
  ) => {
    const response = await login({
      email,
      password,
      rememberMe,
    }).unwrap();

    dispatch(setCredentials(response));

    return response;
  };

  return { signIn, ...loginState };
}