'use client'

import { motion } from 'framer-motion'

const skills = [
    { name: 'n8n', logo: 'https://cdn.simpleicons.org/n8n/FF6D5A' },
    { name: 'C', logo: 'https://raw.githubusercontent.com/devicons/devicon/master/icons/c/c-original.svg' },
    { name: 'Java', logo: 'https://raw.githubusercontent.com/devicons/devicon/master/icons/java/java-original.svg' },
    { name: 'React', logo: 'https://raw.githubusercontent.com/devicons/devicon/master/icons/react/react-original.svg' },
    { name: 'Next.js', logo: 'https://raw.githubusercontent.com/devicons/devicon/master/icons/nextjs/nextjs-original.svg' },
    { name: 'Python', logo: 'https://raw.githubusercontent.com/devicons/devicon/master/icons/python/python-original.svg' },
    { name: 'FastAPI', logo: 'https://raw.githubusercontent.com/devicons/devicon/master/icons/fastapi/fastapi-original.svg' },
    { name: 'MongoDB', logo: 'https://raw.githubusercontent.com/devicons/devicon/master/icons/mongodb/mongodb-original.svg' },
    { name: 'MySQL', logo: 'https://raw.githubusercontent.com/devicons/devicon/master/icons/mysql/mysql-original.svg' },
    { name: 'TensorFlow', logo: 'https://raw.githubusercontent.com/devicons/devicon/master/icons/tensorflow/tensorflow-original.svg' },
    { name: 'PyTorch', logo: 'https://raw.githubusercontent.com/devicons/devicon/master/icons/pytorch/pytorch-original.svg' },
    { name: 'Scikit-learn', logo: 'https://raw.githubusercontent.com/devicons/devicon/master/icons/scikitlearn/scikitlearn-original.svg' },
    { name: 'Pandas', logo: 'https://raw.githubusercontent.com/devicons/devicon/master/icons/pandas/pandas-original.svg' },
    { name: 'OpenCV', logo: 'https://raw.githubusercontent.com/devicons/devicon/master/icons/opencv/opencv-original.svg' },
    { name: 'Git', logo: 'https://raw.githubusercontent.com/devicons/devicon/master/icons/git/git-original.svg' },
]

const duplicatedSkills = [...skills, ...skills, ...skills, ...skills]

export default function SkillSlider() {
    return (
        <div className="w-full relative overflow-hidden py-10">
            {/* Gradient Masks */}
            <div className="absolute inset-y-0 left-0 w-20 bg-gradient-to-r from-gray-50 dark:from-gray-900 to-transparent z-10" />
            <div className="absolute inset-y-0 right-0 w-20 bg-gradient-to-l from-gray-50 dark:from-gray-900 to-transparent z-10" />

            <motion.div
                className="flex w-fit"
                animate={{
                    x: ['0%', '-50%'],
                }}
                transition={{
                    x: {
                        repeat: Infinity,
                        repeatType: "loop",
                        duration: 50,
                        ease: "linear",
                    },
                }}
            >
                {duplicatedSkills.map((skill, index) => (
                    <div
                        key={index}
                        className="flex-shrink-0 mx-4 md:mx-8 flex flex-col items-center justify-center group cursor-pointer"
                    >
                        <div className="w-20 h-20 relative mb-3 transition-transform group-hover:scale-110 duration-300 p-2">
                            <img
                                src={skill.logo}
                                alt={skill.name}
                                className="w-full h-full object-contain filter drop-shadow-sm"
                            />
                        </div>
                        <span className="text-sm font-medium text-gray-600 dark:text-gray-400 group-hover:text-primary-500 transition-colors">
                            {skill.name}
                        </span>
                    </div>
                ))}
            </motion.div>
        </div>
    )
}
