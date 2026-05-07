const questions = [
    // Computer Science (Questions 1-25)
    {
        category: "Computer Science",
        question: "What does CPU stand for?",
        options: ["Central Program Unit", "Central Processing Unit", "Computer Personal Unit", "Control Processing Unit"],
        correct: "b"
    },
    {
        category: "Computer Science",
        question: "Which is a high-level programming language?",
        options: ["Assembly", "Machine code", "Python", "Binary"],
        correct: "c"
    },
    {
        category: "Computer Science",
        question: "What is RAM used for?",
        options: ["Permanent storage", "Temporary storage", "Program execution", "Data backup"],
        correct: "b"
    },
    {
        category: "Computer Science",
        question: "Which is NOT a programming paradigm?",
        options: ["Procedural", "Object-oriented", "Functional", "Graphical"],
        correct: "d"
    },
    {
        category: "Computer Science",
        question: "What does HTML stand for?",
        options: ["HyperText Markup Language", "HighText Machine Language", "HyperTransfer Markup Language", "HomeTool Markup Language"],
        correct: "a"
    },
    {
        category: "Computer Science",
        question: "Which data structure uses LIFO principle?",
        options: ["Queue", "Stack", "Array", "Linked List"],
        correct: "b"
    },
    {
        category: "Computer Science",
        question: "What is the time complexity of binary search?",
        options: ["O(n)", "O(log n)", "O(n²)", "O(1)"],
        correct: "b"
    },
    {
        category: "Computer Science",
        question: "Which is a non-linear data structure?",
        options: ["Array", "Linked List", "Stack", "Tree"],
        correct: "d"
    },
    {
        category: "Computer Science",
        question: "What does SQL stand for?",
        options: ["Structured Query Language", "Simple Query Language", "Standard Query Language", "System Query Language"],
        correct: "a"
    },
    {
        category: "Computer Science",
        question: "Which sorting algorithm is stable?",
        options: ["Quick Sort", "Heap Sort", "Merge Sort", "Selection Sort"],
        correct: "c"
    },
    {
        category: "Computer Science",
        question: "What is the purpose of an operating system?",
        options: ["Run applications", "Manage hardware", "Store data", "Connect internet"],
        correct: "b"
    },
    {
        category: "Computer Science",
        question: "Which protocol is used for web browsing?",
        options: ["FTP", "SMTP", "HTTP", "TCP"],
        correct: "c"
    },
    {
        category: "Computer Science",
        question: "What is a variable?",
        options: ["Constant value", "Named storage location", "Function name", "Class name"],
        correct: "b"
    },
    {
        category: "Computer Science",
        question: "Which is a relational database?",
        options: ["MongoDB", "Redis", "MySQL", "Cassandra"],
        correct: "c"
    },
    {
        category: "Computer Science",
        question: "What does API stand for?",
        options: ["Application Programming Interface", "Advanced Program Interface", "Application Process Interface", "Automated Programming Interface"],
        correct: "a"
    },
    {
        category: "Computer Science",
        question: "Which is a loop construct?",
        options: ["if-else", "for", "switch", "while"],
        correct: "d"
    },
    {
        category: "Computer Science",
        question: "What is cloud computing?",
        options: ["Local storage", "Internet-based computing", "Hardware maintenance", "Software installation"],
        correct: "b"
    },
    {
        category: "Computer Science",
        question: "Which is NOT a type of memory?",
        options: ["RAM", "ROM", "Cache", "Hard Disk"],
        correct: "d"
    },
    {
        category: "Computer Science",
        question: "What is recursion?",
        options: ["Loop iteration", "Function calling itself", "Array processing", "Object creation"],
        correct: "b"
    },
    {
        category: "Computer Science",
        question: "Which language is used for Android development?",
        options: ["C++", "Java/Kotlin", "Python", "Ruby"],
        correct: "b"
    },
    {
        category: "Computer Science",
        question: "What is Big O notation?",
        options: ["Memory usage", "Time complexity", "Space complexity", "Code length"],
        correct: "b"
    },
    {
        category: "Computer Science",
        question: "Which is a version control system?",
        options: ["Docker", "Git", "Jenkins", "Maven"],
        correct: "b"
    },
    {
        category: "Computer Science",
        question: "What does JSON stand for?",
        options: ["JavaScript Object Notation", "Just Simple Object Notation", "Java Standard Object Notation", "JSON Standard Object Notation"],
        correct: "a"
    },
    {
        category: "Computer Science",
        question: "Which is a machine learning algorithm?",
        options: ["Bubble Sort", "Linear Regression", "Binary Search", "Hash Table"],
        correct: "b"
    },
    {
        category: "Computer Science",
        question: "What is cybersecurity?",
        options: ["Hardware protection", "Data protection", "Software development", "Network design"],
        correct: "b"
    },

    // Reasoning (Questions 26-50)
    {
        category: "Reasoning",
        question: "If A > B and B > C, then:",
        options: ["A > C", "C > A", "A = C", "Cannot determine"],
        correct: "a"
    },
    {
        category: "Reasoning",
        question: "Complete: 2, 4, 8, 16, __?",
        options: ["20", "24", "32", "64"],
        correct: "c"
    },
    {
        category: "Reasoning",
        question: "Odd one out: Cat, Dog, Tiger, Eagle",
        options: ["Cat", "Dog", "Tiger", "Eagle"],
        correct: "d"
    },
    {
        category: "Reasoning",
        question: "All pens are books. Some books are red. Then:",
        options: ["All pens are red", "Some pens are red", "No pens are red", "Cannot determine"],
        correct: "d"
    },
    {
        category: "Reasoning",
        question: "Next in series: 1, 4, 9, 16, __?",
        options: ["20", "25", "30", "36"],
        correct: "b"
    },
    {
        category: "Reasoning",
        question: "Odd one: Run, Jump, Swim, Car",
        options: ["Run", "Jump", "Swim", "Car"],
        correct: "d"
    },
    {
        category: "Reasoning",
        question: "If + = ×, - = ÷, then 10 + 2 - 5 = ?",
        options: ["14", "15", "16", "17"],
        correct: "a"
    },
    {
        category: "Reasoning",
        question: "Complete: 5, 10, 15, 20, __?",
        options: ["22", "25", "30", "35"],
        correct: "b"
    },
    {
        category: "Reasoning",
        question: "Odd one: Circle, Square, Triangle, Box",
        options: ["Circle", "Square", "Triangle", "Box"],
        correct: "d"
    },
    {
        category: "Reasoning",
        question: "Monday=1, Tuesday=2, then Sunday=?",
        options: ["0", "6", "7", "8"],
        correct: "c"
    },
    {
        category: "Reasoning",
        question: "Doctor : Hospital :: Teacher : ?",
        options: ["Book", "Student", "School", "Pen"],
        correct: "c"
    },
    {
        category: "Reasoning",
        question: "Odd number: 4, 9, 16, 25, 36",
        options: ["4", "9", "16", "25"],
        correct: "b"
    },
    {
        category: "Reasoning",
        question: "A is brother of B, B is sister of C, then A to C?",
        options: ["Brother", "Sister", "Father", "Uncle"],
        correct: "a"
    },
    {
        category: "Reasoning",
        question: "Odd one: 2, 3, 5, 7, 11",
        options: ["2", "3", "5", "7"],
        correct: "a"
    },
    {
        category: "Reasoning",
        question: "Next: A, C, E, G, __?",
        options: ["H", "I", "J", "K"],
        correct: "b"
    },
    {
        category: "Reasoning",
        question: "Some birds fly. All eagles are birds. Then:",
        options: ["All eagles fly", "Some eagles fly", "No eagles fly", "Cannot determine"],
        correct: "d"
    },
    {
        category: "Reasoning",
        question: "Complete: 3, 6, 9, 12, __?",
        options: ["13", "14", "15", "16"],
        correct: "c"
    },
    {
        category: "Reasoning",
        question: "Odd one: Pen, Pencil, Book, Eraser",
        options: ["Pen", "Pencil", "Book", "Eraser"],
        correct: "c"
    },
    {
        category: "Reasoning",
        question: "If 3=9, 4=16, 5=25, then 6=?",
        options: ["30", "32", "36", "42"],
        correct: "c"
    },
    {
        category: "Reasoning",
        question: "Complete: 1, 8, 27, 64, __?",
        options: ["100", "121", "125", "128"],
        correct: "c"
    },
    {
        category: "Reasoning",
        question: "Odd month: Feb, April, June, Dec",
        options: ["Feb", "April", "June", "Dec"],
        correct: "a"
    },
    {
        category: "Reasoning",
        question: "If A+B=12, B+C=15, then A+C=?",
        options: ["24", "25", "27", "Cannot determine"],
        correct: "d"
    },
    {
        category: "Reasoning",
        question: "Complete: O, T, T, F, F, S, __?",
        options: ["E", "S", "T", "N"],
        correct: "a"
    },
    {
        category: "Reasoning",
        question: "Odd square: 121, 144, 169, 196",
        options: ["121", "144", "169", "196"],
        correct: "a"
    },
    {
        category: "Reasoning",
        question: "Father of father is:",
        options: ["Son", "Grandfather", "Brother", "Uncle"],
        correct: "b"
    },

    // Math (Questions 51-75)
    {
        category: "Math",
        question: "What is 25% of 400?",
        options: ["75", "80", "100", "125"],
        correct: "c"
    },
    {
        category: "Math",
        question: "If 2x + 3 = 11, then x = ?",
        options: ["3", "4", "5", "6"],
        correct: "b"
    },
    {
        category: "Math",
        question: "Area of circle (r=7, π=22/7)?",
        options: ["144", "147", "150", "154"],
        correct: "d"
    },
    {
        category: "Math",
        question: "√144 = ?",
        options: ["10", "11", "12", "13"],
        correct: "c"
    },
    {
        category: "Math",
        question: "20% of 150 = ?",
        options: ["25", "28", "30", "35"],
        correct: "c"
    },
    {
        category: "Math",
        question: "If x - y = 3, x + y = 11, then x = ?",
        options: ["5", "6", "7", "8"],
        correct: "c"
    },
    {
        category: "Math",
        question: "Perimeter of square (side=6)?",
        options: ["18", "20", "24", "28"],
        correct: "c"
    },
    {
        category: "Math",
        question: "15 × 4 = ?",
        options: ["50", "55", "60", "65"],
        correct: "c"
    },
    {
        category: "Math",
        question: "Average of 10, 20, 30?",
        options: ["15", "18", "20", "25"],
        correct: "c"
    },
    {
        category: "Math",
        question: "If 4x = 28, then x = ?",
        options: ["6", "7", "8", "9"],
        correct: "b"
    },
    {
        category: "Math",
        question: "30% of 200 = ?",
        options: ["50", "55", "60", "65"],
        correct: "c"
    },
    {
        category: "Math",
        question: "Triangle sides 5,12,13 is:",
        options: ["Acute", "Obtuse", "Right", "Isosceles"],
        correct: "c"
    },
    {
        category: "Math",
        question: "2³ + 3² = ?",
        options: ["13", "15", "17", "19"],
        correct: "c"
    },
    {
        category: "Math",
        question: "If 3x - 4 = 14, x = ?",
        options: ["5", "6", "7", "8"],
        correct: "b"
    },
    {
        category: "Math",
        question: "HCF of 12, 18, 24?",
        options: ["2", "3", "6", "12"],
        correct: "c"
    },
    {
        category: "Math",
        question: "40 ÷ 8 × 3 = ?",
        options: ["10", "12", "15", "18"],
        correct: "c"
    },
    {
        category: "Math",
        question: "(15 + 25) × 2 = ?",
        options: ["70", "80", "90", "100"],
        correct: "b"
    },
    {
        category: "Math",
        question: "LCM of 4, 6, 8?",
        options: ["12", "16", "24", "48"],
        correct: "c"
    },
    {
        category: "Math",
        question: "Simple Interest (P=1000, R=5%, T=2)?",
        options: ["50", "75", "100", "125"],
        correct: "c"
    },
    {
        category: "Math",
        question: "x² = 49, x = ?",
        options: ["6", "7", "8", "9"],
        correct: "b"
    },
    {
        category: "Math",
        question: "12 + 18 - 7 = ?",
        options: ["20", "21", "22", "23"],
        correct: "d"
    },
    {
        category: "Math",
        question: "45% of 200 = ?",
        options: ["80", "85", "90", "95"],
        correct: "c"
    },
    {
        category: "Math",
        question: "Speed = 90 km/h = ? m/s",
        options: ["20", "25", "30", "35"],
        correct: "b"
    },
    {
        category: "Math",
        question: "8 × 9 - 15 = ?",
        options: ["57", "60", "63", "66"],
        correct: "a"
    },
    {
        category: "Math",
        question: "Average of first 5 natural numbers?",
        options: ["2", "3", "4", "5"],
        correct: "b"
    },
    // English (Questions 76-100)
    {
        category: "English",
        question: "Superlative of 'good':",
        options: ["Gooder", "Better", "Best", "Most good"],
        correct: "c"
    },
    {
        category: "English",
        question: "Fill in the blank: I ___ to school every day",
        options: ["go", "goes", "going", "gone"],
        correct: "a"
    },
    {
        category: "English",
        question: "Opposite of 'fast':",
        options: ["Quick", "Rapid", "Slow", "Speedy"],
        correct: "c"
    },
    {
        category: "English",
        question: "Choose correct sentence:",
        options: [
            "She don't like tea",
            "She doesn't likes tea",
            "She doesn't like tea",
            "She not like tea"
        ],
        correct: "c"
    },
    {
        category: "English",
        question: "Fill in the blank: He is ___ honest man",
        options: ["a", "an", "the", "no article"],
        correct: "b"
    },
    {
        category: "English",
        question: "Past tense of 'eat':",
        options: ["eated", "ate", "eaten", "eat"],
        correct: "b"
    },
    {
        category: "English",
        question: "Synonym of 'big':",
        options: ["Small", "Tiny", "Large", "Short"],
        correct: "c"
    },
    {
        category: "English",
        question: "Fill in the blank: She is good ___ singing",
        options: ["in", "on", "at", "for"],
        correct: "c"
    },
    {
        category: "English",
        question: "Choose correct spelling:",
        options: ["Definately", "Definitely", "Definetly", "Definatly"],
        correct: "b"
    },
    {
        category: "English",
        question: "Plural of 'child':",
        options: ["Childs", "Children", "Childes", "Childrens"],
        correct: "b"
    },
    {
        category: "English",
        question: "Fill in the blank: I have ___ apple",
        options: ["a", "an", "the", "no article"],
        correct: "b"
    },
    {
        category: "English",
        question: "Antonym of 'strong':",
        options: ["Weak", "Powerful", "Tough", "Solid"],
        correct: "a"
    },
    {
        category: "English",
        question: "Choose correct sentence:",
        options: [
            "He go to school",
            "He goes to school",
            "He going to school",
            "He gone to school"
        ],
        correct: "b"
    },
    {
        category: "English",
        question: "Fill in the blank: They ___ playing",
        options: ["is", "am", "are", "be"],
        correct: "c"
    },
    {
        category: "English",
        question: "Synonym of 'quick':",
        options: ["Slow", "Fast", "Late", "Delay"],
        correct: "b"
    },
    {
        category: "English",
        question: "Choose correct preposition: The book is ___ the table",
        options: ["at", "on", "in", "with"],
        correct: "b"
    },
    {
        category: "English",
        question: "Antonym of 'rich':",
        options: ["Wealthy", "Poor", "Moneyed", "Affluent"],
        correct: "b"
    },
    {
        category: "English",
        question: "Fill in the blank: She sings ___",
        options: ["good", "well", "nice", "beautiful"],
        correct: "b"
    },
    {
        category: "English",
        question: "Choose correct spelling:",
        options: ["Acommodate", "Accommodate", "Acomodate", "Accomodate"],
        correct: "b"
    },
    {
        category: "English",
        question: "Plural of 'woman':",
        options: ["Womans", "Women", "Womens", "Woman"],
        correct: "b"
    },
    {
        category: "English",
        question: "Fill in the blank: I am taller ___ him",
        options: ["than", "then", "that", "this"],
        correct: "a"
    },
    {
        category: "English",
        question: "Synonym of 'happy':",
        options: ["Sad", "Joyful", "Angry", "Tired"],
        correct: "b"
    },
    {
        category: "English",
        question: "Choose correct tense: They ___ here yesterday",
        options: ["come", "came", "will come", "coming"],
        correct: "b"
    },
    {
        category: "English",
        question: "Antonym of 'hot':",
        options: ["Warm", "Cold", "Wet", "Dry"],
        correct: "b"
    },
    {
        category: "English",
        question: "Choose the correct word: She is very ___ in mathematics",
        options: ["good", "well", "nice", "beautiful"],
        correct: "a"
    }
];