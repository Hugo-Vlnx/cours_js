const API_KEY = 'b2035964a070a334d6997917ffcbdf98'; 
const API_TOKEN = 'eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJiMjAzNTk2NGEwNzBhMzM0ZDY5OTc5MTdmZmNiZGY5OCIsIm5iZiI6MTc3OTAyMjI5NC43ODMsInN1YiI6IjZhMDliOWQ2OGJmYTExNWU4MGVlNDRkZSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.eUCMUbawZ0v2PFSVjPsBF1CcJD6VNOxYzadTNv8OuQI'; // Ton jeton

const options = {
  method: 'GET',
  headers: {
    accept: 'application/json',
    Authorization: `Bearer ${API_TOKEN}`
  }
};

const choiceButtons = document.querySelectorAll('.choiceButton');

choiceButtons.forEach(group => {
    const buttons = group.querySelectorAll('button');
    
    buttons[0].style.backgroundColor = '#032541';
    buttons[0].style.color = '#ffffff';


    buttons.forEach(button => {
        button.addEventListener('click', () => {
            
            buttons.forEach(btn => {
                btn.style.backgroundColor = 'transparent';
                btn.style.color = '#032541';
            });
            
            button.style.backgroundColor = '#032541';
            button.style.color = '#ffffff';
        });
    });
});