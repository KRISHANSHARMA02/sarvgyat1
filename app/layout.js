import "./globals.css";
import SessionWrapper from "@/components/SessionWrapper";

export const metadata = {
  title: "Sarvgyat: Empowering Teachers to Share Knowledge and Earn | Learnosphere Campaign",
  description:
    "Join Sarvgyat, a campaign by Learnosphere, where teachers can share educational materials, earn rewards, and help students thrive. Explore high-quality resources and contribute to shaping futures. Sign up now to start sharing and earning through Sarvgyat!",
  keywords:
    "Home Tuition in Jaipur,Tuition,Home Tuition,Home tuition for exams, Home tuition services, teacher, student, tuition teacher, online education, tutor,Affordable home tuition, learning,Maths and english tutor near me ,maths tution near me, syllabus,english private tutor near me,IIT ,JEE MAIN ,JEE, science tution near me,online tutor,tuition in jaipur,home tutor near me,maths tutor near me, Sarvgyat, a campaign by Learnosphere, is an innovative educational content sharing platform where teachers can earn by sharing educational materials. This platform allows educators to upload teaching materials online, including notes, presentations, and lesson plans, and make them available as high-quality educational resources for students and schools. With Sarvgyat, teachers can monetize content by reaching a broad audience, contributing to free educational resources for students and helping schools access valuable learning tools. Whether you're looking to share educational resources or discover online learning content, Sarvgyat is the ideal platform for both teachers and students. Sign up now to teach and earn online while supporting school resources with top-notch educational content ",
  openGraph: {
    type: "website",
    url: "https://learnosphere.in/",
    title: "Hire an educator | Learnosphere",
    description:
      "Learnosphere - Looking to an educator? Search no further! Our experienced educators offer tailored solutions for students of all ages",
    images: [
      {
        url: "https://learnosphere.in/",
        width: 800,
        height: 600,
        alt: "leanosphere hiring teacher Image Alt",
      },
    ],
    additionalMetaTags: [
      {
        name: "keywords",
        content:
          "learnosphere,Home Tuition in Jaipur,Tuition,Home Tuition,Home tuition for exams, Home tuition services, teacher, student, tuition teacher, online education, tutor,Affordable home tuition, learning,Maths and english tutor near me ,maths tution near me, syllabus,english private tutor near me,IIT ,JEE MAIN ,JEE, science tution near me,online tutor,tuition in jaipur,home tutor near me,maths tutor near me, tuition near me, maths tuition, science tuition, English tuition, Hindi tuition, social science tuition, CBSE syllabus, class 10 syllabus, 2023-24 syllabus, CBSE Class 10 syllabus 2023-24, Class 10 board exam preparation, best tuition in Jaipur, maths tuition for Class 10, science tuition for Class 10, English tuition for Class 10, Hindi tuition for Class 10, social science tuition for Class 10, online tuition for Class 10, top tuition centers in Jaipur, CBSE exam tips, Class 10 study materials, CBSE sample papers, home tuition for Class 10 in Jaipur, Class 10 coaching near me, best tutors for Class 10, CBSE Class 10 updates, Class 10 tuition fees, tuition classes for Class 10, affordable tuition in Jaipur, Sarvgyat, a campaign by Learnosphere, is an innovative educational content sharing platform where teachers can earn by sharing educational materials. This platform allows educators to upload teaching materials online, including notes, presentations, and lesson plans, and make them available as high-quality educational resources for students and schools. With Sarvgyat, teachers can monetize content by reaching a broad audience, contributing to free educational resources for students and helping schools access valuable learning tools. Whether you're looking to share educational resources or discover online learning content, Sarvgyat is the ideal platform for both teachers and students. Sign up now to teach and earn online while supporting school resources with top-notch educational content",
      },
    ],
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <SessionWrapper>
        {children}
        </SessionWrapper></body>
    </html>
  );
}
