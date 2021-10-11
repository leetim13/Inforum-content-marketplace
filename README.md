# inforum

<img src="./logo.png" alt="Company logo"/>

## About Us
> *Enabling a dialogue between corporations and the generation of tomorrow*

Inforum is a web-based, Marketplace-like application, where users can share marketing campaigns posted by our corporate partners on their social media platforms. Based on the number of interactions (in the forms of likes/comments), the users will receive a certain number of reward points. Inforum will act as a bridge for corporations to connect with younger generations on the social media platform and provide an opportunity for corporations to introduce their relevant products and offerings in a more effective manner.

Table of Contents
---

- [People](./team/)
    - [Leader Selection](./team/leader_selection.md)
    - [Team Principles](./team/team_principles.md)
- [Diversity](./team/diversity.md)
- [Product & Research](./product_research/)
    - [Market](./product_research/market.md)
    - [Roadmap](./product_research/roadmap.md)
- [Architecture Diagram](#Architecture-Diagram)
- [Tech Stack](#Tech-Stack)
- [Uses Cases](#Use-Cases)
    - [Example UI](#Example-UI)

## Architecture Diagram
![](https://user-images.githubusercontent.com/20623399/136843855-15ab6741-4249-4ea4-9e51-1ee43dfa7472.png)

## Tech Stack (PERN Stack)
**Languages:** \
Javascript, SQL 

**Front End:** \
[React.js](https://reactjs.org/), [Redux](https://redux.js.org/) (State management) 

**Back End:**  \
[Express.js](https://expressjs.com/), [Node.js](https://nodejs.org/en/), [Facebook Graph API](https://developers.facebook.com/docs/graph-api/)

**Data Storage:** \
[PostgreSQL](https://www.postgresql.org/) (ORM: Sequelize), [Redis](https://redis.io/) 

**Testing/Exceptions Logging/Monitoring:** \
[Jest](https://jestjs.io/), [Sentry](https://sentry.io/welcome/) 

**Deployment/CI:** \
[Heroku](https://www.heroku.com/), [Github Actions](https://github.com/features/actions) 

**Other Tools:** \
[Figma](https://www.figma.com/), [Postman](https://www.postman.com/), [Slack](https://slack.com/)

## Decision Logs
**Design and UI:** \
From a design perspective, we have decided to prototype our entire UI and high-level architecture using `Figma`, which is intuitive to use and requires not much technical background. Figma also has group sharing functionalities and will thus allow our CSC454 colleagues to  participate in the whole design process.

**React, Redux, Express, Node, ESLint, Jest:** \
We have decided to use this popular stack in web development, because it helps us build a web application from front-end to back-end only using just `Javascript`. 
We also chose to use `Jest`, because both `Jest` and `React` are developeda and supported by Facebook and will have better compatibility with one another.

**Data Storage (PostgreSQL/Redis):** \
We initially thought of using the popular `MERN` stack but eventually realized that a relational database (`postgreSQL`) would be more appropriate for our use case compared to a NoSQL database (`MongoDB`). This is mainly due to our business model as we will need to track the number of interactions (likes/comments/click-through rate) of each unique post by a given user. A relational schema would help us better organize this information, where we could have a “users” table and also a “posts” table, where each unique user can have multiple posts and each post will have a different number of interactions. 

We have also decided to add `Redis` to our tech stack as an in-memory key-value store for caching purposes, so we can retrieve data such as user-related data in a timely manner.

**Facebook Graph API:** \
We will use Facebook's `Graph API`, which will provide us with key statistics for each user's post (including the # of likes/comments). This will be used to calculate the points each user will get in our reward system.

**Monitoring (Sentry):** \
We have decided to use `Sentry` for error tracking and performance monitoring for both the front-end and back-end of our web application.

**Communication:** \
We have decided to use `Slack` as the primary source of all communication, including video calls and the recording of meeting notes. This is because we want to promote a professional work environment where the slack channel will only be used for work-related discussions.

**CI/CD/Version Control:** \
We have decided to use `Github` as our version control platform, because everyone on the team has professional experiences working with it and that it is free of charge for teams of any size unlike alternatives such as Azure DevOps.

We have decided to use `Github Actions` to set up our continuous integration workflow, including building, testing and deployment. This is because `GitHub` is arealdy used extensively for the entire application development process (commits, issues, branches, etc.).

We decided to use `Heroku` as our container-based cloud platform to deploy and manage our MVP mainly because it is free of charge and `Heroku` integrates with `Github` very well, so we could leverage that for continuous deployments.


## Example Use Cases 
- Marketing teams from the banks will use our website to post marketing campaigns in the form of a “mission” for promoters to accept and complete. The missions could be in the form of  sharing a new product or limited offers/deals, or simply posts/videos the banks want the users to share. The banks can set requirements on the missions and we will validate the user's post against the requirements stated. 
- Machine Learning teams or Marketing teams from the banks can download (in csv.) or view key statistics of each mission to have a better understanding of their marketing strategies and make further improvements. The banks will also have access to each individual promoter’s posts in case they want to see it in detail.
- Each promoter will use our website to view and accept new missions based on their preferences and the missions can also be queried via specific tags/categories. After making a post on social media, the promoters will then paste the post url (that will contain the unique post id) back on our website, so we (or the banks) can validate it against requirements. This validation may include counting the number of interactions (likes/comments/views) for each post using Facebook’s Graph API.
- Each promoter can come on our website and redeem their points for rewards (i.e. Amazon Gift card) in our Reward Center. In terms of gift cards, they will receive a claim code on our website.
- Admin users will have the ability to manage, view, edit, add, delete new missions and will have access to user accounts and other key statistics of the website. Admins will also have permissions to ban a user permanently if received a complaint/report from the banks or if the user exhibits malicious behaviours (using of bots, not following the rules/terms of services, exploiting the reward system, etc). 
### Example UI
![example_UI](https://user-images.githubusercontent.com/20623399/136848384-ca91fee9-b8e6-4e59-9dea-0b0a1e2cce79.png)




