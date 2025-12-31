export default function Footer() {
    return (
        <footer className="py-8 text-center text-sm text-[var(--text-secondary)] border-t border-[var(--border)] mt-20">
            <p>© {new Date().getFullYear()} Portfolio. Built with Next.js.</p>
        </footer>
    );
}
