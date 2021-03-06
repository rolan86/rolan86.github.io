smartb_text_resume = "Nov 2018 - Till Date <br> \
Senior Developer/ IoT Architect/ Agile Coach <br> \
<strong>smartB Energy Management Gmbh </strong>\
<br>"

smartb_text_cv = smartb_text_resume +
"<div class='underline'></div> \
<li>A liaison between the company and the client, was crucial to building a successful relationship</li> \
<li>Successfully optimized resources, and was part of strategy and thereby helped with billing of projects within the company</li> \
<li>Successfully architected the infrastructure and applications in various client side and internal projects</li> \
<li>Optimized the development life cycle internally thereby increasing efficiency and cohesiveness of the team </li> \
<li>Architecting python based web applications and leading the team to successfully create production ready systems</li> \
<li>Presenting solutions to clients, and to peers alike on a regular basis</li> \
<li>Post being acquired by Phoenix Contact, continuing to work on architecting of the platform</li> \
<li>Functioning partly as team agile coach/scrum master and solution architect</li> \
<li>Involved in mentoring and assisting product owner in road mapping and story mapping processes thereby improving processes</li> \
<li>Started the process of work system document to improve processes at all levels including organization level, project management, engineering </li> \
<li>Working hands on for platform development with AWS and python, involved in building CI/CD pipeline</li> \
<li>Working on infrastructure automation using terraform involving GitOps flow</li> \
<li>Involved in a fair bit of people management to help de-stress employees</li> \
<br>"

cisco_text_resume = "Sep 2014 - Oct 2018 <br> \
Senior Engineer <br> \
<strong>Cisco India </strong>\
<br>"

cisco_text_cv = cisco_text_resume +
"<div class='underline'></div> \
<li>Worked on python based project for email security</li> \
<li>Was involved in working with DevOps</li> \
<br>"

accion_text_resume = "Jun 2014 - Aug 2018 <br> \
Senior Consultant <br> \
<strong>Accionlabs India Pvt. Ltd. </strong>\
<br>"

accion_text_cv = accion_text_resume +
"<div class='underline'></div> \
<li>Successfully set up multiple teams from scratch and was the forerunner to multiple projects</li> \
<li>Was involved in hiring talent for different projects both from a technical and behavioral standpoint</li> \
<li>Was key to building a hiring strategy to create high performance teams</li> \
<li>Presenting solutions to potential clients, and successfully winning the projects</li> \
<li>Setting up teams for success by mentoring and fostering solid professional relationships</li> \
<li>Driving projects in multiple disciplines ranging from devops, machine learning to cloud computing</li> \
<li>Worked on Rackspace Openstack CDN and automation of certificate deployments which reduced 90% operations time </li>\
<li>Was involved in building strategy for the HR to build teams for various projects </li>\
<li>Mostly worked on projects on python, cloud (AWS, openstack), DevOps, Automation</li> \
<li>Awarded for outstanding work performed within the company</li> \
<br>"

mphasis_text_resume = "Jan 2012 - Jun 2014 <br> \
Senior Software Engineer <br> \
<strong>Mphasis India Pvt. Ltd. </strong>\
<br>"

mphasis_text_cv = mphasis_text_resume +
"<div class='underline'></div> \
<li>Worked on building a cloud deployment product which was successfully launched due to the efforts</li> \
<li>Successfully led teams with sizes ranging from 3 to 20 mostly on cloud and python based projects</li> \
<li>Successfully automated a backlog of 3 years worth of work within a period of 2 months thereby <br> \
creating a framework which continues to exist within the client company which also led to being <br> \
offered a role within the client company (HP)</li> \
<li>Was awarded for highest contributor award on OVAL mitre for the quarter</li> \
<li>Was key to hiring key candidates to major projects</li> \
<li>Was involved in research of Openstack which is a largescale project worldwide</li>\
<br>"

keane_text_resume = "Jan 2011 - Jan 2012 <br> \
Senior Software Engineer <br> \
<strong>Keane India Pvt. Ltd. </strong>\
<br>"

