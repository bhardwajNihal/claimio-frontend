
# todos

1. vite setup  
2. tailwind setup
3. routing - react-router-dom
4. homepage (/)
    - rendering users
    - tabs - for home, leaderboard, history(past claims)
    - add user action funcionality
        - minimal form dialog with username, and optional field to add profile pic
    - claim points functionality - assign random points to user, update entries to user doc, add to claims history
5. /leaderboard
    - fetch and display user rankings according to the points
    - client side socket connection, listening to server emits - to update rankings in real time
6. /claim-history
    - fetch and display all the past claims by the users
    - added pagination specific to this route to show data in chunks

- Manual state update
    - simple prop drilling, given the scale of the project, redux and context api seemed an overkill

- Code modularity
    - tried separting most of the component logic
- add custom hook to fetch users, and leaderboard stats
    - handles all the states, data, loading, error, natively.