import styles from "./page.module.css"
import { ExternalLink } from "lucide-react";


const stack = [
    {
        category: "Frontend",
        color: "#6366F1",
        items: ["Next.js 16", "TypeScript", "CSS Modules"],
    },

    {
        category: "Backend",
        color: "#8B5CF6",
        items: ["FastAPI", "Python 3.13", "Pydantic"],
    },
    {
        category: "AI",
        color: "#10B981",
        items: ["Anthropic Claude API", "claude-opus-4-5"],
    },
];

export default function AboutPage() {
    return (
        <div className={styles.page}>
            <div className={styles.inner}>
                {/* Header */}
                <div className={styles.header}>
                    <span className={styles.label}>About</span>
                    <h1 className={styles.title}>Built to make algorithms click.</h1>
                    <p className={styles.subtitle}>
                        Tracer started as a STEM education hackathon project and developed a little more on the visualize. The goal was simple, build a tool that
                        makes algorithms feel intuitive rather than intimidating.
                    </p>
                </div>

                <div className={styles.divider}>
                    {/* Why */}
                    <div className={styles.section}>
                        <h2 className={styles.sectionTitle}>Why Tracer?</h2>
                        <p className={styles.body}>
                            Most algorithm visualizers show you what happens but not why it happens.
                            Tracer pairs every step with synchronized pseudocode so you always know
                            exactly which line of logic produced the visual change you just saw.
                            No guessing. No context switching between a textbook and a tool.
                        </p>
                        <p className={styles.body}>
                            It covers 12 algorithms across sorting, searching, and data structures —
                            the fundamentals that show up in every CS curriculum and every technical
                            interview.
                        </p>
                    </div>

                    <div className={styles.divider} />

                    {/* Stack */}
                    <div className={styles.section}>
                        <h2 className={styles.sectionTitle}>Tech stack</h2>
                        <div className={styles.stackGrid}>
                            {stack.map((cat) => (
                                <div key={cat.category} className={styles.stackCard}>
                                    <span
                                        className={styles.stackCategory}
                                        style={{ color: cat.color }}
                                    >
                                        {cat.category}
                                    </span>
                                    <ul className={styles.stackList}>
                                        {cat.items.map((item) => (
                                            <li key={item} className={styles.stackItem}>
                                                <span
                                                    className={styles.stackDot}
                                                    style={{backgroundColor: cat.color}}
                                                />
                                                {item}
                                            </li>
                                        ))}
                                    </ul>
                                </div>
                            ))}
                        </div>
                    </div>

                    <div className={styles.divider} />

                    {/* Builder */}
                    <div className={styles.section}>
                        <h2 className={styles.sectionTitle}>Builder</h2>
                        <div className={styles.builderCard}>
                            <div className={styles.builderInfo}>
                                <span className={styles.builderName}>Luan Luong</span>
                                <span className={styles.builderRole}>
                                    Raising Senior CS Student - Cal State Fullerton
                                </span>
                            </div>

                            <div className={styles.builderLinks}>
                                <a
                                    href="https://github.com/ryanluongLL"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className={styles.builderLink}
                                >
                                    <svg
                                        width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
                                        <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0 0 24 12c0-6.63-5.37-12-12-12z" />
                                    </svg>
                                    GitHub
                                </a>

                                <a
                                    href="https://luanluong-dev.vercel.app/"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className={`${styles.builderLink} ${styles.builderLinkPrimary}`}
                                >
                                    <svg
                                        width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                        <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6" />
                                        <polyline points="15 3 21 3 21 9" />
                                        <line x1="10" y1="14" x2="21" y2="3" />
                                    </svg>
                                    View Portfolio
                                </a>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}