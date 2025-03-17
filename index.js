
        // Mobile menu toggle
        document.querySelector('.menu-toggle').addEventListener('click', function() {
            document.querySelector('.nav-links').classList.toggle('active');
        });

        // Scroll animation for navbar
        window.addEventListener('scroll', function() {
            const navbar = document.querySelector('.navbar');
            if (window.scrollY > 50) {
                navbar.classList.add('scrolled');
            } else {
                navbar.classList.remove('scrolled');
            }
        });

        // Function to dynamically add projects
        function addProject() {
            // Create project name input
            const projectName = prompt('Enter project name:');
            if (!projectName) return;
            
            // Create project description input
            const projectDesc = prompt('Enter project description:');
            if (!projectDesc) return;
            
            // Create file input for video
            const fileInput = document.createElement('input');
            fileInput.type = 'file';
            fileInput.accept = 'video/*';
            
            fileInput.onchange = function(e) {
                const file = e.target.files[0];
                if (!file) return;
                
                // Create video URL
                const videoURL = URL.createObjectURL(file);
                
                // Create project card
                const projectCard = document.createElement('div');
                projectCard.className = 'project-card';
                
                // Create video element
                const video = document.createElement('video');
                video.controls = true;
                video.src = videoURL;
                
                // Create project info
                const projectInfo = document.createElement('div');
                projectInfo.className = 'project-info';
                
                // Create project title
                const title = document.createElement('h3');
                title.className = 'project-title';
                title.textContent = projectName;
                
                // Create project description
                const desc = document.createElement('p');
                desc.textContent = projectDesc;
                
                // Append elements
                projectInfo.appendChild(title);
                projectInfo.appendChild(desc);
                
                projectCard.appendChild(video);
                projectCard.appendChild(projectInfo);
                
                // Add to projects container
                document.getElementById('projects-container').appendChild(projectCard);
                
                // Add animation
                 
                projectCard.style.opacity = '0';
                projectCard.style.transform = 'translateY(20px)';
                 
                
                setTimeout(() => {
                    projectCard.style.transition = 'all 0.5s ease';
                    projectCard.style.opacity = '1';
                    projectCard.style.transform = 'translateY(0)';
                }, 100);
            };
            
            fileInput.click();
        }

        // Add animation for elements on scroll
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('fade-in-active');
                }
            });
        }, { threshold: 0.1 });

        // Observe all sections
        document.querySelectorAll('section').forEach(section => {
            section.classList.add('fade-in');
            observer.observe(section);
        });

        // Mouse trail effect
        function createMouseTrail() {
            const body = document.querySelector('body');
            const colors = ['#6e44ff', '#8e64ff', '#a384ff'];
            
            window.addEventListener('mousemove', function(e) {
                const trail = document.createElement('div');
                trail.className = 'mouse-trail';
                trail.style.left = e.pageX + 'px';
                trail.style.top = e.pageY + 'px';
                trail.style.background = colors[Math.floor(Math.random() * colors.length)];
                
                body.appendChild(trail);
                
                setTimeout(() => {
                    trail.style.opacity = '0';
                    trail.style.transform = 'scale(3)';
                    trail.style.transition = 'all 0.8s ease';
                    
                    setTimeout(() => {
                        trail.remove();
                    }, 800);
                }, 10);
            });
        }

       // Replace the existing typing effect function with this sliding box name effect
function addSlidingBoxNameEffect() {
    const headerTitle = document.querySelector('header h1');
    const originalText = headerTitle.textContent;
    headerTitle.textContent = '';
    
    // Create a container for the effect
    const effectContainer = document.createElement('div');
    effectContainer.style.position = 'relative';
    effectContainer.style.display = 'inline-block';
    headerTitle.appendChild(effectContainer);
    
    // Split name into individual characters
    const characters = originalText.split('');
    
    // Add each character with a sliding box effect
    characters.forEach((char, index) => {
        // Create character container
        const charContainer = document.createElement('span');
        charContainer.style.display = 'inline-block';
        charContainer.style.position = 'relative';
        charContainer.style.overflow = 'hidden';
        charContainer.style.verticalAlign = 'middle';
        charContainer.style.opacity = '0';
        charContainer.style.transform = 'translateY(50px)';
        charContainer.style.transition = 'all 0.5s ease';
        
        // Create the character
        const charSpan = document.createElement('span');
        charSpan.textContent = char;
        charSpan.style.display = 'inline-block';
        charSpan.style.position = 'relative';
        
        // Create sliding box overlay
        const overlay = document.createElement('span');
        overlay.style.position = 'absolute';
        overlay.style.top = '0';
        overlay.style.left = '0';
        overlay.style.width = '100%';
        overlay.style.height = '100%';
        overlay.style.backgroundColor = '#4f46e5';
        overlay.style.transform = 'translateY(0)';
        overlay.style.transition = 'transform 0.5s ease ' + (index * 0.05) + 's';
        
        // Append elements
        charContainer.appendChild(charSpan);
        charContainer.appendChild(overlay);
        effectContainer.appendChild(charContainer);
        
        // Trigger animation after a delay
        setTimeout(() => {
            charContainer.style.opacity = '1';
            charContainer.style.transform = 'translateY(0)';
            
            // Slide box away after character appears
            setTimeout(() => {
                overlay.style.transform = 'translateY(-100%)';
            }, 300 + index * 50);
        }, 500 + index * 80);
    });
}

// Replace the existing initialization in DOMContentLoaded with this:
document.addEventListener('DOMContentLoaded', function() {
    createMouseTrail();
    addSlidingBoxNameEffect();  // Use the new effect instead of addTypingEffect
    
    // Smooth scrolling for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;
            
            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                window.scrollTo({
                    top: targetElement.offsetTop - 70,
                    behavior: 'smooth'
                });
            }
        });
    });
});