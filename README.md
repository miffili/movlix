## movlix 🎥 | a coding challenge

A simple movie application built with Vue.js

### User Stories

The user can:
* create a new movie with following attributes
  * title
  * year of release
  * description
  * length
* rate movies by giving them stars from 0 (real bad) to 5 (amazing) stars
* edit movie
* delete movie

All data is stored in the browser via LocalStorage.

### Used Tech

* [Vue.js](https://vuejs.org/)
* [vee-validate](https://baianat.github.io/vee-validate/) for form validation
* one of the [Hero Patterns](https://www.heropatterns.com/) as background

### Usage of application (vue cli default)

#### Project setup
```
npm install
```

#### Compiles and hot-reloads for development
```
npm run serve
```

#### Compiles and minifies for production
```
npm run build
```

#### Run your tests
```
npm run test
```

#### Lints and fixes files
```
npm run lint
```

#### Customize configuration
See [Configuration Reference](https://cli.vuejs.org/config/).

----

### Backstory (Retrospective March 2020)

As part of an application process for my first full time job, I was asked to do the following coding challenge on November 21, 2018:

> Movies App:
>
> Implement a simple front-end application using a framework of your choice: Angular, React, Vue.js, jQuery or vanilla JS. A user can create a new movie with following attributes: title, description, year of release and length. A newly created movie should appear in a list of movies. A user can also rate movies by giving them stars from 0 stars (for a bad movie) to 5 stars (for an amazing movie). User should be able to edit and delete a movie. You don't have to implement any kind of persistence on the client, so it's fine movies are lost when the page is refreshed. However it would be a plus point if you could figure out how to store movies in the browser.

Deadline for this task was November 28, 2018. Since the company I applied at used Vue.js, I decided to use Vue.js even tough I lacked any experience whatsoever. 😇 Also, I didn't want to deliver a plain html site, so I styled the whole application in full Wes Bos manner. 🤓

In the end, I got the job. I started January 15, 2019. Unfortunately it wasn't a good fit. But I learned a lot in the six months, especially about myself. 🙏

What I learned:  
* a (for me at that point in time) new framework
* how to work under pressure
* don't get hung up on details (the star rating was trickey 😇)
* have fun even if it counts for something (design, sample data)

PS: a note worth mentioning.. I struggled in the first two days with the framework & almost abandoned the framework for vanilla javascript halfway into the task. but I sticked with it & worked through my frustration. 😇 this skill came in handy at the end of the probation period when I was asked after 5½ months to prove myself again & code a POC (minor feature within code base) on my own. I managed to deliver even tough the task overwhelmed me in the beginning. 💪😎