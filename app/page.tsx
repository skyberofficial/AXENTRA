export default function Home() {
  return (
    <div className="min-h-screen bg-neutral">
      {/* Hero Section */}
      <section className="pt-32 pb-16 px-4 bg-gradient-to-b from-secondary/30 to-neutral">
        <div className="max-w-7xl mx-auto">
          <h1 className="text-6xl font-bold text-primary mb-6">
            Creating Digital
            <span className="text-accent block mt-2">Experiences</span>
          </h1>
          <p className="text-xl text-primary/80 max-w-2xl mb-8">
            Transforming ideas into elegant solutions through innovative design and development.
          </p>
          <button className="px-8 py-4 bg-primary text-light rounded-full hover:bg-accent transition-colors">
            View Projects
          </button>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 px-4">
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-8">
          {[
            {
              title: "Design",
              description: "Creating beautiful and intuitive user interfaces that engage and delight."
            },
            {
              title: "Develop",
              description: "Building robust and scalable applications with modern technologies."
            },
            {
              title: "Deploy",
              description: "Delivering seamless experiences that perform across all platforms."
            }
          ].map((feature, i) => (
            <div key={i} className="p-8 bg-light rounded-2xl shadow-lg hover:shadow-xl transition-shadow">
              <h3 className="text-2xl font-semibold text-primary mb-4">{feature.title}</h3>
              <p className="text-primary/70">{feature.description}</p>
            </div>
          ))}
        </div>
      </section>

      {/* About Section */}
      <section className="py-20 px-4 bg-secondary/20">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-4xl font-bold text-primary mb-12 text-center">About Us</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
            <div className="aspect-square bg-primary/10 rounded-2xl"></div>
            <div>
              <p className="text-lg text-primary/80 mb-6">
                We are passionate about creating digital solutions that make a difference. 
                Our team combines creativity with technical expertise to deliver outstanding results.
              </p>
              <button className="px-6 py-3 border-2 border-primary text-primary rounded-full hover:bg-primary hover:text-light transition-colors">
                Learn More
              </button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
