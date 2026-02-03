
const sidebar = document.querySelector(".sidebar");
const sidebarToggleBtn = document.querySelectorAll(".sidebar-toggle");
const themeToggleBtn = document.querySelector(".theme-toggle")
const themeIcon = themeToggleBtn.querySelector(".theme-icon");
const searchForm = document.querySelector(".search-form");

// Updates the theme icon based on current theme and sidebar state
const updateThemeIcon = () => {
  const isDark = document.body.classList.contains("dark-theme");
  // themeIcon.textContent = sidebar.classList.contains("collapsed") ? (isDark ? "light_mode" : "dark_mode") : "dark_mode";   // ternary operator
  if (sidebar.classList.contains("collapsed") && isDark) {
    themeIcon.textContent = "light_mode";
} else {
    themeIcon.textContent = "dark_mode";
}

}

// Apply light theme is saved or system prefers
const savedTheme = localStorage.getItem("theme");
const systemPrefersLight = window.matchMedia("(prefers-color-scheme: light)").matches;
const shouldUseLightTheme = savedTheme === "light" || (!savedTheme && systemPrefersLight);
document.body.classList.toggle("light-theme", shouldUseLightTheme);
updateThemeIcon();


// Toggle sidebar collapsed state on buttons click
sidebarToggleBtn.forEach(btn => {
   btn.addEventListener("click", () => {
    sidebar.classList.toggle("collapsed");
    updateThemeIcon();
   });
});

// Expand the sidebar when the search form is clicked

searchForm.addEventListener("click", () => {
  if(sidebar.classList.contains("collapsed")){
    sidebar.classList.remove("collapsed");
    searchForm.querySelector("input").focus(); //Focus the input 
  }
});

// Search functionality for sections
searchForm.addEventListener("submit", function(e) {
  e.preventDefault();
  const query = searchForm.querySelector("input").value.trim().toLowerCase();
  // Sections to search: Home, About, Tech Stacks, Projects, Contact
  const sections = [
    { id: "home", title: "home, sandip kushwaha, resume, cv , photos" },
    { id: "about", title: "about, programming, locations" },
    { id: "tech-stack", title: "tech stacks, skills, tools" },
    { id: "projects", title: "projects," },
    { id: "contact", title: "contact, call" }
  ];
  let found = false;
  sections.forEach(section => {
    const el = document.getElementById(section.id);
    if (el) {
      if (section.title.includes(query) || section.id.includes(query)) {
        el.style.display = "";
        el.scrollIntoView({ behavior: "smooth" });
        found = true;
      } else {
        el.style.display = "block";
      }
    }
  });
  if (!found) {
    alert("No matching section found. please try again!!!");
  }
});

// Toggle between themes on theme button click
themeToggleBtn.addEventListener("click", () =>{
  const isDark = document.body.classList.toggle("dark-theme");
  localStorage.setItem("theme", isDark ? "dark" : "light");
  updateThemeIcon();
});

if(window.innerWidth > 768) sidebar.classList.remove("collapsed");


// close the sidebar when clicks outside
document.body.addEventListener("click", (e) => {
  if ( e.target === document.body && sidebar && !sidebar.classList.contains("collapsed"))
     {
    sidebar.classList.add("collapsed");
    updateThemeIcon();
  }
});

// close the sidebar when clicks any menu-lists for small device
const menuLinks = document.querySelectorAll('.menu-list');
  menuLinks.forEach(link => {
    link.addEventListener('click', () => {
      if (window.innerWidth <= 768) {
        sidebar.classList.add('collapsed');
      }
    });
  });

   // Select all menu links
  const menuLink = document.querySelectorAll('.menu-link');
  // Loop through each menu link
  menuLink.forEach(link => {
    link.addEventListener('click', () => {
      // Remove 'active' class from all links
      menuLink.forEach(link => link.classList.remove('active'));
      
      // Add 'active' class to the clicked link
      link.classList.add('active');
    });
  });

  // Scroll tracking for menu-list
const menuLinks1 = document.querySelectorAll('.menu-link');
const sectionsToTrack = ['home', 'about', 'tech-stack', 'projects', 'contact'];
function trackActiveSection() {
  let currentSection = sectionsToTrack[0];
  for (const id of sectionsToTrack) {
    const section = document.getElementById(id);
    if (section) {
      const rect = section.getBoundingClientRect();
      if (rect.top <= 120 && rect.bottom > 120) {
        currentSection = id;
        break;
      }
    }
  }
  menuLinks1.forEach(link => {
    link.classList.remove('active');
    if (link.getAttribute('href') === '#' + currentSection) {
      link.classList.add('active');
    }
  });
}
document.querySelector('.main-content').addEventListener('scroll', trackActiveSection);
window.addEventListener('scroll', trackActiveSection);

// Text automate typing
var typed = new Typed(".text", {
    strings: ["CSIT Student...","Web Developer...", "Web Designer...", "Python Developer..."],
    typeSpeed: 100,
    backSpeed: 100,
    backDelay: 1000,
    loop: true
});  


// Show "Back to Top" button when scrolling down
  const backToTop = document.getElementById('backToTop');
  window.addEventListener('scroll', () => {
    if(window.scrollY > 300) {
      backToTop.style.opacity = '1';
      backToTop.style.pointerEvents = 'auto';
    } else {
      backToTop.style.opacity = '0';
      backToTop.style.pointerEvents = 'none';
    }
  });
  backToTop.addEventListener('click', () => {
    window.scrollTo({top:0, behavior:'smooth'});
  });


// // Contact Form Submission
const contactForm = document.getElementById('contact-form');
contactForm.addEventListener('submit', (e) => {
  e.preventDefault();

  emailjs.sendForm('Sandip023', 'template_8pbv2kr', e.target)
    .then(() => {
      showSuccessPopup('Successfully sent message!');
      contactForm.reset();
    })
    .catch((error) => {
      alert('Failed to send message. Please try again!!!');
      console.error('Error:', error);
    });
});

  // Success popup function
  function showSuccessPopup(message) {
    let popup = document.createElement('div');
    popup.textContent = message;
    popup.style.position = 'fixed';
    popup.style.top = '30px';
    popup.style.right = '30px';
    popup.style.background = '#594aff';
    popup.style.color = '#fff';
    popup.style.padding = '16px 32px';
    popup.style.borderRadius = '8px';
    popup.style.boxShadow = '0 2px 8px rgba(0,0,0,0.2)';
    popup.style.fontSize = '1.1rem';
    popup.style.zIndex = '9999';
    popup.style.opacity = '0';
    popup.style.transition = 'opacity 0.3s';
    document.body.appendChild(popup);
    setTimeout(() => { popup.style.opacity = '1'; }, 50);
    setTimeout(() => {
      popup.style.opacity = '0';
      setTimeout(() => document.body.removeChild(popup), 400);
    }, 1300);
  }

// --- Fade-in Animation on Scroll ---
  function handleFadeIn() {
    document.querySelectorAll('.fade-in').forEach(el => {
      const rect = el.getBoundingClientRect();
      if (rect.top < window.innerHeight - 60) {
        el.classList.add('visible');
      } else {
        el.classList.remove('visible');
      }
    });
  }
  window.addEventListener('scroll', handleFadeIn);
  window.addEventListener('DOMContentLoaded', handleFadeIn);

  




