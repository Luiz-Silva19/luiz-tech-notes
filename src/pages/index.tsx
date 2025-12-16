/// <reference types="@docusaurus/module-extensions" />

import React from 'react';
import Layout from '@theme/Layout';
import Link from '@docusaurus/Link';
import styles from './index.module.css';

export default function Home(): JSX.Element {
  return (
    <Layout title="Inicio" description="Bem-vindo ao Luiz Tech Notes">
      <main>
        <div className={styles.hero}>
          <div className={styles.heroContent}>
            <h1 className={styles.title}>👋 Bem-vindo ao Luiz Tech Notes</h1>
            <p className={styles.subtitle}>
              Documentação técnica sobre AWS, Backend, Infraestrutura e DevOps
            </p>
            <div className={styles.buttons}>
              <Link className={styles.button} href="/docs/intro">
                Ver Documentação
              </Link>
              <Link className={styles.buttonSecondary} href="/blog">
                Ver Blog
              </Link>
            </div>
          </div>
        </div>

        <section className={styles.features}>
          <div className={styles.featuresList}>
            <div className={styles.feature}>
              <h3>☁️ AWS</h3>
              <p>Exploração profunda dos serviços da Amazon Web Services</p>
            </div>
            <div className={styles.feature}>
              <h3>🔧 Backend</h3>
              <p>Desenvolvimento com Node.js e .NET</p>
            </div>
            <div className={styles.feature}>
              <h3>🏗️ Infraestrutura</h3>
              <p>Docker, Kubernetes e DevOps</p>
            </div>
          </div>
        </section>
      </main>
    </Layout>
  );
}
