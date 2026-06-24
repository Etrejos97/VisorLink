import { Link } from 'react-router-dom';
import { Logo } from '@/components/common/Logo';
import { ScanForm } from '@/components/scan/ScanForm';
import { ScanLoading } from '@/components/scan/ScanLoading';
import { ScanResultCard } from '@/components/scan/ScanResultCard';
import { PlanCard } from '@/components/plans/PlanCard';
import { useScan } from '@/app/providers/ScanProvider';
import { PLANS, SIGNAL_DEFINITIONS, FAQ_ITEMS, USE_CASES } from '@/data/mock';
import styles from './LandingPage.module.css';

export function LandingPage() {
  const { isScanning, loadingStep, loadingSteps, currentScan, runScan } = useScan();

  return (
    <>
      <nav className={styles.nav}>
        <Link to="/">
          <Logo size="sm" />
        </Link>
        <ul className={styles.navLinks}>
          <li><a href="#como-funciona">Arquitectura</a></li>
          <li><a href="#senales">Señales</a></li>
          <li><a href="#pricing">Pricing</a></li>
          <li><a href="#faq">FAQ</a></li>
        </ul>
        <div className={styles.navActions}>
          <Link to="/login" className="btn btn-ghost">Login</Link>
          <Link to="/register" className="btn btn-primary">Empezar gratis</Link>
        </div>
      </nav>

      <section className={styles.hero}>
        <Logo size="lg" showText={false} />
        <p className={styles.eslogan}>
          <span className={styles.hl}>¿Link malicioso?</span>
          <br />
          Lo verificamos por ti.
          <br />
          <span className={styles.dim}>Con Visor Link ya no caerás en estafas.</span>
        </p>
        <div className={styles.tag}>sistema activo — v0.1 beta</div>
        <p className={styles.sub}>
          Motor de detección de URLs maliciosas.
          <br />
          Phishing · Typosquatting · Dominios sospechosos.
        </p>

        <ScanForm onScan={(url) => runScan(url, 'landing')} isScanning={isScanning} />

        {isScanning && <ScanLoading steps={loadingSteps} activeStep={loadingStep} />}
        {currentScan && !isScanning && (
          <div className={styles.resultWrap}>
            <ScanResultCard result={currentScan} />
          </div>
        )}
      </section>

      <div className="neon-divider" />

      <div className={styles.statsBar}>
        <div className={styles.statItem}>
          <div className={styles.statNum}>1,247+</div>
          <div className={styles.statDesc}>URLs escaneadas</div>
        </div>
        <div className={styles.statItem}>
          <div className={styles.statNum}>97.2%</div>
          <div className={styles.statDesc}>Precisión ML</div>
        </div>
        <div className={styles.statItem}>
          <div className={styles.statNum}>&lt;1s</div>
          <div className={styles.statDesc}>Tiempo respuesta</div>
        </div>
        <div className={styles.statItem}>
          <div className={styles.statNum}>5</div>
          <div className={styles.statDesc}>Módulos activos</div>
        </div>
      </div>

      <div className="neon-divider" />

      <section className={styles.section} id="como-funciona">
        <div className="section-tag">// arquitectura del sistema</div>
        <h2 className="section-title">Cómo detecta<br /><span>el peligro</span></h2>
        <div className={styles.stepsGrid}>
          {[
            ['01', 'Análisis de URL', 'Estructura, longitud, subdominios, TLD, entropía y parámetros sospechosos.'],
            ['02', 'Reputación', 'Listas negras actualizadas. WHOIS para antigüedad del dominio registrado.'],
            ['03', 'Modelo ML', 'Random Forest entrenado con 100k+ URLs etiquetadas. Detecta brandjacking.'],
            ['04', 'APIs externas', 'VirusTotal y Google Safe Browsing como capa de verificación adicional.'],
            ['05', 'Scoring', 'Suma ponderada de señales. Score 0–100 con piso en señales críticas.'],
          ].map(([num, title, desc]) => (
            <div key={num} className={styles.stepCard}>
              <div className={styles.stepNum}>{num} ──</div>
              <div className={styles.stepTitle}>{title}</div>
              <div className={styles.stepDesc}>{desc}</div>
            </div>
          ))}
        </div>
      </section>

      <section className={styles.section} id="senales">
        <div className="section-tag">// motor de detección</div>
        <h2 className="section-title">Señales que<br /><span>analiza el motor</span></h2>
        <div className={styles.tableWrap}>
          <table className={styles.signalsTable}>
            <thead>
              <tr>
                <th>Señal</th>
                <th>Descripción</th>
                <th>Peso</th>
              </tr>
            </thead>
            <tbody>
              {SIGNAL_DEFINITIONS.map((s) => (
                <tr key={s.name}>
                  <td className={styles.signalName}>{s.name}</td>
                  <td className={styles.signalDesc}>{s.description}</td>
                  <td>
                    <div className={styles.weightBar}>
                      <div className={styles.weightTrack}>
                        <div className={styles.weightFill} style={{ width: `${s.weight}%` }} />
                      </div>
                      <span>{s.weight}%</span>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      <section className={styles.section} id="casos">
        <div className="section-tag">// casos de uso</div>
        <h2 className="section-title">Protección para<br /><span>cada contexto</span></h2>
        <div className={styles.useCases}>
          {USE_CASES.map((uc) => (
            <div key={uc.title} className={styles.useCase}>
              <span className={styles.useIcon}>{uc.icon}</span>
              <h3>{uc.title}</h3>
              <p>{uc.desc}</p>
            </div>
          ))}
        </div>
      </section>

      <section className={styles.section} id="api">
        <div className="section-tag">// integración</div>
        <h2 className="section-title">API <span>REST</span></h2>
        <div className={styles.apiBlock}>
          <div className={styles.apiHeader}>
            <span className={styles.methodBadge}>POST</span>
            <span className={styles.apiPath}>/api/v1/scan</span>
          </div>
          <pre className={styles.apiCode}>{`// Request
{
  "url": "https://secure-login-bancolombia.xyz/verify"
}

// Response 200 OK
{
  "score":   87,
  "nivel":   "alto",
  "alertas": ["brand_spoofing", "tld_is_high_risk"],
  "ms":      312
}`}</pre>
        </div>
      </section>

      <section className={styles.section} id="pricing">
        <div className="section-tag">// planes</div>
        <h2 className="section-title">Elige tu<br /><span>nivel de protección</span></h2>
        <div className={styles.pricingGrid}>
          {PLANS.map((plan) => (
            <PlanCard key={plan.id} plan={plan} onSelect={() => {}} />
          ))}
        </div>
      </section>

      <section className={styles.section} id="faq">
        <div className="section-tag">// preguntas frecuentes</div>
        <h2 className="section-title">FAQ</h2>
        <div className={styles.faqList}>
          {FAQ_ITEMS.map((item) => (
            <details key={item.q} className={styles.faqItem}>
              <summary>{item.q}</summary>
              <p>{item.a}</p>
            </details>
          ))}
        </div>
      </section>

      <section className={styles.cta}>
        <h2>Protege tu equipo <span>antes del clic</span></h2>
        <p>Empieza gratis. Sin tarjeta. Demo lista en segundos.</p>
        <div className={styles.ctaBtns}>
          <Link to="/register" className="btn btn-primary">Crear cuenta demo</Link>
          <Link to="/login" className="btn btn-ghost">Acceso rápido</Link>
        </div>
      </section>

      <footer className={styles.footer}>
        <Logo size="sm" />
        <span>// ciberseguridad · detección de URLs sospechosas</span>
      </footer>
    </>
  );
}
