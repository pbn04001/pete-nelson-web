<template>
  <div class="resume">
    <link href="https://fonts.googleapis.com/css?family=Arimo:400,700" rel="preload" as="font" type="font/woff2" />
    <div class="resume__sheet">
      <h1>Pete Nelson</h1>
      <h2>Staff Engineer</h2>
      <div class="resume__description">
        Accomplished web developer / designer with over 13 years of professional experience.  Have worked on delivering full stack solutions
        from the initial design phase into full production implementation.  Extensive experience using major UI frameworks React, Vue, and Angular.
        Written both rest and soap services in Node and Java.  Setup and integrated with many types of databases including SQL Server, DB2, and MySql.
        Able to create site designs, illustrations, and logos use Sketch, Illustrator and Photoshop.  Education includes both a BA in Computer
        Science, and an MBA.
      </div>
      <div class="resume__contents">
        <div class="resume__left_column">
          <h3>
            <Person />
            Personal Info
          </h3>
          <div class="resume__section resume__personal-info">
            <div class="resume__info">
              <label>Address</label>
              Denver, CO
            </div>
            <div class="resume__info">
              <label>E-mail</label>
              <a href="mailto:petenelson.webdesign@gmail.com">petenelson.webdesign@gmail.com</a>
            </div>
            <div class="resume__info">
              <label>Date of birth</label>
              08/11/1982
            </div>
            <div class="resume__info">
              <label>WWW</label>
              <a href="http://petenelson.dev">http://petenelson.dev</a>
            </div>
          </div>
        </div>
        <div class="resume__right_column">
          <h3>
            <Person />
            Experience
          </h3>
          <div class="resume__section resume__experience">
            <div class="resume__job">
              <div class="resume__job-dates">
                <label>July 2016 - Present</label>
              </div>
              <div class="resume__job-info">
                <h4>Staff Engineer</h4>
                <i>Aetna</i>
                <ul>
                  <li>Currently working on Staff Engineering team to deliver advanced implementations across the web, server and ios platforms.</li>
                  <li>Technical lead on agile team responsible for delivering features for a React and Angular application.</li>
                  <li>Architected a custom CMS solution for our applications to delivery custom content to users in a quick, reliable and performant manner.</li>
                  <li>Over a year experience working on our flag ship IOS application using Swift.</li>
                </ul>
              </div>
            </div>
            <div class="resume__job">
              <div class="resume__job-dates">
                <label>August 2015 - July 2016</label>
              </div>
              <div class="resume__job-info">
                <h4>Senior UI Engineer</h4>
                <i>Level 3 Communications</i>
                <ul>
                  <li>Lead UI developer on primary security threat portal.  Designed and developed final solution using Illustrator, AngularJS, and Scala.</li>
                  <li>Created scripts in Scala and Python for analyzing 20k network transactions a second.  Used Spark and Kafka to store the resulting metrics into OpenTSDB.</li>
                  <li>Built interactive charting dashboard built off the resulting metrics using multiple types of D3 charts.</li>
                </ul>
              </div>
            </div>
            <div class="resume__job">
              <div class="resume__job-dates">
                <label>February 2008 - August 2015</label>
              </div>
              <div class="resume__job-info">
                <h4>Senior Java Developer</h4>
                <i>J.B. Hunt Transport</i>
                <ul>
                  <li>Lead developer on team of 15 responsible for our flagship application "J.B. Hunt 360" used
                    by customer for booking, tracking, and reporting on shipments.  Built using ExtJS.</li>
                  <li>Designed and developed 3 generations of UI component library used by entire organization.</li>
                  <li>Developed and maintained our public facing websites. jbhunt.com and jbhunt.jobs.</li>
                  <li>Developed multiple rest and soap services used for integrating with SQLServer and DB2,
                    as well as multiple 3rd party vendors such as SalesForce, ExactTarget, Omniture and Google.</li>
                  <li>Taught several classes on the subjects of JavaScript, ExtJS and JSF.</li>
                </ul>
              </div>
            </div>
            <div class="resume__job">
              <div class="resume__job-dates">
                <label>May 2006 - February 2008</label>
              </div>
              <div class="resume__job-info">
                <h4>Java Software Developer</h4>
                <i>Acxiom</i>
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
                <h4>Graphic Design</h4>
                <i>Cuerdon Signs</i>
                Designed and install signs using Corel Draw
              </div>
            </div>
            <div class="resume__job">
              <div class="resume__job-dates">
                <label>September 1999 - January 2004</label>
              </div>
              <div class="resume__job-info">
                <h4>Graphic Design</h4>
                <i>Best Banner and Sign</i>
                Design and installsigns for using FlexiSign.
              </div>
            </div>
          </div>
          <h3>
            <Person />
            Eduction
          </h3>
          <div class="resume__section resume__experience">
            <div class="resume__job">
              <div class="resume__job-dates">
                <label>September 2010 - May 2012</label>
              </div>
              <div class="resume__job-info">
                <h4>University of Arkansas, Masters in Business Administration</h4>
                <i>3.7GPA</i>
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
  </div>
</template>

<script>
  import Person from '@/assets/icons/person.svg';

  export default {
    name: 'resume',
    components: {
      Person,
    },
  };

</script>

<style lang="scss">
  @import './resume.scss';
</style>
