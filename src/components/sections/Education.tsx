"use client";

import { motion } from 'framer-motion';
import { useState, useMemo } from 'react';
import { AcademicCapIcon, ChevronUpIcon, ChevronDownIcon } from '@heroicons/react/24/outline';
import Button from '@/components/ui/Button';

interface Course {
  subject: string;
  number: string;
  title: string;
  credits: number;
  category: string;
}

const courses: Course[] = [
  { subject: "BTA", number: "511", title: "Business with SQL", credits: 4.0, category: "Data Science" },
  { subject: "BTA", number: "521", title: "Data Visualization", credits: 2.0, category: "Data Science" },
  { subject: "BTA", number: "523", title: "Special Topics: ML for Managers", credits: 2.0, category: "Data Science" },
  { subject: "ETM", number: "527", title: "Data Mining for Business", credits: 4.0, category: "Data Science" },
  { subject: "ETM", number: "538", title: "Data Warehousing", credits: 4.0, category: "Data Science" },
  { subject: "BTA", number: "516", title: "Multiple Regression Business Applications", credits: 3.0, category: "Data Science" },
  { subject: "MGMT", number: "518", title: "Digital Transformation: Business", credits: 4.0, category: "Digital Transformation" },
  { subject: "MGMT", number: "519", title: "Digital Transformation: Security", credits: 4.0, category: "Digital Transformation" },
  { subject: "MGMT", number: "520", title: "Organizational Change in Digital Transformation", credits: 4.0, category: "Digital Transformation" },
  { subject: "MGMT", number: "511", title: "Foundations of Strategy", credits: 2.0, category: "Business Strategy" },
  { subject: "RE", number: "521", title: "Real Estate Finance I", credits: 4.0, category: "Business Strategy" },
  { subject: "ETM", number: "540", title: "Operations Research", credits: 4.0, category: "Business Strategy" },
];

const educationInfo = {
  name: "Marhoefer, Hogan",
  type: "Grad Master",
  major: "Applied Data Science for Business",
  gpa: 3.93,
  totalCredits: 32,
};

type SortField = 'subject' | 'number' | 'title' | 'credits' | 'category';
type SortDirection = 'asc' | 'desc';

