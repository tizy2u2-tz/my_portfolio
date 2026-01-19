'use client';

import { motion } from 'framer-motion';

interface ExperienceItem {
  role: string;
  company: string;
  period: string;
  description: string;
}

interface EducationItem {
  degree: string;
  school: string;
  year: string;
}

const experience: ExperienceItem[] = [
  {
    role: 'Senior Designer',
    company: 'Cohesity',
    period: '2019 — Present',
    description: 'Leading brand, digital, and motion design for enterprise data security. Owning creative direction for global campaigns, events, and product marketing.',
  },
  {
    role: 'Designer',
    company: 'Previous Company',
    period: '2016 — 2019',
    description: 'Brand identity and digital design for B2B tech clients. Developed visual systems and led design for marketing campaigns.',
  },
  {
    role: 'Junior Designer',
    company: 'Agency Name',
    period: '2014 — 2016',
    description: 'Worked across branding, print, and digital projects for diverse clients. Foundation in design systems and production.',
  },
];

const education: EducationItem[] = [
  {
    degree: 'BFA in Graphic Design',
    school: 'University Name',
    year: '2014',
  },
];

const tools = [
  'Figma',
  'Adobe Creative Suite',
  'After Effects',
  'Illustrator',
  'Photoshop',
  'Lottie',
  'Framer',
  'Webflow',
];

export default function Resume() {
  return (
    <div className="space-y-16">
      {/* Experience */}
      <div>
        <h3 className="text-xs font-medium tracking-widest uppercase text-magenta mb-8">Work Experience</h3>
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
                <p className="text-magenta mb-2">{item.company}</p>
                <p className="text-cream/60 text-sm">{item.description}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Education */}
      <div>
        <h3 className="text-xs font-medium tracking-widest uppercase text-magenta mb-8">Education</h3>
        <div className="space-y-4">
          {education.map((item, index) => (
            <motion.div
              key={item.school}
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1, duration: 0.4 }}
              className="grid grid-cols-1 md:grid-cols-4 gap-4"
            >
              <div className="md:col-span-1">
                <span className="text-sm text-cream/40">{item.year}</span>
              </div>
              <div className="md:col-span-3">
                <h4 className="text-lg font-display font-semibold">{item.degree}</h4>
                <p className="text-cream/60">{item.school}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Tools & Skills */}
      <div>
        <h3 className="text-xs font-medium tracking-widest uppercase text-magenta mb-8">Tools & Skills</h3>
        <div className="flex flex-wrap gap-3">
          {tools.map((tool, index) => (
            <motion.span
              key={tool}
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.05, duration: 0.3 }}
              className="px-4 py-2 text-sm border border-cream/20 hover:border-magenta hover:text-magenta transition-colors duration-300"
            >
              {tool}
            </motion.span>
          ))}
        </div>
      </div>
    </div>
  );
}
