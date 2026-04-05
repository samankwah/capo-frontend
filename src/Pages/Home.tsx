import useDocumentTitle from "../hooks/useDocumentTitle"
import Hero from "../components/Hero"
import CategoryCard from "../components/CategoryCard"
import ProductCard from "../components/ProductCard"
import { products } from "../data/Product"
import PromoBanner from "../components/PromoBanner"
import WhyChooseUs from "../components/WhyChooseUs"
import Testimonials from "../components/Testimonials"
import BrandLogos from "../components/BrandLogos"
import Newsletter from "../components/Newsletter"
import Footer from "../components/Footer"

const Home = () => {
  useDocumentTitle("");
  const featured = products.slice(0, 4);

  return (
    <>
      <Hero />

      {/* CATEGORIES */}
      <section className="max-w-7xl mx-auto px-6 py-16">
        <h2 className="text-2xl font-bold mb-8 dark:text-white">Shop by Category</h2>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
          <CategoryCard
            title="Android Phones"
            image="https://media.istockphoto.com/id/1169842299/photo/huawei-p30-lite.jpg?s=612x612&w=0&k=20&c=unTytpRBARy4uunFaiVL7oRCfPuIWPpat5xCed5jPJ8="
          />
          <CategoryCard
            title="Accessories"
            image="https://images.unsplash.com/3/www.madebyvadim.com.jpg?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8QWNjZXNzb3JpZXN8ZW58MHx8MHx8fDA%3D"
          />
          <CategoryCard
            title="Memory & Storage"
            image="https://media.istockphoto.com/id/2153700281/photo/multiple-storage-devices-pendrive-memory-cards.jpg?s=612x612&w=0&k=20&c=PqmBhTTjE1FPRMyoMMMKGWSbv4oSelZORVynvjnmQCY="
          />
        </div>
      </section>

      <div className="p-3">
        <PromoBanner />
      </div>

      {/* FEATURED PRODUCTS */}
      <section className="max-w-7xl mx-auto px-6 pb-20">
        <h2 className="text-2xl font-bold mb-8 dark:text-white">Featured Products</h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
          {featured.map((p) => (
            <ProductCard
              key={p.id}
              id={p.id}
              name={p.name}
              price={p.price}
              image={p.image}
              description={p.description}
            />
          ))}
        </div>

        <div className="p-5">
          <WhyChooseUs />
        </div>



        <div className="p-3">
          <Testimonials />
        </div>

        <div className="p-3">
          <BrandLogos />
        </div>

        <div className="p-3">
          <Newsletter />
        </div>
      </section>

      <Footer />
    </>
  )
}

export default Home