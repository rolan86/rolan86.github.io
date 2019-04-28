smartb_text_resume = "Nov 2018 - Till Date <br> \
Senior Developer/ IoT Architect/ Product Owner <br> \
<strong>smartB Energy Management Gmbh </strong>\
<br>"

smartb_text_cv = smartb_text_resume +
"<div class='underline'></div> \
<li>A liaison between the company and the client and was crucial to building a successful relationship</li> \
<li>Successfully optimized resources and thereby helped with billing of projects within the company</li> \
<li>Successfully architected the infrastructure and applications in various client side and internal projects</li> \
<li>Optimized the development life cycle internally thereby increasing efficiency and cohesiveness of the team </li> \
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
