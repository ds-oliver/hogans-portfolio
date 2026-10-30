import { GITHUB_URL, GitHubIcon, LINKEDIN_URL, LinkedInIcon } from '@/components/ui/SocialLinks';

const Footer = () => (
  <footer className="border-t border-surface-line py-8 px-6">
    <div className="mb-4 flex justify-center gap-4 text-ink-dim">
      <a
        href={LINKEDIN_URL}
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Marlen Solutions on LinkedIn"
        className="transition-colors hover:text-layer-2"
      >
        <LinkedInIcon className="h-5 w-5" />
      </a>
      <a
        href={GITHUB_URL}
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Hogan Marhoefer on GitHub"
        className="transition-colors hover:text-layer-2"
      >
        <GitHubIcon className="h-5 w-5" />
      </a>
    </div>
    <p className="text-center text-xs text-ink-dim">
      Marlen Solutions LLC | 1109 SE 72nd Ave, Portland, OR 97215 | Oregon Registry No. 258911594
    </p>
  </footer>
);

export default Footer;
