export function AboutSection() {
  return (
    <section className="intro section-pad" id="about" aria-labelledby="about-heading">
      <div className="container intro-grid">
        <div className="section-index">
          <span>01</span>
          <i aria-hidden="true" /> THE WHY
        </div>

        <div className="intro-main">
          <p className="eyebrow">MORE THAN A FESTIVAL</p>
          <h2 id="about-heading">
            Different worlds.
            <br />
            <em>One shared stage.</em>
          </h2>

          <div className="intro-bottom">
            <p>
              Milan is where campus life steps beyond the ordinary. Three days
              of performances, ideas, and unexpected connections — made by the
              curious, the bold, and the brilliantly creative.
            </p>
            <div className="intro-stamp" aria-label="SRMIST Together Infinity Badge">
              <span>SRMIST</span>
              <strong>∞</strong>
              <span>TOGETHER</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
