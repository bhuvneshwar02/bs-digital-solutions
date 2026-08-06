import { brand } from '../data/site'

export default function WhatsAppFloat() {
  return (
    <a
      href={`https://wa.me/${brand.whatsapp}?text=${encodeURIComponent('Hi BS Digital Solutions, I\'d like to talk about a project.')}`}
      target="_blank"
      rel="noreferrer"
      aria-label="Chat on WhatsApp"
      className="fixed bottom-6 right-5 sm:bottom-8 sm:right-8 z-50 w-14 h-14 rounded-full bg-teal shadow-lg shadow-black/20 flex items-center justify-center hover:scale-105 transition-transform duration-200"
    >
      <svg width="26" height="26" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path
          d="M12 2C6.48 2 2 6.48 2 12C2 13.85 2.5 15.58 3.38 17.06L2 22L7.13 20.66C8.55 21.5 10.22 22 12 22C17.52 22 22 17.52 22 12C22 6.48 17.52 2 12 2ZM12 20.2C10.36 20.2 8.85 19.72 7.58 18.9L7.27 18.71L4.32 19.48L5.11 16.61L4.9 16.28C4 14.94 3.5 13.5 3.5 12C3.5 7.3 7.3 3.5 12 3.5C16.7 3.5 20.5 7.3 20.5 12C20.5 16.7 16.7 20.2 12 20.2Z"
          fill="white"
        />
        <path
          d="M17.05 14.55C16.78 14.42 15.47 13.78 15.22 13.69C14.97 13.6 14.79 13.55 14.61 13.82C14.43 14.09 13.92 14.69 13.76 14.87C13.6 15.05 13.45 15.07 13.18 14.94C12.91 14.81 12.05 14.52 11.03 13.6C10.24 12.89 9.7 12.01 9.55 11.74C9.4 11.47 9.53 11.33 9.66 11.2C9.78 11.08 9.93 10.88 10.06 10.72C10.19 10.56 10.24 10.44 10.32 10.26C10.4 10.08 10.36 9.92 10.29 9.79C10.22 9.66 9.68 8.35 9.45 7.81C9.23 7.28 9 7.35 8.83 7.34C8.67 7.33 8.49 7.33 8.31 7.33C8.13 7.33 7.84 7.4 7.6 7.66C7.36 7.93 6.68 8.57 6.68 9.88C6.68 11.19 7.62 12.45 7.75 12.63C7.88 12.81 9.66 15.55 12.38 16.69C13.03 16.96 13.53 17.12 13.92 17.24C14.57 17.45 15.16 17.42 15.63 17.35C16.15 17.27 17.22 16.7 17.44 16.06C17.66 15.42 17.66 14.87 17.59 14.76C17.52 14.65 17.34 14.58 17.05 14.55Z"
          fill="white"
        />
      </svg>
    </a>
  )
}
