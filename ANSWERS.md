<!-- Answers to the Short Answer Essay Questions go here -->

1. What is the purpose of using _sessions_?

Sessions provide a way to add a state to an otherwise stateless server. Session can store user information between requests through an in memory store or a database.

2. What does bcrypt do to help us store passwords in a secure manner.

`bcrypt` has helper functions to has passwords and compare hashes. This allows us to store passwords as generated hashes instead of plain text.

3. What does bcrypt do to slow down attackers?

`bcrypt` adds salt to generated hashes, which involves CPU time and a powerful CPU. This slows down attackers.

4. What are the three parts of the JSON Web Token?

Headers, payload and signature.
