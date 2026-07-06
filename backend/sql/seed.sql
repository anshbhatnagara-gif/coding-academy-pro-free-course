-- CodeNest Free Academy — Seed Data (v1.0)
-- Run AFTER schema.sql
USE codenest_free_academy;

-- =============================================
-- COURSES (10 Free Courses)
-- =============================================
INSERT INTO courses (title, description, category, difficulty, duration, thumbnail, instructor) VALUES
(
  'HTML Basics',
  'Learn the foundation of the web! Master HTML5 tags, semantic elements, forms, tables, and page structure. Build your first webpage from scratch.',
  'Web Development',
  'Beginner',
  '4 hours',
  'https://images.unsplash.com/photo-1621839673705-6617adf9e890?auto=format&fit=crop&w=600&q=80',
  'Ansh Bhatnagar'
),
(
  'CSS Basics',
  'Style your websites beautifully! Learn CSS selectors, box model, Flexbox, Grid, animations, and responsive design for all screen sizes.',
  'Web Development',
  'Beginner',
  '5 hours',
  'https://images.unsplash.com/photo-1507238691740-187a5b1d37b8?auto=format&fit=crop&w=600&q=80',
  'Ansh Bhatnagar'
),
(
  'JavaScript Basics',
  'Make your websites interactive! Learn variables, functions, DOM manipulation, events, arrays, objects, and modern ES6+ JavaScript syntax.',
  'Web Development',
  'Beginner',
  '8 hours',
  'https://images.unsplash.com/photo-1579468118864-1b9ea3c0db4a?auto=format&fit=crop&w=600&q=80',
  'Ansh Bhatnagar'
),
(
  'React Basics',
  'Build modern single-page applications! Learn React components, hooks, state management, props, React Router, and useEffect in detail.',
  'Frontend',
  'Intermediate',
  '10 hours',
  'https://images.unsplash.com/photo-1633356122544-f134324a6cee?auto=format&fit=crop&w=600&q=80',
  'Ansh Bhatnagar'
),
(
  'Node.js Basics',
  'Build powerful backend applications with JavaScript! Learn Node.js modules, Express.js, REST APIs, middleware, and file system operations.',
  'Backend',
  'Intermediate',
  '8 hours',
  'https://images.unsplash.com/photo-1566837945700-30057527ade0?auto=format&fit=crop&w=600&q=80',
  'Ansh Bhatnagar'
),
(
  'MySQL Basics',
  'Master relational databases! Learn SQL queries, database design, joins, indexes, stored procedures, and how to connect MySQL with Node.js.',
  'Database',
  'Beginner',
  '6 hours',
  'https://images.unsplash.com/photo-1607799279861-4dd421887fb3?auto=format&fit=crop&w=600&q=80',
  'Ansh Bhatnagar'
),
(
  'Git & GitHub',
  'Master version control! Learn Git commands, branching strategies, merge conflicts, pull requests, GitHub workflows, and collaborative coding.',
  'Tools',
  'Beginner',
  '3 hours',
  'https://images.unsplash.com/photo-1618401471353-b98afee0b2eb?auto=format&fit=crop&w=600&q=80',
  'Ansh Bhatnagar'
),
(
  'C Programming Basics',
  'Learn the mother of all programming languages! Master variables, data types, pointers, arrays, functions, structs, and memory management in C.',
  'Programming',
  'Beginner',
  '7 hours',
  'https://images.unsplash.com/photo-1517077304055-6e89abbf09b0?auto=format&fit=crop&w=600&q=80',
  'Ansh Bhatnagar'
),
(
  'Python Basics',
  'Start your programming journey with Python! Learn syntax, data structures, functions, file handling, OOP concepts, and popular Python libraries.',
  'Programming',
  'Beginner',
  '7 hours',
  'https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?auto=format&fit=crop&w=600&q=80',
  'Ansh Bhatnagar'
),
(
  'DSA Basics',
  'Crack coding interviews! Learn arrays, linked lists, stacks, queues, trees, graphs, sorting algorithms, and dynamic programming with real examples.',
  'Computer Science',
  'Intermediate',
  '12 hours',
  'https://images.unsplash.com/photo-1516116216624-53e697fedbea?auto=format&fit=crop&w=600&q=80',
  'Ansh Bhatnagar'
);

-- =============================================
-- MODULES for HTML Basics (course_id = 1)
-- =============================================
INSERT INTO modules (course_id, title, order_index, duration) VALUES
(1, 'Introduction to HTML & Web Basics', 1, '20 min'),
(1, 'HTML Tags & Elements', 2, '25 min'),
(1, 'Headings, Paragraphs & Text Formatting', 3, '20 min'),
(1, 'Links, Images & Media', 4, '25 min'),
(1, 'HTML Forms & Input Fields', 5, '30 min'),
(1, 'Tables & Lists', 6, '20 min'),
(1, 'Semantic HTML5 Elements', 7, '25 min'),
(1, 'Building Your First Complete Webpage', 8, '35 min');

-- MODULES for CSS Basics (course_id = 2)
INSERT INTO modules (course_id, title, order_index, duration) VALUES
(2, 'Introduction to CSS & Selectors', 1, '20 min'),
(2, 'Colors, Fonts & Text Styling', 2, '25 min'),
(2, 'Box Model: Margin, Padding, Border', 3, '25 min'),
(2, 'CSS Flexbox Layout', 4, '35 min'),
(2, 'CSS Grid System', 5, '35 min'),
(2, 'Responsive Design & Media Queries', 6, '30 min'),
(2, 'CSS Animations & Transitions', 7, '25 min'),
(2, 'Building a Responsive Landing Page', 8, '40 min');

