
import React, { useState } from 'react';
import StarBackground from '@/components/StarBackground';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { useIsMobile } from '@/hooks/use-mobile';

interface TopicRowProps {
  title: string;
  notesLink: string;
  practiceLink?: string;
  solutionLink?: string;
}

const TopicRow: React.FC<TopicRowProps> = ({ title, notesLink, practiceLink, solutionLink }) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const isMobile = useIsMobile();

  return (
    <div className="border border-gray-700 rounded-lg mb-2 overflow-hidden">
      <div 
        className="flex justify-between items-center p-4 hover:bg-gray-700 transition-colors cursor-pointer"
        onClick={() => setIsExpanded(!isExpanded)}
      >
        <span className="text-lg">{title}</span>
        <span className="text-gray-400">{isExpanded ? '▲' : '▼'}</span>
      </div>
      {isExpanded && (
        <div className="p-4 bg-gray-800 border-t border-gray-700 flex flex-col space-y-2">
          <a
            href={notesLink}
            target="_blank"
            rel="noopener noreferrer"
            {...(isMobile && { download: true })}
            className="text-blue-400 hover:underline"
          >
            View Notes
          </a>
          {practiceLink && (
            <a
              href={practiceLink}
              target="_blank"
              rel="noopener noreferrer"
              {...(isMobile && { download: true })}
              className="text-blue-400 hover:underline"
            >
              Practice Questions
            </a>
          )}
          {solutionLink && (
            <a
              href={solutionLink}
              target="_blank"
              rel="noopener noreferrer"
              {...(isMobile && { download: true })}
              className="text-blue-400 hover:underline"
            >
              Solution
            </a>
          )}
        </div>
      )}
    </div>
  );
};

const NotesPage: React.FC = () => {
  return (
    <div className="relative flex flex-col min-h-screen bg-gray-900 text-white">
      <Header />
      <StarBackground />
      <div className="flex-grow container mx-auto px-4 py-24 relative z-10">
        <h1 className="text-4xl font-bold text-center mb-8">Class 12 (Management) Business Mathematics Notes</h1>
        <p className="text-center text-lg mb-12 max-w-3xl mx-auto">
          These notes were compiled while teaching Business Mathematics to Class 12 (Management) students at 
          <span className="text-blue-400">
            <a href="https://kucity.edu.np/" target="_blank" rel="noopener noreferrer">
               KU City School/College
            </a>
          </span>. 
          They are designed to support students' learning and understanding of key concepts.
        </p>
        
        <div className="bg-gray-800 border border-gray-700 rounded-lg p-6 mb-8">
          <h2 className="text-3xl font-bold mb-4">Algebra</h2>
          <TopicRow 
            title="Permutation and Combination" 
            notesLink="/class12_math_notes/permutation_combination/classXII_Unit1_notes.pdf"
            practiceLink="/class12_math_notes/permutation_combination/unit1_practiseQuestion.pdf"
            solutionLink="/class12_math_notes/permutation_combination/unit1_solution.pdf"
          />
          <TopicRow
             title="Binomial Theorem"
             notesLink="/class12_math_notes/Binomial_Theorem/classXII_Binomial_theorem_notes.pdf"
             practiceLink="/class12_math_notes/Binomial_Theorem/binomial_the_practise.pdf"
             solutionLink="/class12_math_notes/Binomial_Theorem/binomial_theorem_solution.pdf"
           />
        </div>

        <div className="bg-gray-800 border border-gray-700 rounded-lg p-6">
          <h2 className="text-3xl font-bold mb-4">Statistics and Probability</h2>
          <TopicRow title="Correlation Part" notesLink="/class12_math_notes/correlation_regression/classXII_Correlation_notes.pdf" />
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default NotesPage;