export default function Education() {
  const [selectedSubject, setSelectedSubject] = useState<string | null>(null);
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [sortField, setSortField] = useState<SortField>('subject');
  const [sortDirection, setSortDirection] = useState<SortDirection>('asc');

  const uniqueSubjects = useMemo(() => 
    Array.from(new Set(courses.map(course => course.subject))).sort(),
    []
  );

  const uniqueCategories = useMemo(() => 
    Array.from(new Set(courses.map(course => course.category))).sort(),
    []
  );

  const filteredAndSortedCourses = useMemo(() => {
    let filtered = courses;
    
    if (selectedSubject) {
      filtered = filtered.filter(course => course.subject === selectedSubject);
    }
    
    if (selectedCategory) {
      filtered = filtered.filter(course => course.category === selectedCategory);
    }

    return filtered.sort((a, b) => {
      const aValue = a[sortField];
      const bValue = b[sortField];
      
      if (typeof aValue === 'string' && typeof bValue === 'string') {
        return sortDirection === 'asc' 
          ? aValue.localeCompare(bValue)
          : bValue.localeCompare(aValue);
      }
      
      return sortDirection === 'asc'
        ? Number(aValue) - Number(bValue)
        : Number(bValue) - Number(aValue);
    });
  }, [selectedSubject, selectedCategory, sortField, sortDirection]);

  const handleSort = (field: SortField) => {
    if (field === sortField) {
      setSortDirection(sortDirection === 'asc' ? 'desc' : 'asc');
    } else {
      setSortField(field);
      setSortDirection('asc');
    }
  };

  const SortIcon = ({ field }: { field: SortField }) => {
    if (field !== sortField) return null;
    return sortDirection === 'asc' 
      ? <ChevronUpIcon className="h-4 w-4" />
      : <ChevronDownIcon className="h-4 w-4" />;
  };

  return (
    <section id="education" className="py-20 bg-charcoal-200 dark:bg-charcoal-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl font-f1 tracking-tight sm:text-4xl text-charcoal-900">
            Education
          </h2>
          <div className="mt-4 text-lg text-charcoal-800">
            <p>{educationInfo.name}</p>
            <p>{educationInfo.major}</p>
          </div>
        </motion.div>

        <div className="mb-8 flex flex-wrap gap-2 justify-center">
          <Button
            onClick={() => setSelectedSubject(null)}
            variant={selectedSubject === null ? "primary" : "ghost"}
            size="sm"
            className="rounded-full"
          >
            All Subjects
          </Button>
          {uniqueSubjects.map((subject) => (
            <Button
              key={subject}
              onClick={() => setSelectedSubject(subject)}
              variant={selectedSubject === subject ? "primary" : "ghost"}
              size="sm"
              className="rounded-full"
            >
              {subject}
            </Button>
          ))}
        </div>

        <div className="mb-8 flex flex-wrap gap-2 justify-center">
          <Button
            onClick={() => setSelectedCategory(null)}
            variant={selectedCategory === null ? "secondary" : "ghost"}
            size="sm"
            className="rounded-full"
          >
            All Categories
          </Button>
          {uniqueCategories.map((category) => (
            <Button
              key={category}
              onClick={() => setSelectedCategory(category)}
              variant={selectedCategory === category ? "secondary" : "ghost"}
              size="sm"
              className="rounded-full"
            >
              {category}
            </Button>
          ))}
        </div>

        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-neutral-600">
            <thead className="bg-neutral-700">
              <tr>
                <th
                  scope="col"
                  className="px-6 py-3 text-left text-xs font-medium text-neutral-200 uppercase tracking-wider cursor-pointer"
                  onClick={() => handleSort('subject')}
                >
                  <div className="flex items-center gap-1">
                    Subject
                    <SortIcon field="subject" />
                  </div>
                </th>
                <th
                  scope="col"
                  className="px-6 py-3 text-left text-xs font-medium text-neutral-200 uppercase tracking-wider cursor-pointer"
                  onClick={() => handleSort('number')}
                >
                  <div className="flex items-center gap-1">
                    Number
                    <SortIcon field="number" />
                  </div>
                </th>
                <th
                  scope="col"
                  className="px-6 py-3 text-left text-xs font-medium text-neutral-200 uppercase tracking-wider cursor-pointer"
                  onClick={() => handleSort('title')}
                >
                  <div className="flex items-center gap-1">
                    Title
                    <SortIcon field="title" />
                  </div>
                </th>
                <th
                  scope="col"
                  className="px-6 py-3 text-left text-xs font-medium text-neutral-200 uppercase tracking-wider cursor-pointer"
                  onClick={() => handleSort('credits')}
                >
                  <div className="flex items-center gap-1">
                    Credits
                    <SortIcon field="credits" />
                  </div>
                </th>
                <th
                  scope="col"
                  className="px-6 py-3 text-left text-xs font-medium text-neutral-200 uppercase tracking-wider cursor-pointer"
                  onClick={() => handleSort('category')}
                >
                  <div className="flex items-center gap-1">
                    Category
                    <SortIcon field="category" />
                  </div>
                </th>
              </tr>
            </thead>
            <tbody className="bg-neutral-700 divide-y divide-neutral-600">
              {filteredAndSortedCourses.map((course, index) => (
                <motion.tr
                  key={`${course.subject}${course.number}`}
                  className="hover:bg-neutral-600 transition-colors cursor-pointer group"
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.3, delay: index * 0.05 }}
                  whileHover={{ scale: 1.01 }}
                >
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-neutral-100">
                    {course.subject}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-neutral-200">
                    {course.number}
                  </td>
                  <td className="px-6 py-4 text-sm text-neutral-200">
                    {course.title}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-neutral-200">
                    {course.credits}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-neutral-200">
                    {course.category}
                  </td>
                </motion.tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className="mt-8 p-6 bg-neutral-700 rounded-lg shadow-sm">
          <div className="flex items-center justify-center gap-4">
            <AcademicCapIcon className="h-8 w-8 bg-gradient-to-r from-[#8A2BE2] to-[var(--accent-gold)] bg-clip-text text-transparent" />
            <div className="text-center">
              <p className="text-sm text-neutral-200">Overall GPA</p>
              <p className="text-3xl font-bold bg-gradient-to-r from-[#8A2BE2] to-[var(--accent-gold)] bg-clip-text text-transparent">{educationInfo.gpa.toFixed(2)}</p>
              <p className="text-sm text-neutral-200">
                {educationInfo.totalCredits} Total Credits
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
} 