-- MODULES for JavaScript Basics (course_id = 3)
INSERT INTO modules (course_id, title, order_index, duration) VALUES
(3, 'Introduction to JavaScript', 1, '20 min'),
(3, 'Variables, Data Types & Operators', 2, '25 min'),
(3, 'Functions & Scope', 3, '30 min'),
(3, 'Arrays & Array Methods', 4, '30 min'),
(3, 'Objects & JSON', 5, '25 min'),
(3, 'DOM Manipulation', 6, '35 min'),
(3, 'Events & Event Listeners', 7, '30 min'),
(3, 'Async JavaScript, Promises & Fetch API', 8, '40 min'),
(3, 'ES6+ Modern JavaScript Features', 9, '35 min'),
(3, 'Building an Interactive Web App', 10, '45 min');

-- MODULES for React Basics (course_id = 4)
INSERT INTO modules (course_id, title, order_index, duration) VALUES
(4, 'Introduction to React & Vite Setup', 1, '25 min'),
(4, 'JSX & Component Basics', 2, '30 min'),
(4, 'Props & Component Communication', 3, '30 min'),
(4, 'useState Hook & State Management', 4, '35 min'),
(4, 'useEffect Hook & Lifecycle', 5, '35 min'),
(4, 'React Router & Navigation', 6, '40 min'),
(4, 'Fetching Data from APIs in React', 7, '35 min'),
(4, 'Building a Full React Application', 8, '50 min');

-- MODULES for Node.js Basics (course_id = 5)
INSERT INTO modules (course_id, title, order_index, duration) VALUES
(5, 'Introduction to Node.js & npm', 1, '20 min'),
(5, 'Modules & CommonJS', 2, '25 min'),
(5, 'File System & Streams', 3, '30 min'),
(5, 'Introduction to Express.js', 4, '30 min'),
(5, 'REST API Design & Routes', 5, '35 min'),
(5, 'Middleware & Error Handling', 6, '30 min'),
(5, 'JWT Authentication in Express', 7, '40 min'),
(5, 'Building a REST API from Scratch', 8, '45 min');

-- MODULES for MySQL Basics (course_id = 6)
INSERT INTO modules (course_id, title, order_index, duration) VALUES
(6, 'Introduction to Databases & SQL', 1, '20 min'),
(6, 'Creating Databases & Tables', 2, '25 min'),
(6, 'INSERT, SELECT, UPDATE, DELETE', 3, '30 min'),
(6, 'WHERE Clauses & Filtering', 4, '25 min'),
(6, 'JOINs & Relationships', 5, '35 min'),
(6, 'Indexes & Query Optimization', 6, '30 min'),
(6, 'Connecting MySQL with Node.js', 7, '35 min');

-- MODULES for Git & GitHub (course_id = 7)
INSERT INTO modules (course_id, title, order_index, duration) VALUES
(7, 'Introduction to Version Control & Git', 1, '20 min'),
(7, 'Git Init, Add, Commit', 2, '25 min'),
(7, 'Branches & Merging', 3, '30 min'),
(7, 'GitHub: Push, Pull, Clone', 4, '25 min'),
(7, 'Pull Requests & Collaboration', 5, '30 min'),
(7, 'Git Workflow Best Practices', 6, '20 min');

-- MODULES for C Programming (course_id = 8)
INSERT INTO modules (course_id, title, order_index, duration) VALUES
(8, 'Introduction to C & Setup', 1, '20 min'),
(8, 'Variables, Data Types & Operators', 2, '25 min'),
(8, 'Conditions & Loops', 3, '30 min'),
(8, 'Functions in C', 4, '30 min'),
(8, 'Arrays & Strings', 5, '35 min'),
(8, 'Pointers & Memory Management', 6, '40 min'),
(8, 'Structures & Unions', 7, '30 min'),
(8, 'File Handling in C', 8, '30 min');

-- MODULES for Python Basics (course_id = 9)
INSERT INTO modules (course_id, title, order_index, duration) VALUES
(9, 'Introduction to Python & Setup', 1, '20 min'),
(9, 'Variables, Data Types & Operators', 2, '25 min'),
(9, 'Conditions & Loops', 3, '25 min'),
(9, 'Functions & Modules', 4, '30 min'),
(9, 'Lists, Tuples, Sets & Dicts', 5, '35 min'),
(9, 'File Handling & Error Handling', 6, '30 min'),
(9, 'Object-Oriented Python (OOP)', 7, '35 min'),
(9, 'Python Libraries Overview', 8, '25 min');

-- MODULES for DSA Basics (course_id = 10)
INSERT INTO modules (course_id, title, order_index, duration) VALUES
(10, 'Introduction to DSA & Big-O Notation', 1, '25 min'),
(10, 'Arrays & Strings', 2, '30 min'),
(10, 'Linked Lists', 3, '35 min'),
(10, 'Stacks & Queues', 4, '30 min'),
(10, 'Recursion & Backtracking', 5, '35 min'),
(10, 'Trees & Binary Search Trees', 6, '40 min'),
(10, 'Sorting Algorithms', 7, '40 min'),
(10, 'Searching Algorithms & Hashing', 8, '35 min'),
(10, 'Dynamic Programming Basics', 9, '45 min'),
(10, 'Graphs & Graph Traversal', 10, '40 min');
