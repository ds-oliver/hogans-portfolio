import React from 'react';

const footerNavigation = {
  social: [
    {
      name: 'GitHub',
      href: 'https://github.com/yourusername',
      icon: (props: React.SVGProps<SVGSVGElement>) => (
        <svg fill="currentColor" viewBox="0 0 24 24" {...props}><path d="M12 2C6.477 2 2 6.484 2 12.021c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.482 0-.237-.009-.868-.014-1.703-2.782.605-3.369-1.342-3.369-1.342-.454-1.157-1.11-1.465-1.11-1.465-.908-.62.069-.608.069-.608 1.004.07 1.532 1.032 1.532 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.339-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.025A9.564 9.564 0 0 1 12 6.844c.85.004 1.705.115 2.504.337 1.909-1.295 2.748-1.025 2.748-1.025.546 1.378.202 2.397.1 2.65.64.7 1.028 1.595 1.028 2.688 0 3.847-2.338 4.695-4.566 4.944.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.749 0 .267.18.577.688.479C19.138 20.197 22 16.444 22 12.021 22 6.484 17.523 2 12 2z" /></svg>
      ),
    },
    {
      name: 'LinkedIn',
      href: 'https://linkedin.com/in/yourusername',
      icon: (props: React.SVGProps<SVGSVGElement>) => (
        <svg fill="currentColor" viewBox="0 0 24 24" {...props}><path d="M19 0h-14c-2.76 0-5 2.24-5 5v14c0 2.76 2.24 5 5 5h14c2.76 0 5-2.24 5-5v-14c0-2.76-2.24-5-5-5zm-11 19h-3v-10h3v10zm-1.5-11.28c-.966 0-1.75-.79-1.75-1.76s.784-1.76 1.75-1.76 1.75.79 1.75 1.76-.784 1.76-1.75 1.76zm13.5 11.28h-3v-5.6c0-1.34-.03-3.07-1.87-3.07-1.87 0-2.16 1.46-2.16 2.97v5.7h-3v-10h2.89v1.36h.04c.4-.76 1.38-1.56 2.84-1.56 3.04 0 3.6 2 3.6 4.59v5.61z" /></svg>
      ),
    },
  ],
};

const Footer = () => (
  <div className="flex justify-center space-x-6">
    {footerNavigation.social.map((item, index) => (
      <a 
        key={item.name} 
        href={item.href} 
        className="rounded-full p-2 transition-all duration-300"
        style={{
          color: index % 2 === 0 ? 'var(--accent-teal)' : 'var(--accent-gold)',
          border: `2px solid ${index % 2 === 0 ? 'var(--accent-teal)' : 'var(--accent-gold)'}`
        }}
        onMouseEnter={(e) => {
          e.currentTarget.style.backgroundColor = index % 2 === 0 ? 'var(--accent-teal)' : 'var(--accent-gold)';
          e.currentTarget.style.color = 'var(--background)';
        }}
        onMouseLeave={(e) => {
          e.currentTarget.style.backgroundColor = 'transparent';
          e.currentTarget.style.color = index % 2 === 0 ? 'var(--accent-teal)' : 'var(--accent-gold)';
        }}
      >
        <span className="sr-only">{item.name}</span>
        <item.icon className="h-6 w-6" aria-hidden="true" />
      </a>
    ))}
  </div>
);

export default Footer; 