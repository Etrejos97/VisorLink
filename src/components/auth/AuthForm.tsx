import { useState } from 'react';
import { Link } from 'react-router-dom';
import { DEMO_QUICK_ACCESS } from '@/data/mock';
import styles from './AuthForm.module.css';

interface AuthFormProps {
  mode: 'login' | 'register';
  onSubmit: (data: { email: string; password: string; name?: string }) => Promise<{ ok: boolean; error?: string }>;
  onDemoLogin?: (email: string) => void;
}

export function AuthForm({ mode, onSubmit, onDemoLogin }: AuthFormProps) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);
    const result = await onSubmit({ email, password, name: mode === 'register' ? name : undefined });
    setLoading(false);
    if (!result.ok) setError(result.error ?? 'Error al autenticar');
  };

  return (
    <div className={styles.card}>
      <div className={styles.header}>
        <span className={styles.tag}>// {mode === 'login' ? 'acceso' : 'registro'}</span>
        <h1>{mode === 'login' ? 'Iniciar sesión' : 'Crear cuenta'}</h1>
        <p>Demo sin backend — credenciales simuladas en memoria</p>
      </div>

      <form onSubmit={handleSubmit} className={styles.form}>
        {mode === 'register' && (
          <label>
            <span>Nombre</span>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Tu nombre"
              required
            />
          </label>
        )}
        <label>
          <span>Email</span>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="tu@email.com"
            required
          />
        </label>
        <label>
          <span>Contraseña</span>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="demo123"
            required
            minLength={6}
          />
        </label>
        {error && <p className={styles.error}>{error}</p>}
        <button type="submit" className="btn btn-primary" disabled={loading}>
          {loading ? 'Entrando...' : mode === 'login' ? 'Entrar' : 'Registrarse'}
        </button>
      </form>

      {mode === 'login' && onDemoLogin && (
        <div className={styles.demo}>
          <span className={styles.demoLabel}>// acceso rápido demo</span>
          <div className={styles.demoBtns}>
            {DEMO_QUICK_ACCESS.map((d) => (
              <button
                key={d.email}
                type="button"
                className={styles.demoBtn}
                onClick={() => onDemoLogin(d.email)}
              >
                <strong>{d.label}</strong>
                <span>{d.plan}</span>
              </button>
            ))}
          </div>
        </div>
      )}

      <p className={styles.footer}>
        {mode === 'login' ? (
          <>
            ¿Sin cuenta? <Link to="/register">Regístrate gratis</Link>
          </>
        ) : (
          <>
            ¿Ya tienes cuenta? <Link to="/login">Inicia sesión</Link>
          </>
        )}
      </p>
    </div>
  );
}
