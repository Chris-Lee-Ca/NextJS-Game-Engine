import Image from "next/image";
import styles from "./page.module.css";
import Link from "next/link";

export default function Home() {
    return (
        <main className={styles.main}>
            <div className={styles.center}>
                <Image
                    className={styles.logo}
                    src="/next.svg"
                    alt="Next.js Logo"
                    width={180}
                    height={37}
                    priority
                />
            </div>

            <div className={styles.grid}>
                <Link href="/demo" className={styles.card}>
                    <h2>
                        Demo <span>-&gt;</span>
                    </h2>
                    <p>Explore starter templates for Next.js.</p>
                </Link>
                <Link href="/sandbox" className={styles.card}>
                    <h2>
                        Sandbox <span>-&gt;</span>
                    </h2>
                    <p>Explore starter templates for Next.js.</p>
                </Link>
            </div>
        </main>
    );
}
