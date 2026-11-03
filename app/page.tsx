export default function HomePage() {
  return (
    <main className="container my-4">
      <div className="row g-4">

        {/* Sidebar Categories (Direct HTML) */}
        <div className="col-lg-3">
          <div className="card shadow-sm border-0">
            <div className="card-header bg-white text-dark fw-semibold">
              CATEGORIES
            </div>
            <div className="list-group list-group-flush">
              <a href="/categories" className="list-group-item list-group-item-action active">All Categories</a>
              <a href="#electronics" className="list-group-item list-group-item-action">Electronics</a>
              <a href="#apparel" className="list-group-item list-group-item-action">Apparel</a>
              <a href="#home" className="list-group-item list-group-item-action">Home & Kitchen</a>
              <a href="/crudwithid" className="list-group-item list-group-item-action">CrudwithId</a>
              <a href="/fullcrud" className="list-group-item list-group-item-action">Fullcrud</a>
              <a href="/formtest" className="list-group-item list-group-item-action">formtest</a>
            </div>
          </div>
        </div>

        {/* Products Grid (Direct HTML) */}
        <div className="col-lg-9">
          <h2 className="h4 mb-3 fw-bold text-secondary">Featured Products</h2>

          <div className="row row-cols-1 row-cols-md-2 row-cols-xl-3 g-4">

            {/* Product 1 */}
            <div className="col">
              <div className="card h-100 shadow-sm border-0">
                <div className="bg-secondary bg-opacity-10 d-flex align-items-center justify-content-center text-muted" style={{ height: "140px" }}>
                  <span>Image</span>
                </div>
                <div className="card-body d-flex flex-column">
                  <h5 className="card-title fs-6 fw-bold">Wireless Headphones</h5>
                  <p className="card-text text-success fw-bold mb-3">$99.99</p>
                  <button className="mt-auto btn btn-outline-primary btn-sm w-100">View Details</button>
                </div>
              </div>
            </div>

            {/* Product 2 */}
            <div className="col">
              <div className="card h-100 shadow-sm border-0">
                <div className="bg-secondary bg-opacity-10 d-flex align-items-center justify-content-center text-muted" style={{ height: "140px" }}>
                  <span>Image</span>
                </div>
                <div className="card-body d-flex flex-column">
                  <h5 className="card-title fs-6 fw-bold">Smart Watch</h5>
                  <p className="card-text text-success fw-bold mb-3">$149.99</p>
                  <button className="mt-auto btn btn-outline-primary btn-sm w-100">View Details</button>
                </div>
              </div>
            </div>

            {/* Product 3 */}
            <div className="col">
              <div className="card h-100 shadow-sm border-0">
                <div className="bg-secondary bg-opacity-10 d-flex align-items-center justify-content-center text-muted" style={{ height: "140px" }}>
                  <span>Image</span>
                </div>
                <div className="card-body d-flex flex-column">
                  <h5 className="card-title fs-6 fw-bold">Classic Denim Jacket</h5>
                  <p className="card-text text-success fw-bold mb-3">$59.99</p>
                  <button className="mt-auto btn btn-outline-primary btn-sm w-100">View Details</button>
                </div>
              </div>
            </div>

          </div>
        </div>

      </div>
    </main>
  );
}