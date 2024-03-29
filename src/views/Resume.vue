<template>
  <div class="resume">
    <link href="https://fonts.googleapis.com/css?family=Arimo:400,700" rel="preload" as="font" type="font/woff2" />
    <div class="resume__sheet">
      <div class="resume__top">
        <h1>Pete Nelson</h1>
        <h2>Senior Web Engineer</h2>
        <div class="resume__description">
          Accomplished full stack web developer / designer with over 16 years of professional experience.  Have worked on delivering full stack
          solutions from the initial design phase into full production implementation.  Extensive experience using major UI frameworks React, Vue,
          and Angular. Written both rest and soap services in Node and Java.  Setup and integrated with many types of databases including SQL Server,
          Postgres, and MySql.  Strong understanding on how to create tightly coupled integrations between the UI and server using TypeScript and GraphQL.
          Implemented complex CI/CD pipelines using CircleCI and AWS.
          Able to create site designs, illustrations, and logos using Sketch, Illustrator and Photoshop.  Written backend
          python scripts using Spark and Kafka for processing 20k network transactions a second.  Experience working in AWS to setup services using
          S3, EC2, Lambda, etc. Education includes both a BA in Computer Science, and a Masters in Business Administration.
        </div>
      </div>
      <div class="resume__left-column">
          <h3>
            <img src="/assets/icons/person.svg" aria-hidden="true"/>
            Personal Info
          </h3>
          <div class="resume__section resume__personal-info">
            <div class="resume__info">
              <label>Address</label>
              Bella Vista, AR
            </div>
            <div class="resume__info">
              <label>E-mail</label>
              <a href="mailto:petenelson.webdesign@gmail.com">petenelson.webdesign@gmail.com</a>
            </div>
            <div class="resume__info">
              <label>Website</label>
              <a href="http://petenelson.dev">http://petenelson.dev</a>
            </div>
          </div>
          <h3>
            <img src="/assets/icons/puzzle.svg" aria-hidden="true"/>
            Skills
          </h3>
          <div class="resume__section resume__skills">
            <div class="resume__info">
              <label>Languages</label>
              Javascript, Java, Scala, Python, Swift
            </div>
            <div class="resume__info">
              <label>UI Frameworks</label>
              React/Redux, Angular, Vue, ExtJS
            </div>
            <div class="resume__info">
              <label>UI</label>
              CSS3, SASS, PostCSS, SVG, HTML5, TypeScript
            </div>
            <div class="resume__info">
              <label>Server</label>
              Node, Express, Spring, Rest, Soap, Kafka, Spark, GraphQL, Docker, CircleCi
            </div>
            <div class="resume__info">
              <label>Design</label>
              Illustrator, Sketch, Photoshop
            </div>
            <div class="resume__info">
              <label>Database</label>
              MySQL, SQL Server, Postgres, Hadoop, OpenTSDB
            </div>
            <div class="resume__info">
              <label>Testing</label>
              React Testing Library, Jest, Enzyme, Karma, Chai, Sinon, Nightwatch, Cucumber
            </div>
          </div>
        </div>
      <div class="resume__right-column">
          <h3>
            <img src="/assets/icons/suitecase.svg" aria-hidden="true"/>
            Experience
          </h3>
          <div class="resume__section resume__experience">
            <div class="resume__job">
              <div class="resume__job-dates">
                <label>October 2020 - Present</label>
              </div>
              <div class="resume__job-info">
                <h4>Advanced Senior Web Engineer</h4>
                <i>CVS <span class="resume__job-location">(Remote)</span></i>
                <ul>
                  <li>Been a team lead for one of our web teams, overseeing implementation and technical issues</li>
                  <li>Created a new Micro Frontend architecture that has laid the ground work for breaking up our monolithic web application</li>
                  <li>Spearheaded the initiative to migrate our main web application over to TypeScript</li>
                  <li>Worked on the initial implementation of our guest user environment that allows us to provide a guest user sign in to our production environment</li>
                  <li>Worked on migrating off of Karma and Enzyme, over to Jest and React Testing Library</li>
                  <li>Migrated our entire web CI workflow off of jenkins, and over to using CircleCi</li>
                  <li>Did performance enhancements to our login flow, and was able to shave off roughly 4 seconds</li>
                  <li>Migrated off of Perfecto, and replaced it with selenium grid.  Also helped to spin up our new UI testing framework Playwright</li>
                </ul>
              </div>
            </div>
            <div class="resume__job">
              <div class="resume__job-dates">
                <label>January 2020 - October 2020</label>
              </div>
              <div class="resume__job-info">
                <h4>Senior Web Engineer</h4>
                <i>Act-On Software <span class="resume__job-location">(Portland, OR)</span></i>
                <ul>
                  <li>Spearheaded initiative to migrate their current UI off of java monolith into a stand alone react application.</li>
                  <li>Setup new GraphQL endpoints used to tightly couple backend data with the front end using TypeScript.</li>
                  <li>Developed full CI/CD pipeline using bamboo.</li>
                  <li>Build full testing suite using Jest and Nightwatch that can be run quickly against PRs using docker.</li>
                </ul>
              </div>
            </div>
            <div class="resume__job">
              <div class="resume__job-dates">
                <label>July 2016 - January 2020</label>
              </div>
              <div class="resume__job-info">
                <h4>Staff Engineer</h4>
                <i>Aetna <span class="resume__job-location">(Denver, CO)</span></i>
                <ul>
                  <li>Currently working as a Staff Engineer to deliver advanced implementations across the web, server and ios platforms.</li>
                  <li>Technical lead on agile team responsible for delivering features for a React and Angular application.</li>
                  <li>Developed rest services in both Node and Java.</li>
                  <li>Architected a custom CMS solution for our applications to delivery content to users in a quick, reliable and performant manner.</li>
                  <li>Worked on our flag ship IOS application using Swift.</li>
                  <li>Unit and integration test all applications using Enzyme, Karma, Chai and Cucumber.</li>
                </ul>
              </div>
            </div>
            <div class="resume__job">
              <div class="resume__job-dates">
                <label>August 2015 - July 2016</label>
              </div>
              <div class="resume__job-info">
                <h4>Senior UI Engineer</h4>
                <i>Level 3 Communications <span class="resume__job-location">(Broomfield, CO)</span></i>
                <ul>
                  <li>Lead UI developer on primary security threat portal.  Designed and developed final solution using Illustrator, AngularJS, and Scala.</li>
                  <li>Created scripts in Scala and Python for analyzing 20k network transactions a second.  Used Spark and Kafka to store the resulting metrics into OpenTSDB.</li>
                  <li>Built interactive charting dashboard for all metrics using D3 charts.</li>
                  <li>Integration tests written for portal using Protractor.</li>
                </ul>
              </div>
            </div>
            <div class="resume__job">
              <div class="resume__job-dates">
                <label>February - October 2008, August 2009 - August 2015</label>
              </div>
              <div class="resume__job-info">
                <h4>Senior UI Java Developer</h4>
                <i>J.B. Hunt Transport <span class="resume__job-location">(Lowell, AR)</span></i>
                <ul>
                  <li>Lead developer on a team of 15 responsible for our flagship application "J.B. Hunt 360". used
                    by customers for booking, tracking, and reporting on shipments.  Built using ExtJS.</li>
                  <li>Designed and developed 3 generations of UI component library for entire organization.</li>
                  <li>Developed and maintained our public facing websites. jbhunt.com and jbhunt.jobs.</li>
                  <li>Developed multiple rest and soap services used for integrating with SQLServer and DB2,
                    as well as multiple 3rd party vendors such as SalesForce, ExactTarget, Omniture and Google.</li>
                  <li>Taught several classes on the subjects of JavaScript, ExtJS and JSF.</li>
                  <li>Built a custom link and email tracking system for our marketing emails.</li>
                </ul>
              </div>
            </div>
            <div class="resume__job">
              <div class="resume__job-dates">
                <label>October 2008 - August 2009</label>
              </div>
              <div class="resume__job-info">
                <h4>Chief Technical Officer</h4>
                <i>FlipFire LLC <span class="resume__job-location">(Fayetteville, AR)</span></i>
                <ul>
                  <li>Managed a team of eight employees consisting of Graphic Designers, Server / UI Developers,and System Administrators.</li>
                  <li>Invented a video player allowing users to watch videos uninterrupted in same window while browsing our site.  Listed as inventor for a filed patent.</li>
                  <li>Developed full stack application for browsing and playing videos from our site.</li>
                  <li>Designed and implemented a distributed system for receiving, rendering, and approving user submitted videos into our system.</li>
                </ul>
              </div>
            </div>
            <div class="resume__job">
              <div class="resume__job-dates">
                <label>May 2006 - February 2008</label>
              </div>
              <div class="resume__job-info">
                <h4>Java Software Developer</h4>
                <i>Acxiom <span class="resume__job-location">(Fayetteville, AR)</span></i>
                <ul>
                  <li>Responsible for design and development of JSF web application with emphasis using ajax to create fluid
                    interface for partitioning data sets.</li>
                  <li>Developed UI components to use across our applications for integrating into our backend using ajax.</li>
                </ul>
              </div>
            </div>
            <div class="resume__job">
              <div class="resume__job-dates">
                <label>January 2004 - May 2006</label>
              </div>
              <div class="resume__job-info">
                <h4>Graphic Designer</h4>
                <i>Cuerdon Signs <span class="resume__job-location">(Conway, AR)</span></i>
                - Designed and installed signs using Corel Draw
              </div>
            </div>
            <div class="resume__job">
              <div class="resume__job-dates">
                <label>September 1999 - January 2004</label>
              </div>
              <div class="resume__job-info">
                <h4>Graphic Designer</h4>
                <i>Best Banner and Sign <span class="resume__job-location">(Rogers, AR)</span></i>
                - Designed and installed signs using FlexiSign.
              </div>
            </div>
          </div>
          <h3>
            <img src="/assets/icons/education.svg" aria-hidden="true"/>
            Eduction
          </h3>
          <div class="resume__section resume__experience">
            <div class="resume__job">
              <div class="resume__job-dates">
                <label>September 2010 - May 2012</label>
              </div>
              <div class="resume__job-info">
                <h4>University of Arkansas, Masters in Business Administration</h4>
                <i>3.7 GPA</i>
              </div>
            </div>
            <div class="resume__job">
              <div class="resume__job-dates">
                <label>January 2004 - May 2006</label>
              </div>
              <div class="resume__job-info">
                <h4>University of Central Arkansas, BA Computer Science</h4>
                <i>3.75 GPA</i>
                <i>3.9 Major GPA</i>
              </div>
            </div>
          </div>
        </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'resume',
  components: {
  },
};
</script>

<style lang="scss">
  @import './resume.scss';
</style>