keane_text_cv = keane_text_resume +
"<div class='underline'></div> \
<li>Started of as an industry specific python developer</li> \
<li>Worked as a python developer on a medical web application</li> \
<li>Worked as a part of Goldman Sachs for technical support</li> \
<li>Worked on automation and was extremely effective in handling any issue</li>\
<br>"

freelance_text_resume = "Aug 2009 - Dec 2010 <br> \
Freelancer <br> \
<strong>N/A </strong>\
<br>"

freelance_text_cv = freelance_text_resume +
"<div class='underline'></div> \
<li>Worked as a lecturer at Sri Devi Institute of Technology and acquired public speaking skills</li> \
<li>As full time marketer, sales and developer,</li> \
<li>Worked on heart rate variability scanner, building the project from scratch using python</li> \
<li>Worked on a laboratory report generator, using C# and MS-Word templates</li>\
<li>Tried to setup my own company from the ground up</li>\
<br>"

intel_text_resume = "Jul 2008 - Jul 2009 <br> \
Intern<br> \
<strong>Intel India Pvt. Ltd. </strong>\
<br>"

intel_text_cv = intel_text_resume +
"<div class='underline'></div> \
<li>Interned as part of DEG PAE team, and was responsible for graphics issue replication</li> \
<li>Assisted debug team members with replication, assisted AEs with various issues</li> \
<li>Received kudos from individual team members as well as the team for various accomplishments</li>\
<li>Worked on blue ray testing, which resulted in bagging of a huge contract</li>\
<li>Rebuilt the OEM INF customization tool from scratch using C# as an internal project which saved more than 60% AE time</li> \
<br>"

interest_text_resume = "Stuff about me trying to startup 3 companies, hover here to know more "

interest_text_cv = "Built 3 stealth mode startups from scratch and learnt quite a bit from every single one.<br>\
Ardelis Technologies was meant as a service based startup for python development projects.<br>\
Style Magic was meant as an ecommerce startup for selling affordable ladies garments. <br>\
Techtrine was meant as a professional educational startup for students and professionals alike.<br>\
I am always looking to build something new, no matter the difficulty. <br>\
Building these startups taught me a lot of the skill sets that I already have and I look forward to build some more.<br>\
Skills that I have built are strategy, hiring, company budgeting, resource allocation, sales and marketing and a lot more,\
Ask me, and I will be happy to enunciate."

function changeText(changeid)
    {
        var display = document.getElementById(changeid);
        display.innerHTML = "";
        if (changeid === "smartb") {
          display.innerHTML = smartb_text_cv;
        }
        if (changeid === "accion") {
          display.innerHTML = accion_text_cv;
        }
        if (changeid === "cisco") {
          display.innerHTML = cisco_text_cv;
        }
        if (changeid === "mphasis") {
          display.innerHTML = mphasis_text_cv;
        }
        if (changeid === "keane") {
          display.innerHTML = keane_text_cv;
        }
        if (changeid === "freelance") {
          display.innerHTML = freelance_text_cv;
        }
        if (changeid === "intel") {
          display.innerHTML = intel_text_cv;
        }
        if (changeid === "interest") {
          display.innerHTML = interest_text_cv;
        }

    }
      function changeback(changeid)
    {
        var display = document.getElementById(changeid);
        display.innerHTML = "";
        if (changeid === "smartb") {
          display.innerHTML = smartb_text_resume;
        }
        if (changeid === "accion") {
          display.innerHTML = accion_text_resume;
        }
        if (changeid === "cisco") {
          display.innerHTML = cisco_text_resume;
        }
        if (changeid === "mphasis") {
          display.innerHTML = mphasis_text_resume;
        }
        if (changeid === "keane") {
          display.innerHTML = keane_text_resume;
        }
        if (changeid === "freelance") {
          display.innerHTML = freelance_text_resume;
        }
        if (changeid === "intel") {
          display.innerHTML = intel_text_resume;
        }
        if (changeid === "interest") {
          display.innerHTML = interest_text_resume;
        }
    }
