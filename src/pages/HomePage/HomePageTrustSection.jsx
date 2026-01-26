import bottomBanner from "./images/Img-home-bottom.png";

function TrustSection() {
  return (
    <section
          id="trust"
          className="banner"
          style={{ backgroundImage: `url(${bottomBanner})` }}
        >
          <div className="text">
            <h2>
              믿을 수 있는 <br />
              판다마켓 중고 거래
            </h2>
          </div>
        </section>
  )
}

export default TrustSection;