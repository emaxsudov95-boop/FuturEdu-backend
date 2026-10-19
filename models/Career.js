import mongoose from 'mongoose';

const careerSchema = new mongoose.Schema({
  title: { type: String, required: true },
  slug: { type: String, required: true, unique: true },
  category: { type: String, default: 'Texnologiya' },
  icon: { type: String, default: '💻' },
  description: { type: String, required: true },
  averageSalary: { type: String, default: '$1,000 - $3,000' },
  demandLevel: { type: String, default: 'Juda yuqori' }, // Yuqori, O'rtacha, Juda yuqori
  requiredSubjects: [{ type: String }],
  keySkills: [{ type: String }],
  roadmap: [
    {
      step: Number,
      title: String,
      desc: String,
      recommendedBooks: [String]
    }
  ],
  recommendedQuizzes: [{ type: String }]
});

const Career = mongoose.models.Career || mongoose.model('Career', careerSchema);
export default Career;
