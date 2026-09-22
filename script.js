const menu = document.querySelector('.menu-toggle');
const nav = document.querySelector('.nav-links');
menu?.addEventListener('click', () => {
  const open = nav.classList.toggle('open');
  menu.setAttribute('aria-expanded', open ? 'true' : 'false');
});
document.querySelectorAll('.nav-links a').forEach(a => a.addEventListener('click', () => nav.classList.remove('open')));

document.getElementById('contact-form')?.addEventListener('submit', function(e){
  e.preventDefault();
  const data = new FormData(this);
  const name = data.get('name');
  const email = data.get('email');
  const message = data.get('message');
  const subject = encodeURIComponent('EcomAssist UK enquiry from ' + name);
  const body = encodeURIComponent(
    `Name: ${name}\nEmail: ${email}\n\nRequirements:\n${message}`
  );
  window.location.href = `mailto:ecomassist.uk@gmail.com?subject=${subject}&body=${body}`;
  document.getElementById('form-note').textContent = 'Your email app should now open with the enquiry prepared.';
});
