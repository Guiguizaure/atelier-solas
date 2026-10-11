import type { Metadata } from "next";
import { PaperPage } from "@/components/chrome/PaperPage";
import styles from "./legal.module.css";

export const metadata: Metadata = {
  title: "Legal notice",
  description: "Legal notice of Atelier Solas, a fictional brand and demonstration site by Guillaume Salle.",
  alternates: { canonical: "/legal" },
};

const PUBLISHER_EMAIL = "webjunopro@gmail.com";

// French by law (LCEN, art. 6); the title and summary stay in English like the rest of the site.
export default function LegalNotice() {
  return (
    <PaperPage>
      <p className={`text-accent ${styles.eyebrow}`}>Pattern sheet · legal</p>
      <h1 className={styles.title}>Legal notice</h1>
      <p className={styles.lead}>
        This notice is in French, as French law requires. In short: Atelier Solas is a fictional
        brand, and this site a demonstration designed and built by Guillaume Salle.
      </p>

      <div className={styles.sheet} lang="fr">
        <section aria-labelledby="editeur">
          <h2 id="editeur">Éditeur et directeur de la publication</h2>
          <p>Guillaume Salle, entrepreneur individuel (Webjuno)</p>
          <p>136 rue Esteve Haut, 83140 Six-Fours-les-Plages, France</p>
          <p>SIRET : 931 695 365 00011</p>
          <p>
            E-mail : <a href={`mailto:${PUBLISHER_EMAIL}`}>{PUBLISHER_EMAIL}</a>
          </p>
        </section>

        <section aria-labelledby="hebergeur">
          <h2 id="hebergeur">Hébergeur</h2>
          <p>Cloudflare, Inc. (Cloudflare Pages)</p>
          <p>101 Townsend Street, San Francisco, CA 94107, États-Unis</p>
        </section>

        <section aria-labelledby="demonstration">
          <h2 id="demonstration">Site de démonstration</h2>
          <p>
            Ce site est une démonstration, conçue et réalisée par Guillaume Salle (Webjuno). La
            marque Atelier Solas, la créatrice Sarah Solas, les modèles, les tissus et les prix
            présentés sont fictifs. Aucune commande ni aucun paiement n&apos;est possible, et
            l&apos;adresse hello@ateliersolas.example n&apos;existe pas.
          </p>
        </section>

        <section aria-labelledby="donnees">
          <h2 id="donnees">Données personnelles et cookies</h2>
          <p>
            Le site ne dépose aucun cookie, n&apos;utilise aucun outil de mesure d&apos;audience et
            ne collecte aucune donnée personnelle. Il retient seulement, dans le stockage de session
            du navigateur, que l&apos;introduction a été vue : cette information reste sur votre
            appareil et s&apos;efface à la fermeture de l&apos;onglet.
          </p>
        </section>

        <section aria-labelledby="typographies">
          <h2 id="typographies">Typographies</h2>
          <p>
            Della Respira, Karla et DM Mono, sous licence SIL Open Font License, servies depuis ce
            site (aucune requête vers un service tiers).
          </p>
        </section>
      </div>
    </PaperPage>
  );
}
