import { Link, Navigate, useNavigate } from 'react-router-dom';
import { AuthForm } from '@/components/auth/AuthForm';
import { Logo } from '@/components/common/Logo';
import { useAuth } from '@/app/providers/AuthProvider';
import styles from './AuthPages.module.css';

export function LoginPage() {
  const { login, loginDemo, isAuthenticated } = useAuth();
  const navigate = useNavigate();

  if (isAuthenticated) {
    return <Navigate to="/app/dashboard" replace />;
  }

  return (
    <div className={styles.page}>
      <Link to="/" className={styles.back}>
        <Logo size="sm" />
      </Link>
      <AuthForm
        mode="login"
        onSubmit={async ({ email, password }) => {
          const result = await login(email, password);
          if (result.ok) navigate('/app/dashboard');
          return result;
        }}
        onDemoLogin={(email) => {
          loginDemo(email);
          navigate('/app/dashboard');
        }}
      />
    </div>
  );
}

export function RegisterPage() {
  const { register, isAuthenticated } = useAuth();
  const navigate = useNavigate();

  if (isAuthenticated) {
    return <Navigate to="/app/dashboard" replace />;
  }

  return (
    <div className={styles.page}>
      <Link to="/" className={styles.back}>
        <Logo size="sm" />
      </Link>
      <AuthForm
        mode="register"
        onSubmit={async ({ email, password, name }) => {
          const result = await register(name ?? '', email, password);
          if (result.ok) navigate('/app/dashboard');
          return result;
        }}
      />
    </div>
  );
}
