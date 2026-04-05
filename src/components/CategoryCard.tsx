type CategoryProps = {
  title: string
  image: string
}

const CategoryCard = ({ title, image }: CategoryProps) => {
  return (
    <div className="group relative rounded-xl overflow-hidden cursor-pointer shadow-sm hover:shadow-md transition">
      <img
        loading="lazy"
        src={image}
        alt={title}
        className="w-full h-48 object-cover group-hover:scale-105 transition"
      />

      <div className="absolute inset-0 bg-black/40 flex items-center justify-center">
        <h3 className="text-white text-xl font-semibold tracking-wide">
          {title}
        </h3>
      </div>
    </div>
  )
}

export default CategoryCard
