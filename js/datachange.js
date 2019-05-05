smartb_text_resume = "Nov 2018 - Till Date <br> \
Senior Developer/ IoT Architect/ Product Owner <br> \
<strong>smartB Energy Management Gmbh </strong>\
<br>"

smartb_text_cv = smartb_text_resume +
"<div class='underline'></div> \
<li>A liaison between the company and the client and was crucial to building a successful relationship</li> \
<li>Successfully optimized resources, and was part of strategy and thereby helped with billing of projects within the company</li> \
<li>Successfully architected the infrastructure and applications in various client side and internal projects</li> \
<li>Optimized the development life cycle internally thereby increasing efficiency and cohesiveness of the team </li> \
<li>Architecting python based web applications and leading the team to successfully create production ready systems</li> \
<li>Presenting solutions to clients, and to peers alike on a regular basis</li> \
<br>"

accion_text_resume = ""

accion_text_cv = accion_text_resume +
"<div class='underline'></div> \
<li>Successfully set up multiple teams from scratch and was the forerunner to multiple projects</li> \
<li>Was involved in hiring talent for different projects both from a technical and behavioral standpoint</li> \
<li>Presenting solutions to potential clients, and successfully winning the projects</li> \
<li>Setting up teams for success by mentoring and fostering solid professional relationships</li> \
<li>Driving projects in multiple disciplines ranging from devops, machine learning to cloud computing</li> \
<li>Was involved in building strategy for the HR to build teams for various projects </li>\
<br>"

function changeText(changeid)
    {
        var display = document.getElementById(changeid);
        display.innerHTML = "";
        if (changeid === "smartb") {
          display.innerHTML = smartb_text_cv;
        }

    }
      function changeback(changeid)
    {
        var display = document.getElementById(changeid);
        display.innerHTML = "";
        if (changeid === "smartb") {
          display.innerHTML = smartb_text_resume;
        }
    }
