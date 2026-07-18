import json
import os

companies = [
    {
        "id": "infosys",
        "name": "Infosys",
        "logo": "https://upload.wikimedia.org/wikipedia/commons/9/95/Infosys_logo.svg",
        "color": "#0078D4",
        "overview": "Infosys is a global leader in next-generation digital services and consulting, enabling clients in more than 50 countries to navigate their digital transformation.",
        "about": {
            "history": "Founded in 1981 by N. R. Narayana Murthy and six engineers in Pune, India.",
            "headquarters": "Bengaluru, Karnataka, India",
            "industry": "IT Services, IT Consulting",
            "services": "Software development, maintenance, independent validation services, and enterprise applications.",
            "global_presence": "Operations in 50+ countries with massive delivery centers globally."
        },
        "eligibility": {
            "degrees": "B.E/B.Tech/M.E/M.Tech/MCA/M.Sc",
            "criteria": "60% or 6 CGPA in 10th, 12th, and Graduation.",
            "backlogs": "No active backlogs allowed at the time of joining."
        },
        "selection_process": ["Online Assessment (Aptitude & Logical)", "Pseudocode & Coding Round", "Technical Interview", "HR Interview"],
        "interview_rounds": [
            {"round": "Online Test", "details": "Focuses on quantitative aptitude, logical reasoning, and verbal ability. Time management is crucial here."},
            {"round": "Technical Round", "details": "Questions revolve around OOPs, DBMS, SQL, and the candidate's resume/projects."},
            {"round": "HR Round", "details": "Standard behavioral questions evaluating culture fit, flexibility to relocate, and communication skills."}
        ],
        "hr_questions": [
            "Tell me about yourself.", "Why Infosys?", "What are your strengths and weaknesses?", "Where do you see yourself in 5 years?", 
            "Are you willing to relocate?", "Explain a time you faced a challenge.", "How do you handle pressure?", 
            "What do you know about our CEO?", "Describe your final year project.", "Why should we hire you?", 
            "Are you flexible with night shifts?", "How do you handle conflict in a team?", "Who is your role model?", 
            "What is your greatest achievement?", "Do you have any questions for us?"
        ],
        "tech_questions": [
            "What are the four pillars of OOPs?", "Explain normalization in DBMS.", "Difference between TRUNCATE and DELETE in SQL.",
            "What is a virtual function in C++?", "Explain the concept of threading in Java.", "Write a SQL query to find the second highest salary.",
            "Difference between TCP and UDP.", "Explain Deadlock in OS.", "What are pointers in C/C++?", "How does garbage collection work in Java?",
            "Explain the OSI model.", "What is a primary key vs a unique key?", "Explain the difference between abstract class and interface.",
            "How do you reverse a string without using inbuilt functions?", "Explain your role in your listed projects."
        ],
        "aptitude_topics": ["Percentage", "Profit & Loss", "Time & Work", "Number System", "Logical Deduction", "Data Interpretation", "Syllogisms"],
        "skills": ["Java/Python/C++", "SQL", "OOPs Concepts", "Data Structures", "Communication Skills"],
        "tips": [
            "Focus heavily on basic OOPs and DBMS concepts.",
            "Practice easy-to-medium coding questions on arrays and strings.",
            "Keep your resume clean and be ready to explain every word on it.",
            "Communicate your thought process clearly during the technical interview."
        ],
        "salary": "₹3.6 LPA (System Engineer) - ₹9.5 LPA (Specialist Programmer)",
        "website": "https://www.infosys.com"
    },
    {
        "id": "microsoft",
        "name": "Microsoft",
        "logo": "https://upload.wikimedia.org/wikipedia/commons/4/44/Microsoft_logo.svg",
        "color": "#F25022",
        "overview": "Microsoft is a multinational technology corporation which produces computer software, consumer electronics, personal computers, and related services.",
        "about": {
            "history": "Founded in 1975 by Bill Gates and Paul Allen in Albuquerque, New Mexico.",
            "headquarters": "Redmond, Washington, U.S.",
            "industry": "Software, Consumer Electronics",
            "services": "Windows OS, Office 365, Azure Cloud Services, Xbox.",
            "global_presence": "Offices in over 190 countries worldwide."
        },
        "eligibility": {
            "degrees": "B.Tech/M.Tech/MS in Computer Science or related fields.",
            "criteria": "Minimum 7.0 CGPA (often 8.0+ preferred for on-campus).",
            "backlogs": "Strictly no active backlogs."
        },
        "selection_process": ["Online Coding Assessment", "Technical Interview Round 1", "Technical Interview Round 2", "System Design / Hiring Manager Round"],
        "interview_rounds": [
            {"round": "Online Coding", "details": "2-3 medium to hard Data Structures & Algorithms questions on platforms like Codility."},
            {"round": "Technical Rounds", "details": "Deep dive into problem-solving, Trees, Graphs, Dynamic Programming, and code optimization."},
            {"round": "AA/As-App Round", "details": "The 'As Appropriate' round focuses on system design (for experienced) and core cultural fit principles."}
        ],
        "hr_questions": [
            "Tell me about a time you failed.", "Why Microsoft?", "How do you stay updated with technology?", "Tell me about a time you disagreed with a manager.",
            "Describe a complex problem you solved.", "How do you prioritize tasks?", "What is your proudest technical achievement?",
            "How do you handle ambiguous requirements?", "Tell me about a time you learned a new technology quickly.", "Why should we hire you over others?",
            "Describe a time you showed leadership.", "How do you ensure your code is secure and accessible?", "What do you know about Azure?",
            "Tell me about a time you had to pivot your approach.", "Do you have any questions for me?"
        ],
        "tech_questions": [
            "Reverse a Linked List.", "Find the lowest common ancestor in a BST.", "Detect a cycle in a directed graph.",
            "Implement a LRU Cache.", "Design a URL shortener (System Design).", "Explain how indexing works in databases.",
            "Difference between Process and Thread.", "What happens when you type a URL in the browser?", "Explain virtual memory.",
            "Implement Dijkstra's Algorithm.", "Solve the Trapping Rain Water problem.", "How does a hash table resolve collisions?",
            "Explain the CAP theorem.", "Write code to perform a level-order traversal of a tree.", "Explain polymorphism with a real-world example."
        ],
        "aptitude_topics": ["Puzzles", "Algorithmic Complexity (Big O)", "Logical Reasoning", "Mathematical modeling"],
        "skills": ["Data Structures & Algorithms", "System Design", "C++/Java/C#", "Problem Solving", "Cloud Computing Basics"],
        "tips": [
            "Grind LeetCode medium and hard questions.",
            "Always talk aloud while coding to share your thought process.",
            "Think about edge cases and space/time complexity immediately.",
            "Show a growth mindset, reflecting Microsoft's core culture."
        ],
        "salary": "₹15 LPA - ₹45+ LPA (SDE I)",
        "website": "https://careers.microsoft.com"
    },
    {
        "id": "amazon",
        "name": "Amazon",
        "logo": "https://upload.wikimedia.org/wikipedia/commons/a/a9/Amazon_logo.svg",
        "color": "#FF9900",
        "overview": "Amazon is a vast multinational technology company focusing on e-commerce, cloud computing, digital streaming, and artificial intelligence.",
        "about": {
            "history": "Founded by Jeff Bezos in 1994 from his garage in Bellevue, Washington.",
            "headquarters": "Seattle, Washington, U.S.",
            "industry": "E-commerce, Cloud Computing (AWS), AI",
            "services": "Retail, AWS, Prime Video, Alexa, Consumer Electronics.",
            "global_presence": "World's largest online retailer with massive global infrastructure."
        },
        "eligibility": {
            "degrees": "B.E/B.Tech/M.E/M.Tech in CS/IT or related.",
            "criteria": "Generally 6.5 CGPA and above.",
            "backlogs": "No active backlogs."
        },
        "selection_process": ["Online Assessment (OA)", "Technical Interview 1", "Technical Interview 2", "Bar Raiser Round"],
        "interview_rounds": [
            {"round": "Online Assessment", "details": "Coding questions (usually 2) plus a behavioral/work-style assessment."},
            {"round": "Technical Rounds", "details": "Focus on DSA, particularly trees, graphs, and hash maps. Must write production-quality code on a whiteboard/document."},
            {"round": "Bar Raiser", "details": "Evaluates if the candidate raises the average bar of the team. Heavy focus on Amazon's 16 Leadership Principles."}
        ],
        "hr_questions": [
            "Tell me about a time you took a calculated risk.", "Describe a situation where you 'Disagreed and Committed'.",
            "Tell me about a time you invented a simpler solution.", "How do you handle tight deadlines?",
            "Give an example of when you had to dive deep into a problem.", "Tell me about a time you failed to meet expectations.",
            "Describe a time you received critical feedback.", "How do you earn trust in a new team?",
            "Tell me about a time you showed customer obsession.", "Describe a time you had to make a decision without all the data.",
            "Give an example of thinking big.", "Tell me about a time you had to deal with an underperforming teammate.",
            "How do you prioritize customer needs?", "Describe a time you delivered results despite roadblocks.", "Why Amazon?"
        ],
        "tech_questions": [
            "Two Sum problem.", "Merge K sorted lists.", "Number of Islands (Graph BFS/DFS).",
            "Design an Amazon Locker system.", "Explain how consistent hashing works.", "Serialize and Deserialize a Binary Tree.",
            "Find the median from a data stream.", "Explain the difference between SQL and NoSQL.", "How does AWS S3 ensure high availability?",
            "Design an elevator system (OOD).", "Implement a Trie.", "Word Ladder problem.",
            "Difference between a Mutex and a Semaphore.", "Explain RESTful APIs.", "How would you optimize a slow database query?"
        ],
        "aptitude_topics": ["Amazon Leadership Principles (Behavioral)", "Puzzles", "Data Analysis", "Logical Flow"],
        "skills": ["Advanced DSA", "Object-Oriented Design", "Amazon Leadership Principles", "System Architecture", "Java/Python/C++"],
        "tips": [
            "Format EVERY behavioral answer using the STAR method (Situation, Task, Action, Result).",
            "Memorize and embody the 16 Leadership Principles.",
            "Practice writing clean code without an IDE.",
            "Always clarify the question before jumping into the code."
        ],
        "salary": "₹14 LPA - ₹30+ LPA (SDE I)",
        "website": "https://www.amazon.jobs"
    },
    {
        "id": "accenture",
        "name": "Accenture",
        "logo": "https://upload.wikimedia.org/wikipedia/commons/c/cd/Accenture.svg",
        "color": "#A100FF",
        "overview": "Accenture is a global professional services company with leading capabilities in digital, cloud and security, offering strategy and consulting services.",
        "about": {
            "history": "Began as the business and technology consulting division of Arthur Andersen; became independent in 2001.",
            "headquarters": "Dublin, Ireland",
            "industry": "IT Services, Consulting",
            "services": "Strategy, Consulting, Digital, Technology, Operations.",
            "global_presence": "Serves clients in more than 120 countries."
        },
        "eligibility": {
            "degrees": "B.E/B.Tech/M.E/M.Tech/MCA",
            "criteria": "65% or 6.5 CGPA with no active backlogs.",
            "backlogs": "Maximum of 1 year gap allowed in education."
        },
        "selection_process": ["Cognitive & Technical Assessment", "Coding Assessment", "Communication Test", "Interview (Tech + HR)"],
        "interview_rounds": [
            {"round": "Cognitive & Tech Test", "details": "Aptitude, logical reasoning, english ability, and pseudocode/networking basics."},
            {"round": "Coding Test", "details": "2 coding questions, usually fundamental level (Arrays, Strings)."},
            {"round": "Interview", "details": "A combined technical and HR round. Focuses heavily on your final year project and basic HR questions."}
        ],
        "hr_questions": [
            "Tell me about yourself.", "Why Accenture?", "What do you know about our core values?", "Where do you see yourself in 3 years?",
            "Are you comfortable working across different domains?", "Tell me about a time you worked in a diverse team.", 
            "How do you handle conflict?", "What are your strengths?", "What is your greatest weakness?", 
            "Tell me about your final year project.", "Are you willing to relocate?", "Are you okay with working in shifts?",
            "Describe a time you demonstrated leadership.", "How do you manage stress?", "Any questions for us?"
        ],
        "tech_questions": [
            "What is Object-Oriented Programming?", "Difference between abstract class and interface in Java.", "Explain SDLC (Software Development Life Cycle).",
            "What is Agile methodology?", "Difference between DELETE and TRUNCATE.", "What is a JOIN in SQL? Explain types.",
            "What is Cloud Computing?", "Explain the basics of HTML/CSS.", "What is an API?", "Difference between array and linked list.",
            "What is polymorphism?", "How do you handle exceptions in Java/Python?", "What is a primary key?",
            "Explain your role in your project.", "What is normalization?"
        ],
        "aptitude_topics": ["Verbal Ability", "Numerical Reasoning", "Logical Reasoning", "Pseudocode", "Network Basics"],
        "skills": ["Basic Programming", "Communication Skills", "SQL", "Software Engineering Fundamentals", "Adaptability"],
        "tips": [
            "Excellent communication skills are highly valued here.",
            "Be prepared to explain your academic projects in detail.",
            "Brush up on basic pseudocode and CS fundamentals (OS, CN, DBMS).",
            "Research Accenture's recent digital and cloud initiatives."
        ],
        "salary": "₹4.5 LPA (ASE) - ₹6.5 LPA (FSE)",
        "website": "https://www.accenture.com"
    },
    {
        "id": "google",
        "name": "Google",
        "logo": "https://upload.wikimedia.org/wikipedia/commons/2/2f/Google_2015_logo.svg",
        "color": "#4285F4",
        "overview": "Google is a multinational technology company that specializes in Internet-related services and products, widely considered one of the Big Five tech companies.",
        "about": {
            "history": "Founded in 1998 by Larry Page and Sergey Brin while they were Ph.D. students at Stanford University.",
            "headquarters": "Mountain View, California (Googleplex)",
            "industry": "Internet, Cloud, AI, Hardware",
            "services": "Search, Ads, Cloud, Android, YouTube, Hardware.",
            "global_presence": "Ubiquitous global presence with massive data centers worldwide."
        },
        "eligibility": {
            "degrees": "BS/BA, MS or PhD in Computer Science or related fields.",
            "criteria": "No strict CGPA cutoff, but a strong academic and competitive programming record is preferred.",
            "backlogs": "No backlogs."
        },
        "selection_process": ["Online Assessment", "Technical Phone Screen", "Onsite Interviews (4-5 Rounds)", "Hiring Committee"],
        "interview_rounds": [
            {"round": "Phone Screen", "details": "A 45-minute Google Meet interview focusing purely on DSA and algorithmic problem solving."},
            {"round": "Onsite Technical", "details": "4 rounds of intense DSA, graph theory, DP, and system design (for senior roles)."},
            {"round": "Googleyness (Behavioral)", "details": "Evaluates how you navigate ambiguity, work in teams, and fit into Google's culture."}
        ],
        "hr_questions": [
            "Tell me about a time you faced ambiguity.", "Why Google?", "Describe a time you failed and what you learned.",
            "How do you handle a teammate who isn't pulling their weight?", "Tell me about a time you had to push back on a decision.",
            "What is the most difficult technical challenge you've faced?", "Describe your ideal work environment.",
            "Tell me about a time you stepped out of your comfort zone.", "How do you ensure diverse perspectives are heard?",
            "What does 'Googleyness' mean to you?", "How do you balance perfection with deadlines?", "Describe a time you taught yourself a new skill.",
            "Tell me about a time you improved a process.", "How do you handle conflicting feedback?", "What are you passionate about?"
        ],
        "tech_questions": [
            "Invert a Binary Tree.", "Find the longest palindromic substring.", "Design Google Maps (System Design).",
            "Implement a Trie.", "Word Break problem (Dynamic Programming).", "Topological Sort of a Graph.",
            "Design a distributed rate limiter.", "Explain MapReduce.", "How would you design a type-ahead search feature?",
            "Find the kth largest element in an array.", "Merge intervals.", "Explain Paxos or Raft consensus algorithms.",
            "Detect a cycle in a linked list.", "Design YouTube architecture.", "Serialize a graph."
        ],
        "aptitude_topics": ["Math puzzles (rarely)", "Advanced algorithmic analysis", "Probability and Statistics"],
        "skills": ["Advanced DSA", "System Design", "Scalability", "Googleyness", "C++/Java/Python/Go"],
        "tips": [
            "Speed and optimality of your code are critical. Always aim for the optimal O(N) or O(log N) solution.",
            "Communicate constantly with the interviewer.",
            "Prepare for the 'Googleyness' round by emphasizing collaboration and navigating ambiguity.",
            "Practice writing code on a blank Google Doc."
        ],
        "salary": "₹18 LPA - ₹50+ LPA (SWE II)",
        "website": "https://careers.google.com"
    },
    {
        "id": "tcs",
        "name": "Tata Consultancy Services (TCS)",
        "logo": "https://upload.wikimedia.org/wikipedia/commons/b/b1/Tata_Consultancy_Services_Logo.svg",
        "color": "#1A237E",
        "overview": "TCS is an Indian multinational information technology services and consulting company, part of the Tata Group, and one of the largest IT employers globally.",
        "about": {
            "history": "Founded in 1968 by a division of Tata Sons.",
            "headquarters": "Mumbai, Maharashtra, India",
            "industry": "IT Services, Consulting",
            "services": "IT services, consulting, business solutions, and outsourcing.",
            "global_presence": "Operates in 46 countries with over 600,000 employees."
        },
        "eligibility": {
            "degrees": "B.E/B.Tech/M.E/M.Tech/MCA/M.Sc",
            "criteria": "60% or 6.0 CGPA throughout academics.",
            "backlogs": "Maximum 1 active backlog allowed at the time of appearing for the exam."
        },
        "selection_process": ["TCS NQT (National Qualifier Test)", "Technical Interview", "Managerial Interview", "HR Interview"],
        "interview_rounds": [
            {"round": "TCS NQT", "details": "Comprises Numerical Ability, Verbal Ability, Reasoning Ability, Programming Logic, and 2 Coding questions."},
            {"round": "Technical Round", "details": "Focuses on basics of C/C++/Java, DBMS, SQL, and final year projects."},
            {"round": "HR/MR Round", "details": "Focuses on Tata ethics, willingness to relocate, bond agreements, and basic behavioral questions."}
        ],
        "hr_questions": [
            "Tell me about yourself.", "Why do you want to join TCS?", "What do you know about the Tata Group?", 
            "Are you willing to sign a bond?", "Are you willing to relocate to any part of India?", "What are your strengths and weaknesses?",
            "Where do you see yourself in 3 years?", "Tell me about your family background.", "How do you handle working in a team?",
            "What is your greatest achievement?", "Who is the CEO of TCS?", "Why should we hire you?", 
            "Are you comfortable with rotational shifts?", "What did you learn from your project?", "Do you have any questions?"
        ],
        "tech_questions": [
            "What are the features of OOP?", "Write a program for Fibonacci series.", "Explain the difference between C and C++.",
            "What is a dangling pointer?", "What is a primary key and foreign key?", "Write a SQL query to join two tables.",
            "What are DDL and DML commands?", "Difference between overloading and overriding.", "What is an array?", 
            "How is a Linked List different from an Array?", "What are the stages of SDLC?", "Explain inheritance in Java.",
            "What is a deadlock?", "Difference between Call by Value and Call by Reference.", "Explain your project architecture."
        ],
        "aptitude_topics": ["Time & Work", "Percentages", "Blood Relations", "Syllogisms", "Data Interpretation", "Reading Comprehension"],
        "skills": ["C/C++/Java", "SQL", "Basic Data Structures", "Aptitude", "Strong Ethics"],
        "tips": [
            "Speed is key in the NQT aptitude section.",
            "Be very clear on the fundamentals of at least one programming language (preferably C or Java).",
            "Know the basic history and values of the Tata Group.",
            "Be prepared to explain your project in simple terms."
        ],
        "salary": "₹3.36 LPA (Ninja) - ₹7.0 LPA (Digital) - ₹9.0 LPA (Prime)",
        "website": "https://www.tcs.com/careers"
    },
    {
        "id": "wipro",
        "name": "Wipro",
        "logo": "https://upload.wikimedia.org/wikipedia/commons/a/a0/Wipro_Primary_Logo_Color_RGB.svg",
        "color": "#00BFA5",
        "overview": "Wipro is a leading global information technology, consulting and business process services company, known for its strong commitment to sustainability.",
        "about": {
            "history": "Incorporated in 1945 by M.H. Hasham Premji as 'Western India Palm Refined Oil Limited', later pivoted to IT under Azim Premji.",
            "headquarters": "Bengaluru, Karnataka, India",
            "industry": "IT Services, Consulting",
            "services": "Cloud computing, cyber security, digital transformation, artificial intelligence.",
            "global_presence": "Serves clients across 6 continents."
        },
        "eligibility": {
            "degrees": "B.E/B.Tech (CS/IT/Circuital branches prefered)",
            "criteria": "60% or 6.0 CGPA in 10th, 12th, and UG.",
            "backlogs": "Maximum of 1 active backlog allowed during the assessment."
        },
        "selection_process": ["Online Assessment", "Essay Writing", "Technical Interview", "HR Interview"],
        "interview_rounds": [
            {"round": "Online Assessment", "details": "Aptitude (Quant, Logical, Verbal), Written Communication (Essay), and Coding (2 programs)."},
            {"round": "Technical Round", "details": "Focus on Java/C++, SQL queries, basics of Web Technologies, and resume validation."},
            {"round": "HR Round", "details": "General behavioral questions, service agreement discussion, and location preferences."}
        ],
        "hr_questions": [
            "Tell me about yourself.", "Why Wipro?", "What do you know about Azim Premji?", "Where do you see yourself in 5 years?",
            "Are you ready to sign a service agreement?", "Are you willing to relocate?", "Tell me about a challenge you overcame.",
            "What is your biggest weakness?", "How do you handle stress?", "Why should we hire you?",
            "Describe your final year project.", "Are you a team player?", "What are your hobbies?",
            "How do you stay updated with new technologies?", "Any questions for us?"
        ],
        "tech_questions": [
            "What is polymorphism?", "Difference between List and Set in Java.", "Write a program to check if a string is a palindrome.",
            "What is normalization in DBMS?", "Difference between WHERE and HAVING clause.", "What is an index in a database?",
            "Explain the concept of inheritance.", "What is a constructer?", "Difference between stack and queue.",
            "Write a SQL query to find the 3rd highest salary.", "What is Agile?", "Explain Cloud Computing basics.",
            "Difference between HTTP and HTTPS.", "What are the access modifiers in Java?", "Explain SDLC."
        ],
        "aptitude_topics": ["Time & Distance", "Profit & Loss", "Essay Writing", "Coding basics", "Logical Reasoning"],
        "skills": ["Java/C++", "SQL", "Web Basics", "Essay Writing/English", "Problem Solving"],
        "tips": [
            "The Essay Writing section is unique to Wipro; practice writing structured, grammatically correct essays of 200-400 words.",
            "Focus on string and array manipulation for the coding round.",
            "Be thorough with your resume and project.",
            "Read up on Wipro's recent acquisitions and focus areas (like Cloud and AI)."
        ],
        "salary": "₹3.5 LPA (Elite) - ₹6.5 LPA (Turbo)",
        "website": "https://careers.wipro.com"
    },
    {
        "id": "cognizant",
        "name": "Cognizant",
        "logo": "https://upload.wikimedia.org/wikipedia/commons/4/43/Cognizant_logo_2022.svg",
        "color": "#000080",
        "overview": "Cognizant is an American multinational information technology services and consulting company, helping clients modernize technology and reimagine processes.",
        "about": {
            "history": "Founded in 1994 as an in-house technology unit of Dun & Bradstreet, became independent in 1996.",
            "headquarters": "Teaneck, New Jersey, U.S.",
            "industry": "IT Services, Consulting",
            "services": "Digital, Technology, Consulting, and Operations services.",
            "global_presence": "Major delivery centers in India, US, and Europe."
        },
        "eligibility": {
            "degrees": "B.E/B.Tech/M.E/M.Tech/MCA",
            "criteria": "60% or 6.0 CGPA throughout.",
            "backlogs": "No active backlogs."
        },
        "selection_process": ["Aptitude & Coding Test (AMCAT)", "Technical Interview", "HR Interview"],
        "interview_rounds": [
            {"round": "Online Test", "details": "Hosted on AMCAT/Aspiring Minds. Covers Automata Fix (Debugging), Quants, Logical, and English."},
            {"round": "Technical Round", "details": "Focuses heavily on DBMS, SQL, and writing small code snippets during the interview."},
            {"round": "HR Round", "details": "Standard HR questions to assess communication, flexibility, and cultural fit."}
        ],
        "hr_questions": [
            "Tell me about yourself.", "Why do you want to join Cognizant?", "What do you know about our company?",
            "Are you willing to work in any technology?", "Are you willing to relocate?", "What is your biggest strength?",
            "Tell me about a time you worked under pressure.", "Describe your project.", "Why should we hire you?",
            "Where do you see yourself in 3 years?", "What are your salary expectations?", "Are you comfortable with night shifts?",
            "How do you resolve team conflicts?", "What is your biggest achievement?", "Any questions?"
        ],
        "tech_questions": [
            "Write a program to reverse a string.", "Explain the difference between clustered and non-clustered index.", "What is a View in SQL?",
            "Difference between Truncate, Delete, and Drop.", "What are the four principles of OOP?", "Explain the concept of a virtual function.",
            "What is a pointer?", "Write a query to find duplicate rows in a table.", "What is the difference between TCP and UDP?",
            "Explain the software development life cycle.", "What is a Linked List?", "How do you swap two numbers without a third variable?",
            "What is an interface in Java?", "Difference between overloading and overriding.", "Explain Agile methodology."
        ],
        "aptitude_topics": ["Code Debugging (Automata Fix)", "Quantitative Aptitude", "Logical Reasoning", "Data Interpretation"],
        "skills": ["Code Debugging", "SQL/DBMS", "Java/C++", "Communication Skills", "Adaptability"],
        "tips": [
            "Practice 'Automata Fix' type questions on AMCAT, which involves fixing syntax and logical errors in existing code.",
            "Your database (DBMS and SQL) fundamentals must be very strong.",
            "Be prepared to write code on paper or a shared screen during the technical interview.",
            "Show flexibility regarding technologies and work locations."
        ],
        "salary": "₹4.0 LPA (GenC) - ₹6.75 LPA (GenC Next) - ₹8.0 LPA (GenC Pro)",
        "website": "https://careers.cognizant.com"
    },
    {
        "id": "capgemini",
        "name": "Capgemini",
        "logo": "https://upload.wikimedia.org/wikipedia/commons/9/9d/Capgemini_201x_logo.svg",
        "color": "#0070AD",
        "overview": "Capgemini is a French multinational information technology services and consulting company, driven by the conviction that the business value of technology comes from and through people.",
        "about": {
            "history": "Founded in 1967 by Serge Kampf in Grenoble, France.",
            "headquarters": "Paris, France",
            "industry": "IT Services, Consulting",
            "services": "Technology Services, Outsourcing, Management Consulting.",
            "global_presence": "Operations in over 50 countries."
        },
        "eligibility": {
            "degrees": "B.E/B.Tech/MCA",
            "criteria": "60% or 6.0 CGPA in 10th, 12th, and Graduation.",
            "backlogs": "No active backlogs at the time of the hiring process."
        },
        "selection_process": ["Pseudocode & English Test", "Game-based Aptitude Test", "Technical Interview", "HR Interview"],
        "interview_rounds": [
            {"round": "Online Assessment", "details": "Includes Pseudocode round (very important), English communication, and a unique Game-based aptitude test."},
            {"round": "Technical Round", "details": "Focus on core CS subjects, pseudocode explanation, and project discussion."},
            {"round": "HR Round", "details": "Evaluates communication skills, adaptability, and culture fit."}
        ],
        "hr_questions": [
            "Introduce yourself.", "Why Capgemini?", "What do you know about our core values?", "Are you willing to relocate?",
            "Tell me about your final year project.", "What is your biggest weakness and how do you overcome it?",
            "Describe a time you handled a difficult situation.", "Are you a team player or an individual contributor?",
            "Where do you see yourself in 5 years?", "Why should we hire you?", "Are you willing to sign a bond?",
            "How do you handle criticism?", "What is your greatest strength?", "Are you flexible with shift timings?",
            "Do you have any questions for me?"
        ],
        "tech_questions": [
            "Explain the logic behind the pseudocode you wrote in the exam.", "What is data abstraction?", "Difference between Array and Linked List.",
            "What is a primary key?", "Write a SQL query for inner join.", "Explain the OSI model layers.",
            "What is a thread?", "Difference between Java and C++.", "What is a constructor?",
            "Explain exception handling in Java.", "What is normalization?", "How do you reverse an array?",
            "What is an IP address?", "Explain SDLC models.", "What is the difference between a stack and a queue?"
        ],
        "aptitude_topics": ["Pseudocode", "Game-based Aptitude", "Verbal Ability", "Data Sufficiency"],
        "skills": ["Pseudocode Analysis", "Core CS Fundamentals", "C/C++/Java", "Communication", "Logical Thinking"],
        "tips": [
            "Focus heavily on practicing Pseudocode questions (predicting outputs of C/C++ loops and logic).",
            "The Game-based aptitude test assesses spatial reasoning and quick decision-making; stay calm and focused.",
            "Good English communication skills are a strong deciding factor for Capgemini.",
            "Understand basic concepts of Data Structures well."
        ],
        "salary": "₹4.0 LPA (Analyst) - ₹7.5 LPA (Senior Analyst)",
        "website": "https://www.capgemini.com/careers"
    },
    {
        "id": "deloitte",
        "name": "Deloitte",
        "logo": "https://upload.wikimedia.org/wikipedia/commons/5/56/Deloitte.svg",
        "color": "#86BC25",
        "overview": "Deloitte is a leading global provider of audit and assurance, consulting, financial advisory, risk advisory, tax, and related services, belonging to the 'Big Four' accounting organizations.",
        "about": {
            "history": "Founded in 1845 by William Welch Deloitte in London.",
            "headquarters": "London, UK (Global) / New York (US)",
            "industry": "Professional Services, Consulting",
            "services": "Audit, Consulting, Advisory, Tax.",
            "global_presence": "Operates in over 150 countries."
        },
        "eligibility": {
            "degrees": "B.E/B.Tech/MCA (CS/IT/ECE)",
            "criteria": "60% or 6.5 CGPA throughout academics.",
            "backlogs": "No active backlogs allowed."
        },
        "selection_process": ["AMCAT Online Test", "Versant / Communication Test", "Technical + HR Interview"],
        "interview_rounds": [
            {"round": "Online Assessment", "details": "Quantitative, Logical, Verbal, and 2 Coding questions (often medium difficulty on arrays/strings)."},
            {"round": "Versant Test", "details": "An automated spoken English test assessing pronunciation, fluency, and sentence mastery."},
            {"round": "Personal Interview", "details": "A combined Tech and HR round. Heavy focus on resume, projects, SQL, and scenario-based behavioral questions."}
        ],
        "hr_questions": [
            "Tell me about yourself.", "Why Deloitte?", "What do you know about the 'Big Four'?", "Describe a situation where you showed leadership.",
            "How do you handle conflict in a team?", "Tell me about a time you worked with a difficult person.",
            "Where do you see yourself in 5 years?", "What are your strengths and weaknesses?", "Describe your final year project.",
            "Why should we hire you over other candidates?", "Are you willing to travel for work?", "How do you manage your time under pressure?",
            "Tell me about a time you made a mistake.", "What motivates you?", "Any questions for us?"
        ],
        "tech_questions": [
            "What is normalization and why is it used?", "Difference between a Primary Key and a Unique Key.", "Write a complex SQL query using JOIN and GROUP BY.",
            "Explain Object-Oriented Programming concepts.", "What is the difference between Abstract Class and Interface?", "Explain the concept of Agile.",
            "How do you handle exceptions in code?", "What is Cloud Computing? (Basic AWS/Azure concepts)", "Difference between an Array and a Linked List.",
            "Explain your project's architecture.", "What is a Foreign Key?", "Write a program to find if a string is a palindrome.",
            "What is SDLC?", "Explain the difference between TCP and UDP.", "How do you optimize a database query?"
        ],
        "aptitude_topics": ["Quantitative Aptitude", "Logical Reasoning", "Verbal Ability", "Spoken English (Versant)"],
        "skills": ["SQL/DBMS", "Strong Communication", "Consulting Mindset", "Java/C++/Python", "Problem Solving"],
        "tips": [
            "Deloitte places a very high premium on communication skills and presentation (Versant test is a strict elimination round).",
            "Have a deep understanding of databases and SQL, as consulting roles often involve data.",
            "Dress formally and exude professionalism during the interview.",
            "Use the STAR method for all behavioral questions."
        ],
        "salary": "₹4.5 LPA (Analyst) - ₹7.6 LPA (Business Technology Analyst)",
        "website": "https://www2.deloitte.com/global/en/careers"
    }
]

# Write to js file
js_content = f"export const companiesData = {json.dumps(companies, indent=4)};\n"
with open("frontend/src/data/companies.js", "w", encoding="utf-8") as f:
    f.write(js_content)

print("Generated frontend/src/data/companies.js successfully.")
