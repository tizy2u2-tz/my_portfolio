'use client';

import { motion } from 'framer-motion';

interface ExperienceItem {
  role: string;
  company: string;
  period: string;
  description: string | string[];
}

interface EducationItem {
  degree: string;
  school: string;
  year: string;
}

interface CertificationItem {
  title: string;
  issuer: string;
}

interface AwardItem {
  title: string;
}

const experience: ExperienceItem[] = [
  {
    role: 'Art Director',
    company: 'Cohesity — San Jose, CA',
    period: '2019 — Present',
    description: [
      'Lead art direction and visual design across brand, digital marketing, campaigns, and global events.',
      'Played a key role in evolving the brand toward a more modern, confident visual identity.',
      'Directed major initiatives including AWS re:Invent, OOH placements (including Harmon Corner), digital billboards, booth environments, and large-scale event graphics.',
      'Defined the visual system for Cohesity Catalyst, the company\'s largest virtual event, ensuring consistency across all digital touchpoints.',
      'Partnered closely with marketing, product, and leadership teams to deliver award-winning campaigns with measurable impact.',
      'Implemented and scaled a design system to improve brand consistency, efficiency, and collaboration across teams.',
    ],
  },
  {
    role: 'Creative Lead / Manager',
    company: 'A10 Networks — San Jose, CA',
    period: '2015 — 2019',
    description: [
      'Led creative direction for brand, marketing campaigns, websites, and corporate communications.',
      'Developed and directed integrated campaigns across digital, print, and experiential channels.',
      'Defined the look and feel of the marketing website from concept through final delivery.',
      'Collaborated with cross-functional teams to align creative output with business and product goals.',
    ],
  },
  {
    role: 'Visual Designer',
    company: 'Apple — Sunnyvale, CA',
    period: '2014 — 2015',
    description: [
      'Translated business requirements into design concepts, wireframes, prototypes, and high-fidelity mockups.',
      'Designed user flows, interactive prototypes, and final production-ready assets.',
      'Participated in user research and usability testing initiatives.',
      'Collaborated with cross-functional product teams to present and refine design solutions.',
    ],
  },
];

const education: EducationItem[] = [
  {
    degree: 'BFA in Graphic Design',
    school: 'Khabarovsk, Russia',
    year: '',
  },
];

const certifications: CertificationItem[] = [
  {
    title: 'Web Design',
    issuer: 'California College of Communications, Santa Clara, CA',
  },
  {
    title: 'Mobile App Design: Design Principles & UX',
    issuer: '',
  },
  {
    title: 'Coding for Designers',
    issuer: '',
  },
];

const awards: AwardItem[] = [
  {
    title: 'GDUSA Digital Design Awards — 2021, 2022, 2023, 2024',
  },
  {
    title: 'American InHouse Design Award — Best Brochure Design',
  },
  {
    title: 'American InHouse Design Award — Best Collateral Design',
  },
  {
    title: 'Multiple awards and recognitions in fine art as a landscape oil painter',
  },
];

const tools = [
  'Figma',
  'Adobe Creative Suite',
  'Adobe Firefly',
  'After Effects',
  'Illustrator',
  'Photoshop',
  'Lottie',
  'Framer',
  'Cursor',
  'Midjourney',
  'ChatGPT',
  'HTML & CSS',
];

export default function Resume() {
  return (
    <div className="space-y-16">
      {/* Experience */}
      <div>
        <h3 className="text-xs font-medium tracking-widest uppercase text-yellow mb-8">Work Experience</h3>
        <div className="space-y-8">
          {experience.map((item, index) => (
            <motion.div
              key={`${item.company}-${item.role}`}
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1, duration: 0.4 }}
              className="grid grid-cols-1 md:grid-cols-4 gap-4 pb-8 border-b border-cream/10 last:border-0"
            >
              <div className="md:col-span-1">
                <span className="text-sm text-cream/40">{item.period}</span>
              </div>
              <div className="md:col-span-3">
                <h4 className="text-lg font-display font-semibold">{item.role}</h4>
                <p className="text-yellow mb-2">{item.company}</p>
                {Array.isArray(item.description) ? (
                  <ul className="text-cream/60 text-sm space-y-1.5 list-disc pl-6">
                    {item.description.map((bullet, idx) => (
                      <li key={idx} className="leading-relaxed">{bullet}</li>
                    ))}
                  </ul>
                ) : (
                  <p className="text-cream/60 text-sm">{item.description}</p>
                )}
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Education, Certifications & Honors & Awards */}
      <div className="grid grid-cols-1 md:grid-cols-[1fr_1.2fr_1.2fr] gap-8 md:gap-12">
        {/* Education */}
        <div>
          <h3 className="text-xs font-medium tracking-widest uppercase text-yellow mb-8">Education</h3>
          <div className="space-y-4">
            {education.map((item, index) => (
              <motion.div
                key={item.school}
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1, duration: 0.4 }}
              >
                <h4 className="text-lg font-display font-semibold">{item.degree}</h4>
                <p className="text-cream/60">{item.school}</p>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Certifications */}
        <div>
          <h3 className="text-xs font-medium tracking-widest uppercase text-yellow mb-8">Certifications</h3>
          <div className="space-y-4">
            {certifications.map((item, index) => (
              <motion.div
                key={item.title}
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1, duration: 0.4 }}
              >
                <h4 className="text-lg font-body font-semibold">{item.title}</h4>
                {item.issuer && <p className="text-cream/60">{item.issuer}</p>}
              </motion.div>
            ))}
          </div>
        </div>

        {/* Honors & Awards */}
        <div>
          <h3 className="text-xs font-medium tracking-widest uppercase text-yellow mb-8">Honors & Awards</h3>
          <div className="space-y-4">
            {awards.map((item, index) => (
              <motion.div
                key={item.title}
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1, duration: 0.4 }}
              >
                <p className="text-cream/60">{item.title}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </div>

      {/* Tools & Skills */}
      <div>
        <h3 className="text-xs font-medium tracking-widest uppercase text-yellow mb-8">Tools & Skills</h3>
        <div className="flex flex-wrap gap-3">
          {tools.map((tool, index) => (
            <motion.span
              key={tool}
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.05, duration: 0.3 }}
              className="px-4 py-2 text-sm border border-cream/25 hover:border-yellow hover:text-yellow transition-colors duration-300"
            >
              {tool}
            </motion.span>
          ))}
        </div>
      </div>
    </div>
  );
}
