import { ArrowUpRight } from 'lucide-react'

interface FooterProps {
  onBackToTop: () => void
}

export function Footer({ onBackToTop }: FooterProps) {
  return (
    <footer className="footer" role="contentinfo">
      <div className="container">
        <div className="footer-top">
          <a
            className="brand footer-brand"
            href="#home"
            onClick={(e) => {
              e.preventDefault()
              onBackToTop()
            }}
            aria-label="Milan 2026"
          >
            <img
              src="/images/milan-mark.svg"
              alt=""
              className="brand-logo-img"
              width={34}
              height={34}
              aria-hidden="true"
            />
            <span>
              MILAN<span className="brand-year">26</span>
            </span>
          </a>

          <p>
            FIND YOUR FREQUENCY.
            <br />
            MAKE IT YOURS.
          </p>

          <button
            type="button"
            onClick={onBackToTop}
            aria-label="Scroll back to top of page"
          >
            BACK TO TOP <ArrowUpRight size={15} aria-hidden="true" />
          </button>
        </div>

        <div className="footer-bottom">
          <span>© 2026 MILAN · SRMIST</span>
          <span>DIRECTORATE OF STUDENT AFFAIRS</span>
          <a
            href="https://www.srmist.edu.in/"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Visit official SRM Institute website (opens in a new tab)"
          >
            SRM INSTITUTE <ArrowUpRight size={12} aria-hidden="true" />
          </a>
        </div>
      </div>
    </footer>
  )
}
