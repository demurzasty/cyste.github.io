var defaultNicknames = 
[
    'Aaron',
    'Adam',
    'Adrian',
    'Aiden',
    'Alex',
    'Alexander',
    'Alex',
    'Andrew',
    'Andy',
    'Anthony',
    'Ajob',
    'Tony',
    'Arthur',
    'Austin',
    'Benjamin',
    'Ben',
    'Blake',
    'Bobby',
    'Bob',
    'Brandon',
    'Brian',
    'Bruce',
    'Cameron',
    'Carl',
    'Charles',
    'Charlie',
    'Christopher',
    'Chris',
    'Cody',
    'Colin',
    'Connor',
    'Corey',
    'Craig',
    'Daniel',
    'Dan',
    'David',
    'Dave',
    'Donald',
    'Don',
    'Dylan',
    'Edward',
    'Eric',
    'Elliot',
    'Ethan',
    'Evan',
    'Frank',
    'Frankie',
    'Freddie',
    'Fred',
    'Gabriel',
    'Gabe',
    'Gary',
    'George',
    'Harry',
    'Henry',
    'Ian',
    'Isaac',
    'Jack',
    'Jackson',
    'Jacob',
    'Jake',
    'James',
    'Jamie',
    'Jason',
    'Jay',
    'Jeffrey',
    'Jeff',
    'Jeremy',
    'Jerry',
    'Gerry',
    'Joel',
    'John',
    'Jordan',
    'Joseph',
    'Joshua',
    'Justin',
    'Kenneth',
    'Ken',
    'Kevin',
    'Kyle',
    'Lawrence',
    'Larry',
    'Leo',
    'Liam',
    'Logan',
    'Louis',
    'Lucas',
    'Luke',
    'Matthew',
    'Matt',
    'Maxwell',
    'Max',
    'Michael',
    'Mike',
    'Nathan',
    'Nathaniel',
    'Nicholas',
    'Nick',
    'Noah',
    'Nolan',
    'Oscar',
    'Owen',
    'Patrick',
    'Pat',
    'Paul',
    'Phillip',
    'Randy',
    'Richard',
    'Rich',
    'Riley',
    'Robert',
    'Bob',
    'Ronald',
    'Ron',
    'Roy',
    'Ryan',
    'Samuel',
    'Scott',
    'Sean',
    'Shaun',
    'Sebastian',
    'Stanley',
    'Steven',
    'Stephen',
    'Steve',
    'Taylor',
    'Theo',
    'Thomas',
    'Tom',
    'Tommy',
    'Timothy',
    'Tim',
    'Tristan',
    'Tyler',
    'Wayne',
    'William',
    'Billy'
];

function GetRandomNickname()
{
    return defaultNicknames[GetRandomInt(0, defaultNicknames.length - 1)];
}

var sentences =
[
    'Where are we?',
    'Silence...',
    'The stars are so beautiful.',
    'When will we find a planet?',
    'What was that?!',
    'Did you hear that?',
    'Not my fault!',
    'Can I do it alone?',
    'Please, talk with me...',
    'Asteroid?',
    'Can we back?'
];

function GetRandomSentence()
{
    return sentences[GetRandomInt(0, sentences.length - 1)];
}