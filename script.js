// Common functionality for ALL pages

function initCommonFeatures() {
  // Mobile Hamburger Menu
  const hamburger = document.getElementById('hamburger')
  const mobileMenu = document.getElementById('mobile-menu')
  if (hamburger && mobileMenu) {
    hamburger.addEventListener('click', () => {
      mobileMenu.classList.toggle('hidden')
    })
  }

  // Dark / Light Mode Toggle with localStorage persistence
  const darkToggle = document.getElementById('dark-toggle')
  if (darkToggle) {
    const html = document.documentElement
    const icon = document.getElementById('theme-icon')

    // Load saved preference
    if (
      localStorage.getItem('theme') === 'dark' ||
      (!localStorage.getItem('theme') &&
        window.matchMedia('(prefers-color-scheme: dark)').matches)
    ) {
      html.classList.add('dark')
      if (icon) icon.textContent = '☀️'
    }

    darkToggle.addEventListener('click', () => {
      html.classList.toggle('dark')
      if (html.classList.contains('dark')) {
        localStorage.setItem('theme', 'dark')
        if (icon) icon.textContent = '☀️'
      } else {
        localStorage.setItem('theme', 'light')
        if (icon) icon.textContent = '🌙'
      }
    })
  }

  // Fake Search Bar
  const searchInput = document.getElementById('search-input')
  if (searchInput) {
    searchInput.addEventListener('keypress', (e) => {
      if (e.key === 'Enter') {
        alert('🔍 Searching for: ' + searchInput.value)
        searchInput.value = ''
      }
    })
  }

  // Back to Top Button
  const backToTop = document.getElementById('back-to-top')
  if (backToTop) {
    window.addEventListener('scroll', () => {
      if (window.scrollY > 400) {
        backToTop.style.display = 'flex'
      } else {
        backToTop.style.display = 'none'
      }
    })

    backToTop.addEventListener('click', () => {
      window.scrollTo({ top: 0, behavior: 'smooth' })
    })
  }

  // Smooth scrolling
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
      if (this.getAttribute('href') !== '#') {
        e.preventDefault()
        const target = document.querySelector(this.getAttribute('href'))
        if (target) target.scrollIntoView({ behavior: 'smooth' })
      }
    })
  })

  console.log('✅ CAMPUS ONE JS initialized')
}

// Fake Login System
window.fakeLogin = function(role) {
  localStorage.setItem('campusOneUser', JSON.stringify({
    role: role,
    name: role === 'Admin' ? 'Dr. Priya Sharma' :
          role === 'Teacher' ? 'Mr. Ramesh Rao' :
          'Parent / Student',
    timestamp: new Date().toISOString()
  }))

  alert(`🎉 Login Successful!\n\nWelcome, ${role}!`)

  setTimeout(() => {
    window.location.href = 'index.html'
  }, 800)
}

// Logout
window.logout = function() {
  localStorage.removeItem('campusOneUser')
  alert('👋 You have been logged out successfully.')
  window.location.href = 'index.html'
}

// Form validation
window.validateForm = function(form) {
  let isValid = true

  const inputs = form.querySelectorAll('input[required], textarea[required], select[required]')
  inputs.forEach(input => {
    if (!input.value.trim()) {
      input.classList.add('border-red-500')
      isValid = false
    } else {
      input.classList.remove('border-red-500')
    }
  })

  const emailField = form.querySelector('input[type="email"]')
  if (emailField && emailField.value) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!emailRegex.test(emailField.value)) {
      emailField.classList.add('border-red-500')
      isValid = false
    }
  }

  return isValid
}

// Initialize everything
document.addEventListener('DOMContentLoaded', () => {
  initCommonFeatures()

  const user = localStorage.getItem('campusOneUser')
  if (user) {
    const loginLink = document.getElementById('login-link')
    if (loginLink) {
      loginLink.innerHTML = `
        <div class="flex items-center gap-2 bg-emerald-100 text-emerald-700 px-4 py-1 rounded-full text-sm font-medium">
          👤 Logged in
          <button onclick="logout()" class="underline text-xs">Logout</button>
        </div>`
    }
  }
})